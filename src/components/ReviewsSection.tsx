import { useState } from 'react';
import { Star, ThumbsUp, Camera, ChevronDown, BadgeCheck, MessageCircle, TrendingUp } from 'lucide-react';
import { REVIEWS } from '../data/product';

const ratingDistribution = [
  { stars: 5, count: 38, percent: 79 },
  { stars: 4, count: 7, percent: 15 },
  { stars: 3, count: 2, percent: 4 },
  { stars: 2, count: 1, percent: 2 },
  { stars: 1, count: 0, percent: 0 },
];

const REVIEW_STATS = [
  { label: 'Đánh giá', value: '4.9/5', icon: Star, color: 'text-brand-gold' },
  { label: 'Số đánh giá', value: '48', icon: MessageCircle, color: 'text-blue-500' },
  { label: 'Tin cậy', value: '97%', icon: BadgeCheck, color: 'text-green-500' },
  { label: 'Tăng trưởng', value: '+18%', icon: TrendingUp, color: 'text-brand-red' },
];

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <Star size={16} />
            Đánh giá khách hàng
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-brown-dark mb-4">
            KHÁCH HÀNG<br />
            <span className="text-brand-red">NÓI GÌ VỀ CHÚNG TÔI</span>
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {REVIEW_STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-10">
          {/* Rating Summary Card */}
          <div className="bg-gradient-to-br from-brand-gold/10 via-white to-brand-red/5 rounded-3xl p-6 lg:p-8 border border-brand-gold/20 sticky top-28 self-start">
            {/* Main rating */}
            <div className="text-center mb-6 pb-6 border-b border-gray-100">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-brand-gold to-amber-400 rounded-full mb-4 shadow-xl">
                <span className="text-4xl font-extrabold text-brand-brown-dark">4.9</span>
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={22} className="text-brand-gold fill-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-gray-600 font-medium">48 đánh giá</p>
            </div>

            {/* Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map((r) => (
                <div key={r.stars} className="flex items-center gap-3 group">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-semibold text-gray-600">{r.stars}</span>
                    <Star size={14} className="text-brand-gold fill-brand-gold" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-gold to-amber-400 rounded-full transition-all duration-700 group-hover:from-brand-red group-hover:to-brand-red-dark"
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 w-8 text-right">{r.count}</span>
                </div>
              ))}
            </div>

            {/* Write review button */}
            <button className="w-full mt-6 bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-red/30 transition-all">
              <Camera size={16} />
              Viết đánh giá
            </button>
          </div>

          {/* Review List */}
          <div className="space-y-5">
            {visibleReviews.map((review, idx) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover ring-3 ring-brand-gold/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <BadgeCheck size={10} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className="font-bold text-gray-800">{review.name}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <BadgeCheck size={10} />
                        Đã mua hàng
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.content}</p>

                    {/* Images */}
                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity shadow-sm hover:shadow-md"
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action */}
                    <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-red transition-colors font-medium bg-gray-50 hover:bg-brand-red/5 px-3 py-1.5 rounded-lg">
                      <ThumbsUp size={14} />
                      Hữu ích (12)
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!showAll && REVIEWS.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full py-4 text-sm font-semibold text-brand-red hover:bg-brand-red/5 rounded-xl transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-brand-red/30 hover:border-brand-red/50"
              >
                Xem thêm {REVIEWS.length - 3} đánh giá
                <ChevronDown size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
