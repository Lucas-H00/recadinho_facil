import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DailyPanel from './components/DailyPanel';
import StudentManager from './components/StudentManager';
import LoginScreen from './components/LoginScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('recadinho_auth') === 'true';
  });

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout onLogout={() => { sessionStorage.removeItem('recadinho_auth'); setIsAuthenticated(false); }}>
      <Routes>
        <Route path="/" element={<DailyPanel />} />
        <Route path="/alunos" element={<StudentManager />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
