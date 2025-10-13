import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import { kycQuestions, mockRecommendation } from '../data/mockRecommend';

const Recommend = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === kycQuestions.length) {
      setShowResults(true);
    }
  };

  const allAnswered = Object.keys(answers).length === kycQuestions.length;

  // 圓餅圖數據 - 目前配置
  const currentPieData = [
    { name: '股票', value: mockRecommendation.currentAllocation.stocks, color: '#3B8D68' },
    { name: '債券', value: mockRecommendation.currentAllocation.bonds, color: '#5BA87E' },
    { name: '現金', value: mockRecommendation.currentAllocation.cash, color: '#C8C9CA' },
    { name: '其他', value: mockRecommendation.currentAllocation.others, color: '#F5F6F7' },
  ];

  // 圓餅圖數據 - 建議配置
  const recommendedPieData = [
    { name: '股票', value: mockRecommendation.recommendedAllocation.stocks, color: '#3B8D68' },
    { name: '債券', value: mockRecommendation.recommendedAllocation.bonds, color: '#5BA87E' },
    { name: '現金', value: mockRecommendation.recommendedAllocation.cash, color: '#C8C9CA' },
    { name: '其他', value: mockRecommendation.recommendedAllocation.others, color: '#F5F6F7' },
  ];

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
            className="max-w-3xl mx-auto"
          >
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-bnp-black mb-6">投資屬性評估</h2>
              
              <div className="space-y-8">
                {kycQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <h3 className="font-semibold text-bnp-black mb-4">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                            ${answers[question.id] === option.value
                              ? 'border-bnp-primary bg-bnp-primary bg-opacity-5'
                              : 'border-gray-200 hover:border-bnp-accent'
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
                          <span className="text-bnp-black">{option.label}</span>
                          {answers[question.id] === option.value && (
                            <CheckCircle2 className="ml-auto text-bnp-primary" size={24} />
                          )}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`btn-primary w-full mt-8 text-lg flex items-center justify-center space-x-2
                  ${!allAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
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
                <h2 className="text-3xl font-bold mb-3">您的風險屬性</h2>
                <p className="text-5xl font-bold mb-2">{mockRecommendation.riskProfile}</p>
                <p className="text-white text-opacity-90">根據您的回答進行綜合評估</p>
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
                <RadarChart data={mockRecommendation.radarData}>
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
                    stroke="#3B8D68" 
                    fill="#3B8D68" 
                    fillOpacity={0.5}
                    strokeWidth={2}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recommendation Reasoning */}
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
                  <h3 className="text-xl font-bold text-bnp-black mb-3">AI 分析建議</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {mockRecommendation.reasoning}
                  </p>
                </div>
              </div>
            </motion.div>

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

