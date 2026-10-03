import { publications } from './publications';
import { recognition } from './recognition';
import { learningItems } from './learning';

// Count bibliographic records, not projects, manuscripts, awards or proof files.
// Distinct conference records of related research remain distinct publications.
for (const records of [publications, recognition, learningItems]) {
  if (new Set(records.map(item => item.id)).size !== records.length) {
    throw new Error('Duplicate factual record in portfolio overview');
  }
}
const bibliographyKeys = publications.map(paper => `${paper.title.trim().toLowerCase()}|${paper.venue}|${paper.year}`);
if (new Set(bibliographyKeys).size !== bibliographyKeys.length) {
  throw new Error('Duplicate bibliographic entry in portfolio overview');
}
export const publicationOverview = {
  total: publications.length,
  english: publications.filter(paper => paper.lang === 'en').length,
  chinese: publications.filter(paper => paper.lang === 'zh-Hant').length,
  years: [...new Set(publications.map(paper => paper.year))].sort(),
};
export const credentialCount = learningItems.filter(item => item.kind === 'credential').length;
export const selectedRecognition = ['avss-2025', 'is3c-2025', 'ict-2025'].map(id => {
  const item = recognition.find(item => item.id === id);
  if (!item) throw new Error(`Unknown selected recognition: ${id}`);
  return item;
});
