import { Gift, TrendingUp, CheckCircle2, Star, Zap } from 'lucide-react';
import { COMBOS, formatPrice, calculateDiscount, COMPANY_INFO } from '../data/product';

export default function CombosSection() {
  return (
    <section id="combos" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <Gift size={16} />
            Combo & Quà tặng
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-brown-dark mb-4">
            COMBO &<br />
            <span className="text-brand-red">HỘP QUÀ TẶNG</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Tiết kiệm hơn khi mua combo - Quà tặng sang trọng cho mọi dịp từ đặc sản OCOP
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {COMBOS.map((combo, idx) => {
            const discount = calculateDiscount(combo.price, combo.originalPrice);
            const saving = combo.originalPrice - combo.price;

            return (
              <div
                key={combo.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 relative"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-red/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {combo.tag && (
                      <div className="bg-gradient-to-r from-brand-gold to-amber-400 text-brand-brown-dark px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <Star size={12} className="fill-brand-brown-dark" />
                        {combo.tag}
                      </div>
                    )}
                  </div>

                  {/* Discount badge */}
                  <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                    -{discount}%
                  </div>

                  {/* Quick view icon */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg">
                    <Zap size={16} className="text-brand-red" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg group-hover:text-brand-red transition-colors">{combo.name}</h3>

                  {/* Items list */}
                  <ul className="space-y-1.5 mb-5">
                    {combo.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm text-gray-500 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price section */}
                  <div className="bg-gradient-to-r from-brand-red/5 to-brand-gold/5 rounded-xl p-4 mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-sans font-bold text-brand-red">
                        {formatPrice(combo.price)}
                      </span>
                      <span className="text-sm text-gray-400 line-through font-sans">
                        {formatPrice(combo.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold font-sans">
                      <TrendingUp size={14} />
                      Tiết kiệm {formatPrice(saving)}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30 active:scale-[0.98] group-hover:from-brand-red-dark group-hover:to-brand-red">
                    <Gift size={16} />
                    Chọn combo
                  </button>
                </div>

                {/* Card border glow on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brand-red/20 transition-colors pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* CTA under section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">
              Bạn muốn combo riêng? Liên hệ đặt combo theo ý thích
            </p>
            <a
              href={COMPANY_INFO.hotlineLink}
              className="bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-red/20"
            >
              {COMPANY_INFO.hotline}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
