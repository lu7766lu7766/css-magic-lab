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
    // 共 15 項工具：交錯打亂混排
    tools: [
      {
        id: 'borderRadius',
        name: '圓角修飾 (Border Radius)',
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
        desc: '磨平直角邊緣，支援 9999px 膠囊快捷'
      },
      {
        id: 'borderHeavy',
        name: '實線外邊框 (Border)',
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
        trapWarning: '實線外邊框 (Border)：現代膠囊設計通常不需要加粗硬黑邊框，這會破壞極簡膠囊的美感。',
        desc: '為按鈕周圍添加固定寬度的邊界外框輪廓'
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
        id: 'letterSpacingTrap',
        name: '字母排列間距 (Letter Spacing)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 12,
        step: 1,
        defaultValue: 0,
        cleanValue: 6,
        targetValue: 0,
        isTrap: true,
        trapWarning: '字母排列間距 (Letter Spacing)：過寬的字元間隔會分散閱讀焦點，使按鈕文字顯得鬆散。',
        desc: '調整每個英文字母之間的水平排列間隙'
      },
      {
        id: 'bgColor',
        name: '主背景色彩 (Background Color)',
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
        id: 'textShadowTrap',
        name: '刻痕文字陰影 (Text Shadow)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '刻痕文字陰影 (Text Shadow)：文字凹凸陰影屬於早期立體字風格，現代 UI 建議保持純色文字以維持易讀性。',
        desc: '在文字下方加上立體刻痕投影效果'
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
        id: 'btnRotateTrap',
        name: '平面旋轉角度 (Rotate)',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 8,
        targetValue: 0,
        isTrap: true,
        trapWarning: '平面旋轉角度 (Rotate)：按鈕傾斜會破壞網頁標準排版的對齊與秩序感。',
        desc: '將整個按鈕沿中心點順時針或逆時針傾斜旋轉'
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
        id: 'grayscaleTrap',
        name: '灰階去色濾鏡 (Grayscale Filter)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '灰階去色濾鏡 (Grayscale Filter)：將鮮明高飽和的漸層轉為灰階，會失去科技活力與點擊主導性。',
        desc: '將按鈕所有飽和色彩轉化為黑白灰階效果'
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
    // 共 15 項工具：交錯打亂混排
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
        id: 'cardBorderHeavy',
        name: '深色硬邊框 (Border)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 8,
        step: 1,
        defaultValue: 2,
        cleanValue: 3,
        targetValue: 1,
        isTrap: true,
        trapWarning: '深色硬邊框 (Border)：深藍毛玻璃名片不應加上粗黑框，只需 1px 微光澤淡邊即可突顯質感。',
        desc: '為卡片外圍包覆深黑色的實線邊框'
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
        id: 'cardSkewTrap',
        name: '透視歪斜 (Skew X)',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 6,
        targetValue: 0,
        isTrap: true,
        trapWarning: '透視歪斜 (Skew X)：水平傾斜卡片會讓內文難以閱讀，違背名片資訊傳遞的核心目的。',
        desc: '使卡片產生水平梯形平行四邊形傾斜變形'
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
        id: 'avatarSquareTrap',
        name: '直角方形頭像 (Square Avatar)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '直角方形頭像 (Square Avatar)：現代人像名片普遍採用圓形裁切配合高光外環，直角方框顯得生硬冰冷。',
        desc: '強制去除頭像圓形裁切，恢復直角方框'
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
        id: 'userNameItalicTrap',
        name: '字體斜體化 (Font Style Italic)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '字體斜體化 (Font Style Italic)：專業名片中的名字應使用端正字重（font-weight）突顯，斜體反而顯得不夠穩重。',
        desc: '將姓名文字設定為傾斜草書排版風格'
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
        id: 'cardDashedTrap',
        name: '虛線邊框樣式 (Dashed Border)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '虛線邊框樣式 (Dashed Border)：虛線邊框容易讓人聯想到超市折價券截角，破壞高階幹部名片的專業形象。',
        desc: '將外框線更換為虛線截角分割造型'
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
    // 共 15 項工具：交錯打亂混排
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
        id: 'cardBorderDoubleTrap',
        name: '雙重線外框 (Double Border)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '雙重線外框 (Double Border)：雙線框帶有濃厚的早期復古印表機傳單感，不符合現代極簡電商菜單。',
        desc: '在卡片邊界疊加雙層平行線條外框'
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
        id: 'imgRotateTrap',
        name: '照片旋轉角度 (Rotate)',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 10,
        targetValue: 0,
        isTrap: true,
        trapWarning: '照片旋轉角度 (Rotate)：無故旋轉特餐封面會讓整體排版失衡，甚至遮擋價格與說明。',
        desc: '讓食物封面照片產生自轉角度'
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
        id: 'imgSepiaTrap',
        name: '復古泛黃濾鏡 (Sepia Filter)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '復古泛黃濾鏡 (Sepia Filter)：泛黃濾鏡會讓新鮮烹煮的美食排骨看起來像放了很久的隔夜菜，嚴重影響食慾！',
        desc: '套用老照片懷舊復古泛黃色調濾鏡'
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
        id: 'badgeInvertTrap',
        name: '標籤明度反相 (Invert Filter)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '標籤明度反相 (Invert Filter)：將醒目的暖紅熱銷促銷標籤反相，會失去促銷的緊迫感與亮眼度。',
        desc: '將促銷標籤之亮紅色彩做 180 度反相變換'
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
        id: 'priceUnderlineTrap',
        name: '文字底線裝飾 (Underline)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '文字底線裝飾 (Underline)：在價格數字加上底線容易與超連結混淆，且會割裂數字字形。',
        desc: '在特餐價格金額下方增加一條裝飾底線'
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
    // 共 15 項工具：交錯打亂混排
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
        id: 'inputBorderHeavyTrap',
        name: '粗黑實線框 (Input Border)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 2,
        cleanValue: 3,
        targetValue: 1,
        isTrap: true,
        trapWarning: '粗黑實線框 (Input Border)：深色現代暗黑介面不宜使用粗糙黑邊框，會與背景融合並破壞輸入層次。',
        desc: '為文字輸入框加厚黑色邊線'
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
        id: 'inputDottedTrap',
        name: '點狀邊框樣式 (Dotted Border)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '點狀邊框樣式 (Dotted Border)：點狀邊框看起來像考卷填空題，缺乏商務與現代應用的嚴謹與質感。',
        desc: '將輸入框四邊轉換為密集圓點邊線'
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
        id: 'labelBlurTrap',
        name: '文字模糊濾鏡 (Blur Filter)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 5,
        step: 1,
        defaultValue: 0,
        cleanValue: 2,
        targetValue: 0,
        isTrap: true,
        trapWarning: '文字模糊濾鏡 (Blur Filter)：模糊文字嚴重破壞無障礙與易讀性，讓使用者無法看清該填寫什麼。',
        desc: '在欄位標題標籤上方增加毛玻璃模糊效果'
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
        id: 'submitInvertTrap',
        name: '按鈕明度反相 (Invert Filter)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '按鈕明度反相 (Invert Filter)：送出按鈕反相會失去原本精心調配的漸層或主色光澤，導致按鈕層次塌陷。',
        desc: '將送出按鈕的主色調轉換為反向明度效果'
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
        id: 'formSkewTrap',
        name: '表單水平傾斜 (Form Skew)',
        type: 'slider',
        unit: 'deg',
        min: -10,
        max: 10,
        step: 1,
        defaultValue: 0,
        cleanValue: 5,
        targetValue: 0,
        isTrap: true,
        trapWarning: '表單水平傾斜 (Form Skew)：表單傾斜會嚴重妨礙游標對齊與文字輸入，是破壞使用者體驗的禁忌。',
        desc: '將整個登入表單容器進行 X 軸歪斜幾何變換'
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
    // 共 15 項工具：交錯打亂混排
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
        id: 'heroBorderHeavyTrap',
        name: '外框重黑邊線 (Heavy Border)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 2,
        cleanValue: 4,
        targetValue: 1,
        isTrap: true,
        trapWarning: '外框重黑邊線 (Heavy Border)：粗黑框會在明暗交界處形成生硬割裂，徹底遮蔽深色背景自然散發的環境光。',
        desc: '在主視覺 Hero 外圍加深加粗黑邊線條'
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
        id: 'rainbowBorderTrap',
        name: '對比虛線外框 (Dashed Border)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '對比虛線外框 (Dashed Border)：高對比度的鮮豔虛線外框會搶走氛圍光芒（ambient glow）與主標題的風采。',
        desc: '在橫幅外緣加上高對比度的桃紅虛線'
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
        id: 'titleSkewTrap',
        name: '主標題傾斜 (Title Skew)',
        type: 'slider',
        unit: 'deg',
        min: -15,
        max: 15,
        step: 1,
        defaultValue: 0,
        cleanValue: 6,
        targetValue: 0,
        isTrap: true,
        trapWarning: '主標題傾斜 (Title Skew)：隆重的校慶或品牌首頁標題應莊重端正，歪斜會破壞品牌信任感與權威性。',
        desc: '為 Hero 主視覺大標題增加傾角'
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
        id: 'descTinyTrap',
        name: '說明極小字號 (Compact Font)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '說明極小字號 (Compact Font)：字號縮小至 9px 會嚴重影響行動裝置閱讀與無障礙標準（WCAG）。',
        desc: '將副標題說明文縮減為 9px 超緊湊排版'
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
        id: 'ghostDashedTrap',
        name: '次按鈕虛線框 (Ghost Dashed)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '次按鈕虛線框 (Ghost Dashed)：幽靈按鈕（Ghost Button）的核心在於純淨的細實線與背景通透，虛線會破壞極簡美感。',
        desc: '將次要幽靈按鈕的外框改為虛線造型'
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
      }
    ]
  },
  {
    id: 'mission-6',
    number: 6,
    title: '深夜電台黑膠音樂小卡',
    subtitle: '生活美學：border-radius: 50% 正圓裁切、@keyframes spin 旋轉與發光進度條',
    client: {
      name: '浩東（校園午夜電台 DJ）',
      avatar: '🎧',
      dialogue: '「午夜節目開播時大家都在滑手機，但我這張音樂卡方方正正像台冷氣遙控器！黑膠唱片不會轉、進度條死黑一片、播放鍵連個光暈都擠不出來... 誰要聽我播歌啊！」'
    },
    learningFocus: [
      '用 border-radius: 50% 打造完美正圓形黑膠唱片',
      '用 @keyframes spin 製造 6s 平滑無限旋轉動態',
      '用純黑曜沉浸底色 (#090d16) 烘托午夜孤獨專注氛圍',
      '用柔和紫藍發光進度條清楚標註音樂播放時間軸',
      '用立體霓光圓形按鈕確立核心播放控制焦點'
    ],
    htmlTemplate: `<div class="music-card">
  <div class="disc-wrapper">
    <div class="vinyl-disc">
      <div class="disc-grooves"></div>
      <div class="disc-label">
        <span class="disc-icon">🎵</span>
      </div>
    </div>
  </div>
  <div class="track-info">
    <h3 class="track-title">Midnight Tokyo Lofi</h3>
    <p class="track-artist">ChillHop Radio • 午夜調頻</p>
  </div>
  <div class="progress-section">
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <div class="time-meta">
      <span class="time-curr">02:45</span>
      <span class="time-total">03:50</span>
    </div>
  </div>
  <div class="player-controls">
    <button class="ctrl-btn prev-btn">⏮</button>
    <button class="ctrl-btn play-btn">▶</button>
    <button class="ctrl-btn next-btn">⏭</button>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
@keyframes spinDisc {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.music-card {
  width: 320px;
  background: #090d16;
  padding: 22px;
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #f8fafc;
  font-family: inherit;
  transition: all 0.3s ease;
}

.disc-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vinyl-disc {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #1e1b4b 0%, #0f172a 40%, #000000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  animation: spinDisc 6s linear infinite;
  border: 2px solid #334155;
  position: relative;
}

.disc-grooves {
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.disc-label {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
  z-index: 2;
}

.track-info {
  text-align: center;
  width: 100%;
}

.track-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.track-artist {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

.progress-section {
  width: 100%;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #1e293b;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  width: 68%;
  height: 100%;
  background: #818cf8;
  border-radius: 9999px;
  box-shadow: 0 0 8px rgba(129, 140, 248, 0.6);
}

.time-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748b;
  margin-top: 6px;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.ctrl-btn:hover {
  color: #ffffff;
  transform: scale(1.1);
}

.play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #6366f1;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
  font-size: 16px;
}`,
    targetInspector: {
      colors: [
        { label: '沉浸黑夜底色', hex: '#090d16', role: 'musicBg' },
        { label: '進度高亮紫藍', hex: '#818cf8', role: 'progressColor' },
        { label: '播放核心焦點', hex: '#6366f1', role: 'playBtnBg' },
        { label: '曲目高亮白色', hex: '#ffffff', role: 'textColor' }
      ],
      metrics: [
        { label: '唱片造型', value: '50% (正圓無限旋轉)' },
        { label: '音軌厚度', value: '6px (圓潤膠囊)' },
        { label: '播放主鍵', value: '48px 正圓光暈' },
        { label: '機身倒角', value: '24px 現代收邊' },
        { label: '懸浮光影', value: '景深 40px, 沉浸投影' }
      ],
      tip: '💡 黑膠唱片必須是 50% 正圓並帶有旋轉動態，搭配高對比深色背景與高光播放按鈕，瞬間散發高級音樂質感！'
    },
    tools: [
      {
        id: 'discRadius',
        name: '唱片正圓圓角 (Border Radius)',
        type: 'slider',
        unit: '%',
        min: 0,
        max: 50,
        step: 5,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 50,
        targetRange: [40, 50],
        isTrap: false,
        desc: '磨平直角，使黑膠唱片化為 50% 完美正圓'
      },
      {
        id: 'discSpin',
        name: '黑膠旋轉動態 (Spin Animation)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '啟動純 CSS 6s 無限旋轉微動態'
      },
      {
        id: 'discSquareTrap',
        name: '直角鋸齒唱片 (Square Disc Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '直角鋸齒唱片：黑膠唱片必須是正圓形 (50%)，直角會破壞唱片物理真實感。',
        desc: '強制黑膠唱片為直角死板外框'
      },
      {
        id: 'musicBg',
        name: '播放器沉浸底色 (Card Background)',
        type: 'color',
        defaultValue: '#e2e8f0',
        cleanValue: '#cbd5e1',
        targetValue: '#090d16',
        isTrap: false,
        desc: '深邃午夜暗黑沉浸背景'
      },
      {
        id: 'musicRadius',
        name: '機身弧形收邊 (Card Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 36,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 24,
        targetRange: [18, 28],
        isTrap: false,
        desc: '24px 現代收邊柔和倒角'
      },
      {
        id: 'musicPadding',
        name: '機身內部留白 (Card Padding)',
        type: 'slider',
        unit: 'px',
        min: 4,
        max: 36,
        step: 2,
        defaultValue: 6,
        cleanValue: 6,
        targetValue: 22,
        targetRange: [16, 26],
        isTrap: false,
        desc: '撐開播放器呼吸空間，告別緊貼擠壓'
      },
      {
        id: 'trackSkewTrap',
        name: '文字傾斜失衡 (Track Skew Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '文字傾斜失衡：過度 skew 傾斜文字會破壞排版閱讀穩定性。',
        desc: '文字傾斜 -15 度造成視覺失衡'
      },
      {
        id: 'progressColor',
        name: '音軌進度高亮 (Progress Color)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#64748b',
        targetValue: '#818cf8',
        isTrap: false,
        desc: '高亮紫藍發光進度條'
      },
      {
        id: 'progressHeight',
        name: '進度條厚度 (Progress Height)',
        type: 'slider',
        unit: 'px',
        min: 2,
        max: 16,
        step: 1,
        defaultValue: 2,
        cleanValue: 2,
        targetValue: 6,
        targetRange: [4, 8],
        isTrap: false,
        desc: '精緻 6px 膠囊進度條'
      },
      {
        id: 'neonBorderTrap',
        name: '刺眼霓虹外框 (Neon Border Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '刺眼雙線邊框：過於搶眼的亮粉外框會搶走音樂唱片視覺焦點。',
        desc: '4px double 粉紅刺眼雙線外框'
      },
      {
        id: 'playBtnBg',
        name: '播放鍵主色 (Play Button Bg)',
        type: 'color',
        defaultValue: '#94a3b8',
        cleanValue: '#64748b',
        targetValue: '#6366f1',
        isTrap: false,
        desc: '醒目點擊焦點主色'
      },
      {
        id: 'playBtnGlow',
        name: '播放鍵光暈 (Play Button Glow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 16,
        targetRange: [10, 22],
        isTrap: false,
        desc: '懸浮發光深度反饋'
      },
      {
        id: 'progressStripeTrap',
        name: '晃眼斑馬進度條 (Stripe Progress Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '斑馬斜紋進度條：條紋過於刺眼雜亂，降低進度條精準度。',
        desc: '黑白斑馬斜紋干擾進度條'
      },
      {
        id: 'musicShadow',
        name: '機身浮空景深 (Box Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 24,
        targetRange: [16, 32],
        isTrap: false,
        desc: '深沉暗影浮動感'
      },
      {
        id: 'controlsScatterTrap',
        name: '控制按鈕分散脫節 (Scatter Controls Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '控制按鈕脫節：過度寬鬆的按鈕間隔讓播放控制器失去操作重心。',
        desc: '超寬分散佈局破壞居中按鍵控制'
      }
    ]
  },
  {
    id: 'mission-7',
    number: 7,
    title: '外送進度追蹤步進卡',
    subtitle: '即時動態：Flex 步進對齊、連接軌道 ::after、@keyframes pulse 脈動呼吸光',
    client: {
      name: '宇軒（飢腸轆轆的宿委會幹部）',
      avatar: '🛵',
      dialogue: '「半夜十二點訂了 50 份消夜雞排犒賞宿委，外送平台的追蹤卡卻醜到哭：三個狀態節點死黏在一起、連線斷裂、而且不知道外送員現在騎到哪裡了！大家快暴動了，幫我點亮它！」'
    },
    learningFocus: [
      '用 Flexbox 與 space-between 展開步進節點的完美幾何對齊',
      '用偽元素 ::after 打造動態連接線軌道 (Track Line)',
      '用 @keyframes pulse 賦予進行中騎士節點真實呼吸波紋',
      '用 9999px 膠囊徽章精準提示外送抵達狀態與倒數資訊',
      '排除破壞動態連續感的中斷雜音樣式'
    ],
    htmlTemplate: `<div class="stepper-card">
  <div class="stepper-header">
    <div class="order-badge">⚡ 配送中</div>
    <div class="order-eta">預計 12 分鐘抵達</div>
  </div>
  <div class="step-track">
    <div class="step-progress-line"></div>
    <div class="step-item step-completed">
      <div class="step-node">✓</div>
      <span class="step-label">餐點製作</span>
    </div>
    <div class="step-item step-active">
      <div class="step-node pulse-node">🛵</div>
      <span class="step-label">外送騎士</span>
    </div>
    <div class="step-item step-pending">
      <div class="step-node">📍</div>
      <span class="step-label">宿舍大門</span>
    </div>
  </div>
  <div class="driver-bar">
    <div class="driver-avatar">👨‍🍳</div>
    <div class="driver-meta">
      <div class="driver-name">陳騎士 • 三陽 JET SL</div>
      <div class="driver-rate">★ 4.9 (500+ 送達)</div>
    </div>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
@keyframes nodePulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.stepper-card {
  width: 340px;
  background: #0f172a;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stepper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.order-eta {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

.step-track {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
}

.step-progress-line {
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  height: 4px;
  background: #334155;
  z-index: 1;
}

.step-progress-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #10b981;
}

.step-item {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-node {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #1e293b;
  border: 2px solid #334155;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.step-completed .step-node {
  background: #10b981;
  border-color: #10b981;
  color: #ffffff;
}

.step-active .step-node {
  background: #0f172a;
  border-color: #10b981;
  color: #10b981;
  animation: nodePulse 2s infinite;
}

.step-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}

.step-active .step-label {
  color: #10b981;
}

.driver-bar {
  background: rgba(255, 255, 255, 0.04);
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.driver-avatar {
  font-size: 24px;
}

.driver-name {
  font-size: 13px;
  font-weight: 700;
  color: #f1f5f9;
}

.driver-rate {
  font-size: 11px;
  color: #fbbf24;
}`,
    targetInspector: {
      colors: [
        { label: '進行狀態翡翠綠', hex: '#10b981', role: 'stepActiveColor' },
        { label: '夜間深藍底色', hex: '#0f172a', role: 'stepCardBg' },
        { label: '輔助說明灰藍', hex: '#94a3b8', role: 'textColor' },
        { label: '星等評分金黃', hex: '#fbbf24', role: 'accentColor' }
      ],
      metrics: [
        { label: '節點弧度', value: '50% (正圓節點)' },
        { label: '脈動波紋', value: '2s 無限擴散呼吸光' },
        { label: '軌道高度', value: '4px 連續進度條' },
        { label: '卡片圓角', value: '20px 現代收邊' },
        { label: '空間呼吸', value: 'Padding 24px 充裕留白' }
      ],
      tip: '💡 步進追蹤器講究節點正圓與呼吸脈衝光，搭配清晰的雙色進度線，能讓使用者一眼掌握外送動態！'
    },
    tools: [
      {
        id: 'stepNodeRadius',
        name: '節點正圓圓弧 (Node Radius)',
        type: 'slider',
        unit: '%',
        min: 0,
        max: 50,
        step: 5,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 50,
        targetRange: [40, 50],
        isTrap: false,
        desc: '50% 正圓形步進狀態節點'
      },
      {
        id: 'stepPulseGlow',
        name: '脈衝呼吸光 (Pulse Glow)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '進行中騎士節點動態呼吸光環'
      },
      {
        id: 'stepNodeSquareTrap',
        name: '生硬方形節點 (Square Node Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '生硬方形節點：步進器節點建議為圓形，方形顯得突兀生硬。',
        desc: '直角方形打碎步進節點連續感'
      },
      {
        id: 'stepLineHeight',
        name: '軌道厚度 (Track Line Height)',
        type: 'slider',
        unit: 'px',
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        cleanValue: 1,
        targetValue: 4,
        targetRange: [3, 6],
        isTrap: false,
        desc: '4px 飽滿狀態連接軸線'
      },
      {
        id: 'stepActiveColor',
        name: '進行中主題色 (Active Color)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#64748b',
        targetValue: '#10b981',
        isTrap: false,
        desc: '清新醒目翡翠綠'
      },
      {
        id: 'stepDashedTrackTrap',
        name: '虛線折斷軌道 (Dotted Track Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '虛線折斷軌道：點狀虛線會讓外送路徑看起來斷斷續續缺乏連續性。',
        desc: '點狀虛線連接線破壞進度流暢感'
      },
      {
        id: 'stepCardBg',
        name: '追蹤卡背景色 (Card Bg)',
        type: 'color',
        defaultValue: '#ffffff',
        cleanValue: '#f8fafc',
        targetValue: '#0f172a',
        isTrap: false,
        desc: '沉浸深藍夜間模式底色'
      },
      {
        id: 'stepCardRadius',
        name: '追蹤卡大圓角 (Card Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [16, 26],
        isTrap: false,
        desc: '20px 現代優雅收邊'
      },
      {
        id: 'stepGlitchInvertTrap',
        name: '負片色彩倒轉 (Invert Color Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '色彩負片反相：反相濾鏡讓介面色彩失衡刺眼。',
        desc: '反相 100% 刺眼負片效果'
      },
      {
        id: 'stepCardPadding',
        name: '空間呼吸留白 (Padding)',
        type: 'slider',
        unit: 'px',
        min: 6,
        max: 36,
        step: 2,
        defaultValue: 6,
        cleanValue: 6,
        targetValue: 24,
        targetRange: [18, 28],
        isTrap: false,
        desc: '終結內部壓迫擁擠感'
      },
      {
        id: 'stepNodeSize',
        name: '節點寬高尺寸 (Node Size)',
        type: 'slider',
        unit: 'px',
        min: 24,
        max: 54,
        step: 2,
        defaultValue: 28,
        cleanValue: 28,
        targetValue: 42,
        targetRange: [36, 46],
        isTrap: false,
        desc: '42px 舒適辨識節點大小'
      },
      {
        id: 'stepHeaderShakeTrap',
        name: '標題歪斜晃動 (Header Tilt Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '標題歪斜晃動：不穩定的旋轉會破壞即時狀態卡的嚴謹信賴感。',
        desc: '旋轉 -5 度造成標題傾斜'
      },
      {
        id: 'stepBadgeRadius',
        name: '狀態徽章弧度 (Badge Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 9999,
        step: 10,
        hasCapsuleToggle: true,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 9999,
        targetRange: [12, 9999],
        isTrap: false,
        desc: '9999px 膠囊配送狀態徽章'
      },
      {
        id: 'stepBadgeBlurTrap',
        name: '模糊失焦徽章 (Blur Badge Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '模糊失焦徽章：高斯模糊使重要狀態文字完全無法辨識。',
        desc: '模糊濾鏡遮蔽重要配送資訊'
      },
      {
        id: 'stepCardShadow',
        name: '懸浮立體景深 (Box Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [14, 28],
        isTrap: false,
        desc: '浮起卡片階層景深'
      }
    ]
  },
  {
    id: 'mission-8',
    number: 8,
    title: '告白牆對話氣泡卡',
    subtitle: '對話微動態：CSS 箭頭三角、Pastel 柔美漸層、:hover 心跳彈跳放大',
    client: {
      name: '芷晴（校園匿名告白牆小編）',
      avatar: '💌',
      dialogue: '「告白牆是全校流量最高的地方，但現在這篇置頂熱門告白長得像一張死氣沉沉的 Windows 記事本！沒有氣泡箭角、沒有粉嫩氛圍、按讚按鈕像灰色石塊... 請給它心跳動態與精緻對話框！」'
    },
    learningFocus: [
      '用 CSS border 三角技法精準定位對話框指向尖角',
      '用溫潤戀愛系粉嫩底色 (#fff1f2) 塑造沉浸告白情緒',
      '用 :hover scale(1.08) 製作充滿生命力的高反饋心跳按鈕',
      '用 line-height: 1.6 與呼吸留白提升深情長文的可讀性',
      '避開泛黃老舊與生硬黑框等情感氛圍殺手'
    ],
    htmlTemplate: `<div class="confession-card">
  <div class="post-header">
    <div class="sender-avatar">🌸</div>
    <div class="sender-meta">
      <span class="sender-tag">#告白管院男神 7788</span>
      <span class="post-time">10 分鐘前 • 匿名</span>
    </div>
  </div>
  <div class="chat-bubble">
    <p class="bubble-text">「今天在圖書館三樓穿米色毛衣寫演算法的你，陽光灑在你睫毛上的樣子真的太好看了... 明天還能遇到你嗎？🥺」</p>
    <div class="bubble-arrow"></div>
  </div>
  <div class="card-footer">
    <button class="heart-btn">
      <span class="heart-icon">💖</span>
      <span class="heart-count">520 心動</span>
    </button>
    <span class="reply-hint">38 則心動回覆</span>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
.confession-card {
  width: 330px;
  background: #ffffff;
  padding: 22px;
  border-radius: 20px;
  box-shadow: 0 15px 35px -5px rgba(244, 63, 94, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: inherit;
  border: 1px solid rgba(244, 63, 94, 0.12);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sender-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffe4e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.sender-meta {
  display: flex;
  flex-direction: column;
}

.sender-tag {
  font-size: 13px;
  font-weight: 700;
  color: #e11d48;
}

.post-time {
  font-size: 11px;
  color: #94a3b8;
}

.chat-bubble {
  position: relative;
  background: #fff1f2;
  padding: 16px 18px;
  border-radius: 18px;
  border-top-left-radius: 4px;
  border: 1px solid #fecdd3;
}

.bubble-text {
  font-size: 14px;
  color: #4c0519;
  line-height: 1.6;
  margin: 0;
}

.bubble-arrow {
  position: absolute;
  top: -8px;
  left: 12px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff1f2;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.heart-btn {
  background: #f43f5e;
  color: #ffffff;
  border: none;
  padding: 8px 18px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(244, 63, 94, 0.4);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.heart-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(244, 63, 94, 0.5);
}

.reply-hint {
  font-size: 12px;
  color: #94a3b8;
}`,
    targetInspector: {
      colors: [
        { label: '柔粉氣泡底色', hex: '#fff1f2', role: 'bubbleBg' },
        { label: '心動主色熱粉', hex: '#f43f5e', role: 'heartBtnBg' },
        { label: '標籤重點玫瑰', hex: '#e11d48', role: 'accentColor' },
        { label: '文字深邃紫紅', hex: '#4c0519', role: 'textColor' }
      ],
      metrics: [
        { label: '氣泡圓角', value: '18px (帶有微倒角尖角)' },
        { label: '對話箭頭', value: '精準頂端三角定位' },
        { label: '閱讀行高', value: '1.6 (24px 呼吸行距)' },
        { label: '懸停反饋', value: '1.08x 心跳彈跳' },
        { label: '柔霧背光', value: '景深 35px, 浪漫粉光' }
      ],
      tip: '💡 對話氣泡的靈魂在於小巧可愛的定位尖角與溫潤粉嫩的底色，搭配愛心 Hover 微彈跳，心動感破表！'
    },
    tools: [
      {
        id: 'bubbleRadius',
        name: '氣泡圓潤弧度 (Bubble Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 26,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 18,
        targetRange: [14, 22],
        isTrap: false,
        desc: '18px 柔潤圓角氣泡'
      },
      {
        id: 'bubbleBg',
        name: '柔粉氣泡底色 (Bubble Bg)',
        type: 'color',
        defaultValue: '#e2e8f0',
        cleanValue: '#cbd5e1',
        targetValue: '#fff1f2',
        isTrap: false,
        desc: '溫暖戀愛系柔粉底色'
      },
      {
        id: 'bubbleSharpTrap',
        name: '銳利刺手直角 (Sharp Bubble Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '銳利刺手直角：對話氣泡失去圓潤感會顯得冰冷生硬。',
        desc: '0px 銳利死硬直角'
      },
      {
        id: 'bubbleArrow',
        name: '對話氣泡尖角 (Bubble Arrow)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '精準定位對話框朝向尖角'
      },
      {
        id: 'confessCardPadding',
        name: '卡片內艙留白 (Padding)',
        type: 'slider',
        unit: 'px',
        min: 6,
        max: 36,
        step: 2,
        defaultValue: 6,
        cleanValue: 6,
        targetValue: 22,
        targetRange: [16, 26],
        isTrap: false,
        desc: '充裕呼吸排版空間'
      },
      {
        id: 'confessSepiaDarkTrap',
        name: '泛黃老舊復古濾鏡 (Sepia Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '泛黃復古濾鏡：使原本粉嫩的告白氛圍變得昏暗陳舊。',
        desc: '90% 復古老舊發黃濾鏡'
      },
      {
        id: 'confessCardRadius',
        name: '外卡精緻圓角 (Card Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 32,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [16, 26],
        isTrap: false,
        desc: '20px 現代卡片收邊'
      },
      {
        id: 'heartBtnBg',
        name: '心動主色 (Heart Button Bg)',
        type: 'color',
        defaultValue: '#64748b',
        cleanValue: '#94a3b8',
        targetValue: '#f43f5e',
        isTrap: false,
        desc: '心動玫瑰熱戀粉紅'
      },
      {
        id: 'confessHeavyBorderTrap',
        name: '粗重壓抑黑邊框 (Heavy Border Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '粗重黑邊框：生硬粗黑框會破壞浪漫輕柔的心動質感。',
        desc: '4px 粗重黑框封閉畫面'
      },
      {
        id: 'heartBtnGlow',
        name: '心動立體光暈 (Heart Glow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 16,
        targetRange: [10, 22],
        isTrap: false,
        desc: '立體按鍵柔光投影'
      },
      {
        id: 'heartHoverBounce',
        name: '心跳懸停放大 (Hover Scale)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: 'Hover 彈力 1.08x 微放大'
      },
      {
        id: 'bubbleArrowDistortTrap',
        name: '扭曲失控尖角 (Distorted Arrow Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '扭曲尖角：旋轉 45 度使箭角脫離氣泡邊界造成破圖感。',
        desc: '尖角旋轉 45 度破壞結構'
      },
      {
        id: 'confessLineHeight',
        name: '文字閱讀行高 (Line Height)',
        type: 'slider',
        unit: 'px',
        min: 16,
        max: 32,
        step: 1,
        defaultValue: 16,
        cleanValue: 16,
        targetValue: 24,
        targetRange: [20, 26],
        isTrap: false,
        desc: '24px 舒適情書閱讀行距'
      },
      {
        id: 'confessTextSpacingTrap',
        name: '鬆散脫節字元間距 (Scattered Text Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '字元過度鬆散：過寬的字距嚴重阻礙真摯告白文句的閱讀流暢性。',
        desc: '10px 字母過寬間距'
      },
      {
        id: 'confessCardShadow',
        name: '柔霧粉嫩背光 (Card Shadow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [14, 26],
        isTrap: false,
        desc: '溫潤多層次景深投影'
      }
    ]
  },
  {
    id: 'mission-9',
    number: 9,
    title: '賽博龐克全像霓虹通行證',
    subtitle: '炫炮未來：clip-path 科技切角、多重 text-shadow 霓虹發光、動態光束掃描線',
    client: {
      name: '凱文（元宇宙黑客松總召）',
      avatar: '🕶️',
      dialogue: '「這次黑客松主題是『賽博未來 2077』，但活動報到發的數位 Pass 竟然是一張像便利貼的白紙！完全沒有未來感、沒有霓虹發光、沒有全像掃描線！我要讓選手一打開手機就震撼到掉下巴！」'
    },
    learningFocus: [
      '用 clip-path: polygon() 削出硬派科技多邊形科技切角',
      '用 filter: drop-shadow 穿透切角，搭配 inset 堆疊極致霓虹光暈',
      '用純 CSS 漸層與 @keyframes 打造動態全像光束掃描線',
      '用電路青 (#00f2fe) 與霓虹洋紅 (#ff007f) 營造前衛色彩對沖',
      '辨別科技硬派視覺與惡意文字字型破壞的邊界'
    ],
    htmlTemplate: `<div class="cyber-pass-wrapper">
  <div class="cyber-pass">
    <div class="cyber-scanline"></div>
    <div class="cyber-header">
      <div class="cyber-badge">NEO-TOKYO // 2077</div>
      <span class="cyber-access">ACCESS: VIP</span>
    </div>
    <div class="cyber-body">
      <div class="cyber-avatar-wrapper">
        <div class="cyber-avatar">
          <span class="cyber-avatar-icon">⚡</span>
        </div>
      </div>
      <div class="cyber-info">
        <h2 class="cyber-name">CYBER_PHANTOM</h2>
        <p class="cyber-role">NEURAL PROTOCOL LEAD</p>
      </div>
    </div>
    <div class="cyber-footer">
      <div class="cyber-barcode">
        <div class="barcode-lines">||| | |||| | || |||</div>
        <span class="barcode-hash">0x7F99A_CYBER</span>
      </div>
      <div class="cyber-stamp">SYSTEM ACTIVE</div>
    </div>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
@keyframes scanlineAnim {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}

.cyber-pass-wrapper {
  filter: drop-shadow(0 0 20px rgba(0, 242, 254, 0.65));
}

.cyber-pass {
  position: relative;
  width: 320px;
  background: #05070f;
  padding: 24px;
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
  border: 2px solid #00f2fe;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.4), inset 0 0 20px rgba(0, 242, 254, 0.35);
  color: #00f2fe;
  font-family: monospace, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cyber-scanline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(180deg, transparent, rgba(0, 242, 254, 0.6), transparent);
  animation: scanlineAnim 3s linear infinite;
  pointer-events: none;
}

.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 242, 254, 0.3);
  padding-bottom: 8px;
}

.cyber-badge {
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 800;
  color: #ff007f;
  text-shadow: 0 0 8px rgba(255, 0, 127, 0.8);
}

.cyber-access {
  font-size: 10px;
  background: rgba(0, 242, 254, 0.15);
  padding: 2px 8px;
  border: 1px solid #00f2fe;
}

.cyber-body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cyber-avatar-wrapper {
  filter: drop-shadow(0 0 16px rgba(255, 0, 127, 0.7));
}

.cyber-avatar {
  width: 54px;
  height: 54px;
  background: rgba(255, 0, 127, 0.15);
  border: 2px solid #ff007f;
  box-shadow: inset 0 0 12px rgba(255, 0, 127, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}

.cyber-info {
  display: flex;
  flex-direction: column;
}

.cyber-name {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 1px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.9);
  margin: 0;
}

.cyber-role {
  font-size: 11px;
  color: #00f2fe;
  letter-spacing: 1px;
  margin: 4px 0 0 0;
}

.cyber-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid rgba(0, 242, 254, 0.2);
  padding-top: 12px;
}

.barcode-lines {
  font-family: monospace;
  font-size: 14px;
  letter-spacing: 3px;
  color: #ffffff;
}

.barcode-hash {
  font-size: 9px;
  color: #64748b;
}

.cyber-stamp {
  font-size: 10px;
  color: #ff007f;
  font-weight: 800;
  letter-spacing: 1px;
  border: 1px solid #ff007f;
  padding: 3px 6px;
  text-shadow: 0 0 5px rgba(255, 0, 127, 0.8);
}`,
    targetInspector: {
      colors: [
        { label: '電路青霓虹光', hex: '#00f2fe', role: 'cyberNeonColor' },
        { label: '賽博洋紅對沖', hex: '#ff007f', role: 'cyberAccentColor' },
        { label: '碳纖沉浸深黑', hex: '#05070f', role: 'cyberPassBg' },
        { label: '核心代碼純白', hex: '#ffffff', role: 'textColor' }
      ],
      metrics: [
        { label: '科技切角', value: '18px 多邊形 clip-path' },
        { label: '雙重光暈', value: '外層 drop-shadow 20px + 內層 inset 20px' },
        { label: '動態掃描', value: '3s 光束掃描線' },
        { label: '外骨骼邊界', value: '2px 金屬感邊框' },
        { label: '標題投影', value: '全像文字高光' }
      ],
      tip: '💡 核心秘訣：clip-path 會將外層 box-shadow 裁切掉，因此外光暈由父容器的 drop-shadow 穿透切角，內光暈由 inset 提供，霓虹質感瞬間爆棚！'
    },
    tools: [
      {
        id: 'cyberClipCorner',
        name: '科技切角外觀 (Polygon Cut Corner)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 18,
        targetRange: [14, 24],
        isTrap: false,
        desc: '硬派多邊形切角 clip-path'
      },
      {
        id: 'cyberNeonColor',
        name: '主霓虹青光 (Neon Cyan Color)',
        type: 'color',
        defaultValue: '#64748b',
        cleanValue: '#475569',
        targetValue: '#00f2fe',
        isTrap: false,
        desc: '賽博未來電路青'
      },
      {
        id: 'cyberWhiteBgTrap',
        name: '刺眼日光純白底 (White Bg Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '純白背景：白底完全沖淡霓虹自發光效果，失去賽博未來感。',
        desc: '純白底色沖毀自發光'
      },
      {
        id: 'cyberAccentColor',
        name: '副霓虹洋紅 (Neon Magenta Color)',
        type: 'color',
        defaultValue: '#000000',
        cleanValue: '#334155',
        targetValue: '#ff007f',
        isTrap: false,
        desc: '衝突高飽和霓虹洋紅'
      },
      {
        id: 'cyberNeonGlow',
        name: '雙重外光暈 (Neon Glow Blur)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 40,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 20,
        targetRange: [14, 28],
        isTrap: false,
        desc: '極致自發光霓虹雙重投影'
      },
      {
        id: 'cyberComicFontTrap',
        name: '漫畫手寫字體 (Comic Font Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '手寫漫畫字體：與硬派科技程式碼風格產生嚴重美學衝突。',
        desc: '手寫字體破壞科技冷硬感'
      },
      {
        id: 'cyberScanlineToggle',
        name: '全像掃描線束 (Scanline Anim)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '純 CSS 動態光束掃描線'
      },
      {
        id: 'cyberPassBg',
        name: '賽博碳纖底色 (Carbon Dark Bg)',
        type: 'color',
        defaultValue: '#ffffff',
        cleanValue: '#e2e8f0',
        targetValue: '#05070f',
        isTrap: false,
        desc: '沉浸深黑碳纖基底'
      },
      {
        id: 'cyberPassBlurTrap',
        name: '全像信號嚴重丟失 (Blur Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '信號高斯模糊：強烈模糊導致通行證識別碼完全失焦無法辨識。',
        desc: '5px 高斯模糊遮蔽卡面'
      },
      {
        id: 'cyberPassPadding',
        name: '機艙邊界留白 (Padding)',
        type: 'slider',
        unit: 'px',
        min: 8,
        max: 36,
        step: 2,
        defaultValue: 8,
        cleanValue: 8,
        targetValue: 24,
        targetRange: [18, 28],
        isTrap: false,
        desc: '硬派介面艙體留白'
      },
      {
        id: 'cyberTitleGlow',
        name: '標題全像投影光 (Title Text Glow)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: 'text-shadow 高強自發光'
      },
      {
        id: 'cyberCardSpinTrap',
        name: '瘋狂翻滾失重 (Spin Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '顛倒倒置：180度上下顛倒讓整張通行證無法正常閱讀。',
        desc: '旋轉 180 度上下顛倒'
      },
      {
        id: 'cyberBorderWidth',
        name: '科技外骨骼 (Cyber Border Width)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 1,
        cleanValue: 1,
        targetValue: 2,
        targetRange: [2, 3],
        isTrap: false,
        desc: '2px 俐落金屬外輪廓'
      },
      {
        id: 'cyberRainbowDottedTrap',
        name: '繽紛點狀小丑邊框 (Rainbow Dots Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '小丑點狀邊框：廉價點狀邊框破壞金屬科技流線感。',
        desc: '點狀廉價彩色外框'
      },
      {
        id: 'cyberAvatarGlow',
        name: '核心晶片外環光 (Chip Core Glow)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 16,
        targetRange: [10, 22],
        isTrap: false,
        desc: '洋紅能量核心光暈'
      }
    ]
  },
  {
    id: 'mission-10',
    number: 10,
    title: '3D 透視炫彩流光稜鏡卡',
    subtitle: '極致終章：3D perspective 傾角、conic-gradient 極光旋轉邊框與金屬流光',
    client: {
      name: '薇拉（數位藝術雙年展策展人）',
      avatar: '💎',
      dialogue: '「這是本年度壓軸特展的數位貴賓黑卡！但我現在拿到的版本平得像一張厚紙板，完全沒有晶體稜鏡的折射光、沒有 3D 空間懸浮感、邊框死灰暗淡。這是最後一關了，請為這件作品注入宇宙級的光影魔法！」'
    },
    learningFocus: [
      '用 perspective 與 rotateX/rotateY 構建真 3D 懸浮空間感',
      '用 conic-gradient 360° 旋轉打造極光彩虹流光邊緣',
      '用 backdrop-filter: blur(16px) 與黑曜石半透明呈現深邃晶體質感',
      '用 background-clip: text 打造金屬白銀與天藍反射的燙金文字',
      '辨別頂級奢華設計與俗氣混亂雜訊的邊界線'
    ],
    htmlTemplate: `<div class="prism-container">
  <div class="prism-card">
    <div class="aurora-glow-rim"></div>
    <div class="prism-inner">
      <div class="prism-top">
        <div class="prism-badge">AURORA // 2026</div>
        <span class="crystal-icon">💎</span>
      </div>
      <div class="prism-middle">
        <h1 class="prism-title">PRISM BLACK</h1>
        <p class="prism-subtitle">INFINITE DIMENSION PASS</p>
      </div>
      <div class="prism-bottom">
        <div class="chip-slot">
          <div class="hologram-chip"></div>
          <span class="card-number">•••• 8899</span>
        </div>
        <span class="vip-grade">PLATINUM VIP</span>
      </div>
    </div>
  </div>
</div>`,
    designerTargetCss: `/* 🎯 設計師標準成果 (100分) */
@keyframes auroraRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.prism-container {
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.prism-card {
  position: relative;
  width: 330px;
  height: 200px;
  border-radius: 24px;
  background: #0b0f19;
  transform: rotateX(12deg) rotateY(-12deg);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: -15px 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2);
  display: flex;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.prism-card:hover {
  transform: rotateX(0deg) rotateY(0deg) scale(1.05);
}

.aurora-glow-rim {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, #6366f1, #ec4899, #00f2fe, #10b981, #6366f1);
  animation: auroraRotate 8s linear infinite;
  opacity: 0.35;
  filter: blur(20px);
}

.prism-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 22px;
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.prism-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prism-badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #38bdf8;
}

.crystal-icon {
  font-size: 18px;
  filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.8));
}

.prism-middle {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.prism-title {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 3px;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.prism-subtitle {
  font-size: 10px;
  color: #94a3b8;
  letter-spacing: 2px;
  margin: 0;
}

.prism-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chip-slot {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hologram-chip {
  width: 32px;
  height: 24px;
  border-radius: 6px;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  box-shadow: 0 0 14px rgba(251, 191, 36, 0.6);
}

.card-number {
  font-family: monospace;
  font-size: 12px;
  color: #e2e8f0;
  letter-spacing: 1px;
}

.vip-grade {
  font-size: 10px;
  font-weight: 800;
  color: #f43f5e;
  letter-spacing: 1px;
  background: rgba(244, 63, 94, 0.15);
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(244, 63, 94, 0.3);
}`,
    targetInspector: {
      colors: [
        { label: '黑曜半透深黑', hex: '#0b0f19', role: 'prismGlassBg' },
        { label: '極光青天藍光', hex: '#38bdf8', role: 'accentColor' },
        { label: '金屬晶片琥珀', hex: '#fbbf24', role: 'chipGlow' },
        { label: '尊榮紫紅標籤', hex: '#f43f5e', role: 'tagColor' }
      ],
      metrics: [
        { label: '3D 傾角', value: 'rotateX(12deg) rotateY(-12deg)' },
        { label: '極光光環', value: 'conic-gradient 360° 旋轉' },
        { label: '磨砂霧面', value: 'backdrop-filter: blur(16px)' },
        { label: '金屬標題', value: 'background-clip: text 燙金' },
        { label: '立體投影', value: '深度 50px 3D 浮空光影' }
      ],
      tip: '💡 3D 稜鏡卡的核心是透視視角配合旋轉極光光環，加上蘋果風格的磨砂玻璃與金屬漸層字體，展現現代最高階 UI 質感！'
    },
    tools: [
      {
        id: 'prismTilt',
        name: '3D 空間透視傾斜 (3D Transform Tilt)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '3D perspective 透視空間傾角'
      },
      {
        id: 'prismAuroraBorder',
        name: '極光旋轉動態 (Conic Aurora Rim)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: 'conic-gradient 360° 旋轉彩虹極光'
      },
      {
        id: 'prismFlatZeroTrap',
        name: '拍扁直角厚紙板 (Flat Board Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '拍扁厚紙板：移除 3D 與圓角讓黑卡失去立體晶體稜鏡感。',
        desc: '扁平直角失去立體透視'
      },
      {
        id: 'prismGlassBg',
        name: '磨砂黑曜半透明底 (Obsidian Glass Bg)',
        type: 'color',
        defaultValue: '#e2e8f0',
        cleanValue: '#cbd5e1',
        targetValue: '#0b0f19',
        isTrap: false,
        desc: '深邃高貴黑曜石基底'
      },
      {
        id: 'prismBackdropBlur',
        name: '晶體折射模糊 (Backdrop Blur)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 30,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 16,
        targetRange: [10, 22],
        isTrap: false,
        desc: '16px 蘋果風半透明折射'
      },
      {
        id: 'prismMuddyGreenTrap',
        name: '渾濁泥濘草綠底 (Muddy Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '渾濁泥濘色：失去黑曜石深邃奢華，色彩髒污混濁。',
        desc: '髒污草綠色破壞高級質感'
      },
      {
        id: 'prismRadius',
        name: '稜鏡切面圓角 (Card Radius)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 36,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 24,
        targetRange: [18, 28],
        isTrap: false,
        desc: '24px 柔潤圓角收邊'
      },
      {
        id: 'prismPadding',
        name: '機位留白 (Padding)',
        type: 'slider',
        unit: 'px',
        min: 8,
        max: 40,
        step: 2,
        defaultValue: 8,
        cleanValue: 8,
        targetValue: 22,
        targetRange: [16, 26],
        isTrap: false,
        desc: '奢華貴賓艙位留白'
      },
      {
        id: 'prismDistortScaleTrap',
        name: '壓扁失真比例 (Distort Scale Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '壓縮失真：非等比縮放導致卡面字體與晶片嚴重變形。',
        desc: 'X/Y 不等比壓縮變形'
      },
      {
        id: 'prismShadow',
        name: '懸浮暗黑深邃陰影 (Box Shadow Depth)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 50,
        step: 2,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 30,
        targetRange: [20, 40],
        isTrap: false,
        desc: '3D 浮空深邃投影'
      },
      {
        id: 'prismTitleReflect',
        name: '金屬質感文字漸層 (Metallic Text Clip)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '燙金銀白流光文字背景裁切'
      },
      {
        id: 'prismPixelateBorderTrap',
        name: '粗糙鋸齒紅綠邊框 (Pixel Border Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '粗糙凸起紅邊：俗氣邊框樣式徹底毀掉極簡前衛設計。',
        desc: '5px ridge 凸起俗氣紅框'
      },
      {
        id: 'prismBorderHighlight',
        name: '高折射晶體邊框 (Crystal Highlight Rim)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: true,
        isTrap: false,
        desc: '極細晶體高光反射邊界'
      },
      {
        id: 'prismExtremeSkewTrap',
        name: '失速嚴重翻覆 (Skew Trap)',
        type: 'toggle',
        defaultValue: false,
        cleanValue: true,
        targetValue: false,
        isTrap: true,
        trapWarning: '嚴重失速傾斜：傾斜 25 度使卡片飛出視線重心。',
        desc: '傾斜 25 度劇烈歪斜'
      },
      {
        id: 'prismChipGlow',
        name: '核心晶片高光反饋 (Chip Glow Blur)',
        type: 'slider',
        unit: 'px',
        min: 0,
        max: 25,
        step: 1,
        defaultValue: 0,
        cleanValue: 0,
        targetValue: 14,
        targetRange: [8, 18],
        isTrap: false,
        desc: '金色智慧晶片光暈'
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
  heroBorderHeavyTrap: 'border: 4px solid',
  // mission-6
  discRadius: 'border-radius (唱片)',
  discSpin: 'animation: spin',
  musicBg: 'background',
  musicRadius: 'border-radius (機身)',
  musicPadding: 'padding',
  progressColor: 'background (進度條)',
  progressHeight: 'height (進度條)',
  playBtnBg: 'background (播放鍵)',
  playBtnGlow: 'box-shadow (播放鍵)',
  musicShadow: 'box-shadow (機身)',
  discSquareTrap: 'border-radius: 0px',
  trackSkewTrap: 'transform: skew()',
  neonBorderTrap: 'border: 4px double',
  progressStripeTrap: 'repeating-linear-gradient',
  controlsScatterTrap: 'letter-spacing (間距)',

  // mission-7
  stepNodeRadius: 'border-radius (節點)',
  stepPulseGlow: 'animation: pulse',
  stepLineHeight: 'height (步進軌道)',
  stepActiveColor: 'color / border-color',
  stepCardBg: 'background',
  stepCardRadius: 'border-radius (卡片)',
  stepCardPadding: 'padding',
  stepNodeSize: 'width / height (節點)',
  stepBadgeRadius: 'border-radius (徽章)',
  stepCardShadow: 'box-shadow',
  stepNodeSquareTrap: 'border-radius: 0px',
  stepDashedTrackTrap: 'border-style: dotted',
  stepGlitchInvertTrap: 'filter: invert()',
  stepHeaderShakeTrap: 'transform: rotate()',
  stepBadgeBlurTrap: 'filter: blur()',

  // mission-8
  bubbleRadius: 'border-radius (氣泡)',
  bubbleBg: 'background (氣泡)',
  bubbleArrow: 'border-bottom (尖角)',
  confessCardPadding: 'padding',
  confessCardRadius: 'border-radius (外框)',
  heartBtnBg: 'background (愛心按鈕)',
  heartBtnGlow: 'box-shadow (愛心光暈)',
  heartHoverBounce: ':hover { transform: scale }',
  confessLineHeight: 'line-height (行高)',
  confessCardShadow: 'box-shadow',
  bubbleSharpTrap: 'border-radius: 0px',
  confessSepiaDarkTrap: 'filter: sepia()',
  confessHeavyBorderTrap: 'border: 4px solid',
  bubbleArrowDistortTrap: 'transform: rotate()',
  confessTextSpacingTrap: 'letter-spacing',

  // mission-9
  cyberClipCorner: 'clip-path: polygon()',
  cyberNeonColor: 'color / border-color (青光)',
  cyberAccentColor: 'color / background (洋紅)',
  cyberNeonGlow: 'box-shadow (霓虹雙重光)',
  cyberScanlineToggle: 'animation: scanline',
  cyberPassBg: 'background',
  cyberPassPadding: 'padding',
  cyberTitleGlow: 'text-shadow (全像高光)',
  cyberBorderWidth: 'border-width',
  cyberAvatarGlow: 'box-shadow (晶片核心)',
  cyberWhiteBgTrap: 'background: #ffffff',
  cyberComicFontTrap: 'font-family: cursive',
  cyberPassBlurTrap: 'filter: blur()',
  cyberCardSpinTrap: 'transform: rotate(180deg)',
  cyberRainbowDottedTrap: 'border-style: dotted',

  // mission-10
  prismTilt: 'transform: rotateX() rotateY()',
  prismAuroraBorder: 'conic-gradient / animation',
  prismGlassBg: 'background (黑曜半透明)',
  prismBackdropBlur: 'backdrop-filter: blur()',
  prismRadius: 'border-radius (稜鏡)',
  prismPadding: 'padding',
  prismShadow: 'box-shadow (深邃暗影)',
  prismTitleReflect: 'background-clip: text',
  prismBorderHighlight: 'border: 1px solid',
  prismChipGlow: 'box-shadow (晶片高光)',
  prismFlatZeroTrap: 'transform: none',
  prismMuddyGreenTrap: 'background: #2b3a1a',
  prismDistortScaleTrap: 'transform: scale()',
  prismPixelateBorderTrap: 'border: 5px ridge',
  prismExtremeSkewTrap: 'transform: skewY()'
};

// 自動為每關的 tools 注入 cssProperty
MISSIONS.forEach(mission => {
  mission.tools.forEach(tool => {
    tool.cssProperty = TOOL_CSS_MAP[tool.id] || tool.id;
  });
});
