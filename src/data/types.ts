export interface Publication {
  id: string; title: string; authors: string; venue: string; year: string;
  description: string; award: boolean; lang: 'en' | 'zh-Hant';
}
export interface Role {
  id: string; title: string; organization: string; location?: string;
  start: string; startLabel: string; end: string | null; endLabel: string;
  context?: string; relatedResearch?: string; relatedEngineeringWork?: string;
}
export interface Recognition {
  id: string; title: string; date: string; datetime: string;
  kind: 'paper-team' | 'competition-team'; context?: string;
  description?: string; relatedPublication?: string;
}
export interface LearningItem {
  id: string; name: string; issuer: string; date: string; focus: string;
  kind: 'credential' | 'course' | 'participation'; lang?: 'en' | 'zh-Hant'; detail?: string;
}
export type ConceptKind = 'vlm' | 'reasoning' | 'retrieval';
export interface EngineeringWork {
  id: string; title: string; summary: string; contribution: string;
  problem: string; integration: string; methods: string[];
  visual?: ConceptKind; kind: 'applied-project' | 'exploration';
}
