  import { useState } from 'react';
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import { DISTRIBUTION_STORES, COMPANY_INFO } from '../data/product';
  import { MapPin, Phone, Map, Search, Landmark } from 'lucide-react';

  export default function StoreLocatorPage() {
    const [selectedProvince, setSelectedProvince] = useState<string>('Tất cả');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('Tất cả');

    // Extract unique provinces
    const provinces = ['Tất cả', ...Array.from(new Set(DISTRIBUTION_STORES.map((store) => store.province)))];

    // Extract unique districts of selected province
    const districts = selectedProvince === 'Tất cả'
      ? ['Tất cả']
      : ['Tất cả', ...Array.from(new Set(DISTRIBUTION_STORES.filter((store) => store.province === selectedProvince).map((store) => store.district)))];

    const filteredStores = DISTRIBUTION_STORES.filter((store) => {
      const matchProvince = selectedProvince === 'Tất cả' || store.province === selectedProvince;
      const matchDistrict = selectedDistrict === 'Tất cả' || store.district === selectedDistrict;
      return matchProvince && matchDistrict;
    });

    const handleProvinceChange = (province: string) => {
      setSelectedProvince(province);
      setSelectedDistrict('Tất cả'); // Reset district
    };

    return (
      <div className="min-h-screen bg-brand-cream-light/30">
        <Header />

        {/* Hero Banner Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-brown-dark overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }} />
          <div className="section-container relative text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 text-brand-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MapPin size={16} />
              Hệ Thống Phân Phối
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              ĐỊA ĐIỂM<br />
              <span className="text-brand-gold-light">MUA TƯƠNG ỚT TRỰC TIẾP</span>
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Tra cứu siêu thị, nhà phân phối và đại lý ủy quyền của HTX Hoa Lợi trên toàn quốc để mua hàng nhanh nhất.
            </p>
          </div>
        </section>

        {/* Store Search / Filter Box */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="section-container max-w-4xl">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 -mt-20 relative z-20 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Search className="text-brand-red" size={24} />
                <h3 className="font-display font-bold text-gray-800 text-lg sm:text-xl">Bộ Lọc Tra Cứu Địa Điểm</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Province Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">1. Chọn Tỉnh / Thành phố</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-all"
                  >
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                {/* District Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">2. Chọn Phường / Xã</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={selectedProvince === 'Tất cả'}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                  >
                    {districts.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stores List Grid */}
        <section className="py-12 lg:py-20">
          <div className="section-container">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                Tìm thấy <strong className="text-gray-800">{filteredStores.length}</strong> điểm bán phù hợp
              </p>
            </div>

            {filteredStores.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store) => (
                  <div key={store.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div className="space-y-4">
                      {/* Store Title */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Landmark size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-base leading-snug group-hover:text-brand-red transition-colors">
                            {store.name}
                          </h4>
                          <span className="inline-block bg-brand-gold/15 text-brand-gold-dark text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1.5 uppercase">
                            {store.province}
                          </span>
                        </div>
                      </div>

                      {/* Store Details */}
                      <div className="space-y-2 pt-2 text-xs text-gray-500 font-light leading-relaxed font-sans">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
                          <span>{store.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-green-500 flex-shrink-0" />
                          <span>Hotline hỗ trợ: {store.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                      <a
                        href={store.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        <Map size={14} />
                        Xem vị trí trên bản đồ
                      </a>
                      <a
                        href={`tel:${store.phone}`}
                        className="text-xs text-brand-red hover:underline font-semibold"
                      >
                        Gọi đại lý
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center space-y-3">
                <p className="text-gray-400 text-lg">Không tìm thấy địa điểm phân phối nào tại khu vực đã chọn.</p>
                <p className="text-sm text-gray-500">
                  Hãy chọn <strong>"Tất cả"</strong> hoặc gọi cho Hotline hỗ trợ của HTX: <strong>{COMPANY_INFO.hotline}</strong> để được hướng dẫn cửa hàng gần nhất.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Support Agency Call Banner */}
        <section className="py-16 bg-gradient-to-br from-brand-brown-dark to-brand-red-dark text-white text-center">
          <div className="section-container max-w-xl space-y-6">
            <Landmark size={40} className="mx-auto text-brand-gold-light" />
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold">ĐĂNG KÝ LÀM ĐẠI LÝ MỚI</h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
              Hợp tác cùng HTX Hoa Lợi để cung cấp tương ớt chính gốc Tây Bắc. Chính sách chiết khấu linh hoạt, hỗ trợ vận chuyển và truyền thông marketing.
            </p>
            <a
              href={COMPANY_INFO.hotlineLink}
              className="inline-block bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-extrabold px-10 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-base"
            >
              📞 LIÊN HỆ ĐĂNG KÝ SỈ: {COMPANY_INFO.hotline}
            </a>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
