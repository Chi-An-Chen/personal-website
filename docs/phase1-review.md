# Phase 1 — Homepage＋Research 原型驗收

> 2026-09-14 全站整合完成：Home／Research／Experience／About 已統一 editorial 系統，四個舊路徑保留相容頁。最新架構、建置與瀏覽器驗收以 [deployment-readiness.md](deployment-readiness.md) 為準；下方 Phase 1 與舊七頁紀錄保留為歷史。

2026-09-14。兩頁工作原型完成；未提交、推送或部署。保留七個路由，其餘五頁未改版。

## A. 實作內容

- `Layout.astro` 新增預設 legacy 的 variant；僅 Home／Research 使用 editorial。新頁首直接顯示 Home、Research、Experience，手機不使用漢堡選單；頁尾保留七頁。
- Source Serif 4／Source Sans 3 自託管 WOFF2，保留授權及系統／CJK fallback。字體取自 Adobe 官方 source-serif／source-sans release；授權位於 `docs/font-licenses/`。
- 建立 ResearchTheme／EngineeringWork 最小資料、三筆研究主題、一筆檢索工程案例與三種語意 HTML／CSS 概念圖；未新增執行階段依賴。
- 背景 #f7f5f0 上，主文字、次要文字及 accent 對比分別為 14.42:1、6.19:1、5.77:1。
- 延續 base path、既有真人 WebP、學位與角色來源。樣式限定 editorial，圖解及 Research 局部規則使用 scoped CSS。

## B. 首頁評估

定案順序為 Hero → Selected Work → Background → Continue。姓名、真人照片、碩士／學校資訊與指定介紹建立人物定位；1280 × 800 與 390 × 844 首屏均能看到主要與次要入口。PAPAGO 實習資訊在 Background。

三個案例依序為農業 VLM、合作推理／驗證、檢索工程。桌面以文左圖右、圖左文右、文字加橫向流程區分；手機維持先文字後圖。方法圖標明為概念流程，不呈現捏造的模型輸出或數值。

**Working-method 已移除。** Research models／Evaluate methods／Build applications 的三句版本已實際加入並比較：在桌面重複 hero 的工作範圍與案例方法，手機則增加進入案例前的閱讀距離，沒有提供新的具體資訊。最終採無此段落版本。

本機畫面證據（全部位於 Git 忽略的 `work/phase1/`）：

| 比較 | 桌面 | 手機 |
| --- | --- | --- |
| 有 working-method | `home-with-method-1280.png` | `home-with-method-390.png` |
| 無 working-method | `home-without-method-1280.png` | `home-without-method-390.png` |
| 最終首屏 | `final-home-viewport-1280.png` | `final-home-viewport-390.png` |

## C. Research 層級

三個頁內入口依序導向 VLM、reasoning／verification、CV foundation。VLM 篇幅最大，核心 question、contribution、approach、概念圖及 methods 預設可見，只有補充方法使用原生 details。DoRA 放在詳細方法，不暗示所有歷史實驗都使用相同設定。

推理內容明示 “In collaborative research…”，共同研究合併呈現。CV 分開說明指靜脈辨識與醫學分割的方法背景，不繪製沒有證據的效能演進。六筆出版品保留原題名、作者、會議、年份、語言與獎項關係，以及 `publication-1` 至 `publication-6` anchors；只新增資料 ID。Reproduction／exploration 位於下方短段落，不新增第四個主題。

畫面：`final-research-1280.png`、`final-research-390.png`、`research-vlm-detail-390.png`。

## D. 響應式與操作結果

- 真實 Chrome 瀏覽器檢查兩頁 1280 × 800、390 × 844，並補查 768 × 844、320 × 844：無橫向溢出，手機圖解改為直向，長題名可換行。
- Tab／Shift+Tab、可見 focus、skip link、details 的 Enter／Space、頁內入口與跨頁 CTA 通過。
- 關閉 JavaScript、reduced-motion、封鎖字體下載及 200% 根文字尺寸情境可閱讀，無橫向溢出。原型正文在正常 motion 下三個捲動位置均無 transform／animation。
- 其餘五頁在 1280／390 px、reduced-motion 下與修改前建置進行 10 組完整截圖比較，全部逐像素相同。
- 正常載入檢查沒有頁面錯誤或請求失敗。完整操作與結果保存在 `work/phase1/browser-qa.js`、`browser-qa.log`，字體 fallback／文字放大另有截圖。

以上為桌面 Chrome 的視窗及設定模擬；尚未完成 Safari、Firefox、實體手機或完整螢幕閱讀器驗收。

## E. 建置與公開資訊檢查

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`：27 files，0 errors／warnings／hints。
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`：七頁成功建置。
- `node scripts/check-build.mjs`：七頁、209 個本機引用、15 個公開輸出檔案通過。檢查包含 base、連結／anchors、唯一 title／description、單一 h1、無 client script、導覽、案例順序、DoRA、合作措辭、出版品關聯，以及 HTML／CSS／SVG 引用。
- 字體採三個明確允許項目，未放寬任意資產。前台沒有私人 repository 名稱、路徑、visibility 欄位、私人端點或來源附件；公開輸出以 allowlist 與敏感內容規則檢查。
- 隔離目錄只複製網站程式、公開素材及必要設定，沿用本機已安裝依賴；未帶入 `reference_data/`、`work/` 或 GitHub 認證環境。正式 build 與輸出檢查再次通過，紀錄位於 `work/phase1/isolated-build.json`。此項驗證建置獨立性，未宣稱在全新機器完成依賴安裝。
- Git index 未包含本機來源與截圖；未更動依賴或 lockfile。

## F. 後續工作與停止點

Phase 1 在此停止。Experience、About、其餘頁面內容及路由遷移、最終研究素材、全站動態統一與正式上線驗收留待下一階段。四頁架構仍是後續提案；目前沒有 About、相容頁或 redirect。
