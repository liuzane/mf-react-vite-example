// 基础模块
import { Routes, Route, Navigate } from 'react-router-dom';

// 页面
import User from './pages/User';
import Role from './pages/Role';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/user" />} />
      <Route path="/user" element={<User />} />
      <Route path="/role" element={<Role />} />
    </Routes>
  );
}

export default App;
