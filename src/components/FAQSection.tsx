import { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Mail, Clock, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { FAQ_DATA } from '../data/product';

const QUICK_ANSWERS = [
  {
    icon: Clock,
    question: 'Hạn sử dụng bao lâu?',
    answer: '12 tháng từ ngày sản xuất',
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10',
  },
  {
    icon: Leaf,
    question: 'Có chất bảo quản không?',
    answer: 'Đúng quy định Bộ Y tế',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Truck,
    question: 'Freeship từ bao nhiêu?',
    answer: 'Đơn từ 200.000đ',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    question: 'Có đổi trả không?',
    answer: 'Có! Trong 7 ngày',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <HelpCircle size={16} />
            Câu hỏi thường gặp
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-brown-dark mb-4">
            CÂU HỎI<br />
            <span className="text-brand-red">THƯỜNG GẶP</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Giải đáp nhanh những thắc mắc của bạn về sản phẩm và dịch vụ
          </p>
        </div>

        {/* Quick Answers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {QUICK_ANSWERS.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} rounded-2xl p-5 text-center hover:shadow-md transition-all hover:-translate-y-1 group cursor-default`}
            >
              <item.icon size={28} className={`mx-auto mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
              <p className="font-semibold text-sm text-gray-800 mb-1">{item.question}</p>
              <p className="text-xs text-gray-600 font-medium">{item.answer}</p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === idx
                    ? 'shadow-xl ring-2 ring-brand-red/20'
                    : 'shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-red/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      openIndex === idx
                        ? 'bg-brand-red text-white'
                        : 'bg-brand-red/10 text-brand-red group-hover:bg-brand-red/20'
                    }`}>
                      <span className="font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className={`font-semibold text-base pr-4 transition-colors ${
                      openIndex === idx ? 'text-brand-red' : 'text-gray-800 group-hover:text-brand-red'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    openIndex === idx ? 'bg-brand-red text-white rotate-180' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-6 lg:px-8 lg:pb-8">
                    <div className="bg-gradient-to-r from-brand-red/5 to-brand-gold/5 rounded-xl p-5 border-l-4 border-brand-red">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-brand-brown-dark via-brand-brown to-brand-brown-dark rounded-3xl overflow-hidden shadow-xl relative">
            {/* Decorative */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />

            <div className="relative p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chưa tìm thấy câu trả lời?</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:0912518745"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-brown-dark font-semibold px-6 py-3 rounded-xl hover:bg-brand-gold-light transition-colors shadow-lg"
                >
                  <Phone size={18} />
                  0912 518 745
                </a>
                <a
                  href="mailto:info@muongkhuong.vn"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Mail size={18} />
                  Gửi email
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
                >
                  <MessageCircle size={18} />
                  Chat Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
