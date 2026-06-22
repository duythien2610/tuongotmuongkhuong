import { useState } from 'react';
import { X, Mail, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const { requestPasswordReset, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Vui lòng nhập email hoặc số điện thoại');
      return;
    }

    const result = await requestPasswordReset(identifier);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || 'Gửi yêu cầu không thành công');
    }
  };

  const handleClose = () => {
    onClose();
    setIdentifier('');
    setError('');
    setIsSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-8">
          {isSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-brand-brown-dark mb-2">
                Gửi yêu cầu thành công
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Nếu tài khoản tồn tại, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email hoặc số điện thoại của bạn.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3 bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-xl shadow-lg shadow-brand-red/20 transition-all"
              >
                Đóng
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleClose}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm"
              >
                <ArrowLeft size={16} />
                Quay lại
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-brand-red" />
                </div>
                <h2 className="text-xl font-bold text-brand-brown-dark">Quên mật khẩu?</h2>
                <p className="text-gray-500 text-sm mt-2">
                  Nhập email hoặc số điện thoại đã đăng ký để nhận hướng dẫn đặt lại mật khẩu
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email hoặc số điện thoại
                  </label>
                  <div className="relative">
                    {identifier.includes('@') ? (
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    ) : (
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Nhập email hoặc số điện thoại"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-xl shadow-lg shadow-brand-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
