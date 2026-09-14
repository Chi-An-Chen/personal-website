# Chi-An Chen — Multi-page résumé content

> 2026-09-14 全站整合完成：Home／Research／Experience／About 已統一 editorial 系統，四個舊路徑保留相容頁。最新架構、建置與瀏覽器驗收以 [deployment-readiness.md](deployment-readiness.md) 為準；下方 Phase 1 與舊七頁紀錄保留為歷史。

> 2026-09-14 Phase 1：Home／Research 已完成，定位為 AI research & engineering，順序為農業 VLM → 推理與驗證 → CV／工程延伸；語音研究不列入選材。以 [redesign-plan.md](redesign-plan.md)、[內容補充](redesign-content-supplement.md) 及 [原型驗收](phase1-review.md) 為準。以下保留先前七頁內容基線；其餘五頁未遷移，四頁提案未實作。

> 原型進度（2026-09-12）：七個獨立頁面已實作，完整導覽與交叉連結已啟用。Home 保留 **Explore my education** 為主要入口，並補入 **View experience**。以下內容依各頁呈現，編輯說明不輸出至網站。
2026-09-12 · English website copy · Seven independent pages

以下按頁面編排正式候選文案。用途、連結規劃與文末來源類型表是編輯說明；來源定位與待確認事項另存本機。各頁以獨立路徑呈現，不合併為單頁錨點。

## Home · `/`

**用途：** 先認識本人，立即看見教育身分、經歷脈絡與能力，再進入各內頁。

### Hero copy

# Chi-An Chen

**M.S. Student in Computer Science and Information Engineering**  
National Ilan University, Taiwan

My background combines computer vision research, deep learning, and applied AI. Through academic research and industry experience, I work across model development, data processing, and AI applications.

**View experience** → `/experience/`  
**Education** → `/education/`

Photo alternative text: Portrait of Chi-An Chen in graduation attire.

### Education summary

**M.S. in Computer Science and Information Engineering**  
National Ilan University · Sep 2025–Present

**B.S. in Computer Science and Information Engineering**  
National Ilan University · Sep 2021–Jun 2025

**Education background** → `/education/`

### Capabilities at a glance

**Computer vision**  
Deep learning for image recognition and segmentation.

**AI applications**  
Retrieval-augmented generation and language-model workflows.

**Data & deployment**  
Data preparation, structured retrieval, and cloud deployment.

**Explore my skills** → `/skills/`

### Further down the homepage

**Experience across research and industry**  
I am an R&D Engineer Intern at PAPAGO! My previous roles at National Ilan University include computer vision research and AI development through industry–academia collaboration.

**View experience** → `/experience/`

**Research and recognition**  
My work includes lightweight vision models and breast tumor segmentation, with paper recognition at IS3C and AVSS in 2025.

**Research** → `/research/` · **Honors** → `/honors/`

**Learning and credentials**  
My learning spans programming, AI fundamentals, language-model applications, and applied deep learning.

**Certifications** → `/certifications/`

首頁到此收束，不展開所有論文、證照或經歷。共用頁尾提供 LinkedIn；GitHub 為可選補充入口。

## Education · `/education/`

**用途：** 清楚區分目前碩士階段與已完成的學士學位，展開研究與學習背景。

### Education

My academic background is in Computer Science and Information Engineering at National Ilan University. My studies connect computer vision, deep learning, and applied AI.

### M.S. in Computer Science and Information Engineering

**National Ilan University, Taiwan**  
Sep 2025–Present

I am a master's student in the Multimedia & Intelligent Technical Laboratory (MIT Lab), advised by Prof. Chih-Hsien Hsia. My research interests include computer vision, medical imaging, and vision-language models. My graduate research has explored small vision-language models for fine-grained agricultural image classification.

**Research interests and publications** → `/research/`

### B.S. in Computer Science and Information Engineering

**National Ilan University, Taiwan**  
Sep 2021–Jun 2025

During my undergraduate studies, I worked on generative AI for virtual try-on and personalized fashion applications, alongside programming, image processing, and applied computing projects.

### Learning beyond coursework

I participated in an introductory Arduino student community and a service-learning program focused on local engagement and English storytelling during my undergraduate studies.

**Related honors** → `/honors/` · **Skills** → `/skills/`

## Experience · `/experience/`

**用途：** 以日期、角色、機構與實際任務呈現經歷；有無公開程式或連結均可成立。

### Experience

My experience spans computer vision research, applied AI development, and an R&D engineering internship.

### R&D Engineer Intern

**PAPAGO! (PAPAGO Inc.) · Taipei, Taiwan**  
Aug 2026–Present

### AI Engineer Intern — Industry–Academia Collaboration

**National Ilan University**  
Sep 2025–Jun 2026

I developed AI applications for admissions guidance, combining language models, structured data, and data-processing workflows.

**AI-powered admissions counseling**

- Built a RAG-based counseling system with structured and SQL-based retrieval.
- Collected, cleaned, and standardized admissions information and school profiles for retrieval and filtering.
- Designed prompt workflows and data-use constraints for domain-specific answers.
- Deployed the application on GCP Cloud Run and checked API functionality for integration.

**U.S. college admissions prediction**

- Developed an admission-probability prediction system using student profiles and college information.
- Built web-crawling and preprocessing workflows to collect and standardize U.S. college data.

**Related capabilities** → `/skills/`

### Computer Vision Research Assistant — Medical Image Segmentation

**National Ilan University**  
Sep 2025–Feb 2026

Developed a Transformer-Mamba U-Net for breast tumor segmentation, combining transformer and state space modeling approaches.

**Related research** → `/research/`

### Computer Vision Research Assistant — Biometric Recognition

**National Ilan University**  
Feb 2025–Sep 2025

Proposed LViT-CB, a lightweight vision transformer with competitive blocks for finger vein recognition. This work received paper recognition at IS3C 2025.

**Related research** → `/research/` · **Paper honors** → `/honors/`

## Skills · `/skills/`

**用途：** 用任務與經驗說明能力，工具名稱服務理解，不使用百分比、自評分數或徽章牆。

### Skills

I work across model development, data preparation, and AI applications. These capabilities connect my research experience with applied engineering work.

### Computer vision & deep learning

Developing models for image recognition and segmentation, including lightweight vision transformers and U-Net-based architectures. My research experience covers finger vein recognition and breast tumor segmentation.

Tools and methods: Python, PyTorch, OpenCV, CNNs, vision transformers, U-Net, state space models.

**Research** → `/research/` · **Research experience** → `/experience/`

### Language models & retrieval

Building retrieval-augmented applications that combine document retrieval, structured information, and language-model prompts. My admissions-counseling work used RAG, SQL retrieval, and domain-specific prompt workflows.

Tools and methods: LLM applications, RAG, prompt engineering, structured retrieval, SQL; research interests in vision-language models.

**AI engineering experience** → `/experience/`

### Programming & data workflows

Collecting, cleaning, and standardizing heterogeneous data for model development and AI applications. My experience includes web crawling, preprocessing, and preparing education-related data for retrieval and prediction.

Tools and methods: Python, NumPy, Pandas, scikit-learn, web crawling, data preprocessing.

**Experience** → `/experience/`

### Application integration & deployment

Connecting data and model workflows to usable applications, including cloud deployment and basic API integration checks for an admissions-counseling system.

Tools and methods: GCP Cloud Run, API integration, data pipelines.

**Experience** → `/experience/` · **Courses and credentials** → `/certifications/`

## Research · `/research/`

**用途：** 呈現研究問題與發表，與 Experience 的職務時間軸分工；程式碼與 DOI 都是補充連結。

### Research

My research focuses on computer vision and deep learning, including efficient visual models, medical image segmentation, and multimodal AI.

### Research interests

**Efficient visual recognition**  
Lightweight vision-transformer architectures for biometric image recognition.

**Medical image segmentation**  
U-Net-based models combining transformers, state space modeling, linear attention, and frequency-aware features for breast tumor segmentation.

**Multimodal and generative AI**  
Vision-language models for fine-grained agricultural image classification and generative approaches to virtual try-on.

**Small language models**  
I have also explored compact reasoning and verification approaches for small language models.

### Selected publications

**A Frequency-Aware Hybrid U-Mamba for Breast Tumor Segmentation**  
Chi-An Chen, Sara Katharina Alessia Bosshart, Liang-Ying Ke, and Chih-Hsien Hsia.  
AIxMHC · 2025

A hybrid U-Mamba approach incorporating frequency-aware modeling for breast tumor segmentation.

**A State Space-Inspired U-Net with Linear Attention for Breast Tumor Segmentation**  
Chi-An Chen, Sean Chuan-En Shen, Liang-Ying Ke, and Chih-Hsien Hsia.  
AIxMHC · 2025

A state space-inspired segmentation architecture with linear attention.

**A Transformer-Mamba UNet for Breast Tumor Segmentation**  
Chi-An Chen, Liang-Ying Ke, Zih-Ching Chen, and Chih-Hsien Hsia.  
AVSS · 2025

Transformer and Mamba components for breast tumor segmentation.  
**Related award** → `/honors/`

**A Lightweight Vision Transformer with Competitive Blocks for Finger Vein Recognition**  
Chi-An Chen, Tzu-Hung Chien, Liang-Ying Ke, and Chih-Hsien Hsia.  
IS3C · 2025

Lightweight vision modeling with competitive blocks for finger vein recognition.  
**Related award** → `/honors/`

**輕量級視覺變壓器結合競爭模組於指靜脈辨識系統**  
陳麒安、柯良頴、夏至賢、陳勝濤。  
ITAOI · 2025

Research on lightweight vision transformers for finger vein recognition.  
**Related award** → `/honors/`

**基於可組裝串聯外觀流之虛擬服裝試穿**  
柯良頴、夏至賢、許良亦、陳麒安。  
ITAC · 2024

Virtual try-on using composable sequential appearance flow.

**Research experience** → `/experience/` · **Education** → `/education/`

## Honors · `/honors/`

**用途：** 分清論文作者群獲獎與競賽團隊成果；以事件列一次，不展示整張獎狀。

### Honors

Recognition for research and collaborative work in computer vision and applied computing.

### Paper awards

**Best Creative Award · AVSS 2025**  
Aug 2025 · Awarded to the paper's author team

A Transformer-Mamba UNet for Breast Tumor Segmentation.

**Best Conference Papers · IS3C 2025**  
Jun 2025 · Awarded to the paper's author team

A Lightweight Vision Transformer with Competitive Blocks for Finger Vein Recognition.

**Paper Honorable Mention (佳作論文獎) · ITAOI 2025**  
May 2025 · Awarded to the paper's author team

輕量級視覺變壓器結合競爭模組於指靜脈辨識系統.

**Related publications** → `/research/`

### Competition awards

**Third Place · International ICT Innovative Services Awards 2025**  
Nov 2025 · Industry–Academia Collaboration, PR3 · Team award

Team member for ScalpAIoT: An Edge-Cloud Collaborative System for Scalp Health Inspection and Management. The team represented National Ilan University and National Taiwan University of Science and Technology.

**Third Place · ESG Sustainable Development Competition**  
Dec 2025 · College of Humanities and Management, National Ilan University · Team award

An AI fashion-platform concept using virtual try-on to reduce returns and support sustainability.

**Third Place · Student Project Competition**  
May 2025 · College of Electrical Engineering and Computer Science, National Ilan University · Team award

A personalized fashion-generation and recommendation system based on generative AI.

**Award of Excellence (優等獎) · Programming and Information Applications Competition**  
Jun 2023 · Creative Ideas Category, National Ilan University · Team award

An AIoT smart aquarium system.

**Education** → `/education/` · **Skills** → `/skills/`

## Certifications · `/certifications/`

**用途：** 獨立列出資格與學習紀錄；專業資格、課程結訓和研討會刊登不混為一談。

### Certifications

Credentials and continued learning in programming, AI, and applied computing.

### Credentials

| Credential | Issuer | Earned | Focus |
| --- | --- | --- | --- |
| Gemini Certified Educator | Google for Education | 2025 | Google AI in education |
| IoT Application and Technology — Primary | Computer Skills Foundation · TQC | Apr 2025 | IoT concepts and applications |
| Programming Language Certification — Python 3 | Computer Skills Foundation · TQC+ | May 2024 | Python programming |
| Azure AI Fundamentals | Microsoft | Nov 2021 | AI concepts and Azure AI services |
| MTA: Introduction to Programming using Python | Microsoft | Aug 2021 | Programming fundamentals |

### Courses & workshops

| Course or learning topic | Provider | Completed | Focus |
| --- | --- | --- | --- |
| AI Workshop | Institute for Information Industry, at National Ilan University | May 2026 | Applied AI workshop |
| Building LLM Applications With Prompt Engineering | NVIDIA DLI | May 2025 | LLM application workflows |
| Disaster Risk Monitoring Using Satellite Imagery | NVIDIA DLI | May 2025 | Deep learning for satellite imagery |
| Building RAG Agents with LLMs | NVIDIA DLI | Apr 2025 | Retrieval-augmented generation |
| AI on Jetson Nano | NVIDIA DLI | Apr 2023; Apr 2025 | AI application development on Jetson Nano |
| 深度學習基礎理論與實踐 — Deep learning foundations and practice | NVIDIA DLI | Dec 2023 | Deep learning foundations |
| Cybersecurity Essentials | Cisco Networking Academy | Jan 2023 | Cybersecurity foundations |

The Jetson Nano learning entry covers the courses “透過 Jetson Nano 開發人工智慧應用” and “Getting Started with AI on Jetson Nano.”

**Applied skills** → `/skills/` · **Education** → `/education/`

## 全站導覽與連結規劃（編輯說明）

- 每頁使用 Home、Education、Experience、Skills、Research、Honors、Certifications 七個站內入口；目前頁用文字與底線區別，已使用 aria-current。
- 姓名連回 `/`；內頁連結使用上列獨立 URL。Experience ↔ Research、Research ↔ Honors、Skills ↔ Experience／Certifications 是主要交叉閱讀路徑。
- 頁尾：[LinkedIn](https://www.linkedin.com/in/chi-an-chen-993590315)；可選 [GitHub](https://github.com/Chi-An-Chen)。不作首頁主要 CTA。
- Research 可在個別紀錄加既有 DOI 或公開程式連結；無連結時仍顯示完整題目、作者、年份與摘要，不出現 Disabled、Private 或 Coming soon 按鈕。
- 路徑為本站邏輯路徑；Astro 頁面與資產連結共用 base path 處理，七頁均有實際路由。

## 各頁來源類型（編輯說明，不輸出至網站）

| 頁面 | 內容依據 | 選材用途 |
| --- | --- | --- |
| Home | 使用者提供的正式肖像、履歷、LinkedIn 匯出 | 姓名、目前教育身分、背景與能力摘要 |
| Education | 履歷、LinkedIn 教育紀錄、早期履歷、社群／服務學習證明 | 碩士與學士日期、研究背景、學習經歷 |
| Experience | LinkedIn 工作紀錄與履歷的任務描述 | 職稱、起訖日期、產學任務；不依賴公開程式 |
| Skills | 履歷技能、LinkedIn 技能與經歷、學習證明 | 任務導向能力群組，避免無依據熟練度分數 |
| Research | 履歷書目／研究敘述、論文刊登證明、論文獎狀 | 題目、作者、會議與研究方向 |
| Honors | 主辦單位獎狀、校內表揚與履歷 | 獲獎事件、團隊歸屬、合併重複證明 |
| Certifications | 資格證書、考試成績單、課程結訓、LinkedIn 資格匯出 | 資格／結訓分類、日期、重複項合併 |

完整來源定位、日期比較、文字轉寫差異及少量待確認事項保存在本機工作筆記，不混入上方自然履歷文案。
