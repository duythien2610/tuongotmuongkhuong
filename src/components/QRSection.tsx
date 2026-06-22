import { QrCode, ScanLine, Calendar, Clock, Tag, MapPin, ShieldCheck, Camera, Award, Truck, CheckCircle2, BadgeCheck, Star } from 'lucide-react';

const TRACE_INFO = [
  { icon: Calendar, label: 'Ngày sản xuất', value: '01/06/2026', color: 'bg-blue-500/20' },
  { icon: Clock, label: 'Hạn sử dụng', value: '01/06/2027 (12 tháng)', color: 'bg-brand-gold/20' },
  { icon: Tag, label: 'Lô sản xuất', value: 'MK-2026-06-001', color: 'bg-purple-500/20' },
  { icon: MapPin, label: 'Vùng nguyên liệu', value: 'Mường Khương, Lào Cai', color: 'bg-green-500/20' },
  { icon: ShieldCheck, label: 'Chứng nhận VSATTP', value: 'VSATTP/2026/MK-0042', color: 'bg-emerald-500/20' },
  { icon: Camera, label: 'Hình ảnh quy trình', value: 'Xem 12 hình ảnh', color: 'bg-pink-500/20' },
];

export default function QRSection() {
  return (
    <section id="qr" className="py-16 lg:py-24 bg-gradient-to-br from-brand-brown-dark via-brand-brown to-brand-brown-dark text-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
      }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="section-container relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              <ScanLine size={16} />
              Truy xuất nguồn gốc
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              QUÉT MÃ TRUY XUẤT<br />
              <span className="text-brand-gold-light">NGUỒN GỐC</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
              Mỗi sản phẩm đều có mã QR riêng. Quét mã để biết đầy đủ thông tin về nguồn gốc, quy trình sản xuất và chứng nhận chất lượng.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* QR Code Display */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-gold/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

                {/* QR Card */}
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-xs w-full">
                  {/* OCOP Badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-brand-gold to-amber-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                    <div className="text-center">
                      <Award size={18} className="text-brand-brown-dark" />
                    </div>
                  </div>

                  {/* Simulated QR Code */}
                  <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 relative mb-4">
                    <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-0.5">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${
                            Math.random() > 0.35 ? 'bg-white' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-xl p-3 shadow-lg">
                        <QrCode size={36} className="text-brand-red" />
                      </div>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="text-center border-t border-gray-100 pt-4">
                    <p className="text-brand-brown-dark font-bold text-lg">TƯƠNG ỚT MK</p>
                    <p className="text-gray-500 text-xs mt-1 flex items-center justify-center gap-2">
                      <span className="flex items-center gap-1">
                        <Award size={12} className="text-brand-gold" />
                        OCOP 3 Sao
                      </span>
                      <span>·</span>
                      <span>Lào Cai</span>
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star size={12} className="text-brand-gold fill-brand-gold" />
                      <span className="text-xs font-bold text-gray-700">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scan button */}
              <button className="mt-8 bg-gradient-to-r from-brand-gold to-amber-400 hover:from-brand-gold-dark hover:to-brand-gold text-brand-brown-dark font-bold px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-brand-gold/40 active:scale-95 flex items-center gap-3">
                <ScanLine size={20} />
                Quét mã truy xuất
              </button>

              {/* Trust badges */}
              <div className="flex items-center gap-4 mt-6">
                {[
                  { icon: BadgeCheck, label: 'Chính hãng' },
                  { icon: ShieldCheck, label: 'An toàn' },
                  { icon: Truck, label: 'Full info' },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-white/60 text-xs">
                    <badge.icon size={14} className="text-brand-gold-light" />
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Traceability Info */}
            <div className="space-y-4">
              {/* Header card */}
              <div className="bg-gradient-to-r from-brand-red/30 to-brand-gold/20 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center shadow-lg">
                    <ScanLine size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Thông tin truy xuất</p>
                    <p className="text-white/60 text-sm">Dữ liệu được cập nhật real-time</p>
                  </div>
                </div>
              </div>

              {/* Trace items */}
              {TRACE_INFO.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all group border border-white/5 hover:border-white/10"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                  <CheckCircle2 size={18} className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
