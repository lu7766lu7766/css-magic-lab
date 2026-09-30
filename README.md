# CSS 魔法實驗室（CSS Magic Lab）

零經驗新手美感沙盒：三欄即時對照（我的樣式 / style.css / 設計師目標），用 15 選 10 的視覺調校工具箱，把每關的陽春元件改造成設計師目標成品，交由 AI 評分拿星。

## 玩法

1. 看「關卡情境委託劇本卡」了解客戶需求與學習重點。
2. 左側是即時作品畫布（支援 Hover 實測），右側是設計師滿分標準，下方工具箱點一下開啟、再點一下還原。
3. 滑桿拉到目標區間內即算對，不必精準命中；顏色必須一字不差，建議直接點右側目標色票帶入。
4. 每關 5 個陷阱工具（開啟各扣 15 分），保持 OFF。
5. 70 分過關，90 分以上三星。

## 評分規則

- 四大維度各 25%：色彩調和 / 空間呼吸 / 光影層次 / 文字結構。
- 非陷阱工具：toggle 開啟即得分；select、color 命中目標值得滿分；slider 落在目標區間即滿分。
- 陷阱工具每開一個扣 15 分，評分報告會直接點名。

## 通關攻略（滿分答案 key）

> 每關開啟以下 10 個正解並調到目標值，5 個陷阱保持 OFF，即可拿 100 分。
> 顏色請用右側目標色票點選帶入，避免手打色碼差一個字。

### 第 1 關：拯救 Windows 95 報名按鈕

| 工具 | 目標值 |
|---|---|
| 圓角修飾 (Border Radius) | 9999（按膠囊快捷鍵） |
| 上下內留白 (Padding Y) | 14（區間 12~18） |
| 左右點擊寬度 (Padding X) | 32（區間 24~38） |
| 主背景色彩 (Background Color) | `#6366f1` |
| 漸層流光模式 (Gradient) | ON |
| 漸層流光副色 (Gradient To) | `#a855f7` |
| 文字色彩 (Text Color) | `#ffffff` |
| 立體浮空陰影 (Box Shadow) | 25（區間 15~35） |
| 文字粗細階層 (Font Weight) | 700 |
| 懸停微上浮 (Hover Translate) | -3（區間 -5~-2，滑鼠移上去驗收） |

陷阱 OFF：實線外邊框、字母排列間距、刻痕文字陰影、平面旋轉角度、灰階去色濾鏡。

### 第 2 關：修復社長的扁平窒息感名片

| 工具 | 目標值 |
|---|---|
| 卡片內部留白 (Card Padding) | 28（區間 22~34） |
| 卡片外框圓角 (Card Radius) | 24（區間 18~30） |
| 卡片背景色彩 (Background) | `#0f172a` |
| 磨砂玻璃特效 (Backdrop Blur) | 16（區間 10~20） |
| 大頭貼圓弧度 (Avatar Radius) | 50% |
| 頭像邊框光環 (Avatar Ring) | `#38bdf8` |
| 名字字體大小 (Font Size) | 20（區間 18~22） |
| 名字字重大粗 (Font Weight) | 800 |
| 職稱識別色彩 (Role Color) | `#38bdf8` |
| 立體懸浮陰影 (Card Shadow) | 40（區間 25~50） |

陷阱 OFF：深色硬邊框、透視歪斜、直角方形頭像、字體斜體化、虛線邊框樣式。

### 第 3 關：改造老牌便當店特餐商品卡

| 工具 | 目標值 |
|---|---|
| 溢出裁切開關 (Overflow: Hidden) | ON（核心：鎖住圖片不破版） |
| 卡片現代圓角 (Card Radius) | 20（區間 16~24） |
| 照片比例模式 (Object Fit) | cover |
| 商品卡背景 (Card Background) | `#1e293b` |
| 浮空定位標籤 (Position: Absolute) | ON |
| 標籤頂部距離 (Top Offset) | 14（區間 10~18） |
| 推薦標籤色彩 (Badge Color) | `#ef4444` |
| 價格醒目主色 (Price Color) | `#f43f5e` |
| 價格字體大小 (Price Size) | 22（區間 20~24） |
| 美食立體陰影 (Card Shadow) | 30（區間 20~35） |

陷阱 OFF：雙重線外框、照片旋轉角度、復古泛黃濾鏡、標籤明度反相、文字底線裝飾。

### 第 4 關：整容窒息感會員登入表單

| 工具 | 目標值 |
|---|---|
| 欄位呼吸留白 (Form Gap) | 20（區間 16~24） |
| 表單容器留白 (Form Padding) | 32（區間 26~36） |
| 輸入框點擊手感 (Input Padding) | 13（區間 10~16） |
| 輸入框圓弧倒角 (Input Radius) | 12（區間 8~16） |
| 焦點科技光暈開關 (:Focus Glow) | ON（點一下輸入框驗收天藍光圈） |
| 焦點高光色彩 (Focus Color) | `#38bdf8` |
| 表單大外框圓角 (Form Radius) | 24（區間 18~28） |
| 送出按鈕主色 (Submit Button) | `#0ea5e9` |
| 按鈕圓弧倒角 (Submit Radius) | 12（區間 8~16） |
| 表單立體浮空陰影 (Shadow) | 50（區間 35~60） |

陷阱 OFF：粗黑實線框、點狀邊框樣式、文字模糊濾鏡、按鈕明度反相、表單水平傾斜。

### 第 5 關：校慶首頁 Hero 旗艦橫幅

| 工具 | 目標值 |
|---|---|
| 橫幅旗艦留白 (Hero Padding) | 44（區間 36~50） |
| 現代外框圓角 (Hero Radius) | 28（區間 22~34） |
| 深空紫光氛圍場 (Radial Glow) | ON |
| 文字流金漸層 (-webkit-clip: text) | ON |
| 大標題字級 (Title Size) | 32（區間 28~36） |
| 標題字重厚度 (Title Weight) | 800 |
| 主 CTA 按鈕漸層色 (Primary CTA) | `#8b5cf6` |
| 主 CTA 膠囊圓角 (Button Radius) | 9999（按膠囊快捷鍵） |
| 次按鈕幽靈模式 (Ghost Button) | ON |
| 旗艦級大陰影 (Hero Shadow) | 60（區間 40~70） |

陷阱 OFF：外框重黑邊線、對比虛線外框、主標題傾斜、說明極小字號、次按鈕虛線框。

### 第 6 關：深夜電台黑膠音樂小卡

| 工具 | 目標值 |
|---|---|
| 唱片正圓圓角 (Border Radius) | 50% |
| 黑膠旋轉動態 (Spin Animation) | ON（等幾秒看旋轉） |
| 播放器沉浸底色 (Card Background) | `#090d16` |
| 機身弧形收邊 (Card Radius) | 24（區間 18~28） |
| 機身內部留白 (Card Padding) | 22（區間 16~26） |
| 音軌進度高亮 (Progress Color) | `#818cf8` |
| 進度條厚度 (Progress Height) | 6（區間 4~8） |
| 播放鍵主色 (Play Button Bg) | `#6366f1` |
| 播放鍵光暈 (Play Button Glow) | 16（區間 10~22） |
| 機身浮空景深 (Box Shadow) | 24（區間 16~32） |

陷阱 OFF：直角鋸齒唱片、文字傾斜失衡、刺眼霓虹外框、晃眼斑馬進度條、控制按鈕分散脫節。

### 第 7 關：外送進度追蹤步進卡

| 工具 | 目標值 |
|---|---|
| 節點正圓圓弧 (Node Radius) | 50% |
| 脈衝呼吸光 (Pulse Glow) | ON |
| 軌道厚度 (Track Line Height) | 4（區間 3~6） |
| 進行中主題色 (Active Color) | `#10b981` |
| 追蹤卡背景色 (Card Bg) | `#0f172a` |
| 追蹤卡大圓角 (Card Radius) | 20（區間 16~26） |
| 空間呼吸留白 (Padding) | 24（區間 18~28） |
| 節點寬高尺寸 (Node Size) | 42（區間 36~46） |
| 狀態徽章弧度 (Badge Radius) | 9999（按膠囊快捷鍵） |
| 懸浮立體景深 (Box Shadow) | 20（區間 14~28） |

陷阱 OFF：生硬方形節點、虛線折斷軌道、負片色彩倒轉、標題歪斜晃動、模糊失焦徽章。

### 第 8 關：告白牆對話氣泡卡

| 工具 | 目標值 |
|---|---|
| 氣泡圓潤弧度 (Bubble Radius) | 18（區間 14~22） |
| 柔粉氣泡底色 (Bubble Bg) | `#fff1f2` |
| 對話氣泡尖角 (Bubble Arrow) | ON |
| 卡片內艙留白 (Padding) | 22（區間 16~26） |
| 外卡精緻圓角 (Card Radius) | 20（區間 16~26） |
| 心動主色 (Heart Button Bg) | `#f43f5e` |
| 心動立體光暈 (Heart Glow) | 16（區間 10~22） |
| 心跳懸停放大 (Hover Scale) | ON（滑鼠移上愛心驗收彈跳） |
| 文字閱讀行高 (Line Height) | 24（區間 20~26） |
| 柔霧粉嫩背光 (Card Shadow) | 20（區間 14~26） |

陷阱 OFF：銳利刺手直角、泛黃老舊復古濾鏡、粗重壓抑黑邊框、扭曲失控尖角、鬆散脫節字元間距。

### 第 9 關：賽博龐克全像霓虹通行證

| 工具 | 目標值 |
|---|---|
| 科技切角外觀 (Polygon Cut Corner) | 18（區間 14~24） |
| 主霓虹青光 (Neon Cyan Color) | `#00f2fe` |
| 副霓虹洋紅 (Neon Magenta Color) | `#ff007f` |
| 雙重外光暈 (Neon Glow Blur) | 20（區間 14~28） |
| 全像掃描線束 (Scanline Anim) | ON |
| 賽博碳纖底色 (Carbon Dark Bg) | `#05070f` |
| 機艙邊界留白 (Padding) | 24（區間 18~28） |
| 標題全像投影光 (Title Text Glow) | ON |
| 科技外骨骼 (Cyber Border Width) | 2（區間 2~3） |
| 核心晶片外環光 (Chip Core Glow) | 16（區間 10~22） |

陷阱 OFF：刺眼日光純白底、漫畫手寫字體、全像信號嚴重丟失、瘋狂翻滾失重、繽紛點狀小丑邊框。

### 第 10 關：3D 透視炫彩流光稜鏡卡

| 工具 | 目標值 |
|---|---|
| 3D 空間透視傾斜 (3D Transform Tilt) | ON |
| 極光旋轉動態 (Conic Aurora Rim) | ON |
| 磨砂黑曜半透明底 (Obsidian Glass Bg) | `#0b0f19` |
| 晶體折射模糊 (Backdrop Blur) | 16（區間 10~22） |
| 稜鏡切面圓角 (Card Radius) | 24（區間 18~28） |
| 機位留白 (Padding) | 22（區間 16~26） |
| 懸浮暗黑深邃陰影 (Box Shadow Depth) | 30（區間 20~40） |
| 金屬質感文字漸層 (Metallic Text Clip) | ON |
| 高折射晶體邊框 (Crystal Highlight Rim) | ON |
| 核心晶片高光反饋 (Chip Glow Blur) | 14（區間 8~18） |

陷阱 OFF：拍扁直角厚紙板、渾濁泥濘草綠底、壓扁失真比例、粗糙鋸齒紅綠邊框、失速嚴重翻覆。

## 本機開發

```bash
npm install
npm run dev    # http://localhost:5173/
npm run build  # 產出 dist/
```
