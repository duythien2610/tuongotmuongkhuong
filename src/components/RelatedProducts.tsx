import { Star, ChevronLeft, ChevronRight, Eye, ShoppingCart, BadgeCheck } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { RELATED_PRODUCTS, formatPrice, calculateDiscount } from '../data/product';

export default function RelatedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 290;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold-dark px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Star size={12} />
              Khám phá thêm
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-brown-dark">
              Sản phẩm <span className="text-brand-red">liên quan</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Đặc sản vùng cao Tây Bắc khác từ Mường Khương</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 hover:bg-brand-red-dark'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 hover:bg-brand-red-dark'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll edge shadows */}
        <div className="relative">
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          )}

          {/* Products carousel */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {RELATED_PRODUCTS.map((product) => {
              const discount = calculateDiscount(product.price, product.originalPrice);

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-brand-red/20 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-red/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <div className="bg-brand-red text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                          -{discount}%
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button className="flex-1 bg-brand-red text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow-lg hover:bg-brand-red-dark transition-colors">
                          <ShoppingCart size={14} />
                          Mua
                        </button>
                        <button className="w-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md hover:bg-white transition-colors">
                          <Eye size={16} className="text-gray-600" />
                        </button>
                      </div>

                      {/* Verified badge */}
                      <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm w-7 h-7 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <BadgeCheck size={14} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={10}
                              className={s <= Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-400">· {product.sold} đã bán</span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-sans font-bold text-brand-red">{formatPrice(product.price)}</span>
                        <span className="text-sm text-gray-400 line-through font-sans">{formatPrice(product.originalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shop all CTA */}
        <div className="mt-10 text-center">
          <a
            href="/san-pham"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-brown-dark to-brand-brown text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all shadow-lg"
          >
            Xem tất cả sản phẩm
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
