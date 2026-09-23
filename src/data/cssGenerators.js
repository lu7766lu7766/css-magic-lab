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

  // mission-5
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
 */
export function scopeCss(css, scopeClass) {
  if (!css) return '';
  const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return cleanCss
    .split('}')
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      const braceIdx = trimmed.indexOf('{');
      if (braceIdx === -1) return '';
      const selectorPart = trimmed.substring(0, braceIdx).trim();
      const bodyPart = trimmed.substring(braceIdx + 1).trim();
      if (selectorPart.startsWith('@')) {
        return `${selectorPart} { ${bodyPart} }`;
      }
      const scopedSelectors = selectorPart
        .split(',')
        .map(s => {
          const trimmedS = s.trim();
          if (!trimmedS) return '';
          return `.${scopeClass} ${trimmedS}`;
        })
        .filter(Boolean)
        .join(', ');
      return `${scopedSelectors} {\n  ${bodyPart}\n}`;
    })
    .filter(Boolean)
    .join('\n\n');
}
