import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { formatVND } from '../../lib/admin';
import {
  TrendingUp, ShoppingCart, PackagePlus, Package, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, Truck, DollarSign
} from 'lucide-react';

interface DailySales {
  date: string;
  total: number;
}

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockCount: 0,
    todayRevenue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    monthlyGrowth: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [dailySales, setDailySales] = useState<DailySales[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  const fetchData = useCallback(async () => {
    // Get date ranges
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();

    // Fetch all data in parallel
    const [
      ordersRes,
      productsRes,
      inventoryRes,
      todayOrdersRes,
    ] = await Promise.all([
      supabase.from('sales_orders').select('*'),
      supabase.from('products').select('*').eq('is_active', true),
      supabase.from('inventory').select('*, products(*)'),
      supabase.from('sales_orders').select('*').gte('created_at', todayStart),
    ]);

    // Calculate stats
    const orders = ordersRes.data || [];
    const products = productsRes.data || [];
    const inventory = inventoryRes.data || [];
    const todayOrders = todayOrdersRes.data || [];

    const deliveredOrders = orders.filter(o => o.status === 'delivered');
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const lowStock = inventory.filter(i => i.quantity > 0 && i.quantity <= (i.min_stock || 10));

    const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total_amount, 0);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total_amount, 0);

    setStats({
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      lowStockCount: lowStock.length,
      todayRevenue,
      todayOrders: todayOrders.length,
      pendingOrders: pendingOrders.length,
      monthlyGrowth: 12.5, // Placeholder
    });

    // Recent orders
    setRecentOrders(orders.slice(0, 5));

    // Generate sample daily sales for chart
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });
    const dailyData = last7Days.map(date => ({
      date,
      total: Math.floor(Math.random() * 500000) + 100000,
    }));
    setDailySales(dailyData);

    // Top products (placeholder)
    setTopProducts([
      { name: 'Tương ớt truyền thống 250g', quantity: 89, revenue: 3115000 },
      { name: 'Hộp quà tặng 3 chai OCOP', quantity: 45, revenue: 7605000 },
      { name: 'Tương ớt thủy tinh cao cấp 500g', quantity: 38, revenue: 2470000 },
      { name: 'Măng ớt Mường Khương', quantity: 25, revenue: 1375000 },
      { name: 'Gia vị đặc sản vùng cao', quantity: 18, revenue: 756000 },
    ]);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const maxDaily = Math.max(...dailySales.map(d => d.total), 1);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Tổng quan hoạt động kinh doanh</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          Cập nhật: {new Date().toLocaleString('vi-VN')}
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Doanh thu hôm nay',
            value: formatVND(stats.todayRevenue),
            change: '+15%',
            up: true,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-600',
            bg: 'bg-green-50',
          },
          {
            label: 'Đơn hàng hôm nay',
            value: stats.todayOrders.toString(),
            change: '+8%',
            up: true,
            icon: ShoppingCart,
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Đơn chờ xử lý',
            value: stats.pendingOrders.toString(),
            change: 'Cần xử lý',
            up: null,
            icon: Clock,
            color: 'from-yellow-500 to-orange-500',
            bg: 'bg-yellow-50',
          },
          {
            label: 'Sắp hết hàng',
            value: stats.lowStockCount.toString(),
            change: 'Cần nhập',
            up: null,
            icon: AlertTriangle,
            color: 'from-red-500 to-rose-600',
            bg: 'bg-red-50',
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                <card.icon size={22} className="text-white" />
              </div>
              {card.up !== null && (
                <span className={`flex items-center gap-1 text-xs font-semibold ${card.up ? 'text-green-600' : 'text-red-600'}`}>
                  {card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.change}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Doanh thu 7 ngày qua</h2>
              <p className="text-sm text-gray-500">Biểu đồ doanh thu theo ngày</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
              <TrendingUp size={16} />
              +18%
            </div>
          </div>
          <div className="flex items-end gap-2 h-48">
            {dailySales.map((day, idx) => {
              const height = (day.total / maxDaily) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: `${height}%` }}>
                    <div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-red to-brand-red-dark rounded-t-lg transition-all duration-500"
                      style={{ height: '100%' }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Tổng quan tháng này</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Tổng doanh thu</p>
                <p className="text-xl font-bold text-gray-800">{formatVND(stats.totalRevenue)}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp size={18} className="text-white" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Tổng đơn hàng</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalOrders}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <ShoppingCart size={18} className="text-white" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Sản phẩm đang bán</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalProducts}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Package size={18} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Đơn hàng gần đây</h2>
            <Link to="/admin/ban-hang" className="text-sm text-brand-red font-semibold hover:underline flex items-center gap-1">
              Xem tất cả <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Chưa có đơn hàng nào</p>
            ) : (
              recentOrders.map((order: any) => {
                const statusColors: Record<string, string> = {
                  pending: 'bg-yellow-100 text-yellow-700',
                  confirmed: 'bg-blue-100 text-blue-700',
                  shipping: 'bg-purple-100 text-purple-700',
                  delivered: 'bg-green-100 text-green-700',
                  cancelled: 'bg-red-100 text-red-700',
                };
                const statusLabels: Record<string, string> = {
                  pending: 'Chờ xác nhận',
                  confirmed: 'Đã xác nhận',
                  shipping: 'Đang giao',
                  delivered: 'Đã giao',
                  cancelled: 'Đã hủy',
                };
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        order.status === 'delivered' ? 'bg-green-500' : order.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}>
                        {order.status === 'delivered' ? <CheckCircle2 size={18} className="text-white" /> :
                         order.status === 'shipping' ? <Truck size={18} className="text-white" /> :
                         <Clock size={18} className="text-white" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{order.order_number}</p>
                        <p className="text-xs text-gray-500">{order.customer_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-gray-800">{formatVND(order.total_amount)}</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Sản phẩm bán chạy</h2>
            <Link to="/admin/hang-hoa" className="text-sm text-brand-red font-semibold hover:underline flex items-center gap-1">
              Xem tất cả <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  idx === 0 ? 'bg-brand-gold text-brand-brown-dark' :
                  idx === 1 ? 'bg-gray-300 text-gray-700' :
                  idx === 2 ? 'bg-orange-300 text-orange-800' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">Đã bán {product.quantity} sản phẩm</p>
                </div>
                <p className="font-bold text-sm text-brand-red">{formatVND(product.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/ban-hang"
          className="bg-gradient-to-br from-brand-red to-brand-red-dark text-white p-6 rounded-2xl shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/30 transition-all group"
        >
          <ShoppingCart size={28} className="mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-lg">Tạo đơn hàng</p>
          <p className="text-sm text-white/70">Bán hàng nhanh</p>
        </Link>
        <Link
          to="/admin/nhap-hang"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all group"
        >
          <PackagePlus size={28} className="mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-lg">Nhập hàng</p>
          <p className="text-sm text-white/70">Tạo phiếu nhập</p>
        </Link>
        <Link
          to="/admin/hang-hoa"
          className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-2xl shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all group"
        >
          <Package size={28} className="mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-lg">Hàng hoá</p>
          <p className="text-sm text-white/70">Quản lý sản phẩm</p>
        </Link>
        <Link
          to="/admin/kho-hang"
          className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all group"
        >
          <Package size={28} className="mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-lg">Kho hàng</p>
          <p className="text-sm text-white/70">Xem tồn kho</p>
        </Link>
      </div>
    </div>
  );
}
