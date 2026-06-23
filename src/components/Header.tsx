import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Search, User, Award, BookOpen, Newspaper, MapPin, ChevronDown, BookMarked, ShoppingBag, LogOut, UserCog, Package, KeyRound } from 'lucide-react';
import { COMPANY_INFO } from '../data/product';
import MiniCart from './MiniCart';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const DISCOVER_ITEMS = [
  { name: 'Câu chuyện thương hiệu', href: '/cau-chuyen', icon: BookOpen, desc: 'Lịch sử, hành trình & giá trị cốt lõi' },
  { name: 'Tin tức & Sự kiện', href: '/tin-tuc', icon: Newspaper, desc: 'Cập nhật hoạt động, khuyến mãi, báo chí' },
  { name: 'Hệ thống phân phối', href: '/he-thong-phan-phoi', icon: MapPin, desc: 'Đại lý, điểm bán, nhà phân phối toàn quốc' },
];

const INFO_ITEMS = [
  { name: 'Chính sách', href: '/chinh-sach', icon: BookMarked, desc: 'Chính sách đổi trả, vận chuyển, bảo mật' },
  { name: 'Liên hệ', href: '/lien-he', icon: Phone, desc: 'Hotline, email, Zalo, địa chỉ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const discoverTimerRef = useRef<number | null>(null);
  const infoTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const { user, openAuthModal, closeAuthModal, isAuthModalOpen, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location]);

  const isHome = location.pathname === '/';

  const handleDropdownEnter = useCallback((name: string) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (name === 'discover') {
      if (infoTimerRef.current) window.clearTimeout(infoTimerRef.current);
      discoverTimerRef.current = window.setTimeout(() => setActiveDropdown('discover'), 100);
    } else {
      if (discoverTimerRef.current) window.clearTimeout(discoverTimerRef.current);
      infoTimerRef.current = window.setTimeout(() => setActiveDropdown('info'), 100);
    }
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (discoverTimerRef.current) { window.clearTimeout(discoverTimerRef.current); discoverTimerRef.current = null; }
    if (infoTimerRef.current) { window.clearTimeout(infoTimerRef.current); infoTimerRef.current = null; }
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTextClass = (isActive: boolean) => {
    const base = isHome && !isScrolled
      ? 'text-white/90 hover:text-white hover:bg-white/10'
      : 'text-gray-700 hover:text-brand-red hover:bg-brand-red/5';
    const active = isHome && !isScrolled
      ? 'text-white bg-white/15'
      : 'text-brand-red bg-brand-red/10';
    return `${base} ${isActive ? active : ''}`;
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100'
            : 'bg-transparent'
        } ${
          !isScrolled && !isHome
            ? 'bg-white/98 backdrop-blur-xl shadow-sm'
            : ''
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-brand-red/20">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <span className="text-[8px] font-extrabold text-brand-brown-dark">3★</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className={`font-display font-bold leading-tight text-lg transition-colors duration-300 ${
                  isHome && !isScrolled ? 'text-white' : 'text-brand-brown-dark'
                }`}>
                  Mường Khương
                </p>
                <p className={`text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 transition-colors duration-300 ${
                  isHome && !isScrolled ? 'text-brand-gold-light' : 'text-brand-gold'
                }`}>
                  <Award size={10} />
                  OCOP 3 Sao
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              <Link
                to="/"
                className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${navTextClass(isActive('/'))}`}
              >
                Trang chủ
              </Link>

              <Link
                to="/san-pham"
                className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${navTextClass(isActive('/san-pham'))}`}
              >
                Sản phẩm
              </Link>

              {/* Khám phá Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('discover')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-1 ${navTextClass(
                    isActive('/cau-chuyen') || isActive('/tin-tuc') || isActive('/he-thong-phan-phoi')
                  )}`}
                >
                  Khám phá
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'discover' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'discover' && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden z-50 animate-scale-in origin-top-left">
                    <div className="p-3 space-y-1">
                      {DISCOVER_ITEMS.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFF5F5] transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-10 h-10 bg-brand-red/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/10 transition-colors">
                            <item.icon size={18} className="text-brand-red" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-brown-dark group-hover:text-brand-red transition-colors">{item.name}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Thông tin Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('info')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-1 ${navTextClass(
                    isActive('/chinh-sach') || isActive('/lien-he')
                  )}`}
                >
                  Thông tin
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'info' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'info' && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden z-50 animate-scale-in origin-top-left">
                    <div className="p-3 space-y-1">
                      {INFO_ITEMS.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFF5F5] transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-10 h-10 bg-brand-red/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/10 transition-colors">
                            <item.icon size={18} className="text-brand-red" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-brown-dark group-hover:text-brand-red transition-colors">{item.name}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Search + Actions */}
            <div className="flex items-center gap-2">
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                  <div className={`flex items-center rounded-xl px-4 py-2 animate-scale-in border transition-all ${
                    isHome && !isScrolled
                      ? 'bg-white/10 border-white/20 text-white focus-within:bg-white/20 focus-within:border-white'
                      : 'bg-gray-100 border-gray-200 text-gray-800 focus-within:border-brand-red focus-within:bg-white'
                  }`}>
                    <Search size={16} className={isHome && !isScrolled ? 'text-white/60' : 'text-gray-400'} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm sản phẩm..."
                      className={`bg-transparent border-none outline-none text-sm ml-2 w-56 placeholder:text-gray-400 ${
                        isHome && !isScrolled ? 'text-white placeholder:text-white/60' : 'text-gray-800'
                      }`}
                      autoFocus
                      onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') setIsSearchOpen(false); }}
                    />
                    <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                      <X size={14} className={isHome && !isScrolled ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600 ml-1'} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className={`p-2.5 transition-colors duration-300 rounded-xl ${
                      isHome && !isScrolled
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-500 hover:text-brand-red hover:bg-brand-red/5'
                    }`}
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Search - Mobile */}
              <button
                className={`md:hidden p-2.5 transition-colors duration-300 rounded-xl ${
                  isHome && !isScrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-500 hover:text-brand-red hover:bg-brand-red/5'
                }`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>

              {/* Hotline */}
              <a
                href={COMPANY_INFO.hotlineLink}
                className={`hidden lg:flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isHome && !isScrolled
                    ? 'text-brand-gold bg-white/10 hover:bg-white/20'
                    : 'text-brand-red bg-brand-red/5 hover:bg-brand-red/10'
                }`}
              >
                <Phone size={16} />
                <span>{COMPANY_INFO.hotline}</span>
              </a>

              {/* Login / User Account */}
              {user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isHome && !isScrolled
                        ? 'bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark shadow-lg shadow-brand-gold/15'
                        : 'bg-brand-red hover:bg-brand-red-dark text-white shadow-lg shadow-brand-red/20'
                    }`}
                  >
                    <User size={16} />
                    <span className="max-w-[150px] truncate">Xin chào, {user.name}</span>
                    <ChevronDown size={14} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-scale-in origin-top-right">
                      <div className="p-2 space-y-1">
                        <Link
                          to="/tai-khoan/ho-so"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-lg transition-colors"
                        >
                          <UserCog size={18} />
                          Hồ sơ cá nhân
                        </Link>
                        <Link
                          to="/tai-khoan/don-hang"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-lg transition-colors"
                        >
                          <Package size={18} />
                          Đơn hàng của tôi
                        </Link>
                        <Link
                          to="/tai-khoan/doi-mat-khau"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-lg transition-colors"
                        >
                          <KeyRound size={18} />
                          Đổi mật khẩu
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut size={18} />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    isHome && !isScrolled
                      ? 'bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white'
                      : 'bg-transparent border-brand-red text-brand-red hover:bg-brand-red hover:text-white hover:border-transparent'
                  }`}
                >
                  <User size={16} />
                  Đăng nhập
                </button>
              )}

              {/* Cart */}
              <MiniCart isScrolled={isScrolled} />

              {/* Mobile Menu Toggle */}
              <button
                className={`lg:hidden p-2.5 transition-colors duration-300 rounded-xl ${
                  isHome && !isScrolled
                    ? 'text-white hover:text-white/80 hover:bg-white/10'
                    : 'text-gray-700 hover:text-brand-red hover:bg-brand-red/5'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden pb-4 animate-slide-down">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm sản phẩm..."
                  className="bg-transparent border-none outline-none text-sm ml-2 flex-1 placeholder:text-gray-400"
                  autoFocus
                />
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-xl animate-slide-down">
            <nav className="section-container py-4 space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
              >
                Trang chủ
              </Link>
              <Link
                to="/san-pham"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
              >
                Sản phẩm
              </Link>
              {/* Khám phá Accordion */}
              <div>
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'discover' ? null : 'discover')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                >
                  <span>Khám phá</span>
                  <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'discover' ? 'rotate-180' : ''}`} />
                </button>
                {mobileAccordion === 'discover' && (
                  <div className="ml-4 space-y-1 mt-1">
                    {DISCOVER_ITEMS.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                      >
                        <item.icon size={14} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Thông tin Accordion */}
              <div>
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'info' ? null : 'info')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                >
                  <span>Thông tin</span>
                  <ChevronDown size={14} className={`transition-transform ${mobileAccordion === 'info' ? 'rotate-180' : ''}`} />
                </button>
                {mobileAccordion === 'info' && (
                  <div className="ml-4 space-y-1 mt-1">
                    {INFO_ITEMS.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                      >
                        <item.icon size={14} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 my-2" />
              <a
                href={COMPANY_INFO.hotlineLink}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-red bg-brand-red/5 rounded-xl"
              >
                <Phone size={16} />
                Hotline: {COMPANY_INFO.hotline}
              </a>
              <Link
                to="/san-pham"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-brand-red rounded-xl mt-2 shadow-lg shadow-brand-red/30"
              >
                <ShoppingBag size={16} />
                Mua sản phẩm
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-brand-red/5 rounded-xl">
                    <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-brown-dark">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/tai-khoan/ho-so"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCog size={16} />
                    Hồ sơ cá nhân
                  </Link>
                  <Link
                    to="/tai-khoan/don-hang"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package size={16} />
                    Đơn hàng của tôi
                  </Link>
                  <Link
                    to="/tai-khoan/doi-mat-khau"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <KeyRound size={16} />
                    Đổi mật khẩu
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-brand-red border-2 border-brand-red rounded-xl mt-1 hover:bg-brand-red/5 transition-colors"
                >
                  <User size={16} />
                  Đăng nhập / Đăng ký
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      {!isHome && <div className="h-16 lg:h-20" />}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </>
  );
}
