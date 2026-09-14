# Chi-An Chen — AI Research & Engineering redesign plan

2026-09-14 · 全站整合完成。核准的 [Phase 1 基線](phase1-review.md) 已擴展為四個主要頁面；最新驗收與部署狀態見 [deployment-readiness.md](deployment-readiness.md)。未提交、推送或部署。

本版取代上一輪過度以輕量視覺辨識與醫學分割為核心的內容建議，並依最新選材聚焦三條研究主線。延續人物為中心、編輯式極簡的視覺方向。目前四個主頁已統一 editorial 版型，Education／Skills／Honors／Certifications 轉為可讀相容頁。既有資料已遷移，全站正文維持原尺寸。

> 核准基線：農業 VLM → 推理與驗證 → CV／工程延伸。VLM 詳細方法採 DoRA，不代表全部歷史實驗使用相同設定。首頁／Research 未重新設計；本次只處理整合、metadata、語意及放大重排問題。

## 1. 定位修正

**AI research & engineering** 是領域定位；正式身分仍使用已核對的學位、職稱與機構，不把這句定位當成新職稱。

訪客應記住三件事：

1. 研究經驗涵蓋語言模型推理、多模態與視覺模型。
2. 能把模型、檢索、結構化資料、API 與推論流程接成具體應用。
3. 工作中重視資料準備、基準比較、評估設計與實作細節。

第三點是從多個專案選出的工作特徵，不能解讀成所有模型已經通過獨立驗證或具備產品級可靠性。

原網站的主要問題是「發表最多的領域佔據了全部研究敘事」。公開 CV 論文有完整書目，自然較容易被選入；私人 repo 中的語言模型、檢索與工程工作因此被壓縮成幾個技能名詞。修正方式是分開呈現研究主題、出版品與工程經驗，讓每一種證據都進入合適的位置。

### Homepage candidate copy

**Chi-An Chen**

**AI research & engineering**

I study and build AI systems across language and vision. My work spans model adaptation and evaluation, retrieval-based applications, and the data and inference workflows that connect them.

另保留已核對的 M.S. Student in Computer Science and Information Engineering 與學校資訊。姓名與真人照片先建立人物印象；領域描述負責說明工作範圍。

## 2. 選材結構與份量

不依 repository 數量分配版面。多個版本、資料工具與共同研究可以支持同一段敘述；不同任務即使相關，也不捏造成一套統一產品。

| 內容群組 | 可呈現的工作 | 呈現層級 |
| --- | --- | --- |
| Vision-language modeling | 農業病蟲害理解、視覺問答、描述／推理資料、參數高效率微調 | Research 主題，首頁研究預覽 |
| Language-model reasoning & verification | 小語言模型、簡潔推理、數學推理資料生成、答案檢查與推論評估；共同研究合併呈現 | Research 主題，首頁研究預覽 |
| Visual recognition, segmentation & generation | 指靜脈辨識、乳房腫瘤分割、虛擬試穿；既有出版品與合作脈絡 | Research 主題，保留完整書目；不再壟斷首頁 |
| Retrieval & document AI | 升學與 ESG 文件問答、向量／結構化檢索、對話流程、文件抽取與摘要 | Experience 主要工程案例 |
| Predictive modeling & NLP | 結構化升學預測、球賽序列預測、ESG 承諾與佐證文字分類 | Experience 工程案例；不列未查核的榜單成績 |
| Data & inference engineering | 爬取與清理、PDF 資料流程、通勤／空間資料、API、推論 provider 選擇與模型匯出流程 | Experience 能力與方法段落 |
| Applied perception | 動物影片、交通標誌、物件偵測、影像品質、人臉防偽與 deepfake 模型評估／整合 | Experience 精選範例，按可公開程度使用概括名稱 |
| Reproduction & exploration | fMRI 訊號恢復的論文重現、第三方模型適應與評估 | Research 下方短段落；不列成原創出版品 |
| Coursework & tooling | 課程練習、PDF QA 原型、程式與研究文件工具 | About 的學習背景，必要時連公開作品 |

Research 的三個主題都要有實質內容，首頁只精選兩個研究預覽：農業 VLM 與小模型推理。既有 CV 在研究概覽中明確保留，與推理及 VLM 共同構成研究主線。工程使用一個跨文件／資料來源的 RAG 案例作首頁預覽。其餘領域放內頁，不用一整屏工具名稱彌補內容不足。

## 3. Information architecture — 最終架構

已採用上一輪推薦的四個主要入口；擴大內容後，Research 與 Experience 的分工更重要。

| 頁面 | 核心問題 | 內容順序 |
| --- | --- | --- |
| Home `/` | 你是誰，為什麼值得往下看？ | 姓名／照片／身分 → 工作範圍 → 兩個研究預覽與一個工程預覽 → 經歷與教育摘要 → 聯絡入口 |
| Research `/research/` | 你研究哪些問題，如何處理？ | 三主題導覽 → VLM → reasoning → visual research → selected publications → reproduction / exploration |
| Experience `/experience/` | 你做過哪些工作，具備哪些實作能力？ | 角色時間線 → selected engineering work → capabilities in context |
| About `/about/` | 你的教育與成長脈絡是什麼？ | 個人簡介 → education → recognition → selected credentials / learning → LinkedIn／GitHub |

原頁面內容的去向：

- Education → About 的教育段落，保留學位、日期、實驗室與導師。
- Skills → Experience 的能力段落；每組連到研究或工程案例。
- Honors → About 的 recognition；論文案例只標示相關獎項與連結，不重複計數。
- Certifications → About 的 credentials / learning，保留專業資格與結訓區分。

四個舊 URL 已保留靜態相容頁，以可讀連結通往新頁段落，使用最終頁 canonical 與 noindex, follow。不自動跳頁、不宣稱 HTTP 301。建置檢查已驗證相容入口與完整 anchors。

## 4. Homepage wireframe — Phase 1 定案

### 01 — Person first

真實照片、Chi-An Chen、已核對的教育身分與兩句介紹。姓名最大，領域描述其次，學校／日期是輔助資訊。主要 CTA：Explore research；次要 CTA：View experience。小型筆電首屏應能看到完整姓名、介紹與入口。

### 02 — Selected work

三段有不同內容構圖的案例：

1. **Vision-language understanding**：農業影像理解的概念圖；若有可公開實例，再配圖像與文字輸出。
2. **Reasoning and verification**：問題與答案檢查的簡潔方法圖，說明合作研究與工作範圍。
3. **Retrieval to application**：文件、結構化查詢與情境資訊如何進入問答流程。

每段只需要問題、個人工作、方法與內頁入口。不用私人 repo 按鈕、假 demo、未驗證百分比。CV 與其他工程領域有直接的內頁索引，不靠訪客猜測其存在。

### 03 — Background

以日期與角色連接研究、產學合作、實習與目前教育階段。只有經證據確認的紀錄才能連成時間線；repo 更新時間不當成任職時間。

### 04 — Continue the conversation

提供 Research 與 LinkedIn 入口；Background 連至既有 Education／Experience。不建立未完成的 About 入口。GitHub 是補充閱讀，不成為主要人格敘事或公開程度的篩選器。

### Working-method 比較結論

已在 1280 × 800 與 390 × 844 比較 Research models／Evaluate methods／Build applications 有無版本。三句重複 hero 的工作範圍及案例中的資料、評估、應用資訊，未補充具體方法，因此移除；最終順序為 Hero → Selected Work → Background → Continue。截圖位置與判斷見 [Phase 1 review](phase1-review.md)。

## 5. Research 與工程案例格式

### Research

每個主題先寫 40–70 字英文概覽，再用以下順序展開：

- Question：正在處理什麼問題。
- My work：具體參與方法；合作時清楚使用 collaborative research。
- Approach：兩至四個有脈絡的方法，搭一張必要的概念圖。
- Evidence：正式出版品、可公開的圖／程式或已核對結果；沒有公開附件也能成立。

最重要的摘要預設可見。較長方法細節可用原生 details，出版品列表保持易掃讀。出版品狀態依原始來源，不因 repo 內有 paper.pdf 或 conference 字樣就新增「已發表」。

語言模型與 VLM 主題呈現各自的資料準備、適應與評估方法。原 CV 主題保留原始題名與作者；虛擬試穿的原創合作與第三方方法重現分別描述。

### Engineering

以 Problem → Work → Integration 的順序呈現四組工作：

1. Retrieval and document applications：升學／ESG 問答、文件與結構化檢索、摘要處理。
2. Predictive modeling and language tasks：表格／序列資料預測與 ESG 文字分類。
3. Data pipelines：爬取、格式轉換、清理、資料對應、空間／通勤流程。
4. Applied perception and inference：影像／影片應用、品質與防偽評估、API 與推論後端整合。

這些是內容群組，不是四段新工作經歷。已核對的職稱、機構與起訖先獨立呈現。若個別任務的工作歸屬尚不明確，放在 selected work，使用領域經驗措辭。

## 6. Visual identity 與 motion 的調整

延續 **Research in Practice** 的編輯方向：文字主導、克制留白、明確索引、圖文交替。新增內容不需要新增一套視覺風格。

- Typography：Source Serif 4 用於姓名／主要標題；Source Sans 3 用於正文／導覽。使用開源、自託管 WOFF2，保留系統與 CJK fallback。正文 17–18 px、行高約 1.6，長段控制在約 60–70 字元；手機標題自然換行。
- Color：暖白、炭黑、灰階與單一低彩度赭色 accent；領域靠名稱與圖形區別，不用每個領域一種亮色。
- Composition：研究以問題與示意圖展開，工程以資料流與實作步驟展開，經歷以角色／日期展開。避免所有內容都放相同卡片。
- Graphic language：少量細線、編號、標註與概念流程，對應實際內容。不得用裝飾性 neural network 圖或假 performance dashboard 代表專業程度。
- Motion：建議移除七頁正文的 60% → 100% 捲動縮放。文章保持原尺寸，互動集中於導覽、連結、details 與必要的圖解狀態。全站均已移除正文縮放，不使用頁面過場。
- Accessibility：所有必要資訊可用鍵盤、觸控與無 JavaScript 情境閱讀；reduced-motion 下移除位移、縮放與過場。hover 不承載獨有內容。

首輪素材只需要現有真人照片與三張可由 HTML／SVG 建立的高層方法圖。真實範例輸出、研究圖、工作照片是高價值補充；私人資料截圖、完整證書、repo contribution heatmap 不是必要素材。

## 7. 內容資料與公開邊界

Phase 1 已建立 ResearchTheme／EngineeringWork 型別、三筆研究主題與一筆檢索工程案例，出版品僅增加穩定 ID；學位與角色沿用既有資料。後續完整遷移再以 TypeScript 擴充內容資料：researchThemes、engineeringWork、roles、publications、recognition、learning。案例可以與多項能力、正式出版品或角色建立關聯；沒有核對的關聯留空。

研究／工程案例至少具有 id、title、summary、contribution、methods、kind 與 optional public links。kind 區分 research、collaborative research、reproduction、applied project、coursework，透過自然文案呈現，不堆 badge。

私有來源路徑、blob SHA、內部產品名、端點與待確認事項留在 Git 忽略的 work/。src／public／可追蹤 docs 只放篩選後的內容；建置不可依賴 GitHub token、私人 repo 或 reference_data。

不以 README 的上游作者文字推定個人作者身分；不因檔案存在就宣稱做過完整 benchmark 或 production deployment。若只是評估／適應第三方模型，公開敘述就使用 evaluation／adaptation／integration。

## 8. 執行順序與驗收

完整架構、Experience／About、內容遷移、相容入口及部署前驗收均已完成。以下是執行時的工作表；最終結果以 [deployment-readiness.md](deployment-readiness.md) 為準。真實研究圖片沒有取代既有概念圖，因目前圖解已能表達方法，且不需引入尚未核對的素材。

| Priority | 工作 | Impact / Effort / Risk | 完成條件 |
| --- | --- | --- | --- |
| P0 | 修正定位、來源選材與英文文案 | High / Medium / Low | 首頁與 Research 開頭能看到 language-model reasoning、vision-language modeling 與 computer vision；工程有具體方法；沒有重複研究或作者誤歸屬 |
| P0 | 確立四頁內容配置與舊路徑對應 | High / Medium / Medium | 每項既有履歷內容有明確去向；沒有直接刪掉歷史入口 |
| P1 | 首頁＋Research 內容原型 | High / Medium / Low | 先檢查 1280 px 與 390 px 的閱讀順序、密度與字級，再擴展其他頁 |
| P1 | 字體、版面、三張概念圖 | High / Medium / Low | 研究與工程有可辨識的呈現方式；真人照片與完整首屏保持可見 |
| P2 | Experience／About、導覽與相容路由 | High / Medium / Medium | 關聯有效、日期正確、舊 URL 可達新內容、base path 正確 |
| P2 | 移除正文縮放，統一互動 | Medium / Low / Low | 鍵盤、reduced-motion、觸控與無 JS 均可完成主要閱讀流程 |
| P3 | 加入已允許公開的實例與圖解細節 | Medium / Medium / Medium | 有清楚資料來源與說明；沒有讓圖或動態取代基本摘要 |

技術維持 Astro、TypeScript、semantic HTML、CSS-first、GitHub Pages。無需 GSAP、WebGL、Lenis 或前端框架。調整建置檢查以支援新路由、自託管字體與 intentional SVG，同時繼續排除原始資料和私人資訊。

實作後檢查：正式 build、內外連結與 base path、相容入口、桌面／小筆電／手機畫面、focus／details 操作、無 JS／reduced-motion、圖片尺寸預留與載入成本。全站已通過正式／隔離建置、三個瀏覽器引擎的響應式與操作驗收。未啟動研究訓練或推論；未部署。

## 9. 預期印象

- 10 秒：Chi-An Chen 是具有語言模型、多模態與視覺工作經驗的 AI 研究與工程實作者。
- 30 秒：能理解幾個實際研究問題，以及如何把檢索、資料與模型接成應用。
- 2 分鐘：能辨認原創／合作研究、工程實作與重現經驗，並看見具體學歷、角色與成果。

**This website should feel like a considered record of AI research and engineering in practice.**
