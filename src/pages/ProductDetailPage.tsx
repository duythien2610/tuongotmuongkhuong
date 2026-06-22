import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, ShoppingCart, CheckCircle2, ShieldCheck, Award,
  Leaf, Truck, Heart, Share2, ChevronRight, Minus, Plus,
  ArrowLeft, BadgeCheck, Package, Phone, MapPin
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/Toast';
import { formatPrice, COMPANY_INFO, REVIEWS, PRESERVATIVE_INFO, STORAGE_INFO } from '../data/product';
import { ALL_PRODUCTS, Product } from './ProductPage';

function calculateDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function getRelatedProducts(current: Product): Product[] {
  return ALL_PRODUCTS.filter(p => p.id !== current.id).slice(0, 4);
}

const CERTIFICATIONS = [
  { icon: Award, label: 'OCOP 3 Sao', desc: 'Chứng nhận chất lượng quốc gia' },
  { icon: ShieldCheck, label: 'VSATTP', desc: 'Giấy chứng nhận an toàn thực phẩm' },
  { icon: BadgeCheck, label: '100% Tự nhiên', desc: 'Không phẩm màu, không chất tạo cay' },
  { icon: Leaf, label: 'Bền vững', desc: 'Hỗ trợ 50+ hộ nông dân địa phương' },
];

const INGREDIENTS = [
  'Ớt thóc tươi Mường Khương',
  'Tỏi bản địa Tây Bắc',
  'Muối hạt Biển Đông',
  'Đường mía tự nhiên',
  'Giấm gạo truyền thống',
];

const USAGE_STEPS = [
  'Dùng làm nước chấm cho các món thịt sấy, nướng, lẩu',
  'Thêm vào nước dùng phở, bún để tăng vị cay đậm đà',
  'Chấm cùng rau luộc, măng ớt đặc sản vùng cao',
  'Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp',
];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const buyNow = searchParams.get('buyNow') === 'true';
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = ALL_PRODUCTS.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);
  const qtyInputRef = useRef<HTMLInputElement>(null);
  const buyBtnRef = useRef<HTMLButtonElement>(null);

  const productImages = product
    ? [product.image, ...ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => p.image)]
    : [];

  // Scroll to order section when buyNow=true
  useEffect(() => {
    if (buyNow && product && orderRef.current) {
      const timer = setTimeout(() => {
        orderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsPulseActive(true);
        qtyInputRef.current?.focus();
        const pulseTimer = setTimeout(() => setIsPulseActive(false), 3000);
        return () => clearTimeout(pulseTimer);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [buyNow, product]);

  // Listen for pulse trigger from FloatingCTA
  useEffect(() => {
    const handlePulse = () => {
      if (orderRef.current) {
        orderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsPulseActive(true);
        qtyInputRef.current?.focus();
        setTimeout(() => setIsPulseActive(false), 3000);
      }
    };
    window.addEventListener('trigger-buy-pulse', handlePulse);
    return () => window.removeEventListener('trigger-buy-pulse', handlePulse);
  }, []);

  // Scroll animation for sections
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">Sản phẩm không tồn tại</h1>
          <p className="text-gray-500 text-sm mb-6">Sản phẩm bạn tìm kiếm không có trong hệ thống.</p>
          <Link
            to="/san-pham"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-red-dark transition-colors"
          >
            <ArrowLeft size={16} />
            Quay lại sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        weight: product.weight,
        category: product.categoryLabel,
      });
    }
    showToast(`Đã thêm ${quantity}x "${product.name}" vào giỏ hàng`, 'success');
  };

  const handleBuyNow = () => {
    // Add to cart with selected quantity, then navigate to checkout
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        weight: product.weight,
        category: product.categoryLabel,
      });
    }
    navigate('/thanh-toan');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-gray-800 antialiased">
      <Header />
      <div className="h-16 lg:h-20" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="section-container py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link to="/san-pham" className="hover:text-brand-red transition-colors">Sản phẩm</Link>
            <ChevronRight size={12} />
            <span className="text-brand-brown-dark font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-8 lg:py-12">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={productImages[selectedImage] || product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                    product.badgeVariant === 'bestseller' ? 'bg-brand-red text-white' :
                    product.badgeVariant === 'new' ? 'bg-emerald-600 text-white' :
                    product.badgeVariant === 'gift' ? 'bg-brand-gold text-brand-brown-dark' :
                    product.badgeVariant === 'ocop' ? 'bg-brand-gold text-brand-brown-dark' :
                    'bg-brand-red text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-brand-gold text-brand-brown-dark px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedImage(i); setIsImageLoaded(false); }}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-brand-red shadow-md' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category + Name */}
              <div>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">{product.categoryLabel}</span>
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-brand-brown-dark mt-2 leading-snug">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'fill-gray-200 text-gray-200'} />
                  ))}
                </div>
                <span className="text-sm text-gray-700 font-semibold">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} đánh giá)</span>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-gray-500">{product.sold} đã bán</span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-brand-red/5 to-transparent p-4 rounded-xl border border-brand-red/10">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-brand-red font-display">{formatPrice(product.price)}</span>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="bg-brand-gold text-brand-brown-dark text-xs font-bold px-2 py-0.5 rounded-full">Tiết kiệm {formatPrice(product.originalPrice - product.price)}</span>
                </div>
                {product.weight && (
                  <p className="text-sm text-gray-500 mt-1">
                    {product.category === 'tuong-ot' ? 'Dung tích' : 'Khối lượng'}: {product.weight}
                  </p>
                )}
              </div>

              {/* Certifications */}
              <div className="grid grid-cols-2 gap-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-gray-100">
                    <div className="w-9 h-9 bg-brand-red/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <cert.icon size={18} className="text-brand-red" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-brown-dark">{cert.label}</p>
                      <p className="text-[10px] text-gray-500">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Block */}
              <div ref={orderRef} id="order-block" className={`bg-white p-5 rounded-2xl border-2 transition-all duration-500 ${isPulseActive ? 'border-brand-red shadow-lg shadow-brand-red/20' : 'border-gray-100'}`}>
                {/* Quantity */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-gray-700">Số lượng:</span>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      ref={qtyInputRef}
                      type="number"
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                      className="w-14 text-center font-bold text-lg bg-transparent outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(99, quantity + 1))}
                      className="w-9 h-9 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Còn {product.stock} sản phẩm</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-gray-100">
                  <span className="text-sm text-gray-600">Tạm tính:</span>
                  <span className="text-xl font-extrabold text-brand-red font-display">{formatPrice(product.price * quantity)}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    ref={buyBtnRef}
                    onClick={handleBuyNow}
                    className={`flex-1 bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-red/20 hover:shadow-xl hover:-translate-y-0.5 ${isPulseActive ? 'animate-pulse' : ''}`}
                  >
                    <ShoppingCart size={18} />
                    THANH TOÁN NGAY
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-brand-brown-dark font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Thêm vào giỏ
                  </button>
                </div>

                {/* Wishlist + Share */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      rating: product.rating,
                      sold: product.sold,
                    })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      inWishlist ? 'bg-red-50 text-brand-red' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart size={16} className={inWishlist ? 'fill-brand-red' : ''} />
                    {inWishlist ? 'Đã yêu thích' : 'Yêu thích'}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast('Đã sao chép liên kết sản phẩm', 'success');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <Share2 size={16} />
                    Chia sẻ
                  </button>
                </div>
              </div>

              {/* Shipping info */}
              <div className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <Truck size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Giao hàng toàn quốc</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Miễn phí vận chuyển đơn từ 200.000đ. Giao nhanh 1-3 ngày.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Details */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-brand-brown-dark mb-4">Mô tả sản phẩm</h2>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  {product.description}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base mt-4">
                  Tương ớt Mường Khương được chế biến từ 100% ớt thóc tươi trồng trên sườn núi cao 1000m tại Mường Khương, Lào Cai.
                  Quy trình lên men tự nhiên kéo dài 2-3 tháng theo bí quyết gia truyền hơn 20 năm của HTX Hoa Lợi,
                  tạo nên hương vị cay nồng đặc trưng, màu đỏ tự nhiên và mùi thơm dịu của tỏi bản địa.
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-display text-xl font-bold text-brand-brown-dark mb-4">Thành phần</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {INGREDIENTS.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <CheckCircle2 size={16} className="text-brand-red flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Instructions */}
              <div>
                <h3 className="font-display text-xl font-bold text-brand-brown-dark mb-4">Hướng dẫn sử dụng</h3>
                <div className="space-y-3">
                  {USAGE_STEPS.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-brand-brown-dark mb-4 flex items-center gap-2">
                  <Award size={18} className="text-brand-gold" />
                  Chứng nhận chất lượng
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <img src="/images/products/z7953312318224_183439eb52b1750abc9b6dc1c2322041.jpg" alt="OCOP 3 Sao" className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="text-sm font-bold text-brand-brown-dark">OCOP 3 Sao</p>
                        <p className="text-[10px] text-gray-500">UBND Thành phố Lào Cai</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <img src="/images/products/z7953315372291_e96d043b7326f59917c6754df0ba900a.jpg" alt="VSATTP" className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="text-sm font-bold text-brand-brown-dark">VSATTP</p>
                        <p className="text-[10px] text-gray-500">Giấy chứng nhận ATTP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-brand-brown-dark mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand-red" />
                  Hạn sử dụng & Bảo quản
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <p><strong>Hạn sử dụng:</strong> {STORAGE_INFO.shelfLife}</p>
                  <p><strong>Chưa mở nắp:</strong> {STORAGE_INFO.beforeOpen}</p>
                  <p><strong>Sau khi mở nắp:</strong> {STORAGE_INFO.afterOpen}</p>
                  <div className="h-px bg-gray-200 my-2" />
                  <p className="text-[11px] leading-relaxed text-gray-500 italic">{PRESERVATIVE_INFO.full}</p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-brand-brown-dark mb-3">Thông tin liên hệ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-brand-red" />
                    <span>{COMPANY_INFO.hotline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} className="text-brand-red" />
                    <span className="text-xs">{COMPANY_INFO.address}</span>
                  </div>
                </div>
                <a
                  href={COMPANY_INFO.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Nhắn Zalo tư vấn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-[#FAF8F5]" data-animate id="reviews">
        <div className="section-container">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="font-display text-2xl font-bold text-brand-brown-dark mb-2">Đánh giá từ khách hàng</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="font-bold text-brand-brown-dark">4.9</span>
              <span className="text-gray-500 text-sm">({REVIEWS.length} đánh giá)</span>
            </div>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-150 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {REVIEWS.slice(0, 4).map((r) => (
              <div key={r.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-brand-gold/30" />
                  <div>
                    <p className="font-bold text-sm text-brand-brown-dark">{r.name}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={10} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">"{r.content}"</p>
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{r.date}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">✓ Đã mua</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-white" data-animate id="related">
        <div className="section-container">
          <div className={`flex items-center justify-between mb-8 transition-all duration-700 ${visibleSections.has('related') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-brown-dark">Sản phẩm liên quan</h2>
              <p className="text-sm text-gray-500 mt-1">Có thể bạn cũng quan tâm</p>
            </div>
            <Link
              to="/san-pham"
              className="text-sm text-brand-red font-semibold hover:underline flex items-center gap-1"
            >
              Xem tất cả
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-150 ${visibleSections.has('related') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {relatedProducts.map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Link
                      to={`/san-pham/${p.slug}`}
                      className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-brand-brown-dark font-semibold px-4 py-2 rounded-xl text-xs shadow-lg"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider">{p.categoryLabel}</span>
                  <h3 className="font-bold text-sm text-brand-brown-dark mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-brand-red font-extrabold text-sm">{formatPrice(p.price)}</span>
                    <span className="text-gray-400 line-through text-xs">{formatPrice(p.originalPrice)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
