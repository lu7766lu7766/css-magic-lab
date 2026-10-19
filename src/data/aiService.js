/**
 * 目標吻合度評分服務（純前端、離線運算）
 */

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
