import sys
from main import run_inference_service
from PIL import Image
import io

def test_inference():
    # Create a dummy image
    img = Image.new('RGB', (224, 224), color = 'red')
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    image_bytes = buf.getvalue()
    
    res = run_inference_service(image_bytes)
    print("Result:", res)

if __name__ == "__main__":
    test_inference()
