import { publications } from './publications';
export type PublicationId = (typeof publications)[number]['id'];
import type { ConceptKind } from './types';
export type { ConceptKind } from './types';
export interface ResearchTheme {
  id: string; title: string; shortTitle: string; summary: string;
  question: string; contribution: string; methods: string[];
  kind: 'research' | 'collaborative-research'; visual?: ConceptKind;
  publicationIds: PublicationId[];
}
export const researchThemes: ResearchTheme[] = [
  {
    id: 'agricultural-vlm', title: 'Vision-language models for agricultural understanding',
    shortTitle: 'Agricultural VLMs', kind: 'research', visual: 'vlm', publicationIds: [],
    summary: 'Exploring plant disease and pest recognition through visual descriptions, reasoning, and self-checking.',
    question: 'How can a lightweight vision-language model connect visible plant symptoms with an answer that can be checked against the image?',
    contribution: 'My graduate research includes preparing classification, visual-description, and reasoning data; adapting lightweight vision-language models; and evaluating agricultural visual question-answering tasks.',
    methods: ['Vision-language models', 'Parameter-efficient fine-tuning with DoRA', 'Multi-task data preparation', 'Visual question answering', 'Evaluation workflows'],
  },
  {
    id: 'reasoning-verification', title: 'Reasoning and verification in small language models',
    shortTitle: 'Reasoning & verification', kind: 'collaborative-research', visual: 'reasoning', publicationIds: [],
    summary: 'Studying concise reasoning and verification-oriented workflows for language models with limited capacity.',
    question: 'How should small language models reason when capacity is limited, and how can their responses be checked?',
    contribution: 'In collaborative research, I study concise reasoning and verification-oriented workflows for small language models. My work includes training-data generation and mathematical reasoning evaluation, with attention to answer checking and model capacity.',
    methods: ['Small language models', 'Reasoning-data generation', 'Answer verification', 'Mathematical reasoning', 'Inference evaluation'],
  },
  {
    id: 'visual-research', title: 'Visual recognition and medical image segmentation',
    shortTitle: 'Computer vision', kind: 'research',
    summary: 'A research foundation in lightweight biometric recognition and breast tumor segmentation.',
    question: 'How can model structure be adapted to the different demands of biometric recognition and medical image segmentation?',
    contribution: 'My computer vision research includes lightweight vision transformers for finger vein recognition and U-Net-based approaches to breast tumor segmentation. These projects explore transformer, state space, attention, and frequency-aware modeling approaches.',
    methods: ['Vision transformers', 'U-Net', 'State space models', 'Image recognition', 'Medical image segmentation'],
    publicationIds: ['fahu-mamba', 'ssiu-net', 'transformer-mamba-unet', 'lvit-cb', 'lvit-cb-itaoi'],
  },
];
export const identityStatement = 'I study and build AI systems across language and vision. My work spans model adaptation and evaluation, retrieval-based applications, and the data and inference workflows that connect them.';
