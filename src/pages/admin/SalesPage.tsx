import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../components/Toast';
import {
  SalesOrder, SalesOrderItem, Product, InventoryItem,
  formatVND, STATUS_LABELS, PAYMENT_LABELS, generateOrderNumber
} from '../../lib/admin';
import {
  Plus, Search, Eye, Trash2, X, ShoppingCart,
  TrendingUp, Clock, CheckCircle2, Truck, ArrowUpRight, ArrowDownRight,
  User, Phone, MapPin, DollarSign, RefreshCw
} from 'lucide-react';

export default function SalesPage() {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState<SalesOrder | null>(null);
  const toast = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [ordersRes, productsRes, invRes] = await Promise.all([
      supabase.from('sales_orders').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').eq('is_active', true).order('name'),
      supabase.from('inventory').select('*, products(*)'),
    ]);
    if (ordersRes.data) setOrders(ordersRes.data as SalesOrder[]);
    if (productsRes.data) setProducts(productsRes.data as Product[]);
    if (invRes.data) setInventory(invRes.data as InventoryItem[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredOrders = orders.filter(o => {
    const matchSearch = !search || o.order_number.toLowerCase().includes(search.toLowerCase()) || o.customer_name.toLowerCase().includes(search.toLowerCase()) || (o.customer_phone || '').includes(search);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    shipping: orders.filter(o => o.status === 'shipping').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.total_amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Bán hàng</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý đơn hàng và bán sản phẩm</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="p-2.5 text-gray-500 hover:text-brand-red rounded-xl hover:bg-brand-red/5 transition-colors" title="Làm mới">
            <RefreshCw size={18} />
          </button>
          <button onClick={() => setShowCreate(true)} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 shadow-lg shadow-brand-red/20 hover:shadow-xl transition-shadow">
            <Plus size={18} />
            Tạo đơn hàng
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Tổng đơn', value: stats.total, icon: ShoppingCart, change: '+5', up: true, color: 'bg-gray-100 text-gray-600' },
          { label: 'Chờ xác nhận', value: stats.pending, icon: Clock, change: null, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Đang giao', value: stats.shipping, icon: Truck, change: null, color: 'bg-purple-50 text-purple-600' },
          { label: 'Đã giao', value: stats.delivered, icon: CheckCircle2, change: '+12', up: true, color: 'bg-green-50 text-green-600' },
          { label: 'Doanh thu', value: formatVND(stats.revenue), icon: TrendingUp, change: '+18%', up: true, color: 'bg-brand-red/5 text-brand-red' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center bg-white rounded-xl border border-gray-200 px-4 py-2.5 flex-1 min-w-[200px] max-w-md shadow-sm focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/10 transition-all">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn, tên khách, SĐT..."
            className="border-none outline-none text-sm ml-3 flex-1 bg-transparent placeholder:text-gray-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all shadow-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="shipping">Đang giao</option>
          <option value="delivered">Đã giao</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Đang tải...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Chưa có đơn hàng nào</p>
            <p className="text-sm text-gray-400 mt-1">Tạo đơn hàng mới để bắt đầu</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Mã đơn</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Khách hàng</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden lg:table-cell">Thanh toán</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-600">Tổng tiền</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const st = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer"
                      onClick={() => setShowDetail(order)}
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold text-brand-red">{order.order_number}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <User size={14} className="text-brand-red" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{order.customer_name}</p>
                            <p className="text-xs text-gray-400">{order.customer_phone || '-'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                          <DollarSign size={14} />
                          {PAYMENT_LABELS[order.payment_method] || order.payment_method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-gray-800">{formatVND(order.total_amount)}</span>
                      </td>
                      <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${st.color}`}>
                          {order.status === 'delivered' && <CheckCircle2 size={12} />}
                          {order.status === 'shipping' && <Truck size={12} />}
                          {order.status === 'pending' && <Clock size={12} />}
                          {st.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setShowDetail(order)}
                            className="p-2 text-gray-400 hover:text-brand-red rounded-lg hover:bg-brand-red/5 transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Xóa đơn hàng này?')) {
                                await supabase.from('sales_order_items').delete().eq('order_id', order.id);
                                await supabase.from('sales_orders').delete().eq('id', order.id);
                                toast.showToast('Đã xóa đơn hàng', 'success');
                                fetchData();
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreate && (
        <CreateOrderModal
          products={products}
          inventory={inventory}
          onClose={() => setShowCreate(false)}
          onCreated={() => { fetchData(); toast.showToast('Đã tạo đơn hàng thành công!'); }}
        />
      )}

      {showDetail && (
        <OrderDetailModal
          order={showDetail}
          onClose={() => setShowDetail(null)}
          onUpdated={() => { fetchData(); toast.showToast('Đã cập nhật trạng thái'); }}
        />
      )}
    </div>
  );
}

/* ─── Create Order Modal ─── */
function CreateOrderModal({ products, inventory, onClose, onCreated }: {
  products: Product[];
  inventory: InventoryItem[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<{ product_id: string; quantity: number }[]>([]);
  const [saving, setSaving] = useState(false);

  const getStock = (productId: string) =>
    inventory.filter(i => i.product_id === productId).reduce((s, i) => s + i.quantity, 0);

  const addItem = () => setItems([...items, { product_id: products[0]?.id || '', quantity: 1 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: string, value: string | number) => {
    const updated = [...items];
    (updated[idx] as any)[field] = value;
    setItems(updated);
  };

  const totalAmount = items.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.product_id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const handleSave = async () => {
    if (!customerName || items.length === 0) return;
    setSaving(true);
    const orderNumber = generateOrderNumber('DH');
    const { data: orderData } = await supabase.from('sales_orders').insert({
      order_number: orderNumber,
      customer_name: customerName,
      customer_phone: customerPhone || null,
      customer_address: customerAddress || null,
      payment_method: paymentMethod,
      total_amount: totalAmount,
      notes: notes || null,
      status: 'pending',
    }).select().single();

    if (orderData) {
      const orderItems = items.map(item => {
        const p = products.find(pr => pr.id === item.product_id);
        return {
          order_id: orderData.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: p?.price || 0,
          total_price: (p?.price || 0) * item.quantity,
        };
      });
      await supabase.from('sales_order_items').insert(orderItems);

      for (const item of items) {
        const invItem = inventory.find(i => i.product_id === item.product_id);
        if (invItem) {
          await supabase.from('inventory').update({
            quantity: Math.max(0, invItem.quantity - item.quantity),
          }).eq('id', invItem.id);
        }
      }
    }
    setSaving(false);
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-brand-red/5 to-transparent">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Tạo đơn hàng mới</h2>
            <p className="text-sm text-gray-500 mt-0.5">Điền thông tin khách hàng và sản phẩm</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {/* Customer Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Tên khách hàng *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all" placeholder="Nhập họ tên" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Số điện thoại</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all" placeholder="Nhập SĐT" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Địa chỉ giao hàng</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-4 text-gray-400" />
              <input value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all" placeholder="Nhập địa chỉ" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Phương thức thanh toán</label>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all">
                <option value="cod">COD - Thanh toán khi nhận</option>
                <option value="bank">Chuyển khoản</option>
                <option value="zalo">ZaloPay</option>
                <option value="cash">Tiền mặt</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Ghi chú</label>
              <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all" placeholder="Ghi chú đơn hàng" />
            </div>
          </div>

          {/* Order Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Danh sách sản phẩm</label>
              <button onClick={addItem} className="text-xs text-brand-red font-semibold flex items-center gap-1 hover:underline">
                <Plus size={14} /> Thêm sản phẩm
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item, idx) => {
                const p = products.find(pr => pr.id === item.product_id);
                const stock = getStock(item.product_id);
                return (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-brand-red/20 transition-colors">
                    {p?.image && <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <select
                        value={item.product_id}
                        onChange={e => updateItem(idx, 'product_id', e.target.value)}
                        className="w-full border-none bg-transparent text-sm font-medium outline-none focus:text-brand-red"
                      >
                        {products.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
                      </select>
                      <p className="text-xs text-gray-400">Tồn: {stock} · {p ? formatVND(p.price) : '0đ'}</p>
                    </div>
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateItem(idx, 'quantity', Math.max(1, item.quantity - 1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors">-</button>
                      <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateItem(idx, 'quantity', Math.min(stock, item.quantity + 1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors">+</button>
                    </div>
                    <span className="text-sm font-bold text-brand-red min-w-[80px] text-right">
                      {p ? formatVND(p.price * item.quantity) : '0đ'}
                    </span>
                    <button onClick={() => removeItem(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Chưa có sản phẩm. Nhấn "Thêm sản phẩm" để bắt đầu.</p>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-brand-red to-brand-red-dark rounded-xl p-5 flex items-center justify-between text-white shadow-lg shadow-brand-red/20">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="text-2xl font-extrabold">{formatVND(totalAmount)}</span>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end bg-gray-50">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 rounded-xl border border-gray-200 hover:bg-white transition-colors">Hủy</button>
          <button onClick={handleSave} disabled={saving || !customerName || items.length === 0} className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-red/20">
            {saving ? 'Đang tạo...' : 'Tạo đơn hàng'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Order Detail Modal ─── */
function OrderDetailModal({ order, onClose, onUpdated }: {
  order: SalesOrder;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [items, setItems] = useState<SalesOrderItem[]>([]);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    supabase.from('sales_order_items').select('*, products(*)').eq('order_id', order.id)
      .then(res => { if (res.data) setItems(res.data as SalesOrderItem[]); });
  }, [order.id]);

  const updateStatus = async () => {
    await supabase.from('sales_orders').update({ status }).eq('id', order.id);
    onUpdated();
    onClose();
  };

  const st = STATUS_LABELS[status] || STATUS_LABELS.pending;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className={`p-6 ${st.color.replace('text-', 'text-').replace('bg-', 'bg-').split(' ')[0]}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-70">Mã đơn hàng</p>
              <h2 className="text-xl font-bold">{order.order_number}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/20 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center">
              <User size={20} className="text-brand-red" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{order.customer_name}</p>
              <p className="text-sm text-gray-500">{order.customer_phone || 'Chưa có SĐT'}</p>
            </div>
          </div>

          {order.customer_address && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <MapPin size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">{order.customer_address}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Thanh toán</p>
              <p className="font-semibold text-gray-800">{PAYMENT_LABELS[order.payment_method]}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Ngày tạo</p>
              <p className="font-semibold text-gray-800">{new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Sản phẩm đã mua</h4>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{(item as any).products?.name || 'Sản phẩm'}</p>
                    <p className="text-xs text-gray-500">{formatVND(item.unit_price)} x {item.quantity}</p>
                  </div>
                  <p className="font-bold text-brand-red">{formatVND(item.total_price)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-red/5 rounded-xl p-4 flex items-center justify-between border border-brand-red/10">
            <span className="font-semibold text-gray-700">Tổng cộng:</span>
            <span className="text-2xl font-extrabold text-brand-red">{formatVND(order.total_amount)}</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block uppercase tracking-wide">Cập nhật trạng thái</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all">
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">Đóng</button>
          <button onClick={updateStatus} className="btn-primary px-6 py-2.5 text-sm shadow-lg shadow-brand-red/20">Cập nhật</button>
        </div>
      </div>
    </div>
  );
}
