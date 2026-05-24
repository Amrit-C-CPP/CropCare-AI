import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DiagnosticHub from './pages/DiagnosticHub';
import Wiki from './pages/Wiki';
import Auth from './pages/Auth';
import History from './pages/History';
import DiseaseDetail from './pages/DiseaseDetail';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/diagnostic-hub" element={<DiagnosticHub />} />
        <Route path="/history" element={<History />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/disease/:id" element={<DiseaseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
