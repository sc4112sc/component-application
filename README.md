# 🖥 元件庫解碼器 Web (Component Library Decoder)

這是一個以 **Vue 3 + TypeScript + Vite** 為基礎構建的前端應用程式。專案的核心功能為一個具有強烈 **Cyberpunk (賽博龐克) 風格** 的「元件庫解碼器 (Component Decoder)」。透過亂碼跳動的視覺特效，隨機展示並實例化私有元件庫 `SElement` 中的各式 UI 元件。

---

## 🌟 核心功能詳細說明 (Detailed Features)

### 1. 🎰 元件庫展示輪盤 (Component Decoder Roulette)
*   **視覺化解碼特效**：這是本專案的亮點功能 (`RouletteView.vue`)。當使用者點擊「INITIATE DECODE」按鈕時，系統會啟動模擬破解的特效，螢幕上會快速閃爍隨機字元 (Glitch Text)。
*   **動態元件實例化**：解碼完成後，系統會從預先設定的元件清單（包含 `tButton`, `tInput`, `tModal`, `tTree`, `tTransfer` 等近 20 種元件）中隨機抽取一個。利用 Vue 的動態元件 `<component :is="...">` 語法，將抽取到的元件即時渲染在畫面上。
*   **互動式展示 (Interactive Demo)**：渲染出的元件不僅僅是靜態圖片，而是具備完整互動能力的真實元件。系統透過 `getComponentProps` 函式，動態綁定各元件所需的 `v-model` 與事件監聽器，讓使用者可以直接在解碼結果中測試元件的操作回饋（例如：輸入文字、切換 Switch、開啟 Modal 等）。

### 2. 🌃 Cyberpunk 視覺風格 (Cyberpunk UI)
*   **科幻駭客主題**：採用深色背景搭配動態發光網格與掃描線，打造沉浸式的科技終端機氛圍。
*   **酷炫視覺特效**：標題與按鈕加入了會隨機閃爍、錯位的「故障藝術 (Glitch)」動畫，增添未來感。
*   **深色模式完美融合**：直接呼叫元件庫的深色模式 API (`setDarkMode`)，讓所有抽出的 UI 元件都能無縫融入黑底的科技風格中。

### 3. 🗺 動態路由擴充整合 (Dynamic Route Integration)
*   **外部路由注入**：在 `router/index.ts` 中，除了定義專案自身的基礎路由 (`/`, `/roulette`, `/about`) 外，還將私有元件庫 `SElement` 中內建的展示路由無縫整合進當前專案中。

---

## 🛠 技術與套件詳細說明 (Detailed Tech Stack)

### 前端核心框架與建置
*   **[Vue 3 (v3.5.12)](https://vuejs.org/)**：採用最新的 Composition API 與 `<script setup>` 語法糖，將狀態邏輯集中管理，大幅提升了程式碼的可讀性與元件的重用性。
*   **[TypeScript (v5.6.2)](https://www.typescriptlang.org/)**：為整個專案提供嚴格的靜態型別檢查。例如定義了 `ComponentItem` 介面，確保元件清單中的每一個項目都具備正確的名稱、組件實體、顏色與路由設定，減少 Runtime 錯誤。
*   **[Vite (v5.4.10)](https://vitejs.dev/)**：取代傳統 Webpack 的次世代前端建置工具。利用原生 ES 模組提供極速的冷啟動與模組熱更新 (HMR)，大幅優化開發體驗。

### 狀態管理與路由
*   **[Vue Router (v4.6.3)](https://router.vuejs.org/)**：官方路由管理器。負責處理 SPA (單頁面應用程式) 的頁面跳轉、歷史紀錄管理，以及外部元件庫路由模組的掛載。
*   **[Pinia (v2.1.4)](https://pinia.vuejs.org/)**：新一代的 Vue 狀態管理庫。相比 Vuex，它捨棄了複雜的 Mutations，提供更直觀的 Store 定義方式與完美的 TypeScript 推斷支援。

### 私有元件庫整合
*   **SElement**：透過 Git URL (`git+https://.../sc4112sc/element.git`) 引入的私有企業級 UI 元件庫。本專案作為該元件庫的「展示與測試平台」，深度調用了其內部封裝的 `tButton`, `tSelect`, `tTabs` 等元件。

### 樣式與代碼品質管控
*   **[Tailwind CSS (v4.1.17)](https://tailwindcss.com/)**：實用優先 (Utility-first) 的 CSS 框架。允許開發者直接在 HTML/Vue 模板中透過 class 名稱快速構建自定義佈局，無需頻繁切換至 CSS 檔案。
*   **ESLint & Stylelint**：配置了嚴格的代碼審查機制（包含 `@typescript-eslint`, `eslint-plugin-vue`, `stylelint-config-standard` 等），確保團隊開發時的 JavaScript/TypeScript 與 CSS/Vue 單一檔案元件樣式風格高度一致。

---

## 🏗 專案架構與檔案層級 (Architecture & Directory Structure)

```text
src/
├── main.ts               # 應用程式進入點：初始化 Vue 實體，掛載 Pinia、Router，引入全局樣式與 Icon Font。
├── App.vue               # 根元件：設定全局深色模式，提供 Cyberpunk 背景、返回按鈕以及 RouterView 渲染出口。
├── vite-env.d.ts         # Vite 與 TypeScript 的環境宣告檔，提供 import.meta.env 的型別支援。
├── style.css             # 全局樣式檔：包含 Tailwind CSS 的基礎注入與重置樣式。
│
├── assets/               # 靜態資源目錄
│   └── iconFont/         # 自定義字體圖標 (Fontello) 的 CSS 與字型檔。
│
├── components/           # 共用元件目錄 (Shared Components)
│   └── HelloWorld.vue    # 基礎測試用組件。
│
├── views/                # 頁面級視圖目錄 (Pages/Views)
│   ├── RouletteView.vue  # 【核心功能頁面】Cyberpunk 元件解碼器，包含亂碼動畫邏輯與 SElement 動態渲染。
│   ├── HomeView.vue      # 首頁視圖預設進入點 (目前導向 RouletteView)。
│   └── AboutView.vue     # 關於頁面視圖。
│
├── router/               # 路由設定目錄
│   └── index.ts          # 初始化 Vue Router，定義內部路徑映射，並使用展開運算子注入 SElement 的路由配置。
│
└── stores/               # 狀態管理目錄 (Pinia Stores)
    └── (Pinia modules)   # 用於存放全局共用的狀態變數與業務邏輯。
```
