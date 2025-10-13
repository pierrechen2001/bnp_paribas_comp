import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PolicyDetail from './pages/PolicyDetail';
import Recommend from './pages/Recommend';
import EmptyState from './pages/EmptyState';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/policy/:id" element={<PolicyDetail />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/empty" element={<EmptyState />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
