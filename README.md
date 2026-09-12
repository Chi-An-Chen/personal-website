# Chi-An Chen — Personal Website

七頁個人履歷網站，使用 Astro、TypeScript 與 CSS。頁面為 Home、Education、Experience、Skills、Research、Honors、Certifications。

預期正式網址：**https://chi-an-chen.github.io/personal-website/**

倉庫：`Chi-An-Chen/personal-website`；部署來源：`main`。本機建置通過不代表已正式部署；以 GitHub Actions 的 build、deploy 成功及線上頁面實際可讀為準。

## 本機開發與正式建置

目前 CI 使用 Node **22.19.0**，符合 package.json 的 `>=22.12.0` 要求。使用現有 `package-lock.json` 安裝，不需升級依賴。

```sh
npm ci
npm run check
npm run build
node scripts/check-build.mjs
```

開發伺服器使用背景模式：

```sh
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

正式建置預覽：

```sh
npm run preview -- --host 127.0.0.1 --port 4322
```

預覽入口為 http://127.0.0.1:4322/personal-website/ ，內頁例如 http://127.0.0.1:4322/personal-website/education/ 。如果已有預覽服務，先用 `npm run astro -- preview status` 檢查；設定變更後使用 `npm run astro -- preview stop` 再重開同一個預覽。開發環境也必須使用 `/personal-website/` 前綴。受限環境如需停用 Astro telemetry，可在指令前加 `ASTRO_TELEMETRY_DISABLED=1`。

## GitHub Pages 一次性設定

1. 開啟 [倉庫 Pages 設定](https://github.com/Chi-An-Chen/personal-website/settings/pages)。
2. 在 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。本流程不選「Deploy from a branch」，也不需要 `gh-pages` 分支。
3. 將本機部署準備提交並推送到 `main`。推送會觸發 **Deploy to GitHub Pages** 工作流程。
4. 在倉庫 **Actions** 檢查 `build` 與 `deploy`；若 `github-pages` 環境要求核准，依該環境的規則處理。
5. 成功後開啟預期正式網址，逐頁直接開啟及重新整理，確認照片、favicon 和導覽正常。

需要手動重新部署時，在 **Actions → Deploy to GitHub Pages → Run workflow** 選擇 **main**。工作流程僅允許 main 部署。它使用 GitHub 提供的短期權限，不需新增個人 access token，也不會修改倉庫可見性。

`.github/workflows/deploy.yml` 依 [Astro 官方 GitHub Pages 指南](https://docs.astro.build/en/guides/deploy/github/) 的 build／deploy 模式設定。將複合安裝步驟展開為 `npm ci`、專案檢查、建置及產物檢查，確保使用既有 lockfile；只有 `dist/` 會成為 Pages artifact。建置失敗不進入發布步驟。

## 日後更新

- 網頁：`src/pages/`；共用版型與導覽：`src/layouts/Layout.astro`。
- 學歷與頁面資料：`src/data/profile.ts`；論文、能力與學習資料：`src/data/resume.ts`。
- 樣式：`src/styles/global.css`；選定公開頭像：`src/assets/chi-an-chen.webp`。
- 站內連結沿用 `pageUrl()`／`assetUrl()`，不寫成缺少 base 的 `/education/` 或 `/favicon.svg`。

修改後先執行上述檢查、建置、`check-build.mjs` 與本機預覽，再只提交預期的檔案、推送 `main`；Actions 會更新網站。新增公開資產或對外連結時，同步檢查 `scripts/check-build.mjs` 的明確允許範圍。

`reference_data/`、原始 PDF、`work/`、`.env`、證書、證號與私密來源筆記不進 Git 或網站輸出。正式建置不依賴這些本機資料。設計探索圖片與驗收筆記保持本機；`dist/`、`node_modules/`、`.astro/` 不提交。忽略規則不會清除已提交的歷史，提交前仍需核對檔案與差異。

## 本次提交與推送

下列是供你執行的指令；部署準備階段不代為執行。先確認分支為 `main`、origin 指向上述倉庫，且待提交內容符合預期。

```sh
git branch --show-current
git remote -v
git status --short
git diff --check
git add astro.config.mjs .github/workflows/deploy.yml scripts/check-build.mjs README.md
git diff --cached --check
git diff --cached --stat
git diff --cached
git commit -m "Prepare GitHub Pages deployment"
git push origin main
```

如果遠端在本機檢查後出現新提交，先同步並檢查差異，不使用強制推送。
