export const MISSIONS = [
  {
    id: 'mission-1',
    number: 1,
    title: '拯救 Windows 95 報名按鈕',
    subtitle: '解剖盒模型與光影：Padding、Border-Radius、Box-Shadow 與 Hover 上浮',
    client: {
      name: '小杰（電競社活動幹部）',
      avatar: '🎮',
      dialogue: '「學長救命！下週就是校際電競公開賽，我寫的報名送出按鈕被社員狂笑是 30 年前的老古董！灰底黑字、死硬直角，滑鼠移過去連個反應都沒有... 求求你幫它大改造！」'
    },
    learningFocus: [
      '用 padding 撐出大氣舒適的點擊區域（拒絕乾癟）',
      '用 border-radius 磨平銳利直角（現代膠囊質感）',
      '用 linear-gradient 賦予電競科技流光色相',
      '用 box-shadow 打造懸浮空中的景深立體感',
      '用 :hover translateY(-3px) 製造真實機械按鈕反饋'
    ],
    htmlTemplate: `<button class="action-btn">
  <span class="btn-icon">⚡</span>
  <span class="btn-text">立即報名校際爭霸賽</span>
</button>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
.action-btn {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #ffffff;
  padding: 14px 32px;
  border: none;
  border-radius: 9999px;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.5);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 30px -5px rgba(168, 85, 247, 0.6);
}`,
    targetInspector: {
      colors: [
        { label: '主漸層起點', hex: '#6366f1', role: 'bgColor' },
        { label: '流光漸層終點', hex: '#a855f7', role: 'gradientTo' },
        { label: '文字高對比', hex: '#ffffff', role: 'textColor' },
        { label: '立體陰影基色', hex: '#6366f1', role: 'shadowColor' }
      ],
      metrics: [
        { label: '邊角造型', value: '9999px (膠囊)' },
        { label: '內距留白', value: '14px 32px' },
        { label: '浮空陰影', value: '模糊 25px, 位移 10px' },
        { label: '邊框線條', value: '無邊框 (0px)' },
        { label: '懸停反饋', value: '上浮 -3px' }
      ],
      tip: '💡 現代電競按鈕講究圓潤膠囊與流光漸層，千萬別加上生硬黑色外框，那是 90 年代老產物！'
    },
    // 共 15 項工具：10 項核心必選 + 5 項干擾/陷阱項
    tools: [
      {
        id: 'borderRadius',
        name: '圓角大小 (Border Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 50,
        step: 2,
        hasCapsuleToggle: true,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 9999,
        targetRange: [16, 9999],
        isTrap: false,
        desc: '磨平直角，支援 9999px 膠囊快捷'
      },
      {
        id: 'paddingY',
        name: '上下內留白 (Padding Y)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 1,
        defaultValue: 4,
        cleanValue: 4,
        targetValue: 14,
        targetRange: [12, 18],
        isTrap: false,
        desc: '撐開按鈕垂直高度，告別乾癟'
      },
      {
        id: 'paddingX',
        name: '左右點擊寬度 (Padding X)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 50,
        step: 2,
        defaultValue: 10,
        cleanValue: 10,
        targetValue: 32,
        targetRange: [24, 38],
        isTrap: false,
        desc: '增加左右按鍵呼吸空間'
      },
      {
        id: 'bgColor',
        name: '主背景色 (Background Color)',
        type: 'color',
        defaultValue: '#cbd5e1',
        cleanValue: '#94a3b8',
        targetValue: '#6366f1',
        isTrap: false,
        desc: '挑選高質感科技主色'
      },
      {
        id: 'gradientToggle',
        name: '漸層流光模式 (Gradient)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        gradientTo: '#a855f7',
        isTrap: false,
        desc: '啟動 135deg 雙色漸層流光'
      },
      {
        id: 'gradientColor',
        name: '漸層流光副色 (Gradient To)',
        type: 'color',
        defaultValue: '#64748b',
        cleanValue: '#64748b',
        targetValue: '#a855f7',
        isTrap: false,
        desc: '漸層流光的第二色相'
      },
      {
        id: 'textColor',
        name: '文字色彩 (Text Color)',
        type: 'color',
        defaultValue: '#0f172a',
        cleanValue: '#0f172a',
        targetValue: '#ffffff',
        isTrap: false,
        desc: '高對比文字色彩'
      },
      {
        id: 'shadowBlur',
        name: '立體浮空陰影 (Box Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 25,
        targetRange: [15, 35],
        isTrap: false,
        desc: '模擬向下光照，營造懸浮景深'
      },
      {
        id: 'fontWeight',
        name: '文字粗細階層 (Font Weight)',
        type: 'select',
        options: [
          { label: '400 纖細', value: 400 },
          { label: '600 中等', value: 600 },
          { label: '700 大粗', value: 700 },
          { label: '800 特粗', value: 800 }
        ],
        defaultValue: 400,
        cleanValue: 400,
        targetValue: 700,
        isTrap: false,
        desc: '提升標題視覺權重與點擊吸引力'
      },
      {
        id: 'hoverY',
        name: '懸停微上浮 (Hover Translate)',
        type: 'slider',
        unit: 'px',
        min: -10,
        max: 0,
        step: 1,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: -3,
        targetRange: [-5, -2],
        isTrap: false,
        desc: '滑鼠懸停時上浮反饋，具備機械按壓感'
      },
      // === 5 項干擾/陷阱項 ===
      {
        id: 'borderHeavy',
        name: '粗黑外邊框 (Border) [陷阱項]',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 8,
        step: 1,
        defaultValue: 2,
        cleanValue: 3,
        targetValue: 0,
        targetRange: [0, 0],
        isTrap: true,
        desc: '⚠️ 現代電競膠囊不應加硬邊框！開啟會嚴重扣分！'
      },
      {
        id: 'textShadowTrap',
        name: '復古文字陰影 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 90年代刻痕凹凸字殘留，現代極簡不需要！'
      },
      {
        id: 'letterSpacingTrap',
        name: '超寬字母間距 [干擾項]',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 12,
        step: 1,
        defaultValue: 0,
        cleanValue: 6,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 文字間距過寬會分散眼球注意力'
      },
      {
        id: 'btnRotateTrap',
        name: '按鈕歪斜旋轉 [陷阱項]',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 8,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 按鈕歪斜會破壞規範排版！'
      },
      {
        id: 'grayscaleTrap',
        name: '灰階去色濾鏡 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 啟動會把美麗漸層瞬間變成死灰色！'
      }
    ]
  },
  {
    id: 'mission-2',
    number: 2,
    title: '修復社長的扁平窒息感名片',
    subtitle: '掌握卡片留白、圓形頭像裁切、文字字重階層與深色磨砂玻璃擬態',
    client: {
      name: '思妤（資訊學會社長）',
      avatar: '👩‍💼',
      dialogue: '「我們在迎新擺攤要發數位幹部名片，但你看現在這張——文字全擠在邊界上、頭像被壓成方扁方塊、字體粗細全部一樣！看起來像罰單而不是幹部名片... 救救社長的形象吧！」'
    },
    learningFocus: [
      '盒模型 padding：徹底終結文字與容器邊界的壓迫感',
      'border-radius: 50%：將大頭貼精確裁切為圓形',
      'font-weight 與 color 階層：區分姓名（大粗亮）與職稱說明（柔和次要）',
      'backdrop-filter 磨砂玻璃擬態：營造深邃現代高質感',
      'border-radius: 20px：卡片整體倒角收斂'
    ],
    htmlTemplate: `<div class="profile-card">
  <div class="card-header flex items-center gap-4">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" class="avatar-img" alt="社長頭像" />
    <div class="user-info">
      <h3 class="user-name">林思妤 Alice Lin</h3>
      <p class="user-role">第 12 屆資訊學會社長</p>
      <span class="user-bio text-[11px] text-slate-400 block mt-1">專精 Vue 3 與現代 UI 設計</span>
    </div>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
.profile-card {
  width: 320px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #38bdf8;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
}

.user-name {
  color: #f8fafc;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.user-role {
  color: #38bdf8;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}`,
    targetInspector: {
      colors: [
        { label: '深色背景', hex: '#0f172a', role: 'cardBg' },
        { label: '頭像天藍光環', hex: '#38bdf8', role: 'avatarRingColor' },
        { label: '大標題白高光', hex: '#f8fafc', role: 'userNameColor' },
        { label: '副職稱識別色', hex: '#38bdf8', role: 'userRoleColor' }
      ],
      metrics: [
        { label: '卡片留白', value: '28px' },
        { label: '頭像圓角', value: '50% (正圓)' },
        { label: '卡片圓角', value: '24px' },
        { label: '磨砂霧面', value: 'blur 16px' },
        { label: '外框粗細', value: '1px 淡白色' }
      ],
      tip: '💡 頭像一定要裁成正圓形（50%），搭配 28px 大留白才能終結窒息感！'
    },
    tools: [
      {
        id: 'cardPadding',
        name: '卡片內部留白 (Card Padding)',
        type: 'slider',
        unit: 'px',
        min: 4,
        max: 40,
        step: 2,
        defaultValue: 4,
        cleanValue: 4,
        targetValue: 28,
        targetRange: [22, 34],
        isTrap: false,
        desc: '充裕空間，徹底告別邊緣擠壓'
      },
      {
        id: 'avatarRadius',
        name: '大頭貼圓弧度 (Avatar Radius)',
        type: 'slider',
        unit: '%',
        min: 0,
        max: 50,
        step: 5,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 50,
        targetRange: [45, 50],
        isTrap: false,
        desc: '設為 50% 完美將頭像裁切為圓形'
      },
      {
        id: 'cardRadius',
        name: '卡片外框圓角 (Card Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 36,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 24,
        targetRange: [18, 30],
        isTrap: false,
        desc: '現代優雅大圓角'
      },
      {
        id: 'cardBg',
        name: '卡片背景色彩 (Background)',
        type: 'color',
        defaultValue: '#ffffff',
        cleanValue: '#e2e8f0',
        targetValue: '#0f172a',
        isTrap: false,
        desc: '換成沉穩科技深色背景'
      },
      {
        id: 'backdropBlur',
        name: '磨砂玻璃特效 (Backdrop Blur)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 25,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 16,
        targetRange: [10, 20],
        isTrap: false,
        desc: '蘋果風霧面磨砂玻璃質感'
      },
      {
        id: 'avatarRingColor',
        name: '頭像邊框光環 (Avatar Ring)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#94a3b8',
        targetValue: '#38bdf8',
        isTrap: false,
        desc: '聚焦頭像視覺中心的天藍光環'
      },
      {
        id: 'userNameSize',
        name: '名字字體大小 (Font Size)',
        type: 'slider',
        unit: 'px',
        min: 12,
        max: 26,
        step: 1,
        defaultValue: 14,
        cleanValue: 14,
        targetValue: 20,
        targetRange: [18, 22],
        isTrap: false,
        desc: '放大姓名，樹立第一主視覺'
      },
      {
        id: 'userNameWeight',
        name: '名字字重大粗 (Font Weight)',
        type: 'select',
        options: [
          { label: '400 扁平', value: 400 },
          { label: '600 中等', value: 600 },
          { label: '800 特粗', value: 800 }
        ],
        defaultValue: 400,
        cleanValue: 400,
        targetValue: 800,
        isTrap: false,
        desc: '粗體凸顯主角氣勢'
      },
      {
        id: 'userRoleColor',
        name: '職稱識別色彩 (Role Color)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#64748b',
        targetValue: '#38bdf8',
        isTrap: false,
        desc: '副標職稱專屬亮色'
      },
      {
        id: 'cardShadow',
        name: '立體懸浮陰影 (Card Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 50,
        step: 5,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 40,
        targetRange: [25, 50],
        isTrap: false,
        desc: '營造卡片脫離桌面的懸浮深度'
      },
      // === 5 項干擾/陷阱項 ===
      {
        id: 'cardBorderHeavy',
        name: '硬粗黑邊框 (Border) [陷阱項]',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 8,
        step: 1,
        defaultValue: 2,
        cleanValue: 3,
        targetValue: 1,
        isTrap: true,
        desc: '⚠️ 不要加粗黑色外框！高雅名片只需 1px 淡白邊'
      },
      {
        id: 'cardSkewTrap',
        name: '卡片透視歪斜 [陷阱項]',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 6,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 歪斜會讓名片文字難以閱讀！'
      },
      {
        id: 'userNameItalicTrap',
        name: '姓名歪斜斜體 [干擾項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 正式幹部名片不適合花俏歪字'
      },
      {
        id: 'avatarSquareTrap',
        name: '方形大頭貼硬框 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 會強制將頭像還原為冰冷方形！'
      },
      {
        id: 'cardDashedTrap',
        name: '折價券虛線邊框 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 虛線邊框看起來像超市截角！'
      }
    ]
  },
  {
    id: 'mission-3',
    number: 3,
    title: '改造老牌便當店特餐商品卡',
    subtitle: '圖文裁切溢出 (overflow: hidden)、浮空促銷標籤 (position: absolute) 與 Flex 間距',
    client: {
      name: '陳老闆（巷口三十年燒肉飯）',
      avatar: '🍱',
      dialogue: '「肖年ㄟ！我請親戚做的外送菜單卡片，那張招牌燒肉照片直接爆出版面、把字都吃掉了；旁邊那個『店長推薦』紅色標籤還死死貼在左上角蓋住肉！客人說看了完全沒食慾，拜託幫幫忙！」'
    },
    learningFocus: [
      'overflow: hidden：確保圖片圓角完美鎖死在卡片容器內，不破版',
      'position: relative / absolute：精確定位浮空推薦標籤',
      'display: flex 與 gap：優雅排定商品名稱、評價與價格空間',
      '價格視覺突顯：主推色標示超值價格，促進點擊欲望'
    ],
    htmlTemplate: `<div class="product-card">
  <span class="badge-tag">🔥 店長必點推薦</span>
  <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80" class="food-img" alt="招牌炭烤排骨" />
  <div class="product-body p-4 space-y-2">
    <h4 class="product-title font-bold text-base text-slate-100">招牌炭烤秘醬雙拼飯</h4>
    <p class="product-desc text-xs text-slate-400">三十年獨門老滷汁、溫體現烤厚切豬五花搭配清爽小菜</p>
    <div class="product-footer flex items-center justify-between pt-2 border-t border-slate-800">
      <span class="product-rating text-xs text-amber-400 font-bold">⭐ 4.9 (240+)</span>
      <span class="product-price">NT$ 145</span>
    </div>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
.product-card {
  width: 290px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.food-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.badge-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.product-price {
  color: #f43f5e;
  font-size: 22px;
  font-weight: 800;
}`,
    targetInspector: {
      colors: [
        { label: '美食底座深色', hex: '#1e293b', role: 'cardBg' },
        { label: '熱銷推薦標籤', hex: '#ef4444', role: 'badgeBg' },
        { label: '食慾價格色', hex: '#f43f5e', role: 'priceColor' }
      ],
      metrics: [
        { label: '圖片溢出裁切', value: 'overflow: hidden (核心！)' },
        { label: '標籤定位', value: 'position: absolute' },
        { label: '標籤位置', value: 'Top 14px, Left 14px' },
        { label: '價格字級', value: '22px 特粗' },
        { label: '照片比例', value: 'object-fit: cover' }
      ],
      tip: '💡 overflow: hidden 才能鎖死圖片圓角不炸版；標籤設為 absolute 才能優雅浮在照片上方！'
    },
    tools: [
      {
        id: 'overflowToggle',
        name: '溢出裁切開關 (Overflow: Hidden)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '鎖住圖片溢出邊界，終結破版！'
      },
      {
        id: 'cardRadius',
        name: '卡片現代圓角 (Card Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [16, 24],
        isTrap: false,
        desc: '包覆美食卡片的美麗倒角'
      },
      {
        id: 'cardBg',
        name: '商品卡背景 (Card Background)',
        type: 'color',
        defaultValue: '#ffffff',
        cleanValue: '#cbd5e1',
        targetValue: '#1e293b',
        isTrap: false,
        desc: '襯托美食色澤的深色底座'
      },
      {
        id: 'foodImgFit',
        name: '照片比例模式 (Object Fit)',
        type: 'select',
        options: [
          { label: 'fill (拉伸失真)', value: 'fill' },
          { label: 'cover (自適應不變形)', value: 'cover' }
        ],
        defaultValue: 'fill',
        cleanValue: 'fill',
        targetValue: 'cover',
        isTrap: false,
        desc: '讓排骨照片維持黃金美味比例'
      },
      {
        id: 'badgePosition',
        name: '浮空定位標籤 (Position: Absolute)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '讓推薦標籤脫離文檔流，浮在照片角落'
      },
      {
        id: 'badgeTop',
        name: '標籤頂部距離 (Top Offset)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 14,
        targetRange: [10, 18],
        isTrap: false,
        desc: '微調推薦標籤與頂部的距離'
      },
      {
        id: 'badgeBg',
        name: '推薦標籤色彩 (Badge Color)',
        type: 'color',
        defaultValue: '#ff0000',
        cleanValue: '#f97316',
        targetValue: '#ef4444',
        isTrap: false,
        desc: '高彩度促銷標籤色'
      },
      {
        id: 'priceColor',
        name: '價格醒目主色 (Price Color)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#475569',
        targetValue: '#f43f5e',
        isTrap: false,
        desc: '換成激發食慾與下單的亮麗玫紅'
      },
      {
        id: 'priceSize',
        name: '價格字體大小 (Price Size)',
        type: 'slider',
        unit: 'px',
        min: 12,
        max: 28,
        step: 1,
        defaultValue: 14,
        cleanValue: 14,
        targetValue: 22,
        targetRange: [20, 24],
        isTrap: false,
        desc: '放大價格，給消費者超值震撼感'
      },
      {
        id: 'cardShadow',
        name: '美食立體陰影 (Card Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 30,
        targetRange: [20, 35],
        isTrap: false,
        desc: '托起卡片層次'
      },
      // === 5 項干擾/陷阱項 ===
      {
        id: 'imgRotateTrap',
        name: '照片歪斜旋轉 [陷阱項]',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 10,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 不要無故旋轉美食照片！歪斜會嚴重扣分！'
      },
      {
        id: 'imgSepiaTrap',
        name: '黃褐變質濾鏡 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 會讓新鮮排骨看起來像放了三天的隔夜菜！'
      },
      {
        id: 'cardBorderDoubleTrap',
        name: '雙層老舊邊框 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 90年代復古便當傳單才會用的粗糙邊框'
      },
      {
        id: 'priceUnderlineTrap',
        name: '價格文字底線 [干擾項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 畫蛇添足的底線會遮擋數字！'
      },
      {
        id: 'badgeInvertTrap',
        name: '標籤黑白反相 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 讓標籤失去熱銷醒目感'
      }
    ]
  },
  {
    id: 'mission-4',
    number: 4,
    title: '整容窒息感會員登入表單',
    subtitle: '表單輸入狀態互動：:focus 光暈外框、垂直間距 (gap) 與色彩無障礙對比',
    client: {
      name: '冠宇（全端專案組長）',
      avatar: '👨‍💻',
      dialogue: '「我們專案的登入畫面被使用者投訴體驗極差！三個輸入框緊密黏在一起毫無間距、點進去輸入時完全沒有光暈反饋，更可怕的是錯誤提示字是暗紅色，根本看不清楚！請幫我們的表單進行現代 UI 無障礙整容！」'
    },
    learningFocus: [
      '表單垂直呼吸感：flex-direction: column 搭配 gap: 18px',
      'input:focus 高光光暈：outline: none 搭配精美 box-shadow ring',
      '舒適輸入 padding：給文字輸入舒適的高度，告別 1px 黑框',
      '無障礙色彩對比：清晰高可讀性的錯誤標籤與主按鈕'
    ],
    htmlTemplate: `<form class="login-form" onsubmit="event.preventDefault()">
  <div class="form-title-group mb-2">
    <h3 class="form-title text-lg font-bold text-white">安全會員登入</h3>
    <p class="form-subtitle text-xs text-slate-400">歡迎回到現代程式設計學院</p>
  </div>
  <div class="input-group flex flex-col gap-1">
    <label class="input-label text-xs font-semibold text-slate-300">校園信箱 (Email)</label>
    <input type="email" class="form-input" placeholder="student@university.edu" value="alex@domain.tw" />
  </div>
  <div class="input-group flex flex-col gap-1">
    <label class="input-label text-xs font-semibold text-slate-300">安全密碼 (Password)</label>
    <input type="password" class="form-input" placeholder="••••••••••••" value="supersecret" />
  </div>
  <button type="submit" class="submit-btn mt-2">立即驗證身分並進入 ⚡</button>
</form>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
.login-form {
  width: 340px;
  background: #0f172a;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}

.form-input {
  width: 100%;
  padding: 13px 18px;
  background: #1e293b;
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  outline: none;
  font-size: 14px;
  transition: all 0.25s ease;
}

.form-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
  background: #0f172a;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #0ea5e9, #3b82f6);
  color: #ffffff;
  padding: 13px 20px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px -4px rgba(14, 165, 233, 0.4);
  transition: all 0.3s ease;
}`,
    targetInspector: {
      colors: [
        { label: '表單底座深藍', hex: '#0f172a', role: 'formBg' },
        { label: '輸入框暗灰底', hex: '#1e293b', role: 'inputBg' },
        { label: '天藍焦點光暈', hex: '#38bdf8', role: 'focusColor' },
        { label: '送出按鈕主藍', hex: '#0ea5e9', role: 'submitBg' }
      ],
      metrics: [
        { label: '欄位間距', value: 'gap: 20px' },
        { label: '打字內距', value: 'padding: 13px 18px' },
        { label: '光暈外框', value: ':focus 4px 天藍光圈' },
        { label: '按鈕形狀', value: '12px 圓角 + 陰影' }
      ],
      tip: '💡 gap: 20px 才能拉開三個框的呼吸距離；:focus 光暈才能讓使用者明確知道游標在哪裡！'
    },
    tools: [
      {
        id: 'formGap',
        name: '欄位呼吸留白 (Form Gap)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [16, 24],
        isTrap: false,
        desc: '用 gap 拉開三個欄位之間的距離'
      },
      {
        id: 'formPadding',
        name: '表單容器留白 (Form Padding)',
        type: 'slider',
        unit: 'px',
        min: 6,
        max: 40,
        step: 2,
        defaultValue: 6,
        cleanValue: 6,
        targetValue: 32,
        targetRange: [26, 36],
        isTrap: false,
        desc: '給表單大器的呼吸舞台'
      },
      {
        id: 'inputPadding',
        name: '輸入框點擊手感 (Input Padding)',
        type: 'slider',
        unit: 'px',
        min: 2,
        max: 20,
        step: 1,
        defaultValue: 2,
        cleanValue: 2,
        targetValue: 13,
        targetRange: [10, 16],
        isTrap: false,
        desc: '舒適的高度好打字，擺脫窄線條'
      },
      {
        id: 'inputRadius',
        name: '輸入框圓弧倒角 (Input Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 20,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 12,
        targetRange: [8, 16],
        isTrap: false,
        desc: '12px 圓角提升親和力'
      },
      {
        id: 'focusGlowToggle',
        name: '焦點科技光暈開關 (:Focus Glow)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '點選時散發天藍擴散光暈圈'
      },
      {
        id: 'focusColor',
        name: '焦點高光色彩 (Focus Color)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#64748b',
        targetValue: '#38bdf8',
        isTrap: false,
        desc: '天藍高對比光圈'
      },
      {
        id: 'submitBtnBg',
        name: '送出按鈕主色 (Submit Button)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#334155',
        targetValue: '#0ea5e9',
        isTrap: false,
        desc: '明亮漸層主 CTA 藍色'
      },
      {
        id: 'submitRadius',
        name: '按鈕圓弧倒角 (Submit Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 20,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 12,
        targetRange: [8, 16],
        isTrap: false,
        desc: '與輸入框統一的圓弧'
      },
      {
        id: 'formRadius',
        name: '表單大外框圓角 (Form Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 32,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 24,
        targetRange: [18, 28],
        isTrap: false,
        desc: '24px 現代科技外框倒角'
      },
      {
        id: 'formShadow',
        name: '表單立體浮空陰影 (Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 60,
        step: 5,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 50,
        targetRange: [35, 60],
        isTrap: false,
        desc: '強烈深邃懸浮景深'
      },
      // === 5 項干擾/陷阱項 ===
      {
        id: 'inputBorderHeavyTrap',
        name: '輸入框粗黑框 [陷阱項]',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 2,
        cleanValue: 3,
        targetValue: 1,
        isTrap: true,
        desc: '⚠️ 不要加粗黑色硬框！那是瀏覽器預設醜邊框'
      },
      {
        id: 'inputDottedTrap',
        name: '點狀虛線邊框 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 看起來像小學生考卷填空欄！'
      },
      {
        id: 'labelBlurTrap',
        name: '標籤文字模糊度 [陷阱項]',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 5,
        step: 1,
        defaultValue: 0,
        cleanValue: 2,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 文字模糊會讓表單無法填寫！'
      },
      {
        id: 'submitInvertTrap',
        name: '按鈕反相死白 [干擾項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 失去核心送出動作的層次感'
      },
      {
        id: 'formSkewTrap',
        name: '表單左右傾斜 [陷阱項]',
        type: 'slider',
        unit: 'deg',
        min: -10,
        max: 10,
        step: 1,
        defaultValue: 0,
        cleanValue: 5,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 輸入框歪斜嚴重扣分！'
      }
    ]
  },
  {
    id: 'mission-5',
    number: 5,
    title: '校慶首頁 Hero 旗艦橫幅',
    subtitle: '終極挑戰：背景漸層氛圍光、文字裁切漸層 (background-clip: text) 與雙 CTA 階層',
    client: {
      name: '校慶籌備委員會總召',
      avatar: '🎓',
      dialogue: '「終極任務來了！下個月是建校 50 週年大慶，校長指定官網首頁的橫幅 Hero 必須要有 Apple 發表會等級的高級感！目前的版本背景慘白刺眼、字體單調，完全撐不起半世紀盛典的氣勢... 請展現你最強的 CSS 魔法！」'
    },
    learningFocus: [
      '深邃漸層大底搭配氛圍光照（Radial & Linear Gradients）',
      'background-clip: text：將漸層色直接灌注入標題文字中',
      '雙 CTA 按鈕階層：主操作（霓虹高亮）vs 次操作（幽靈邊框 Ghost Button）',
      '響應式容器與大行高：大字級必須搭配呼吸行高與字母微負字距'
    ],
    htmlTemplate: `<div class="hero-banner">
  <div class="hero-badge">
    <span class="badge-dot">●</span>
    <span>半世紀盛典 • 1974 - 2024</span>
  </div>
  <h1 class="hero-title">解鎖下一個五十年的極致數位未來</h1>
  <p class="hero-desc">跨越半世紀的輝煌傳承，邀請全體師生與校友共聚一堂，見證全新科技大樓落成與智慧校園啟用盛典。</p>
  <div class="cta-group flex items-center justify-center gap-3 mt-2">
    <button class="cta-primary">立即預約校慶 VIP 席位 🚀</button>
    <button class="cta-secondary">探索校慶全景時光軸 📖</button>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
.hero-banner {
  width: 100%;
  max-width: 580px;
  background: radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.25), transparent 70%), #090d16;
  padding: 44px 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  text-align: center;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.hero-title {
  background: linear-gradient(135deg, #ffffff 40%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.8px;
}

.cta-primary {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #ffffff;
  padding: 12px 26px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.5);
  cursor: pointer;
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #f1f5f9;
  padding: 12px 24px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
}`,
    targetInspector: {
      colors: [
        { label: '深空氛圍紫光', hex: '#7c3aed', role: 'ambientColor' },
        { label: '標題漸層流金', hex: '#c084fc', role: 'titleColor' },
        { label: '主按鈕紫粉漸層', hex: '#8b5cf6', role: 'primaryBtnBg' }
      ],
      metrics: [
        { label: '文字漸層神技', value: '-webkit-background-clip: text' },
        { label: '氛圍聚光燈', value: 'radial-gradient 放射光場' },
        { label: '大標題字級', value: '32px 特粗 (800)' },
        { label: '主按鈕造形', value: '9999px 膠囊' },
        { label: '次按鈕樣式', value: '半透明幽靈邊框' }
      ],
      tip: '💡 文字漸層裁切讓字體流光溢彩；主按鈕發光與次按鈕幽靈邊框形成鮮明主次！'
    },
    tools: [
      {
        id: 'heroPadding',
        name: '橫幅旗艦留白 (Hero Padding)',
        type: 'slider',
        unit: 'px',
        min: 10,
        max: 60,
        step: 2,
        defaultValue: 10,
        cleanValue: 10,
        targetValue: 44,
        targetRange: [36, 50],
        isTrap: false,
        desc: '充沛大留白，撐起半世紀校慶氣派'
      },
      {
        id: 'heroRadius',
        name: '現代外框圓角 (Hero Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 28,
        targetRange: [22, 34],
        isTrap: false,
        desc: '柔和包覆整體橫幅輪廓'
      },
      {
        id: 'ambientGlowToggle',
        name: '深空紫光氛圍場 (Radial Glow)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '頂端放射狀紫色聚光燈光暈'
      },
      {
        id: 'titleGradientToggle',
        name: '文字流金漸層 (-webkit-clip: text)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '將漸層色直接灌注入標題筆畫'
      },
      {
        id: 'titleSize',
        name: '大標題字級 (Title Size)',
        type: 'slider',
        unit: 'px',
        min: 18,
        max: 42,
        step: 2,
        defaultValue: 20,
        cleanValue: 20,
        targetValue: 32,
        targetRange: [28, 36],
        isTrap: false,
        desc: '32px 震撼字級，確立核心主視覺'
      },
      {
        id: 'titleWeight',
        name: '標題字重厚度 (Title Weight)',
        type: 'select',
        options: [
          { label: '400 正常', value: 400 },
          { label: '700 加粗', value: 700 },
          { label: '800 特粗', value: 800 }
        ],
        defaultValue: 400,
        cleanValue: 400,
        targetValue: 800,
        isTrap: false,
        desc: '800 特粗厚實有力'
      },
      {
        id: 'primaryBtnBg',
        name: '主 CTA 按鈕漸層色 (Primary CTA)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#475569',
        targetValue: '#8b5cf6',
        isTrap: false,
        desc: '紫粉科技高彩漸層'
      },
      {
        id: 'primaryBtnRadius',
        name: '主 CTA 膠囊圓角 (Button Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 50,
        step: 2,
        hasCapsuleToggle: true,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 9999,
        targetRange: [20, 9999],
        isTrap: false,
        desc: '9999px 膠囊流暢手感'
      },
      {
        id: 'secondaryGhostToggle',
        name: '次按鈕幽靈模式 (Ghost Button)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '半透明微光幽靈按鈕，維持主次分明'
      },
      {
        id: 'heroShadow',
        name: '旗艦級大陰影 (Hero Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 70,
        step: 5,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 60,
        targetRange: [40, 70],
        isTrap: false,
        desc: '深度懸浮陰影'
      },
      // === 5 項干擾/陷阱項 ===
      {
        id: 'titleSkewTrap',
        name: '標題歪斜歪轉 [陷阱項]',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 6,
        targetValue: 0,
        isTrap: true,
        desc: '⚠️ 莊嚴校慶首頁不要把標題歪斜！會扣分！'
      },
      {
        id: 'rainbowBorderTrap',
        name: '七彩跳動花框 [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 俗氣電子花車感，嚴重扣分！'
      },
      {
        id: 'descTinyTrap',
        name: '說明文字縮小至 9px [陷阱項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 破壞無障礙易讀性！'
      },
      {
        id: 'ghostDashedTrap',
        name: '次按鈕虛線外框 [干擾項]',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        desc: '⚠️ 破壞高級幽靈邊框的純淨感'
      },
      {
        id: 'heroBorderHeavyTrap',
        name: '粗黑外邊框 [陷阱項]',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 2,
        cleanValue: 4,
        targetValue: 1,
        isTrap: true,
        desc: '⚠️ 粗糙黑框遮擋氛圍光芒！'
      }
    ]
  }
];

// 為所有工具標註對應改動的 CSS 屬性
export const TOOL_CSS_MAP = {
  // mission-1
  borderRadius: 'border-radius',
  paddingY: 'padding-top / bottom',
  paddingX: 'padding-left / right',
  bgColor: 'background-color',
  gradientToggle: 'background: linear-gradient',
  gradientColor: 'linear-gradient(..., to)',
  textColor: 'color',
  shadowBlur: 'box-shadow',
  fontWeight: 'font-weight',
  hoverY: ':hover { transform }',
  borderHeavy: 'border: 4px solid',
  textShadowTrap: 'text-shadow',
  letterSpacingTrap: 'letter-spacing',
  btnRotateTrap: 'transform: rotate()',
  grayscaleTrap: 'filter: grayscale()',

  // mission-2
  cardPadding: 'padding',
  avatarRadius: 'border-radius (頭像)',
  cardRadius: 'border-radius (外框)',
  cardBg: 'background',
  backdropBlur: 'backdrop-filter: blur()',
  avatarRingColor: 'box-shadow (光環)',
  userNameSize: 'font-size',
  userNameWeight: 'font-weight',
  userRoleColor: 'color',
  cardShadow: 'box-shadow',
  cardBorderHeavy: 'border: 3px solid',
  cardSkewTrap: 'transform: skew()',
  userNameItalicTrap: 'font-style: italic',
  avatarSquareTrap: 'border-radius: 0',
  cardDashedTrap: 'border-style: dashed',

  // mission-3
  overflowToggle: 'overflow: hidden',
  foodImgFit: 'object-fit: cover',
  badgePosition: 'position: absolute',
  badgeTop: 'top / right',
  badgeBg: 'background',
  priceColor: 'color',
  priceSize: 'font-size',
  imgRotateTrap: 'transform: rotate()',
  imgSepiaTrap: 'filter: sepia()',
  cardBorderDoubleTrap: 'border-style: double',
  priceUnderlineTrap: 'text-decoration: underline',
  badgeInvertTrap: 'filter: invert()',

  // mission-4
  formGap: 'gap (欄位間距)',
  formPadding: 'padding (表單容器)',
  inputPadding: 'padding (輸入框)',
  inputRadius: 'border-radius (輸入框)',
  focusGlowToggle: ':focus { box-shadow }',
  focusColor: ':focus { border-color }',
  submitBtnBg: 'background (按鈕)',
  submitRadius: 'border-radius (按鈕)',
  formRadius: 'border-radius (表單)',
  formShadow: 'box-shadow',
  inputBorderHeavyTrap: 'border: 3px solid',
  inputDottedTrap: 'border-style: dotted',
  labelBlurTrap: 'filter: blur()',
  submitInvertTrap: 'filter: invert()',
  formSkewTrap: 'transform: skew()',

  // mission-5
  heroPadding: 'padding (橫幅)',
  heroRadius: 'border-radius (橫幅)',
  ambientGlowToggle: 'radial-gradient (光暈)',
  titleGradientToggle: 'background-clip: text',
  titleSize: 'font-size (標題)',
  titleWeight: 'font-weight (標題)',
  primaryBtnBg: 'background: linear-gradient',
  primaryBtnRadius: 'border-radius (按鈕)',
  secondaryGhostToggle: 'border / backdrop-filter',
  heroShadow: 'box-shadow',
  titleSkewTrap: 'transform: skew()',
  rainbowBorderTrap: 'border-image: linear-gradient',
  descTinyTrap: 'font-size: 9px',
  ghostDashedTrap: 'border-style: dashed',
  heroBorderHeavyTrap: 'border: 4px solid'
};

// 自動為每關的 tools 注入 cssProperty
MISSIONS.forEach(mission => {
  mission.tools.forEach(tool => {
    tool.cssProperty = TOOL_CSS_MAP[tool.id] || tool.id;
  });
});
