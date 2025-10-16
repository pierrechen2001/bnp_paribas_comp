export interface RecommendationData {
  riskProfile: string;
  currentAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    others: number;
  };
  recommendedAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    others: number;
  };
  reasoning: string;
  radarData: {
    category: string;
    current: number;
    recommended: number;
  }[];
}

export const mockRecommendation: RecommendationData = {
  riskProfile: "平衡型",
  currentAllocation: {
    stocks: 58,
    bonds: 32,
    cash: 7,
    others: 3,
  },
  recommendedAllocation: {
    stocks: 50,
    bonds: 40,
    cash: 8,
    others: 2,
  },
  reasoning: "根據您的投資屬性與市場趨勢分析，建議適度調整資產配置。近期債券市場回穩，適合增加配置比例以分散風險並提升投資組合的穩定性。同時略微降低股票部位，以因應市場波動。此配置更符合您的平衡型風險屬性。",
  radarData: [
    { category: "成長性", current: 75, recommended: 65 },
    { category: "穩定性", current: 55, recommended: 70 },
    { category: "流動性", current: 45, recommended: 50 },
    { category: "收益性", current: 60, recommended: 68 },
    { category: "風險控制", current: 50, recommended: 72 },
  ],
};

export interface KYCQuestion {
  id: string;
  category: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

export const kycQuestions: KYCQuestion[] = [
  {
    id: "q1",
    category: "一、投資經驗",
    question: "1. 您的投資經驗？",
    options: [
      { value: "beginner", label: "初學者（少於 1 年）", score: 0 },
      { value: "intermediate", label: "中級（1-3 年）", score: 0 },
      { value: "advanced", label: "進階（3 年以上）", score: 0 },
    ],
  },
  {
    id: "q2",
    category: "二、風險程度",
    question: "2. 您可接受的風險程度？",
    options: [
      { value: "conservative", label: "保守型（優先保本）", score: 1 },
      { value: "balanced", label: "平衡型（穩健成長）", score: 2 },
      { value: "aggressive", label: "積極型（追求高報酬）", score: 3 },
    ],
  },
  {
    id: "q3",
    category: "三、資產偏好",
    question: "3. 您偏好的資產類型？",
    options: [
      { value: "bonds", label: "債券為主", score: 1 },
      { value: "mixed", label: "股債平衡", score: 2 },
      { value: "stocks", label: "股票為主", score: 3 },
    ],
  },
  {
    id: "q4",
    category: "四、投資目標",
    question: "4. 您的投資目標最接近以下哪一項？",
    options: [
      { value: "stable", label: "穩定累積資產（偏向長期）", score: 1 },
      { value: "planning", label: "為退休或教育等特定目標規劃（中長期穩健）", score: 2 },
      { value: "shortterm", label: "創造短期報酬（偏向積極操作）", score: 3 },
    ],
  },
  {
    id: "q5",
    category: "五、投資期間",
    question: "5. 您預期的投資期間是多久？",
    options: [
      { value: "short", label: "少於 3 年", score: 1 },
      { value: "medium", label: "3-7 年", score: 2 },
      { value: "long", label: "超過 7 年", score: 3 },
    ],
  },
  {
    id: "q6",
    category: "六、投資頻率",
    question: "6. 您希望多久檢視一次您的投資？",
    options: [
      { value: "rare", label: "每半年或更久", score: 1 },
      { value: "quarterly", label: "每季一次", score: 2 },
      { value: "monthly", label: "每月一次", score: 3 },
    ],
  },
  {
    id: "q7",
    category: "七、心理行為",
    question: "7. 如果市場下跌 10%，您的反應會是？",
    options: [
      { value: "redeem", label: "立即贖回，避免虧損擴大", score: 1 },
      { value: "observe", label: "持續觀察，不急著變動", score: 2 },
      { value: "buyMore", label: "視為加碼機會", score: 3 },
    ],
  },
  {
    id: "q8",
    category: "七、心理行為",
    question: "8. 當您的投資報酬率超過預期時，您通常會？",
    options: [
      { value: "takeProfit", label: "先獲利了結", score: 1 },
      { value: "hold", label: "繼續持有觀察", score: 2 },
      { value: "invest", label: "再投入更多資金", score: 3 },
    ],
  },
  {
    id: "q9",
    category: "八、財務能力",
    question: "9. 您目前可投入的投資金額約占您月收入的比例為？",
    options: [
      { value: "low", label: "少於 10%", score: 1 },
      { value: "medium", label: "10%～30%", score: 2 },
      { value: "high", label: "超過 30%", score: 3 },
    ],
  },
  {
    id: "q10",
    category: "九、理財態度",
    question: "10. 在理財時，您比較重視哪一項？",
    options: [
      { value: "safety", label: "穩定與安全（不虧錢最重要）", score: 1 },
      { value: "balance", label: "收益與成長（報酬與風險並重）", score: 2 },
      { value: "growth", label: "高報酬機會（願意承擔波動）", score: 3 },
    ],
  },
  {
    id: "q11",
    category: "十、資訊來源與學習意願",
    question: "11. 您通常透過何種方式獲取投資資訊？",
    options: [
      { value: "advisor", label: "親友/理專建議為主", score: 0 },
      { value: "media", label: "金融新聞或網路社群", score: 0 },
      { value: "research", label: "自行研究報告與數據", score: 0 },
    ],
  },
  {
    id: "q12",
    category: "十、資訊來源與學習意願",
    question: "12. 您在投資決策時主要依據什麼？",
    options: [
      { value: "safety", label: "安全性與穩定性", score: 1 },
      { value: "comprehensive", label: "綜合考量風險與報酬", score: 2 },
      { value: "potential", label: "成長潛力與報酬空間", score: 3 },
    ],
  },
];

// 計算風險屬性
export const calculateRiskProfile = (answers: { [key: string]: string }): { 
  profile: string; 
  score: number;
  description: string;
} => {
  let totalScore = 0;
  
  kycQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        totalScore += option.score;
      }
    }
  });

  let profile = "";
  let description = "";

  if (totalScore >= 10 && totalScore <= 16) {
    profile = "保守型";
    description = "您偏好穩健的投資方式，重視資本保全。建議以債券型基金為主，搭配少量股票型基金，追求穩定收益。";
  } else if (totalScore >= 17 && totalScore <= 22) {
    profile = "穩健平衡型";
    description = "您追求穩健成長，願意承擔適度風險。建議採取股債平衡策略，兼顧成長與穩定性。";
  } else if (totalScore >= 23 && totalScore <= 30) {
    profile = "積極成長型";
    description = "您追求高報酬，願意承擔較高風險。建議以股票型基金為主，積極參與市場成長機會。";
  } else {
    profile = "未完成評估";
    description = "請完成所有問題以獲得完整的風險屬性評估。";
  }

  return { profile, score: totalScore, description };
};

// 根據風險屬性生成建議配置
export const getRecommendation = (profile: string): RecommendationData => {
  const recommendations: { [key: string]: RecommendationData } = {
    "保守型": {
      riskProfile: "保守型 (Conservative)",
      currentAllocation: {
        stocks: 58,
        bonds: 32,
        cash: 7,
        others: 3,
      },
      recommendedAllocation: {
        stocks: 30,
        bonds: 60,
        cash: 8,
        others: 2,
      },
      reasoning: "根據您的保守型風險屬性，建議大幅增加債券配置至 60%，降低股票部位至 30%。此配置強調資本保全與穩定收益，適合風險承受度較低的投資人。債券投資能提供相對穩定的利息收入，並降低整體投資組合的波動性。",
      radarData: [
        { category: "成長性", current: 75, recommended: 45 },
        { category: "穩定性", current: 55, recommended: 85 },
        { category: "流動性", current: 45, recommended: 60 },
        { category: "收益性", current: 60, recommended: 55 },
        { category: "風險控制", current: 50, recommended: 90 },
      ],
    },
    "穩健平衡型": {
      riskProfile: "穩健平衡型 (Moderate Balanced)",
      currentAllocation: {
        stocks: 58,
        bonds: 32,
        cash: 7,
        others: 3,
      },
      recommendedAllocation: {
        stocks: 50,
        bonds: 40,
        cash: 8,
        others: 2,
      },
      reasoning: "根據您的穩健平衡型風險屬性，建議採取股債平衡策略。股票配置 50%，債券 40%，既能參與市場成長，又能透過債券分散風險。近期債券市場回穩，適合增加配置比例以提升投資組合的穩定性，同時保有適度的成長潛力。",
      radarData: [
        { category: "成長性", current: 75, recommended: 65 },
        { category: "穩定性", current: 55, recommended: 70 },
        { category: "流動性", current: 45, recommended: 50 },
        { category: "收益性", current: 60, recommended: 68 },
        { category: "風險控制", current: 50, recommended: 72 },
      ],
    },
    "積極成長型": {
      riskProfile: "積極成長型 (Growth)",
      currentAllocation: {
        stocks: 58,
        bonds: 32,
        cash: 7,
        others: 3,
      },
      recommendedAllocation: {
        stocks: 75,
        bonds: 20,
        cash: 3,
        others: 2,
      },
      reasoning: "根據您的積極成長型風險屬性，建議提高股票配置至 75%，充分把握市場成長機會。此配置適合風險承受度高、投資期間長的投資人。雖然短期波動可能較大，但長期而言有機會獲得較高的資本增值。建議分散投資於不同地區與產業，降低個別市場風險。",
      radarData: [
        { category: "成長性", current: 75, recommended: 90 },
        { category: "穩定性", current: 55, recommended: 40 },
        { category: "流動性", current: 45, recommended: 45 },
        { category: "收益性", current: 60, recommended: 75 },
        { category: "風險控制", current: 50, recommended: 45 },
      ],
    },
  };

  return recommendations[profile] || recommendations["穩健平衡型"];
};

// 根據風險屬性推薦產品
export const getRecommendedProducts = (profile: string): string[] => {
  const productRecommendations: { [key: string]: string[] } = {
    "保守型": [
      "法商法國巴黎人壽寶富利外幣變額年金保險（乙型）",
      "法商法國巴黎人壽鑫滿意足變額年金保險"
    ],
    "穩健平衡型": [
      "法商法國巴黎人壽鑫滿意足變額年金保險",
      "法商法國巴黎人壽寶富利外幣變額年金保險（乙型）"
    ],
    "積極成長型": [
      "法商法國巴黎人壽華利年年外幣變額萬能壽險",
      "法商法國巴黎人壽鑫滿意足變額年金保險"
    ],
  };

  return productRecommendations[profile] || productRecommendations["穩健平衡型"];
};

