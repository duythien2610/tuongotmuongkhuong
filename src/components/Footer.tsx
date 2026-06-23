import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, MessageCircle, Shield, Truck, RotateCcw, Lock, Settings, Award, Star } from 'lucide-react';
import { COMPANY_INFO } from '../data/product';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand-brown-dark via-brand-brown to-brand-brown-dark text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

      {/* OCOP Badge Top */}
      <div className="border-b border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                <Award size={24} className="text-brand-brown-dark" />
              </div>
              <div>
                <p className="font-bold text-sm">OCOP 3 Sao</p>
                <p className="text-xs text-white/60">Chuẩn chất lượng quốc gia</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-green-400" />
              </div>
              <div>
                <p className="font-bold text-sm">VSATTP</p>
                <p className="text-xs text-white/60">An toàn thực phẩm</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center">
                <Star size={24} className="text-brand-red-light" />
              </div>
              <div>
                <p className="font-bold text-sm">4.9/5</p>
                <p className="text-xs text-white/60">48 đánh giá</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-12 lg:py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl flex items-center justify-center shadow-lg shadow-brand-red/30">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center border-2 border-brand-brown-dark">
                  <span className="text-[8px] font-extrabold text-brand-brown-dark">3★</span>
                </div>
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-tight">Mường Khương</p>
                <p className="text-[10px] text-brand-gold font-semibold tracking-wider uppercase flex items-center gap-1">
                  <Award size={10} />
                  OCOP 3 Sao
                </p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Tương Ớt Mường Khương chính gốc - Đặc sản OCOP 3 Sao từ vùng cao Tây Bắc.
              100% không phẩm màu nhân tạo, không chất tạo cay hóa học. Chất bảo quản sử dụng đúng quy định Bộ Y tế.
            </p>
            <div className="flex gap-3">
              <a href={COMPANY_INFO.facebookLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-md" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={COMPANY_INFO.zaloLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-md" aria-label="Zalo">
                <MessageCircle size={18} />
              </a>
              <a href={COMPANY_INFO.hotlineLink} className="w-10 h-10 bg-white/10 hover:bg-brand-red rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-md" aria-label="Hotline">
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider text-brand-gold-light flex items-center gap-2">
              <MapPin size={14} />
              Liên hệ
            </h3>
            <ul className="space-y-4 font-sans">
              <li className="flex items-start gap-3 text-sm text-white/70 group">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-brand-gold-light group-hover:scale-110 transition-transform" />
                <a
                  href={COMPANY_INFO.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-white transition-colors hover:underline"
                >
                  {COMPANY_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="flex-shrink-0 text-brand-gold-light" />
                <a href={COMPANY_INFO.hotlineLink} className="text-white/70 hover:text-white transition-colors font-medium">{COMPANY_INFO.hotline}</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="flex-shrink-0 text-brand-gold-light" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white/70 hover:text-white transition-colors">{COMPANY_INFO.email}</a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider text-brand-gold-light flex items-center gap-2">
              <Shield size={14} />
              Liên kết & Chính sách
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/cau-chuyen" className="text-sm text-white/70 hover:text-white transition-colors">
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link to="/tin-tuc" className="text-sm text-white/70 hover:text-white transition-colors">
                  Góc ẩm thực & Tin tức
                </Link>
              </li>
              <li>
                <Link to="/he-thong-phan-phoi" className="text-sm text-white/70 hover:text-white transition-colors">
                  Hệ thống phân phối
                </Link>
              </li>
              <li className="h-px bg-white/10 my-2" />
              <li>
                <a href="#" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors group">
                  <Truck size={14} className="text-brand-gold-light group-hover:translate-x-1 transition-transform" />
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors group">
                  <RotateCcw size={14} className="text-brand-gold-light group-hover:rotate-180 transition-transform duration-500" />
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                  <Lock size={14} className="text-brand-gold-light" />
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                  <Shield size={14} className="text-brand-gold-light" />
                  Cam kết chính hãng
                </a>
              </li>
              <li>
                <Link to="/admin" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                  <Settings size={14} className="text-brand-gold-light" />
                  Quản lý bán hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Map */}
          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider text-brand-gold-light">Kết nối</h3>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
              <p className="text-xs text-white/60 mb-3">Nhận thông tin ưu đãi mới nhất</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-gold/50 placeholder:text-white/40"
                />
                <button className="bg-brand-red hover:bg-brand-red-dark px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                  Gửi
                </button>
              </div>
            </div>
            <a
              href={COMPANY_INFO.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center border border-white/10 transition-all hover:scale-[1.02] group"
            >
              <MapPin size={28} className="mx-auto mb-2 text-brand-gold-light opacity-60 group-hover:opacity-100 transition-opacity" />
              <p className="text-xs text-white/40 group-hover:text-white/80 transition-colors">Xem vị trí trên bản đồ</p>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; 2026 Tương Ớt Mường Khương. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Award size={12} className="text-brand-gold" />
              OCOP 3 Sao
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Shield size={12} className="text-green-400" />
              VSATTP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
