import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Product, formatVND } from '../../lib/admin';
import { Plus, Search, Edit3, Trash2, X, Package, Tag, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';

const CATEGORIES = ['Tương ớt', 'Quà tặng', 'Đặc sản', 'Gia vị', 'Khác'];
const UNITS = ['chai', 'hộp', 'hũ', 'gói', 'kg', 'lít'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('name');
    if (data) setProducts(data as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filteredProducts = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.is_active).length,
    categories: [...new Set(products.map(p => p.category))].length,
    avgPrice: products.length ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length) : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hàng hoá</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý danh mục sản phẩm</p>
        </div>
        <button onClick={() => { setEditProduct(null); setShowModal(true); }} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
          <Plus size={16} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng sản phẩm', value: stats.total, icon: Package, color: 'bg-gray-100 text-gray-600' },
          { label: 'Đang bán', value: stats.active, icon: ToggleRight, color: 'bg-green-50 text-green-600' },
          { label: 'Danh mục', value: stats.categories, icon: Tag, color: 'bg-brand-gold/10 text-brand-gold-dark' },
          { label: 'Giá TB', value: formatVND(stats.avgPrice), icon: DollarSign, color: 'bg-brand-red/5 text-brand-red' },
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm tên, mã SKU..." className="border-none outline-none text-sm ml-2 flex-1 bg-transparent placeholder:text-gray-400" />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-brand-red">
          <option value="all">Tất cả danh mục</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Đang tải...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">Chưa có sản phẩm nào</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] bg-gray-100">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={40} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {product.is_active ? 'Đang bán' : 'Ngừng'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 flex-1">{product.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{product.sku}</span>
                  <span className="text-xs bg-brand-gold/10 text-brand-gold-dark px-2 py-0.5 rounded">{product.category}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-extrabold text-brand-red">{formatVND(product.price)}</span>
                  <span className="text-xs text-gray-400">Nhập: {formatVND(product.cost_price)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditProduct(product); setShowModal(true); }} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors">
                    <Edit3 size={12} /> Sửa
                  </button>
                  <button onClick={async () => {
                    if (confirm('Xóa sản phẩm này?')) {
                      await supabase.from('products').delete().eq('id', product.id);
                      fetchProducts();
                    }
                  }} className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ProductModal product={editProduct} onClose={() => setShowModal(false)} onSaved={fetchProducts} />
      )}
    </div>
  );
}

function ProductModal({ product, onClose, onSaved }: { product: Product | null; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || 'Tương ớt',
    price: product?.price || 0,
    cost_price: product?.cost_price || 0,
    unit: product?.unit || 'chai',
    weight: product?.weight || '',
    image: product?.image || '',
    description: product?.description || '',
    is_active: product?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.sku || form.price <= 0) return;
    setSaving(true);
    if (isEdit && product) {
      await supabase.from('products').update({ ...form, weight: form.weight || null, image: form.image || null, description: form.description || null, updated_at: new Date().toISOString() }).eq('id', product.id);
    } else {
      await supabase.from('products').insert({ ...form, weight: form.weight || null, image: form.image || null, description: form.description || null });
    }
    setSaving(false);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Tên sản phẩm *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Mã SKU *</label>
              <input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} disabled={isEdit} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red disabled:bg-gray-50" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Danh mục</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Giá bán *</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Giá nhập</label>
              <input type="number" value={form.cost_price} onChange={e => setForm({ ...form, cost_price: parseInt(e.target.value) || 0 })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Đơn vị</label>
              <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red">
                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Trọng lượng</label>
              <input value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" placeholder="VD: 250g" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Hình ảnh URL</label>
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Mô tả</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red resize-none" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-gray-600">Trạng thái:</label>
            <button
              onClick={() => setForm({ ...form, is_active: !form.is_active })}
              className="flex items-center gap-2 text-sm"
            >
              {form.is_active ? <ToggleRight size={24} className="text-green-600" /> : <ToggleLeft size={24} className="text-gray-400" />}
              <span className={form.is_active ? 'text-green-600 font-medium' : 'text-gray-400'}>{form.is_active ? 'Đang bán' : 'Ngừng bán'}</span>
            </button>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">Hủy</button>
          <button onClick={handleSave} disabled={saving || !form.name || !form.sku} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50">{saving ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
        </div>
      </div>
    </div>
  );
}
