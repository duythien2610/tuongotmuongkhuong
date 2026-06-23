import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/product';

export default function MiniCart({ isScrolled }: { isScrolled?: boolean }) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 transition-colors duration-300 rounded-xl group ${
          isScrolled === false
            ? 'text-white/95 hover:text-white hover:bg-white/10'
            : 'text-gray-700 hover:text-brand-red hover:bg-brand-red/5'
        }`}
        aria-label="Giỏ hàng"
      >
        <ShoppingCart size={22} />
        <span className={`absolute -top-1 -right-1 w-5 h-5 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform ${
          totalItems > 0 ? 'bg-brand-red-dark' : 'bg-gray-500'
        }`}>
          {totalItems}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-brand-brown-dark">Giỏ hàng ({totalItems})</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart size={20} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">Giỏ hàng trống</p>
              <Link
                to="/san-pham"
                onClick={() => setIsOpen(false)}
                className="inline-block mt-4 px-4 py-2 bg-brand-red text-white text-xs font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
              >
                Mua sắm ngay
              </Link>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs text-brand-brown-dark line-clamp-1">{item.name}</p>
                      {item.weight && (
                        <p className="text-[10px] text-gray-500">{item.weight}</p>
                      )}
                      <p className="text-brand-red font-bold text-sm mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-brand-red transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-brand-red transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-1 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Tạm tính:</span>
                  <span className="font-extrabold text-brand-red text-lg">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/san-pham"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center py-2.5 text-xs font-semibold border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Tiếp tục mua
                  </Link>
                  <Link
                    to="/thanh-toan"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center py-2.5 bg-brand-red text-white text-xs font-semibold rounded-lg hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-1"
                  >
                    Thanh toán
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
