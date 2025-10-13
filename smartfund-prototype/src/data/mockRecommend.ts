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
  question: string;
  options: { value: string; label: string }[];
}

export const kycQuestions: KYCQuestion[] = [
  {
    id: "experience",
    question: "您的投資經驗？",
    options: [
      { value: "beginner", label: "初學者（少於1年）" },
      { value: "intermediate", label: "中級（1-3年）" },
      { value: "advanced", label: "進階（3年以上）" },
    ],
  },
  {
    id: "risk",
    question: "您可接受的風險程度？",
    options: [
      { value: "conservative", label: "保守型（優先保本）" },
      { value: "balanced", label: "平衡型（穩健成長）" },
      { value: "aggressive", label: "積極型（追求高報酬）" },
    ],
  },
  {
    id: "preference",
    question: "您偏好的資產類型？",
    options: [
      { value: "bonds", label: "債券為主" },
      { value: "mixed", label: "股債平衡" },
      { value: "stocks", label: "股票為主" },
    ],
  },
];

