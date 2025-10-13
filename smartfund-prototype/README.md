# 🌐 SmartFund 智能基金追蹤與推薦平台

## 專案簡介

SmartFund 是一個為 **BNP Paribas Cardif（法國巴黎人壽）** 打造的投資型保單管理平台 Prototype。本專案展示了如何將後台資料前台化，讓保戶能夠清楚理解自己的投資績效，並透過 AI 智能分析獲得個人化的投資建議。

## 🎯 核心功能

- **保單總覽** - 一目了然的投資組合概況與 KPI 指標
- **績效分析** - 詳細的基金績效圖表與資產配置視覺化
- **AI 智能推薦** - 依據風險屬性提供個人化投資建議
- **互動式設計** - 流暢的動畫與響應式介面

## 🏗️ 技術架構

- **前端框架**: React 18 + TypeScript + Vite
- **UI 樣式**: Tailwind CSS
- **圖表視覺化**: Recharts
- **圖示**: Lucide React
- **動畫**: Framer Motion
- **路由**: React Router DOM

## 🚀 快速開始

### 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 啟動開發伺服器

\`\`\`bash
npm run dev
\`\`\`

專案會在 `http://localhost:5173` 啟動

### 建置專案

\`\`\`bash
npm run build
\`\`\`

### 預覽建置結果

\`\`\`bash
npm run preview
\`\`\`

## 📂 專案結構

\`\`\`
src/
├── components/          # 可重用元件
│   ├── Navbar.tsx      # 導覽列
│   ├── KPICard.tsx     # KPI 指標卡片
│   └── PolicyCard.tsx  # 保單卡片
├── pages/              # 頁面組件
│   ├── Login.tsx       # 登入頁
│   ├── Home.tsx        # 保單總覽頁
│   ├── PolicyDetail.tsx # 保單詳情頁
│   ├── Recommend.tsx   # AI 智能推薦頁
│   └── EmptyState.tsx  # 空狀態頁
├── data/               # 模擬數據
│   ├── mockPolicies.ts # 保單與基金績效資料
│   └── mockRecommend.ts # 推薦結果資料
├── App.tsx             # 路由設定
├── main.tsx            # 應用進入點
└── index.css           # 全域樣式
\`\`\`

## 🎨 設計風格

遵循 BNP Paribas Cardif 品牌形象：

- **主色調**: BNP 綠色系 (#3B8D68)
- **設計理念**: 穩重、專業、透明化
- **視覺特色**: 柔和陰影、圓角設計、流暢動畫

## 💡 使用說明

1. **登入頁面**: 輸入任意帳號密碼即可進入（Prototype 展示用）
2. **首頁**: 查看所有投資型保單的總覽與 KPI
3. **保單詳情**: 點擊任一保單可查看詳細績效分析
4. **AI 推薦**: 完成簡易問卷即可獲得個人化投資建議
5. **空狀態**: 展示無保單時的引導介面

## 📊 模擬數據

專案包含 3 張模擬保單：
- 安心成長投資型保單（積極型）
- 穩健收益投資型保單（保守型）
- 積極增長投資型保單（成長型）

每張保單都包含：
- NAV 歷史走勢
- 資產配置比例
- 收益貢獻分析
- 與基準指數比較

## 🚢 部署建議

本專案可部署至：
- Vercel
- Netlify
- GitHub Pages

由於是純前端專案，無需後端支援即可運行。

## 📝 開發筆記

這是一個 **Prototype（概念展示）** 專案，主要目的是：
- 展示前台介面設計概念
- 說明資料視覺化呈現方式
- 驗證使用者互動流程
- 提供客戶 Demo 使用

## 📄 授權

本專案為 BNP Paribas Cardif 內部展示用途。

---

**一句話總結**：SmartFund 不是重做投資系統，而是把後台資料前台化，用設計與互動讓保戶「看得懂、看得到」。
