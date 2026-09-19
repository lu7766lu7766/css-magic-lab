export const MISSIONS = [
  {
    id: 'mission-1',
    number: 1,
    title: '任務一：拯救炸裂的社團公告海報',
    lessonTag: 'Part 1: 01~04 選擇器、單位與盒模型',
    subtitle: '解剖洋蔥盒模型，終結 Padding 與 Border 撐爆版面的惡夢',
    badge: '盒模型架構師',
    scenario: '校園資訊社要印製成果發表海報，社長在 CSS 裡加了 36px 的內留白 (padding) 和 6px 的金屬邊框，結果海報整張炸開、文字掉到畫面外！而且標題顏色被全域 p 標籤樣式死死壓住。請幫他使用 box-sizing 神器修復海報，並提升選擇器權重！',
    learningObjectives: [
      '理解 content-box 與 border-box 的根本計算差異',
      '學會盒模型四層空間：Margin（外距）、Border（邊框）、Padding（留白）、Content（內容）',
      '實踐 Specificity 選擇器權重天梯（Tag 1 分 vs Class 10 分 vs ID 100 分）',
      '掌握相對字級單位 rem 的穩定性'
    ],
    initialState: {
      boxSizing: 'content-box',
      padding: 36,
      borderWidth: 6,
      margin: 24,
      selectorType: 'tag', // tag | class | id
      fontSizeRem: 1.25,
      contentWidth: 280
    },
    targetState: {
      boxSizing: 'border-box',
      paddingMin: 16,
      paddingMax: 28,
      borderWidth: 2,
      selectorType: ['class', 'id']
    },
    hints: [
      '傳統 content-box 預設會把 padding 和 border 外加到 width 上，導致實際寬度變成 280 + 36*2 + 6*2 = 364px 破版！',
      '宣告 box-sizing: border-box; 會讓寬度死死鎖定在 280px，由瀏覽器自動向內收縮內容。',
      '若使用標籤選擇器 (p)，權重只有 1 分；改成類別選擇器 (.poster-title) 權重提升為 10 分，立即覆蓋全域預設顏色！'
    ],
    checklist: [
      { id: 'c1', label: '將 box-sizing 切換為 border-box', check: (s) => s.boxSizing === 'border-box' },
      { id: 'c2', label: '將內留白 (Padding) 調校至舒適範圍 (16px ~ 28px)', check: (s) => s.padding >= 16 && s.padding <= 28 },
      { id: 'c3', label: '將邊框寬度 (Border) 精緻化 (1px ~ 3px)', check: (s) => s.borderWidth >= 1 && s.borderWidth <= 3 },
      { id: 'c4', label: '使用類別 (.class) 或 ID (#id) 提升標題選擇器優先級', check: (s) => s.selectorType === 'class' || s.selectorType === 'id' }
    ]
  },
  {
    id: 'mission-2',
    number: 2,
    title: '任務二：打造炫彩流光按鈕與旋轉載入圈',
    lessonTag: 'Part 1: 05~06 視覺樣式與動態動畫',
    subtitle: '掌握漸層、陰影、Transition 平滑轉場與 @keyframes 自主旋轉',
    badge: '動態視覺魔法師',
    scenario: '社團報名頁面的按鈕生硬直角、點擊也沒有反饋感。請運用 135deg 炫彩漸層、精緻圓角與外擴懸浮陰影，加上 hover: translateY(-4px) 絲滑微動態；並在送出時啟動純 CSS 的 @keyframes 旋轉載入圈！',
    learningObjectives: [
      '熟練 linear-gradient 角度與多色彩配置',
      '掌握 border-radius 膠囊圓角與 box-shadow 浮空層次',
      '區分 Transition（互動單次平滑過渡）與 @keyframes（自主循環多階段動畫）',
      '運用 GPU 加速屬性 (transform, opacity) 確保絲滑 60fps'
    ],
    initialState: {
      gradientAngle: 135,
      colorFrom: '#6366f1',
      colorTo: '#ec4899',
      borderRadius: 4,
      shadowY: 2,
      shadowBlur: 4,
      hoverTranslateY: 0,
      transitionDuration: 0.1,
      isSpinning: false,
      spinnerSpeed: 1.0,
      spinnerColor: '#38bdf8'
    },
    hints: [
      '陰影 (box-shadow) 的 Y 軸向下位移 (如 10px) 搭配較大模糊度 (20px) 能營造元件懸浮於空中的立體景深感。',
      'Transition 是被動由滑鼠 hover 觸發的起點到終點轉場；而 Spinner 旋轉則是透過 @keyframes spin 自主 0% 到 100% 無限循環！'
    ],
    checklist: [
      { id: 'c1', label: '圓角 (border-radius) 設定在 12px 以上或膠囊圓角', check: (s) => s.borderRadius >= 12 },
      { id: 'c2', label: '立體陰影模糊半徑 (blur) 設定在 15px 以上營造浮空感', check: (s) => s.shadowBlur >= 15 },
      { id: 'c3', label: 'Hover 上浮位移設為 -4px 或更顯著', check: (s) => s.hoverTranslateY <= -4 },
      { id: 'c4', label: '平滑轉場時長 (transition-duration) 設為 0.3s ~ 0.5s', check: (s) => s.transitionDuration >= 0.25 && s.transitionDuration <= 0.6 },
      { id: 'c5', label: '啟動純 CSS @keyframes spin 旋轉載入圈', check: (s) => s.isSpinning === true }
    ]
  },
  {
    id: 'mission-3',
    number: 3,
    title: '任務三：跨螢幕響應式商品卡片流',
    lessonTag: 'Part 2: 07~09 Viewport、RWD 媒體查詢與 Flexbox',
    subtitle: '告別 Float 浮動，一鍵掌握主軸、交叉軸、gap 與跨裝置自適應',
    badge: '響應式切版大師',
    scenario: '社團文創周邊商品在桌機上橫排很美，但到了手機螢幕卻字體縮小或擠壓變形！請在父層啟動 Flexbox 彈性排版，開啟 flex-wrap 自動折行，設定現代 gap 呼吸間距，並在模擬手機 (390px) 與桌機 (1024px) 視窗間流暢自適應！',
    learningObjectives: [
      '理解 Viewport meta 標籤如何防止手機縮放螞蟻字',
      '掌握 Flexbox 主軸 (justify-content) 與交叉軸 (align-items) 置中心法',
      '運用 flex-wrap: wrap 解決手機版排版擠壓破版',
      '用現代 gap 屬性徹底取代傳統 margin 負邊距噩夢'
    ],
    initialState: {
      display: 'block',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 0,
      viewportWidth: 1024,
      mobileColumns: 1,
      desktopColumns: 4
    },
    hints: [
      '如果沒有設定 flex-wrap: wrap，Flex 容器會把所有卡片死死硬塞在一行，導致在窄螢幕上縮成扁條！',
      'gap: 16px 可以在子項目之間產生等距呼吸感，且最外側不會多出難看的邊界留白。'
    ],
    checklist: [
      { id: 'c1', label: '父容器啟用 display: flex 彈性排版', check: (s) => s.display === 'flex' },
      { id: 'c2', label: '啟用 flex-wrap: wrap 允許在空間不足時自動折行', check: (s) => s.flexWrap === 'wrap' },
      { id: 'c3', label: '設定元件呼吸間距 gap 為 16px 或以上', check: (s) => s.gap >= 16 },
      { id: 'c4', label: '主軸對齊 (justify-content) 設為 center 或 space-between', check: (s) => s.justifyContent === 'center' || s.justifyContent === 'space-between' || s.justifyContent === 'space-around' },
      { id: 'c5', label: '在手機視窗 (390px) 測試自動收合為單欄 (100%)', check: (s) => s.viewportWidth <= 640 }
    ]
  },
  {
    id: 'mission-4',
    number: 4,
    title: '任務四：Tailwind 4 原子化重構與 AI 提示詞詠唱',
    lessonTag: 'Part 2: 11 Tailwind CSS 4 現代革命與 AI 工作流',
    subtitle: 'Utility-First 效率革命：從手寫 20 行 CSS 到直接組合微型積木',
    badge: 'AI 世代前端先鋒',
    scenario: '傳統 CSS 需要在 HTML 與 style.css 兩個檔案間瘋狂跳轉，還要想幾十個 class 命名！現在請體驗全球前端與 AI 時代狂熱追捧的 Tailwind CSS 4：直接在 HTML 組合原子化 class，並使用專業 Prompt 指令讓 AI 生成精準 UI！',
    learningObjectives: [
      '體驗 Utility-First 原子化設計與零設定檔 (Zero-Config) 哲學',
      '掌握常用原子 class：flex, p-6, rounded-2xl, bg-slate-900/80, shadow-xl',
      '理解為什麼 AI 時代天生絕配 Tailwind（零 context 遺失、無全域污染）',
      '學會向 AI 下指令的「黃金提示詞結構（結構 + 樣式 + 約束條件 + GPU 加速）」'
    ],
    initialState: {
      selectedClasses: ['p-4', 'rounded-lg', 'bg-slate-800'],
      aiPromptCopied: false,
      activeAiPreset: 'card'
    },
    hints: [
      'Tailwind 4 採用全 Rust 編寫的 Oxide 引擎，速度提升 10 倍以上，且只要一行 @import "tailwindcss" 即可開箱即用！',
      '向 AI 提問時，加上「使用 Tailwind CSS 與 GPU 加速屬性 (transform / opacity)」能產出最乾淨且高效的程式碼！'
    ],
    checklist: [
      { id: 'c1', label: '加入至少 5 個 Tailwind 原子類別（如 flex, p-6, rounded-2xl 等）', check: (s) => s.selectedClasses.length >= 5 },
      { id: 'c2', label: '包含深色磨砂背景或漸層色類別', check: (s) => s.selectedClasses.some(c => c.includes('bg-') || c.includes('backdrop-')) },
      { id: 'c3', label: '包含互動轉場類別（如 hover: 或 transition）', check: (s) => s.selectedClasses.some(c => c.includes('hover:') || c.includes('transition')) },
      { id: 'c4', label: '檢視並複製一組黃金 AI 提示詞模板', check: (s) => s.aiPromptCopied }
    ]
  },
  {
    id: 'mission-5',
    number: 5,
    title: '任務五：精準鎖定！浮動通知徽章與 Sticky 導航吸頂',
    lessonTag: 'Part 2: 10 現代定位佈局與層疊上下文 (Stacking Context)',
    subtitle: '掌握 static, relative, absolute, sticky 錨點聯動與 z-index 秩序',
    badge: '空間定位大師',
    scenario: '社團官方商城的通知中心圖示需要釘上一顆亮紅色未讀訊息徽章 (Badge)，但之前直接寫 absolute 卻飛到螢幕左上角天邊！同時下方的分類導航在長頁面滾動時需要優雅吸頂 (sticky)。請幫忙設定 relative 錨點父層、將徽章精準懸浮在右上角，並提升 z-index 防止被輪播圖遮蔽！',
    learningObjectives: [
      '理解 position 五大模式：static (預設無效)、relative (原位相對與錨點)、absolute (脫離文檔流尋找非 static 祖先)、fixed (視窗鎖定)、sticky (滾動吸頂)',
      '掌握「子絕父相」經典鐵律：子層 position: absolute 必須仰賴父層 position: relative 作為定位座標系',
      '學會四向偏移屬性 (top, right, bottom, left) 與微調定位',
      '掌握 z-index 層疊上下文與堆疊順序，避免圖層遮擋'
    ],
    initialState: {
      parentPosition: 'static', // static | relative
      badgePosition: 'static', // static | absolute
      badgeTop: -25,
      badgeRight: -25,
      badgeZIndex: 1,
      stickyEnabled: false,
      stickyTop: 0
    },
    hints: [
      '若父容器維持 position: static，子元素的 position: absolute 會一路往上尋找，最後相對於整個瀏覽器視窗 (html/body) 定位，導致徽章飛走！',
      '將父層設為 position: relative 即可將座標原點 (0, 0) 錨定在父卡片右上邊角。',
      '設定 z-index: 10 或更高，能確保未讀紅點永遠浮在圖片與文字內容的最上層！'
    ],
    checklist: [
      { id: 'c1', label: '將父容器定位設為 relative 建立座標錨點', check: (s) => s.parentPosition === 'relative' },
      { id: 'c2', label: '將通知紅點徽章設為 absolute 脫離正常文檔流', check: (s) => s.badgePosition === 'absolute' },
      { id: 'c3', label: '調校 top 與 right 將徽章精準定點於右上角 (-12px ~ 6px)', check: (s) => s.badgeTop >= -15 && s.badgeTop <= 8 && s.badgeRight >= -15 && s.badgeRight <= 8 },
      { id: 'c4', label: '設定 z-index 為 10 或以上確保層級不被覆蓋', check: (s) => s.badgeZIndex >= 10 },
      { id: 'c5', label: '啟用導航列 position: sticky 滾動吸頂效果', check: (s) => s.stickyEnabled === true }
    ]
  },
  {
    id: 'mission-6',
    number: 6,
    title: '任務六：突破次元壁！3D 視差立體卡片與空間翻轉',
    lessonTag: 'Part 2: 12 現代 CSS 3D 空間與透視視差',
    subtitle: '玩轉 perspective 視距、3D 旋轉 rotateX/Y 與立體翻轉 (Card Flip)',
    badge: '次元空間架構師',
    scenario: '社團科技祭宣傳卡片太過扁平死板，無法吸引目光。請利用 CSS 3D 變形核心屬性：在外層加入 perspective 建立身歷其境的立體深度、啟動 transform-style: preserve-3d，透過 rotateX 與 rotateY 創造宛如真實卡片在空間中受光傾斜的立體視差，並打造 180 度翻轉體驗背後彩蛋資訊！',
    learningObjectives: [
      '理解 perspective 視距（如 800px）如何營造「近大遠小」的真實 3D 景深',
      '掌握 3D 軸向旋轉：rotateX (上下翻轉)、rotateY (左右翻轉)、translateZ (深度懸浮)',
      '運用 transform-style: preserve-3d 讓子元素繼承 3D 空間，避免被扁平化拍扁',
      '學會 backface-visibility: hidden 實現正反雙面卡片無縫翻轉'
    ],
    initialState: {
      perspective: 0, // 0 means none, range 400 ~ 1200
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      preserve3d: false,
      isFlipped: false
    },
    hints: [
      '父層沒有設定 perspective 時，rotateX 與 rotateY 只會看起來像壓扁的 2D 矩形；加入 perspective: 800px 即可瞬間建立立體景深！',
      '若要製作雙面翻轉卡片，容器必須加上 transform-style: preserve-3d，並且正反面都設定 backface-visibility: hidden！'
    ],
    checklist: [
      { id: 'c1', label: '在外層容器設定透視深度 perspective (600px ~ 1200px)', check: (s) => s.perspective >= 600 && s.perspective <= 1200 },
      { id: 'c2', label: '啟用 transform-style: preserve-3d 維持三維立體空間', check: (s) => s.preserve3d === true },
      { id: 'c3', label: '調整 rotateX 或 rotateY 產生至少 12 度的 3D 傾角', check: (s) => Math.abs(s.rotateX) >= 12 || Math.abs(s.rotateY) >= 12 },
      { id: 'c4', label: '增加 translateZ 深度位移 (20px 以上) 創造圖層懸浮感', check: (s) => s.translateZ >= 20 },
      { id: 'c5', label: '觸發 180 度卡片翻轉體驗背後彩蛋資訊', check: (s) => s.isFlipped === true }
    ]
  },
  {
    id: 'mission-7',
    number: 7,
    title: '任務七：光速脈衝！@keyframes 關鍵影格與滾動指示器',
    lessonTag: 'Part 2: 13 進階 CSS 動態與滾動驅動體驗',
    subtitle: '多階段關鍵影格編程、animation 複合屬性與現代閱讀進度條',
    badge: '動態特效工程師',
    scenario: '年度專案發表會的官網需要一組頂級的視覺動態：一顆具有呼吸脈衝光環 (Pulse Glow) 的能量核心反應爐，以及隨使用者閱讀進度動態拉伸的滾動指示進度條！請運用多階段 @keyframes (0% -> 50% -> 100%) 精雕細琢光影變化，並掌握 alternate 往返呼吸與計時函式！',
    learningObjectives: [
      '熟練 @keyframes 多百分比影格節點 (0%, 50%, 100%) 的連續狀態變化',
      '掌握 animation 簡寫語法：名稱、時長、計時函式、次數與方向 (alternate)',
      '運用 box-shadow 多重發光擴散與 transform scale 營造有機呼吸節奏',
      '理解現代滾動驅動動畫 (Scroll-driven animations) 與寬度百分比的聯動原理'
    ],
    initialState: {
      glowSpread: 6,
      glowColor: '#38bdf8',
      animationDuration: 1.0,
      timingFunction: 'linear', // linear | ease | ease-in-out
      animationDirection: 'normal', // normal | alternate
      scrollProgress: 20
    },
    hints: [
      '將 animation-direction 設為 alternate，瀏覽器會在 0% -> 100% 播完後自動反向倒播，創造最自然的平滑呼吸！',
      '多重 box-shadow 如 0 0 25px rgba(56, 189, 248, 0.7)，能發出如同霓虹燈般的能量光暈！'
    ],
    checklist: [
      { id: 'c1', label: '設定發光擴散半徑 (glow spread) 達到 18px 以上', check: (s) => s.glowSpread >= 18 },
      { id: 'c2', label: '計時函式選用 ease-in-out 或 ease 平滑過渡', check: (s) => s.timingFunction === 'ease-in-out' || s.timingFunction === 'ease' },
      { id: 'c3', label: '循環方向設為 alternate (交替往返平滑呼吸)', check: (s) => s.animationDirection === 'alternate' },
      { id: 'c4', label: '將動態週期調校為舒適節奏 (1.4s ~ 2.8s)', check: (s) => s.animationDuration >= 1.4 && s.animationDuration <= 2.8 },
      { id: 'c5', label: '拉動模擬滾動進度條達到 80% 以上', check: (s) => s.scrollProgress >= 80 }
    ]
  }
];
