import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Lock, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 簡單驗證 - 任何非空的帳號密碼都可以登入
    if (username && password) {
      // 模擬登入成功
      navigate('/home');
    } else {
      setError('請輸入帳號與密碼');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bnp-primary via-bnp-accent to-bnp-deep flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-4"
          >
            <div className="bg-bnp-primary p-4 rounded-2xl">
              <TrendingUp size={48} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-bnp-black mb-2">SmartFund</h1>
          <p className="text-bnp-neutral-gray">我的投資型保單管理平台</p>
          <div className="mt-4 text-xs text-gray-400">
            <p>BNP Paribas Cardif</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-bnp-black mb-2">
              帳號
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bnp-neutral-gray" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="請輸入您的帳號"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bnp-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-bnp-black mb-2">
              密碼
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bnp-neutral-gray" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="請輸入您的密碼"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bnp-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-bnp-alert-red text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="btn-primary w-full text-lg"
          >
            登入
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 flex justify-between text-sm">
          <a href="#" className="text-bnp-primary hover:underline">
            忘記密碼？
          </a>
          <a href="#" className="text-bnp-primary hover:underline">
            還不是會員？
          </a>
        </div>

        {/* Demo Hint */}
        <div className="mt-8 p-4 bg-bnp-light-gray rounded-xl">
          <p className="text-xs text-center text-gray-600">
            <strong>展示提示：</strong>輸入任何帳號密碼即可登入查看 Prototype
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

