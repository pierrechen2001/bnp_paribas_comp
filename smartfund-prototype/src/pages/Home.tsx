import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';
import PolicyCard from '../components/PolicyCard';
import { mockPolicies, getTotalStats } from '../data/mockPolicies';

const Home = () => {
  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-bnp-light-gray to-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-bnp-black mb-2">投資型保單總覽</h1>
          <p className="text-gray-600">歡迎回來，以下是您的投資組合概況</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <KPICard
            title="目前總市值"
            value={`$${stats.totalValue.toLocaleString()}`}
            icon={DollarSign}
            subtitle={`投資金額 $${stats.totalInvestment.toLocaleString()}`}
            delay={0}
          />
          <KPICard
            title="總收益"
            value={`$${stats.totalReturn.toLocaleString()}`}
            change={((stats.totalReturn / stats.totalInvestment) * 100)}
            icon={TrendingUp}
            delay={0.1}
          />
          <KPICard
            title="平均變動"
            value={`${stats.avgChange >= 0 ? '+' : ''}${stats.avgChange.toFixed(2)}%`}
            change={stats.avgChange}
            icon={Wallet}
            subtitle="與上次登入相比"
            delay={0.2}
          />
        </div>

        {/* Policy List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-bnp-black mb-6">我的保單</h2>
          <div className="grid grid-cols-1 gap-6">
            {mockPolicies.map((policy, index) => (
              <PolicyCard 
                key={policy.id} 
                policy={policy} 
                delay={0.1 * index}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card bg-gradient-to-r from-bnp-primary to-bnp-accent text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">需要投資建議？</h3>
              <p className="text-white text-opacity-90">
                使用 AI 智能分析，為您量身打造最適合的投資組合建議
              </p>
            </div>
            <a href="/recommend" className="btn-secondary bg-white text-bnp-primary border-0 hover:bg-opacity-90">
              立即分析
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

