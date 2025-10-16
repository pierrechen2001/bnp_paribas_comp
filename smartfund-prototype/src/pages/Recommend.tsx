import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import { kycQuestions, calculateRiskProfile, getRecommendation, getRecommendedProducts } from '../data/mockRecommend';

const Recommend = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [riskResult, setRiskResult] = useState({ profile: '', score: 0, description: '' });

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === kycQuestions.length) {
      const result = calculateRiskProfile(answers);
      setRiskResult(result);
      setShowResults(true);
    }
  };

  const allAnswered = Object.keys(answers).length === kycQuestions.length;
  const recommendation = showResults ? getRecommendation(riskResult.profile) : null;
  const recommendedProducts = showResults ? getRecommendedProducts(riskResult.profile) : [];

  // 圓餅圖數據 - 目前配置
  const currentPieData = recommendation ? [
    { name: '股票', value: recommendation.currentAllocation.stocks, color: '#FF6B6B' },
    { name: '債券', value: recommendation.currentAllocation.bonds, color: '#4ECDC4' },
    { name: '現金', value: recommendation.currentAllocation.cash, color: '#FFE66D' },
    { name: '其他', value: recommendation.currentAllocation.others, color: '#95E1D3' },
  ] : [];

  // 圓餅圖數據 - 建議配置
  const recommendedPieData = recommendation ? [
    { name: '股票', value: recommendation.recommendedAllocation.stocks, color: '#FF6B6B' },
    { name: '債券', value: recommendation.recommendedAllocation.bonds, color: '#4ECDC4' },
    { name: '現金', value: recommendation.recommendedAllocation.cash, color: '#FFE66D' },
    { name: '其他', value: recommendation.recommendedAllocation.others, color: '#95E1D3' },
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-bnp-light-gray to-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-block p-4 bg-bnp-primary bg-opacity-10 rounded-2xl mb-4">
            <Lightbulb size={48} className="text-bnp-primary" />
          </div>
          <h1 className="text-4xl font-bold text-bnp-black mb-2">AI 智能投資建議</h1>
          <p className="text-gray-600">依據您的風險屬性與投資偏好，為您量身打造最適合的投資組合</p>
        </motion.div>

        {!showResults ? (
          /* KYC Questionnaire */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-bnp-black">投資屬性評估問卷</h2>
                <div className="text-sm text-gray-600">
                  已完成 <span className="font-bold text-bnp-primary">{Object.keys(answers).length}</span> / {kycQuestions.length} 題
                </div>
              </div>
              
              <div className="space-y-10">
                {kycQuestions.map((question, index) => {
                  // 檢查是否為新類別的第一題
                  const showCategory = index === 0 || question.category !== kycQuestions[index - 1].category;
                  
                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      {showCategory && (
                        <div className="mb-4 pb-2 border-b-2 border-bnp-primary">
                          <h3 className="text-lg font-bold text-bnp-primary">{question.category}</h3>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-bnp-black mb-4 text-base">
                          {question.question}
                        </h4>
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                ${answers[question.id] === option.value
                                  ? 'border-bnp-primary bg-bnp-primary bg-opacity-10 shadow-md'
                                  : 'border-gray-200 hover:border-bnp-accent hover:bg-gray-50'
                                }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={answers[question.id] === option.value}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                                className="mr-3 w-5 h-5 text-bnp-primary"
                              />
                              <span className="text-bnp-black flex-1">{option.label}</span>
                              {answers[question.id] === option.value && (
                                <CheckCircle2 className="ml-auto text-bnp-primary" size={24} />
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-10 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  請完成所有 {kycQuestions.length} 題問卷，系統將根據您的回答進行風險屬性評估
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`btn-primary w-full mt-6 text-lg flex items-center justify-center space-x-2
                  ${!allAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Award size={20} />
                <span>取得 AI 分析結果</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Recommendation Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Risk Profile */}
            <div className="card mb-8 bg-gradient-to-r from-bnp-primary to-bnp-accent text-white">
              <div className="text-center">
                <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full mb-4">
                  <Award size={48} />
                </div>
                <h2 className="text-2xl font-bold mb-3">您的風險屬性評估結果</h2>
                <p className="text-5xl font-bold mb-4">{riskResult.profile}</p>
                <div className="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full mb-4">
                  <p className="text-lg">評估分數：<span className="font-bold">{riskResult.score}</span> / 30 分</p>
                </div>
                <p className="text-white text-opacity-90 max-w-2xl mx-auto">{riskResult.description}</p>
              </div>
            </div>

            {/* Allocation Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h3 className="text-2xl font-bold text-bnp-black mb-6 text-center">目前配置</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {currentPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card border-2 border-bnp-primary"
              >
                <h3 className="text-2xl font-bold text-bnp-primary mb-6 text-center">
                  建議配置 ✨
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={recommendedPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {recommendedPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Radar Chart */}
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card mb-8"
              >
                <h3 className="text-2xl font-bold text-bnp-black mb-6 text-center">
                  投資組合特性比較
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={recommendation.radarData}>
                    <PolarGrid stroke="#E0E2E3" />
                    <PolarAngleAxis dataKey="category" stroke="#7B7B7B" />
                    <PolarRadiusAxis stroke="#7B7B7B" />
                    <Radar 
                      name="目前配置" 
                      dataKey="current" 
                      stroke="#C8C9CA" 
                      fill="#C8C9CA" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar 
                      name="建議配置" 
                      dataKey="recommended" 
                      stroke="#4ECDC4" 
                      fill="#4ECDC4" 
                      fillOpacity={0.5}
                      strokeWidth={3}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Recommendation Reasoning */}
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card bg-bnp-light-gray"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-bnp-primary rounded-xl">
                    <Lightbulb className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-bnp-black mb-3">AI 投資建議</h3>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {recommendation.reasoning}
                    </p>
                    
                    {/* 推薦產品 */}
                    <div className="bg-white p-6 rounded-lg border-2 border-bnp-primary">
                      <h4 className="text-lg font-bold text-bnp-black mb-4 flex items-center">
                        <span className="w-2 h-2 bg-bnp-primary rounded-full mr-3"></span>
                        推薦投資產品
                      </h4>
                      <div className="space-y-3">
                        {recommendedProducts.map((product, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="w-8 h-8 bg-bnp-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-green-700 font-semibold text-lg">{product}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        💡 以上產品均為法國巴黎人壽優質投資型保單，符合您的風險屬性與投資目標
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <button className="btn-primary flex-1 text-lg">
                申請調整配置
              </button>
              <button 
                onClick={() => setShowResults(false)}
                className="btn-secondary flex-1 text-lg"
              >
                重新評估
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recommend;

