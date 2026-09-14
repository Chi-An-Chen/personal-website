# Redesign content supplement — Research and engineering experience

2026-09-14 · 四頁內容整合完成。Home／Research 保留核准基線，Experience／About 已使用本文件的公開安全敘述與既有核對資料。見 [部署準備驗收](deployment-readiness.md)。

本文件提供 [redesign-plan.md](redesign-plan.md) 的英文文案基線。2026-09-14 研究敘述已依使用者提供的論文更新：以研究問題、監督設計、對照實驗與方法差異為主，不再以程式庫流程概述代替學術內容。人物、教育與實際角色仍是網站基礎；研究與工程案例不以公開程式庫為收錄條件。以下各節的英文可用於前台，中文為編輯規格。

## 定位與首頁順序

上一版只突出輕量辨識與醫學分割，無法完整呈現目前研究廣度。完整盤點後，研究依序採三個主題：農業視覺語言模型、語言模型推理與驗證、視覺辨識／分割。生成研究維持補充段落。工程涵蓋檢索與文件 AI、預測建模與 NLP、資料流程、應用感知與推論整合。

首頁仍先介紹 Chi-An Chen；接著用農業 VLM 與語言模型推理兩個研究預覽、一個檢索應用案例表達新的內容重心。既有 CV 在研究概覽中明確保留，並在 Research 頁展開。首頁不需要將所有工程案例展開，也不增加 repository 卡片。

### Homepage introduction

I study and build AI systems across language and vision. My research examines visual grounding and reasoning under limited model capacity, alongside applied work in retrieval-based systems and AI engineering.

### Research overview

My research examines how supervision and model structure shape visual grounding and reasoning under computational constraints. I study fine-grained agricultural recognition, the costs and benefits of structured mathematical reasoning, and task-specific architectures for biometric recognition and medical image segmentation.

概覽以研究問題連接三個主題；具體方法與結論適用範圍在各段說明。

### Homepage research previews

以下是預覽文案庫，首頁精選 VLM 與 reasoning；CV 由概覽與主題索引引導。

**Vision-language models for agricultural understanding**\
Studying how much reasoning small vision-language models need for fine-grained agricultural recognition.

My graduate research explores CROP: learning from visual descriptions, bounded reasoning, and direct class labels while keeping inference concise.

**Reasoning and verification in small language models**\
Examining the cost of structured reasoning and the conditional value of verification in compact language models.

In collaborative research, I examine how reasoning formats affect accuracy and when explicit verification helps models recover from errors.

**A foundation in computer vision**\
Research experience in lightweight biometric recognition and breast tumor segmentation.

### Homepage engineering preview

**From information retrieval to AI applications**\
My applied work includes admissions-counseling systems that combine document retrieval, structured queries, and contextual information, alongside predictive modeling and data-processing workflows.

## Research page

建議順序：研究導言 → VLM → 推理與驗證 → 視覺研究 → 原始出版品清單 → 重現與探索。以下文案依標題取用。研究主題與 publication 分開；實作存在不表示已發表。保留原始題名、作者與已核對書目，不新增推定的接受／審查狀態。

### Vision-language models for agricultural understanding

**Research question**

Can concise, visually grounded supervision support fine-grained crop recognition more effectively than long-form reasoning in a small multimodal model?

**My contribution**

My graduate research investigates the reasoning length–accuracy trade-off in small multimodal models through CROP, the Constrained Reasoning and Observation Pipeline. My work connects task-specific supervision, model adaptation, and evaluation of plant disease and pest recognition under field-image conditions.

**Approach**

CROP separates supervision into diagnosis-free visual descriptions, bounded rationales grounded in visible symptoms, and direct class labels. These complementary targets are combined in single-stage supervised fine-tuning of Qwen3-VL-2B-Instruct; inference supports either a class label alone or a short rationale followed by the label.

The study evaluates supervision mixtures and reasoning formats through ablations, classification and cross-domain evaluation, and hardware profiling. The final implementation uses parameter-efficient fine-tuning with DoRA.

DoRA 保留為使用者確認的最終實作設定。CROP 的視覺描述、bounded reasoning 與 direct labeling 是共同訓練的互補目標，不是推論時必須依序執行的三步。早期 long-form CoT／self-checking 與最終 CROP 分開描述。

### Reasoning and verification in small language models

**Research question**

When do arithmetic and verification cues justify their cost under limited model capacity and inference budgets?

**My contribution**

In collaborative research, I investigate how output structure affects mathematical reasoning in compact language models. My work on training-data construction and evaluation contributes to VeriTool, a study of schema costs, answer-format adherence, and verification-associated error recovery.

**Approach**

A matched-data ablation compares compact chain-of-thought, arithmetic markup, and arithmetic markup with an explicit verification segment, holding source examples, training, and decoding fixed for Qwen3-0.6B. Error-injection experiments separately examine recovery across corruption types and compact-model configurations.

The study distinguishes answer accuracy from format adherence, output length, and inference time. Verification benefits depend on the error and model configuration; a complementary Efficient CoT pipeline explores token-budget-filtered supervision, with its data and training differences considered when interpreting results.

同一合作研究維持整體歸屬。Matched-data ablation 與 Efficient CoT 的跨流程比較分開解讀；不宣稱驗證必然提升正確率，也不將 arithmetic markup 描述成即時外部工具回饋。

### Efficient visual recognition and medical image segmentation

My computer vision research explores competitive feature selection for finger vein recognition and complementary state space, linear-attention, and frequency-aware approaches to breast tumor segmentation.

LViT-CB uses competition across channel and spatial dimensions to emphasize discriminative vein patterns. FAHU-Mamba combines selective scanning with learnable frequency reweighting; SSIU-Net combines state space blocks and Mamba-inspired linear attention. The segmentation studies evaluate breast tumor structure in DCE-MRI on BreastDM.

原有研究可拆為兩個案例呈現；不得把不同方法畫成已證明逐代提升的性能演化圖。

### Generative visual work

My earlier work includes virtual try-on research and experience reproducing and adapting text-guided fashion-generation methods.

原創合作論文與第三方方法重現分開歸屬，不因公開 repo 放在個人帳號就將上游方法列為本人提出。

### Reproduction and exploration

I also work on paper-based implementations and evaluation workflows, including an fMRI signal-recovery reproduction project. These explorations involve translating research methods into data-processing, training, and evaluation pipelines.

此段放研究頁下方，不新增 neuroscience 專家身分，不宣稱已重現完整論文效果。

## Experience page — Selected engineering work

以下是工作內容群組，不是新增雇用紀錄。放在既有角色時間線之後；在未核對歸屬與日期之前，不把所有內容塞進同一段實習，也不將 repository 更新日期當成工作日期。保留現有已核對職稱、機構與起訖。

### Retrieval and conversational AI

I have experience developing retrieval-based question-answering systems for admissions guidance, combining document retrieval, structured database queries, and school-related information. My work also includes domain-specific conversational workflows and API integration, connecting data-processing components to usable AI applications.

**Selected areas of practice**

- Combining document retrieval with SQL-based information lookup.
- Organizing school, admissions, and commute-related context for question answering.
- Working on database-grounded QA and question-driven conversational flows.
- Preparing application interfaces and deployment workflows.

### Document AI and domain-specific QA

My retrieval work also includes question answering over sustainability documents. I have experience preparing document collections, using metadata in retrieval, and building PDF extraction and language-model summarization workflows.

ESG 問答、升學文件抽取與其他 RAG 工作是不同應用；不合併宣稱為同一套正式產品。

不將問題引導對話直接命名為 adaptive tutoring、學生診斷或個人化教學，除非有進一步內容依據。

### Predictive modeling for admissions data

I developed predictive-modeling workflows for U.S. college admissions data, working with structured student and institution features. My experience includes neural-network models, feature engineering, and combining neural predictions with gradient-boosting models.

不使用模型輸出分離程度宣稱機率已校準；不列未重新審查評估協定的 accuracy、AUC 或泛化提升。網站描述工作，不提供升學決策建議。

### Sequence prediction and text classification

My modeling experience also includes sports-event sequence prediction and classification of commitments and supporting evidence in sustainability texts. This work involves feature preparation, neural and tree-based baselines, and evaluation workflows for structured and language data.

此段是競賽與實驗經驗，不代表得獎、排名或商業上線。

### Transit and geospatial data workflows

I have experience building data pipelines that connect public-transit stops, school locations, and route information. This work includes integrating transport data, matching coordinates to administrative boundaries, deduplicating records, and preparing stop-to-school commute information for downstream applications.

**Methods in context**\
Python, tabular data processing, spatial matching, routing APIs, and database-ready data preparation.

不將 API 整合或通勤資料整理改寫成自行研發導航演算法；不公開資料表、服務端點、成本與內部識別碼。

### Applied perception and inference engineering

I have experience integrating image and video models into application workflows, including object recognition, visual retrieval, and image-quality assessment. My work also includes evaluating and adapting face anti-spoofing and deepfake-detection models, alongside API integration and ONNX Runtime backend selection.

**Methods in context**\
Image and video processing, model evaluation, inference integration, APIs, and ONNX Runtime.

只描述可公開的領域與方法；不推定上游模型作者身分、業務成果、部署裝置效能或正式使用規模。

## Capabilities / Skills

每組能力連到上述研究或經驗的具體段落；不用熟練度百分比或工具 badge cloud。

| Capability | Public-facing copy |
| --- | --- |
| Computer vision and multimodal learning | Working with recognition, segmentation, and vision-language models, including domain-specific data preparation and fine-tuning. |
| Language-model reasoning and evaluation | Exploring concise reasoning, verification-oriented data generation, and evaluation workflows for small language models. |
| Retrieval and conversational systems | Combining document retrieval, structured queries, and contextual information in domain-specific AI applications. |
| Predictive modeling and NLP | Developing neural and ensemble-modeling workflows for structured data, sequences, and text-classification tasks. |
| Data and inference engineering | Preparing heterogeneous and geospatial data, processing documents, integrating APIs, and adapting inference backends for applications. |

## Education supplement

可替換碩士段中目前過短的農業 VLM 敘述；保留原學位、實驗室與導師資訊。

My graduate research examines fine-grained agricultural recognition through decoupled supervision and bounded reasoning in small multimodal models. I also contribute to collaborative research on reasoning-schema costs and the conditional value of verification in compact language models.

## Visual treatment and content boundaries

- 農業 VLM：用「field images → three supervision signals → joint fine-tuning → two inference modes」概念圖，不冒充精確模型架構。真實輸入／輸出圖片另依可公開範圍選取。
- 推理與驗證：用「matched problems → compare output schemas → controlled comparison → assess costs and benefits」研究設計示意；不顯示未驗證的 token 節省率、正確率或獲接受狀態。
- RAG：用文件與結構化資料進入回答流程的高層圖解，不嵌入私人 API 或產品畫面。
- 資料工程：用來源、清理、空間對照與輸出之間的關係呈現；不需要可互動地圖或真實資料下載。
- 所有概念圖皆附簡短文字解讀。沒有正式原圖時仍可先用概念圖完成內容原型。
- 網頁以自然的領域／工作名稱呈現，不暴露私人 repository 名稱、連結或存取資訊；也不放 Private / Coming soon 按鈕。
- 對較薄的來源採「有相關經驗」描述，不推定領導程度、使用者數、正式上線規模或效果。

## Implementation status

Home、Research、Experience、About 已完成。工程以四個工作群組呈現，能力連回實際案例；About 保留兩筆學位、七筆團隊獎項、五筆證照、七筆課程與參與紀錄。原始出版品未改寫，語音研究不納入。四個舊網址已轉為相容頁；完整驗收與尚未執行的正式部署操作見 [deployment-readiness.md](deployment-readiness.md)。

## Paper-based copy revision

本輪僅精修 Home／Research 文案及兩張方法示意，維持既有架構、研究排序與六筆書目。My contribution 以既有個人工作範圍連接論文研究目的；Approach 說明研究整體方法，不由作者順序推定所有工作的個人分工。原始論文、頁碼對照與版本差異只留在已忽略的本機工作目錄。未新增論文附件、數值績效或出版狀態。

本輪驗證：`npm run check`、`npm run build`、`node scripts/check-build.mjs` 通過；瀏覽器確認 Home／Research 在 1280、390、320 px 無橫向溢出，200% 文字放大、無 JavaScript 與原生 details 鍵盤操作可用。此為文案與方法示意的針對性驗證，完整網站的既有跨瀏覽器驗收紀錄仍保留於 deployment-readiness.md。

## Research role and learning visibility clarification

使用者確認：僅 SLM 數學推理／驗證以合作研究定位，其餘論文研究由本人擔任主要研究者。Computer vision foundation 直接敘述研究工作，不加 primary researcher 身分前綴；移除虛擬試穿的合作定位。此修正不更動書目作者或團隊獎項歸屬，也不等同獨力完成。

About 的 Completed courses & workshops 改為固定展開的語意 section，七筆記錄與 NVIDIA DLI 課程直接可見；保留原本課程完成與專業證照的分類、日期及 courses anchor。
