export const AI_PROMPT_TEMPLATES = [
  {
    id: 'glass-card',
    category: '現代 UI 元件',
    title: '炫彩深色玻璃擬態卡片 (Glassmorphism)',
    description: '具備磨砂玻璃、細微邊框高光與懸停微浮空動態',
    prompt: `請使用 HTML 與 Tailwind CSS 4，幫我設計一個極具現代科技感的「社團成果展展示卡片」：
1. 視覺風格：深色模式 (Dark Mode)，背景採用深藍灰色半透明搭配 backdrop-blur-md 磨砂玻璃效果，邊框帶有 1px 的極淡白色光澤。
2. 排版：使用 Flexbox 垂直排列，上方是帶圓角的高清圖片容器，中段是發光漸層標籤與大標題，底部是按讚數與「查看詳情」按鈕。
3. 動態效果：設定 hover:-translate-y-2 與 shadow-2xl，並加入 transition duration-300 ease-in-out，確保滑鼠懸停時絲滑上浮。
4. 約束條件：嚴禁使用外部自訂 CSS 檔案，100% 使用 Tailwind 內建原子類別；請使用 GPU 硬體加速屬性 (transform / opacity)。`
  },
  {
    id: 'spinner-bounce',
    category: '動態與動畫',
    title: '流暢載入動畫與結帳成功彈跳',
    description: '純 CSS @keyframes，無外部 JS 依賴，60fps 絲滑運作',
    prompt: `請使用純 CSS 與 @keyframes，幫我製作一個電商結帳成功的綠色勾勾彈出並微幅放大再回彈的彈跳動畫 (Bounce Success)：
1. 結構：使用一個正圓形容器包覆 SVG 打勾圖示。
2. 動畫軌跡：0% 時 scale(0) 且透明度 0；70% 時放大至 scale(1.15) 帶有彈性張力；100% 時平滑回穩至 scale(1)。
3. 約束條件：嚴禁使用外部 JavaScript 動畫庫，純寫 CSS @keyframes；僅使用 transform 與 opacity 屬性以保證手機端 60fps 不掉幀。`
  },
  {
    id: 'rwd-grid',
    category: '響應式佈局',
    title: '跨螢幕 Mobile-First 電商商品牆',
    description: '手機單欄、平板雙欄、桌機四欄自適應彈性佈局',
    prompt: `請使用 HTML 與 Tailwind CSS 4，幫我製作一個電商商品卡片網格（Mobile-First 響應式佈局）：
1. 佈局規格：手機端 (<640px) 顯示為單欄全寬 (w-full)；平板 (md: 768px) 切換為雙欄 (grid-cols-2)；一般桌面 (lg: 1024px) 自動自適應為四欄 (grid-cols-4)。
2. 間距：元件之間使用 gap-6 保持呼吸留白。
3. 容器約束：在桌面版加上 max-w-7xl mx-auto px-4 防止寬螢幕內容過度拉伸。
4. 請務必確認 HTML <head> 內包含 viewport meta 標籤宣告。`
  }
];
