/**
 * 根據使用者在視覺調校工具（VisualToolbox）中的 15 項屬性數值
 * 即時產生格式化並附帶生活化白話註解的 CSS
 */

export function generateMissionCss(missionId, state) {
  if (missionId === 'mission-1') {
    const bgCss = state.bgType === 'gradient'
      ? `linear-gradient(${state.gradientAngle || 135}deg, ${state.bgColor}, ${state.gradientTo || '#a855f7'})`
      : state.bgColor;

    const shadowCss = state.shadowBlur > 0
      ? `0 ${state.shadowY || 10}px ${state.shadowBlur}px -5px ${hexToRgba(state.shadowColor || '#6366f1', 0.5)}`
      : 'none';

    const borderCss = state.borderHeavy > 0
      ? `${state.borderHeavy}px solid #000000; /* ⚠️ 粗黑外邊框 */`
      : 'none; /* 💡 移除老舊硬邊框，俐落純淨 */';

    const textShadowCss = state.textShadowTrap
      ? 'text-shadow: 2px 2px 0px #000000; /* ⚠️ 刻痕凹凸文字陰影 */'
      : '';

    const letterSpacingCss = state.letterSpacingTrap > 0
      ? `letter-spacing: ${state.letterSpacingTrap}px; /* ⚠️ 過寬字母間隙 */`
      : 'letter-spacing: normal;';

    const filterCss = state.grayscaleTrap
      ? 'filter: grayscale(100%); /* ⚠️ 灰階去色濾鏡 */'
      : '';

    const rotateCss = state.btnRotateTrap !== 0
      ? `rotate(${state.btnRotateTrap}deg)`
      : '';

    return `/* 🛠️ 我的報名按鈕樣式 */
.action-btn {
  background: ${bgCss}; /* ${state.bgType === 'gradient' ? '💡 漸層色彩讓按鈕具備現代流光科技感' : '💡 純色背景'} */
  color: ${state.textColor}; /* 💡 確保文字在高飽和背景上清晰易讀 */
  padding: ${state.paddingY}px ${state.paddingX}px; /* 💡 內距充裕，按鈕大氣好點擊 */
  border: ${borderCss}
  border-radius: ${state.borderRadius >= 9999 ? '9999px' : state.borderRadius + 'px'}; /* ${state.borderRadius >= 9999 ? '💡 經典膠囊圓弧，完全磨平尖角' : state.borderRadius > 0 ? '💡 柔和倒角' : '💡 0px 銳利直角'} */
  box-shadow: ${shadowCss}; /* ${state.shadowBlur > 0 ? '💡 模擬向下光照，營造懸浮景深立體感' : '💡 無陰影，呈現平面質感'} */
  font-size: 16px;
  font-weight: ${state.fontWeight}; /* 💡 字重提升，強化視覺點擊主導權 */
  ${letterSpacingCss}
  ${textShadowCss}
  ${filterCss}
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${rotateCss ? rotateCss : 'none'};
}

.action-btn:hover {
  transform: translateY(${state.hoverY}px) scale(1.02) ${rotateCss}; /* 💡 滑鼠懸停時微彈性上浮反饋 */
  box-shadow: 0 ${Math.abs(state.hoverY) + 8}px ${state.shadowBlur + 8}px -5px ${hexToRgba(state.shadowColor || '#6366f1', 0.6)};
}`;
  }

  if (missionId === 'mission-2') {
    const cardBgCss = state.cardBg === 'glass' || state.cardBg === '#0f172a'
      ? 'rgba(15, 23, 42, 0.75)'
      : state.cardBg;

    const shadowCss = state.cardShadowBlur > 0
      ? `0 20px ${state.cardShadowBlur}px -10px rgba(0, 0, 0, 0.5)`
      : 'none';

    const borderCss = state.cardBorderHeavy > 1
      ? `${state.cardBorderHeavy}px solid #000000; /* ⚠️ 實線深黑外框 */`
      : '1px solid rgba(255, 255, 255, 0.12); /* 💡 極細高雅白光澤邊框 */';

    const borderStyleCss = state.cardDashedTrap ? 'border-style: dashed; /* ⚠️ 虛線邊框樣式 */' : '';
    const cardSkewCss = state.cardSkewTrap !== 0 ? `transform: skewX(${state.cardSkewTrap}deg); /* ⚠️ 水平透視傾斜 */` : '';

    return `/* 🛠️ 我的幹部名片樣式 */
.profile-card {
  width: 320px;
  background: ${cardBgCss}; /* 💡 深藍半透明背景最顯高級 */
  ${state.backdropBlur > 0 ? `backdrop-filter: blur(${state.backdropBlur}px); /* 💡 蘋果風磨砂玻璃擬態 */` : ''}
  padding: ${state.cardPadding}px; /* 💡 充裕內留白，終結緊貼邊界的窒息感 */
  border: ${borderCss}
  ${borderStyleCss}
  border-radius: ${state.cardRadius}px; /* 💡 現代大圓角收斂卡片輪廓 */
  box-shadow: ${shadowCss}; /* 💡 深邃立體景深 */
  ${cardSkewCss}
  transition: transform 0.3s ease;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: ${state.avatarSquareTrap ? '0px !important; /* ⚠️ 直角方形頭像 */' : state.avatarRadius >= 50 ? '50%' : state.avatarRadius + '%'}; /* ${state.avatarRadius >= 50 ? '💡 50% 正圓形頭像裁切' : '💡 頭像倒角'} */
  border: 3px solid ${state.avatarRingColor}; /* 💡 專屬天藍高光外環 */
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
}

.user-name {
  color: ${state.cardBg === '#ffffff' ? '#000000' : '#f8fafc'};
  font-size: ${state.userNameSize}px;
  font-weight: ${state.userNameWeight}; /* 💡 名字大粗亮，確立視覺第一主導權 */
  letter-spacing: -0.5px;
  ${state.userNameItalicTrap ? 'font-style: italic; /* ⚠️ 斜體排版 */' : ''}
}

.user-role {
  color: ${state.userRoleColor}; /* 💡 職稱採用天藍亮色區隔 */
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}`;
  }

  if (missionId === 'mission-3') {
    const shadowCss = state.cardShadowBlur > 0
      ? `0 12px ${state.cardShadowBlur}px -8px rgba(0, 0, 0, 0.4)`
      : 'none';

    const cardBorderCss = state.cardBorderDoubleTrap
      ? 'border: 4px double #ff0000; /* ⚠️ 雙層平行外框線 */'
      : 'border: 1px solid rgba(255, 255, 255, 0.08);';

    const imgRotateCss = state.imgRotateTrap !== 0
      ? `transform: rotate(${state.imgRotateTrap}deg); /* ⚠️ 照片旋轉傾斜 */`
      : '';

    const imgFilterCss = state.imgSepiaTrap
      ? 'filter: sepia(100%); /* ⚠️ 復古泛黃濾鏡 */'
      : '';

    const badgeFilterCss = state.badgeInvertTrap
      ? 'filter: invert(100%); /* ⚠️ 標籤明度反相 */'
      : '';

    return `/* 🛠️ 我的便當特餐卡樣式 */
.product-card {
  width: 290px;
  background: ${state.cardBg}; /* 💡 沉穩深色背景最能襯托美食 */
  ${cardBorderCss}
  border-radius: ${state.cardRadius}px; /* 💡 柔和圓角包覆 */
  overflow: ${state.overflow}; /* ${state.overflow === 'hidden' ? '💡 overflow: hidden 鎖住溢出邊界，防止破版！' : '💡 溢出可見 (容易破版)'} */
  position: relative;
  box-shadow: ${shadowCss};
  transition: transform 0.3s ease;
}

.food-img {
  width: 100%;
  height: 160px;
  object-fit: ${state.foodImgFit}; /* ${state.foodImgFit === 'cover' ? '💡 object-fit: cover 照片自適應裁切' : '💡 fill 拉伸失真'} */
  ${imgRotateCss}
  ${imgFilterCss}
}

.badge-tag {
  position: ${state.badgePosition}; /* ${state.badgePosition === 'absolute' ? '💡 position: absolute 自由浮空於圖片上方' : '💡 static 預設文檔流'} */
  top: ${state.badgeTop}px;
  left: 14px;
  background: ${state.badgePosition === 'absolute' ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : state.badgeBg};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 9999px; /* 💡 促銷標籤膠囊化 */
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  ${badgeFilterCss}
}

.product-price {
  color: ${state.priceColor}; /* 💡 醒目亮色激發食慾與下單 */
  font-size: ${state.priceSize}px;
  font-weight: 800;
  ${state.priceUnderlineTrap ? 'text-decoration: underline; /* ⚠️ 價格文字底線裝飾 */' : ''}
}`;
  }

  if (missionId === 'mission-4') {
    const inputBorderCss = state.inputBorderHeavyTrap > 1
      ? `${state.inputBorderHeavyTrap}px solid #000000; /* ⚠️ 粗糙深黑邊框 */`
      : '1.5px solid rgba(255, 255, 255, 0.1);';

    const inputBorderStyle = state.inputDottedTrap
      ? 'border-style: dotted; /* ⚠️ 點狀邊框線條 */'
      : '';

    const labelBlurCss = state.labelBlurTrap > 0
      ? `filter: blur(${state.labelBlurTrap}px); /* ⚠️ 文字模糊濾鏡 */`
      : '';

    const submitFilterCss = state.submitInvertTrap
      ? 'filter: invert(100%); /* ⚠️ 按鈕明度反相 */'
      : '';

    const formSkewCss = state.formSkewTrap !== 0
      ? `transform: skewX(${state.formSkewTrap}deg); /* ⚠️ 表單容器歪斜 */`
      : '';

    return `/* 🛠️ 我的會員登入表單樣式 */
.login-form {
  width: 340px;
  background: ${state.formBg};
  padding: ${state.formPadding}px; /* 💡 大留白給予表單呼吸感 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${state.formRadius}px;
  display: flex;
  flex-direction: column;
  gap: ${state.formGap}px; /* 💡 gap 讓每個輸入框保持舒適垂直間距 */
  box-shadow: 0 25px ${state.formShadow || 40}px -12px rgba(0, 0, 0, 0.6);
  ${formSkewCss}
}

.input-label {
  ${labelBlurCss}
}

.form-input {
  width: 100%;
  padding: ${state.inputPadding}px 18px;
  background: ${state.formBg === '#ffffff' ? '#ffffff' : '#1e293b'};
  color: ${state.formBg === '#ffffff' ? '#000000' : '#ffffff'};
  border: ${inputBorderCss}
  ${inputBorderStyle}
  border-radius: ${state.inputRadius}px;
  outline: ${state.focusGlow ? 'none' : 'auto'};
  font-size: 14px;
  transition: all 0.25s ease;
}

${state.focusGlow ? `.form-input:focus {
  border-color: ${state.focusColor}; /* 💡 天藍焦點高光色 */
  box-shadow: 0 0 0 4px ${hexToRgba(state.focusColor, 0.25)}; /* 💡 聚焦發光外環光圈 */
  background: #0f172a;
}` : ''}

.submit-btn {
  width: 100%;
  background: ${state.submitBtnBg === '#0ea5e9' ? 'linear-gradient(135deg, #0ea5e9, #3b82f6)' : state.submitBtnBg};
  color: #ffffff;
  padding: 13px 20px;
  border: none;
  border-radius: ${state.submitRadius}px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px -4px rgba(14, 165, 233, 0.4);
  ${submitFilterCss}
  transition: all 0.3s ease;
}`;
  }

  if (missionId === 'mission-5') {
    const heroBgCss = state.ambientGlow
    ? 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.25), transparent 70%), #090d16'
    : '#ffffff';

  const heroBorderCss = state.heroBorderHeavyTrap > 1
    ? `${state.heroBorderHeavyTrap}px solid #000000; /* ⚠️ 粗黑外邊框 */`
    : '1px solid rgba(255, 255, 255, 0.1);';

  const rainbowBorderCss = state.rainbowBorderTrap
    ? 'border: 3px dashed #f43f5e; /* ⚠️ 鮮豔虛線邊框 */'
    : '';

  const titleSkewCss = state.titleSkewTrap !== 0
    ? `transform: skewX(${state.titleSkewTrap}deg); /* ⚠️ 標題旋轉歪斜 */`
    : '';

  return `/* 🛠️ 我的校慶旗艦 Hero 樣式 */
.hero-banner {
  width: 100%;
  max-width: 580px;
  background: ${heroBgCss}; /* 💡 放射狀漸層營造頂部氛圍聚光燈 */
  padding: ${state.heroPadding}px 36px; /* 💡 旗艦大留白 */
  border: ${heroBorderCss}
  ${rainbowBorderCss}
  border-radius: ${state.heroRadius}px;
  text-align: center;
  box-shadow: 0 30px ${state.heroShadow || 50}px -15px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.hero-title {
  ${state.titleGradient ? `background: linear-gradient(135deg, #ffffff 40%, #c084fc 100%);
  -webkit-background-clip: text; /* 💡 將漸層色直接灌注入文字筆畫 */
  -webkit-text-fill-color: transparent;` : `color: ${state.ambientGlow ? '#ffffff' : '#000000'};`}
  font-size: ${state.titleSize}px;
  font-weight: ${state.titleWeight};
  line-height: 1.25;
  letter-spacing: -0.8px;
  ${titleSkewCss}
}

.hero-desc {
  color: #94a3b8;
  ${state.descTinyTrap ? 'font-size: 9px; /* ⚠️ 極小字號排版 */' : 'font-size: 15px;'}
  line-height: 1.6;
  max-width: 440px;
}

.cta-primary {
  background: linear-gradient(135deg, ${state.primaryBtnBg}, #ec4899);
  color: #ffffff;
  padding: 12px 26px;
  border-radius: ${state.primaryBtnRadius >= 9999 ? '9999px' : state.primaryBtnRadius + 'px'};
  font-size: 14px;
  font-weight: 700;
  border: none;
  box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.5);
  cursor: pointer;
}

.cta-secondary {
  background: ${state.secondaryGhost ? 'rgba(255, 255, 255, 0.05)' : '#ffffff'};
  color: ${state.secondaryGhost ? '#f1f5f9' : '#000000'};
  padding: 12px 24px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15); /* 💡 幽靈按鈕邊框，保持主次分明 */
  ${state.ghostDashedTrap ? 'border-style: dashed; /* ⚠️ 次按鈕虛線外框 */' : ''}
  cursor: pointer;
}`;
  }

  if (missionId === 'mission-6') {
    const cardShadowCss = state.musicShadow > 0
      ? `0 20px ${state.musicShadow}px -10px rgba(0, 0, 0, 0.7)`
      : 'none';

    const discRadiusCss = state.discSquareTrap
      ? '0px; /* ⚠️ 直角鋸齒黑膠唱片 */'
      : state.discRadius >= 50
        ? '50%; /* 💡 50% 圓潤黑膠唱片完美正圓 */'
        : `${state.discRadius}%; /* 💡 唱片倒角修飾 */`;

    const discSpinAnim = state.discSpin
      ? 'spinDisc 6s linear infinite; /* 💡 啟動 @keyframes spin 6s 平滑旋轉 */'
      : 'none; /* 💡 靜止狀態 */';

    const neonBorderCss = state.neonBorderTrap
      ? 'border: 4px double #ff007f; /* ⚠️ 刺眼霓虹雙線邊框 */'
      : 'border: 1px solid rgba(255, 255, 255, 0.08); /* 💡 極簡低調收邊 */';

    const trackSkewCss = state.trackSkewTrap
      ? 'transform: skew(-15deg); /* ⚠️ 文字傾斜失衡 */'
      : '';

    const progressFillCss = state.progressStripeTrap
      ? 'repeating-linear-gradient(45deg, #000, #000 5px, #fff 5px, #fff 10px); /* ⚠️ 晃眼斑馬斜紋 */'
      : state.progressColor;

    const controlsGap = state.controlsScatterTrap ? '48px' : '20px';

    return `/* 🛠️ 我的深夜電台音樂小卡樣式 */
@keyframes spinDisc {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.music-card {
  width: 320px;
  background: ${state.musicBg}; /* 💡 沉浸暗夜底色烘托深夜廣播氛圍 */
  padding: ${state.musicPadding}px; /* 💡 內艙充裕留白 */
  border-radius: ${state.musicRadius}px; /* 💡 現代柔潤大圓角 */
  box-shadow: ${cardShadowCss}; /* 💡 浮空景深暗影 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #f8fafc;
  font-family: inherit;
  ${neonBorderCss}
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
  border-radius: ${discRadiusCss}
  background: radial-gradient(circle, #1e1b4b 0%, #0f172a 40%, #000000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  animation: ${discSpinAnim}
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
  ${trackSkewCss}
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
  height: ${state.progressHeight}px; /* 💡 膠囊音軌進度槽高度 */
  background: #1e293b;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  width: 68%;
  height: 100%;
  background: ${progressFillCss}; /* 💡 進度條色彩 */
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
  gap: ${controlsGap}; /* 💡 控制鍵對稱舒適間隙 */
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
  background: ${state.playBtnBg}; /* 💡 播放主按鈕高光色彩 */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px ${state.playBtnGlow}px ${hexToRgba(state.playBtnBg, 0.5)}; /* 💡 播放鍵外發光景深 */
  font-size: 16px;
}`;
  }

  if (missionId === 'mission-7') {
    const cardShadowCss = state.stepCardShadow > 0
      ? `0 20px ${state.stepCardShadow}px -10px rgba(0, 0, 0, 0.5)`
      : 'none';

    const nodeRadiusCss = state.stepNodeSquareTrap
      ? '0px; /* ⚠️ 生硬直角方形節點 */'
      : state.stepNodeRadius >= 50
        ? '50%; /* 💡 50% 正圓狀態節點 */'
        : `${state.stepNodeRadius}%;`;

    const trackLineStyle = state.stepDashedTrackTrap ? 'dotted' : 'solid';

    const pulseAnim = state.stepPulseGlow
      ? `nodePulse 2s infinite; /* 💡 騎士進行中脈衝呼吸微動態 */`
      : 'none;';

    const headerShakeCss = state.stepHeaderShakeTrap
      ? 'transform: rotate(-5deg); /* ⚠️ 標題歪斜晃動 */'
      : '';

    const filterTrapCss = state.stepGlitchInvertTrap
      ? 'filter: invert(100%); /* ⚠️ 負片色彩倒轉 */'
      : '';

    const badgeBlurCss = state.stepBadgeBlurTrap
      ? 'filter: blur(3px); /* ⚠️ 模糊失焦徽章 */'
      : '';

    return `/* 🛠️ 我的外送進度追蹤步進卡樣式 */
@keyframes nodePulse {
  0% { box-shadow: 0 0 0 0 ${hexToRgba(state.stepActiveColor, 0.7)}; }
  70% { box-shadow: 0 0 0 12px ${hexToRgba(state.stepActiveColor, 0)}; }
  100% { box-shadow: 0 0 0 0 ${hexToRgba(state.stepActiveColor, 0)}; }
}

.stepper-card {
  width: 340px;
  background: ${state.stepCardBg}; /* 💡 深藍夜間模式卡片背景 */
  padding: ${state.stepCardPadding}px; /* 💡 舒展內留白 */
  border-radius: ${state.stepCardRadius}px; /* 💡 20px 柔潤收邊 */
  box-shadow: ${cardShadowCss};
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.08);
  ${filterTrapCss}
}

.stepper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${headerShakeCss}
}

.order-badge {
  background: ${hexToRgba(state.stepActiveColor, 0.15)};
  color: ${state.stepActiveColor};
  padding: 4px 12px;
  border-radius: ${state.stepBadgeRadius >= 9999 ? '9999px' : state.stepBadgeRadius + 'px'}; /* 💡 膠囊配送狀態徽章 */
  font-size: 12px;
  font-weight: 700;
  border: 1px solid ${hexToRgba(state.stepActiveColor, 0.3)};
  ${badgeBlurCss}
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
  top: ${Math.round(state.stepNodeSize / 2) + 10}px;
  left: 30px;
  right: 30px;
  height: ${state.stepLineHeight}px; /* 💡 進度軌道厚度 */
  background: #334155;
  border-style: ${trackLineStyle};
  z-index: 1;
}

.step-progress-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: ${state.stepActiveColor};
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
  width: ${state.stepNodeSize}px; /* 💡 節點尺寸寬高 */
  height: ${state.stepNodeSize}px;
  border-radius: ${nodeRadiusCss}
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
  background: ${state.stepActiveColor};
  border-color: ${state.stepActiveColor};
  color: #ffffff;
}

.step-active .step-node {
  background: ${state.stepCardBg};
  border-color: ${state.stepActiveColor};
  color: ${state.stepActiveColor};
  animation: ${pulseAnim}
}

.step-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}

.step-active .step-label {
  color: ${state.stepActiveColor};
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

.driver-meta {
  display: flex;
  flex-direction: column;
}

.driver-name {
  font-size: 13px;
  font-weight: 700;
  color: #f1f5f9;
}

.driver-rate {
  font-size: 11px;
  color: #fbbf24;
}`;
  }

  if (missionId === 'mission-8') {
    const cardShadowCss = state.confessCardShadow > 0
      ? `0 15px ${state.confessCardShadow}px -5px rgba(244, 63, 94, 0.18), 0 5px 15px rgba(0, 0, 0, 0.05)`
      : 'none';

    const bubbleRadiusCss = state.bubbleSharpTrap
      ? '0px; /* ⚠️ 銳利刺手直角氣泡 */'
      : `${state.bubbleRadius}px; /* 💡 柔和對話氣泡圓角 */`;

    const arrowDisplay = state.bubbleArrow ? 'block' : 'none';
    const arrowRotate = state.bubbleArrowDistortTrap ? 'transform: rotate(45deg); /* ⚠️ 扭曲失控尖角 */' : '';

    const filterTrapCss = state.confessSepiaDarkTrap ? 'filter: sepia(90%); /* ⚠️ 泛黃老舊復古濾鏡 */' : '';
    const borderTrapCss = state.confessHeavyBorderTrap ? 'border: 4px solid #000000; /* ⚠️ 粗重壓抑黑邊框 */' : 'border: 1px solid rgba(244, 63, 94, 0.12); /* 💡 精緻粉嫩微外框 */';
    const letterSpacingCss = state.confessTextSpacingTrap ? 'letter-spacing: 10px; /* ⚠️ 鬆散脫節字元間距 */' : 'letter-spacing: normal;';

    const hoverBounceCss = state.heartHoverBounce
      ? `
.heart-btn:hover {
  transform: scale(1.08); /* 💡 懸停心跳微彈跳反饋 */
  box-shadow: 0 6px ${state.heartBtnGlow + 4}px ${hexToRgba(state.heartBtnBg, 0.5)};
}`
      : '';

    return `/* 🛠️ 我的告白牆對話氣泡卡樣式 */
.confession-card {
  width: 330px;
  background: #ffffff;
  padding: ${state.confessCardPadding}px; /* 💡 舒展內艙留白 */
  border-radius: ${state.confessCardRadius}px; /* 💡 外卡柔和圓角 */
  box-shadow: ${cardShadowCss};
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: inherit;
  ${borderTrapCss}
  ${filterTrapCss}
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
  background: ${state.bubbleBg}; /* 💡 戀愛系溫暖粉嫩氣泡底色 */
  padding: 16px 18px;
  border-radius: ${bubbleRadiusCss}
  border-top-left-radius: 4px;
  border: 1px solid #fecdd3;
}

.bubble-text {
  font-size: 14px;
  color: #4c0519;
  line-height: ${state.confessLineHeight}px; /* 💡 舒適告白長文閱讀行距 */
  margin: 0;
  ${letterSpacingCss}
}

.bubble-arrow {
  display: ${arrowDisplay};
  position: absolute;
  top: -8px;
  left: 12px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid ${state.bubbleBg}; /* 💡 純 CSS border 三角形尖角定位 */
  ${arrowRotate}
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.heart-btn {
  background: ${state.heartBtnBg}; /* 💡 心動主色 */
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
  box-shadow: 0 4px ${state.heartBtnGlow}px ${hexToRgba(state.heartBtnBg, 0.4)}; /* 💡 心跳立體投影 */
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
${hoverBounceCss}

.reply-hint {
  font-size: 12px;
  color: #94a3b8;
}`;
  }

  if (missionId === 'mission-9') {
    const clipVal = state.cyberClipCorner;
    const clipCss = clipVal > 0
      ? `clip-path: polygon(0 0, calc(100% - ${clipVal}px) 0, 100% ${clipVal}px, 100% 100%, ${clipVal}px 100%, 0 calc(100% - ${clipVal}px)); /* 💡 多邊形幾何科技切角 */`
      : 'clip-path: none;';

    const wrapperGlowCss = state.cyberNeonGlow > 0
      ? `.cyber-pass-wrapper {\n  filter: drop-shadow(0 0 ${state.cyberNeonGlow}px ${hexToRgba(state.cyberNeonColor, 0.65)});\n}\n\n`
      : '';

    const glowCss = state.cyberNeonGlow > 0
      ? `box-shadow: 0 0 ${state.cyberNeonGlow}px ${hexToRgba(state.cyberNeonColor, 0.4)}, inset 0 0 ${Math.max(10, Math.round(state.cyberNeonGlow * 0.9))}px ${hexToRgba(state.cyberNeonColor, 0.35)}; /* 💡 雙重內外霓虹自發光 */`
      : 'box-shadow: none;';

    const scanlineDisplay = state.cyberScanlineToggle ? 'block' : 'none';

    const titleGlowCss = state.cyberTitleGlow
      ? `text-shadow: 0 0 10px ${hexToRgba(state.cyberNeonColor, 0.9)}; /* 💡 全像標題文字發光 */`
      : 'text-shadow: none;';

    const fontTrapCss = state.cyberComicFontTrap ? 'font-family: cursive !important; /* ⚠️ 漫畫手寫字體破壞感 */' : 'font-family: monospace, sans-serif;';
    const filterTrapCss = state.cyberPassBlurTrap ? 'filter: blur(5px); /* ⚠️ 全像信號嚴重丟失 */' : '';
    const spinTrapCss = state.cyberCardSpinTrap ? 'transform: rotate(180deg); /* ⚠️ 瘋狂翻滾失重 */' : '';
    const borderDottedTrap = state.cyberRainbowDottedTrap ? 'border: 3px dotted #ff00ff !important; /* ⚠️ 繽紛點狀小丑邊框 */' : '';

    const avatarWrapperGlowCss = state.cyberAvatarGlow > 0
      ? `.cyber-avatar-wrapper {\n  filter: drop-shadow(0 0 ${state.cyberAvatarGlow}px ${hexToRgba(state.cyberAccentColor, 0.75)});\n}\n\n`
      : '';

    const avatarGlowCss = state.cyberAvatarGlow > 0
      ? `box-shadow: 0 0 ${state.cyberAvatarGlow}px ${hexToRgba(state.cyberAccentColor, 0.5)}, inset 0 0 ${Math.max(6, Math.round(state.cyberAvatarGlow * 0.75))}px ${hexToRgba(state.cyberAccentColor, 0.6)}; /* 💡 核心晶片外環光暈 */`
      : 'box-shadow: none;';

    return `/* 🛠️ 我的賽博龐克全像通行證樣式 */
@keyframes scanlineAnim {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}

${wrapperGlowCss}.cyber-pass {
  position: relative;
  width: 320px;
  background: ${state.cyberWhiteBgTrap ? '#ffffff /* ⚠️ 刺眼日光純白底 */' : state.cyberPassBg}; /* 💡 沉浸深黑碳纖底色 */
  padding: ${state.cyberPassPadding}px; /* 💡 硬派科技艙體留白 */
  ${clipCss}
  border: ${state.cyberBorderWidth}px solid ${state.cyberNeonColor}; /* 💡 科技外骨骼輪廓 */
  ${glowCss}
  color: ${state.cyberNeonColor};
  ${fontTrapCss}
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
  ${filterTrapCss}
  ${spinTrapCss}
  ${borderDottedTrap}
}

.cyber-scanline {
  display: ${scanlineDisplay};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(180deg, transparent, ${hexToRgba(state.cyberNeonColor, 0.6)}, transparent);
  animation: scanlineAnim 3s linear infinite;
  pointer-events: none;
}

.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${hexToRgba(state.cyberNeonColor, 0.3)};
  padding-bottom: 8px;
}

.cyber-badge {
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 800;
  color: ${state.cyberAccentColor};
  text-shadow: 0 0 8px ${hexToRgba(state.cyberAccentColor, 0.8)};
}

.cyber-access {
  font-size: 10px;
  background: ${hexToRgba(state.cyberNeonColor, 0.15)};
  padding: 2px 8px;
  border: 1px solid ${state.cyberNeonColor};
}

.cyber-body {
  display: flex;
  align-items: center;
  gap: 16px;
}

${avatarWrapperGlowCss}.cyber-avatar {
  width: 54px;
  height: 54px;
  background: ${hexToRgba(state.cyberAccentColor, 0.15)};
  border: 2px solid ${state.cyberAccentColor};
  ${avatarGlowCss}
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
  ${titleGlowCss}
  margin: 0;
}

.cyber-role {
  font-size: 11px;
  color: ${state.cyberNeonColor};
  letter-spacing: 1px;
  margin: 4px 0 0 0;
}

.cyber-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid ${hexToRgba(state.cyberNeonColor, 0.2)};
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
  color: ${state.cyberAccentColor};
  font-weight: 800;
  letter-spacing: 1px;
  border: 1px solid ${state.cyberAccentColor};
  padding: 3px 6px;
  text-shadow: 0 0 5px ${hexToRgba(state.cyberAccentColor, 0.8)};
}`;
  }

  if (missionId === 'mission-10') {
    const tiltCss = state.prismFlatZeroTrap
      ? 'transform: none !important; /* ⚠️ 拍扁直角厚紙板 */'
      : state.prismTilt
        ? 'transform: rotateX(12deg) rotateY(-12deg); /* 💡 3D 空間透視傾角 */'
        : 'transform: none;';

    const shadowCss = state.prismShadow > 0
      ? `-15px 25px ${state.prismShadow}px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.25)`
      : 'none';

    const auroraDisplay = state.prismAuroraBorder ? 'block' : 'none';

    const titleReflectCss = state.prismTitleReflect
      ? `background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* 💡 燙金銀白金屬文字裁切 */`
      : 'color: #ffffff;';

    const borderHighlightCss = state.prismBorderHighlight
      ? 'border: 1px solid rgba(255, 255, 255, 0.18); /* 💡 0.5px 高折射率晶體外框 */'
      : 'border: none;';

    const cardRadiusCss = state.prismFlatZeroTrap
      ? '0px !important; /* ⚠️ 銳利厚紙板直角 */'
      : `${state.prismRadius}px; /* 💡 24px 晶體切面柔和倒角 */`;

    const bgMuddyTrap = state.prismMuddyGreenTrap ? '#2b3a1a /* ⚠️ 渾濁泥濘草綠底 */' : state.prismGlassBg;
    const distortScaleTrap = state.prismDistortScaleTrap ? 'transform: scale(1.6, 0.5) !important; /* ⚠️ 壓扁失真比例 */' : '';
    const pixelBorderTrap = state.prismPixelateBorderTrap ? 'border: 5px ridge #ff0000 !important; /* ⚠️ 粗糙鋸齒紅綠邊框 */' : '';
    const extremeSkewTrap = state.prismExtremeSkewTrap ? 'transform: skewY(25deg) !important; /* ⚠️ 失速嚴重翻覆 */' : '';

    return `/* 🛠️ 我的 3D 透視炫彩流光稜鏡卡樣式 */
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
  border-radius: ${cardRadiusCss}
  background: ${bgMuddyTrap}; /* 💡 黑曜石奢華底色 */
  ${tiltCss}
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: ${shadowCss};
  display: flex;
  overflow: hidden;
  ${borderHighlightCss}
  ${distortScaleTrap}
  ${pixelBorderTrap}
  ${extremeSkewTrap}
}

.prism-card:hover {
  transform: rotateX(0deg) rotateY(0deg) scale(1.05); /* 💡 Hover 懸浮正視微放大 */
}

.aurora-glow-rim {
  display: ${auroraDisplay};
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
  padding: ${state.prismPadding}px; /* 💡 奢華座艙留白 */
  background: rgba(11, 15, 25, 0.85);
  ${state.prismBackdropBlur > 0 ? `backdrop-filter: blur(${state.prismBackdropBlur}px); /* 💡 晶體磨砂玻璃折射 */` : ''}
  border-radius: ${cardRadiusCss}
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
  ${titleReflectCss}
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
  box-shadow: 0 0 ${state.prismChipGlow}px rgba(251, 191, 36, 0.6); /* 💡 智慧晶片金屬光暈 */
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
}`;
  }
}

function hexToRgba(hex, alpha = 1) {
  if (!hex || !hex.startsWith('#')) return hex;
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

/**
 * CSS 作用域隔離函數：將 CSS 選擇器加上指定 scope 前綴，避免雙畫布樣式互相干擾
 * 支援 @keyframes、@media 等嵌套成對大括號之正確剖析
 */
export function scopeCss(css, scopeClass) {
  if (!css) return '';
  // 移除多行註解
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const results = [];
  let i = 0;

  while (i < clean.length) {
    while (i < clean.length && /\s/.test(clean[i])) i++;
    if (i >= clean.length) break;

    const openBrace = clean.indexOf('{', i);
    if (openBrace === -1) break;

    const selector = clean.substring(i, openBrace).trim();

    // 依據括號深度精確比對成對閉合括號（徹底解決 @keyframes 內嵌 0% { } 100% { } 導致提早斷開的問題）
    let depth = 1;
    let j = openBrace + 1;
    while (j < clean.length && depth > 0) {
      if (clean[j] === '{') depth++;
      else if (clean[j] === '}') depth--;
      j++;
    }

    const body = clean.substring(openBrace + 1, j - 1).trim();
    i = j;

    if (!selector) continue;

    // 若為 @keyframes (或 -webkit-keyframes)，全域保留其名稱與關鍵幀結構，不加類別前綴
    if (/^@(-webkit-)?keyframes/i.test(selector)) {
      results.push(`${selector} {\n  ${body}\n}`);
    } else if (selector.startsWith('@')) {
      results.push(`${selector} {\n  ${body}\n}`);
    } else {
      // 一般 CSS 選擇器加上作用域隔離前綴
      const scopedSelectors = selector
        .split(',')
        .map(s => {
          const trimmedS = s.trim();
          if (!trimmedS) return '';
          if (trimmedS.startsWith(`.${scopeClass}`)) return trimmedS;
          return `.${scopeClass} ${trimmedS}`;
        })
        .filter(Boolean)
        .join(', ');
      results.push(`${scopedSelectors} {\n  ${body}\n}`);
    }
  }

  return results.join('\n\n');
}
