export const BADGES = [
  {
    id: 'first-step',
    title: '美感初學者',
    icon: 'Sparkles',
    color: 'from-amber-400 to-orange-500',
    description: '完成任意一次設計意圖注入或美化調整',
    requirement: '完成首次美化操作',
    isUnlocked: (stats) => stats.totalActions >= 1
  },
  {
    id: 'button-master',
    title: '流光按鈕師',
    icon: 'MousePointerClick',
    color: 'from-blue-500 to-indigo-600',
    description: '成功拯救 Windows 95 按鈕並獲得 2 星以上評價',
    requirement: '關卡 1 得分 ≥ 80',
    isUnlocked: (stats) => (stats.scores['mission-1'] || 0) >= 80
  },
  {
    id: 'card-architect',
    title: '名片架構師',
    icon: 'CreditCard',
    color: 'from-purple-500 to-pink-600',
    description: '成功讓社長名片重獲新生，掌握留白與圓角比例',
    requirement: '關卡 2 得分 ≥ 80',
    isUnlocked: (stats) => (stats.scores['mission-2'] || 0) >= 80
  },
  {
    id: 'layout-ninja',
    title: '商品佈局忍者',
    icon: 'LayoutGrid',
    color: 'from-emerald-400 to-teal-600',
    description: '拯救便當店特餐卡片，掌握溢出裁切與浮空標籤定位',
    requirement: '關卡 3 得分 ≥ 80',
    isUnlocked: (stats) => (stats.scores['mission-3'] || 0) >= 80
  },
  {
    id: 'focus-guardian',
    title: '體驗守護者',
    icon: 'ShieldCheck',
    color: 'from-cyan-400 to-blue-600',
    description: '給予會員表單絲滑光暈與呼吸間距，告別生硬黑框',
    requirement: '關卡 4 得分 ≥ 80',
    isUnlocked: (stats) => (stats.scores['mission-4'] || 0) >= 80
  },
  {
    id: 'hero-creator',
    title: '品牌旗艦導演',
    icon: 'Crown',
    color: 'from-amber-300 via-rose-500 to-purple-600',
    description: '征服校慶首頁 Hero 旗艦橫幅，營造極致現代氛圍光',
    requirement: '關卡 5 得分 ≥ 85',
    isUnlocked: (stats) => (stats.scores['mission-5'] || 0) >= 85
  },
  {
    id: 'prompt-alchemist',
    title: '自然語言鍊金術士',
    icon: 'Wand2',
    color: 'from-fuchsia-500 to-violet-600',
    description: '透過自然語言打字請 AI 助教美化介面達 3 次以上',
    requirement: '使用自然語言美化 ≥ 3 次',
    isUnlocked: (stats) => stats.promptUsageCount >= 3
  },
  {
    id: 'ui-grandmaster',
    title: '現代 UI 大師',
    icon: 'Trophy',
    color: 'from-yellow-400 via-amber-500 to-red-500',
    description: '通關全部 5 大情境關卡，所有關卡均合格通關',
    requirement: '全部 5 關皆取得 ≥ 70 分',
    isUnlocked: (stats) => {
      const keys = ['mission-1', 'mission-2', 'mission-3', 'mission-4', 'mission-5'];
      return keys.every(k => (stats.scores[k] || 0) >= 70);
    }
  }
];

export const TITLE_RANKS = [
  { minExp: 0, title: 'CSS 見習生', color: 'text-slate-400' },
  { minExp: 80, title: '樣式學徒', color: 'text-blue-400' },
  { minExp: 200, title: '光影魔法師', color: 'text-purple-400' },
  { minExp: 350, title: '介面整容專家', color: 'text-pink-400' },
  { minExp: 500, title: '現代 UI 宗師', color: 'text-amber-400' }
];

export function getRankByExp(exp) {
  for (let i = TITLE_RANKS.length - 1; i >= 0; i--) {
    if (exp >= TITLE_RANKS[i].minExp) {
      return TITLE_RANKS[i];
    }
  }
  return TITLE_RANKS[0];
}
