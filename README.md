# Chi-An Chen — Personal Website

人物為中心的 AI research & engineering 網站，使用 Astro、TypeScript、semantic HTML 與 CSS。延續核准的 Research in Practice 方向，四個主要頁面為 Home、Research、Experience、About。

預期正式網址：**https://chi-an-chen.github.io/personal-website/**

網站以 GitHub Actions 部署；雙語功能與維護方式見 [雙語驗收紀錄](docs/i18n-review.md)。原版驗收範圍與限制見 [部署準備紀錄](docs/deployment-readiness.md)；Phase 1 的歷史紀錄保留於 [phase1-review.md](docs/phase1-review.md)。

## 開發與建置

CI 使用 Node **22.19.0**。依既有 lockfile 安裝：

```sh
npm ci
npm run check
npm run build
node scripts/check-build.mjs
```

受限環境可加 `ASTRO_TELEMETRY_DISABLED=1`。開發伺服器使用背景模式：

```sh
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

正式產物的本機預覽：

```sh
npm run preview -- --host 127.0.0.1 --port 4321
```

入口是 http://127.0.0.1:4321/personal-website/ 。先用 `npm run astro -- preview status` 檢查既有服務，使用 `npm run astro -- preview stop` 停止。

## 路由與索引

| 路徑 | 行為 |
| --- | --- |
| `/` | Home |
| `/research/` | Research；保留 `publication-1` 至 `publication-6` |
| `/experience/` | Roles → engineering work → capabilities；保留既有 role anchors |
| `/about/` | Education → recognition → credentials & learning |
| `/zh/`、`/zh/research/`、`/zh/experience/`、`/zh/about/` | 四個繁體中文主頁，共用英文版型與原始資料 |
| `/education/` | 可讀相容頁，連至 `/about/#education` |
| `/skills/` | 可讀相容頁，連至 `/experience/#capabilities` |
| `/honors/` | 可讀相容頁，連至 `/about/#recognition`，另保留論文／競賽獎項入口 |
| `/certifications/` | 可讀相容頁，連至 `/about/#credentials`，另保留 courses 入口 |
| `/404.html` | 自訂找不到頁面提示與四頁導覽 |

以上皆保留 `/personal-website/` 前綴。相容頁使用 `noindex, follow`、最終主頁 canonical 與明確連結，沒有自動跳頁或 HTTP 301 宣稱。`sitemap.xml` 列出八個中英文主頁。各主頁具自身 canonical、雙向 hreflang 與英文 x-default；各頁具 Open Graph、Twitter card 與共用的自託管社群預覽圖片。

Project Pages 的 `robots.txt` 位於專案子路徑；搜尋引擎通常從網域根目錄讀取 robots，因此主要索引控制由各頁 robots meta 與 sitemap 負責。若之後管理網域根網站，可在根 robots 加入此 sitemap；本專案不修改其他網站。

## 內容維護

- `src/data/profile.ts`：主導覽、相容路由、學位與個人連結。
- `src/data/research.ts`、`engineering.ts`：研究主題、工程案例與能力連結。
- `src/data/roles.ts`：核對過的角色、日期與相關工作。
- `src/data/publications.ts`、`recognition.ts`：原始書目與團隊獎項關聯。
- `src/data/learning.ts`：證照、課程與參與分類；`types.ts` 定義資料型別。
- `src/layouts/Layout.astro`：全站導覽、頁尾、metadata；`src/styles/`：共用樣式。
- `src/components/editorial/`：方法圖、頁首與日期。不要把所有內容改成通用卡片。
- `src/i18n/zh.json`：繁中翻譯，以英文原文作為鍵；英文改字需同步更新，缺漏會阻擋建置。正式書目與課程名稱不翻譯。
- `src/components/pages/`：四個共用頁面元件；`src/pages/` 與 `src/pages/zh/` 只指定 locale。`pageUrl(id, locale)` 維持語言，`assetUrl()` 共用資產。

文字保持穩定，無 scroll reveal、正文縮放或客戶端腳本。字體位於 `public/fonts/`，授權位於 `docs/font-licenses/`。原始真人照片保留於 `src/assets/`。

修改後執行 check、build、輸出檢查並在瀏覽器驗收；新增公開資產或外部連結時同步審查 `scripts/check-build.mjs` 的明確允許範圍。QA 工具只安裝於本機暫存區，網站沒有新增執行階段依賴。

## GitHub Pages

沿用 `.github/workflows/deploy.yml` 的獨立 build／deploy jobs。build 依序執行 `npm ci`、check、build 與輸出驗證，只有 `dist/` 進入 Pages artifact；失敗時不部署。專案 base 設於 `astro.config.mjs`，所有內部連結使用 `pageUrl()`／`assetUrl()`。

倉庫 Settings → Pages → Source 使用 GitHub Actions。推送 `main` 或手動執行 workflow 會觸發部署；部署是否完成以該 commit 的 Actions 結果為準。流程參考 [Astro GitHub Pages 指南](https://docs.astro.build/en/guides/deploy/github/)。

## 公開邊界

`reference_data/`、原始 PDF、`work/`、憑證、私密來源筆記、證書掃描與 QA 截圖不進 Git 或公開輸出。建置不需要它們或 GitHub 認證。`dist/`、`node_modules/`、`.astro/` 與瀏覽器暫存均忽略。`.gitignore` 不會移除已追蹤的內容，交付前仍須檢查 Git index 與產物。
