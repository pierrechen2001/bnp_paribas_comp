import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart3, Info, Shield } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';
import { mockPolicies } from '../data/mockPolicies';

const PolicyDetail = () => {
  const { id } = useParams();
  const policy = mockPolicies.find(p => p.id === id);
  const [period, setPeriod] = useState('6月');

  if (!policy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bnp-light-gray to-white">
        <Navbar />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-bnp-black">找不到該保單</h1>
          <Link to="/home" className="btn-primary mt-6 inline-block">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  const isPositive = policy.returnRate >= 0;
  
  // 根據選擇的期間過濾數據
  const filteredData = useMemo(() => {
    const dataMap: { [key: string]: number } = {
      '1週': 1,
      '1月': 2,
      '3月': 4,
      '6月': 7,
      'YTD': 7,
      '1年': 7,
      '3年': 7,
      '5年': 7,
    };
    const count = dataMap[period] || 7;
    return policy.navHistory.slice(-count);
  }, [period, policy.navHistory]);

  // 計算期間績效
  const periodPerformance = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const start = filteredData[0].value;
    const end = filteredData[filteredData.length - 1].value;
    return ((end - start) / start) * 100;
  }, [filteredData]);

  // 找出最高點和最低點
  const highLow = useMemo(() => {
    const values = filteredData.map(d => d.value);
    return {
      high: Math.max(...values),
      low: Math.min(...values),
    };
  }, [filteredData]);
  
  // 資產配置圓餅圖數據 - 使用更鮮豔的顏色
  const pieData = [
    { name: '股票', value: policy.assetAllocation.stocks, color: '#FF6B6B' },
    { name: '債券', value: policy.assetAllocation.bonds, color: '#4ECDC4' },
    { name: '現金', value: policy.assetAllocation.cash, color: '#FFE66D' },
    { name: '其他', value: policy.assetAllocation.others, color: '#95E1D3' },
  ];

  // 收益貢獻數據 - 根據貢獻度使用不同顏色
  const performanceData = policy.performance.map((p, index) => {
    let color = '#3B8D68';
    if (index === 0) color = '#4ECDC4'; // 最佳 - 青綠色
    else if (index === policy.performance.length - 1) color = '#FF6B6B'; // 最弱 - 紅色
    else if (p.contribution > 3) color = '#95E1D3'; // 良好 - 淺綠
    else color = '#FFE66D'; // 普通 - 黃色
    
    return {
      name: p.category,
      contribution: p.contribution,
      color,
    };
  });

  const periods = ['1週', '1月', '3月', '6月', 'YTD', '1年', '3年', '5年'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-bnp-light-gray to-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/home" className="inline-flex items-center space-x-2 text-bnp-primary hover:text-bnp-deep mb-6 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-semibold">返回首頁</span>
        </Link>

        {/* Policy Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-bnp-black mb-3">{policy.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <p className="text-gray-600">保單編號：{policy.id}</p>
                <span className="text-gray-300">|</span>
                <p className="text-gray-700 font-medium">{policy.type}</p>
                <span className="text-gray-300">|</span>
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg border-2 font-semibold ${
                  policy.riskLevel <= 2 
                    ? 'bg-green-50 text-green-700 border-green-400' 
                    : policy.riskLevel <= 3 
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-400' 
                    : 'bg-red-50 text-red-700 border-red-400'
                }`}>
                  <Shield size={16} />
                  <span>風險等級 RR{policy.riskLevel}</span>
                </div>
              </div>
            </div>
            {isPositive ? (
              <TrendingUp className="text-bnp-profit-green flex-shrink-0" size={48} />
            ) : (
              <TrendingDown className="text-bnp-alert-red flex-shrink-0" size={48} />
            )}
          </div>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-semibold text-bnp-black mb-4">區間篩選</h3>
          <div className="flex flex-wrap gap-3">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  period === p
                    ? 'bg-bnp-primary text-white shadow-md'
                    : 'bg-bnp-light-gray text-bnp-black hover:bg-bnp-neutral-gray hover:bg-opacity-30'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="總市值"
            value={`$${policy.currentValue.toLocaleString()}`}
            icon={DollarSign}
            delay={0.2}
          />
          <KPICard
            title={`${period} 報酬率`}
            value={`${periodPerformance >= 0 ? '+' : ''}${periodPerformance.toFixed(2)}%`}
            change={periodPerformance}
            icon={TrendingUp}
            delay={0.3}
          />
          <KPICard
            title="收益金額"
            value={`$${(policy.currentValue - policy.investmentAmount).toLocaleString()}`}
            change={policy.lastLoginChange}
            icon={BarChart3}
            delay={0.4}
          />
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-bnp-black mb-2">基金績效走勢</h3>
              <p className="text-sm text-gray-600">顯示 {period} 期間內的績效表現</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <div className="flex items-center space-x-2 mb-1">
                <Info size={16} className="text-blue-600" />
                <span className="font-semibold text-blue-900">區間統計</span>
              </div>
              <div className="space-y-1 text-xs text-gray-700">
                <div>最高點: <span className="font-bold text-green-600">${highLow.high.toLocaleString()}</span></div>
                <div>最低點: <span className="font-bold text-orange-600">${highLow.low.toLocaleString()}</span></div>
                <div>波動: <span className="font-bold text-purple-600">${(highLow.high - highLow.low).toLocaleString()}</span></div>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E2E3" />
              <XAxis dataKey="date" stroke="#7B7B7B" />
              <YAxis stroke="#7B7B7B" domain={['dataMin - 10000', 'dataMax + 10000']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #4ECDC4',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4ECDC4" 
                strokeWidth={4}
                name="個人保單"
                dot={{ fill: '#4ECDC4', r: 6, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
                fill="url(#colorValue)"
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#FFE66D" 
                strokeWidth={3}
                name={`同類平均（${policy.type}）`}
                strokeDasharray="5 5"
                dot={{ fill: '#FFE66D', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Chart Explanation */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-lg border-l-4 border-cyan-500">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="font-semibold text-gray-800">個人保單</span>
              </div>
              <p className="text-xs text-gray-600">您的投資績效表現，{periodPerformance >= 0 ? '目前呈現上漲趨勢' : '目前呈現下跌趨勢'}。</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold text-gray-800">同類平均（{policy.type}）</span>
              </div>
              <p className="text-xs text-gray-600">法國巴黎人壽所有{policy.type}的平均績效，可用來比較您的投資表現。</p>
            </div>
          </div>
        </motion.div>

        {/* Asset Allocation and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-bnp-black mb-2">資產配置</h3>
            <p className="text-sm text-gray-600 mb-6">您的投資組合分布情況</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-full shadow-md" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-700">
                <Info size={14} className="inline mr-1 text-blue-600" />
                股票占比 {policy.assetAllocation.stocks}%，
                {policy.assetAllocation.stocks > 50 ? '屬於積極型投資組合' : '屬於穩健型投資組合'}
              </p>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-bnp-black mb-2">收益貢獻分析</h3>
            <p className="text-sm text-gray-600 mb-6">各資產類別對總收益的貢獻度</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E2E3" />
                <XAxis type="number" stroke="#7B7B7B" />
                <YAxis dataKey="name" type="category" stroke="#7B7B7B" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #4ECDC4',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="contribution" radius={[0, 12, 12, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={20} className="text-cyan-600" />
                  <span className="text-sm font-semibold text-gray-700">最佳表現</span>
                </div>
                <span className="font-bold text-cyan-700">{performanceData[0].name} (+{performanceData[0].contribution}%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center space-x-2">
                  <TrendingDown size={20} className="text-red-600" />
                  <span className="text-sm font-semibold text-gray-700">最弱表現</span>
                </div>
                <span className="font-bold text-red-700">{performanceData[performanceData.length - 1].name} (+{performanceData[performanceData.length - 1].contribution}%)</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-700">
                <Info size={14} className="inline mr-1 text-purple-600" />
                {performanceData[0].name} 是目前表現最佳的資產類別，貢獻了 {performanceData[0].contribution}% 的收益。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;

