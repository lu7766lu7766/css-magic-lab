export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '題目 1：盒模型計算\n若某元素設定 CSS 為：width: 200px; padding: 20px; border: 5px solid red;，且設定了 box-sizing: border-box;，請問該元素在螢幕上的實際總寬度是多少？',
    options: [
      { key: 'A', text: '200px' },
      { key: 'B', text: '250px' },
      { key: 'C', text: '225px' },
      { key: 'D', text: '170px' }
    ],
    correctAnswer: 'A',
    explanation: '【正確答案是 (A) 200px！】\n解析：設定了 box-sizing: border-box; 神級屬性後，你設定的 width: 200px 就代表包含 padding 與 border 的「最終螢幕佔用總寬度」！瀏覽器會自動把內容區域向內壓縮為 200 - (20*2) - (5*2) = 150px，因此總寬度鎖死在 200px 不變！若未設定（傳統 content-box），總寬才會變成 200 + 40 + 10 = 250px 破版。'
  },
  {
    id: 2,
    question: '題目 2：選擇器優先級 (Specificity)\n當同一個按鈕同時被以下四組 CSS 規則設定字體顏色時，哪一個選擇器的規則會最終勝出生效？',
    options: [
      { key: 'A', text: 'button { color: red; }' },
      { key: 'B', text: '.btn { color: green; }' },
      { key: 'C', text: '#submit-btn { color: blue; }' },
      { key: 'D', text: 'body div button { color: yellow; }' }
    ],
    correctAnswer: 'C',
    explanation: '【正確答案是 (C) #submit-btn！】\n解析：根據 Specificity 權重天梯：\n• ID 選擇器 (#submit-btn) 權重分值為 100 分！\n• 類別選擇器 (.btn) 權重為 10 分。\n• 標籤組合 (body div button) 為 1+1+1 = 3 分。\n• 單一標籤 (button) 只有 1 分。\n因此 100 分的 ID 選擇器無條件壓倒性勝出！'
  },
  {
    id: 3,
    question: '題目 3：現代 RWD 與 Tailwind CSS\n關於響應式網頁設計 (RWD) 與 Tailwind CSS，下列哪一項敘述是錯誤的？',
    options: [
      { key: 'A', text: '必須在 HTML <head> 加入 <meta name="viewport" ...> 標籤，手機端 RWD 才能正常運作' },
      { key: 'B', text: 'Tailwind 的 md:flex 表示在平板/桌面 (768px) 以上寬度才切換為彈性佈局' },
      { key: 'C', text: '使用 Tailwind CSS 開發時，必須為每個按鈕另外建立並手寫一個 .btn 的自訂 CSS 樣式檔案' },
      { key: 'D', text: 'Tailwind 的 Utility-First 特性與現代 AI 提示詞輔助生成非常契合' }
    ],
    correctAnswer: 'C',
    explanation: '【正確答案是 (C) 這是錯誤的敘述！】\n解析：Tailwind CSS 的核心靈魂正是「Utility-First（原子化優先）」！我們直接在 HTML 標籤上組合預先定義好的微型 class（例如 bg-indigo-600 px-4 py-2 rounded-full），完全不需要也不鼓勵另外開一個 CSS 檔去命名與手寫 .btn 類別，這正是它解決傳統 CSS 命名痛苦與全域污染的最大功臣！'
  },
  {
    id: 4,
    question: '題目 4：Position 定位基準點\n當某個子元素設定了 position: absolute; top: 10px; right: 10px;，瀏覽器會以哪一個元素作為它的座標定位基準點 (Containing Block)？',
    options: [
      { key: 'A', text: '其直接父元素（無論父元素的 position 為何）' },
      { key: 'B', text: '最外層的 <body> 或 <html> 標籤' },
      { key: 'C', text: '由內向外尋找最近一層 position 非 static 的祖先元素' },
      { key: 'D', text: '螢幕當前的可視區域 (Viewport)' }
    ],
    correctAnswer: 'C',
    explanation: '【正確答案是 (C) 最近一層 position 非 static 的祖先元素！】\n解析：這就是前端口訣「子絕父相」背後的真正機制！設定 position: absolute 會讓元素脫離正常文檔流，並逐層往上尋找 position 屬性為 relative、absolute、fixed 或 sticky（即只要不是預設的 static）的最近祖先作為座標系。如果一路找到頂層都沒有，才會退化以 Initial Containing Block（通常為根元素/視窗）定位！'
  },
  {
    id: 5,
    question: '題目 5：CSS 動畫效能與 GPU 硬體加速\n在製作高流暢度 (60fps) 的網頁動態效果時，使用下列哪一組 CSS 屬性最能交由 GPU 合成層 (Compositor) 獨立處理，避免觸發昂貴的重排 (Reflow) 與重繪 (Repaint)？',
    options: [
      { key: 'A', text: 'width 與 height' },
      { key: 'B', text: 'top 與 left' },
      { key: 'C', text: 'margin 與 padding' },
      { key: 'D', text: 'transform 與 opacity' }
    ],
    correctAnswer: 'D',
    explanation: '【正確答案是 (D) transform 與 opacity！】\n解析：瀏覽器渲染管線分為 Layout（重排/Reflow）、Paint（重繪/Repaint）與 Composite（圖層合成）。改變 width、height、top、left 或 margin 都會牽動其他元素位置，強制瀏覽器重新計算幾何幾何佈局 (Reflow)，造成卡頓掉幀！而 transform（位移/縮放/旋轉）與 opacity 可以在獨立的 GPU 合成層運算，直接由顯卡加速繪製，是打造絲滑 60fps 微動態的黃金法則！'
  }
];
