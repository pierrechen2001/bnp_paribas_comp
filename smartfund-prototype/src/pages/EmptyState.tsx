import { motion } from 'framer-motion';
import { FileQuestion, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const EmptyState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bnp-light-gray to-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Illustration */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="mb-8"
          >
            <div className="inline-block p-8 bg-bnp-light-gray rounded-full">
              <FileQuestion size={120} className="text-bnp-neutral-gray" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-bnp-black mb-4">
              您目前尚未持有任何投資型保單
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              投資型保單結合保障與投資，讓您的資產穩健成長。<br />
              透過專業的基金管理，為您的未來做好準備。
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            <div className="card">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-semibold text-bnp-black mb-2">專業投資</h3>
              <p className="text-sm text-gray-600">由專業團隊管理，分散風險</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-semibold text-bnp-black mb-2">保障兼顧</h3>
              <p className="text-sm text-gray-600">同時提供人身保障功能</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-semibold text-bnp-black mb-2">靈活配置</h3>
              <p className="text-sm text-gray-600">依需求調整投資組合</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <button className="btn-primary text-lg inline-flex items-center space-x-2">
              <span>瞭解投資型保單</span>
              <ArrowRight size={20} />
            </button>
            
            <div className="text-sm text-gray-500">
              或 <a href="#" className="text-bnp-primary hover:underline font-semibold">聯絡專員諮詢</a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-white rounded-bnp-lg border border-gray-200"
          >
            <h3 className="font-semibold text-bnp-black mb-4">需要協助嗎？</h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-600">
              <div>
                <span className="font-semibold">客服專線：</span> 0800-098-889
              </div>
              <div>
                <span className="font-semibold">服務時間：</span> 週一至週五 09:00-18:00
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyState;

