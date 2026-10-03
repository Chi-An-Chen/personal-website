# 2026-10-03 研究與工程作品集：本機驗收

> 本文件為第一輪已發布基準。第二輪成果概覽與當輪驗證狀態見 [accomplishment-review.md](accomplishment-review.md)。

依使用者最終澄清，保留原本的黑色個性文字開場與 Scroll down，往下才是淺色個人介紹。新的精簡作品集、互動示意與既有事實紀錄一併保留。本文件記錄本機驗收結果；使用者於 2026-10-03 核准提交與發布。正式部署結果以對應 commit 的 GitHub Actions 紀錄為準。

## 設計與內容

閱讀順序為黑色宣言 → 淺色人物介紹 → 三件精選作品 → 簡短背景 → 聯絡。宣言沿用原文 “From perception, to reasoning, to practice.”，兩語皆以 `lang="en"` 呈現；人物區則清楚呈現 Chi-An Chen／陳麒安、AI research & engineering、農業 VLM 重點、真人照、在學身分及作品入口。

人物介紹與內頁使用暖白、深綠文字及克制分隔線；綠、藍、陶土色的概念圖區分研究問題。保留 Source Serif 4、Source Sans 3 與系統繁中字體，不引入框架、動畫依賴或生成的人物影像。首頁短案例都連到既有 Research／Experience 的穩定錨點。

[heyclicky](https://www.heyclicky.com/) 的參考重點是短文案、清楚入口與可操作示範，沒有仿製復古桌面或品牌元素。使用既有 high-end-visual-design 的層級與留白指引，依專案規則限制套用。Impeccable／Emil 未安裝或作為依賴。瀏覽器驗證使用既有 Playwright skill 與本機 Chrome。

三件作品共用原始 factual record 中的短版問題、貢獻與成果：

- CROP：農業細粒度辨識、視覺監督、三種互補訓練目標與精簡推論。
- VeriTool：保留合作研究歸屬；比較輸出格式、正確率與驗證成本，效益依設定而定。
- 檢索應用：文件檢索、SQL 與 API 整合的領域問答流程。

所有示意標記為「概念示意」，不冒充實際模型輸出。沒有新增準確率、效能、出版狀態、商用部署或獨立完成宣稱。角色、獎項、學習紀錄及既有錨點完整保留。所有新文案具建置期繁中翻譯；缺漏仍使建置失敗。

## 開場與互動

- 三句文字各 1100ms，延遲為 300／800／1300ms，總長約 2.4 秒；以可讀的 .48 opacity 提亮至 1，向上移動 16px。沒有逐字特效、模糊閱讀區或循環動畫。
- 字體就緒且分頁可見後，經兩個畫面更新機會才開始。背景開啟不消耗動畫；播放中隱藏時暫停，回來繼續，已完成的句子不重播。
- 等待與無 JS 的基礎狀態始終完整可讀。reduced motion、API 不支援、focus、錨點、離頁與列印皆直接完成。人物介紹、正文、書目及 CTA 沒有入場等待。
- Scroll down 始終是原生 `#site-header` 連結，動畫中也能操作。保留一次向下手勢進場、超大文字原生捲動、無計時自動進場、已離屏開場移出文件流與位置補償。
- 沿用可選的同分頁 sessionStorage 略過；只有頁面可見才記錄首次進入。回訪、reload、history、內部 Home／語言連結直接進入人物區，儲存失敗時仍有錨點與原生捲動。
- 三組圖解由原生 radio 與 CSS `:has()` 驅動，200–260ms 轉場可連續反向操作。尺寸參考保留最長翻譯高度，閱讀區不因切換位移。無 JS 仍可操作。
- 導覽只有 active pill 可跨頁移動，root 不參與，overlay 不攔截點擊。減少動態時明確停用原生 View Transition 及其過場動畫。

## Home 綠框修正

已讀取使用者截圖並重現：返回 `#site-header` 時，瀏覽器把焦點放在具有 `tabindex="-1"` 的導覽容器；原全域 `:focus-visible` 會畫出 3px 綠框。現在只移除 `#site-header`／`#main` 這兩個定位容器的 outline，保留原生焦點管理。一般連結與控制項改用 2px 中性灰焦點線；黑色開場的 Scroll down 保留淺色焦點提示。沒有全域關閉 outline。

## IEEE Xplore 連結

以使用者提供的 [IEEE 作者頁](https://ieeexplore.ieee.org/author/325765059341820) 實際顯示的題名、完整作者、會議與年份核對。三個逐篇連結在英文／繁中 Publications 共用同一資料來源；原題名不翻譯，連結的 accessible name 包含完整題名。

| 既有紀錄 | 官方連結 |
| --- | --- |
| FAHU-Mamba · AIxMHC 2025 | [IEEE Xplore](https://ieeexplore.ieee.org/document/11326816/) |
| SSIU-Net · AIxMHC 2025 | [IEEE Xplore](https://ieeexplore.ieee.org/document/11326852/) |
| LViT-CB · IS3C 2025 | [IEEE Xplore](https://ieeexplore.ieee.org/document/11130997/) |

Transformer-Mamba UNet（AVSS 2025）、中文 ITAOI 2025、中文 ITAC 2024 未取得可靠的官方文章網址，保留原紀錄且不加猜測連結；未把 ITAOI 與 IS3C 視為同一篇。作者頁入口位於 Publications 標題旁。

## 變更範圍

| 範圍 | 主要檔案 |
| --- | --- |
| 首頁、作品概念圖 | `HomePage.astro`、`WorkDemo.astro`、`portfolio.css` |
| 共用版型、開場、focus | `Layout.astro`、`global.css`、`editorial.css`、`motion.css`、`motion.ts` |
| 內頁與出版品 | `ResearchPage.astro`、`ExperiencePage.astro`、`AboutPage.astro`、`publications.ts` |
| 共用內容／雙語 | `research.ts`、`engineering.ts`、`types.ts`、`zh.json` |
| 驗證 | `check-build.mjs`、`qa-portfolio.js`、`qa-portfolio-interactions.js`、`qa-opening-visibility.js`、`qa-focus-return.js` |
| 文件 | `AGENTS.md`、`README.md`、設計指引、部署／動態歷史註記、本文件 |

亦保留本輪已修正的開發字體路徑：font-face 由 `assetUrl()` 產生，正確帶入 GitHub Pages 專案 base。

## 實際驗證

| 檢查 | 結果 |
| --- | --- |
| `npm run check` | 通過，40 files，0 errors／warnings／hints |
| `npm run build` | 通過，13 個靜態 HTML 頁面 |
| `node scripts/check-build.mjs` | 通過；8 雙語主頁、4 相容頁、404、382 本機參照、25 允許公開檔案 |
| 開場、真實背景分頁、出版品 | **57／57**；兩語、桌面／手機、visible／hidden 時間、早／晚切頁、回訪、history、中斷、reduced motion、無 JS、逐篇連結與焦點 |
| 回 Home 焦點 | **20／20**；EN／繁中 × 1280／390px，滑鼠／鍵盤返回、下一 Tab、語言切換、history |
| 完整作品集回歸 | **149／149**；四主頁 × EN／繁中 × 1280／390／320px、無溢出、字體／圖片、作品狀態與固定高度、鍵盤／錨點／歷史、快速反向操作、200% 文字、無 JS |
| 補充互動 | **7／7**；穩定人物介紹、中途 reduced motion、重複導覽、雙語模擬觸控、列印圖說、開發字體 HTTP 200 |
| 合計 | **233／233**，最後驗證無失敗；各套件保留原始 JSON 與平面彙整 |
| Git／公開邊界 | `git diff --check` 通過；Git index 不含 reference_data、work、PDF、dist、node_modules、QA output |

效能預算仍由 build contract 強制檢查：head check＋motion runtime ≤4 KiB gzip；Home CSS 與 shared motion CSS 各 ≤3 KiB，兩者合計 ≤4 KiB。沒有新增套件或 lockfile 變更。

主要證據：`opening-visibility-native.json`、`focus-return.json`、`portfolio-final.json`、`interactions-final.json`、`qa-report.json`，以及 `opening-{en,zh}-{desktop,mobile}.png`、`light-hero-{en,zh}-{desktop,mobile}.png`、`publications-{en,zh}-{390,1280}.png`、`home-frame-before.png`、`home-frame-after-{en,zh}-{390,1280}.png`。

真實背景測試使用隔離 Chrome 視窗，透過 Playwright CLI 的 CDP 連線保留原生 visibility。普通 Playwright 啟動會覆寫 focus，令所有分頁顯示 visible，故不能用來證明此情境；未把那次失敗探測算作通過。實際記錄英文動畫時間在隱藏的 2.4 秒內保持 **659.254ms**，繁中保持 **642.541ms**，回來後接續；較晚切頁也不重播已完成的第一句。截圖只用於版面檢視，動態判定使用實際 opacity、transform、playState 及 currentTime。

初輪測試的 history load-event 等待已改為檢查 navigation commit 後的實際目標與焦點；初次鍵盤測試則從無 fragment 的真正新文件開始，避免把 `#site-header` 原生焦點位置誤認為 Tab 順序錯誤。容器 frame 檢查依 outline-style 判斷是否繪製，不依瀏覽器可能仍回報的 medium outline-width。沒有放寬 factual、路由、錨點、i18n 或鍵盤可用性檢查。

沒有測實機 iOS／Android、Safari／Firefox、VoiceOver 或公開部署，沒有宣稱固定 60fps 或完整 WCAG 合規。

## 本機重看

- [英文首頁](http://127.0.0.1:4322/personal-website/)／[繁中首頁](http://127.0.0.1:4322/personal-website/zh/)
- [直接看人物與作品](http://127.0.0.1:4322/personal-website/#site-header)
- 開發預覽：`http://localhost:4321/personal-website/`

全新分頁首次進入主頁可看到黑色開場。同分頁已看過時，Home 會直接進入人物區；這是保留的回訪行為。預覽用 `npm run astro -- dev status`／`preview status` 查詢，以 `dev stop`／`preview stop` 停止。

本機證據在忽略目錄 `output/playwright/`。完整 QA 與截圖不進入 Git／公開產物。開發參考：[Astro components](https://docs.astro.build/en/basics/astro-components/)、[styling](https://docs.astro.build/en/guides/styling/)、[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)、[Animation.pause](https://developer.mozilla.org/en-US/docs/Web/API/Animation/pause)。
