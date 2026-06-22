import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  ShoppingCart, PackagePlus, Package, Warehouse,
  Home, Menu, X, ChevronRight, LayoutDashboard
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/ban-hang', icon: ShoppingCart, label: 'Bán hàng' },
  { to: '/admin/nhap-hang', icon: PackagePlus, label: 'Nhập hàng' },
  { to: '/admin/hang-hoa', icon: Package, label: 'Hàng hoá' },
  { to: '/admin/kho-hang', icon: Warehouse, label: 'Kho hàng' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex lg:flex-col bg-brand-brown-dark text-white flex-shrink-0 transition-all duration-300 ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl flex items-center justify-center shadow-lg shadow-brand-red/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">MK</span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="font-display font-bold text-sm leading-tight">Mường Khương</p>
                <p className="text-[9px] text-brand-gold-light tracking-wider uppercase">Quản lý bán hàng</p>
              </div>
            )}
          </NavLink>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <Menu size={16} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <NavLink
            to="/"
            className={`flex items-center gap-3 px-3 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Home size={20} />
            {!collapsed && <span>Về trang chủ</span>}
          </NavLink>
        </div>
      </aside>

      {/* Sidebar - Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-brand-brown-dark text-white shadow-2xl animate-slide-right">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">MK</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Mường Khương</p>
                  <p className="text-[9px] text-brand-gold-light tracking-wider uppercase">Quản lý bán hàng</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-red text-white shadow-lg'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={20} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
              <NavLink
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                <Home size={20} />
                Về trang chủ
              </NavLink>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 lg:px-8 py-3 flex items-center justify-between flex-shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-brand-red rounded-xl hover:bg-brand-red/5 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-1 text-sm text-gray-400">
              <NavLink to="/" className="hover:text-brand-red transition-colors">Trang chủ</NavLink>
              <ChevronRight size={14} />
              <span className="text-gray-700 font-medium">Quản lý</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">Quản trị viên</p>
              <p className="text-xs text-gray-400">Đang online</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl flex items-center justify-center shadow-md shadow-brand-red/20">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
