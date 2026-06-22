import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Mail, Phone, Lock, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordModal from './ForgotPasswordModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const { login, register, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
    setLoginError('');
    setRegisterError('');
  }, [initialTab, isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError('Vui lòng nhập email hoặc số điện thoại');
      return;
    }
    if (!loginPassword) {
      setLoginError('Vui lòng nhập mật khẩu');
      return;
    }

    const result = await login(loginIdentifier, loginPassword, rememberMe);
    if (result.success) {
      onClose();
      setLoginIdentifier('');
      setLoginPassword('');
    } else {
      setLoginError(result.error || 'Đăng nhập thất bại');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!registerName.trim()) {
      setRegisterError('Vui lòng nhập họ và tên');
      return;
    }
    if (!registerPhone.trim()) {
      setRegisterError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!registerEmail.trim()) {
      setRegisterError('Vui lòng nhập email');
      return;
    }
    if (!registerPassword) {
      setRegisterError('Vui lòng nhập mật khẩu');
      return;
    }
    if (registerPassword.length < 6) {
      setRegisterError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (registerPassword !== confirmPassword) {
      setRegisterError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (!agreeTerms) {
      setRegisterError('Bạn cần đồng ý với điều khoản sử dụng');
      return;
    }

    const result = await register({
      full_name: registerName,
      phone: registerPhone,
      email: registerEmail,
      password: registerPassword
    });

    if (result.success) {
      onClose();
      setRegisterName('');
      setRegisterPhone('');
      setRegisterEmail('');
      setRegisterPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);
    } else {
      setRegisterError(result.error || 'Đăng ký thất bại');
    }
  };

  const handleClose = () => {
    onClose();
    setLoginError('');
    setRegisterError('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

        {/* Modal - Single Column Centered */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[460px] overflow-hidden animate-scale-in">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-brand-red" />
                </div>
                <h2 className="text-2xl font-bold text-brand-brown-dark">ĐĂNG NHẬP</h2>
                <p className="text-gray-500 text-sm mt-2">Chào mừng bạn quay trở lại</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email hoặc số điện thoại
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Nhập email hoặc số điện thoại"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        rememberMe
                          ? 'bg-brand-red border-brand-red'
                          : 'border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {rememberMe && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-brand-red hover:text-brand-red-dark font-medium"
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-xl shadow-lg shadow-brand-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-gray-500 text-sm">Chưa có tài khoản? </span>
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-brand-red font-semibold hover:text-brand-red-dark text-sm"
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User size={28} className="text-brand-gold-dark" />
                </div>
                <h2 className="text-2xl font-bold text-brand-brown-dark">ĐĂNG KÝ</h2>
                <p className="text-gray-500 text-sm mt-1">Tạo tài khoản mới</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Họ và tên*
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Nhập họ và tên"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Số điện thoại*
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        placeholder="Ví dụ: 0901234567"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email*
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mật khẩu*
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Ít nhất 6 ký tự"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Xác nhận mật khẩu*
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                      agreeTerms
                        ? 'bg-brand-red border-brand-red'
                        : 'border-gray-300 hover:border-brand-red'
                    }`}
                  >
                    {agreeTerms && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-600">
                    Tôi đồng ý với <span className="text-brand-red font-medium">Điều khoản sử dụng</span> và <span className="text-brand-red font-medium">Chính sách bảo mật</span>
                  </span>
                </label>

                {registerError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                    {registerError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-brown-dark font-semibold rounded-xl shadow-lg shadow-brand-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-gray-500 text-sm">Đã có tài khoản? </span>
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-brand-red font-semibold hover:text-brand-red-dark text-sm"
                >
                  Đăng nhập ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}
