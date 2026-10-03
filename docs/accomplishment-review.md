# 2026-10-03 第二輪：研究成果概覽（提交前審查）

基準為 `f34c57f108b39f9d5f7d1cf790bbce2a7ea0ef8b`；開始時工作目錄乾淨，遠端 main 同 SHA。本輪依使用者核准，以「30 秒辨識研究方向、代表成果及個人貢獻，一次點擊進入佐證」重整首頁。第一輪紀錄與 233 項瀏覽器驗證見 [portfolio-review.md](portfolio-review.md)，該數字不代表本輪已重跑。

## 設計與頁面分工

保留原本黑色三行宣言、Scroll down、2.4 秒可見時間入場及淺色真人介紹。人物介紹縮為姓名、在學身分、學校與一句定位，保留真人照及研究／經歷入口。移除第二組標語及首頁長案例。

首頁採開放式編輯排版：左側的 6 筆論文與語言分類、右側三條研究貢獻，讓研究成為第一閱讀層；下一層呈現三項代表團隊獎項及一項有依據的工程交付，認證只佔較小的摘要列。沿用暖白、深綠與 Source 字體，沒有圖表牆、動畫計數或新增動態依賴。

- Home：成果概覽與直接入口；保留 `selected-title` 及三個 `selected-*` 錨點。
- Research：方法、個人貢獻、結論適用範圍與六筆完整書目；接收 VLM／reasoning 原生 radio 圖解。
- Experience：角色、四組工程工作與能力；接收 retrieval 圖解。
- About：學歷、七項團隊獎項、認證、課程與參與紀錄；原檔未變。

原本三張完整方法圖仍在原內頁，以「完整方法概覽」原生 details 收納。圖解文字、方法段落及原有進階說明沒有刪除。首頁不再載入圖解 CSS；圖解仍使用原本的可中斷 CSS transitions。沒有更動開場、頁面導覽或 focus 程式。

## 計數與主張邊界

計數集中於 `src/data/overview.ts`，從既有 factual records 建置，兩語使用同一數字；重複 ID 與相同題名／會議／年份的重複書目會阻擋建置。

| 類別 | 本輪定義與選材 |
| --- | --- |
| 研討會論文 | 6 筆既有書目：4 英文、2 中文，2024–2025。是書目紀錄數，不是六個獨立研究題目；LViT-CB 的 IS3C／ITAOI 是既有不同會議紀錄。 |
| CROP／VeriTool | 研究主題，不納入六筆論文數；未新增已接受、審查中或發表狀態。VeriTool 保留合作研究歸屬。 |
| 獎項 | 原有 7 筆完整保留；首頁選 AVSS Best Creative Award、IS3C Best Conference Papers、International ICT Innovative Services Awards 第三名，皆 2025，保留作者團隊／團隊獎與 PR3 背景。 |
| 工程交付 | 既有產學角色已記載升學諮詢應用部署至 GCP Cloud Run 及 API 功能檢查；精簡摘要放在該角色資料中，首頁連到工程案例與角色紀錄。不推定商用規模或 PAPAGO 任務。 |
| 認證 | 只計 `kind: credential` 的 5 項專業／廠商認證；7 筆課程、1 項參與紀錄不計入。沒有推定目前資格有效性。 |

依據為專案內已整理的 `publications.ts`、`recognition.ts`、`learning.ts`、`roles.ts`、`research.ts`、`engineering.ts`，並核對既有來源對照與研究文案紀錄。原始檔與查核筆記仍留本機；本輪沒有重新宣稱已逐張檢視所有原始證書。既有三個 IEEE 官方文章網址完整保留。

## 變更範圍

- 頁面／圖解：`HomePage.astro`、`ResearchPage.astro`、`ExperiencePage.astro`、`WorkDemo.astro`。
- 資料／翻譯：新增 `overview.ts`；`roles.ts`／`types.ts` 加入已有角色事實的短版交付摘要；`zh.json` 新增對應文案。
- 樣式：重整 `portfolio.css`；既有圖解樣式移至 `work-demo.css`，由圖解元件載入。
- 驗證：`check-build.mjs` 更新圖解位置契約並增加首頁計數／獲獎／交付檢查；兩份既有 portfolio 瀏覽器測試改為到對應內頁操作，保留 keyboard、motion、反向操作、no-JS 等功能檢查。
- 文件：本文件、README、AGENTS 與設計 brief 的現行方向註記。

`motion.ts`、`motion.css`、`global.css`、`editorial.css`、Layout、About、原書目／獲獎／學習／教育資料、套件與 lockfile 均與基準位元組相同。沒有提交、推送、部署、tunnel 或新的軟體安裝。

## 實際驗證

| 檢查 | 本輪結果 |
| --- | --- |
| `npm run check` | 通過；41 files，0 errors／warnings／hints。 |
| `npm run build` | 通過；13 個靜態 HTML 頁面。 |
| `node scripts/check-build.mjs` | 通過；388 個本機參照、25 個允許公開檔案，雙語／錨點／書目／公開界線／動態預算契約均通過。 |
| 兩份修改的 browser QA JS 語法檢查 | 通過。只有語法與靜態選擇器自審，尚未執行測試。 |
| `git diff --check` | 通過。 |
| CSS gzip | Home 1505 bytes、detail demos 1920 bytes、shared motion 1412 bytes；既有 Home／motion 預算保留，detail demos 另有 3 KiB 上限。 |
| 桌面／手機、兩語、焦點、reduced motion、no-JS、反向捲動與動畫中斷 | **本輪未執行瀏覽器驗證**。沒有已安裝的獨立 headless browser；未開啟或控制使用者 Google Chrome。 |
| 真實背景分頁 pause／resume | **本輪未重跑**；原 runtime 與開場 markup 未變，不能用靜態比對冒充行為驗證。 |
| 公開部署 | **未執行**；先交父執行緒做 scope／correctness review，取得內部 release go-ahead 後再提交推送。 |

本輪 build contract 初次失敗來自搬移後的測試範圍：`Team` 大小寫、一般敘述中的 `checked`、舊方法圖也含「概念示意」。已將斷言限定到對應資料／input／圖解標題，保留原本應驗證的數量與功能，最終檢查無失敗。

本機檢查證據位於忽略目錄 `work/second-pass-review/`。審查套件包含靜態產物、完整工作差異、新增來源檔、精簡資料對照與 hashes；不包含 `.git`、原始私密資料、記憶、node_modules 或憑證。此階段沒有啟動本機伺服器；`dist/` 可交受支援環境提供預覽。父執行緒將協調後續瀏覽器驗證及發布節點。
