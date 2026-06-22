import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import {
  PurchaseOrder, PurchaseOrderItem, Product,
  formatVND, STATUS_LABELS, generateOrderNumber
} from '../../lib/admin';
import { Plus, Search, Eye, Trash2, X, PackagePlus, TrendingDown, Clock, CheckCircle2 } from 'lucide-react';

export default function ImportPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState<PurchaseOrder | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [ordersRes, productsRes] = await Promise.all([
      supabase.from('purchase_orders').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').eq('is_active', true).order('name'),
    ]);
    if (ordersRes.data) setOrders(ordersRes.data as PurchaseOrder[]);
    if (productsRes.data) setProducts(productsRes.data as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredOrders = orders.filter(o => {
    const matchSearch = !search || o.order_number.toLowerCase().includes(search.toLowerCase()) || o.supplier_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    received: orders.filter(o => o.status === 'received').length,
    totalCost: orders.filter(o => o.status === 'received').reduce((s, o) => s + o.total_amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Nhập hàng</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý phiếu nhập hàng từ nhà cung cấp</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
          <Plus size={16} />
          Tạo phiếu nhập
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng phiếu', value: stats.total, icon: PackagePlus, color: 'bg-gray-100 text-gray-600' },
          { label: 'Chờ nhận', value: stats.pending, icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Đã nhận', value: stats.received, icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
          { label: 'Tổng chi phí', value: formatVND(stats.totalCost), icon: TrendingDown, color: 'bg-blue-50 text-blue-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo mã phiếu, nhà cung cấp..." className="border-none outline-none text-sm ml-2 flex-1 bg-transparent placeholder:text-gray-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-brand-red">
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ nhận</option>
          <option value="received">Đã nhận</option>
          <option value="partial">Nhập một phần</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Đang tải...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Chưa có phiếu nhập nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Mã phiếu</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Nhà cung cấp</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-600">Tổng tiền</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Ngày tạo</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const st = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                  return (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-blue-600">{order.order_number}</td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-800">{order.supplier_name}</p>
                        <p className="text-xs text-gray-400">{order.supplier_phone}</p>
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-gray-800">{formatVND(order.total_amount)}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${st.color}`}>{st.label}</span>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell text-gray-500">{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setShowDetail(order)} className="p-1.5 text-gray-400 hover:text-brand-red rounded-lg hover:bg-brand-red/5"><Eye size={16} /></button>
                          <button onClick={async () => { if (confirm('Xóa phiếu này?')) { await supabase.from('purchase_order_items').delete().eq('order_id', order.id); await supabase.from('purchase_orders').delete().eq('id', order.id); fetchData(); } }} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 size={16} /></button>
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

      {showCreate && <CreateImportModal products={products} onClose={() => setShowCreate(false)} onCreated={fetchData} />}
      {showDetail && <ImportDetailModal order={showDetail} onClose={() => setShowDetail(null)} onUpdated={fetchData} />}
    </div>
  );
}

function CreateImportModal({ products, onClose, onCreated }: { products: Product[]; onClose: () => void; onCreated: () => void }) {
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<{ product_id: string; quantity: number; unit_cost: number; batch_number: string; expiry_date: string }[]>([]);
  const [saving, setSaving] = useState(false);

  const addItem = () => setItems([...items, { product_id: products[0]?.id || '', quantity: 1, unit_cost: products[0]?.cost_price || 0, batch_number: '', expiry_date: '' }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: string, value: string | number) => {
    const updated = [...items];
    (updated[idx] as any)[field] = value;
    setItems(updated);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.unit_cost * item.quantity, 0);

  const handleSave = async () => {
    if (!supplierName || items.length === 0) return;
    setSaving(true);
    const orderNumber = generateOrderNumber('NH');
    const { data: orderData } = await supabase.from('purchase_orders').insert({
      order_number: orderNumber,
      supplier_name: supplierName,
      supplier_phone: supplierPhone || null,
      total_amount: totalAmount,
      notes: notes || null,
      status: 'pending',
    }).select().single();

    if (orderData) {
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        total_cost: item.unit_cost * item.quantity,
        batch_number: item.batch_number || null,
        expiry_date: item.expiry_date || null,
      }));
      await supabase.from('purchase_order_items').insert(orderItems);
    }
    setSaving(false);
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Tạo phiếu nhập hàng</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Nhà cung cấp *</label>
              <input value={supplierName} onChange={e => setSupplierName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Số điện thoại</label>
              <input value={supplierPhone} onChange={e => setSupplierPhone(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Ghi chú</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-600">Sản phẩm nhập</label>
              <button onClick={addItem} className="text-xs text-brand-red font-semibold flex items-center gap-1 hover:underline"><Plus size={14} /> Thêm</button>
            </div>
            <div className="space-y-3">
              {items.map((item, idx) => {
                return (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <select value={item.product_id} onChange={e => { updateItem(idx, 'product_id', e.target.value); const pr = products.find(p => p.id === e.target.value); if (pr) updateItem(idx, 'unit_cost', pr.cost_price); }} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red bg-white">
                        {products.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
                      </select>
                      <button onClick={() => removeItem(idx)} className="p-1 text-gray-400 hover:text-red-500"><X size={16} /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-500 mb-0.5 block">Số lượng</label>
                        <input type="number" min={1} value={item.quantity} onChange={e => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand-red bg-white" />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 mb-0.5 block">Giá nhập</label>
                        <input type="number" min={0} value={item.unit_cost} onChange={e => updateItem(idx, 'unit_cost', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand-red bg-white" />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 mb-0.5 block">Lô</label>
                        <input value={item.batch_number} onChange={e => updateItem(idx, 'batch_number', e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand-red bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-0.5 block">Hạn sử dụng</label>
                      <input type="date" value={item.expiry_date} onChange={e => updateItem(idx, 'expiry_date', e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand-red bg-white" />
                    </div>
                    <div className="text-right text-sm font-semibold text-gray-700">
                      Thành tiền: {formatVND(item.unit_cost * item.quantity)}
                    </div>
                  </div>
                );
              })}
              {items.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Chưa có sản phẩm. Nhấn "Thêm" để bắt đầu.</p>}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between border border-blue-100">
            <span className="font-semibold text-gray-700">Tổng chi phí:</span>
            <span className="text-2xl font-extrabold text-blue-600">{formatVND(totalAmount)}</span>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">Hủy</button>
          <button onClick={handleSave} disabled={saving || !supplierName || items.length === 0} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50">{saving ? 'Đang lưu...' : 'Tạo phiếu nhập'}</button>
        </div>
      </div>
    </div>
  );
}

function ImportDetailModal({ order, onClose, onUpdated }: { order: PurchaseOrder; onClose: () => void; onUpdated: () => void }) {
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    supabase.from('purchase_order_items').select('*, products(*)').eq('order_id', order.id)
      .then(res => { if (res.data) setItems(res.data as PurchaseOrderItem[]); });
  }, [order.id]);

  const updateStatus = async () => {
    const newStatus = status;
    await supabase.from('purchase_orders').update({ status: newStatus }).eq('id', order.id);

    // If received, add to inventory
    if (newStatus === 'received') {
      for (const item of items) {
        const existing = await supabase.from('inventory').select('*').eq('product_id', item.product_id).eq('warehouse', 'Kho chính').limit(1);
        if (existing.data && existing.data.length > 0) {
          await supabase.from('inventory').update({
            quantity: existing.data[0].quantity + item.quantity,
            batch_number: item.batch_number || existing.data[0].batch_number,
            expiry_date: item.expiry_date || existing.data[0].expiry_date,
          }).eq('id', existing.data[0].id);
        } else {
          await supabase.from('inventory').insert({
            product_id: item.product_id,
            warehouse: 'Kho chính',
            quantity: item.quantity,
            batch_number: item.batch_number,
            expiry_date: item.expiry_date,
          });
        }
      }
    }
    onUpdated();
    onClose();
  };

  const st = STATUS_LABELS[status] || STATUS_LABELS.pending;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Chi tiết phiếu nhập</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-bold">{order.order_number}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${st.color}`}>{st.label}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Nhà cung cấp:</span><p className="font-medium">{order.supplier_name}</p></div>
            <div><span className="text-gray-500">Điện thoại:</span><p className="font-medium">{order.supplier_phone || '-'}</p></div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">Sản phẩm nhập:</h4>
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between py-2 text-sm border-b border-gray-50 last:border-0">
                <span className="text-gray-700">{(item as any).products?.name || item.product_id}</span>
                <span className="text-gray-500">x{item.quantity} @ {formatVND(item.unit_cost)}</span>
                <span className="font-semibold">{formatVND(item.total_cost)}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between border border-blue-100">
            <span className="font-semibold text-gray-700">Tổng chi phí:</span>
            <span className="text-xl font-extrabold text-blue-600">{formatVND(order.total_amount)}</span>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Cập nhật trạng thái:</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red">
              <option value="pending">Chờ nhận</option>
              <option value="received">Đã nhận hàng</option>
              <option value="partial">Nhập một phần</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">Đóng</button>
          <button onClick={updateStatus} className="btn-primary px-5 py-2.5 text-sm">Cập nhật</button>
        </div>
      </div>
    </div>
  );
}
