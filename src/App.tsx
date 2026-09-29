import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DailyPanel from './components/DailyPanel';
import StudentManager from './components/StudentManager';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DailyPanel />} />
        <Route path="/alunos" element={<StudentManager />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
