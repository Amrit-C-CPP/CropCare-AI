## CropCare AI 

> **Empowering farmers with the world’s most advanced digital agronomy tools.**

CropCare AI is a comprehensive precision agriculture application designed to help farmers quickly identify plant diseases, track their fields' health over time, and learn best practices for maintaining healthy crops.

##  Features

- **AI Diagnostic Scanner**: Upload or capture an image of a leaf directly from the browser. The integrated PyTorch ResNet18 model instantly analyzes the image and identifies potential diseases with high accuracy.
- **Disease Wiki**: An extensive "Agri-Wiki" database containing detailed protocols, prevention tips, and environmental controls for various crop diseases (e.g., Tomato Late Blight, Potato Early Blight).
- **History Dashboard**: A personalized timeline tracking past scans. Visually distinguishes between healthy and diseased crops so farmers can monitor trends and outbreaks.
- **Premium User Interface**: A modern, responsive frontend built with React and Tailwind CSS v4, featuring a glassmorphic aesthetic, rich gradients, and smooth micro-animations.

##  Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev) [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/) |
| **Backend** | [![Python 3](https://img.shields.io/badge/Python_3-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) |
| **AI / ML** | [![PyTorch (ResNet18)](https://img.shields.io/badge/PyTorch_(ResNet18)-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/) [![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/) [![Pillow](https://img.shields.io/badge/Pillow-333333?style=for-the-badge&logo=python&logoColor=white)](https://python-pillow.org/) |
| **Core UI** | [![Vite](https://img.shields.io/badge/Vite-B73CE4?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/) [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) |
| **Infra** | [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) |


##  Project Structure

```text
KrishiSalakar/
├── frontend/               # React web application
│   ├── src/                # Components, Pages, and Context
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
├── backend/                # FastAPI backend & AI Model
│   ├── main.py             # FastAPI server entry point
│   ├── model/              # Contains the PyTorch model (.pth) and class definitions
│   └── requirements.txt    # Python dependencies
└── supabase_schema.sql     # Database schema for Supabase
```

##  Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### 1. Backend Setup (AI Diagnostic API)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be running at `http://127.0.0.1:8000`.

### 2. Frontend Setup (React App)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running at `http://localhost:5173`.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

 2024 CropCare AI. Precision Agriculture for India.
