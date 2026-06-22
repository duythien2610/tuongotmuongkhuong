import { useState } from 'react';
import { MessageCircle, X, Bot } from 'lucide-react';

export default function TrustyBotBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Positioned at the bottom-right corner, simplified layout */}
      <div className="fixed bottom-6 right-4 md:right-6 z-40 flex flex-col items-end">
        {/* Chat window */}
        {isOpen && (
          <div className="mb-3 w-[calc(100vw-32px)] sm:w-[350px] md:w-[360px] h-[460px] sm:h-[480px] md:h-[500px] max-h-[calc(100vh-140px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideUp flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold text-sm">Trợ lý AI TrustyBot</h3>
                  <p className="text-[10px] text-white/80">Tư vấn sản phẩm 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Đóng chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 bg-gray-50 text-gray-800 leading-relaxed tracking-wide font-sans text-sm trustybot-container">
              {/* direct rendering of trustai-main */}
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

        {/* Chat button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative bg-gradient-to-br from-brand-red to-brand-red-dark hover:scale-105 active:scale-95"
          aria-label={isOpen ? 'Đóng chat' : 'Mở chat AI'}
        >
          {isOpen ? (
            <X size={24} className="text-white animate-scale-in" />
          ) : (
            <MessageCircle size={24} className="text-white animate-scale-in" />
          )}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full"></span>
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        /* Force styling for TrustyAI chatbot widget elements */
        trustai-main, [uid="tuong-ot-muong-khuong"] {
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          line-height: 1.62 !important;
          letter-spacing: 0.015em !important;
        }
        
        /* Attempt to style any light-DOM elements rendered by the widget */
        trustai-main *, [uid="tuong-ot-muong-khuong"] * {
          line-height: 1.62 !important;
          letter-spacing: 0.015em !important;
        }
        
        /* Target common chat elements to make sure text is spaced out nicely */
        .trustybot-container p,
        .trustybot-container li,
        .trustybot-container span,
        .trustybot-container div {
          line-height: 1.62 !important;
          letter-spacing: 0.015em !important;
        }
      `}</style>
    </>
  );
}
