# 繁中／英文版本驗收

2026-09-14。延續現有 editorial 版型，完成預先撰寫的繁體中文版本。此紀錄涵蓋本輪雙語功能；較早的整站設計與測試見 `deployment-readiness.md`。

## 實作與維護

- 英文保留原網址與預設語言；新增 `/zh/`、`/zh/research/`、`/zh/experience/`、`/zh/about/`，所有網址沿用 `/personal-website/` base。
- 八個主頁由四個共用頁面元件產生。`Locale`、`pageUrl`、Layout、日期與概念圖均支援語言參數；`src/i18n/zh.json` 維護中文文案，以英文原文為鍵。缺漏或空白翻譯會中止建置，未使用英文正文作為 fallback。
- ID、日期來源、論文書目、獎項關聯與段落 anchors 共用。論文題名、作者、會議及課程／證照正式名稱保留原文；一般敘述、日期顯示、UI、alt、無障礙標籤與 metadata 本地化。
- 中文以「陳麒安」為主要姓名並呈現 Chi-An Chen。保留 DoRA 設定、SLM 數學推理的合作歸屬及 CV 直接敘述；沒有新增成果、數字或私人來源資訊。
- 「繁中 / EN」為原生連結，前往同一主頁另一語言版本的頁首；站內導覽維持語言。不加入偵測、儲存偏好、自動跳轉或 client script。
- 中文沿用現有字體資產並採用系統 CJK fallback，調整標題字距與行高。沒有新增依賴、字體下載或翻譯 API。

## SEO 與相容網址

八個主頁各有正確 `lang`、自身 canonical、本地化 metadata、雙向 `hreflang` 與英文 `x-default`；sitemap 收錄八頁。四個英文相容頁保留 noindex，其中文切換前往 About／Experience 對應段落。單一 `404.html` 提供雙語提示及兩個首頁入口。

預期輸出為 13 個 HTML、24 個允許公開檔案。建置檢查保留無 client script、base path、有效連結、私人資訊與資產允許清單規則，並加入語言切換、metadata、sitemap、翻譯完整性及雙語 anchors／書目一致性檢查。

## 本輪驗收

- `npm run check`：32 個 Astro 檔案，0 errors／warnings／hints。
- `npm run build`、`node scripts/check-build.mjs` 通過；336 個本地引用有效。實際呼叫缺漏翻譯確認會拋出錯誤。
- Chromium 實際瀏覽八個主頁，1280、390、768、320 px 共 32 組版面未出現水平溢出；檢視桌面與手機畫面、中文長標題及概念圖。
- 八頁在 1280、390 px 的 200% 根文字尺寸共 16 組檢查未溢出。這是文字放大測試，不宣稱為原生 browser zoom。
- 無 JavaScript、reduced-motion 情境下，四頁均可雙向切換、返回與維持語言導覽；四個相容頁中文入口抵達正確段落。
- Tab／Shift+Tab、skip link、可見焦點與 Research details 的 Enter／Space 操作通過。兩種語言的七筆課程固定展開，NVIDIA DLI 名稱保留原文。
- 截圖及操作紀錄保存在已忽略的 `work/i18n/`。本輪使用 Chromium 模擬視窗；未重跑其他瀏覽器引擎、實體手機或螢幕閱讀器測試。

## 發佈

依本次授權提交並推送 `main`。GitHub Pages workflow 會在乾淨 checkout 執行 `npm ci`、型別檢查、建置與公開內容檢查後部署；具體提交與 workflow 結果以 GitHub Actions 紀錄為準。
