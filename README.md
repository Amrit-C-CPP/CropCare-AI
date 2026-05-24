# CropCare AI 🌿

> **Empowering farmers with the world’s most advanced digital agronomy tools.**

CropCare AI is a comprehensive precision agriculture application designed to help farmers quickly identify plant diseases, track their fields' health over time, and learn best practices for maintaining healthy crops.

## 🚀 Features

- **AI Diagnostic Scanner**: Upload or capture an image of a leaf directly from the browser. The integrated PyTorch ResNet18 model instantly analyzes the image and identifies potential diseases with high accuracy.
- **Disease Wiki**: An extensive "Agri-Wiki" database containing detailed protocols, prevention tips, and environmental controls for various crop diseases (e.g., Tomato Late Blight, Potato Early Blight).
- **History Dashboard**: A personalized timeline tracking past scans. Visually distinguishes between healthy and diseased crops so farmers can monitor trends and outbreaks.
- **Premium User Interface**: A modern, responsive frontend built with React and Tailwind CSS v4, featuring a glassmorphic aesthetic, rich gradients, and smooth micro-animations.

## 🛠️ Technology Stack

**Frontend:**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) for unified styling
- [React Router](https://reactrouter.com/) for client-side navigation
- [Supabase](https://supabase.com/) for authentication (Google OAuth)

**Backend:**
- [Python 3](https://www.python.org/) + [FastAPI](https://fastapi.tiangolo.com/)
- [PyTorch](https://pytorch.org/) (ResNet18) for image classification
- [Pillow](https://pillow.readthedocs.io/) & [NumPy](https://numpy.org/) for image processing

## 📂 Project Structure

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
├── Frontenddesign/         # Original UI/UX templates & mockups (Stitch generated)
└── supabase_schema.sql     # Database schema for Supabase
```

## ⚙️ Getting Started

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

© 2024 CropCare AI. Precision Agriculture for India.
