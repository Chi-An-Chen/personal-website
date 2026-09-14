# Redesign content supplement — Research and engineering experience

2026-09-14 · 四頁內容整合完成。Home／Research 保留核准基線，Experience／About 已使用本文件的公開安全敘述與既有核對資料。見 [部署準備驗收](deployment-readiness.md)。

本文件提供 [redesign-plan.md](redesign-plan.md) 的英文候選文案。完整個人 repo 盤點後，以新版 plan 的定位、選材與頁面配置為準。人物、教育與實際角色仍是網站基礎；研究與工程案例不以公開程式庫為收錄條件。以下各節的英文可用於前台，中文為編輯規格。

## 定位與首頁順序

上一版只突出輕量辨識與醫學分割，無法完整呈現目前研究廣度。完整盤點後，研究採三個主題：語言模型推理與驗證、視覺語言模型、視覺辨識／分割與生成。工程涵蓋檢索與文件 AI、預測建模與 NLP、資料流程、應用感知與推論整合。

首頁仍先介紹 Chi-An Chen；接著用農業 VLM 與語言模型推理兩個研究預覽、一個檢索應用案例表達新的內容重心。既有 CV 在研究概覽中明確保留，並在 Research 頁展開。首頁不需要將所有工程案例展開，也不增加 repository 卡片。

### Homepage introduction

I study and build AI systems across language and vision. My work spans model adaptation and evaluation, retrieval-based applications, and the data and inference workflows that connect them.

### Research overview

My research spans language-model reasoning, vision-language understanding, and visual recognition and segmentation. My work includes parameter-efficient adaptation, task-specific data preparation, and model evaluation.

第二句整理跨研究主題的方法經驗，不代表每個專案都有相同驗證方法，亦不宣稱已達成可靠性或效能提升。

### Homepage research previews

以下是預覽文案庫，首頁精選 VLM 與 reasoning；CV 由概覽與主題索引引導。

**Vision-language models for agricultural understanding**\
Exploring plant disease and pest recognition through visual descriptions, reasoning, and self-checking.

**Reasoning and verification in small language models**\
In collaborative research, I study concise reasoning and verification-oriented workflows for language models with limited capacity.

**A foundation in computer vision**\
Research experience in lightweight biometric recognition and breast tumor segmentation.

### Homepage engineering preview

**From information retrieval to AI applications**\
My applied work includes admissions-counseling systems that combine document retrieval, structured queries, and contextual information, alongside predictive modeling and data-processing workflows.

## Research page

建議順序：研究導言 → VLM → 推理與驗證 → 視覺研究 → 原始出版品清單 → 重現與探索。以下文案依標題取用。研究主題與 publication 分開；實作存在不表示已發表。保留原始題名、作者與已核對書目，不新增推定的接受／審查狀態。

### Vision-language models for agricultural understanding

I explore lightweight vision-language models for plant disease and pest recognition. This work includes preparing data for classification, visual description, and reasoning tasks; experimenting with parameter-efficient fine-tuning; and evaluating models on agricultural visual question-answering tasks. I also investigate self-checking prompts that ask models to relate their answers to visible image evidence.

**Methods in context**\
Vision-language models, parameter-efficient fine-tuning with DoRA, multi-task data preparation, visual question answering, and evaluation workflows.

### Reasoning and verification in small language models

In collaborative research, I study concise reasoning and verification-oriented workflows for small language models. This work includes training-data generation and evaluation pipelines for mathematical reasoning, with attention to how model responses can be checked rather than judged only by their length or fluency.

**Methods in context**\
Small language models, reasoning-data generation, answer verification, mathematical reasoning, and inference evaluation.

本項為同一合作研究，不依不同作者保管的程式碼拆成多項成果。候選文案使用 collaborated / collaborative research，不推定獨立完成全流程。

### Efficient visual recognition and medical image segmentation

My computer vision research includes lightweight vision transformers for finger vein recognition and U-Net-based approaches to breast tumor segmentation. These projects explore different modeling approaches for visual recognition and medical imaging, including transformer and state space components.

原有研究可拆為兩個案例呈現；不得把不同方法畫成已證明逐代提升的性能演化圖。

### Generative visual work

My earlier work includes collaborative virtual try-on research and experience reproducing and adapting text-guided fashion-generation methods.

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

My graduate research explores agricultural vision-language models, including plant disease and pest recognition, visual question answering, and reasoning-oriented model adaptation. I also work on collaborative research into reasoning and verification for small language models.

## Visual treatment and content boundaries

- 農業 VLM：用「image → description / reasoning → answer and checking」概念圖，不冒充精確模型架構。真實輸入／輸出圖片另依可公開範圍選取。
- 推理與驗證：用「problem → concise response → checking」方法示意；不顯示未驗證的 token 節省率、正確率或獲接受狀態。
- RAG：用文件與結構化資料進入回答流程的高層圖解，不嵌入私人 API 或產品畫面。
- 資料工程：用來源、清理、空間對照與輸出之間的關係呈現；不需要可互動地圖或真實資料下載。
- 所有概念圖皆附簡短文字解讀。沒有正式原圖時仍可先用概念圖完成內容原型。
- 網頁以自然的領域／工作名稱呈現，不暴露私人 repository 名稱、連結或存取資訊；也不放 Private / Coming soon 按鈕。
- 對較薄的來源採「有相關經驗」描述，不推定領導程度、使用者數、正式上線規模或效果。

## Implementation status

Home、Research、Experience、About 已完成。工程以四個工作群組呈現，能力連回實際案例；About 保留兩筆學位、七筆團隊獎項、五筆證照、七筆課程與參與紀錄。原始出版品未改寫，語音研究不納入。四個舊網址已轉為相容頁；完整驗收與尚未執行的正式部署操作見 [deployment-readiness.md](deployment-readiness.md)。
