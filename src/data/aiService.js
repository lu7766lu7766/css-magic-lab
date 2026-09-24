/**
 * AI 視覺意圖轉譯與目標吻合度評分服務
 * 具備 100% 離線即時語意剖析引擎與 Cloudflare Worker 代理支援
 */

/**
 * 自然語言意圖轉譯
 * 遵循決策共識：每次嚴格只提取 1~2 個最關鍵屬性，提供生活化白話註解，避免整包代碼黑盒子
 */
export async function parseNaturalLanguageIntent(userPrompt, mission, currentCss) {
  const p = userPrompt.toLowerCase().trim();

  // 若使用者有設定自訂 Cloudflare Worker API URL，可嘗試發送非同步請求
  const customApiUrl = typeof localStorage !== 'undefined' ? localStorage.getItem('css_lab_worker_url') : null;
  if (customApiUrl) {
    try {
      const resp = await fetch(`${customApiUrl}/api/beautify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId: mission.id, prompt: userPrompt, currentCss })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.patches && data.patches.length > 0) {
          return data;
        }
      }
    } catch {
      console.warn('Worker API 離線，自動切換為本地極速語意引擎');
    }
  }

  // 本地智慧語意規則庫（Local Semantic Engine，零延遲、保證 100% 穩定可用）
  const patches = [];

  // 1. 圓角與形狀
  if (p.includes('圓角') || p.includes('膠囊') || p.includes('磨平') || p.includes('圓') || p.includes('形狀')) {
    if (mission.id === 'mission-1') {
      patches.push({
        selector: '.action-btn',
        property: 'border-radius',
        value: '9999px',
        explanation: '💡 border-radius: 9999px 磨平死板直角，化身為現代流暢膠囊！'
      });
      patches.push({
        selector: '.action-btn',
        property: 'border',
        value: 'none',
        explanation: '💡 移除老舊灰色邊框，使膠囊造型更加俐落純淨。'
      });
    } else if (mission.id === 'mission-2') {
      if (p.includes('頭像') || p.includes('照片') || p.includes('大頭貼')) {
        patches.push({
          selector: '.avatar-img',
          property: 'border-radius',
          value: '50%',
          explanation: '💡 border-radius: 50% 將方形大頭貼裁切為正圓形，親和力倍增！'
        });
      } else {
        patches.push({
          selector: '.profile-card',
          property: 'border-radius',
          value: '24px',
          explanation: '💡 給卡片容器加上 24px 大圓角，視覺溫和且極具現代感。'
        });
      }
    } else if (mission.id === 'mission-3') {
      patches.push({
        selector: '.product-card',
        property: 'border-radius',
        value: '20px',
        explanation: '💡 設定 20px 圓角，完美包覆美食內容不突兀。'
      });
    } else if (mission.id === 'mission-4') {
      patches.push({
        selector: '.form-input',
        property: 'border-radius',
        value: '12px',
        explanation: '💡 輸入框圓弧化（12px），擺脫冷硬方框。'
      });
    } else {
      patches.push({
        selector: '.hero-banner',
        property: 'border-radius',
        value: '28px',
        explanation: '💡 橫幅外框設定 28px 大圓弧，收斂視覺邊界。'
      });
    }
  }

  // 2. 陰影與立體光影
  if (p.includes('陰影') || p.includes('浮空') || p.includes('光暈') || p.includes('立體') || p.includes('發光') || p.includes('霓虹')) {
    if (mission.id === 'mission-1') {
      patches.push({
        selector: '.action-btn',
        property: 'box-shadow',
        value: '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
        explanation: '💡 box-shadow 營造由上往下的光照陰影，讓按鈕彷彿懸浮在空中！'
      });
    } else if (mission.id === 'mission-2') {
      patches.push({
        selector: '.profile-card',
        property: 'box-shadow',
        value: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
        explanation: '💡 深色瀰散大陰影，營造極富層次的立體景深！'
      });
    } else if (mission.id === 'mission-3') {
      patches.push({
        selector: '.product-card',
        property: 'box-shadow',
        value: '0 12px 30px -8px rgba(0, 0, 0, 0.4)',
        explanation: '💡 陰影向上托起商品卡，讓美食從背景中跳脫出來！'
      });
    } else if (mission.id === 'mission-4') {
      patches.push({
        selector: '.form-input:focus',
        property: 'box-shadow',
        value: '0 0 0 4px rgba(56, 189, 248, 0.25)',
        explanation: '💡 聚集時散發天藍光暈環，提供明確清晰的打字焦點！'
      });
    } else {
      patches.push({
        selector: '.hero-banner',
        property: 'box-shadow',
        value: '0 30px 60px -15px rgba(0, 0, 0, 0.8)',
        explanation: '💡 沉浸式旗艦暗影，襯托出首頁橫幅的主導氣勢！'
      });
    }
  }

  // 3. 留白與呼吸空間
  if (p.includes('留白') || p.includes('內距') || p.includes('擠') || p.includes('間距') || p.includes('空間') || p.includes('呼吸') || p.includes('padding') || p.includes('gap')) {
    if (mission.id === 'mission-1') {
      patches.push({
        selector: '.action-btn',
        property: 'padding',
        value: '14px 32px',
        explanation: '💡 padding: 14px 32px 大幅擴充可點擊面積，按鈕視覺更大氣！'
      });
    } else if (mission.id === 'mission-2') {
      patches.push({
        selector: '.profile-card',
        property: 'padding',
        value: '28px',
        explanation: '💡 將內距拉大到 28px，終結文字被容器邊框擠壓的窒息感！'
      });
    } else if (mission.id === 'mission-4') {
      patches.push({
        selector: '.login-form',
        property: 'gap',
        value: '20px',
        explanation: '💡 gap: 20px 讓每個輸入框之間保持舒適呼吸距離！'
      });
    } else if (mission.id === 'mission-5') {
      patches.push({
        selector: '.hero-banner',
        property: 'padding',
        value: '44px 36px',
        explanation: '💡 旗艦級大留白，給予標題與按鈕充足的展示舞台！'
      });
    }
  }

  // 4. 色彩與漸層
  if (p.includes('漸層') || p.includes('背景') || p.includes('顏色') || p.includes('紫') || p.includes('深色') || p.includes('黑') || p.includes('藍') || p.includes('白') || p.includes('粉')) {
    if (mission.id === 'mission-1') {
      patches.push({
        selector: '.action-btn',
        property: 'background',
        value: 'linear-gradient(135deg, #6366f1, #a855f7)',
        explanation: '💡 linear-gradient(135deg...) 注入電競流光色彩，科技感爆棚！'
      });
      patches.push({
        selector: '.action-btn',
        property: 'color',
        value: '#ffffff',
        explanation: '💡 換成純白高對比文字，確保在漸層背景上易讀性 100%。'
      });
    } else if (mission.id === 'mission-2') {
      patches.push({
        selector: '.profile-card',
        property: 'background',
        value: 'rgba(15, 23, 42, 0.75)',
        explanation: '💡 深藍灰半透明底色，搭配磨砂玻璃最顯高級質感。'
      });
      patches.push({
        selector: '.profile-card',
        property: 'backdrop-filter',
        value: 'blur(16px)',
        explanation: '💡 backdrop-filter: blur(16px) 營造蘋果風霧面玻璃擬態！'
      });
    } else if (mission.id === 'mission-3') {
      patches.push({
        selector: '.product-price',
        property: 'color',
        value: '#f43f5e',
        explanation: '💡 特價使用鮮明玫紅色，一眼抓住消費者的視覺焦點！'
      });
    } else if (mission.id === 'mission-4') {
      patches.push({
        selector: '.submit-btn',
        property: 'background',
        value: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
        explanation: '💡 登入主按鈕使用天藍漸層，引導使用者完成核心動作。'
      });
    } else {
      patches.push({
        selector: '.hero-banner',
        property: 'background',
        value: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.25), transparent 70%), #090d16',
        explanation: '💡 頂端放射狀紫光搭配深黑夜空，打造發布會級震撼光場！'
      });
    }
  }

  // 5. 特殊技法：文字漸層裁切、溢出遮罩、浮空定位、懸停動態
  if (p.includes('文字漸層') || p.includes('字體') || p.includes('標題') || p.includes('大字') || p.includes('裁切')) {
    if (mission.id === 'mission-5') {
      patches.push({
        selector: '.hero-title',
        property: 'background',
        value: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)',
        explanation: '💡 為大標題注入白紫漸層底色。'
      });
      patches.push({
        selector: '.hero-title',
        property: '-webkit-background-clip',
        value: 'text',
        explanation: '💡 -webkit-background-clip: text 將漸層精準裁切入文字筆畫內！'
      });
    } else if (mission.id === 'mission-3') {
      patches.push({
        selector: '.product-card',
        property: 'overflow',
        value: 'hidden',
        explanation: '💡 overflow: hidden 鎖住溢出邊界，防止美食照片破版！'
      });
    }
  }

  // 6. 滑鼠懸停反饋
  if (p.includes('hover') || p.includes('懸停') || p.includes('移過去') || p.includes('動態') || p.includes('上浮')) {
    patches.push({
      selector: mission.id === 'mission-1' ? '.action-btn:hover' : '.product-card:hover',
      property: 'transform',
      value: 'translateY(-3px)',
      explanation: '💡 translateY(-3px) 在滑鼠移過時微微浮空，提供絲滑反饋！'
    });
  }

  // 若沒匹配到關鍵字，給予啟發式微調補丁
  if (patches.length === 0) {
    patches.push({
      selector: mission.intentPills[0].diffLines[0].split(':')[0].trim(),
      property: 'border-radius',
      value: '16px',
      explanation: '💡 智慧美化：為當前元件修飾柔和圓角與邊界留白，提升現代感。'
    });
  }

  // 保證每次只提取 1~2 個關鍵屬性
  return {
    rawPrompt: userPrompt,
    patches: patches.slice(0, 2)
  };
}

const MISSION_TOOL_DIMENSIONS = {
  'mission-1': {
    colorHarmony: ['bgColor', 'gradientToggle', 'gradientColor', 'textColor'],
    whitespace: ['paddingY', 'paddingX'],
    elevation: ['borderRadius', 'shadowBlur'],
    hierarchy: ['fontWeight', 'hoverY']
  },
  'mission-2': {
    colorHarmony: ['cardBg', 'avatarRingColor', 'userRoleColor'],
    whitespace: ['cardPadding'],
    elevation: ['cardRadius', 'avatarRadius', 'cardShadow', 'backdropBlur'],
    hierarchy: ['userNameSize', 'userNameWeight']
  },
  'mission-3': {
    colorHarmony: ['cardBg', 'badgeBg', 'priceColor'],
    whitespace: ['overflowToggle', 'foodImgFit'],
    elevation: ['cardRadius', 'cardShadow'],
    hierarchy: ['badgePosition', 'badgeTop', 'priceSize']
  },
  'mission-4': {
    colorHarmony: ['focusColor', 'submitBtnBg'],
    whitespace: ['formGap', 'formPadding', 'inputPadding'],
    elevation: ['inputRadius', 'formRadius', 'submitRadius', 'formShadow'],
    hierarchy: ['focusGlowToggle']
  },
  'mission-5': {
    colorHarmony: ['ambientGlowToggle', 'primaryBtnBg', 'secondaryGhostToggle'],
    whitespace: ['heroPadding'],
    elevation: ['heroRadius', 'primaryBtnRadius', 'heroShadow'],
    hierarchy: ['titleGradientToggle', 'titleSize', 'titleWeight']
  },
  'mission-6': {
    colorHarmony: ['musicBg', 'progressColor', 'playBtnBg'],
    whitespace: ['musicPadding', 'progressHeight'],
    elevation: ['musicRadius', 'discRadius', 'musicShadow', 'playBtnGlow'],
    hierarchy: ['discSpin']
  },
  'mission-7': {
    colorHarmony: ['stepActiveColor', 'stepCardBg'],
    whitespace: ['stepCardPadding', 'stepLineHeight'],
    elevation: ['stepNodeRadius', 'stepCardRadius', 'stepBadgeRadius', 'stepCardShadow'],
    hierarchy: ['stepPulseGlow', 'stepNodeSize']
  },
  'mission-8': {
    colorHarmony: ['bubbleBg', 'heartBtnBg'],
    whitespace: ['confessCardPadding', 'confessLineHeight'],
    elevation: ['bubbleRadius', 'confessCardRadius', 'heartBtnGlow', 'confessCardShadow'],
    hierarchy: ['bubbleArrow', 'heartHoverBounce']
  },
  'mission-9': {
    colorHarmony: ['cyberNeonColor', 'cyberAccentColor', 'cyberPassBg'],
    whitespace: ['cyberPassPadding', 'cyberBorderWidth'],
    elevation: ['cyberClipCorner', 'cyberNeonGlow', 'cyberAvatarGlow'],
    hierarchy: ['cyberScanlineToggle', 'cyberTitleGlow']
  },
  'mission-10': {
    colorHarmony: ['prismGlassBg', 'prismAuroraBorder'],
    whitespace: ['prismPadding'],
    elevation: ['prismTilt', 'prismRadius', 'prismShadow', 'prismBackdropBlur', 'prismChipGlow'],
    hierarchy: ['prismTitleReflect', 'prismBorderHighlight']
  }
};

/**
 * 依據連續漸進比例制計算單一工具得分 (0 ~ 1.0)
 */
function calculateToolScore(tool, state) {
  if (!state || !state.enabled) return 0;

  // 1. Toggle 類型（啟用即代表生效開啟）
  if (tool.type === 'toggle') {
    const isValTrue = Boolean(state.enabled);
    return (tool.targetValue === isValTrue) ? 1.0 : 0.5;
  }

  // 2. Select 類型
  if (tool.type === 'select') {
    return (String(state.value) === String(tool.targetValue)) ? 1.0 : 0.5;
  }

  // 3. Color 類型
  if (tool.type === 'color') {
    const valHex = String(state.value || '').toLowerCase();
    const targetHex = String(tool.targetValue || '').toLowerCase();
    if (valHex === targetHex) return 1.0;
    return 0.7; // 使用者選擇了自訂色彩
  }

  // 4. Slider 類型（連續漸進比例制）
  if (tool.type === 'slider') {
    const val = Number(state.value);
    // 精準落在設計師目標區間或目標值
    if (tool.targetRange && val >= tool.targetRange[0] && val <= tool.targetRange[1]) {
      return 1.0;
    }
    if (val === tool.targetValue) return 1.0;

    // 計算連續漸進距離比率 (離目標越近分數越高)
    const targetMid = tool.targetRange
      ? (tool.targetRange[0] + tool.targetRange[1]) / 2
      : tool.targetValue;
    const span = Math.max(1, (tool.max - tool.min));
    const dist = Math.abs(val - targetMid);
    return Math.max(0.1, 1 - (dist / span));
  }

  return 0.5;
}

/**
 * 目標範例吻合度評分引擎
 * 評估 4 大維度：色彩調和、空間呼吸、光影層次、文字結構
 */
export function evaluateMission(mission, currentCss, currentToolStates = {}) {
  const css = currentCss ? currentCss.toLowerCase() : '';
  const mid = mission?.id;

  // 檢查干擾陷阱項 (Traps)
  let trapPenalty = 0;
  const trapWarnings = [];
  if (mission?.tools && Array.isArray(mission.tools)) {
    mission.tools.forEach(tool => {
      if (tool.isTrap && currentToolStates[tool.id]?.enabled) {
        trapPenalty += 15;
        trapWarnings.push({
          id: tool.id,
          name: tool.name,
          warning: tool.trapWarning || `不建議啟用「${tool.name}」，這會破壞現代視覺質感。`
        });
      }
    });
  }

  const enabledNonTraps = (mission?.tools || []).filter(t => !t.isTrap && currentToolStates[t.id]?.enabled);
  const dimMap = MISSION_TOOL_DIMENSIONS[mid];

  let colorScore = 15;
  let whitespaceScore = 15;
  let elevationScore = 15;
  let hierarchyScore = 15;

  // 若使用者完全尚未啟用任何非陷阱工具（初始陽春狀態）
  const isZeroState = enabledNonTraps.length === 0;

  if (isZeroState) {
    colorScore = 15;
    whitespaceScore = 15;
    elevationScore = 15;
    hierarchyScore = 15;
  } else if (dimMap && mission?.tools) {
    const toolsById = {};
    mission.tools.forEach(t => { toolsById[t.id] = t; });

    const evalDimension = (toolIds) => {
      if (!toolIds || toolIds.length === 0) return 100;
      const sum = toolIds.reduce((acc, tid) => {
        const t = toolsById[tid];
        return acc + (t ? calculateToolScore(t, currentToolStates[tid]) : 0);
      }, 0);
      return Math.round(15 + 85 * (sum / toolIds.length));
    };

    colorScore = evalDimension(dimMap.colorHarmony);
    whitespaceScore = evalDimension(dimMap.whitespace);
    elevationScore = evalDimension(dimMap.elevation);
    hierarchyScore = evalDimension(dimMap.hierarchy);
  }

  // 限制各維度在 10 ~ 100
  colorScore = Math.min(100, Math.max(10, colorScore));
  whitespaceScore = Math.min(100, Math.max(10, whitespaceScore));
  elevationScore = Math.min(100, Math.max(10, elevationScore));
  hierarchyScore = Math.min(100, Math.max(10, hierarchyScore));

  // 計算加權總分 (扣除干擾項懲罰)
  let totalScore = Math.round(
    colorScore * 0.25 +
    whitespaceScore * 0.25 +
    elevationScore * 0.25 +
    hierarchyScore * 0.25
  );

  totalScore = Math.max(10, totalScore - trapPenalty);

  // 判定階梯星級
  let stars = 0;
  if (totalScore >= 90) stars = 3;
  else if (totalScore >= 80) stars = 2;
  else if (totalScore >= 70) stars = 1;

  // 救命錦囊與設計師短評
  let critique = '';
  let rescueHint = null;

  if (isZeroState) {
    critique = '元件處於初始陽春狀態，四大美學指標均未達標。請參考學習重點啟用相應 CSS 控制項。';
    rescueHint = `💡 第一步指引：${mission?.learningFocus?.[0] || '試著點擊開啟留白或色彩工具！'}`;
  } else if (trapWarnings.length > 0) {
    critique = `注意！你開啟了 ${trapWarnings.length} 項干擾屬性，導致評分受到扣分。請參考下方的警示說明將它們關閉！`;
    rescueHint = `⚠️ 提醒：你開啟了 ${trapWarnings.length} 項不推薦的干擾屬性【${trapWarnings.map(t => t.name).join('、')}】！請在下方工具箱找到該按鈕「再點一下」關閉還原，分數即可回升！`;
  } else if (totalScore >= 90) {
    critique = `太不可思議了！完美的比例、細膩的留白與光影層次，成功避開了所有干擾項，完全達到了設計師的高階水準！${mission?.client?.name || ''} 對你五體投地！`;
  } else if (totalScore >= 80) {
    critique = '非常出色！現代感大幅提升，已掌握了 80% 以上的核心設計法則，只要再微調一點點細節就能達到大師境界！';
  } else if (totalScore >= 70) {
    critique = '恭喜合格過關！成功擺脫了陽春破版的噩夢，視覺已經具備現代 UI 的基本質感！';
  } else {
    critique = '還差一點點就能及格（70分）！目前的修改已經朝著正確方向前進，請參考下方的救命錦囊補強最弱項！';
    const scores = [
      { name: '空間呼吸 (Padding/Gap)', score: whitespaceScore, hint: '文字和內容緊貼著外框毫無留白！試著開啟「內留白」或「間距」工具並拖動滑桿，分數就能大幅躍升！' },
      { name: '邊界與光影 (Radius/Shadow)', score: elevationScore, hint: '元件邊角太銳利且沒有陰影層次，看起來很扁平！試著開啟「圓角修飾」或「立體陰影」並拉大數值！' },
      { name: '色彩調和 (Gradient/Color)', score: colorScore, hint: '背景顏色有些沉悶或對比度不夠，建議對照右側目標配色調整，或開啟漸層流光模式！' },
      { name: '文字與結構 (Hierarchy)', score: hierarchyScore, hint: '標題和內文字體粗細太接近，主次不明顯；請試著將字重切換至 700 或 800 加粗核心標題！' }
    ];
    scores.sort((a, b) => a.score - b.score);
    rescueHint = scores[0].hint;
  }

  return {
    score: totalScore,
    stars,
    dimensions: {
      colorHarmony: colorScore,
      whitespace: whitespaceScore,
      elevation: elevationScore,
      hierarchy: hierarchyScore
    },
    trapWarnings,
    critique,
    rescueHint,
    isPassed: totalScore >= 70
  };
}

/**
 * 將 CSS Patches 智能合併至既有 CSS 字串
 */
export function applyCssPatches(currentCss, patches) {
  let updatedCss = currentCss;
  const appliedList = [];

  for (const patch of patches) {
    const { selector, property, value, explanation } = patch;
    
    // 檢查是否有對應的 selector 區塊
    const selectorRegex = new RegExp(`(${escapeRegex(selector)}\\s*\\{[^}]*)(\\})`, 'm');
    
    if (selectorRegex.test(updatedCss)) {
      // 區塊已存在，檢查是否已包含該 property
      const propRegex = new RegExp(`(\\s*${escapeRegex(property)}:\\s*)[^;]+;`, 'i');
      if (propRegex.test(updatedCss)) {
        // 替換現有屬性
        updatedCss = updatedCss.replace(propRegex, `$1${value}; /* ${explanation.replace('💡 ', '')} */`);
      } else {
        // 在結尾大括號前插入
        updatedCss = updatedCss.replace(
          selectorRegex,
          `$1  ${property}: ${value}; /* ${explanation.replace('💡 ', '')} */\n$2`
        );
      }
      appliedList.push({ property, value, explanation });
    } else {
      // 若 selector 不存在，則在最後追加整個新區塊
      updatedCss += `\n\n/* 新增互動樣式 */\n${selector} {\n  ${property}: ${value}; /* ${explanation.replace('💡 ', '')} */\n}`;
      appliedList.push({ property, value, explanation });
    }
  }

  return { updatedCss, appliedList };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
