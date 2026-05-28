import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import DiagnosticHub from './pages/DiagnosticHub';
import Wiki from './pages/Wiki';
import Auth from './pages/Auth';
import History from './pages/History';
import DiseaseDetail from './pages/DiseaseDetail';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/diagnostic-hub" replace /> : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Make Auth the first screen implicitly by redirecting root */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Optionally keep Landing accessible at /landing if they want to see it */}
        <Route path="/landing" element={<Landing />} />

        {/* Protected Routes */}
        <Route path="/diagnostic-hub" element={
          <ProtectedRoute>
            <DiagnosticHub />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />
        <Route path="/wiki" element={
          <ProtectedRoute>
            <Wiki />
          </ProtectedRoute>
        } />
        <Route path="/disease/:id" element={
          <ProtectedRoute>
            <DiseaseDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
