import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, ArrowRight, Award, ShieldCheck, Truck,
  Quote, Flame, Gift, Phone, MessageCircle,
  CheckCircle2, Leaf, Package, ChevronDown,
  MapPin, BadgeCheck, Heart, Users,
  BookOpen, Calendar, Clock,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { formatPrice, REVIEWS, COMBOS, calculateDiscount, COMPANY_INFO, BLOG_POSTS, BlogPost, ALL_PRODUCTS, IMG } from '../data/product';

/* ─── Scroll-reveal hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated Counter ─── */
function Counter({ to, label, suffix = '' }: { to: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [to]);
  return (
    <div className="text-center">
      <p className="text-4xl lg:text-5xl font-bold text-white font-display">
        {count.toLocaleString('vi-VN')}{suffix}
      </p>
      <p className="text-white/60 text-sm mt-1 font-medium">{label}</p>
    </div>
  );
}



const PROCESS_STEPS = [
  { step: 1, title: 'Canh tác vùng cao', desc: 'Ớt thóc trên sườn núi Mường Khương, độ cao 1000m', image: IMG.freshChili1 },
  { step: 2, title: 'Thu hoạch thủ công', desc: 'Ớt chín đỏ rực, hái tay chọn lọc từng quả đạt chuẩn', image: IMG.freshChili2 },
  { step: 3, title: 'Sơ chế & Phân loại', desc: 'Chọn lọc kỹ, loại bỏ quả hỏng, đảm bảo chất lượng đầu vào', image: IMG.giftBox },
  { step: 4, title: 'Xay & Chế biến', desc: 'Bí quyết gia truyền, phối gia vị rừng Tây Bắc độc đáo', image: IMG.cooking1 },
  { step: 5, title: 'Kiểm định OCOP', desc: 'Đạt chuẩn OCOP 3 Sao, đóng chai thủ công & niêm phong', image: IMG.sauce1 },
];

const COMPARE_ROWS = [
  { label: 'Nguyên liệu', us: '100% ớt thóc tươi vùng cao, tỏi bản địa', them: 'Ớt bột, ớt cô đặc đông lạnh, tinh bột biến tính' },
  { label: 'Chế biến', us: 'Lên men tự nhiên 2-3 tháng theo bí quyết gia truyền', them: 'Lên men công nghiệp bằng axit hóa học cấp tốc' },
  { label: 'Bảo quản', us: 'Bảo quản tự nhiên từ muối và rượu, kết hợp chất bảo quản đạt chuẩn Bộ Y tế, 100% không phẩm màu nhân tạo', them: 'Sorbic (200), Natri benzoat (211), phẩm màu nhân tạo' },
  { label: 'Chứng nhận', us: 'OCOP 3 Sao, Giấy chứng nhận ATTP', them: 'Sản xuất công nghiệp đại trà, không có chứng nhận đặc sản' },
  { label: 'Giá trị xã hội', us: 'Hỗ trợ 50+ hộ nông dân dân tộc thiểu số Mường Khương', them: 'Lợi nhuận tập trung cho tập đoàn hóa chất công nghiệp' },
];

export default function HomePage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { ref: featRef, inView: featIn } = useInView();
  const { ref: prodRef, inView: prodIn } = useInView();
  const { ref: storyRef, inView: storyIn } = useInView();
  const { ref: processRef, inView: processIn } = useInView();
  const { ref: cmpRef, inView: cmpIn } = useInView();
  const { ref: reviewRef, inView: reviewIn } = useInView();
  const { ref: newsRef, inView: newsIn } = useInView();
  const { ref: ctaRef, inView: ctaIn } = useInView();

  const getSlug = (post: BlogPost) => {
    return post.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] overflow-x-hidden font-sans text-gray-800 antialiased">
      <Header />

      {/* ═══════════════════════════════════════════════════
          HERO — Cinematic rustic wood backdrop
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] lg:min-h-[95vh] flex items-center overflow-hidden bg-brand-brown-dark">
        {/* Full-bleed wood background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_banner.jpg" 
            alt="Tương ớt Mường Khương khay gỗ" 
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-[2s]"
          />
          {/* Subtle vignettes to keep white overlay text extremely readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/95 via-transparent to-black/35" />
        </div>

        <div className="section-container relative z-10 w-full pt-32 pb-24 lg:pt-48 lg:pb-36">
          <div className="grid lg:grid-cols-12 gap-8 items-center">

            {/* Left aligned copy for cinematic look */}
            <div className={`lg:col-span-9 transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              
              {/* Trust Badge */}
              <div className="flex items-center gap-3 mb-7">
                <span className="bg-brand-gold text-brand-brown-dark text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-brand-gold/25">
                  Đặc sản OCOP 3 Sao
                </span>
                <span className="h-px w-12 bg-white/40" />
                <span className="text-white/80 text-xs font-semibold tracking-wider">HTX Hoa Lợi · Lào Cai</span>
              </div>

              {/* Tagline */}
              <p className="text-brand-gold-light text-xs font-extrabold tracking-[0.25em] uppercase mb-5">
                Hương vị truyền thống vùng cao Tây Bắc
              </p>

              {/* Main title aligned with the wooden image feeling */}
 <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-normal tracking-tight mb-8">
                <span className="block mb-3 sm:mb-4 lg:mb-5">ĐẬM ĐÀ HƯƠNG VỊ</span>
                <span className="block text-brand-gold-light">CHUẨN MƯỜNG KHƯƠNG</span>
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
                100% chế biến từ ớt thóc tươi vùng sườn núi cao 1000m, lên men tự nhiên theo bí quyết gia truyền hơn 20 năm. <strong className="text-white font-semibold">100% không phẩm màu nhân tạo, không chất tạo cay hóa học.</strong>
              </p>

              {/* CTA Buttons - Premium Minimalist */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/san-pham"
                  className="group bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-extrabold px-8 py-4 rounded-xl transition-all duration-300 active:scale-95 shadow-xl shadow-brand-gold/20 flex items-center gap-2 text-sm tracking-wider"
                >
                  MUA NGAY
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/cau-chuyen"
                  className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold px-8 py-4 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 active:scale-95 flex items-center gap-2 text-sm"
                >
                  Đọc câu chuyện
                </Link>
              </div>

              {/* Trust markers */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Flame, text: 'Vị cay thuần khiết' },
                  { icon: ShieldCheck, text: 'An toàn ATTP' },
                  { icon: Truck, text: 'Giao hàng nhanh toàn quốc' },
                ].map(({ icon: Icon, text }, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white/95 text-xs font-semibold px-4 py-2 rounded-full border border-white/10">
                    <Icon size={12} className="text-brand-gold" />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* OCOP 3-Sao Spinning Badge - Right corner */}
            <div className={`lg:col-span-3 transition-all duration-1000 delay-300 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="lg:flex hidden justify-center items-center">
                <div className="relative">
                  {/* Outer spinning ring with dashed border */}
                  <div className="w-44 h-44 rounded-full border-4 border-dashed border-brand-gold animate-spin-slow" />

                  {/* Inner glassmorphism badge */}
                  <div className="absolute inset-0 m-4 w-36 h-36 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex flex-col items-center justify-center text-center shadow-2xl">
                    <Award className="w-10 h-10 text-brand-gold mb-1" />
                    <span className="text-white font-bold text-lg leading-tight">OCOP</span>
                    <span className="text-brand-gold font-extrabold text-2xl">3 SAO</span>
                    <span className="text-white/70 text-[10px] mt-1">Chuẩn chất lượng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating background elements for visual interest */}
        <div className="absolute top-1/4 right-1/4 opacity-10 pointer-events-none animate-float-slow hidden lg:block">
          <Flame className="w-16 h-16 text-brand-red" />
        </div>
        <div className="absolute bottom-1/3 right-10 opacity-10 pointer-events-none animate-float-delayed hidden lg:block">
          <Leaf className="w-12 h-12 text-brand-gold" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-[9px] uppercase tracking-widest font-bold">Cuộn xuống</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES BAR
      ═══════════════════════════════════════════════════ */}
      <section
        ref={featRef}
        className="bg-[#FAF8F5] border-y border-gray-200/60 py-0"
      >
        <div className="section-container">
          <div className={`grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200/60 transition-all duration-750 ${featIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {[
              { icon: Flame, title: 'Cay nồng đặc trưng', desc: 'Ớt thóc vùng cao 1000m' },
              { icon: Award, title: 'OCOP 3 Sao', desc: 'Chuẩn chất lượng quốc gia' },
              { icon: ShieldCheck, title: 'An toàn ATTP', desc: 'Không phẩm màu nhân tạo' },
              { icon: Truck, title: 'Giao toàn quốc', desc: 'Freeship từ 200.000đ' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-6 group hover:bg-white transition-colors duration-300 ${i === 0 ? 'pl-0 lg:pl-6' : ''} ${i === 3 ? 'pr-0 lg:pr-6' : ''}`}>
                <div className="w-10 h-10 bg-brand-red/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/10 transition-colors duration-300">
                  <Icon size={20} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-brand-brown-dark font-bold text-sm">{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCTS — Premium Collection Grid (Prototype Style)
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FDFBF7] relative overflow-hidden" ref={prodRef}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #9A1F1E 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="section-container relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${prodIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Section tag — Prototype style pill */}
            <span className="inline-block px-5 py-2 bg-[rgba(212,163,115,0.15)] text-[#9A1F1E] border border-[rgba(212,163,115,0.3)] rounded-full font-heading text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
              Sản Phẩm
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-brown-dark mb-5 leading-tight">
              Bộ Sưu Tập<br /><em className="text-brand-red font-semibold italic">Tương Ớt Mường Khương</em>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
              Từng lọ tương được làm thủ công, mang trong mình hương vị núi rừng Tây Bắc và sự chăm chút của người dân bản địa.
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 transition-all duration-700 delay-150 ${prodIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {ALL_PRODUCTS.filter(p => ['sauce-250', 'sauce-garlic', 'combo-koc'].includes(p.id)).map((p, i) => {
              const tilts = ['-rotate-[3deg]', 'rotate-[2deg]', '-rotate-[1.5deg]'];
              const badgeClasses: Record<string, string> = {
                bestseller: 'bg-[#9A1F1E] text-white',
                new: 'bg-[#2D5A27] text-white',
                gift: 'bg-[#D4A373] text-white',
                ocop: 'bg-brand-gold text-brand-brown-dark',
              };
              const displayProduct = {
                name: p.name,
                category: p.id === 'combo-koc' ? 'Dành Cho Đại Lý' : p.id === 'sauce-garlic' ? 'Dòng Đặc Biệt' : 'Dòng Truyền Thống',
                price: p.price,
                originalPrice: p.originalPrice,
                image: p.image,
                badge: p.badge || 'Hot',
                badgeClass: badgeClasses[p.badgeVariant || ''] || 'bg-[#9A1F1E] text-white',
                rating: p.rating,
                reviews: p.reviews,
                volume: p.weight || '250ml',
                origin: p.id === 'combo-koc' ? 'Giao toàn quốc' : 'Mường Khương, Lào Cai',
                highlight: p.id === 'sauce-250',
                tilt: tilts[i % tilts.length],
                desc: p.description,
              };

              return (
                <div
                  key={i}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border ${
                    displayProduct.highlight ? 'border-[rgba(212,163,115,0.4)] ring-1 ring-[rgba(212,163,115,0.15)]' : 'border-[rgba(212,163,115,0.15)]'
                  } relative`}
                >
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-heading text-[9px] font-bold tracking-[0.05em] uppercase shadow-sm ${displayProduct.badgeClass}`}>
                      {displayProduct.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-20 bg-white text-[#9A1F1E] font-heading font-extrabold text-[10px] px-2 py-0.5 rounded-lg shadow-sm border border-[rgba(154,31,30,0.15)]">
                    -{calculateDiscount(displayProduct.price, displayProduct.originalPrice)}%
                  </div>

                  {/* Image wrap — aspect-square ratio with bg-gray-50 (Giai đoạn 2) */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img
                      src={displayProduct.image}
                      alt={displayProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    {/* Quick-action overlay — appears on hover */}
                    <div className="absolute inset-0 bg-[rgba(154,31,30,0.5)] backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <Link
                        to="/san-pham"
                        className="bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-heading font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Mua Ngay
                      </Link>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="p-5">
                    {/* Category tag */}
                    <span className="block text-[9px] font-heading font-semibold tracking-[0.1em] uppercase text-[#D4A373] mb-1.5">
                      {displayProduct.category}
                    </span>

                    {/* Product name */}
                    <h3 className="font-display text-base font-bold text-brand-brown-dark leading-snug mb-1.5 group-hover:text-[#9A1F1E] transition-colors duration-300 line-clamp-1">
                      {displayProduct.name}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{displayProduct.desc}</p>

                    {/* Stars + review count (Always 5 stars ⭐⭐⭐⭐⭐) */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={11} className="fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      <span className="text-gray-500 text-[10px]">({displayProduct.reviews} đánh giá)</span>
                    </div>

                    {/* Meta row — volume & origin */}
                    <div className="flex gap-3 flex-wrap pt-3 border-t border-[rgba(212,163,115,0.15)] mb-4">
                      <span className="text-[10px] text-gray-500 font-medium">🫙 {displayProduct.volume}</span>
                      <span className="text-[10px] text-gray-500 font-medium">📍 {displayProduct.origin}</span>
                    </div>

                    {/* Price + order button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-brand-red font-sans font-bold text-base leading-none">{formatPrice(displayProduct.price)}</span>
                        <span className="text-gray-500 line-through text-xs ml-2 font-sans">{formatPrice(displayProduct.originalPrice)}</span>
                      </div>
                      <Link to="/san-pham"
                        className="bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-heading font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-300 shadow-md shadow-brand-gold/10 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        Mua Ngay
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`text-center mt-12 transition-all duration-700 delay-400 ${prodIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/san-pham"
              className="inline-flex items-center gap-2 border-2 border-[rgba(154,31,30,0.2)] text-[#9A1F1E] font-heading font-bold px-8 py-3.5 rounded-xl hover:border-[#9A1F1E] hover:bg-[#9A1F1E] hover:text-white transition-all duration-300 active:scale-95 text-sm"
            >
              Xem tất cả sản phẩm & Combo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STORY — Cinematic Full-bleed Highland (Prototype Style)
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '88vh' }} ref={storyRef}>
        {/* Full-bleed highland background image */}
        <div className="absolute inset-0">
          <img
            src="/images/products/z7953307406651_6f83a1cc6dbf98100152f18c42fd2276.jpg"
            alt="Vùng cao Mường Khương"
            className="w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.04)' }}
          />
          {/* Dark cinematic gradient overlay — same tones as prototype */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10,5,5,0.92) 0%, rgba(45,20,20,0.85) 40%, rgba(20,50,20,0.72) 100%)'
            }}
          />
        </div>

        {/* Content aligned to left — max-width 600px as in prototype */}
        <div className="section-container relative z-10 py-32">
          <div className={`max-w-[600px] transition-all duration-700 ${storyIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Section tag — light variant */}
            <span className="inline-block px-5 py-2 bg-[rgba(255,255,255,0.12)] text-white/90 border border-[rgba(255,255,255,0.25)] rounded-full font-heading text-[11px] font-bold tracking-[0.1em] uppercase mb-5 backdrop-blur-sm">
              Câu Chuyện Của Chúng Tôi
            </span>

            {/* Story title — Playfair Display for elegance */}
            <h2 className="font-display text-4xl lg:text-[3.2rem] font-bold text-white leading-[1.2] tracking-[-0.02em] mb-6 mt-2">
              Từ Núi Rừng<br /><em className="italic text-[#D4A373]">Mường Khương</em><br />Đến Bàn Ăn Của Bạn
            </h2>

            <p className="text-white/80 text-base leading-[1.75] mb-4">
              HTX Hoa Lợi được thành lập từ chính những người nông dân đã gắn bó với cây ớt bản địa qua nhiều thế hệ. Tại Mường Khương – vùng đất địa đầu Đông Bắc của Lào Cai – khí hậu núi cao và thổ nhưỡng đặc biệt tạo ra những trái ớt có màu đỏ sâu và vị cay thuần khiết không nơi nào có được.
            </p>

            <p className="text-white/80 text-base leading-[1.75] mb-8">
              Mỗi năm, HTX thu mua hơn <strong className="text-[#D4A373] font-bold">100 tấn ớt tươi</strong> từ các hộ nông dân địa phương, tạo sinh kế bền vững cho cộng đồng và bảo tồn giống ớt bản địa quý hiếm.
            </p>

            {/* Glassmorphic highlight items — Prototype style */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                { icon: '🌱', title: 'Nông nghiệp bền vững', sub: 'Hỗ trợ 50+ hộ nông dân địa phương' },
                { icon: '🔬', title: 'Kiểm soát chất lượng', sub: 'Quy trình chuẩn hóa, an toàn thực phẩm' },
                { icon: '🌍', title: 'Thị trường mở rộng', sub: 'Phân phối toàn quốc qua đại lý & online' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 px-5 py-4 rounded-xl backdrop-blur-[8px] border transition-all duration-300 hover:border-[rgba(212,163,115,0.4)]"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.13)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex flex-col gap-0.5">
                    <strong className="text-white font-heading font-semibold text-[0.95rem]">{item.title}</strong>
                    <span className="text-white/60 text-[0.84rem]">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <Link
              to="/cau-chuyen"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#9A1F1E] to-[#801615] hover:from-[#801615] hover:to-[#6B1212] text-white font-heading font-semibold px-7 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-[rgba(154,31,30,0.4)] hover:shadow-2xl hover:-translate-y-0.5 text-sm"
            >
              Ủng Hộ Sản Phẩm Địa Phương
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROCESS STEPS — Minimal Circular Timeline
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F5]" ref={processRef}>
        <div className="section-container">
          <div className={`text-center mb-16 transition-all duration-750 ${processIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-8 h-px bg-brand-red" />
              Quy trình sản xuất
              <span className="w-8 h-px bg-brand-red" />
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-brown-dark mb-3">
              Từ Sườn Núi Đến Bàn Ăn
            </h2>
            <p className="text-gray-500 text-sm">Mỗi chai tương ớt là kết tinh của một quy trình tỉ mỉ</p>
          </div>

          <div className={`relative transition-all duration-750 delay-200 ${processIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-20 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-gold/20 via-brand-red/35 to-brand-gold/20" />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              {PROCESS_STEPS.map((s, i) => (
                <div key={i} className="group text-center">
                  <div className="relative mx-auto mb-4 w-28 h-28 lg:w-30 lg:h-30">
                    <div className="absolute -top-1 -left-1 w-7 h-7 bg-brand-red text-white rounded-full flex items-center justify-center text-[10px] font-extrabold z-10 shadow-md">
                      {s.step}
                    </div>
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 group-hover:shadow-lg group-hover:border-brand-gold transition-all duration-400">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-brown-dark text-sm mb-1 group-hover:text-brand-red transition-colors duration-300">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-[150px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COMPARE TABLE — Minimal Dashboard Layout
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" ref={cmpRef}>
        <div className="section-container">
          <div className={`text-center mb-16 transition-all duration-750 ${cmpIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-8 h-px bg-brand-red" />
              Tại sao chọn chúng tôi
              <span className="w-8 h-px bg-brand-red" />
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-brown-dark mb-3">
              Sự Khác Biệt Thực Sự
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Vì sao sản phẩm đạt tiêu chuẩn OCOP của HTX Hoa Lợi luôn xứng đáng với bữa ăn gia đình bạn?</p>
          </div>

          <div className={`rounded-2xl overflow-hidden shadow-sm border border-gray-200/50 transition-all duration-750 delay-200 ${cmpIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Header */}
            <div className="grid grid-cols-3 bg-brand-brown-dark text-white">
              <div className="py-5 px-6 font-semibold text-xs uppercase tracking-wider text-white/70">Tiêu chí</div>
              <div className="py-5 px-6 border-x border-white/10 bg-brand-brown-dark/95">
                <span className="text-brand-gold-light font-bold text-xs uppercase tracking-wider block mb-0.5">Tương ớt</span>
                <span className="text-white font-extrabold text-sm">Mường Khương (Hoa Lợi)</span>
              </div>
              <div className="py-5 px-6 font-medium text-xs uppercase tracking-wider text-white/50">Tương ớt công nghiệp</div>
            </div>

            {/* Rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]/30'}`}>
                <div className="py-5 px-6 font-bold text-brand-brown-dark text-sm flex items-center">{row.label}</div>
                <div className="py-5 px-6 border-x border-gray-100 bg-emerald-50/20">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-emerald-900 text-sm font-semibold leading-relaxed">{row.us}</span>
                  </div>
                </div>
                <div className="py-5 px-6">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0 font-extrabold text-xs">✕</span>
                    <span className="text-gray-500 text-sm leading-relaxed">{row.them}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          QUALITY SECTION — Dark theme with animated counters
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden bg-brand-brown-dark text-white"
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px]" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-brand-gold-light text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <span className="w-8 h-px bg-brand-gold-light" />
                Cam kết chất lượng
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Chất lượng đặt lên hàng đầu
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Mỗi sản phẩm xuất xưởng từ HTX Hoa Lợi đều trải qua quy trình kiểm định vệ sinh an toàn nghiêm ngặt từ vùng nương rẫy cho tới đóng chai thành phẩm.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Leaf, text: '100% tự nhiên nguyên chất' },
                  { icon: ShieldCheck, text: 'Không phẩm màu nhân tạo' },
                  { icon: BadgeCheck, text: 'Chứng nhận OCOP quốc gia' },
                  { icon: Heart, text: 'Đồng hành cùng nông dân' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <Icon size={16} className="text-brand-gold-light flex-shrink-0" />
                    <span className="text-white/90 text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated counters */}
            <div className="grid grid-cols-2 gap-8">
              <Counter to={10000} label="Khách hàng tin dùng" suffix="+" />
              <Counter to={250} label="Đơn hàng / tháng" suffix="+" />
              <Counter to={3} label="Tiêu chuẩn OCOP" suffix="★" />
              <Counter to={20} label="Năm kinh nghiệm" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COMBO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-8 h-px bg-brand-red" />
              Ưu đãi đặc biệt
              <span className="w-8 h-px bg-brand-red" />
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-brown-dark mb-3">Combo Tiết Kiệm</h2>
            <p className="text-gray-500 text-sm">Mua theo combo để nhận mức giá ưu đãi nhất cùng Freeship</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMBOS.map((combo, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-gray-200/50 hover:border-brand-gold/30 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
                  <img src={combo.image} alt={combo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {combo.tag && (
                    <span className="absolute top-3 left-3 badge-pill bg-brand-red text-white text-[10px] uppercase font-bold tracking-wider">{combo.tag}</span>
                  )}
                  <span className="absolute top-3 right-3 badge-pill bg-white text-brand-red text-[10px] font-bold shadow-sm">
                    -{calculateDiscount(combo.price, combo.originalPrice)}%
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-brown-dark text-sm mb-3 group-hover:text-brand-red transition-colors duration-300">{combo.name}</h3>
                  <ul className="space-y-1.5 mb-5">
                    {combo.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle2 size={12} className="text-brand-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-brand-red font-sans font-bold text-base">{formatPrice(combo.price)}</p>
                      <p className="text-gray-400 line-through text-[10px] font-sans">{formatPrice(combo.originalPrice)}</p>
                    </div>
                    <Link to="/san-pham"
                      className="bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
                    >
                      Chọn mua
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" ref={reviewRef}>
        <div className="section-container">
          <div className={`text-center mb-16 transition-all duration-750 ${reviewIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-8 h-px bg-brand-red" />
              Khách hàng nói gì
              <span className="w-8 h-px bg-brand-red" />
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-brown-dark mb-4">Đánh Giá Thực Tế</h2>
            
            {/* Overall rating */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-5xl font-extrabold text-brand-red font-display">4.9</span>
              <div className="text-left">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="text-brand-gold fill-brand-gold" />)}
                </div>
                <p className="text-gray-500 text-xs">dựa trên hơn 250+ phản hồi từ người mua</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-750 delay-200 ${reviewIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {REVIEWS.map((r) => (
              <div key={r.id} className="bg-[#FAF8F5] rounded-2xl p-6 border border-gray-200/40 hover:shadow-md transition-all duration-300 relative">
                <Quote size={18} className="text-brand-gold/30 mb-3" />
                <p className="text-gray-600 text-xs leading-relaxed mb-5 italic">"{r.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-brand-gold/30" />
                  <div>
                    <p className="font-bold text-brand-brown-dark text-xs">{r.name}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={9} className="text-brand-gold fill-brand-gold" />)}
                    </div>
                  </div>
                  <span className="ml-auto bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    ✓ Đã mua
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TIN TỨC NỔI BẬT
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F5]" ref={newsRef}>
        <div className="section-container">
          <div className={`flex items-end justify-between mb-12 transition-all duration-750 ${newsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
                <span className="w-8 h-px bg-brand-red" />
                Góc Ẩm Thực & Sức Khỏe
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-brown-dark">Tin Tức Nổi Bật</h2>
            </div>
            <Link to="/tin-tuc"
              className="hidden sm:inline-flex items-center gap-2 text-brand-red font-bold hover:gap-3 transition-all duration-200 group text-sm"
            >
              Xem tất cả
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-750 delay-200 ${newsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/tin-tuc/${getSlug(post)}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200/50 hover:shadow-lg transition-all duration-400 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-gray-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 badge-pill text-[9px] font-bold uppercase tracking-wider ${
                    post.category === 'Góc Ẩm Thực' ? 'bg-brand-red text-white' :
                    post.category === 'Cẩm Nang Sức Khỏe' ? 'bg-emerald-600 text-white' :
                    'bg-brand-gold text-brand-brown-dark'
                  }`}>
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 uppercase tracking-wider font-semibold">
                    <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-brand-brown-dark text-base leading-snug mb-3 line-clamp-2 group-hover:text-brand-red transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">{post.summary}</p>
                  <span
                    className="inline-flex items-center gap-1.5 text-brand-red text-xs font-bold hover:gap-2.5 transition-all duration-200 group/link"
                  >
                    <BookOpen size={12} />
                    Đọc tiếp
                    <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className={`text-center mt-8 sm:hidden transition-all duration-750 delay-300 ${newsIn ? 'opacity-100' : 'opacity-0'}`}>
            <Link to="/tin-tuc"
              className="inline-flex items-center gap-2 border-2 border-brand-red text-brand-red font-bold px-6 py-3 rounded-xl hover:bg-brand-red hover:text-white transition-all duration-300 text-sm"
            >
              Xem tất cả tin tức
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA FINAL SECTION
      ═══════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #8E0000 0%, #C62828 50%, #40241A 100%)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]" />
        <div className="section-container relative z-10">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-750 ${ctaIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
              <Gift size={24} className="text-brand-gold-light" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Sẵn sàng thưởng thức<br />
              <span className="text-brand-gold-light">hương vị Tây Bắc?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Đặt hàng ngay hôm nay — Giao hàng trong 1-3 ngày. <strong className="text-white">Freeship đơn từ 200.000đ.</strong> Kiểm tra hàng trước khi thanh toán.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/san-pham"
                className="group bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-bold px-10 py-4 rounded-xl transition-all duration-300 active:scale-95 shadow-xl shadow-black/20 flex items-center gap-2 justify-center text-lg"
              >
                <Package size={20} />
                Đặt hàng ngay
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={COMPANY_INFO.hotlineLink}
                className="group bg-white/10 backdrop-blur-sm text-white border border-white/25 font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 active:scale-95 flex items-center gap-2 justify-center"
              >
                <Phone size={18} />
                Gọi: {COMPANY_INFO.hotline}
              </a>
            </div>

            {/* Channel badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href={COMPANY_INFO.zaloLink} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                <MessageCircle size={14} className="text-blue-300" />
                Nhắn Zalo
              </a>
              <a href={COMPANY_INFO.facebookLink} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                <Users size={14} className="text-blue-400" />
                Facebook
              </a>
              <Link to="/he-thong-phan-phoi"
                className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                <MapPin size={14} className="text-brand-gold-light" />
                Điểm bán gần bạn
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
