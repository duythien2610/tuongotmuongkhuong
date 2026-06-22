import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ChevronRight, Clock, Heart, Leaf, Sparkles, Thermometer, Package, Award } from 'lucide-react';
import { PRODUCTION_STEPS } from '../data/product';

const STEP_ICONS = [
  Leaf,        // 1. Thu hoạch
  Sparkles,    // 2. Rửa & sơ chế
  Heart,       // 3. Xay ớt
  Thermometer, // 4. Nấu tương
  CheckCircle2, // 5. Kiểm định
  Package,     // 6. Rót chai
  Award,       // 7. Đóng gói
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto advance steps
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PRODUCTION_STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="process" ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <Clock size={16} />
            Quy trình sản xuất
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-brown-dark mb-4">
            QUY TRÌNH<br />
            <span className="text-brand-red">SẢN XUẤT TRUYỀN THỐNG</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            7 bước tỉ mỉ từ nguyên liệu đến thành phẩm, mỗi bước đều được thực hiện với sự tận tâm và kinh nghiệm hàng chục năm
          </p>
        </div>

        {/* Desktop: Modern Timeline */}
        <div className="hidden lg:block">
          {/* Progress bar */}
          <div className="relative mb-10">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-red via-brand-gold to-brand-red transition-all duration-700"
                style={{ width: `${((activeStep + 1) / PRODUCTION_STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-7 gap-4">
            {PRODUCTION_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[idx];
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <div
                  key={step.step}
                  className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  {/* Step number/icon */}
                  <div className="flex justify-center mb-5">
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-brand-red to-brand-red-dark shadow-xl shadow-brand-red/30 scale-110'
                        : isPast
                        ? 'bg-gradient-to-br from-brand-gold to-amber-400 shadow-lg shadow-brand-gold/20'
                        : 'bg-gray-100'
                    }`}>
                      <Icon size={28} className={`transition-colors duration-300 ${
                        isActive || isPast || isPast ? 'text-white' : 'text-gray-400'
                      }`} />

                      {/* Step number badge */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all ${
                        isActive
                          ? 'bg-brand-gold text-brand-brown-dark'
                          : isPast
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-500 border border-gray-200'
                      }`}>
                        {isPast ? <CheckCircle2 size={14} /> : step.step}
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative rounded-2xl overflow-hidden aspect-square mb-4 bg-gray-100 transition-all duration-500 ${
                    isActive ? 'shadow-xl ring-2 ring-brand-red/30 scale-105' : 'shadow-sm'
                  }`}>
                    <img
                      src={step.image}
                      alt={step.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-110' : ''}`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className={`font-semibold text-center mb-1 transition-colors ${
                    isActive ? 'text-brand-red text-base' : 'text-gray-800 text-sm'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs text-center leading-relaxed transition-all ${
                    isActive ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Interactive Timeline */}
        <div className="lg:hidden">
          {/* Featured step */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-red to-brand-red-dark p-6 mb-8 text-white">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  {(() => {
                    const Icon = STEP_ICONS[activeStep];
                    return <Icon size={24} />;
                  })()}
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-0.5">Bước {PRODUCTION_STEPS[activeStep].step}</p>
                  <h3 className="font-bold text-lg">{PRODUCTION_STEPS[activeStep].title}</h3>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {PRODUCTION_STEPS[activeStep].description}
              </p>
            </div>

            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </div>

          {/* Step navigation */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {PRODUCTION_STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`relative aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  idx === activeStep
                    ? 'bg-brand-red text-white shadow-lg'
                    : idx < activeStep
                    ? 'bg-brand-gold text-brand-brown-dark'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {idx < activeStep ? <CheckCircle2 size={14} /> : step.step}
              </button>
            ))}
          </div>

          {/* Timeline details */}
          <div className="space-y-4">
            {PRODUCTION_STEPS.map((step, idx) => (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                  idx === activeStep
                    ? 'bg-brand-red/5 border-2 border-brand-red/30'
                    : 'bg-white border border-gray-100 hover:border-brand-red/20'
                }`}
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      idx <= activeStep ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.step}
                    </span>
                    <h4 className="font-semibold text-gray-800">{step.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{step.description}</p>
                </div>

                <ChevronRight size={18} className={`flex-shrink-0 transition-all ${idx === activeStep ? 'text-brand-red rotate-90' : 'text-gray-300'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Trust stat under process */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '7+', label: 'Quy trình chế biến', color: 'from-brand-red to-brand-red-dark' },
            { value: '15+', label: 'Năm kinh nghiệm', color: 'from-brand-gold to-amber-400' },
            { value: '100%', label: 'Thủ công truyền thống', color: 'from-green-500 to-emerald-600' },
            { value: 'OCOP 3★', label: 'Chứng nhận chất lượng', color: 'from-purple-500 to-violet-600' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white text-center shadow-lg`}
            >
              <p className="text-2xl font-extrabold mb-1">{stat.value}</p>
              <p className="text-xs text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
