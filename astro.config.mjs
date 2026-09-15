// @ts-check
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://chi-an-chen.github.io',
  base: '/personal-website',
  output: 'static',
  // Keep the single audited motion entry inline; other assets retain Vite defaults.
  vite: { build: { assetsInlineLimit: (filePath) => /(?:^|\/)MotionRuntime\.astro_astro_type_script_.*\.js$/.test(filePath) ? true : undefined } },
  i18n: { defaultLocale: 'en', locales: ['en', { path: 'zh', codes: ['zh-Hant'] }], routing: { prefixDefaultLocale: false } },
  trailingSlash: 'always',
});
