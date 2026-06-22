import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, AlertCircle, Phone, MapPin, User, Package, MessageCircle,
  CreditCard, Truck, Copy, Check, ChevronLeft, ChevronRight, Minus, Plus, Trash2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { formatPrice, COMPANY_INFO, BANK_INFO, SHIPPING_INFO } from '../data/product';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'cod' | 'bank';
  note: string;
  shippingRegion: 'ha-noi' | 'mien-nam';
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // 1: Review, 2: Info, 3: Payment
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
    note: '',
    shippingRegion: 'ha-noi',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(0[3|5|7|8|9][0-9]{8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0912518745)';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (items.length === 0) {
        showToast('Giỏ hàng trống, vui lòng thêm sản phẩm', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const generateOrderNo = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `DH-${dateStr}-${rand}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    if (items.length === 0) {
      showToast('Giỏ hàng trống', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Fetch products from database
      const { data: dbProducts, error: prodError } = await supabase
        .from('products')
        .select('*');

      if (prodError || !dbProducts) {
        throw new Error(prodError?.message || 'Không thể lấy thông tin sản phẩm từ database');
      }

      // 2. Generate order number and insert into sales_orders
      const orderNumber = generateOrderNo();
      const { data: orderData, error: orderError } = await supabase
        .from('sales_orders')
        .insert({
          order_number: orderNumber,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          status: 'pending',
          total_amount: grandTotal,
          payment_method: formData.paymentMethod,
          notes: formData.note || null,
        })
        .select()
        .single();

      if (orderError || !orderData) {
        throw new Error(orderError?.message || 'Không thể tạo đơn hàng trên database');
      }

      // 3. Prepare order items
      const orderItems = items.map(item => {
        // Map local ID to SKU
        const targetSku = item.id === 'sauce-250' ? 'MK-250' : 'MK-500G';
        const dbProd = dbProducts.find(p => p.sku === targetSku);
        return {
          order_id: orderData.id,
          product_id: dbProd?.id || dbProducts[0]?.id, // fallback
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        };
      });

      // Insert into sales_order_items
      const { error: itemsError } = await supabase
        .from('sales_order_items')
        .insert(orderItems);

      if (itemsError) {
        throw new Error(itemsError.message || 'Không thể tạo chi tiết đơn hàng');
      }

      // 4. Update warehouse stock for each item
      for (const item of items) {
        const targetSku = item.id === 'sauce-250' ? 'MK-250' : 'MK-500G';
        const dbProd = dbProducts.find(p => p.sku === targetSku);
        if (dbProd) {
          const { data: invItem } = await supabase
            .from('inventory')
            .select('*')
            .eq('product_id', dbProd.id)
            .maybeSingle();

          if (invItem) {
            await supabase
              .from('inventory')
              .update({
                quantity: Math.max(0, invItem.quantity - item.quantity),
              })
              .eq('id', invItem.id);
          }
        }
      }

      setOrderId(orderNumber);
    } catch (err: any) {
      console.error('Lỗi đặt hàng:', err);
      showToast('Đã xảy ra lỗi khi đặt hàng: ' + err.message, 'error');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setShowSuccess(true);
    clearCart();
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  // Calculate shipping fee based on region and quantity
  const total500mlEquivalent = items.reduce((total, item) => {
    // 250ml counts as 0.5 of 500ml
    const ml = item.weight?.includes('250') ? 125 : item.weight?.includes('500') ? 250 : 250;
    return total + (ml / 250) * item.quantity;
  }, 0);

  const shippingFee = formData.shippingRegion === 'ha-noi'
    ? Math.ceil(total500mlEquivalent) * SHIPPING_INFO.haNoi.feePer500ml
    : Math.ceil(total500mlEquivalent) * SHIPPING_INFO.mienNam.feePer500ml;

  const grandTotal = totalPrice + shippingFee;

  const handleFinish = () => {
    navigate('/');
  };

  const vietQrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-compact.png?amount=${grandTotal}&addInfo=${orderId}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-[#FCFAF7]">
        <Header />
        <div className="h-16 lg:h-20" />
        <div className="section-container py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={36} className="text-gray-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h1>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm đặc sản của HTX Hoa Lợi.
          </p>
          <button
            onClick={() => navigate('/san-pham')}
            className="inline-flex items-center gap-2 bg-brand-red text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20"
          >
            <ChevronLeft size={16} />
            Tiếp tục mua sắm
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-gray-800 antialiased">
      <Header />
      <div className="h-16 lg:h-20" />

      <div className="section-container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-brand-brown-dark">
              {showSuccess ? 'Đặt hàng thành công' : 'Thanh toán'}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {showSuccess
                ? `Mã đơn hàng của bạn: ${orderId}`
                : 'Hoàn tất đơn hàng của bạn trong 3 bước đơn giản'}
            </p>
          </div>

          {/* Step Progress Bar */}
          {!showSuccess && (
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-500'
                }`}>1</span>
                <span className={`text-sm font-semibold hidden sm:block ${step >= 1 ? 'text-brand-red' : 'text-gray-400'}`}>Giỏ hàng</span>
              </div>
              <div className={`flex-1 h-px mx-3 ${step >= 2 ? 'bg-brand-red' : 'bg-gray-200'}`} />
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-500'
                }`}>2</span>
                <span className={`text-sm font-semibold hidden sm:block ${step >= 2 ? 'text-brand-red' : 'text-gray-400'}`}>Thông tin</span>
              </div>
              <div className={`flex-1 h-px mx-3 ${step >= 3 ? 'bg-brand-red' : 'bg-gray-200'}`} />
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 3 ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-500'
                }`}>3</span>
                <span className={`text-sm font-semibold hidden sm:block ${step >= 3 ? 'text-brand-red' : 'text-gray-400'}`}>Thanh toán</span>
              </div>
            </div>
          )}

          {/* Success View */}
          {showSuccess ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={36} className="text-green-600" />
                </div>
                <h2 className="font-display font-extrabold text-2xl text-gray-800 mt-4">Đặt hàng thành công!</h2>
                <p className="text-xs text-gray-500 mt-1">Mã đơn hàng: <strong className="text-brand-red font-bold">{orderId}</strong></p>
              </div>

              {/* Receipt */}
              <div className="bg-gray-50 rounded-2xl p-4 text-left text-sm text-gray-600 space-y-2 border border-gray-100">
                <div className="flex justify-between font-bold text-gray-800 pb-2 border-b border-gray-200">
                  <span>Sản phẩm</span>
                  <span>Tạm tính</span>
                </div>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between pt-1">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-gray-500 pt-2 border-t border-gray-200">
                  <span>Phí vận chuyển ({formData.shippingRegion === 'ha-noi' ? 'Hà Nội' : 'Miền Nam/Tỉnh'}):</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-200 text-base">
                  <span>Tổng thanh toán</span>
                  <span className="text-brand-red">{formatPrice(grandTotal)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 space-y-1 text-gray-500 text-xs">
                  <p><strong>Họ tên:</strong> {formData.name}</p>
                  <p><strong>SĐT:</strong> {formData.phone}</p>
                  <p><strong>Địa chỉ:</strong> {formData.address}</p>
                </div>
              </div>

              {/* VietQR */}
              {formData.paymentMethod === 'bank' && (
                <div className="border border-brand-gold/20 bg-brand-cream-light/10 rounded-2xl p-5 space-y-4">
                  <div className="text-center">
                    <div className="inline-block bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm relative">
                      <img src={vietQrUrl} alt="VietQR Pay Code" className="w-48 h-48 mx-auto" />
                      <span className="absolute bottom-2 right-2 bg-brand-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">VietQR</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">Mở ứng dụng Ngân hàng quét mã QR để thanh toán</p>
                  </div>
                  <div className="bg-white rounded-xl p-3.5 border border-gray-100 text-left text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-gray-400">Ngân hàng:</span><span className="font-bold">{BANK_INFO.bankName}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Chủ TK:</span><span className="font-bold">{BANK_INFO.accountName}</span></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Số TK:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-brand-red">{BANK_INFO.accountNo}</span>
                        <button onClick={() => copyToClipboard(BANK_INFO.accountNo, 'acc')} className="p-1 hover:bg-gray-100 rounded border border-gray-100">
                          {copied === 'acc' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Nội dung CK:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{orderId}</span>
                        <button onClick={() => copyToClipboard(orderId, 'ref')} className="p-1 hover:bg-gray-100 rounded border border-gray-100">
                          {copied === 'ref' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center space-y-4">
                <p className="text-xs text-brand-gold-dark font-bold">Chúng tôi sẽ liên hệ xác nhận đơn trong vòng 30 phút.</p>
                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors"
                >
                  Hoàn tất & Tiếp tục mua sắm
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Review Cart */}
              {step === 1 && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8">
                  <h2 className="font-display font-bold text-lg text-brand-brown-dark mb-6 flex items-center gap-2">
                    <Package size={20} className="text-brand-red" />
                    Giỏ hàng ({totalItems} sản phẩm)
                  </h2>

                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-brand-brown-dark">{item.name}</p>
                          {item.weight && <p className="text-[10px] text-gray-500">{item.weight}</p>}
                          <p className="text-brand-red font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={12} />
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Tạm tính ({totalItems} sản phẩm):</span>
                    <span className="text-xl font-extrabold text-brand-red font-display">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}

              {/* STEP 2: Shipping Info */}
              {step === 2 && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 space-y-5">
                  <h2 className="font-display font-bold text-lg text-brand-brown-dark mb-2 flex items-center gap-2">
                    <User size={20} className="text-brand-red" />
                    Thông tin giao hàng
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <User size={12} className="inline mr-1" /> Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'} focus:border-brand-red focus:bg-white outline-none transition-all text-sm`}
                    />
                    {errors.name && <p className="text-brand-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <Phone size={12} className="inline mr-1" /> Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912518745"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'} focus:border-brand-red focus:bg-white outline-none transition-all text-sm`}
                    />
                    {errors.phone && <p className="text-brand-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <MapPin size={12} className="inline mr-1" /> Địa chỉ giao hàng *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Số nhà, tên đường, thôn bản, phường/xã, tỉnh thành..."
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'} focus:border-brand-red focus:bg-white outline-none transition-all resize-none text-sm`}
                    />
                    {errors.address && <p className="text-brand-red text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <Truck size={12} className="inline mr-1" /> Khu vực giao hàng *
                    </label>
                    <select
                      value={formData.shippingRegion}
                      onChange={e => setFormData({ ...formData, shippingRegion: e.target.value as 'ha-noi' | 'mien-nam' })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red outline-none transition-all text-sm bg-white"
                    >
                      <option value="ha-noi">Hà Nội (1.000đ/chai 500ml)</option>
                      <option value="mien-nam">Miền Nam & Tỉnh khác (3.000đ/chai 500ml)</option>
                    </select>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Thời gian giao: {formData.shippingRegion === 'ha-noi' ? SHIPPING_INFO.deliveryTime.haNoi : SHIPPING_INFO.deliveryTime.mienNam}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      <MessageCircle size={12} className="inline mr-1" /> Ghi chú (tùy chọn)
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={e => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red outline-none transition-all resize-none text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 space-y-5">
                  <h2 className="font-display font-bold text-lg text-brand-brown-dark mb-2 flex items-center gap-2">
                    <CreditCard size={20} className="text-brand-red" />
                    Phương thức thanh toán
                  </h2>

                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-brand-red bg-brand-red/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="w-5 h-5 accent-brand-red flex-shrink-0"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-sm text-gray-800 block">Thanh toán khi nhận hàng (COD)</span>
                        <span className="text-xs text-gray-400 block mt-0.5">Trả tiền mặt khi shipper giao hàng tận nhà</span>
                      </div>
                      <Truck size={20} className={formData.paymentMethod === 'cod' ? 'text-brand-red' : 'text-gray-400'} />
                    </label>

                    <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'bank'
                        ? 'border-brand-red bg-brand-red/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                        className="w-5 h-5 accent-brand-red flex-shrink-0"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-sm text-gray-800 block">Chuyển khoản Ngân hàng (VietQR)</span>
                        <span className="text-xs text-gray-400 block mt-0.5">Quét mã QR chuyển khoản nhanh, an toàn</span>
                      </div>
                      <CreditCard size={20} className={formData.paymentMethod === 'bank' ? 'text-brand-red' : 'text-gray-400'} />
                    </label>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mt-4">
                    <p className="font-bold text-gray-700 text-sm mb-3">Tóm tắt đơn hàng</p>
                    <div className="space-y-2 text-sm">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-gray-500">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-gray-500 pt-3 border-t border-gray-200 mt-3 text-sm">
                      <span>Phí vận chuyển ({formData.shippingRegion === 'ha-noi' ? 'Hà Nội' : 'Miền Nam/Tỉnh'}):</span>
                      <span>{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-800 pt-3 border-t border-gray-200 mt-3 text-base">
                      <span>Tổng thanh toán</span>
                      <span className="text-brand-red">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-sm transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft size={16} /> Quay lại
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-red/20 flex items-center justify-center gap-1 transition-colors"
                  >
                    Tiếp tục <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-red/20 flex items-center justify-center gap-1 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang xác nhận...
                      </>
                    ) : (
                      <>
                        Đặt hàng ngay <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Security note */}
              <p className="text-center text-xs text-gray-400">
                <Phone size={10} className="inline mr-1" />
                Cần hỗ trợ? Gọi {COMPANY_INFO.hotline} (8h-20h)
              </p>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
