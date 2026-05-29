import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DiagnosticHub from './pages/DiagnosticHub';
import Wiki from './pages/Wiki';
import Auth from './pages/Auth';
import History from './pages/History';
import Landing from './pages/Landing';
import DiseaseDetail from './pages/DiseaseDetail';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

const ProtectedPage = ({ children }) => (
  <ProtectedRoute>
    <MainLayout>{children}</MainLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/diagnostic-hub" element={<ProtectedPage><DiagnosticHub /></ProtectedPage>} />
        <Route path="/history" element={<ProtectedPage><History /></ProtectedPage>} />
        <Route path="/wiki" element={<ProtectedPage><Wiki /></ProtectedPage>} />
        <Route path="/disease/:id" element={<ProtectedPage><DiseaseDetail /></ProtectedPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
