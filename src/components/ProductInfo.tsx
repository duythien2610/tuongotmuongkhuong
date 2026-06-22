import { Star, Award, ShieldCheck, MapPin, TrendingUp, Zap, MessageCircle, Package, Clock, CheckCircle2, Truck, Heart, Share2 } from 'lucide-react';
import { PRODUCT_VARIANTS, formatPrice, calculateDiscount } from '../data/product';

interface ProductInfoProps {
  selectedVariant: number;
  onSelectVariant: (id: number) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export default function ProductInfo({
  selectedVariant,
  onSelectVariant,
  quantity,
  onQuantityChange,
}: ProductInfoProps) {
  const variant = PRODUCT_VARIANTS.find((v) => v.id === selectedVariant)!;
  const discount = calculateDiscount(variant.price, variant.originalPrice);
  const totalPrice = variant.price * quantity;
  const totalSaving = (variant.originalPrice - variant.price) * quantity;

  return (
    <div className="space-y-6">
      {/* Product Title with badges */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-gradient-to-r from-brand-gold to-amber-400 text-brand-brown-dark px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Award size={12} />
            OCOP 3★
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck size={12} />
            VSATTP
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-brown-dark leading-tight">
          TƯƠNG ỚT MƯỜNG KHƯƠNG<br />
          <span className="text-brand-red">CHÍNH GỐC</span>
        </h1>
        <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-brand-red" />
          Xuất xứ: Mường Khương, Lào Cai
        </p>
      </div>

      {/* Rating & Stats */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-brand-gold/10 px-3 py-1.5 rounded-lg">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${star <= 4 ? 'text-brand-gold fill-brand-gold' : 'text-brand-gold fill-brand-gold/80'}`}
              />
            ))}
          </div>
          <span className="font-bold text-gray-800 ml-1 text-sm">4.9</span>
        </div>
        <span className="text-sm text-gray-500">48 đánh giá</span>
        <span className="w-px h-4 bg-gray-200" />
        <span className="text-sm text-brand-red font-medium flex items-center gap-1">
          <TrendingUp size={14} />
          250+ đã bán
        </span>
      </div>

      {/* Price Box */}
      <div className="bg-gradient-to-br from-brand-red/10 via-brand-gold/5 to-transparent rounded-2xl p-6 border border-brand-red/10 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative">
          <div className="flex items-baseline gap-4 flex-wrap mb-3">
            <span className="text-3xl sm:text-4xl font-sans font-bold text-brand-red">
              {formatPrice(variant.price)}
            </span>
            <span className="text-lg text-gray-400 line-through font-sans">
              {formatPrice(variant.originalPrice)}
            </span>
            <span className="bg-brand-red text-white text-sm font-bold px-3 py-1 rounded-lg">
              -{discount}%
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              Tiết kiệm <span className="text-brand-red font-sans font-bold">{formatPrice(totalSaving)}</span>
            </span>
            {quantity > 1 && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold font-sans">
                Tổng: {formatPrice(totalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Variants */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Package size={14} className="text-brand-red" />
          Chọn quy cách:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRODUCT_VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelectVariant(v.id)}
              className={`relative p-4 rounded-2xl text-left transition-all duration-300 group ${
                selectedVariant === v.id
                  ? 'border-2 border-brand-red bg-brand-red/5 shadow-lg shadow-brand-red/10'
                  : 'border border-gray-200 hover:border-brand-red/40 bg-white hover:shadow-md'
              }`}
            >
              {/* Selected indicator */}
              {selectedVariant === v.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-brand-red rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
              )}

              {/* Image */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
                <img
                  src={v.image}
                  alt={v.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${selectedVariant === v.id ? 'scale-110' : 'group-hover:scale-105'}`}
                />
              </div>

              <p className="font-semibold text-sm text-gray-800">{v.name}</p>
              <p className="text-xs text-gray-500 mt-1">{v.weight}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-brand-red font-sans font-bold">{formatPrice(v.price)}</p>
                <span className="text-xs text-gray-400">{v.stock} có sẵn</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Package size={14} className="text-brand-red" />
          Số lượng:
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-xl overflow-hidden border-2 border-gray-200 bg-white">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-bold hover:text-brand-red"
            >
              −
            </button>
            <span className="w-16 h-12 flex items-center justify-center font-bold text-gray-800 border-x-2 border-gray-200 text-lg">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(Math.min(variant.stock, quantity + 1))}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-bold hover:text-brand-red"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500 flex items-center gap-1.5">
            <Clock size={14} />
            {variant.stock} sản phẩm có sẵn
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Primary CTA */}
        <button className="w-full bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/30 active:scale-[0.98] hover:-translate-y-0.5">
          <Zap size={22} className="animate-pulse" />
          MUA NGAY
          <span className="ml-2 bg-white/20 px-3 py-1 rounded-lg text-sm font-sans font-bold">
            {formatPrice(totalPrice)}
          </span>
        </button>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border-2 border-brand-red text-brand-red font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-brand-red hover:text-white transition-all duration-300 active:scale-[0.98]">
            <Package size={18} />
            Thêm vào giỏ
          </button>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <MessageCircle size={18} />
            Zalo đặt hàng
          </a>
        </div>

        {/* Action icons */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <button className="flex items-center gap-2 text-gray-500 hover:text-brand-red text-sm transition-colors">
            <Heart size={18} />
            <span className="hidden sm:inline">Yêu thích</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-brand-red text-sm transition-colors">
            <Share2 size={18} />
            <span className="hidden sm:inline">Chia sẻ</span>
          </button>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100">
        <h4 className="font-bold text-sm text-gray-700 mb-4 flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-500" />
          Cam kết từ Mường Khương
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: CheckCircle2, text: '100% chính hãng', color: 'text-green-500' },
            { icon: CheckCircle2, text: 'OCOP 3 Sao', color: 'text-brand-gold' },
            { icon: Truck, text: 'Ship toàn quốc', color: 'text-blue-500' },
            { icon: CheckCircle2, text: 'Kiểm tra trước nhận', color: 'text-purple-500' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <item.icon size={14} className={item.color} />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
