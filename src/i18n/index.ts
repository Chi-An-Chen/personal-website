import zh from './zh.json';
export const locales = ['en', 'zh-Hant'] as const;
export type Locale = typeof locales[number];
const messages: Readonly<Record<string, string>> = zh;
/** English source copy is the key. Missing Chinese copy fails the static build. */
export const translator = (locale: Locale) => (text: string): string => {
  if (locale === 'en') return text;
  if (!Object.hasOwn(messages, text) || !messages[text].trim()) throw new Error(`Missing zh-Hant translation: ${text}`);
  return messages[text];
};
export function dateLabel(label: string, locale: Locale): string {
  if (locale === 'en') return label;
  if (label === 'Present') return '至今';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return label.split('; ').map(part => {
    const match = /^(\w{3}) (\d{4})$/.exec(part);
    if (match && months.includes(match[1])) return `${match[2]} 年 ${months.indexOf(match[1]) + 1} 月`;
    if (/^\d{4}$/.test(part)) return `${part} 年`;
    throw new Error(`Unsupported date label: ${part}`);
  }).join('；');
}
