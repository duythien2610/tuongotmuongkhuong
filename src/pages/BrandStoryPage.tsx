import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IMG, PRODUCTION_STEPS } from '../data/product';
import { Award, ShieldCheck, Landmark, Leaf, Sparkles, BookOpen } from 'lucide-react';

export default function BrandStoryPage() {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const certs = [
    {
      id: 'ocop',
      title: 'Giấy Chứng Nhận OCOP 3 Sao',
      desc: 'Do UBND Thành phố Lào Cai cấp cho sản phẩm Tương ớt Mường Khương.',
      image: IMG.ocopCert,
      icon: Award,
    },
    {
      id: 'foodSafety',
      title: 'Chứng Nhận An Toàn Thực Phẩm',
      desc: 'Cấp bởi Chi cục Quản lý Chất lượng Nông Lâm Sản và Thủy Sản Lào Cai.',
      image: IMG.foodSafetyCert,
      icon: ShieldCheck,
    },
    {
      id: 'business',
      title: 'Giấy Đăng Ký Hợp Tác Xã',
      desc: 'Giấy chứng nhận đăng ký kinh doanh chính thức của HTX Hoa Lợi.',
      image: IMG.businessLicense,
      icon: Landmark,
    },
  ];

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
            <BookOpen size={16} />
            Hành Trình Thương Hiệu
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            CÂU CHUYỆN<br />
            <span className="text-brand-gold-light">TƯƠNG ỚT MƯỜNG KHƯƠNG</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Vị cay nồng tinh hoa từ núi rừng Tây Bắc - Nỗ lực gìn giữ bản sắc quê hương của HTX Hoa Lợi.
          </p>
        </div>
      </section>

      {/* Slogan Banner - Highlights "Ớt chỉ là ớt" */}
      <section className="py-8 bg-brand-gold text-brand-brown-dark font-display font-black text-center text-xl sm:text-3xl tracking-wide uppercase shadow-inner border-y-2 border-brand-gold-dark/20">
        🌶️ "Hợp tác xã chúng tôi - Ớt chỉ là ớt!" 🌶️
      </section>

      {/* The Story Details */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Interactive Image Box */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-brand-gold/10 rounded-3xl blur-3xl scale-95" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
                <img
                  src={IMG.storyDoc}
                  alt="Tài liệu câu chuyện sản phẩm"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => setActiveCert(IMG.storyDoc)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-6">
                  <span className="text-white text-sm font-bold bg-brand-red/90 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md cursor-pointer hover:bg-brand-red transition-all" onClick={() => setActiveCert(IMG.storyDoc)}>
                    🔍 Xem tài liệu gốc
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Storytelling text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-3 py-1.5 rounded-full text-xs font-bold uppercase">
                <Sparkles size={14} /> Khởi nguồn từ cơ duyên
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark leading-tight">
                Hành Trình Gieo Mầm Của<br />
                <span className="text-brand-red">Hợp Tác Xã Hoa Lợi</span>
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed font-light font-sans">
                <p>
                  Sự thành lập của HTX Hoa Lợi bắt đầu từ câu chuyện đầy thú vị của Giám đốc HTX – ông <strong>Nguyễn Văn Dũng</strong>. Vốn là một nhà thầu xây dựng dưới xuôi lên Mường Khương triển khai công trình, ông đã sinh sống và gắn bó với cuộc sống của bà con đồng bào nơi đây. 
                </p>
                <p>
                  Tại vùng đất địa đầu Đông Bắc có mùa đông giá buốt cắt da cắt thịt, ông Dũng đã vô cùng ấn tượng khi lần đầu thưởng thức món tương ớt xay thủ công cay thơm rực rỡ, được treo lủng lẳng bên các sâu ớt khô nơi gác bếp của các gia đình dân tộc. Món ăn tuy giản dị nhưng nồng ấm, giúp xua tan đi cái lạnh thấu xương vùng cao.
                </p>
                <p>
                  Nhận thấy đây là một đặc sản tinh túy nhưng chưa được quảng bá xứng tầm, ông Dũng đã dành nhiều năm tìm hiểu, học hỏi và được đồng bào truyền lại bí kíp làm tương ớt gia truyền. <strong className="text-brand-red font-bold">Năm 2006</strong>, ông quyết định chuyển hướng sang liên kết cùng bà con thành lập hợp tác xã, chuẩn hóa máy móc quy trình sản xuất và chính thức đăng ký bảo hộ nhãn hiệu tương ớt Mường Khương.
                </p>
                <p>
                  Đến nay, HTX Hoa Lợi tự hào mỗi năm tiêu thụ hơn <strong className="text-brand-red font-bold">100 tấn ớt thóc tươi</strong>, tạo sinh kế bền vững và ổn định cho hơn <strong className="text-brand-red font-bold">50 hộ bà con nông dân dân tộc thiểu số</strong> tại các bản làng Mường Khương.
                </p>
              </div>

              {/* Highlight card */}
              <div className="bg-brand-gold/10 border-l-4 border-brand-gold rounded-r-2xl p-5 text-brand-brown-dark">
                <p className="font-bold mb-1">Thổ nhưỡng & Khí hậu Tây Bắc</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Ớt thóc Mường Khương được canh tác trên sườn núi đá dốc có độ cao trên <strong className="text-brand-red font-bold">1.000m</strong>. Chênh lệch nhiệt độ ngày và đêm rất lớn từ <strong className="text-brand-red font-bold">5-6 độ C</strong> cùng sương mù mát lành ban đêm giúp tích tụ hàm lượng capsaicin tự nhiên vượt trội, tạo ra vị cay sâu, chua nhẹ độc bản.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Verification Section with Lightbox */}
      <section className="py-16 lg:py-24 bg-gray-50 border-y border-gray-100">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Landmark size={16} />
              Pháp Lý Minh Bạch
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mb-4">
              CHỨNG NHẬN CHẤT LƯỢNG QUỐC GIA
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Mọi sản phẩm của HTX Hoa Lợi trước khi phân phối đều được kiểm định chặt chẽ, đạt các giấy chứng nhận pháp lý uy tín bậc nhất.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certs.map((cert) => {
              const Icon = cert.icon;
              return (
                <div key={cert.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mb-5 text-brand-red">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{cert.title}</h3>
                  <p className="text-xs text-gray-500 mb-6 flex-grow leading-relaxed">{cert.desc}</p>
                  
                  {/* Certificate preview */}
                  <div 
                    onClick={() => setActiveCert(cert.image)}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-150 group/cert cursor-pointer bg-gray-50 flex items-center justify-center shadow-inner"
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold bg-brand-red/90 px-3 py-1.5 rounded-lg shadow-md">
                        🔍 Phóng to
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Steps Section (Tabbed - Giai đoạn 3) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Leaf size={16} />
              Quy Trình Chuẩn Hóa
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mb-4">
              7 BƯỚC ĐỂ TẠO NÊN CHẤT LƯỢNG TINH HOA
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Từ rẫy ớt cao nguyên đến bàn ăn của bạn, từng lọ tương ớt đều thấm đượm bàn tay chăm chút thủ công kết hợp kỹ thuật hiện đại.
            </p>
          </div>

          {/* Step Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 max-w-3xl mx-auto">
            {PRODUCTION_STEPS.map((step) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`px-4 py-3 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                  activeStep === step.step
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                    : 'bg-white text-gray-500 border border-gray-150 hover:border-brand-red/20 hover:text-brand-red'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeStep === step.step ? 'bg-white text-brand-red' : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.step}
                </span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          {(() => {
            const currentStep = PRODUCTION_STEPS.find(s => s.step === activeStep) || PRODUCTION_STEPS[0];
            return (
              <div className="bg-[#FCFAF7] rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100/50 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 animate-scale-in">
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group flex-shrink-0">
                  <img 
                    src={currentStep.image} 
                    alt={currentStep.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750" 
                  />
                  <div className="absolute top-4 left-4 bg-brand-red text-white w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-lg">
                    {currentStep.step}
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 space-y-4 text-left">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Bước {currentStep.step} trên 7</span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-brown-dark">
                    {currentStep.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                    {currentStep.description}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Lightbox / Modal Centered Zoom View */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm cursor-zoom-out"
          onClick={() => setActiveCert(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-brand-gold text-lg font-bold flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"
              onClick={() => setActiveCert(null)}
            >
              Đóng ×
            </button>
            <img 
              src={activeCert} 
              alt="Chứng chỉ phóng to" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/15 animate-scale-up" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      {/* Call-to-action Banner (Giai đoạn 3) */}
      <section className="py-20 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-brown-dark text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="section-container relative max-w-2xl space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
            Thưởng Thức Hương Vị Tinh Hoa Tây Bắc Ngay Hôm Nay!
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
            Từng chai tương ớt Mường Khương chuẩn vị OCOP 3 sao đang chờ bạn khám phá.
          </p>
          <div className="pt-4">
            <Link
              to="/san-pham"
              className="inline-block bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-extrabold px-10 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-base tracking-wider"
            >
              MUA NGAY
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
