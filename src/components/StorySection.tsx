import { Mountain, Users, Heart, Award, MapPin, Clock } from 'lucide-react';
import { STORY_IMAGES } from '../data/product';

const STORY_ITEMS = [
  {
    icon: Mountain,
    title: 'Vùng đất Mường Khương',
    description: 'Nằm ở độ cao trên 1.000m so với mực nước biển, huyện Mường Khương, tỉnh Lào Cai là quê hương của giống ớt đặc sản nổi tiếng. Khí hậu ôn hòa, đất đai màu mỡ tạo nên hương vị cay nồng độc đáo không nơi nào có được.',
    color: 'text-brand-red',
    bgColor: 'bg-brand-red/10',
  },
  {
    icon: Users,
    title: 'Bí quyết gia truyền',
    description: 'Công thức nấu tương ớt Mường Khương được lưu truyền qua nhiều thế hệ. Sự kết hợp hoàn hảo giữa ớt tươi, tỏi, gia vị tự nhiên cùng phương pháp nấu thủ công trên lửa nhỏ tạo nên sản phẩm mang đậm bản sắc vùng cao Tây Bắc.',
    color: 'text-brand-gold-dark',
    bgColor: 'bg-brand-gold/10',
  },
  {
    icon: Award,
    title: 'Đạt chuẩn OCOP 3 Sao',
    description: 'Nhờ chất lượng vượt trội và quy trình sản xuất an toàn, Tương Ớt Mường Khương vinh dự đạt chứng nhận OCOP 3 Sao - minh chứng cho sản phẩm đặc sản chất lượng cao của địa phương.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Heart,
    title: 'Hành trình phát triển',
    description: 'Từ xưởng nhỏ trong bản, Tương Ớt Mường Khương đã vươn xa đến mọi miền đất nước, mang theo niềm tự hào của người dân vùng cao và góp phần nâng cao đời sống cho cộng đồng địa phương.',
    color: 'text-brand-brown',
    bgColor: 'bg-brand-brown/10',
  },
];

const STATS = [
  { value: '1,000m+', label: 'Độ cao', icon: Mountain },
  { value: '15+', label: 'Năm kinh nghiệm', icon: Clock },
  { value: 'OCOP 3★', label: 'Chứng nhận', icon: Award },
  { value: '10,000+', label: 'Khách hàng', icon: Heart },
];

export default function StorySection() {
  return (
    <section id="story" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <Heart size={16} />
            Câu chuyện thương hiệu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-brown-dark mb-4">
            Câu chuyện của<br />
            <span className="text-brand-red">Tương Ớt Mường Khương</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Hành trình từ vùng cao Tây Bắc đến mọi miền đất nước
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          {/* Story Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl group">
                  <img
                    src={STORY_IMAGES.highlands1}
                    alt="Vùng cao Tây Bắc - Người dân địa phương"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-medium">Người dân bản địa</p>
                  </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-square shadow-lg group">
                  <img
                    src={STORY_IMAGES.chili}
                    alt="Ớt tươi vùng cao"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Nguyên liệu tươi
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-3xl overflow-hidden aspect-square shadow-lg group">
                  <img
                    src={STORY_IMAGES.mountain}
                    alt="Núi rừng Tây Bắc"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-brand-gold text-brand-brown-dark px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <MapPin size={10} />
                    Lào Cai
                  </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl group">
                  <img
                    src={STORY_IMAGES.highlands2}
                    alt="Cảnh quan vùng cao"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-medium">Vùng cao Tây Bắc</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-brand-gold to-amber-400 rounded-full flex items-center justify-center shadow-xl animate-float z-10">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <Award size={32} className="text-brand-gold" />
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6">
            {STORY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-red/20 hover:shadow-lg transition-all group"
              >
                <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon size={26} className={item.color} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-brand-brown-dark to-brand-brown text-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <stat.icon size={24} className="mx-auto mb-3 text-brand-gold-light group-hover:scale-110 transition-transform" />
              <p className="text-2xl lg:text-3xl font-extrabold mb-1">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
