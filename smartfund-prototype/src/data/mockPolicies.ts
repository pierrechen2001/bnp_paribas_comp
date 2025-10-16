export interface Policy {
  id: string;
  name: string;
  type: string; // 保單類型：變額年金保險、外幣變額年金保險、外幣變額萬能壽險
  riskLevel: number; // RR 風險指數 1-5
  investmentAmount: number;
  currentValue: number;
  returnRate: number;
  lastLoginChange: number;
  navHistory: { date: string; value: number; average: number }[];
  assetAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    others: number;
  };
  assetDetail: {
    usStocks: number;
    twStocks: number;
    euStocks: number;
    govBonds: number;
    corpBonds: number;
  };
  performance: {
    category: string;
    contribution: number;
  }[];
}

export const mockPolicies: Policy[] = [
  {
    id: "1",
    name: "法商法國巴黎人壽鑫滿意足變額年金保險",
    type: "變額年金保險",
    riskLevel: 4,
    investmentAmount: 1000000,
    currentValue: 1185000,
    returnRate: 18.5,
    lastLoginChange: 2.3,
    navHistory: [
      { date: "2024-04", value: 1000000, average: 1000000 },
      { date: "2024-05", value: 1025000, average: 1020000 },
      { date: "2024-06", value: 1045000, average: 1035000 },
      { date: "2024-07", value: 1078000, average: 1055000 },
      { date: "2024-08", value: 1095000, average: 1070000 },
      { date: "2024-09", value: 1132000, average: 1095000 },
      { date: "2024-10", value: 1185000, average: 1125000 },
    ],
    assetAllocation: {
      stocks: 60,
      bonds: 30,
      cash: 5,
      others: 5,
    },
    assetDetail: {
      usStocks: 35,
      twStocks: 15,
      euStocks: 10,
      govBonds: 18,
      corpBonds: 12,
    },
    performance: [
      { category: "美國股票", contribution: 8.5 },
      { category: "台灣股票", contribution: 4.2 },
      { category: "歐洲股票", contribution: 2.8 },
      { category: "政府債券", contribution: 1.8 },
      { category: "公司債券", contribution: 1.2 },
    ],
  },
  {
    id: "2",
    name: "法商法國巴黎人壽寶富利外幣變額年金保險（乙型）",
    type: "外幣變額年金保險",
    riskLevel: 3,
    investmentAmount: 500000,
    currentValue: 535000,
    returnRate: 7.0,
    lastLoginChange: 1.2,
    navHistory: [
      { date: "2024-04", value: 500000, average: 500000 },
      { date: "2024-05", value: 508000, average: 506000 },
      { date: "2024-06", value: 515000, average: 512000 },
      { date: "2024-07", value: 520000, average: 517000 },
      { date: "2024-08", value: 525000, average: 522000 },
      { date: "2024-09", value: 530000, average: 527000 },
      { date: "2024-10", value: 535000, average: 532000 },
    ],
    assetAllocation: {
      stocks: 30,
      bonds: 60,
      cash: 8,
      others: 2,
    },
    assetDetail: {
      usStocks: 15,
      twStocks: 10,
      euStocks: 5,
      govBonds: 40,
      corpBonds: 20,
    },
    performance: [
      { category: "政府債券", contribution: 3.5 },
      { category: "公司債券", contribution: 2.0 },
      { category: "美國股票", contribution: 1.0 },
      { category: "台灣股票", contribution: 0.3 },
      { category: "歐洲股票", contribution: 0.2 },
    ],
  },
  {
    id: "3",
    name: "法商法國巴黎人壽華利年年外幣變額萬能壽險",
    type: "外幣變額萬能壽險",
    riskLevel: 5,
    investmentAmount: 800000,
    currentValue: 912000,
    returnRate: 14.0,
    lastLoginChange: -0.8,
    navHistory: [
      { date: "2024-04", value: 800000, average: 800000 },
      { date: "2024-05", value: 828000, average: 820000 },
      { date: "2024-06", value: 856000, average: 840000 },
      { date: "2024-07", value: 888000, average: 862000 },
      { date: "2024-08", value: 904000, average: 876000 },
      { date: "2024-09", value: 935000, average: 897000 },
      { date: "2024-10", value: 912000, average: 892000 },
    ],
    assetAllocation: {
      stocks: 80,
      bonds: 15,
      cash: 3,
      others: 2,
    },
    assetDetail: {
      usStocks: 45,
      twStocks: 20,
      euStocks: 15,
      govBonds: 8,
      corpBonds: 7,
    },
    performance: [
      { category: "美國股票", contribution: 7.2 },
      { category: "台灣股票", contribution: 3.8 },
      { category: "歐洲股票", contribution: 2.0 },
      { category: "政府債券", contribution: 0.6 },
      { category: "公司債券", contribution: 0.4 },
    ],
  },
];

export const getTotalStats = () => {
  const totalInvestment = mockPolicies.reduce((sum, p) => sum + p.investmentAmount, 0);
  const totalValue = mockPolicies.reduce((sum, p) => sum + p.currentValue, 0);
  const totalReturn = totalValue - totalInvestment;
  const avgChange = mockPolicies.reduce((sum, p) => sum + p.lastLoginChange, 0) / mockPolicies.length;
  
  return {
    totalValue,
    totalReturn,
    totalInvestment,
    avgChange,
  };
};

