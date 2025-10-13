import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  subtitle?: string;
  delay?: number;
}

const KPICard = ({ title, value, change, icon: Icon, subtitle, delay = 0 }: KPICardProps) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-bnp-black">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-bnp-light-gray rounded-xl">
          <Icon className="text-bnp-primary" size={24} />
        </div>
      </div>
      
      {change !== undefined && (
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-semibold ${isPositive ? 'text-bnp-profit-green' : 'text-bnp-alert-red'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
          </span>
          <span className="text-xs text-gray-400">與上次登入相比</span>
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;

