import type { EngineeringWork } from './types';
export const retrievalWork: EngineeringWork = {
  id: 'retrieval-applications', title: 'From information retrieval to AI applications', kind: 'applied-project', visual: 'retrieval',
  summary: 'Connecting documents, structured queries, and contextual information in admissions-counseling applications.',
  contribution: 'My applied work brings document retrieval and SQL-based information lookup into domain-specific question-answering workflows. It includes preparing school and admissions information and connecting those components to application interfaces.',
  problem: 'An admissions question can depend on information spread across documents, school records, and contextual rules. A useful answer requires retrieving the right kind of evidence and bringing it into a coherent conversational flow.',
  integration: 'I connect retrieval, domain-specific prompts, data-use constraints, and application APIs. In separate document-AI work, I prepare sustainability-document collections, use metadata in retrieval, and develop PDF extraction and language-model summarization workflows.',
  methods: ['Document retrieval', 'SQL lookup', 'Context composition', 'API integration'],
};
export const engineeringWork: EngineeringWork[] = [
  retrievalWork,
  {
    id: 'predictive-modeling', title: 'Predictive modeling and language tasks', kind: 'exploration',
    summary: 'Working with structured student and institution data, event sequences, and sustainability texts.',
    problem: 'Different prediction tasks call for different representations: tabular features for admissions data, ordered events for sequence prediction, and text for commitments and supporting evidence.',
    contribution: 'I developed U.S. college admissions modeling workflows using feature engineering and neural-network models, including combinations of neural predictions and gradient-boosting models. My experience also includes sports-event sequence prediction and sustainability-text classification.',
    integration: 'These workflows connect feature preparation with neural and tree-based baselines and task-specific evaluation. They include modeling experiments and competition work, with the emphasis on how data and evaluation shape the model.',
    methods: ['Python', 'scikit-learn', 'Feature engineering', 'Neural models', 'Ensemble modeling', 'Text classification'],
  },
  {
    id: 'data-pipelines', title: 'Data pipelines before model inference', kind: 'applied-project',
    summary: 'Turning heterogeneous records into inputs that retrieval and modeling workflows can use.',
    problem: 'School profiles, admissions documents, transport stops, and geographic records arrive in different formats. They need to be collected, aligned, and checked before they can support an AI application.',
    contribution: 'I build crawling, ingestion, cleaning, and normalization workflows, including school and admissions data preparation and document processing. My geospatial work includes matching coordinates to administrative boundaries, deduplicating transport records, and preparing stop-to-school commute information.',
    integration: 'I connect tabular and spatial processing with routing APIs and database-ready outputs. The work brings data sources into a usable form for downstream retrieval, filtering, and analysis.',
    methods: ['Python', 'NumPy', 'Pandas', 'Web crawling', 'Document processing', 'Spatial matching', 'Routing APIs'],
  },
  {
    id: 'perception-inference', title: 'Applied perception and inference engineering', kind: 'applied-project',
    summary: 'Evaluating image and video models and connecting them to application workflows.',
    problem: 'Using a perception model involves more than an isolated prediction: inputs, model behavior, inference backends, and application interfaces all need to work together.',
    contribution: 'My experience includes image and video processing, object recognition and detection, visual retrieval, and image-quality evaluation. I also evaluate and adapt face anti-spoofing and deepfake-detection models.',
    integration: 'I work on inference and API integration, including ONNX Runtime backend selection and CPU inference workflows. Model adaptation and evaluation help connect existing methods to the needs of an application.',
    methods: ['PyTorch', 'OpenCV', 'Model evaluation', 'ONNX Runtime', 'CPU inference', 'API integration'],
  },
];
export const capabilityGroups = [
  { title: 'Computer vision and multimodal learning', description: 'Recognition, segmentation, and vision-language models, with domain-specific data preparation and model adaptation.', page: 'research', anchor: 'agricultural-vlm', link: 'Vision-language research' },
  { title: 'Language-model reasoning and evaluation', description: 'Concise reasoning, verification-oriented data generation, and mathematical evaluation workflows in collaborative research.', page: 'research', anchor: 'reasoning-verification', link: 'Reasoning & verification' },
  { title: 'Retrieval and conversational systems', description: 'Document retrieval, structured queries, and contextual evidence connected to domain-specific question answering.', page: 'experience', anchor: 'retrieval-applications', link: 'Retrieval applications' },
  { title: 'Predictive modeling and NLP', description: 'Neural and ensemble-modeling workflows for structured data, event sequences, and language-classification tasks.', page: 'experience', anchor: 'predictive-modeling', link: 'Modeling workflows' },
  { title: 'Data and inference engineering', description: 'Heterogeneous and geospatial data preparation, document processing, API integration, and inference backends.', page: 'experience', anchor: 'data-pipelines', link: 'Data pipelines' },
] as const;
