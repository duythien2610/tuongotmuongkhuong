import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { COMPANY_INFO, IMG } from '../data/product';
import { MapPin, Phone, Award, ShieldCheck, Flame, Star, Sparkles, CheckCircle2, ChevronDown, Calendar, User, ArrowRight } from 'lucide-react';

export default function TuongOtMuongKhuongPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // SEO Optimization & Schema injection
  useEffect(() => {
    // 1. Update document Title & Meta Tags
    const originalTitle = document.title;
    document.title = 'Tuong Ớt mường khương chính gốc Lào Cai - HTX Hoa Lợi';

    // Description Meta (150-160 characters with CTA)
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Mua tương ớt Mường Khương chính gốc OCOP 3 sao từ HTX Hoa Lợi. Men cay tự nhiên từ ớt thóc vùng cao. Gọi ngay hotline 0912 518 745 để được tư vấn giá sỉ lẻ!');

    // Keywords Meta
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const originalKeywords = metaKeywords ? metaKeywords.getAttribute('content') : '';
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Tuong Ớt mường khương, tương ớt mường khương chính gốc, mua tương ớt mường khương ở đâu, giá tương ớt mường khương, HTX Hoa Lợi, đặc sản Lào Cai');

    // 2. Inject JSON-LD Schema (FAQPage & LocalBusiness)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Tương ớt Mường Khương chính gốc mua ở đâu uy tín?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Bạn có thể mua tương ớt Mường Khương chính gốc do HTX Hoa Lợi sản xuất trực tiếp tại Thôn Cánh Chín, xã Vạn Hòa, TP. Lào Cai hoặc tại hệ thống đại lý chính hãng. Liên hệ ngay hotline 0912 518 745 để nhận sản phẩm chuẩn vị OCOP 3 sao.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Giá tương ớt Mường Khương của HTX Hoa Lợi là bao nhiêu?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Hiện tại, giá tương ớt Mường Khương chính gốc được niêm yết công khai: chai 250ml có giá 30.000đ và chai 500ml có giá 55.000đ. Chúng tôi có chính sách giá sỉ ưu đãi cho các nhà hàng, đại lý trên toàn quốc.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Cách bảo quản tương ớt Mường Khương như thế nào để giữ vị ngon lâu nhất?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Trước khi mở nắp, bạn bảo quản ở nơi khô ráo, thoáng mát. Sau khi mở nắp sử dụng, nên bảo quản tương ớt trong ngăn mát tủ lạnh để làm chậm quá trình lên men tự nhiên, giữ cho vị chua cay luôn hài hòa.'
          }
        }
      ]
    };

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Tương Ớt Mường Khương - HTX Hoa Lợi',
      'image': 'https://tuongotmuongkhuong.com.vn' + IMG.sauce1,
      'telephone': '0912518745',
      'email': COMPANY_INFO.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Thôn Cánh Chín, xã Vạn Hòa',
        'addressLocality': 'Thành phố Lào Cai',
        'addressRegion': 'Tỉnh Lào Cai',
        'postalCode': '10000',
        'addressCountry': 'VN'
      },
      'url': 'https://tuongotmuongkhuong.com.vn',
      'priceRange': '$$',
      'areaServed': 'VN',
      'hasMap': COMPANY_INFO.mapLink
    };

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'faq-schema-json';
    scriptFaq.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFaq);

    const scriptBusiness = document.createElement('script');
    scriptBusiness.type = 'application/ld+json';
    scriptBusiness.id = 'business-schema-json';
    scriptBusiness.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(scriptBusiness);

    // Cleanup on unmount
    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc || '');
      if (metaKeywords) metaKeywords.setAttribute('content', originalKeywords || '');
      
      const elFaq = document.getElementById('faq-schema-json');
      if (elFaq) elFaq.remove();

      const elBusiness = document.getElementById('business-schema-json');
      if (elBusiness) elBusiness.remove();
    };
  }, []);

  const faqItems = [
    {
      q: 'Tương ớt Mường Khương chính gốc mua ở đâu uy tín?',
      a: 'Bạn có thể mua tương ớt Mường Khương chính gốc do HTX Hoa Lợi sản xuất trực tiếp tại Thôn Cánh Chín, xã Vạn Hòa, TP. Lào Cai hoặc tại hệ thống đại lý phân phối chính hãng ở Hà Nội và các tỉnh thành khác. Liên hệ ngay hotline 0912 518 745 để được giao hàng nhanh chóng tận nhà.'
    },
    {
      q: 'Giá tương ớt Mường Khương của HTX Hoa Lợi là bao nhiêu?',
      a: 'Giá tương ớt Mường Khương chính gốc của chúng tôi hiện đang có mức giá niêm yết cực kỳ cạnh tranh: chai 250ml giá 30.000đ và chai 500ml giá 55.000đ. Đối với các đơn hàng số lượng lớn cho nhà hàng, quán ăn hoặc đối tác muốn làm đại lý phân phối, HTX Hoa Lợi luôn có chính sách giá sỉ chiết khấu cao.'
    },
    {
      q: 'Tại sao tương ớt Mường Khương lại có vị chua nhẹ độc đáo?',
      a: 'Điểm khác biệt của sản phẩm là quá trình lên men axit lactic tự nhiên trong vòng 2-3 tháng từ nguồn nguyên liệu ớt thóc tươi, tỏi cô đơn kết hợp các gia vị thảo mộc rừng như hạt dổi rừng, thảo quả, hạt dổi. Vị chua này hoàn toàn tự nhiên từ men sinh học, không phải vị chua của giấm hóa học thông thường.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream-light/20 text-gray-800">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-brown-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }} />
        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold-light px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 animate-pulse border border-brand-gold/30">
              <Award size={16} />
              Đặc sản Tây Bắc đạt chuẩn OCOP 3 Sao
            </span>
            {/* H1 exact keyword matching brief requirements */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 uppercase">
              Tuong Ớt mường khương — <span className="text-brand-gold-light">Giải pháp / Hướng dẫn Đầy Đủ</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-8">
              Bí quyết lựa chọn, thưởng thức và đặt mua tương ớt Mường Khương chính gốc từ HTX Hoa Lợi – Tinh hoa ẩm thực cay nồng từ vùng cao Lào Cai.
            </p>
            
            {/* E-E-A-T Meta elements */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60 bg-black/20 py-2 px-6 rounded-full w-fit mx-auto backdrop-blur-sm border border-white/5">
              <span className="flex items-center gap-1"><User size={14} /> Tác giả: <strong>{COMPANY_INFO.name}</strong></span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Đăng ngày: 30/06/2026</span>
              <span className="hidden sm:inline">|</span>
              <span className="text-brand-gold">Cập nhật mới nhất</span>
            </div>
          </div>
        </div>
      </section>

      {/* Answer Box section (Direct answer in < 50 words) */}
      <section className="py-8 bg-brand-gold text-brand-brown-dark font-sans shadow-md border-y border-brand-gold-dark/20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 border border-brand-brown-dark/10 shadow-lg">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red flex items-center gap-2 mb-2">
              <Flame size={14} className="animate-bounce" /> Answer Box — Tóm tắt nhanh:
            </h4>
            <p className="text-base font-medium leading-relaxed italic text-gray-800">
              <strong>Tương ớt Mường Khương</strong> là đặc sản OCOP 3 sao nổi tiếng của Lào Cai, được chế biến từ ớt thóc tươi lên men tự nhiên kết hợp tỏi, hạt dổi và thảo quả. Sản phẩm chính gốc do HTX Hoa Lợi sản xuất và phân phối toàn quốc qua hotline 0912 518 745.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Intro */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-3 py-1.5 rounded-full text-xs font-bold uppercase">
                <Sparkles size={14} /> Khám phá đặc sản
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-brown-dark leading-tight">
                Tuong Ớt mường khương là gì? Tại sao lại được thực khách săn lùng nhiều đến thế?
              </h2>
              <div className="space-y-4 text-gray-650 leading-relaxed font-light">
                <p>
                  Nhắc đến vùng đất Lào Cai sương mù bao phủ, du khách không chỉ nhớ tới đỉnh Fansipan hùng vĩ mà còn bị mê hoặc bởi hương vị độc đáo của <strong>Tuong Ớt mường khương</strong>. Đây là loại nước chấm truyền thống được nâng tầm thành sản phẩm nghệ thuật ẩm thực đạt chuẩn OCOP 3 Sao cấp tỉnh của <Link to="/" className="text-brand-red hover:underline font-medium">HTX Hoa Lợi</Link>.
                </p>
                <p>
                  Sự quan trọng và nổi tiếng của đặc sản này nằm ở công thức chế biến thủ công độc nhất vô nhị. Khác với các dòng sản phẩm công nghiệp sử dụng chất tạo cay hóa học và phẩm màu nhân tạo, tương ớt mường khương của chúng tôi tôn vinh sự nguyên bản: cay sâu từ ớt thóc bản địa, thơm nồng từ tỏi cô đơn và ấm áp từ các loại thảo dược rừng của vùng núi Tây Bắc.
                </p>
                <p>
                  Sản phẩm là người bạn đồng hành hoàn hảo cho các món nướng, hấp, thịt trâu gác bếp, hay đơn giản là chấm cùng bát phở nóng hổi mỗi buổi sáng.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-brand-gold/10 rounded-3xl blur-3xl scale-95" />
              <img 
                src={IMG.sauce3} 
                alt="Chai tương ớt Mường Khương chính gốc của HTX Hoa Lợi đặc sản Lào Cai" 
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 w-full object-cover max-h-[480px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Lợi ích chính */}
      <section className="py-16 lg:py-24 bg-gray-50 border-y border-gray-100">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <ShieldCheck size={16} />
              Giá trị cốt lõi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mb-4">
              Lợi Ích Chính Của Tương Ớt Mường Khương
            </h2>
            <p className="text-gray-550 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Hai trụ cột tạo nên uy tín và chất lượng thượng hạng của thương hiệu Tuong Ớt mường khương do HTX Hoa Lợi chế biến.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* H3: Nguyên liệu tự nhiên */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100">
              <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-6 text-brand-red">
                <Flame size={28} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                1. Nguyên liệu tự nhiên từ vùng cao Mường Khương
              </h3>
              <p className="text-gray-600 leading-relaxed font-light mb-6 flex-grow">
                Trái tim của chai tương ớt chính là giống ớt thóc bản địa, loại quả chỉ nhỏ bằng đầu đũa nhưng mang vị cay rực rỡ khó quên. Ớt thóc được trồng trên các sườn núi đá dốc có độ cao trên 1000m tại huyện Mường Khương. Khí hậu lạnh giá kết hợp chênh lệch nhiệt độ ngày đêm lớn từ 5-6°C giúp ớt thóc tích tụ nồng độ capsaicin tự nhiên vượt trội. 
              </p>
              <div className="bg-brand-gold/10 p-4 rounded-2xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span className="text-xs text-brand-brown-dark font-medium">HTX Hoa Lợi cam kết bao tiêu 100 tấn ớt thóc tươi mỗi năm từ bà con dân tộc bản địa.</span>
              </div>
            </div>

            {/* H3: Hương vị men cay */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100">
              <div className="w-14 h-14 bg-brand-gold/15 rounded-2xl flex items-center justify-center mb-6 text-brand-brown">
                <Award size={28} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                2. Hương vị men cay truyền thống từ thảo dược rừng
              </h3>
              <p className="text-gray-600 leading-relaxed font-light mb-6 flex-grow">
                Điểm độc đáo tạo nên danh tiếng của tương ớt Mường Khương nằm ở bí quyết ủ men chua tự nhiên. Ớt thóc giã nhỏ được ủ cùng tỏi, muối trắng, nước cất và đặc biệt là các gia vị thảo mộc rừng như hạt dổi rừng, thảo quả, hạt dổi. Quá trình lên men kéo dài từ 2 đến 3 tháng trong các chum sành truyền thống giúp giải phóng axit lactic tự nhiên, tạo hậu vị chua thanh, nồng nàn đặc trưng.
              </p>
              <div className="bg-green-50 p-4 rounded-2xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-green-800 font-medium">Đạt chứng nhận Vệ Sinh An Toàn Thực Phẩm cấp quốc gia và 100% không dùng chất tạo cay hóa học.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cách thực hiện / Quy trình / Bảng giá */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-brand-red/10 px-3 py-1.5 rounded-full inline-block">
                Quy trình & Báo giá
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark leading-tight">
                Quy Trình Chế Biến Kỳ Công Để Tạo Nên Một Chai Tương Ớt Mường Khương
              </h2>
              <p className="text-gray-600 leading-relaxed font-light">
                Mỗi chai tương ớt mường khương chính gốc xuất xưởng từ HTX Hoa Lợi đều phải trải qua hành trình 4 bước kiểm định khắt khe dưới sự hướng dẫn của chuyên gia nông nghiệp Lào Cai.
              </p>

              {/* Steps Layout */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-red text-white font-bold rounded-full flex items-center justify-center flex-shrink-0 shadow-md">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">Bước 1 — Tuyển chọn ớt thóc & tỏi cô đơn</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">Ớt thóc chín đỏ đều, không sâu thối, cuống xanh tươi. Tỏi cô đơn bản địa được bóc vỏ sạch sẽ.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-red text-white font-bold rounded-full flex items-center justify-center flex-shrink-0 shadow-md">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">Bước 2 — Xay nhuyễn cùng thảo dược rừng</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">Ớt và tỏi được xay nhuyễn kết hợp muối biển và tỷ lệ vàng hạt dổi, thảo quả nướng thơm giã mịn.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-red text-white font-bold rounded-full flex items-center justify-center flex-shrink-0 shadow-md">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">Bước 3 — Ủ chum sành lên men tự nhiên</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">Đưa hỗn hợp vào chum sành lớn, đậy kín hơi và ủ tự nhiên từ 60 đến 90 ngày cho đến khi tương ớt đạt vị chua thanh sinh học và màu đỏ rực rỡ.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bảng giá */}
            <div className="lg:col-span-6 bg-brand-brown-dark rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-brand-gold/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl" />
              <h3 className="font-display text-2xl font-bold text-brand-gold-light mb-6 flex items-center gap-2">
                Bảng Giá Tương Ớt Mường Khương Mới Nhất
              </h3>
              <p className="text-sm text-white/70 mb-6 font-light">
                Cam kết giá gốc xuất xưởng tốt nhất trực tiếp từ cơ sở sản xuất của HTX Hoa Lợi.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div>
                    <h4 className="font-bold text-white text-base">Chai truyền thống 250ml</h4>
                    <p className="text-[10px] text-white/50">Phù hợp cho gia đình nhỏ dùng hàng ngày</p>
                  </div>
                  <div className="text-right">
                    <span className="text-brand-gold font-bold text-xl">30.000 đ</span>
                    <p className="text-[10px] line-through text-white/35">45.000 đ</p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div>
                    <h4 className="font-bold text-white text-base">Chai tiết kiệm 500ml</h4>
                    <p className="text-[10px] text-white/50">Dành cho tín đồ ăn cay và các quán ăn, nhà hàng</p>
                  </div>
                  <div className="text-right">
                    <span className="text-brand-gold font-bold text-xl">55.000 đ</span>
                    <p className="text-[10px] line-through text-white/35">80.000 đ</p>
                  </div>
                </div>

                <div className="bg-brand-red/20 border border-brand-red/35 rounded-2xl p-4 text-center mt-6">
                  <p className="font-bold text-sm text-brand-gold flex items-center justify-center gap-1">
                    🌶️ Chính sách giá sỉ cho nhà hàng & quán ăn
                  </p>
                  <p className="text-xs text-white/80 font-light mt-1">
                    Hỗ trợ chiết khấu từ 15-30% cùng cước gửi xe giá ưu đãi 1.000đ/chai về Hà Nội.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Case study / Ví dụ thực tế */}
      <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-150">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-brown px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Star size={14} className="text-brand-gold" /> Trải nghiệm khách hàng
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark">
              Case Study: Đồng Hành Cùng Ẩm Thực Việt
            </h2>
            <p className="text-gray-550 font-light text-sm sm:text-base leading-relaxed mt-3">
              Những minh chứng sống động về giá trị mà thương hiệu tương ớt Mường Khương của HTX Hoa Lợi mang lại cho đối tác kinh doanh nhà hàng.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <img src={IMG.avatar2} alt="Khách hàng đại lý" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Anh Hoàng Minh Tuấn</h4>
                  <p className="text-[10px] text-gray-400">Chủ chuỗi Quán Phở Núi Tây Bắc tại Cầu Giấy, Hà Nội</p>
                </div>
              </div>
              <p className="text-xs text-gray-650 leading-relaxed italic font-light">
                "Từ khi quán tôi chuyển hẳn sang sử dụng tương ớt Mường Khương của HTX Hoa Lợi, lượng khách trung thành quay lại quán phở tăng rõ rệt. Khách hàng cực kỳ thích vị cay nồng lên men chua dịu tự nhiên thay vì vị cay nồng gắt của tương ớt công nghiệp. Cước vận chuyển gửi xe về Hà Nội siêu rẻ chỉ 1.000đ/chai 500ml giúp tôi tối ưu chi phí nguyên liệu tối đa."
              </p>
              <div className="mt-4 flex items-center gap-1 text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <img src={IMG.avatar3} alt="Khách hàng mua lẻ" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Chị Nguyễn Thanh Nhàn</h4>
                  <p className="text-[10px] text-gray-400">Khách mua sắm tại Hà Nội</p>
                </div>
              </div>
              <p className="text-xs text-gray-650 leading-relaxed italic font-light">
                "Tôi đặt combo 3 chai tương ớt mường khương làm quà biếu gia đình dịp Tết vừa rồi. Ai cũng khen nức nở vị cay đặc trưng vùng cao Tây Bắc. Nhãn mác bao bì của HTX Hoa Lợi rất chuyên nghiệp, có chứng chỉ OCOP 3 sao rõ ràng nên mang tặng vô cùng an tâm và lịch sự. Dịch vụ chăm sóc khách hàng qua Zalo tư vấn rất nhiệt tình."
              </p>
              <div className="mt-4 flex items-center gap-1 text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ - Câu hỏi thường gặp */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-brand-red/10 px-3 py-1.5 rounded-full inline-block">
              Hỏi đáp nhanh
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-4">
              FAQ — Những Câu Hỏi Thường Gặp
            </h2>
            <p className="text-gray-550 font-light text-sm mt-2">
              Giải đáp thắc mắc thường gặp của khách hàng về sản phẩm tương ớt thóc Mường Khương.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full text-left p-5 font-bold text-gray-800 flex justify-between items-center gap-4 hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-60 opacity-100 border-t border-gray-255' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 text-sm text-gray-650 leading-relaxed font-light">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Chi nhánh liên hệ & Bản đồ (CTA) */}
      <section className="py-16 lg:py-24 bg-brand-cream-light/35 border-t border-gray-200" id="chi-nhanh">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Contact Info */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-brand-red/10 px-3 py-1.5 rounded-full inline-block">
                Hệ thống chi nhánh
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-brown-dark">
                Thông Tin Liên Hệ & Đặt Hàng Trực Tiếp
              </h2>
              <p className="text-gray-600 leading-relaxed font-light">
                Quý khách hàng có nhu cầu tư vấn sản phẩm, làm đại lý hoặc đặt mua tương ớt Mường Khương chính hãng sỉ & lẻ vui lòng liên hệ theo thông tin chính thức dưới đây:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-red">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Trụ sở sản xuất chính gốc:</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">
                      {COMPANY_INFO.address}
                    </p>
                    <a 
                      href={COMPANY_INFO.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-brand-red hover:underline font-semibold mt-2 inline-flex items-center gap-1"
                    >
                      Xem bản đồ chỉ đường <ArrowRight size={12} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-red">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Đường dây nóng hỗ trợ 24/7:</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">
                      Giải đáp mọi thắc mắc về phân phối sỉ lẻ, giao nhận và chính sách đại lý.
                    </p>
                    <p className="font-bold text-brand-red text-base mt-1">
                      Hotline: {COMPANY_INFO.hotline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended CTA: Xem chi nhánh / Gọi ngay */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  to="/he-thong-phan-phoi" 
                  className="bg-brand-brown hover:bg-brand-brown-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 hover:scale-[1.02]"
                >
                  <MapPin size={18} />
                  Xem chi nhánh
                </Link>
                <a 
                  href={COMPANY_INFO.hotlineLink} 
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-brand-red/20 flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Phone size={18} />
                  Gọi ngay
                </a>
              </div>
            </div>

            {/* Google Map / Visual element */}
            <div className="lg:col-span-6 h-[350px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1847.6698642270923!2d103.968212!3d22.486241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd16ea57790b9b%3A0xe5a17ca16027a08e!2zVGjDtG4gQ8OhbmggQ2jDrW4sIFbhuqFuIEjDsmEsIEzDoG8gQ2Fp!5e0!3m2!1svi!2svn!4v1782201388648!5m2!1svi!2svn" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ chỉ đường tới HTX Hoa Lợi sản xuất tương ớt Mường Khương"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-brand-brown-dark/95 backdrop-blur-sm p-4 rounded-2xl text-white text-xs max-w-xs shadow-lg border border-brand-gold/10 font-sans">
                <p className="font-bold text-brand-gold mb-1">Cơ sở sản xuất Lào Cai</p>
                <p className="text-white/80 font-light">Thôn Cánh Chín, xã Vạn Hòa, TP. Lào Cai</p>
                {/* External link to Lào Cai government page for E-E-A-T citation */}
                <p className="mt-2 text-[10px] text-white/50">
                  Địa điểm nằm trong vùng quy hoạch OCOP trọng điểm tỉnh Lào Cai. Chi tiết tại <a href="https://laocai.gov.vn" target="_blank" rel="noopener noreferrer" className="text-brand-gold-light underline">laocai.gov.vn</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
