# Motion & Interaction Identity Pass

2026-09-15。延續 `d01f35b` 的雙語 editorial 網站。本輪只增加開場、閱讀節奏與方法圖檢視；內容資料、主要構圖、路由、書目與角色 anchors 保留。本文記錄本機驗收；線上部署狀態以 GitHub Actions 為準。

## 實作與設計決定

### 開場：Option A

Home 在既有人物 hero 前加入正常文件流的完整首屏宣言：

> From perception,\
> to reasoning,\
> to practice.

兩語都使用這句英文，標記 `lang="en"` 並維持英文行高與字距，保留唯一姓名 h1。開場使用 min-height，文字放大時自然增高。宣言完整可見，不計時、不阻擋捲動；後面的原 hero 維持自然高度。初版導覽位於宣言上方，後續依使用者要求改為下述完整首屏與手動進場。

採用 [Jason Bradley](https://jasonbradley.co/) 先建立識別再進入內容的原則；不移植其開場過場或滿屏作品瀏覽。Option B 的 progressive/sticky 序列會增加閱讀步驟，本輪不採用。

#### 後續調整：純黑完整首屏與手動進場

依使用者最新要求，宣言區由暖黑反轉配色進一步改為純黑 `#000000` 背景與暖白 `#f7f5f0` 文字。以 Layout 的 opening slot 放在導覽前，獨立佔滿首屏；Scroll／往下閱讀連到 `#site-header`，導覽與人物介紹在進場後呈現。首頁以 CSS 隱藏捲軸，保留原生捲動；其他頁面維持原捲軸。列印恢復深色文字。

參考站的開場會自動移開；本站等待使用者第一次向下滾輪、向上滑動、Page Down／向下鍵／空白鍵或點擊 Scroll，再以瀏覽器平順捲動帶到導覽。手勢增強只生效一次，沒有計時自動進場、固定遮罩或捲動鎖。Reduced motion 即時定位；開場超過視窗高度時，手勢保留一般捲動以閱讀放大的文字。沒有 JavaScript 時，文件順序與原生 Scroll 連結仍可用。

本次以 Chromium 在本機開發站檢查 EN／繁中 × 320、390、768、1280px，共八種畫面：開場自 y=0 填滿視窗、導覽在視窗下緣、無水平溢出。另驗證兩語滾輪／點擊／鍵盤進場、等待不自動進場、返回頂端不重播、reduced motion、無 JS 原生連結、深錨點與手機 200% 根字級。桌面與手機截圖已檢視。正式 check、build、輸出檢查及 `git diff --check` 通過。

另以 Chromium 的行動觸控模擬驗證上滑進場，正確停在導覽頂端；尚未以實體手機測試。共用模組仍低於 4 KiB gzip 預算；Astro 設定只針對這個已稽核模組保留 inline，其他資產沿用預設。下方完整跨瀏覽器與 Lighthouse 數據屬於上述調整前的 Motion Pass，本次未重跑該完整矩陣。

後續修正「回捲再次看到宣言」：開場完全離開視窗後，設定 hidden 移出文件流並補償捲動位置；回到頂端只會看到導覽與人物介紹。首頁使用第二個 IntersectionObserver 判斷離場，scrollend 提供備援；移除後解除觀察與監聽。深錨點保留原定位。沒有 JavaScript 時仍是可閱讀的普通文件開場。Chromium 已通過兩語 × 滾輪／點擊／鍵盤的進場後回頂端檢查、reduced motion、深錨點與模擬觸控檢查。

### 一次性進場

借用 [Michal Rome](https://romemichal.pl/#about) 的選擇性閱讀節奏。規劃時實際觀察其裁切標題、延遲淡入、停止捲動後完成及反向不重播；本站使用自己的較短節奏，不推定或引入其函式庫。

- 只標記章節開頭、精選案例的 kicker／heading／短導言與完整方法圖。正文、publication、角色、課程、人物 hero 與內頁首屏保持穩定。
- 標題群：18px／560ms；最多三層、70ms 間隔。圖解：12px／480ms。共用 `cubic-bezier(.22,.75,.25,1)`。
- 手機標題群 10px／400ms，圖解 8px／360ms；不 stagger。
- 進入視窗下緣附近才附加有限時間 CSS animation；開始前記錄已處理並解除觀察。沒有等待解鎖的隱藏 class，也沒有跟捲動進度同步的透明度。
- 首屏、初始化時已經看得到的內容及由上方返回的內容直接完成。CSS animation 結束後自然回到可見的基礎樣式。
- 不採完整標題遮罩：現有長標題、Source Serif 字形與繁中換行更適合短距離整組進場。沒有逐字拆解、文字縮放或重複出入場。

### 方法圖與微互動

ConceptFigure 保留 figure／清單／圖說。步驟與來源節點可依閱讀順序取得鍵盤焦點，不宣告為按鈕，不儲存點選狀態。

- VLM／reasoning：強調目前編號、標題及下一步連線。
- Retrieval：強調目前來源分支、共用連線與 Evidence composition；其他來源維持原本對比。
- 鍵盤 focus-visible 優先於 hover；離開後恢復靜態。觸控沒有額外 tap 邏輯，圖解始終完整。
- 所有圖解檢視以 CSS 完成，無 JavaScript 仍可用。顏色過渡約 160ms，reduced motion 下即時切換。
- 保留原文字入口箭頭回饋；主導覽使用單一細底線與 180ms 過渡，目前頁面持續標示。details 保留原生指示與操作，不動畫展開高度。

### Research 章節定位

重用原三項橫向 theme index，在 ≥1024px 且高度 ≥640px 的視窗內 sticky，並由三個研究主題的共同容器限制範圍。到出版品前自然離開畫面。沒有增加側欄、重複導覽或新標籤。

IntersectionObserver 更新單一 `aria-current="location"`。小數像素容差處理原生錨點落點；索引高度改變時重算 offset，過高時停用 sticky。WebKit 初次深連結若落在索引後方或視窗外，於 pageshow 後一次校正；不校正一般捲動及歷史恢復。

Experience／About 保留原本靜態索引。手機、短視窗、無 JavaScript／observer 不可用時，Research 也維持文件流。

## 技術與退化保證

- 四個主頁元件引入 `MotionRuntime.astro`，共用 `src/scripts/motion.ts` 與 `src/styles/motion.css`。以 `data-reveal-group`／`data-reveal` 明確選入；不使用全域段落動畫選擇器。
- 正式建置由 Astro 產生同一份 inline module，不新增 JS 請求。相容頁與 404 仍沒有 script。無新增框架、動畫套件、字體、圖片或 lockfile 變更。
- 最多兩個 IntersectionObserver；一個 ResizeObserver 只處理索引文字／尺寸變動。沒有連續 scroll handler、逐幀捲動計算或永久 will-change。深連結修正只排程一個 frame。
- 錨點、focus、pagehide／pageshow、reduced-motion 變更與列印時完成動畫。真正的 Back/Forward Cache 返回也維持完成狀態。
- HTML 不預先附加動畫狀態；腳本被封鎖、缺少 observer 或其初始化丟出例外時仍可閱讀。已啟動的 CSS 動畫會自行完成。
- 新增兩個繁中 UI 翻譯；英文宣言是明確保留項目。原 i18n 缺漏即建置失敗、base-path helpers、metadata 與書目來源均保留。
- 建置檢查只允許八主頁的同一個小型 inline module，檢查 4 KiB gzip 上限及禁止其他 runtime import／網路 API；僅允許 `editorial-enter` keyframes。既有私人資訊、資產與相容路由檢查保留。可見文案檢查排除 script 內容，script 本身仍接受公開安全掃描。

## 驗收結果

所有 browser 檢查都對本輪正式 dist 執行，未用開發伺服器的 HMR 行為作為驗收。

| 引擎 | 版面／狀態矩陣 | 補充版面 | 動態專項 |
| --- | --- | --- | --- |
| Chromium 153.0.8010.37 | 96 組通過 | 24 組通過 | 10 組通過 |
| Firefox 155.0 | 96 組通過 | 24 組通過 | 10 組通過 |
| WebKit 26.5 | 96 組通過 | 24 組通過 | 10 組通過 |

矩陣為四頁 × 兩語 × 390／768／1280px × 正常動態／reduced motion／no-JS／鍵盤。補充為八頁各測 320px、1280×540 短視窗及桌面 200% 根文字尺寸。後續定位修正另做相關專項重驗。

- Chromium／WebKit 各 12 組額外操作檢查通過：手機 200% 根文字、相容入口／404、no-JS／reduced-motion 圖解焦點、觸控靜態、慢速閱讀時正文穩定。
- 快速跳過、反向捲動、停止捲動後完成、進場次數、native anchors、reload、雙向語言切換與 Back／Forward 通過。
- 另以允許 BFCache 的 Chrome session 實際觀察 `pageshow.persisted` 從 false 到 true；返回時 scrollY 恢復，所有 reveal 內容處於完成狀態。不是模擬 dispatch 的事件。
- 模擬 CSP 封鎖 script、刪除 IntersectionObserver、observer constructor 丟出例外，內容與靜態索引均可閱讀。
- 鍵盤覆蓋 skip link、完整 Tab 閱讀順序、圖解、Enter／Space 操作 details。未出現被 sticky 遮住的焦點、橫向溢出或殘留隱藏文字。
- axe-core：八頁各檢查靜態及圖解 focus，共 16 次，0 violations。 箭頭與索引編號的 color-contrast 人工判讀項目，已依實際沿用色彩核算：accent／paper 為 5.77:1，muted／paper 為 6.19:1；未把 incomplete 項目當作自動通過。正式書目、日期、角色／獎項關聯、課程展開與雙語 anchors 亦由建置檢查驗證。
- `npm run check`：34 files，0 errors／warnings／hints。`npm run build`：13 HTML pages。輸出檢查：344 個本機引用、25 個允許公開檔案。`git diff --check` 通過。

驗證界線：瀏覽器引擎與裝置尺寸模擬，未使用實體手機或 Safari.app，未完成螢幕閱讀器使用者測試。200% 使用根文字大小，不宣稱為原生 browser zoom。

## 效能與交付

效能數字由相同本機 static server 設定、Lighthouse 模擬行動環境、各頁前後各三次取中位數。這是實驗室比較，不是正式網站的 field data。完整原始結果及本輪瀏覽器操作紀錄保存在 Git 忽略的 `work/motion-identity/`，不進公開輸出。

| 頁面 | Performance 前 → 後 | LCP 前 → 後 | CLS 前 → 後 | TBT 前 → 後 |
| --- | --- | --- | --- | --- |
| Home | 92 → 92 | 2.70s → 2.70s | 0.0122 → 0.0041 | 0ms → 0ms |
| Research | 84 → 84 | 3.45s → 3.45s | 0.0109 → 0.0096 | 0ms → 0ms |
| Experience | 84 → 84 | 3.45s → 3.45s | 0.0018 → 0.0018 | 0ms → 0ms |
| About | 85 → 85 | 3.30s → 3.30s | 0.0096 → 0.0096 | 0ms → 0ms |

新增共用 module 為 3,171 bytes，獨立 gzip 為 **1,320 bytes（1.29 KiB）**，低於 4 KiB 預算。所有 CSS 產物各自 gzip 後加總由 5,021 增至 6,470 bytes，增量 **1,449 bytes（1.42 KiB）**，低於 3 KiB 預算。沒有新增 JavaScript 網路請求。LCP 中位數差異小於 1ms，不作為速度改善主張；未見可辨識的載入效能退步。Home 的主要首屏內容已改為宣言，LCP 元素也隨之改變。

三引擎另各完成四組雙語／100% 與 200% 文字的索引檢查；三個 native anchors 及 aria-current 均正確。文字放大後索引高度會更新 offset，不遮住落點。

最終畫面檢視涵蓋宣言首屏、原人物 hero、Research 主題與索引、圖解 focus、Experience 與 About 的雙語換行。宣言作為唯一新開場，人物介紹緊接；方法圖以路徑而非裝飾提供互動識別。保留的效果都不要求讀者等待；正文閱讀速度不受進場控制。

原始資料、QA 截圖、baseline dist、效能報告均留在被 Git 忽略的本機工作目錄；索引中沒有 reference_data 或 work 檔案。網站依賴與 lockfile 未變更。本輪未推送、部署或更改已發佈網站。
