import os
import io
import json
import random
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

app = FastAPI(
    title="Crop Disease Detection API",
    description="Backend API for the Crop Disease Detection Platform",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Models ----
class DiseaseBase(BaseModel):
    id: str
    name: str
    crop_type: str
    description: str
    symptoms: List[str]
    treatment: List[str]
    image_url: Optional[str] = None

class PredictionResponse(BaseModel):
    predicted_disease_name: str
    confidence_score: float
    symptoms: List[str]
    recommended_action: List[str]

# ---- Mock Supabase DB Data ----
# We are using mock data initially as requested. 
# You can later uncomment Supabase client setup and replace these with `supabase.table("crop_diseases").select("*").execute()`
MOCK_WIKI_DATA = [
    {
        "id": "1",
        "name": "Late Blight",
        "crop_type": "Potato",
        "description": "Late blight is a potentially devastating disease that can infect potato foliage and tubers at any stage of crop development.",
        "symptoms": ["Dark, water-soaked spots on leaves", "White mold on the undersides of leaves", "Brown, dry rot on tubers"],
        "treatment": ["Apply fungicides prophylactically", "Destroy infected plant debris", "Plant resistant varieties"],
        "image_url": "https://example.com/late-blight.jpg"
    },
    {
        "id": "2",
        "name": "Apple Scab",
        "crop_type": "Apple",
        "description": "Apple scab is a fungal disease that causes lesions on leaves and fruit, leading to premature defoliation and unmarketable fruit.",
        "symptoms": ["Olive-green to black spots on leaves", "Crusty, scabby lesions on fruit", "Yellowing and dropping of infected leaves"],
        "treatment": ["Apply preventative fungicides in spring", "Rake and destroy fallen leaves", "Prune trees to improve air circulation"],
        "image_url": "https://example.com/apple-scab.jpg"
    }
]

# ---- AI Inference Engine (PyTorch) ----
# Define transformations
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]
val_test_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean, std)
])

# ---- Load Class Names (alphabetical order from training) ----
# PyTorch ImageFolder assigns indices in ALPHABETICAL order of folder names.
# This JSON must match that exact alphabetical order.
CLASS_NAMES_PATH = os.path.join(os.path.dirname(__file__), 'model', 'class_names.json')
if os.path.exists(CLASS_NAMES_PATH):
    with open(CLASS_NAMES_PATH, 'r') as f:
        class_names = json.load(f)
    print(f"Loaded {len(class_names)} class names from {CLASS_NAMES_PATH}")
else:
    # Fallback: best-guess alphabetical list derived from the training chart
    print(f"WARNING: {CLASS_NAMES_PATH} not found. Using built-in fallback class list.")
    print("Run 'python generate_class_names.py' for exact class names.")
    class_names = [
        "apple_apple_scab",
        "apple_black_rot",
        "apple_cedar_apple_rust",
        "bean_angular_leaf_spot",
        "bean_rust",
        "bell_pepper_bacterial_spot",
        "cherry_powdery_mildew",
        "corn_cercospora_leaf_spot",
        "corn_common_rust",
        "corn_gray_leaf_spot",
        "corn_northern_leaf_blight",
        "cotton_aphids",
        "cotton_army_worm",
        "cotton_bacterial_blight",
        "cotton_powdery_mildew",
        "cotton_target_spot",
        "diseased_cucumber",
        "diseased_rice",
        "grape_black_rot",
        "grape_esca_black_measles",
        "grape_leaf_blight",
        "groundnut_early_leaf_spot",
        "groundnut_late_leaf_spot",
        "groundnut_nutrition_deficiency",
        "groundnut_rosette",
        "groundnut_rust",
        "guava_fruit_fly",
        "guava_stylosa_disease",
        "guava_wilt",
        "healthy_apple",
        "healthy_bean",
        "healthy_cherry",
        "healthy_corn",
        "healthy_cotton",
        "healthy_cucumber",
        "healthy_grapes",
        "healthy_groundnut",
        "healthy_guava",
        "healthy_lemon",
        "healthy_peach",
        "healthy_pepper",
        "healthy_potato",
        "healthy_pumpkin",
        "healthy_rice",
        "healthy_strawberry",
        "healthy_sugarcane",
        "healthy_tomato",
        "healthy_wheat",
        "lemon_bacterial_blight",
        "lemon_citrus_canker",
        "lemon_dry_leaf",
        "lemon_greening",
        "lemon_powdery_mildew",
        "lemon_spider_mites",
        "peach_bacterial_spot",
        "potato_early_blight",
        "potato_late_blight",
        "pumpkin_bacterial_leaf_spot",
        "pumpkin_downy_mildew",
        "pumpkin_powdery_mildew",
        "rice_bacterial_blight",
        "strawberry_leaf_scorch",
        "sugarcane_bacterial_blight",
        "sugarcane_red_rot",
        "sugarcane_rust",
        "sugarcane_yellow_leaf_disease",
        "tomato_bacterial_spot",
        "tomato_early_blight",
        "tomato_late_blight",
        "tomato_leaf_mold",
        "tomato_septoria_leaf_spot",
        "tomato_spider_mites",
        "tomato_target_spot",
        "tomato_tomato_mosaic_virus",
        "tomato_tomato_yellow_leaf_curl_virus",
        "wheat_black_rust",
        "wheat_blast",
        "wheat_brown_rust",
        "wheat_common_root_rot",
        "wheat_head_blight",
        "wheat_loose_smut",
        "wheat_mildew",
        "wheat_mite",
        "wheat_septoria",
        "wheat_stem_fly",
        "wheat_yellow_rust"
]
num_classes = len(class_names)

# Initialize ResNet18 model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.resnet18(weights=None)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, num_classes)

# Load weights
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'plant_disease_resnet18.pth')
try:
    if os.path.exists(MODEL_PATH):
        # Allow loading weights without strict matching if classes changed slightly, but here we enforce strict unless it fails
        model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
        model = model.to(device)
        model.eval()
        print("Successfully loaded PyTorch ResNet18 model.")
    else:
        print(f"Model file not found at {MODEL_PATH}. Inference will not work.")
except Exception as e:
    print(f"Error loading model: {e}")

def run_inference_service(image_bytes: bytes) -> PredictionResponse:
    """
    Actual PyTorch inference service.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = val_test_transforms(image).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            confidence_score, predicted_idx = torch.max(probabilities, 0)
            
        predicted_class = class_names[predicted_idx.item()]
        
        return PredictionResponse(
            predicted_disease_name=predicted_class,
            confidence_score=round(confidence_score.item() * 100, 2),
            symptoms=["Real symptoms data missing. Model predicts: " + predicted_class],
            recommended_action=["Real treatment data missing. Model predicts: " + predicted_class]
        )
    except Exception as e:
        print(f"Error during inference: {e}")
        # fallback
        return PredictionResponse(
            predicted_disease_name="Error computing prediction",
            confidence_score=0.0,
            symptoms=["None"],
            recommended_action=["Check backend logs"]
        )

# ---- Routes ----

@app.get("/api/wiki/diseases", response_model=List[DiseaseBase])
def get_all_diseases():
    """
    Fetches all diseases from the Supabase crop_diseases table.
    """
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase client is not initialized")
    
    response = supabase.table("crop_diseases").select("*").execute()
    return response.data

@app.get("/api/wiki/diseases/{id}", response_model=DiseaseBase)
def get_disease(id: str):
    """
    Fetches the specific blog/details for a single disease from Supabase.
    """
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase client is not initialized")
        
    response = supabase.table("crop_diseases").select("*").eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Disease not found")
        
    return response.data[0]

@app.post("/api/diagnose", response_model=PredictionResponse)
async def diagnose_crop(file: UploadFile = File(...)):
    """
    Accepts a multipart form-data image upload.
    Processes the image through the PyTorch ResNet18 computer vision model.
    """
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
         raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
         
    contents = await file.read()
    
    # Run PyTorch inference
    result = run_inference_service(contents)
    
    return result

@app.get("/api/debug/classes")
def debug_classes():
    """
    Debug endpoint: returns the current class index→name mapping.
    Visit http://localhost:8000/api/debug/classes to verify the classes loaded.
    """
    return {
        "total_classes": len(class_names),
        "source": "class_names.json" if os.path.exists(CLASS_NAMES_PATH) else "built-in fallback",
        "classes": {str(i): name for i, name in enumerate(class_names)}
    }

if __name__ == "__main__":
    import uvicorn
    # Optional: read port from env, default 8000
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
