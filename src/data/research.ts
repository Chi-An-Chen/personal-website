import { publications } from './publications';
export type PublicationId = (typeof publications)[number]['id'];
import type { ConceptKind } from './types';
export type { ConceptKind } from './types';
export interface ResearchTheme {
  id: string; title: string; shortTitle: string; summary: string;
  question: string; contribution: string; preview?: string; approach?: string[]; methods: string[];
  kind: 'research' | 'collaborative-research'; visual?: ConceptKind;
  publicationIds: PublicationId[];
}
export const researchThemes: ResearchTheme[] = [
  {
    id: 'agricultural-vlm', title: 'Vision-language models for agricultural understanding',
    shortTitle: 'Agricultural VLMs', kind: 'research', visual: 'vlm', publicationIds: [],
    summary: 'Studying how much reasoning small vision-language models need for fine-grained agricultural recognition.',
    question: 'Can concise, visually grounded supervision support fine-grained crop recognition more effectively than long-form reasoning in a small multimodal model?',
    contribution: 'My graduate research investigates the reasoning length–accuracy trade-off in small multimodal models through CROP, the Constrained Reasoning and Observation Pipeline. My work connects task-specific supervision, model adaptation, and evaluation of plant disease and pest recognition under field-image conditions.',
    preview: 'My graduate research explores CROP: learning from visual descriptions, bounded reasoning, and direct class labels while keeping inference concise.',
    approach: [
      'CROP separates supervision into diagnosis-free visual descriptions, bounded rationales grounded in visible symptoms, and direct class labels. These complementary targets are combined in single-stage supervised fine-tuning of Qwen3-VL-2B-Instruct; inference supports either a class label alone or a short rationale followed by the label.',
      'The study evaluates supervision mixtures and reasoning formats through ablations, classification and cross-domain evaluation, and hardware profiling. The final implementation uses parameter-efficient fine-tuning with DoRA.',
    ],
    methods: ['Fine-grained visual categorization', 'Decoupled supervision', 'Bounded reasoning', 'Parameter-efficient fine-tuning with DoRA', 'Ablation studies'],
  },
  {
    id: 'reasoning-verification', title: 'Reasoning and verification in small language models',
    shortTitle: 'Reasoning & verification', kind: 'collaborative-research', visual: 'reasoning', publicationIds: [],
    summary: 'Examining the cost of structured reasoning and the conditional value of verification in compact language models.',
    question: 'When do arithmetic and verification cues justify their cost under limited model capacity and inference budgets?',
    contribution: 'In collaborative research, I investigate how output structure affects mathematical reasoning in compact language models. My work on training-data construction and evaluation contributes to VeriTool, a study of schema costs, answer-format adherence, and verification-associated error recovery.',
    preview: 'In collaborative research, I examine how reasoning formats affect accuracy and when explicit verification helps models recover from errors.',
    approach: [
      'A matched-data ablation compares compact chain-of-thought, arithmetic markup, and arithmetic markup with an explicit verification segment, holding source examples, training, and decoding fixed for Qwen3-0.6B. Error-injection experiments separately examine recovery across corruption types and compact-model configurations.',
      'The study distinguishes answer accuracy from format adherence, output length, and inference time. Verification benefits depend on the error and model configuration; a complementary Efficient CoT pipeline explores token-budget-filtered supervision, with its data and training differences considered when interpreting results.',
    ],
    methods: ['Mathematical reasoning', 'Matched-data ablation', 'Structured supervision', 'Error injection', 'Accuracy–efficiency analysis'],
  },
  {
    id: 'visual-research', title: 'Visual recognition and medical image segmentation',
    shortTitle: 'Computer vision', kind: 'research',
    summary: 'Learning discriminative vein patterns and modeling tumor boundaries through task-specific visual architectures.',
    question: 'How can model structure be adapted to the different demands of biometric recognition and medical image segmentation?',
    contribution: 'My computer vision research explores competitive feature selection for finger vein recognition and complementary state space, linear-attention, and frequency-aware approaches to breast tumor segmentation.',
    methods: ['Competitive feature selection', 'Vision transformers', 'State space models', 'Linear attention', 'Frequency-domain modeling'],
    publicationIds: ['fahu-mamba', 'ssiu-net', 'transformer-mamba-unet', 'lvit-cb', 'lvit-cb-itaoi'],
  },
];
export const identityStatement = 'I study and build AI systems across language and vision. My research examines visual grounding and reasoning under limited model capacity, alongside applied work in retrieval-based systems and AI engineering.';
