// Only completed routes are exposed by the shared navigation.
export const pages = [
  { id: 'home', label: 'Home', path: '', available: true },
  { id: 'education', label: 'Education', path: 'education/', available: true },
  { id: 'experience', label: 'Experience', path: 'experience/', available: true },
  { id: 'skills', label: 'Skills', path: 'skills/', available: true },
  { id: 'research', label: 'Research', path: 'research/', available: true },
  { id: 'honors', label: 'Honors', path: 'honors/', available: true },
  { id: 'certifications', label: 'Certifications', path: 'certifications/', available: true },
] as const;
export type PageId = (typeof pages)[number]['id'];
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const assetUrl = (path: string) => `${base}${path.replace(/^\//, '')}`;
export const pageUrl = (id: PageId) => assetUrl(pages.find((page) => page.id === id)!.path);
export const education = [
  {
    shortTitle: 'Master of Science',
    title: 'M.S. in Computer Science and Information Engineering',
    start: '2025-09', startLabel: 'Sep 2025', end: null, endLabel: 'Present',
    description: "I am a master's student in the Multimedia & Intelligent Technical Laboratory (MIT Lab), advised by Prof. Chih-Hsien Hsia. My research interests include computer vision, medical imaging, and vision-language models. My graduate research has explored small vision-language models for fine-grained agricultural image classification.",
  },
  {
    shortTitle: 'Bachelor of Science',
    title: 'B.S. in Computer Science and Information Engineering',
    start: '2021-09', startLabel: 'Sep 2021', end: '2025-06', endLabel: 'Jun 2025',
    description: 'During my undergraduate studies, I worked on generative AI for virtual try-on and personalized fashion applications, alongside programming, image processing, and applied computing projects.',
  },
] as const;
export const capabilities = [
  { title: 'Computer vision', description: 'Deep learning for image recognition and segmentation.' },
  { title: 'AI applications', description: 'Retrieval-augmented generation and language-model workflows.' },
  { title: 'Data & deployment', description: 'Data preparation, structured retrieval, and cloud deployment.' },
];
