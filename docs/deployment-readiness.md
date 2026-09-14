# Final redesign — Deployment readiness

2026-09-14。四頁網站、內容遷移與部署前整合已完成。延續核准的 Research in Practice 基線；本輪沒有提交、推送或部署。

## A. 最終架構

主導覽：Home、Research、Experience、About。頁尾為姓名（Home）及 Research、Experience、About、LinkedIn、GitHub。四個入口在手機直接顯示，無漢堡選單；目前頁面有 `aria-current`、可見 focus 與 underline。

Home 保留人物介紹與 VLM → 合作推理 → retrieval 順序。Research 保留 VLM 最大份量、reasoning／verification、CV foundation、六筆出版品及下方 reproduction 短段。沒有新增語音研究。

## B. 主要實作

- `Layout.astro` 統一 editorial 系統，移除 legacy 分支與七頁導覽。補齊 canonical、robots meta、Open Graph、Twitter card、自託管社群預覽 PNG；保留 favicon 並同步色彩。
- 資料分為 `ResearchTheme`、`EngineeringWork`、`Role`、`Publication`、`Recognition`、`LearningItem`，並建立案例、角色、能力、書目與獎項連結。沒有 repo visibility 欄位或私人程式碼入口。
- 保留 Phase 1 概念圖與真人 WebP。新增共用頁首／日期元件；Experience 和 About 各用 scoped CSS，沒有通用卡片系統。
- 移除舊 Skills 資料、舊 PageIntro／RelatedLinks 元件與失去用途的 legacy CSS。型別檢查排除本機來源、工作目錄與技能目錄，避免把 QA 備份當成網站原始碼。
- Home／Research 的調整限於四頁導覽、最終站內連結、metadata、WebKit list semantics、文字放大時的 Grid 重排。沒有重做已核准的內容或構圖。
- 全站移除正文縮放與 scroll timeline，無 client runtime script、框架或新增網站依賴。`package.json`／lockfile 未變更。

## C. Experience

四筆角色保留既有職稱、機構、起訖與已核對地點，角色脈絡之後才展開四組工程工作：

1. Retrieval／document applications：問題、個人工作、SQL／文件證據與對話整合；另區分 sustainability-document QA 與抽取／摘要工作。配合概念流程圖。
2. Predictive modeling／language tasks：結構化 admissions features、神經模型、特徵工程、ensemble、事件序列與文字分類。沒有機率校準、榜單或 production 規模宣稱。
3. Data pipelines：爬取、清理、異質資料標準化、文件處理、空間對應、通勤資料與 routing API；未把 API 整合稱為自研導航演算法。
4. Perception／inference：影像與影片處理、辨識／偵測、品質評估、防偽／deepfake 模型評估與適應、ONNX Runtime／CPU inference 及 API 整合。

五組 capabilities 均連至實際 Research／Experience 段落。沒有把未確認歸屬的工作掛到 PAPAGO；該角色僅呈現已核對的職稱、日期與機構。

## D. About

- 遷移兩筆學位及其日期、NIU、MIT Lab／導師與本科研究脈絡。碩士介紹更新為農業 VLM、病蟲害理解、reasoning-oriented adaptation 與共同小模型研究，未堆疊方法細節。
- 遷移三筆論文團隊獎與四筆競賽團隊獎，保留獎名、日期、context 與成果；論文獎直接連回原書目。
- 遷移五筆證照、七筆課程紀錄及社群／服務學習參與。課程置於原生 details，與證照及正式研究成果分層。
- 六筆 publication 的完整物件，以及五筆 credential、七筆 course 的原始欄位，已與 Phase 1 遷移前資料逐項比對一致。Jetson Nano 的兩次課程名稱／日期仍保留。

## E. 舊網址遷移

所有路徑含 `/personal-website/` base。

| 舊網址 | 相容頁的主要連結 |
| --- | --- |
| `/education/` | `/about/#education` |
| `/skills/` | `/experience/#capabilities` |
| `/honors/` | `/about/#recognition` |
| `/certifications/` | `/about/#credentials` |

相容頁為 GitHub Pages 可服務的靜態 HTML，有可讀 fallback、`noindex, follow` 及最終主頁 canonical，不自動跳轉、不宣稱 HTTP 301。Honors 的 paper／competition anchors、Certifications 的 credentials／courses 入口仍可到達對應內容。Research 的 `publication-1` 至 `publication-6` 與四個既有 role anchors 保留。

另有 `/404.html`。Sitemap 只包含四個主要 canonical URL。Project Pages 的 robots 檔在專案子路徑，不能取代網域根目錄的 robots；各頁已各自提供索引指示。

## F. QA 結果

- 三個瀏覽器引擎 × 四個主頁 × 320／390／768／1024／1280／1440 px：共 72 組，無橫向溢出，字體與圖片載入正常。
- 四個相容頁 × 320／1280 px × 三引擎：共 24 組；fallback 到達正確段落。主頁與舊路徑直接進入、重新整理與四頁導覽均測試。
- 1280／390 px 的 200% 根文字尺寸、無 JavaScript、reduced-motion、字體與圖片失敗情境可閱讀。正常 motion 下三個捲動位置的正文均無 transform／animation。
- 鍵盤檢查包含順向／反向導覽、skip link、可見 focus、Enter／Space 操作 details。截圖與操作測試分開，避免全頁截圖重排改變焦點。
- axe-core 4.13.0：四主頁、四相容頁及 404，在 details 開／關狀態共 18 次掃描，0 violations。Research／Experience 的 decorative arrow 有 color-contrast 人工判讀項目；箭頭使用 accent，對比 5.77:1，並設為 `aria-hidden`。
- 語意檢查涵蓋單一 h1、無跳級 heading、main／nav landmarks、連結文字、alt、figure／figcaption、details labels、日期／清單與出版品語言。

修正的實際問題：200% 行動文字放大時 Grid 的 min-content 寬度造成溢出，已改為可收縮欄位與長字換行；WebKit 重複請求預載字體，已取消多餘 preload，最終每頁每字體僅一次請求。

## G. 瀏覽器／無障礙覆蓋

| 覆蓋 | 已驗證 | 限制 |
| --- | --- | --- |
| Chromium 153.0.8010.37 | 完整響應式、操作、fallback、語意與 axe | 本機桌面瀏覽器模擬手機視窗 |
| Firefox 155.0 | 六種寬度、導覽／reload、字體、details、focus、reduced-motion、文字放大、fallback；另測 no-JS 導覽 | Playwright 的 Firefox 引擎，未實測實體手機 |
| WebKit 26.5 | 同上；macOS 預設使用 Option+Tab／Option+Shift+Tab 瀏覽連結，Enter／Space 操作正常 | WebKit 引擎實測，不等同 Safari.app 或實體 iOS Safari 測試 |
| Assistive technology | semantic review completed; full screen-reader user testing not performed. | 未操作 VoiceOver，未做真實使用者測試 |

200% 以根文字尺寸測試，320 px 視窗補查 reflow；未把它宣稱為原生 browser zoom 測試。上述裝置與 AT 限制為非阻擋項目，不影響已驗證的靜態路由、鍵盤與內容閱讀。

## H. 公開安全與 repository hygiene

`check-build.mjs` 檢查 source 與完整 HTML／CSS／SVG／XML／TXT 產物，包括私人 repo 連結／名稱、可見性欄位、本機路徑、內部 IP／GCP service URL、token／key 格式、來源附件與未知公開檔案。資產允許清單限指定字體、真人 WebP、favicon、social preview、產生的 CSS、sitemap／robots 與預期頁面。

最終輸出 20 檔：未發現私人來源、內部端點、憑證、敏感評測、原始證書或研究檔案。保留的公開獎項名稱／團隊成果沿用既有核對資料。沒有將私人 repo 名稱變成前台標籤。原始資料未刪除或上傳。

已檢查 Git status、diff、index、ignore、lockfile 與已移除元件引用。沒有 staged QA 截圖或私人檔案；本輪沒有 staging、commit、push。所有瀏覽器與性能工具安裝在暫存位置，不進網站依賴。

## I. Production build 與性能

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
node scripts/check-build.mjs
```

結果：23 files、0 errors／warnings／hints；9 HTML pages（4 主頁＋4 相容頁＋404）成功產生。輸出檢查通過 186 個本機引用與 20 個明確允許檔案，包含 sitemap、metadata、base path、anchors、DoRA、合作措辭與出版品／獎項關聯。

隔離目錄只帶入 source、public assets、設定、package metadata／lockfile 與 scripts；排除 work、reference_data、私人來源與認證環境。執行全新的 `npm ci --no-audit --no-fund`、check、build、輸出檢查全部成功；20 個產物的 SHA-256 與本機正式建置完全相同。沒有使用原本 node_modules 的 symlink。

最終 Lighthouse 行動版測量（本機服務、模擬 throttling；一次測量，非 field data）：

| 頁面 | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 94 | 100 | 100 | 100 | 2.55 s | 0.0029 | 0 ms |
| Research | 87 | 100 | 100 | 100 | 3.15 s | 0.0073 | 0 ms |
| Experience | 87 | 100 | 100 | 100 | 3.15 s | 0.0018 | 0 ms |
| About | 87 | 100 | 100 | 100 | 3.15 s | 0.0096 | 0 ms |

分數解讀：JSON 的 scores 為 0–1，0.94 等於 94 分。Performance 為載入／穩定性／阻塞指標的加權結果；Accessibility、Best Practices、SEO 的 100 代表此次自動檢查通過，並非完整無障礙認證或排名保證。Agentic Browsing 是仍在發展的分類，本次計分項目為 accessibility tree 與 CLS，通過不表示新增 AI 功能。LCP 是首屏最大內容呈現時間（JSON 單位為毫秒）；CLS 為非預期位移程度、沒有時間單位；TBT 是量到的主執行緒長任務阻塞毫秒數。參考 [Lighthouse 計分](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)、[LCP](https://web.dev/articles/lcp)、[CLS](https://web.dev/articles/cls)、[TBT](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time)。

沒有 client JavaScript；TBT 不等同 INP，未宣稱實際使用者 INP。完整 WOFF2 合計 416,832 bytes，首頁只請求兩個 regular 字體，semibold 在需要時載入。真人 WebP 16,184 bytes，social preview 38,017 bytes（只供分享，不在首頁載入），全站三個 CSS 合計約 20.6 KB。字體仍是主要傳輸成本；保留官方原檔、自託管與授權，未為分數更換核准字體。

GitHub Pages workflow 已唯讀檢查，沿用 main、locked install、獨立 build／deploy jobs、成功驗證後僅上傳 dist；不需修改。Action major versions 已對照官方 releases：[checkout v7](https://github.com/actions/checkout/releases/tag/v7.0.0)、[setup-node v6](https://github.com/actions/setup-node/releases/tag/v6.0.0)、[upload-pages-artifact v5](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0)、[deploy-pages v5](https://github.com/actions/deploy-pages/releases/tag/v5.0.0)。未執行遠端 Actions，也未宣稱已確認正式部署結果。

## 本機證據

全部位於已忽略的 `work/final/`：

- `phase1-qa.json`、`final-firefox-qa.json`、`final-webkit-qa.json`：三引擎的操作與尺寸結果。
- `{chromium|firefox|webkit}-{home|research|experience|about}-{width}.png`：完整頁面；`*-viewport-*` 為首屏，`*-text200-*` 為文字放大。
- `*-compat-*`、`*-details.png`、`*-fonts-failure.png`、`*-image-failure.png`：相容入口與退化情境。
- `axe.json`、`lighthouse-summary.json`、各頁 Lighthouse JSON、`isolated-build.json`：可查核結果。
- `phase1-dist/` 與原頁面備份：用於內容遷移比對，不是公開資產。

## J. 部署狀態

本機預覽：http://127.0.0.1:4321/personal-website/ 。部署仍需使用者另行指示；本輪未 push、未觸發 workflow、未部署。沒有已知結構、路由、內容遷移或公開安全阻擋項目。

**READY TO DEPLOY**
