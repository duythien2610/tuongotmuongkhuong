import { useState, useEffect } from 'react';
import { X, Bot, Sparkles } from 'lucide-react';

export default function TrustyBotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Trigger greeting tooltip after 2.5s if not closed in this session
  useEffect(() => {
    const isClosed = sessionStorage.getItem('muongkhuong_bot_greeting_closed');
    if (!isClosed && !isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-hide tooltip after 8s
  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, [showTooltip]);

  // Inject safe CSS into the shadow DOM of <trustai-main>
  // Key rule: NEVER use broad wildcards (*) or [class*="..."] that catch layout/input elements
  useEffect(() => {
    if (!isOpen) return;

    const injectStyles = () => {
      const widget = document.querySelector('trustai-main');
      if (!widget || !widget.shadowRoot) return false;

      if (widget.shadowRoot.getElementById('trustybot-custom-style')) return true;

      const style = document.createElement('style');
      style.id = 'trustybot-custom-style';
      style.textContent = `
        /* === FONT & BASE TEXT — chỉ nhắm vào text elements, không đụng layout === */
        p, span, li, h1, h2, h3, h4, h5, h6, strong, em, a, label, blockquote {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          line-height: 1.65 !important;
          letter-spacing: 0.01em !important;
        }

        /* === INPUT & TEXTAREA — giữ nguyên layout, chỉ thay font === */
        input, textarea, button, select {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }

        /* === BULLET LISTS trong câu trả lời AI === */
        ul, ol {
          padding-left: 20px !important;
          margin-top: 6px !important;
          margin-bottom: 6px !important;
        }
        li {
          margin-bottom: 6px !important;
          line-height: 1.65 !important;
        }

        /* === SCROLLBAR mỏng tinh tế === */
        ::-webkit-scrollbar {
          width: 4px !important;
        }
        ::-webkit-scrollbar-track {
          background: transparent !important;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1) !important;
          border-radius: 4px !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.18) !important;
        }
      `;
      widget.shadowRoot.appendChild(style);
      return true;
    };

    // Try immediately, then poll every 200ms until shadow DOM is ready
    if (injectStyles()) return;
    const interval = setInterval(() => {
      if (injectStyles()) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleToggleChat = () => {
    if (!isOpen) setShowTooltip(false);
    setIsOpen(prev => !prev);
  };

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    sessionStorage.setItem('muongkhuong_bot_greeting_closed', 'true');
  };

  return (
    <>
      {/* Fixed wrapper at bottom-right */}
      <div className="fixed bottom-6 right-4 md:right-6 z-[60] flex flex-col items-end">

        {/* ── CHAT WINDOW ── */}
        {isOpen && (
          <div
            className={[
              // Desktop sizing
              'mb-3 w-[calc(100vw-32px)] sm:w-[390px] md:w-[410px]',
              'h-[480px] sm:h-[520px] md:h-[560px] max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-170px)]',
              // Mobile: full screen overlay
              'max-sm:fixed max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:max-h-full max-sm:mb-0',
              // Visuals
              'bg-white border border-neutral-100/80 overflow-hidden',
              'rounded-[24px] max-sm:rounded-none',
              'shadow-[0_20px_60px_rgba(198,40,40,0.12),_0_4px_20px_rgba(0,0,0,0.06)]',
              // Layout
              'flex flex-col z-50',
              // Animation
              'animate-slideUp',
            ].join(' ')}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#e53935] to-[#c62828] text-white px-5 py-3.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[14px] leading-tight tracking-tight">
                    Trợ lý AI Hoa Lợi
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-[6px] h-[6px] bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-[11px] text-white/75 font-normal">Đang trực tuyến</span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/22 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2"
                aria-label="Đóng chat"
              >
                <X size={15} className="text-white" strokeWidth={2.5} />
              </button>
            </div>

            {/* Chat body — no extra padding, let trustai-main handle internal layout */}
            <div className="flex-1 min-h-0 trustybot-container">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: `
                    <trustai-main
                      uid="tuong-ot-muong-khuong"
                      tenant-id="374039086400275295"
                      layout="full"
                      width="100%"
                      height="100%"
                    ></trustai-main>
                  `
                }}
              />
            </div>
          </div>
        )}

        {/* ── TOGGLE BUTTON + TOOLTIP ── */}
        <div className="flex flex-col items-end relative">

          {/* Greeting Tooltip */}
          {showTooltip && !isOpen && (
            <div className="absolute bottom-[74px] right-1 bg-white text-gray-700 text-[12.5px] font-medium py-2.5 px-3.5 pr-9 rounded-2xl whitespace-nowrap shadow-[0_8px_28px_rgba(0,0,0,0.1)] border border-neutral-100 animate-tooltip-slide-in z-50">
              <span>👋 Cần tư vấn tương ớt ngon? Tôi giúp ngay!</span>
              {/* Tooltip arrow */}
              <span className="absolute -bottom-[5px] right-6 w-[10px] h-[10px] bg-white border-r border-b border-neutral-100 rotate-45 block" />
              <button
                onClick={handleCloseTooltip}
                className="absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-neutral-300 hover:text-neutral-500 hover:bg-neutral-100 transition-colors"
                aria-label="Đóng lời chào"
              >
                <X size={11} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Toggle Button with Pulse Waves */}
          <div className="relative w-[60px] h-[60px]">
            {/* Wave 1 */}
            <span className="absolute inset-0 rounded-full bg-[#e53935] opacity-30 pointer-events-none animate-[pulse-wave_2.5s_ease-out_infinite] z-0" />
            {/* Wave 2 */}
            <span className="absolute inset-0 rounded-full bg-[#e53935] opacity-30 pointer-events-none animate-[pulse-wave_2.5s_ease-out_infinite] z-0 [animation-delay:1.2s]" />

            <button
              onClick={handleToggleChat}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ef5350] to-[#b71c1c] shadow-[0_4px_20px_rgba(198,40,40,0.35)] flex items-center justify-center z-10 hover:scale-105 active:scale-95 transition-transform duration-200"
              aria-label={isOpen ? 'Đóng chat' : 'Mở chat AI'}
            >
              {/* Spinning icon swap */}
              <span className="relative w-[24px] h-[24px] flex items-center justify-center">
                <X
                  size={22}
                  strokeWidth={2.5}
                  className={`text-white absolute transition-all duration-400 ${
                    isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
                  }`}
                />
                <Sparkles
                  size={21}
                  strokeWidth={1.8}
                  className={`text-white absolute transition-all duration-400 ${
                    isOpen ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
              </span>
              {/* Online indicator */}
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* ── GLOBAL KEYFRAME STYLES ── */}
      <style>{`
        @keyframes pulse-wave {
          0%   { transform: scale(1);   opacity: 0.3; }
          60%  { opacity: 0.08; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        @keyframes tooltip-slide-in {
          from { opacity: 0; transform: translateY(10px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .animate-slideUp {
          animation: slideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: bottom right;
        }
        .animate-tooltip-slide-in {
          animation: tooltip-slide-in 0.36s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform-origin: bottom right;
        }

        /* Force Inter font on the outer host — safe, no layout impact */
        .trustybot-container,
        .trustybot-container > * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        }
      `}</style>
    </>
  );
}
