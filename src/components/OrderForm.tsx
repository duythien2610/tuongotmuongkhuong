import { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Phone, MapPin, User, Package, MessageCircle, CreditCard, Truck, Copy, Check, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { PRODUCT_VARIANTS, formatPrice, COMPANY_INFO } from '../data/product';

interface FormData {
  name: string;
  phone: string;
  address: string;
  product: number;
  quantity: number;
  paymentMethod: 'cod' | 'bank';
  note: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export default function OrderForm() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1); // Steps: 1 (Product), 2 (Info), 3 (Payment)
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    product: 1,
    quantity: 1,
    paymentMethod: 'cod',
    note: '',
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

  const selectedProduct = PRODUCT_VARIANTS.find(p => p.id === formData.product) || PRODUCT_VARIANTS[0];
  const totalPrice = selectedProduct.price * formData.quantity;

  const handleNextStep = () => {
    if (step === 1) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Sinh mã đơn hàng ngẫu nhiên
    const randomId = Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);

    // Mô phỏng đặt hàng
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClose = () => {
    setShowForm(false);
    setShowSuccess(false);
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      address: '',
      product: 1,
      quantity: 1,
      paymentMethod: 'cod',
      note: '',
    });
    setErrors({});
  };

  // Tạo URL ảnh VietQR tự động tính tiền
  const vietQrUrl = `https://img.vietqr.io/image/vietinbank-101870000000-compact.png?amount=${totalPrice}&addInfo=DH${orderId}&accountName=HTX%20HOA%20LOI`;

  return (
    <>
      {/* Nút kích hoạt Form Đặt hàng */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full blur-xl" />
        <h3 className="font-display font-extrabold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <Package size={20} className="text-brand-red animate-pulse" />
          Đặt Hàng Nhanh (Khách vãng lai)
        </h3>
        <p className="text-xs text-gray-500 mb-5 leading-relaxed font-sans">
          Không cần đăng ký tài khoản rườm rà. Bạn chỉ cần thực hiện 3 bước điền thông tin để đặt hàng trực tiếp từ HTX Hoa Lợi.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-brand-red/30 active:scale-[0.98] shadow-lg shadow-brand-red/20 font-sans"
        >
          🛒 ĐẶT HÀNG NGAY BẰNG 3 BƯỚC
        </button>
        <p className="text-[10px] text-gray-400 mt-3 text-center font-sans">
          Hoặc đặt qua điện thoại: <a href={COMPANY_INFO.hotlineLink} className="text-brand-red font-semibold hover:underline">{COMPANY_INFO.hotline}</a>
        </p>
      </div>

      {/* Modal Checkout Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in flex flex-col">
            
            {/* Header */}
            <div className="sticky top-0 bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
              <div>
                <h2 className="font-display font-extrabold text-lg text-brand-brown-dark">Đặt hàng vãng lai</h2>
                <p className="text-[10px] text-gray-400 uppercase font-sans tracking-wider mt-0.5">HTX Hoa Lợi · OCOP 3 Sao</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-gray-200/50 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Step Progress Bar */}
            {!showSuccess && (
              <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-3 flex justify-between items-center text-xs font-bold text-gray-400 font-sans">
                <span className={`flex items-center gap-1 ${step >= 1 ? 'text-brand-red' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-brand-red bg-brand-red text-white' : 'border-gray-300'}`}>1</span>
                  Sản phẩm
                </span>
                <span className="w-10 h-px bg-gray-200" />
                <span className={`flex items-center gap-1 ${step >= 2 ? 'text-brand-red' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-brand-red bg-brand-red text-white' : 'border-gray-300'}`}>2</span>
                  Giao hàng
                </span>
                <span className="w-10 h-px bg-gray-200" />
                <span className={`flex items-center gap-1 ${step >= 3 ? 'text-brand-red' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-brand-red bg-brand-red text-white' : 'border-gray-300'}`}>3</span>
                  Thanh toán
                </span>
              </div>
            )}

            {/* Success Page or wizard steps */}
            {showSuccess ? (
              <div className="p-6 space-y-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={36} className="text-green-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-2xl text-gray-800">Đặt hàng thành công!</h3>
                  <p className="text-xs text-gray-500 font-sans">Mã đơn hàng của bạn: <strong className="text-brand-red font-bold">#{orderId}</strong></p>
                </div>

                {/* Receipt summary */}
                <div className="bg-gray-50 rounded-2xl p-4 text-left text-xs text-gray-600 space-y-2 border border-gray-100 font-sans">
                  <div className="flex justify-between font-bold text-gray-800 pb-1.5 border-b border-gray-200">
                    <span>Sản phẩm</span>
                    <span>Tạm tính</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>{selectedProduct.name} (x{formData.quantity})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-200 text-sm">
                    <span>Tổng tiền (Freeship)</span>
                    <span className="text-brand-red">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 space-y-1 text-gray-500">
                    <p>🧑 <strong>Họ tên:</strong> {formData.name}</p>
                    <p>📞 <strong>SĐT nhận hàng:</strong> {formData.phone}</p>
                    <p>📍 <strong>Địa chỉ giao:</strong> {formData.address}</p>
                  </div>
                </div>

                {/* Chuyển khoản VietQR */}
                {formData.paymentMethod === 'bank' && (
                  <div className="border border-brand-gold/20 bg-brand-cream-light/10 rounded-2xl p-5 space-y-4">
                    <div className="text-center">
                      <div className="inline-block bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm relative group">
                        <img src={vietQrUrl} alt="VietQR Pay Code" className="w-48 h-48 mx-auto" />
                        <span className="absolute bottom-2 right-2 bg-brand-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">VietQR</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 font-sans">Mở ứng dụng Ngân hàng / ví điện tử quét mã QR để thanh toán tự động</p>
                    </div>

                    {/* Bank Transfer Details */}
                    <div className="bg-white rounded-xl p-3.5 border border-gray-100 text-left text-xs space-y-2.5 font-sans">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Ngân hàng:</span>
                        <span className="font-bold text-gray-800">Vietinbank</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Chủ tài khoản:</span>
                        <span className="font-bold text-gray-800">HTX HOA LOI</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Số tài khoản:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-brand-red text-sm">101870000000</span>
                          <button
                            onClick={() => copyToClipboard('101870000000', 'accNum')}
                            className="p-1 hover:bg-gray-100 rounded border border-gray-100 transition-colors"
                          >
                            {copied === 'accNum' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Nội dung CK:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-800">DH{orderId}</span>
                          <button
                            onClick={() => copyToClipboard(`DH${orderId}`, 'content')}
                            className="p-1 hover:bg-gray-100 rounded border border-gray-100 transition-colors"
                          >
                            {copied === 'content' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-xs text-brand-gold-dark font-bold">
                     Chúng tôi sẽ liên hệ xác nhận đơn trong vòng 30 phút.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors font-sans"
                  >
                    Hoàn tất & Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 flex-grow flex flex-col justify-between overflow-y-auto space-y-5">
                
                {/* STEP 1: SELECT PRODUCT */}
                {step === 1 && (
                  <div className="space-y-4 flex-grow">
                    <div className="bg-brand-red/5 p-4 rounded-2xl flex items-center gap-3">
                      <Award className="text-brand-red" size={24} />
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">
                        Mỗi chai tương ớt được đóng chai cẩn thận, dán tem OCOP 3 Sao bảo đảm chất lượng.
                      </p>
                    </div>

                    {/* Product Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase font-sans">1. Chọn sản phẩm</label>
                      <div className="grid gap-3">
                        {PRODUCT_VARIANTS.map((p) => (
                          <label
                            key={p.id}
                            className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                              formData.product === p.id 
                                ? 'border-brand-red bg-brand-red/5' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="checkout-product"
                              value={p.id}
                              checked={formData.product === p.id}
                              onChange={() => setFormData({ ...formData, product: p.id })}
                              className="w-4 h-4 accent-brand-red flex-shrink-0"
                            />
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                              <span className="font-bold text-xs text-gray-800 block">{p.name} ({p.weight})</span>
                              <span className="text-[10px] text-gray-400 block mt-0.5 line-clamp-1">{p.description}</span>
                            </div>
                            <span className="font-black text-brand-red text-sm flex-shrink-0">{formatPrice(p.price)}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Quantity selection */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase font-sans">2. Chọn Số lượng</label>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-150">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-bold text-sm">{formData.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 font-sans">Tổng tiền sản phẩm</p>
                          <p className="font-black text-brand-red text-lg leading-tight">{formatPrice(totalPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: SHIPPING INFO */}
                {step === 2 && (
                  <div className="space-y-4 flex-grow">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase font-sans mb-1.5">
                        <User size={12} className="inline mr-1" /> Họ và tên khách nhận *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'} focus:border-brand-red focus:bg-white outline-none transition-all text-sm`}
                        required
                      />
                      {errors.name && <p className="text-brand-red text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase font-sans mb-1.5">
                        <Phone size={12} className="inline mr-1" /> Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0912518745"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'} focus:border-brand-red focus:bg-white outline-none transition-all text-sm`}
                        required
                      />
                      {errors.phone && <p className="text-brand-red text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase font-sans mb-1.5">
                        <MapPin size={12} className="inline mr-1" /> Địa chỉ giao hàng *
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Số nhà, tên đường, thôn bản, phường/xã, tỉnh thành..."
                        rows={2}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'} focus:border-brand-red focus:bg-white outline-none transition-all resize-none text-sm`}
                        required
                      />
                      {errors.address && <p className="text-brand-red text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.address}</p>}
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase font-sans mb-1.5">
                        <MessageCircle size={12} className="inline mr-1" /> Ghi chú giao hàng (tùy chọn)
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

                {/* STEP 3: PAYMENT METHOD */}
                {step === 3 && (
                  <div className="space-y-4 flex-grow">
                    <label className="block text-xs font-bold text-gray-500 uppercase font-sans mb-2">Chọn hình thức thanh toán</label>
                    <div className="space-y-3 font-sans">
                      
                      {/* COD */}
                      <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod' 
                          ? 'border-brand-red bg-brand-red/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="checkout-payment"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="w-5 h-5 accent-brand-red flex-shrink-0"
                        />
                        <div className="flex-1">
                          <span className="font-bold text-xs text-gray-800 block">Thanh toán khi nhận hàng (COD)</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">Khách trả tiền mặt khi Shipper giao hàng tận nhà.</span>
                        </div>
                        <Truck size={20} className={formData.paymentMethod === 'cod' ? 'text-brand-red' : 'text-gray-400'} />
                      </label>

                      {/* Bank QR */}
                      <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === 'bank' 
                          ? 'border-brand-red bg-brand-red/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="checkout-payment"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                          className="w-5 h-5 accent-brand-red flex-shrink-0"
                        />
                        <div className="flex-1">
                          <span className="font-bold text-xs text-gray-800 block">Chuyển khoản Ngân hàng (VietQR)</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">Quét mã QR chuyển khoản nhanh, an toàn tuyệt đối.</span>
                        </div>
                        <CreditCard size={20} className={formData.paymentMethod === 'bank' ? 'text-brand-red' : 'text-gray-400'} />
                      </label>
                    </div>

                    {/* Order summary row */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-150 space-y-2 mt-4 font-sans text-xs">
                      <p className="font-bold text-gray-700">Tóm tắt đơn hàng</p>
                      <div className="flex justify-between text-gray-500">
                        <span>{selectedProduct.name} (x{formData.quantity})</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-gray-800 pt-2 border-t border-gray-200">
                        <span>Tổng thanh toán</span>
                        <span className="text-brand-red">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer buttons of form */}
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-sm transition-colors flex items-center gap-1 font-sans"
                    >
                      <ChevronLeft size={16} /> Quay lại
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-grow py-3.5 bg-gradient-to-r from-brand-red to-brand-red-dark text-white rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:shadow-brand-red/20 flex items-center justify-center gap-1 font-sans"
                    >
                      Tiếp tục <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow py-3.5 bg-gradient-to-r from-brand-red to-brand-red-dark text-white rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:shadow-brand-red/20 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
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
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
