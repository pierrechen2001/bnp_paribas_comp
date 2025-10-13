import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Policy } from '../data/mockPolicies';

interface PolicyCardProps {
  policy: Policy;
  delay?: number;
}

const PolicyCard = ({ policy, delay = 0 }: PolicyCardProps) => {
  const isPositive = policy.returnRate >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link to={`/policy/${policy.id}`}>
        <div className="card hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-bnp-black group-hover:text-bnp-primary transition-colors">
                {policy.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">保單編號: {policy.id}</p>
            </div>
            {isPositive ? (
              <TrendingUp className="text-bnp-profit-green" size={28} />
            ) : (
              <TrendingDown className="text-bnp-alert-red" size={28} />
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">投資金額</p>
              <p className="text-lg font-semibold text-bnp-black">
                ${policy.investmentAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">目前市值</p>
              <p className="text-lg font-semibold text-bnp-primary">
                ${policy.currentValue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">報酬率</p>
              <p className={`text-lg font-semibold ${isPositive ? 'text-bnp-profit-green' : 'text-bnp-alert-red'}`}>
                {isPositive ? '+' : ''}{policy.returnRate.toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              收益：
              <span className={`font-semibold ml-1 ${isPositive ? 'text-bnp-profit-green' : 'text-bnp-alert-red'}`}>
                ${(policy.currentValue - policy.investmentAmount).toLocaleString()}
              </span>
            </span>
            <ArrowRight className="text-bnp-primary group-hover:translate-x-2 transition-transform" size={20} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PolicyCard;

