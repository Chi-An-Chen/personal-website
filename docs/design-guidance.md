# Chi-An Chen 多頁網頁履歷：內容與設計指引

> 2026-09-14 全站整合完成：Home／Research／Experience／About 已統一 editorial 系統，四個舊路徑保留相容頁。最新架構、建置與瀏覽器驗收以 [deployment-readiness.md](deployment-readiness.md) 為準；下方 Phase 1 與舊七頁紀錄保留為歷史。

目前選材：研究聚焦語言模型推理與驗證、視覺語言模型、視覺辨識／分割與生成三條主線；工程保留檢索與文件 AI、預測建模、資料流程與推論整合。首頁以農業 VLM、推理與驗證、檢索應用依序形成精選案例。

> 2026-09-14 Phase 1 完成：Home／Research 已依 [redesign-plan.md](redesign-plan.md) 與 [內容補充](redesign-content-supplement.md) 實作 editorial 原型。兩頁頁首為 Home／Research／Experience，頁尾保留七頁；正文維持原尺寸，無頁面過場。以下保留其餘五頁及先前七頁版本的基線紀錄；四頁架構、About 與相容路由仍是後續提案。驗收與比較見 [phase1-review.md](phase1-review.md)。

更新：2026-09-12。此 brief 取代上一輪以三個公開 repo 為核心的首頁定位。

## 目的與內容優先順序

先讓訪客認識 Chi-An Chen：目前的教育身分、走過的經歷、能處理的問題與累積的能力。研究及專案支持人物介紹，公開程式庫不是選材門檻。主要讀者為潛在雇主、研究與工程合作對象。

英文顯示名稱 Chi-An Chen；中文以陳麒安為主、Chi-An Chen 為輔。網站維護英文與臺灣繁體中文，設計說明用繁體中文。中文採系統中文字體 fallback，調整字距與行高並共用原版型；論文、模型及證照正式名稱保留原文。姓名、真實照片及自然的自我介紹是首頁核心。保留克制留白、清楚層級和可讀性，不把「避免通用模板」誤解為禁止人物介紹。

## 七個獨立頁面

| 導覽名稱 | 規劃路徑 | 頁面職責 |
| --- | --- | --- |
| Home | `/` | 姓名、照片、簡介、學歷摘要、能力概覽與內頁入口。 |
| Education | `/education/` | 碩士與學士、學校系所、日期、研究方向與學習背景。 |
| Experience | `/experience/` | 實習、研究助理、產學合作；角色、任務與能力。 |
| Skills | `/skills/` | 能做什麼、使用哪些工具，並連回相關經歷或研究。 |
| Research | `/research/` | 研究方向、題目與發表；可公開的摘要不以開源為條件。 |
| Honors | `/honors/` | 論文獎與競賽成果；標示事件、年份及團隊歸屬。 |
| Certifications | `/certifications/` | 專業認證與課程結訓分組，避免混淆資格性質。 |

這些是獨立 URL，不能用單頁錨點冒充。七頁 Astro 原型均已完成。桌面提供七個文字入口；1100 px 以下使用原生 details／summary 手機選單，展開後為兩欄站內連結，無 JavaScript 仍可開關和導覽。選單在正常文件流展開，不遮住內容，不做空連結或假按鈕。姓名連回 Home。Experience 與 Research 分別回答「擔任什麼角色」和「研究什麼」，以跨頁連結建立關係，不複製整頁敘述。

## 首頁閱讀順序

1. 七頁站內導覽，標示目前頁面。
2. 真實照片、Chi-An Chen、M.S. Student in Computer Science and Information Engineering、National Ilan University, Taiwan、兩句人物簡介。
3. 保留主要入口 Explore my education，並加入 View experience，分別前往獨立內頁。
4. 學歷摘要：碩士 Sep 2025–Present、學士 Sep 2021–Jun 2025；能力概覽：Computer vision、AI applications、Data & deployment。
5. 短經歷、研究／獲獎及學習摘要，連至對應內頁；能力摘要連至 Skills。
6. 頁尾低干擾的 LinkedIn、可選 GitHub。

目前在學及實習身分由本輪提供的 LinkedIn 匯出與履歷支持。過往工作項目依最新明列起訖日期使用過去式，不延續舊的 Present。

## 來源與公開範圍

履歷、LinkedIn 匯出、證書、獎狀與使用者直接提供的資訊都是內容依據。有來源不等於必須有公開連結。無公開 repo 的產學合作與實習仍可呈現角色、任務和能力，不要求開源，不存取私人 repo。

逐項比較日期與狀態；身分來源與研究成果來源不必是同一份檔案。若具體工作細節未提供，保留職稱與日期，不推測任務。遇到數據條件不足則降低主張的精細度，不整段刪除背景。

重複證明先依項目、機構、日期及對象合併：考試成績單和資格證書為同一資格；競賽主辦方獎狀與校內表揚為同一競賽成果。不同日期的相近課程可收在同一課程主題下，不假定是同一場，也不累計成多張專業認證。

| 證明性質 | 適當位置 |
| --- | --- |
| 學位／在學背景 | Education |
| 實習、研究助理與工作任務 | Experience |
| 論文收錄／發表證明 | Research 的來源依據 |
| 論文獎與競賽名次 | Honors |
| 專業資格／考試認證 | Certifications 的 Credentials |
| 課程結訓／workshop | Certifications 的 Courses & workshops |
| 服務學習／社群參與 | 必要時 Education 的補充背景，不冒充獲獎或專業認證 |

網站只呈現篩選後的自然履歷文案。來源頁碼、證號、私密資訊、日期衝突、待確認內容留在 work/；前台不顯示查核備註。原始證明文件不是公開附件，照片不得生成替身或改變容貌。

## 本輪視覺方向：Personal Academic Profile

姓名是最大文字，小型圓形頭像位於姓名介紹區右上方；姓名、教育身分、簡介與入口共用完整內容區，不保留舊稿左側的大照片欄。教育與能力在下一閱讀層直接可見。暖白底、墨綠文字、低彩度分隔線；姓名採 Georgia，正文與導覽採可讀的系統無襯線。沒有卡片牆、技能百分比、repo 首屏清單或領域標語取代姓名。

首屏沿用同一張正式肖像。原始照片原樣保留於本機；網站使用等比例縮小、移除中繼資料的 WebP 衍生檔。圓形顯示完全由 CSS 的 border-radius: 50%、object-fit: cover 與 object-position: 50% 0% 控制，不拉伸、不改臉、不重繪人物或背景。桌面頭像直徑 136 px（允許範圍 120–144 px）；手機 88 px（允許範圍 80–96 px），放在姓名右側。逐個尺寸檢查髮頂與臉部完整可見；裁切只作用於顯示框，不修改原件。旅遊照可保留作後續個人側面的選材，不推導成性格、專業能力或新經歷。

內頁以一致標題、短導言及開放式列表延伸。Education／Experience 重視日期和角色；Research 重視題目與發表資訊；Honors／Certifications 重視分類與名稱，不展示整張證書拼貼。

CSS-first、semantic HTML、minimal JavaScript、Astro 和 GitHub Pages 相容性維持原規劃。動態可省略；必要內容不依靠動畫或 JavaScript 才能顯示。正文對比目標至少 4.5:1，鍵盤焦點可見，手機自然換行並尊重 prefers-reduced-motion。

## 第一輪輕微動態（2026-09-13）

保留七頁的既有構圖、字體、內容和頭像，只以共用 CSS 提供三項漸進增強：

- 主要按鈕與 `.text-link` 的箭頭，在精細指標 hover 或鍵盤 focus-visible 時向右上位移 2 px，過渡 160 ms；實心按鈕按下時縮至 98%。點擊直接導頁，不等待動畫。
- 1100 px 以上的桌面導覽使用單一偽元素底線，由左向右展開，過渡 180 ms；目前頁面底線持續顯示。手機保留原生選單及目前頁面文字底線。
- 七頁 main 內的標題、段落、研究定義列表、工作任務列表與文字入口隨捲動由 60% 放大至 100%，以左上為基準，使用 `view()` 時間軸與 `entry 0% cover 55%` 範圍；沿用使用者自行調整的幅度和範圍。反向捲動依相同進度縮回，文字始終完全不透明，不改變排版字級。只套用文字區塊，不縮放其 section 或紀錄容器，避免父子重複縮放。

桌面與手機均啟用標題縮放；不支援所需時間軸／範圍的瀏覽器顯示原尺寸。所有位移、縮放與過渡只在 `prefers-reduced-motion: no-preference` 啟用；減少動態時保留即時顏色、底線和焦點。Hover 樣式限 `(hover: hover) and (pointer: fine)`，觸控仍有按壓回饋。姓名與正文納入主內容縮放；頭像、頁首導覽與頁尾維持原樣。文字入口以內層 `.motion-label` 縮放，外層保留原本點擊範圍與按壓回饋。不加入換頁、視差或連續循環動畫。

網站不增加客戶端 JavaScript、依賴或動畫函式庫，保留建置時禁止腳本的檢查。視覺檢查須使用正式建置：動畫使用個別屬性，避免壓縮器將 `animation-timeline` 合併進部分瀏覽器無法解析的 animation 簡寫。

## 歷史與執行邊界

舊 A／B／C 圖片保留作歷史探索，其 repo 主導結構與推薦已不適用。字體、色彩可按新內容重用，不代表選定舊 A。

本輪已獲授權進入 Astro 原型：沿用共用頁面框架與 Home、Education，完成 Experience、Skills、Research、Honors、Certifications 與七頁導覽；維持既有依賴及 lockfile，不做依賴升級。保持 CSS-first、少量 JavaScript；本輪介面不需客戶端 JavaScript。完成建置、桌面、小型筆電、手機與鍵盤操作檢查。來源及查核資料留在 work/；實際瀏覽器截圖留在 docs/design-exploration/，兩者均受 Git 忽略。保留既有未提交內容、第三方 skills、原始資料及舊方向稿，不提交、不上傳、不部署。
