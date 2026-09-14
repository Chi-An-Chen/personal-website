export const pages = [
  { id: 'home', label: 'Home', path: '' },
  { id: 'research', label: 'Research', path: 'research/' },
  { id: 'experience', label: 'Experience', path: 'experience/' },
  { id: 'about', label: 'About', path: 'about/' },
] as const;
export type PageId = (typeof pages)[number]['id'];
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const assetUrl = (path: string) => `${base}${path.replace(/^\//, '')}`;
export const pageUrl = (id: PageId) => assetUrl(pages.find(page => page.id === id)!.path);
export const profiles = {
  linkedin: 'https://www.linkedin.com/in/chi-an-chen-993590315',
  github: 'https://github.com/Chi-An-Chen',
};
export const legacyRoutes = [
  { path: 'education', label: 'Education', target: 'about', anchor: 'education' },
  { path: 'skills', label: 'Skills', target: 'experience', anchor: 'capabilities' },
  { path: 'honors', label: 'Honors', target: 'about', anchor: 'recognition' },
  { path: 'certifications', label: 'Certifications', target: 'about', anchor: 'credentials' },
] as const;
export const education = [
  {
    shortTitle: 'Master of Science',
    title: 'M.S. in Computer Science and Information Engineering',
    start: '2025-09', startLabel: 'Sep 2025', end: null, endLabel: 'Present',
    description: "I am a master's student in the Multimedia & Intelligent Technical Laboratory (MIT Lab), advised by Prof. Chih-Hsien Hsia. My graduate research explores agricultural vision-language understanding, including plant disease and pest recognition and reasoning-oriented model adaptation. I also work on collaborative research into reasoning and verification for small language models.",
  },
  {
    shortTitle: 'Bachelor of Science',
    title: 'B.S. in Computer Science and Information Engineering',
    start: '2021-09', startLabel: 'Sep 2021', end: '2025-06', endLabel: 'Jun 2025',
    description: 'During my undergraduate studies, I worked on generative AI for virtual try-on and personalized fashion applications, alongside programming, image processing, and applied computing projects.',
  },
] as const;
