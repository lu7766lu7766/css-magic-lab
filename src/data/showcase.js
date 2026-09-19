export const SHOWCASES = [
  {
    id: 'water-drop',
    title: '純 CSS 晶瑩水滴 (Water Drop)',
    author: '經典 Web 實驗作品',
    link: 'https://jsbin.com/mevusebepe/edit',
    icon: 'Droplet',
    badge: '幾何與光影藝術',
    description: '不用任何圖片，純靠 CSS 的八角非對稱圓弧與多重內外陰影疊加，在平面螢幕上雕琢出具有 3D 折射感的液體水滴！',
    techniques: [
      '非對稱圓角：border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% 塑造有機流體曲面',
      '雙層陰影：inset 內陰影（光線穿透水滴的內部折射）加上 drop 外陰影（在桌面的柔和擴散投影）',
      '偽元素高光：用 ::after 繪製水滴頂部的細小白斑，呈現光源反光'
    ],
    previewGradient: 'from-sky-500/20 to-blue-600/30'
  },
  {
    id: 'iphone-6',
    title: '純 CSS 刻出 iPhone 6 實體機身',
    author: 'CodePen 神作 (@_fbrz)',
    link: 'https://codepen.io/_fbrz/pen/poYgWz',
    icon: 'Smartphone',
    badge: '工業設計工藝',
    description: '驚豔全球前端開發者的純代碼工業建模！利用線性漸層的金屬反光、雙層倒角陰影刻劃出 Home 鍵與鋁合金邊框，肉眼難辨真假。',
    techniques: [
      '陽極氧化鋁質感：多段微幅漸層 linear-gradient 模擬金屬倒角受光面',
      'Touch ID 指紋環：border 搭配內凹 inset box-shadow 呈現真實立體凹陷',
      '精密幾何拼接：純粹靠數十個 HTML 標籤與 position: absolute 像素級拼合'
    ],
    previewGradient: 'from-slate-700/30 to-zinc-900/40'
  },
  {
    id: 'mario-resume',
    title: 'Mario 橫向卷軸互動遊戲履歷',
    author: 'Robby Leonardi',
    link: 'http://www.rleonardi.com/interactive-resume/',
    icon: 'Gamepad2',
    badge: '互動敘事典範',
    description: '將平淡無奇的求職履歷變身為經典冒險闖關遊戲！向下滾動網頁時，主角向右奔跑跳躍，技能化身為金幣等級條，被譽為全球最具創意履歷。',
    techniques: [
      '視差滾動 (Parallax)：前景與遠處背景山脈以不同位移速度滾動，營造身歷其境的深度景深',
      'CSS Transform 座標聯動：隨捲軸百分比計算主角與道具的 X/Y 位移與動作幀切換',
      '遊戲化資訊架構：以生動視覺取代文字條列，將程式技能直觀轉換為能量槽'
    ],
    previewGradient: 'from-amber-500/20 to-orange-600/30'
  },
  {
    id: 'vector-portrait',
    title: '純 CSS 寫實向量肖像畫',
    author: 'Ivor Hewitt (ivorjetski)',
    link: 'https://codepen.io/ivorjetski/pen/dBYWWZ',
    icon: 'Palette',
    badge: '代碼畫筆極限',
    description: '完全沒有載入任何 JPG/PNG 圖檔，也沒有使用 Canvas 或 SVG！100% 透過 HTML 結構與 CSS 屬性刻劃出人物神韻與皮膚光澤。',
    techniques: [
      'clip-path 多邊形裁切：精密勾勒眼球輪廓、髮絲曲線與五官幾何形狀',
      '無數疊加陰影：運用數十組 box-shadow 與模糊擴散，細膩雕琢面部肌肉明暗面',
      '給學生的啟發：學會 CSS 基礎屬性就等於拿到數位畫筆，掌握細節更能精準指揮 AI 繪圖'
    ],
    previewGradient: 'from-purple-500/20 to-pink-600/30'
  }
];
