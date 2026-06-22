import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/Toast';
import {
  Search, ShoppingCart, Heart, Star, Award, ShieldCheck,
  Leaf, CheckCircle2, ChevronLeft, ChevronRight, Flame,
  Users, Truck, X, Zap
} from 'lucide-react';
import { formatPrice, ALL_PRODUCTS, Product } from '../data/product';

// Re-export for other components
export type { Product };
export { ALL_PRODUCTS };

const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'tuong-ot', name: 'Tương ớt' },
];

const ITEMS_PER_PAGE = 8;

const badgeStyles = {
  bestseller: 'bg-brand-gold text-brand-brown-dark',
  new: 'bg-emerald-500 text-white',
  gift: 'bg-brand-red text-white',
  ocop: 'bg-brand-gold text-brand-brown-dark border border-brand-gold-dark',
};

export default function ProductPage() {
  const { addItem: addToCart } = useCart();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);


  // Featured carousel
  const featuredProducts = useMemo(() => ALL_PRODUCTS.filter(p => p.featured), []);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filter products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Paginated products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      weight: product.weight,
      category: product.categoryLabel,
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
  };



  const handleToggleWishlist = (product: Product) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      sold: product.sold,
    });
    showToast(
      isInWishlist(product.id) ? `Đã xóa "${product.name}" khỏi yêu thích` : `Đã thêm "${product.name}" vào yêu thích`,
      'info'
    );
  };

  const nextSlide = () => setCarouselIndex(i => (i + 1) % featuredProducts.length);
  const prevSlide = () => setCarouselIndex(i => (i - 1 + featuredProducts.length) % featuredProducts.length);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-8 bg-gradient-to-b from-brand-gold-light/20 to-white">
        <div className="section-container">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Flame size={14} />
              Showroom OCOP Online
            </span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-brown-dark mb-3">
              Sản Phẩm HTX Hoa Lợi
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Khám phá bộ sưu tập tương ớt Mường Khương và đặc sản vùng cao đạt chuẩn OCOP 3 Sao.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="section-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl lg:text-2xl font-bold text-brand-brown-dark flex items-center gap-2">
              <Flame className="text-brand-red" size={24} />
              Sản Phẩm Nổi Bật
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white transition-colors"
                aria-label="Trước"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white transition-colors"
                aria-label="Tiếp"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {featuredProducts.map(product => (
                <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-1">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${badgeStyles[product.badgeVariant || 'bestseller']}`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider">{product.categoryLabel}</span>
                      <h3 className="font-bold text-sm text-brand-brown-dark mt-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-brand-red font-extrabold">{formatPrice(product.price)}</span>
                        <span className="text-gray-400 line-through text-xs">{formatPrice(product.originalPrice)}</span>
                      </div>
                      <Link
                        to={`/san-pham/${product.slug}`}
                        className="mt-3 block w-full bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold py-2.5 rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
                      >
                        <Zap size={14} />
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-6 bg-gray-50 border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 outline-none transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-red hover:text-brand-red'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10">
        <div className="section-container">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Hiển thị <strong>{paginatedProducts.length}</strong> trong <strong>{filteredProducts.length}</strong> sản phẩm
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">Không tìm thấy sản phẩm nào</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-brand-red font-medium hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {paginatedProducts.map(product => {
                  const inWishlist = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.badge && (
                          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold ${badgeStyles[product.badgeVariant || 'bestseller']}`}>
                            {product.badge}
                          </span>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute inset-x-0 bottom-0 p-2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-white/95 backdrop-blur text-brand-brown-dark text-xs font-semibold py-2 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-1"
                          >
                            <ShoppingCart size={14} />
                            Thêm vào giỏ
                          </button>
                          <Link
                            to={`/san-pham/${product.slug}`}
                            className="flex-1 bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md shadow-brand-gold/15"
                          >
                            Mua Ngay
                          </Link>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => handleToggleWishlist(product)}
                          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                            inWishlist ? 'bg-brand-red text-white' : 'bg-white/80 text-gray-600 hover:bg-white hover:text-brand-red'
                          }`}
                          aria-label={inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                        >
                          <Heart size={16} className={inWishlist ? 'fill-white' : ''} />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-3 lg:p-4">
                        <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider">{product.categoryLabel}</span>
                        <h3 className="font-bold text-sm text-brand-brown-dark mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">{product.name}</h3>

                        {/* Rating & Stock (Always 5 stars ⭐⭐⭐⭐⭐) */}
                        <div className="flex items-center justify-between gap-2 mt-1.5 flex-wrap">
                          <div className="flex items-center gap-1 flex-wrap">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={10} className="fill-brand-gold text-brand-gold" />
                              ))}
                            </div>
                            <span className="text-[11px] text-gray-600">5.0</span>
                            <span className="text-[11px] text-gray-400">({product.sold} đã bán)</span>
                          </div>
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium border border-amber-200/50">
                            Còn {product.stock} chai
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline justify-between gap-2 mt-2">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-brand-red font-extrabold text-base">{formatPrice(product.price)}</span>
                            <span className="text-gray-500 line-through text-xs">{formatPrice(product.originalPrice)}</span>
                          </div>
                          {product.category === 'tuong-ot' && (
                            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                              Sỉ từ 5 chai
                            </span>
                          )}
                          {product.badge === 'Sỉ' && (
                            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                              Giá sỉ tốt
                            </span>
                          )}
                        </div>

                        {/* Mobile Buttons */}
                        <div className="mt-3 flex gap-2 md:hidden">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-gray-100 text-brand-brown-dark text-xs font-semibold py-2 rounded-lg text-center flex items-center justify-center gap-1"
                          >
                            <ShoppingCart size={14} />
                            Thêm vào giỏ
                          </button>
                          <Link
                            to={`/san-pham/${product.slug}`}
                            className="flex-1 bg-brand-gold text-brand-brown-dark text-xs font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1 shadow-sm"
                          >
                            Mua Ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        currentPage === i + 1
                          ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                          : 'bg-white border border-gray-200 hover:border-brand-red hover:text-brand-red'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Choose Hoa Loi Section */}
      <section className="py-16 bg-brand-brown-dark text-white">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              Vì Sao Chọn Hoa Lợi?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Cam kết chất lượng từ vùng núi cao Mường Khương đến bàn ăn của bạn.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Award, title: 'OCOP 3 Sao' },
              { icon: ShieldCheck, title: 'VSATTP' },
              { icon: Leaf, title: 'Nguyên liệu vùng cao' },
              { icon: CheckCircle2, title: 'Không phẩm màu' },
              { icon: Users, title: '10.000+ khách hàng' },
              { icon: Truck, title: 'Giao toàn quốc' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 mx-auto mb-3 bg-brand-gold/20 rounded-xl flex items-center justify-center">
                  <item.icon size={24} className="text-brand-gold-light" />
                </div>
                <p className="text-sm font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />


    </div>
  );
}
