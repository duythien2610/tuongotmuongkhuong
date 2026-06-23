import { useState, useRef, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight, ZoomIn, X, Award, Star, BadgeCheck } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/product';

export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [magnifier, setMagnifier] = useState<{ x: number; y: number; bgX: number; bgY: number } | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bgX = (x / rect.width) * 200;
    const bgY = (y / rect.height) * 200;
    setMagnifier({ x, y, bgX, bgY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagnifier(null);
  }, []);

  const goNext = () => setActiveIndex((i) => (i + 1) % PRODUCT_IMAGES.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);

  return (
    <>
      <div className="space-y-5">
        {/* Main Image Container */}
        <div
          ref={mainImageRef}
          className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 cursor-crosshair group shadow-xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setShowLightbox(true)}
        >
          {/* Main Image */}
          <img
            src={PRODUCT_IMAGES[activeIndex]}
            alt={`Tương ớt Mường Khương - Ảnh ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />

          {/* Premium Frame Border */}
          <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none" />

          {/* Magnifier Lens */}
          {magnifier && (
            <div
              className="magnifier-lens w-40 h-40 rounded-full"
              style={{
                left: magnifier.x - 80,
                top: magnifier.y - 80,
                backgroundImage: `url(${PRODUCT_IMAGES[activeIndex]})`,
                backgroundSize: '250% 250%',
                backgroundPosition: `${magnifier.bgX}% ${magnifier.bgY}%`,
                border: '3px solid rgba(198, 40, 40, 0.3)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.2)',
              }}
            />
          )}

          {/* Gradient Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <div className="bg-gradient-to-r from-brand-gold to-amber-400 text-brand-brown-dark px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
              <Star size={12} className="fill-brand-brown-dark" />
              Best Seller
            </div>
          </div>

          {/* Quality badge top right */}
          <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
            <BadgeCheck size={12} />
            Chính hãng
          </div>

          {/* Zoom hint */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <ZoomIn size={14} />
            <span>Di chuột để phóng to</span>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md z-10">
            {activeIndex + 1} / {PRODUCT_IMAGES.length}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg hover:shadow-xl z-10"
          >
            <ChevronLeft size={22} className="text-gray-700" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg hover:shadow-xl z-10"
          >
            <ChevronRight size={22} className="text-gray-700" />
          </button>
        </div>

        {/* Thumbnails Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {PRODUCT_IMAGES.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 flex-shrink-0 ${
                idx === activeIndex
                  ? 'border-brand-red shadow-lg shadow-brand-red/30 scale-105 ring-4 ring-brand-red/20'
                  : 'border-gray-200 hover:border-brand-red/50 hover:shadow-md'
              }`}
            >
              <img
                src={img.replace('w=800', 'w=200')}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
          {/* Video Thumbnail */}
          <button
            onClick={() => setShowVideo(true)}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-3 border-dashed border-gray-300 hover:border-brand-red/50 transition-all duration-300 flex-shrink-0 group relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-brand-red/10 to-brand-gold/10 flex items-center justify-center">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play size={16} className="text-white ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Xem video</span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 py-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <BadgeCheck size={14} className="text-green-500" />
            <span>100% Chính hãng</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Award size={14} className="text-brand-gold" />
            <span>OCOP 3 Sao</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Star size={14} className="text-brand-gold fill-brand-gold" />
            <span>4.9/5 (48 đánh giá)</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          {/* Main lightbox image */}
          <div className="max-w-5xl w-full px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={PRODUCT_IMAGES[activeIndex]}
              alt={`Tương ớt Mường Khương - Ảnh ${activeIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronRight size={28} />
            </button>

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-2 mt-6">
              {PRODUCT_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeIndex ? 'border-brand-red' : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img src={img.replace('w=800', 'w=100')} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Counter */}
            <p className="text-center text-white/60 text-sm mt-4">
              {activeIndex + 1} / {PRODUCT_IMAGES.length}
            </p>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="bg-gradient-to-b from-brand-brown-dark to-brand-brown rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video placeholder */}
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Play size={32} className="text-white ml-1" />
                </div>
                <p className="text-white font-semibold mb-2">Video sản phẩm</p>
                <p className="text-sm text-white/60">Tương Ớt Mường Khương - OCOP 3 Sao</p>
                <p className="text-xs text-white/40 mt-4">Quy trình từ thu hoạch đến đóng gói</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* OCOP badge */}
              <div className="absolute top-4 left-4 bg-brand-gold text-brand-brown-dark px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                <Award size={14} />
                OCOP 3 Sao
              </div>
            </div>

            {/* Video info */}
            <div className="p-6 bg-gradient-to-r from-brand-brown to-brand-brown-dark">
              <h4 className="font-bold text-white mb-2">Cận cảnh quy trình sản xuất</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Thu hoạch ớt tươi từ vùng cao Mường Khương → Làm sạch bằng nước suối → Xay ớt và trộn gia vị theo công thức gia truyền → Nấu tương trên lửa nhỏ → Rót chai thủ công → Kiểm định chất lượng → Đóng gói thành phẩm
              </p>

              {/* Process steps */}
              <div className="flex items-center gap-3 mt-4 overflow-x-auto">
                {['Thu hoạch', 'Rửa', 'Xay', 'Nấu', 'Rót chai', 'Đóng gói'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/60">
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold">{idx + 1}</span>
                    {step}
                    {idx < 5 && <span className="text-white/30">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
