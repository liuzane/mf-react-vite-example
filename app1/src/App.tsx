// 基础模块
import { Routes, Route, Navigate } from 'react-router-dom';

// 页面
import Order from './pages/Order';
import Product from './pages/Product';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/order" />} />
      <Route path="/order" element={<Order />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  );
}

export default App;
