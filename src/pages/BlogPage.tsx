import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BLOG_POSTS, BlogPost } from '../data/product';
import { Calendar, Clock, ArrowRight, BookOpen, Mail } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [emailSub, setEmailSub] = useState('');
  const [subbed, setSubbed] = useState(false);

  const categories = ['Tất cả', 'Góc Ẩm Thực', 'Cẩm Nang Sức Khỏe', 'Câu Chuyện Bản Làng'];

  const filteredPosts = selectedCategory === 'Tất cả'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubbed(true);
      setEmailSub('');
    }
  };

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
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-gray-800 antialiased">
      {/* SEO Meta */}
      <title>Tin tức & Sự kiện | HTX Hoa Lợi - Tương Ớt Mường Khương</title>
      <meta name="description" content="Cập nhật tin tức OCOP, hoạt động HTX, khuyến mãi, báo chí đưa tin về Tương Ớt Mường Khương." />

      <Header />
      <div className="h-16 lg:h-20" />

      {/* Hero Banner */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-brown-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }} />
        <div className="section-container relative text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-brand-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <BookOpen size={16} />
            Góc Ẩm Thực & Cẩm Nang
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            TIN TỨC &<br />
            <span className="text-brand-gold-light">BÍ QUYẾT ĐẬM VỊ</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Nơi HTX chia sẻ những mẹo sức khỏe hữu ích, công thức nấu ăn ngon cùng tương ớt và các câu chuyện văn hóa bản làng Mường Khương.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="section-container">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/tin-tuc/${getSlug(post)}`}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Post Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {post.category}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-gray-800 text-lg group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Readmore */}
                  <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between text-brand-red font-bold text-sm">
                    <span>Đọc bài viết</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Newsletter */}
      <section className="py-16 bg-gradient-to-br from-brand-red-dark to-brand-brown-dark text-white text-center">
        <div className="section-container max-w-xl space-y-4">
          <Mail size={36} className="mx-auto text-brand-gold-light" />
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">ĐĂNG KÝ NHẬN TIN MỚI NHẤT</h2>
          <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
            Chúng tôi sẽ gửi các thông tin ưu đãi sỉ và cẩm nang sức khỏe định kỳ mỗi tháng. Cam kết không spam.
          </p>
          {subbed ? (
            <p className="text-brand-gold-light font-bold">✓ Cảm ơn bạn đã đăng ký nhận bản tin!</p>
          ) : (
            <form onSubmit={handleSub} className="flex gap-2">
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
