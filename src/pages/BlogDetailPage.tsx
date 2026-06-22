import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar, User, Clock, ArrowLeft, BookOpen,
  Flame, Mail, ChevronRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BLOG_POSTS, formatPrice, COMBOS } from '../data/product';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [emailSub, setEmailSub] = useState('');
  const [subbed, setSubbed] = useState(false);

  const post = BLOG_POSTS.find((p) => {
    const postSlug = p.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
    return postSlug === slug;
  });

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubbed(true);
      setEmailSub('');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FCFAF7]">
        <Header />
        <div className="h-16 lg:h-20" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">Bài viết không tồn tại</h1>
            <p className="text-gray-500 text-sm mb-6">Bài viết bạn tìm kiếm không có trong hệ thống.</p>
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-red-dark transition-colors"
            >
              <ArrowLeft size={16} />
              Quay lại tin tức
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-gray-800 antialiased">
      {/* SEO Meta */}
      <title>{`${post.title} | HTX Hoa Lợi - Tin tức & Sự kiện`}</title>
      <meta name="description" content={post.summary} />

      <Header />
      <div className="h-16 lg:h-20" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="section-container py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link to="/tin-tuc" className="hover:text-brand-red transition-colors">Tin tức & Sự kiện</Link>
            <ChevronRight size={12} />
            <span className="text-brand-brown-dark font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
        />
        <div className="section-container py-6">
          <span className="inline-flex items-center gap-2 bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <BookOpen size={12} />
            {post.category}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-brown-dark leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-brand-red" />
                  <span className="font-semibold text-gray-700">{post.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>

              {/* Summary */}
              <div className="bg-brand-red/5 border-l-4 border-brand-red rounded-r-xl p-5">
                <p className="text-gray-700 font-medium italic leading-relaxed">{post.summary}</p>
              </div>

              {/* Body */}
              <div className="text-gray-700 leading-loose text-sm lg:text-base space-y-6 whitespace-pre-line">
                {post.content}
              </div>

              {/* Share */}
              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm font-semibold text-gray-600 mb-3">Chia sẻ bài viết:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // toast would go here
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-medium transition-colors"
                  >
                    Sao chép link
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://zalo.me/share?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Zalo
                  </a>
                </div>
              </div>

              {/* Back to list */}
              <Link
                to="/tin-tuc"
                className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:underline"
              >
                <ArrowLeft size={16} />
                Quay lại danh sách tin tức
              </Link>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Recommended Products */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <div className="text-center pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flame size={22} />
                  </div>
                  <h4 className="font-bold text-brand-brown-dark text-lg">Đặc sản gợi ý</h4>
                  <p className="text-xs text-gray-500 mt-1">Đậm đà chuẩn vị Tây Bắc</p>
                </div>
                <div className="space-y-4 mt-4">
                  {COMBOS.slice(0, 2).map((combo) => (
                    <Link key={combo.id} to="/san-pham" className="block bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors group">
                      <div className="flex gap-3">
                        <img src={combo.image} alt={combo.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-800 group-hover:text-brand-red transition-colors line-clamp-1">{combo.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Tiết kiệm hơn 30%</p>
                          <p className="text-brand-red font-sans font-bold text-sm mt-1">{formatPrice(combo.price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/san-pham"
                  className="mt-4 block w-full py-3 bg-brand-red text-white text-center rounded-xl font-bold text-sm hover:bg-brand-red-dark transition-colors"
                >
                  Đặt mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="section-container">
            <h2 className="font-display text-xl font-bold text-brand-brown-dark mb-6">Bài viết khác</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherPosts.map((p) => {
                const pSlug = p.title
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9\s]/g, '')
                  .replace(/\s+/g, '-')
                  .substring(0, 60);
                return (
                  <Link key={p.id} to={`/tin-tuc/${pSlug}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] text-brand-red font-semibold uppercase">{p.category}</span>
                      <h3 className="font-bold text-sm text-gray-800 mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">{p.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2">
                        <Calendar size={10} /> {p.date}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-brand-red-dark to-brand-brown-dark text-white text-center">
        <div className="section-container max-w-xl space-y-4">
          <Mail size={36} className="mx-auto text-brand-gold-light" />
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">ĐĂNG KÝ NHẬN TIN MỚI NHẤT</h2>
          <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
            Chúng tôi sẽ gửi các thông tin ưu đãi sỉ và cẩm nang sức khỏe định kỳ mỗi tháng.
          </p>
          {subbed ? (
            <p className="text-brand-gold-light font-bold">✓ Cảm ơn bạn đã đăng ký nhận bản tin!</p>
          ) : (
            <form onSubmit={handleSub} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn..."
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                className="flex-grow px-4 py-3 bg-white text-gray-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-gold-light"
                required
              />
              <button type="submit" className="bg-brand-gold text-brand-brown-dark hover:bg-brand-gold-light px-6 rounded-xl text-sm font-bold transition-colors">
                Gửi Đi
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
