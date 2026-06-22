import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import { ToastProvider } from './components/Toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import FloatingCTA from './components/FloatingCTA';
import TrustyBotBubble from './components/TrustyBotBubble';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import BrandStoryPage from './pages/BrandStoryPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import AIConsultantPage from './pages/AIConsultantPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import SalesPage from './pages/admin/SalesPage';
import ImportPage from './pages/admin/ImportPage';
import ProductsPage from './pages/admin/ProductsPage';
import WarehousePage from './pages/admin/WarehousePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    const syncDatabaseProducts = async () => {
      try {
        // Sync 250ml price to 30,000đ
        await supabase
          .from('products')
          .update({ price: 30000, name: 'Tương ớt truyền thống 250ml', weight: '250ml' })
          .eq('sku', 'MK-250');
          
        // Sync 500ml price to 55,000đ
        await supabase
          .from('products')
          .update({ price: 55000, name: 'Tương ớt truyền thống 500ml', weight: '500ml' })
          .eq('sku', 'MK-500G');
      } catch (err) {
        console.error('Error syncing database products:', err);
      }
    };
    syncDatabaseProducts();
  }, []);

  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/san-pham" element={<ProductPage />} />
              <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
              <Route path="/thanh-toan" element={<CheckoutPage />} />
              <Route path="/cau-chuyen" element={<BrandStoryPage />} />
              <Route path="/tin-tuc" element={<BlogPage />} />
              <Route path="/tin-tuc/:slug" element={<BlogDetailPage />} />
              <Route path="/he-thong-phan-phoi" element={<StoreLocatorPage />} />
              <Route path="/tu-van-ai" element={<AIConsultantPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="ban-hang" element={<SalesPage />} />
                <Route path="nhap-hang" element={<ImportPage />} />
                <Route path="hang-hoa" element={<ProductsPage />} />
                <Route path="kho-hang" element={<WarehousePage />} />
              </Route>
            </Routes>
            <FloatingCTA />
            <TrustyBotBubble />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </ToastProvider>
  );
}

export default App;
