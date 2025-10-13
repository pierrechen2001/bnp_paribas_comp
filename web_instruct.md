
# 🌐 SmartFund 前端 Prototype 製作說明文件

## 📘 專案簡介
本專案為 **SmartFund 智能基金追蹤與推薦平台** Prototype。  
目標：在不需後端的情況下，於前端模擬展示完整概念流程與互動邏輯。

---

## 🏗️ 技術架構 (Tech Stack)

| 層級 | 技術 | 說明 |
|------|------|------|
| 前端框架 | **React + TypeScript + Vite** | 快速開發與良好型別控制 |
| UI 樣式 | **Tailwind CSS** | 輕量級風格控制、支援 RWD |
| 圖表視覺化 | **Recharts** | 用於折線圖、圓餅圖、雷達圖與瀑布圖 |
| 圖示 | **Lucide React** | 用於頁面導覽與 KPI 指標圖示 |
| 動畫 | **Framer Motion** | 提升互動體驗與流暢感 |
| 資料模擬 | **JSON / mock data** | 用虛擬基金資料與績效數據展示互動邏輯 |
| 專案管理 | **Cursor IDE** | AI 輔助編碼、可快速生成元件與樣式 |

---

## 📂 專案結構建議

src/
├── assets/              # icon、圖片、顏色常數
├── components/          # 可重用元件 (Card, Chart, KPI, Navbar)
├── pages/
│   ├── Home.tsx         # 保單總覽頁
│   ├── PolicyDetail.tsx # 保單詳情頁
│   ├── Recommend.tsx    # AI 智能推薦頁
│   └── EmptyState.tsx   # 無投資型保單時的頁面
├── data/
│   ├── mockPolicies.ts  # 模擬保單與基金績效資料
│   ├── mockRecommend.ts # 模擬推薦結果
├── App.tsx              # 路由與主要結構
├── main.tsx             # 進入點
└── index.css            # Tailwind 基本設定

---

## 🖼️ 頁面設計與製作內容

### 0 登入頁
可由首頁忝專，並虛擬輸入帳號密碼驗證後，金到可以看到資料的客戶個人保單首頁

### 1️⃣ 首頁 (保單總覽頁 `/`)
**功能目標**：讓使用者快速了解投資型保單總覽。

**區塊說明**
- **Header**：「SmartFund 我的投資」標題列。
- **總覽卡片 KPI**
  - 目前總市值
  - 總收益
  - 與上次登入漲跌幅（紅/綠箭頭）
- **保單清單卡片**
  - 保單名稱
  - 投資金額、市值、報酬率
  - 點擊進入詳細頁 (`/policy/:id`)

**UI 要點**
- 使用 `Card` 元件，搭配柔和陰影與圓角。
- KPI 數字以 **Recharts TinyAreaChart** 顯示簡單趨勢線。

---

### 2️⃣ 保單詳情頁 (`/policy/:id`)
**功能目標**：展示投資績效、分布與收益貢獻。

**區塊設計**
1. **區間篩選器**
   - 可選「1週、1月、3月、6月、YTD、1年、3年、5年、自訂」
   - 以 `Dropdown` + `DatePicker` 模擬互動

2. **KPI 指標列**
   - 總市值、區間報酬率、同類平均比較
   - 使用圖示（上漲箭頭 / 下跌箭頭）

3. **基金績效折線圖**
   - 三條線：個人保單、同類平均、基準指數
   - `LineChart` with Tooltip + Legend

4. **資產配置圓餅圖**
   - 類別：股票 / 債券 / 貨幣市場 / 其他
   - 點擊展開次分類（例：股票 → 美股 / 台股）

5. **收益貢獻長條圖**
   - 顯示各大類對總收益貢獻度
   - 標示「最佳表現」與「最弱表現」

---

### 3️⃣ AI 智能推薦頁 (`/recommend`)
**功能目標**：依保戶屬性與風險層級提供建議。

**互動流程**
- 問卷區塊 (模擬 KYC)
  - 投資經驗、風險屬性、偏好資產
  - 使用簡易 `RadioGroup` 或 `Select`
- 分析結果呈現
  - 「您的風險屬性：平衡型」
  - 「建議組合：股票 50%、債券 40%、其他 10%」
- 視覺化對比圖
  - `RadarChart` 或 `BarChart` 比較「目前 vs 建議」
- 推薦理由文字區塊

**提示語**
> 您屬平衡型，近期債券市場回穩，建議增加配置比例以分散風險。

---

### 4️⃣ 空狀態頁 (`/empty`)
**用途**：無投資型保單的用戶導引畫面。

**內容**
- 插圖 + 文案：「您目前尚未持有任何投資型保單」
- CTA 按鈕：「瞭解投資型保單 →」導向產品頁

---

## 🎨 視覺概念與風格建議

| 元素 | 建議樣式 |
|------|------------|
| 按鈕 | 圓角 2xl、陰影柔和 |
| 背景 | 漸層灰白 (#f8f9fb → #ffffff) |
| 動畫 | 元件淡入 (`fade-in`)、圖表進場滑動 |
| 響應式 | 手機版維持單欄卡片式佈局 |

---

## 💡 開發建議

1. **模擬資料**
   - 使用 `data/mockPolicies.ts` 產生 3~5 張保單資料。
   - 每張含 NAV 曲線、報酬率、資產配置等假數據。

2. **導覽**
   - 使用 `react-router-dom` 實作 `/`, `/policy/:id`, `/recommend`, `/empty`。

3. **部署**
   - 可直接使用 Vite 預設打包，部署至 Vercel / Netlify。
   - 若需展示互動，可加入簡易登入畫面模擬。

---

## ✅ Prototype 最終目標
提供給客戶可互動操作的「概念展示網頁」，以說明：
- 後台資料如何前台化；
- 保戶如何理解績效；
- AI 如何提供建議。

---

> 一句話總結：  
> **SmartFund 不是重做投資系統，而是把後台資料前台化，用設計與互動讓保戶「看得懂、看得到」。**


# 🎨 SmartFund x BNP Paribas Cardif UI 風格規範

## 🏢 品牌調性
整體風格延續 **法國巴黎人壽 (BNP Paribas Cardif)** 的官方品牌形象：  
- 穩重、信任、專業  
- 主打「透明化、簡潔、永續感」的綠色金融品牌精神  
- 主色以 BNP 綠為核心，輔以白、灰形成乾淨的數位金融介面  

---

## 🌈 配色系統 (Color Palette)

| 類別 | 色碼 | 用途 |
|------|------|------|
| **主色 (Primary Green)** | `#3B8D68` | 品牌主色、按鈕主色、標題重點 |
| **輔色 (Accent Green)** | `#5BA87E` | 滑鼠 hover 狀態、圖表漸層起點 |
| **深綠 (Deep Forest)** | `#2A6E50` | Header、導覽列背景、強調區 |
| **品牌黑 (Cardif Black)** | `#2B2B2B` | Logo 主文案、主要文字 |
| **淺灰 (Light Gray)** | `#F5F6F7` | 背景區塊、卡片底色 |
| **中灰 (Neutral Gray)** | `#C8C9CA` | 分隔線、次要文字 |
| **白色 (Pure White)** | `#FFFFFF` | 背景底色、留白空間 |
| **提示紅 (Alert Red)** | `#C94A4A` | 負報酬、下跌箭頭 |
| **正報酬綠 (Profit Green)** | `#39A86B` | 正報酬、上漲箭頭 |

> 🎯 **應用原則**  
> - 綠色：代表穩定、成長、永續，作為品牌識別主軸。  
> - 白底 + 綠線條：體現保險金融的透明與安全感。  
> - 使用灰階分層資訊權重，減少壓力感。

---

## 🔤 字體系統 (Typography)

| 層級 | 字型 | 大小(px) | 權重 | 說明 |
|------|------|----------|------|------|
| 標題 H1 | Noto Sans TC / Inter | 28–32 | 700 | 頁面主標題 |
| 標題 H2 | Noto Sans TC / Inter | 22–24 | 600 | 模組區塊標題 |
| 內文 | Noto Sans TC / Inter | 16 | 400 | 一般說明文字 |
| 次要文字 | Noto Sans TC / Inter | 14 | 300 | 補充資訊、圖表標籤 |
| 數值文字 | Inter | 20–24 | 600 | KPI 或金額重點顯示 |

---

## 🧱 元件風格 (UI Components)

### 📊 KPI Card
- 背景：`#FFFFFF`
- 陰影：`rgba(0, 0, 0, 0.06)`、圓角 `16px`
- 圖示：使用 Lucide icon，綠色描邊
- 正值上漲箭頭：`#39A86B`
- 負值下跌箭頭：`#C94A4A`

### 🪶 按鈕 (Buttons)
| 類型 | 背景 | 文字 | 狀態 |
|------|------|------|------|
| 主按鈕 | `#3B8D68` | 白色 | Hover：`#2A6E50` |
| 次按鈕 | 白底 + 綠框線 | 綠色文字 | Hover：填滿 `#3B8D68` |

### 🗂️ 卡片 (Cards)
- 白底圓角 (`border-radius: 20px`)
- padding：`24px`
- 標題用深綠字體
- 底部使用淺灰分隔線 `#E0E2E3`

### 📈 圖表 (Charts)
- 主色線：`#3B8D68`
- 對照線：`#C8C9CA`
- 漸層綠：`linear-gradient(180deg, #5BA87E 0%, #E6F3ED 100%)`
- 座標軸字體：灰階 `#7B7B7B`

---

## 🧭 導覽列 (Navigation Bar)
- 背景色：`#3B8D68`
- 字體顏色：白色
- 字距略寬（0.05em），提升品牌專業感
- 高度建議：`72px`
- Logo 左對齊，功能選項右對齊
- hover 效果：白色半透明底 `rgba(255,255,255,0.15)`

---

## 💫 互動與動畫 (Motion)
- 按鈕 hover：輕微放大 1.02x、陰影加深
- 圖表進場：由下至上淡入（0.4s）
- 卡片滑入動畫：`fade + slide-in` (Framer Motion)
- 頁面轉場：`opacity + translateY(10px)` 動畫

---

## 🧩 Layout 與留白 (Spacing)
| 類型 | 建議間距 |
|------|------------|
| 區塊間距 | 48px |
| 元件間距 | 24px |
| 內文行距 | 1.6 |
| 卡片圓角 | 16px～20px |
| Icon 大小 | 20–32px |

---

## 🪄 建議使用語氣
在 SmartFund 介面中，延續巴黎人壽的品牌語氣：  
- 專業但親切，不過度行銷。  
- 用語清晰、避免金融術語堆疊。  
- 範例：  
  - ✅ 「您的投資表現穩定成長中。」  
  - ❌ 「您的基金報酬率表現優於市場！」  

---

## 📐 視覺示例：SmartFund 登入 Header
```html
<header class="bg-[#3B8D68] text-white flex justify-between items-center px-6 py-3">
  <div class="flex items-center space-x-3">
    <img src="/logo-bnp-cardif.svg" alt="BNP Paribas Cardif Logo" class="h-8" />
    <span class="text-lg font-semibold">SmartFund 我的投資</span>
  </div>
  <nav class="flex space-x-6">
    <a href="#" class="hover:underline">常用表單</a>
    <a href="#" class="hover:underline">企業徵才</a>
    <a href="#" class="hover:underline">常見問題</a>
    <a href="#" class="hover:underline">聯絡我們</a>
  </nav>
</header>