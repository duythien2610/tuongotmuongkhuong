import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { InventoryItem, formatVND } from '../../lib/admin';
import {
  Search, AlertTriangle, X, Warehouse as WarehouseIcon,
  Package, TrendingDown, Edit3
} from 'lucide-react';

export default function WarehousePage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out' | 'ok'>('all');
  const [showEdit, setShowEdit] = useState<InventoryItem | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const invRes = await supabase.from('inventory').select('*, products(*)').order('warehouse');
    if (invRes.data) setInventory(invRes.data as InventoryItem[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredInventory = inventory.filter(i => {
    const name = i.products?.name || '';
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || (i.batch_number || '').toLowerCase().includes(search.toLowerCase());
    const matchStock = stockFilter === 'all' ||
      (stockFilter === 'out' && i.quantity === 0) ||
      (stockFilter === 'low' && i.quantity > 0 && i.quantity <= i.min_stock) ||
      (stockFilter === 'ok' && i.quantity > i.min_stock);
    return matchSearch && matchStock;
  });

  const totalStock = inventory.reduce((s, i) => s + i.quantity, 0);
  const totalValue = inventory.reduce((s, i) => s + (i.products?.cost_price || 0) * i.quantity, 0);
  const lowStock = inventory.filter(i => i.quantity > 0 && i.quantity <= i.min_stock).length;
  const outOfStock = inventory.filter(i => i.quantity === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kho hàng</h1>
          <p className="text-sm text-gray-500 mt-1">Theo dõi tồn kho và quản lý kho</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng tồn kho', value: totalStock.toLocaleString('vi-VN') + ' SP', icon: Package, color: 'bg-gray-100 text-gray-600' },
          { label: 'Giá trị kho', value: formatVND(totalValue), icon: WarehouseIcon, color: 'bg-brand-gold/10 text-brand-gold-dark' },
          { label: 'Sắp hết hàng', value: lowStock, icon: AlertTriangle, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Hết hàng', value: outOfStock, icon: TrendingDown, color: 'bg-red-50 text-red-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}><stat.icon size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      {lowStock > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">Cảnh báo tồn kho thấp</p>
            <p className="text-xs text-yellow-600 mt-0.5">Có {lowStock} sản phẩm sắp hết hàng. Cần nhập thêm để tránh thiếu hụt.</p>
          </div>
        </div>
      )}

      {outOfStock > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <TrendingDown size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Hết hàng!</p>
            <p className="text-xs text-red-600 mt-0.5">Có {outOfStock} sản phẩm đã hết hàng hoàn toàn.</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sản phẩm, lô hàng..." className="border-none outline-none text-sm ml-2 flex-1 bg-transparent placeholder:text-gray-400" />
        </div>
        <select value={stockFilter} onChange={e => setStockFilter(e.target.value as any)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-brand-red">
          <option value="all">Tất cả tồn kho</option>
          <option value="ok">Đủ hàng</option>
          <option value="low">Sắp hết</option>
          <option value="out">Hết hàng</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Đang tải...</div>
        ) : filteredInventory.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Không có dữ liệu tồn kho</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Sản phẩm</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Kho</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Tồn kho</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Tối thiểu</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Lô hàng</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Hạn sử dụng</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => {
                  const isLow = item.quantity > 0 && item.quantity <= item.min_stock;
                  const isOut = item.quantity === 0;
                  return (
                    <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${isOut ? 'bg-red-50/30' : isLow ? 'bg-yellow-50/30' : ''}`}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {item.products?.image ? (
                            <img src={item.products.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"><Package size={16} className="text-gray-400" /></div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">{item.products?.name || 'N/A'}</p>
                            <p className="text-xs text-gray-400">{item.products?.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{item.warehouse}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`font-bold ${isOut ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-gray-800'}`}>
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center text-gray-500">{item.min_stock}</td>
                      <td className="px-5 py-3 text-center">
                        {isOut ? (
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Hết hàng</span>
                        ) : isLow ? (
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Sắp hết</span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Đủ hàng</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{item.batch_number || '-'}</td>
                      <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('vi-VN') : '-'}</td>
                      <td className="px-5 py-3 text-center">
                        <button onClick={() => setShowEdit(item)} className="p-1.5 text-gray-400 hover:text-brand-red rounded-lg hover:bg-brand-red/5">
                          <Edit3 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showEdit && (
        <EditInventoryModal item={showEdit} onClose={() => setShowEdit(null)} onSaved={fetchData} />
      )}
    </div>
  );
}

function EditInventoryModal({ item, onClose, onSaved }: { item: InventoryItem; onClose: () => void; onSaved: () => void }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [minStock, setMinStock] = useState(item.min_stock);
  const [warehouse, setWarehouse] = useState(item.warehouse);
  const [batchNumber, setBatchNumber] = useState(item.batch_number || '');
  const [expiryDate, setExpiryDate] = useState(item.expiry_date || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('inventory').update({
      quantity,
      min_stock: minStock,
      warehouse,
      batch_number: batchNumber || null,
      expiry_date: expiryDate || null,
      updated_at: new Date().toISOString(),
    }).eq('id', item.id);
    setSaving(false);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Sửa tồn kho</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="font-semibold text-gray-800 text-sm">{item.products?.name}</p>
            <p className="text-xs text-gray-400">{item.products?.sku} · {item.warehouse}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Số lượng tồn</label>
              <input type="number" min={0} value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Tồn tối thiểu</label>
              <input type="number" min={0} value={minStock} onChange={e => setMinStock(parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Kho</label>
            <input value={warehouse} onChange={e => setWarehouse(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Lô hàng</label>
              <input value={batchNumber} onChange={e => setBatchNumber(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Hạn sử dụng</label>
              <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">Hủy</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50">{saving ? 'Đang lưu...' : 'Cập nhật'}</button>
        </div>
      </div>
    </div>
  );
}
