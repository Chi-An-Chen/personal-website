# Personal Website Motion & Design-System Polish
## Codex Engineering Requirements & Implementation Specification

### 0. 任務目標

在**不重新設計網站、不改變既有資訊架構、不導入 React / Motion / GSAP / Tailwind 或其他 runtime dependency** 的前提下，對目前 Chi-An Chen personal website 做一次精準的 motion、navigation、component system 與 performance polish。

Repository：

`Chi-An-Chen/personal-website`

目前正式基線：

`main @ a8b689a1ae54c65ec9f33828271c20444447fa37`

網站仍維持：

- Astro
- TypeScript
- semantic HTML
- CSS-first
- static output
- GitHub Pages
- English + Traditional Chinese
- progressive enhancement
- accessibility-first
- minimal client JavaScript

這不是 redesign。

不得重新探索另一套視覺方向，也不要重新決定 palette、font、頁面結構、card system、navigation architecture 或 animation library。

本次只有五項工作：

1. Home Opening Text Reveal
2. Main Navigation Static + Moving Active Pill
3. Shared Editorial UI primitives systemization
4. Home Selected Work evidence metadata
5. Font subsetting / payload optimization

---

# 1. 設計原則

目前網站的 editorial identity 必須完整保留：

- warm paper background
- ink text
- muted text
- brown accent
- Source Serif 4 display typography
- Source Sans 3 body/navigation typography
- generous whitespace
- thin dividers
- content-first composition
- real portrait
- no generic card grid
- no badge cloud
- no excessive rounded rectangles
- no decorative animation for its own sake

參考來源只用來理解 interaction pattern：

- BeUI Text Reveal：參考 blur + translateY + stagger 的 reveal 語言
- BeUI Pill Tabs：參考 active indicator 在不同位置間 glide / resize 的概念
- Component Gallery：參考 reusable UI primitive / design-system 的結構觀念
- MDN View Transition / `@starting-style`：作為 native implementation reference

不要複製上述網站的 React components、DOM semantics 或 dependencies。

---

# 2. 不可違反的工程限制

## 2.1 不新增 runtime dependencies

不得新增：

- React
- motion / framer-motion
- GSAP
- Tailwind
- clsx
- tailwind-merge
- animation library
- UI component library

`package.json` 與 lockfile原則上不應因本任務改動。

若 font subsetting 需要工具，可使用**本機臨時工具**，不得加入網站 runtime dependencies。

---

## 2.2 Navigation semantics 不變

Home / Research / Experience / About 是真正的網站 navigation。

必須繼續使用：

```html
<a href="..." aria-current="page">
```

禁止改成：

```html
<button role="tab">
```

或任何 SPA tab semantics。

---

## 2.3 不做整頁 transition

只有 main navigation 的 active pill 可以做 cross-document visual transition。

禁止：

- page fade
- page slide
- hero morph
- main content crossfade
- scroll-driven page transition
- Astro ClientRouter
- SPA conversion

正文頁面的切換仍然是正常的 MPA navigation。

---

## 2.4 Progressive enhancement

任何 animation 不可成為內容顯示或 navigation 正確性的必要條件。

在以下情況仍需完整可用：

- JavaScript disabled
- CSS feature unsupported
- `prefers-reduced-motion: reduce`
- View Transition unsupported
- font load failure
- back/forward navigation
- direct deep-link
- 200% text enlargement

---

# 3. 實作順序

必須依照以下順序執行，不要平行大改：

### Phase A
1. 更新 project rules / documentation conflicts
2. Opening Text Reveal
3. Static active navigation Pill
4. Moving Pill enhancement

### Phase B
5. PageHeading systemization
6. SectionIndex component
7. EditorialRecord CSS primitive

### Phase C
8. Home evidence metadata

### Phase D
9. 完整功能 / browser regression
10. 記錄 performance baseline
11. Font subsetting
12. 再次完整 regression + Lighthouse

不要一開始就處理 fonts。

---

# 4. Requirement 1 — Home Opening Text Reveal

## 4.1 現況

Home opening 保留原文：

```text
From perception,
to reasoning,
to practice.
```

不得修改文案。

目前 HTML 已經是三個獨立 `<span>`。

盡量直接利用既有 DOM，不要為 animation 增加 unnecessary wrapper。

---

## 4.2 決定後的 animation

採用 **line-by-line reveal**。

不是：

- word-by-word
- character-by-character
- typing
- scramble
- gradient sweep

三行啟動時間：

```text
Line 1: 0 ms
Line 2: 160 ms
Line 3: 320 ms
```

每一行：

```text
opacity: 0 → 1
filter: blur(6px) → blur(0)
transform: translateY(22%) → translateY(0)
```

Timing：

```text
opacity:   ~420ms
filter:    ~520ms
transform: ~680ms
```

Easing：

優先沿用目前網站既有 motion language：

```css
cubic-bezier(.22,.75,.25,1)
```

三行應約在 **1 秒內全部 settled**。

不得刻意延長到 1.3–1.5 秒以上。

---

## 4.3 Implementation

優先使用 CSS：

```css
@starting-style
```

不要新增 JavaScript。

不要新增新的 `@keyframes`。

原因：目前 build contract 只批准既有 `editorial-enter` keyframe；本功能不需要增加第二個 keyframe。

概念結構：

```css
@media (prefers-reduced-motion: no-preference) {
  .prologue-statement > span {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);

    transition:
      opacity 420ms var(--motion-ease),
      filter 520ms var(--motion-ease),
      transform 680ms var(--motion-ease);
  }

  .prologue-statement > span:nth-child(1) {
    transition-delay: 0ms;
  }

  .prologue-statement > span:nth-child(2) {
    transition-delay: 160ms;
  }

  .prologue-statement > span:nth-child(3) {
    transition-delay: 320ms;
  }

  @starting-style {
    .prologue-statement > span {
      opacity: 0;
      transform: translateY(22%);
      filter: blur(6px);
    }
  }
}
```

Codex 可依實際 browser rendering 做極小的數值微調，但：

- stagger 固定 160ms
- blur 不得 > 8px
- Y offset 不得 > 25%
- total reveal 不得明顯 > 1s

---

## 4.4 Interaction behavior

動畫進行中，使用者仍可立即：

- wheel down
- swipe up
- ArrowDown
- PageDown
- Space
- click Scroll

不得等待動畫結束才允許進站。

不得修改目前 opening dismissal / hidden / scroll compensation behavior。

---

## 4.5 Reduced motion

`prefers-reduced-motion: reduce`：

三行**直接完整顯示**。

不要改成「比較慢的 fade」。

---

## 4.6 Unsupported CSS fallback

若 browser 不支援 `@starting-style`：

直接顯示正常三行文字。

不得產生 hidden content。

---

# 5. Requirement 2 — Main Navigation Active Pill

## 5.1 Scope

只作用於：

- Home
- Research
- Experience
- About

Language switch 不改成 pill。

Footer navigation 不改成 pill。

---

## 5.2 Static visual state

目前 underline current indicator 要改成單一 active pill。

例如：

```text
Home    [ Research ]    Experience    About
```

不是：

```text
[ Home | Research | Experience | About ]
```

禁止增加外層 capsule。

---

## 5.3 Visual specification

Active pill：

```text
background: var(--ink)
text: var(--paper)
border-radius: 999px
```

Desktop link padding：

約：

```css
9px 13px
```

Mobile：

約：

```css
8px 9px
```

允許根據 320px layout 做 1–2px 微調。

Inactive navigation：

保留現有網站色彩系統，不重新設計整個 header。

Hover：

可以使用非常淡的 background feedback：

約 4–6% ink。

不得讓 inactive links 也像完整 pill。

---

## 5.4 DOM

`Layout.astro` 中 current navigation item 可以改成：

```astro
<a ... aria-current={active ? 'page' : undefined}>
  {active && (
    <span class="nav-active-pill" aria-hidden="true"></span>
  )}
  <span class="nav-label">{t(page.label)}</span>
</a>
```

Active pill 必須：

- purely decorative
- `aria-hidden="true"`
- 不影響 link accessible name

Link 本身仍是唯一 interactive element。

---

## 5.5 移除舊 indicator

清理現有：

- active underline
- hover underline pseudo-element
- current-page underline

避免發生：

```text
pill + underline
```

同時存在。

Focus indicator 除外。

Keyboard focus 必須繼續使用明確 outline。

---

# 6. Requirement 2B — Moving Pill

## 6.1 Desired behavior

Page navigation：

```text
[ Home ] → Research
```

點擊後：

```text
pill 從 Home 的位置
滑向 Research
同時改變 width
```

只有 pill 動。

Text 本身不要 morph。

Page body 不要 fade。

---

## 6.2 Implementation technology

使用 native MPA View Transition：

```css
@view-transition {
  navigation: auto;
}
```

Active pill 使用：

```css
view-transition-name: nav-pill;
```

禁止加入 Astro ClientRouter。

---

## 6.3 Root transition

預設 page/root transition 必須關閉。

概念：

```css
:root {
  view-transition-name: none;
}
```

只讓 named `nav-pill` 參與 transition。

若實際瀏覽器 implementation 需要額外 pseudo-element override，可加入，但最終結果必須是：

**只有 pill 有 visible transition。**

---

## 6.4 Timing

目標：

```text
320–380ms
```

Default：

```text
360ms
```

Easing：

```css
var(--motion-ease)
```

目前：

```css
cubic-bezier(.22,.75,.25,1)
```

不要嘗試用 JS 模擬 spring physics。

---

## 6.5 Reduced motion

Reduced motion 時：

```css
.nav-active-pill {
  view-transition-name: none;
}
```

或等價做法。

結果：

新頁直接顯示新的 active pill。

---

## 6.6 Unsupported browser

若不支援 cross-document View Transition：

正常 MPA navigation。

新頁直接顯示新的 static pill。

此情況視為完全正確的 fallback，不是 bug。

---

# 7. Requirement 3 — Editorial Design-System Systemization

本階段是 refactor，不是 redesign。

視覺差異應盡量小。

---

# 7.1 PageHeading

目前 Experience / About 已使用：

```text
PageHeading.astro
```

Research 有一套重複的：

```text
research-heading
research-lead
research-introduction
```

需要統一。

## Required change

擴充：

```ts
lead: string | string[]
```

單一 string：

維持 Experience / About 現況。

Array：

逐行輸出，中間使用 `<br />`。

Research：

```ts
lead={[
  t("Understanding images."),
  t("Reasoning with language.")
]}
```

Research introduction 放入 PageHeading existing context slot。

刪除 Research 重複 heading CSS。

---

# 7.2 SectionIndex

新增：

```text
src/components/editorial/SectionIndex.astro
```

Purpose：

統一目前三種 page-local navigation：

- Research theme index
- Experience index
- About index

Interface：

```ts
interface SectionIndexItem {
  href: string;
  label: string;
  number?: string;
}

interface Props {
  items: SectionIndexItem[];
  ariaLabel: string;
  layout?: 'inline' | 'grid';
  showArrow?: boolean;
  tracked?: boolean;
}
```

Defaults：

```text
layout = inline
showArrow = false
tracked = false
```

### Research

```text
layout = grid
showArrow = true
tracked = true
```

Items 保留：

```text
01
02
03
```

### Experience

```text
layout = inline
showArrow = true
tracked = false
```

### About

```text
layout = inline
showArrow = false
tracked = false
```

---

## Research runtime integration

目前 `motion.ts` 不應再依賴：

```text
.theme-index
```

改用 stable behavior selector：

```text
[data-section-index]
```

`tracked=true` 時輸出：

```html
data-section-index
```

Research 原有：

```html
data-fieldbook
```

保留。

Sticky behavior、`aria-current="location"`、desktop-only orientation 全部保留。

---

# 7.3 Editorial Record CSS primitive

不要建立一個複雜的 Astro mega-component。

建立 shared CSS primitive：

```text
.editorial-record-list
.editorial-record
.editorial-record__meta
.editorial-record__content
```

可使用 CSS custom properties：

```css
--record-meta-width
--record-gap
--record-padding
```

目標是統一：

- Roles
- Education
- Recognition
- Publications
- Learning records

但各頁仍保留自己的 semantic HTML。

例如：

- `<ol>`
- `<li>`
- `<time>`
- `<h3>`
- `<h4>`
- publication language attributes
- award links

全部保留。

如果 Learning record 的 metadata 位於右側，可使用：

```text
.editorial-record--meta-end
```

或等價 modifier。

不要為了共用 CSS 破壞內容語意。

---

## Refactor acceptance rule

除了本規格明確指定的：

- Opening
- Navigation
- Evidence metadata

之外：

Research / Experience / About 的 visual hierarchy 不應明顯改變。

如果 refactor 導致 spacing / type scale / order 明顯不同，應修正為接近原 baseline。

---

# 8. Requirement 4 — Home Selected Work Evidence Metadata

## 8.1 Purpose

在首頁 Selected Work 中加入一行輕量 evidence / method metadata。

目的：

讓快速掃描首頁的人可以立即知道每個案例的實際 methodological signal。

不是 tech badge。

不是 skill cloud。

---

## 8.2 Exact content

### Agricultural VLM

```text
Fine-grained visual categorization · Bounded reasoning · Parameter-efficient fine-tuning with DoRA
```

### Reasoning & verification

```text
Matched-data ablation · Error injection · Accuracy–efficiency analysis
```

### Retrieval

```text
Document retrieval · SQL lookup · API integration
```

不要由 Codex重新撰寫文案。

---

## 8.3 Data model

ResearchTheme 增加：

```ts
homeEvidence?: string[];
```

EngineeringWork 增加：

```ts
homeEvidence?: string[];
```

將上述 exact strings 寫入 data layer。

不要直接把 evidence hard-code 在 `HomePage.astro`。

---

## 8.4 Data validation

每一個 `homeEvidence` item 必須已存在於該 entry 的：

```ts
methods
```

建議在 data module build-time evaluation 中加入 invariant：

```ts
if (homeEvidence?.some(item => !methods.includes(item))) {
  throw new Error(...)
}
```

這樣未來 methods / evidence 不一致會直接 build fail。

---

## 8.5 i18n

上述 method strings 目前已有繁中 translation。

Home 應使用：

```ts
homeEvidence.map(t).join(' · ')
```

不要建立第二套重複 translation key。

---

## 8.6 Home placement

順序固定：

```text
kicker
title
feature summary
evidence metadata
description / preview
CTA
```

Evidence line 不得放成 floating badge。

---

## 8.7 Styling

約：

```text
font-size: 0.875–0.9375rem
line-height: ~1.5
color: var(--muted)
margin around 14–18px
```

無：

- border
- background
- radius
- icon
- chip

手機允許自然換行。

---

# 9. Requirement 5 — Font Payload Optimization

此項最後執行。

---

## 9.1 Current baseline

目前三個 font files：

```text
SourceSans3-Regular.woff2
SourceSans3-Semibold.woff2
SourceSerif4-Regular.woff2
```

現有總大小約：

```text
416,832 bytes
```

這是目前網站相對明顯的傳輸成本。

不要透過換掉字型解決。

---

## 9.2 Subsetting principle

Source fonts 主要負責 Latin typography。

繁中仍由現有：

- PingFang TC
- Microsoft JhengHei
- Noto Sans TC
- Songti TC
- PMingLiU

等 fallback 處理。

Subset 至少保留：

- Basic Latin
- Latin-1 Supplement
- Latin Extended-A
- Latin Extended-B
- Latin Extended Additional
- General Punctuation
- Currency Symbols
- Letterlike Symbols
- Arrows

不要只保留 A–Z / a–z。

---

## 9.3 Tooling

可以使用臨時：

```text
fonttools / pyftsubset
```

但：

- 不加入 npm runtime dependencies
- 不加入 production Python dependency
- 不提交 font tool cache
- 不提交 temporary source fonts

輸出仍覆蓋現有三個 WOFF2 filename。

因此 CSS path 不需要改。

---

## 9.4 Success criterion

Subset 後：

**三個 published font files 的總 payload 至少降低 40%。**

如果無法在正確 glyph coverage 下達到此目標：

保留原 font files，不為了數字破壞 typography。

---

## 9.5 Glyph QA

至少檢查：

```text
Chi-An Chen
AI Research & Engineering
en dash –
em dash —
curly quote “ ”
apostrophe ’
middle dot ·
arrow ↗
arrow ↓
```

以及所有 publication title / author names。

檢查 accented Latin author names。

繁中不得出現 tofu / missing glyph。

---

# 10. Project Rule Updates

目前 project rules 與已確認需求存在兩個衝突，必須在實作前同步修正。

---

## 10.1 AGENTS.md — Opening exception

舊規則：

```text
statement is visible immediately
```

改成：

Home prologue 是唯一允許 initial text reveal 的 brand element。

規則應表達：

```text
The Home prologue may use one finite initial line-by-line reveal.
Its three existing lines may reveal through opacity, blur, and
short upward motion over approximately one second.

The animation must never block scrolling or navigation.
Reduced-motion and unsupported browsers show the final text immediately.

Ordinary body copy, records, and page content must not adopt hidden-first
entrance states.
```

---

## 10.2 AGENTS.md — View Transition exception

原本：

```text
never introduce page transitions
```

修正為：

```text
Page-content transitions remain prohibited.

The main-navigation active pill is the sole allowed cross-document
named-element View Transition.

The page/root content must not fade, slide, morph, or otherwise animate
between routes.
```

---

## 10.3 README

README 目前關於：

```text
no client runtime script
no scroll reveal
```

的描述已落後現有 MotionRuntime。

更新成符合現況：

- primary pages 共用一個 audited lightweight motion runtime
- content remains readable without JS
- Home 有 opening enhancement
- selected headings / figures 可 finite reveal
- Research 有 tracked section orientation
- navigation pill transition 為 CSS progressive enhancement

不要把 README 寫成動畫技術文件，只需修正事實。

---

## 10.4 Motion documentation

更新：

```text
docs/motion-identity-review.md
```

記錄：

- Home line reveal
- active nav pill
- moving pill
- reduced motion
- View Transition fallback
- browser QA result
- font optimization result

---

# 11. CSS / Runtime Budget

維持既有 philosophy：

- 不新增 animation dependency
- 不新增 continuous scroll handler
- 不新增 `requestAnimationFrame` loop
- 不新增 permanent `will-change`
- 不增加 unnecessary IntersectionObserver

Opening Text Reveal：

CSS only。

Moving Pill：

CSS only。

SectionIndex：

只能重用目前 Research observer。

不要因為這次工作再新增另一套 scroll observer。

---

# 12. `scripts/check-build.mjs` 更新要求

不要放寬既有安全檢查。

只加入必要的新 contract。

---

## 12.1 Home

繼續確認：

```text
From perception,
to reasoning,
to practice.
```

順序及英文文案不變。

可新增 assertion：

Home production CSS / HTML 具有預期 prologue structure。

不要要求 hidden initial class 出現在 HTML。

---

## 12.2 Navigation

每個 primary page：

必須只有：

```text
1 × aria-current="page"
1 × nav-active-pill
```

Active pill：

```text
aria-hidden="true"
```

Navigation link order保持：

```text
Home
Research
Experience
About
```

---

## 12.3 Motion

仍只批准原本：

```text
editorial-enter
```

keyframe。

Text Reveal 不得增加另一個 keyframe。

---

## 12.4 Evidence

Home production output：

應包含三組 evidence content。

繁中頁也應出現對應 translation。

---

## 12.5 Fonts

三個 expected filenames 不變。

繼續檢查 WOFF2 signature。

可以額外記錄 / assert：

```text
total font bytes < original total
```

但 40% reduction 建議在 QA script / documentation 驗證，不需要把過度脆弱的 exact size 寫死。

---

# 13. Responsive Requirements

至少驗收：

```text
320px
390px
768px
1024px
1280px
1440px
```

---

## Navigation

320 / 390：

- 不得 horizontal overflow
- 不用 hamburger
- 不用 horizontal scroll
- 必要時允許 natural wrap
- pill 不得遮文字
- pill 不得 collision language switch

---

## Opening

320 / 390：

- 三行仍然 readable
- blur reveal 不影響 line wrapping
- 200% text 時 opening 若高於 viewport，仍可正常捲動閱讀
- 不因 animation 強制跳過 oversized content

---

## Evidence

長 method line：

自然換行。

不得為了單行顯示而縮小到不可讀尺寸。

---

# 14. Accessibility Acceptance Criteria

必須保留：

- single h1 per page
- skip link
- semantic main/nav/footer
- native anchors
- `aria-current="page"`
- Research `aria-current="location"`
- native details/summary
- visible focus
- logical heading hierarchy
- alt text
- publication language attributes

新增 pill：

decorative span `aria-hidden`.

新增 evidence：

正常可讀文字，不使用 tooltip-only information。

---

## Keyboard

驗證：

```text
Tab
Shift+Tab
Enter
Space where applicable
ArrowDown / PageDown / Space on Home opening
```

Current navigation 必須有清楚 focus state。

---

# 15. Reduced-Motion Acceptance

`prefers-reduced-motion: reduce`：

### Home

三行立即完整顯示。

### Nav

static active pill，沒有 glide。

### Existing reveal

維持現行 reduced-motion policy。

### Concept figures

維持現行 behavior。

---

# 16. Browser QA

完成後至少驗收：

- Chromium
- Firefox
- WebKit

核心 matrix：

```text
Home
Research
Experience
About

× EN / zh-Hant
× 390 / 1280
× normal motion / reduced motion
```

另外補：

- 320px
- 768px
- 1440px
- no JS
- 200% text
- deep link
- reload
- back/forward
- font failure

---

# 17. Moving Pill 專項 QA

至少測：

```text
Home → Research
Research → Experience
Experience → About
About → Home
```

以及反方向。

確認：

- active pill 正確
- only pill moves
- no root crossfade
- link works before/without animation
- browser unsupported fallback正常
- reduced motion直接切換
- back / forward current item 正確

Language switch：

EN ↔ zh-Hant 不得壞掉。

若 browser 讓 pill 因翻譯寬度略微 resize，是可接受的；不要為此加入 JavaScript special case。

---

# 18. Text Reveal 專項 QA

確認：

- first load 有 reveal
- 約 1 秒 settled
- line stagger 約 160ms
- 不 autoplay loop
- 不 replay
- 不因 scroll back top 再出現 opening
- immediate wheel/swipe 可以離開
- reduced motion immediate
- unsupported fallback immediate
- no layout shift
- no horizontal overflow

---

# 19. Performance Acceptance

在 font optimization 前後各跑一次 Lighthouse mobile。

至少紀錄：

```text
Performance
Accessibility
Best Practices
SEO
LCP
CLS
TBT
```

主要目標：

- 不讓新 motion 增加 TBT
- TBT 應維持接近 0
- CLS 不明顯惡化
- LCP 不因 animation/runtime 增加而惡化
- font transferred bytes 明顯下降

不要以單次 Lighthouse score 小幅波動作為 regression 的唯一判斷。

---

# 20. Explicit Non-goals

本任務禁止順手加入：

- dark mode
- new palette
- glass navigation
- hamburger
- floating dock
- card grid
- Bento
- badges/chips
- command palette
- modal
- carousel
- scroll progress
- parallax
- cursor follower
- text scramble
- marquee
- background shader
- new icons
- page-content transition
- SPA navigation
- new images
- copy rewrite
- research content rewrite
- new routes

---

# 21. Expected Files

預期可能修改：

```text
AGENTS.md
README.md

src/layouts/Layout.astro

src/components/editorial/PageHeading.astro
src/components/editorial/SectionIndex.astro        [new]

src/components/pages/HomePage.astro
src/components/pages/ResearchPage.astro
src/components/pages/ExperiencePage.astro
src/components/pages/AboutPage.astro

src/styles/global.css
src/styles/editorial.css
src/styles/motion.css

src/scripts/motion.ts

src/data/research.ts
src/data/engineering.ts
src/data/types.ts

scripts/check-build.mjs

docs/motion-identity-review.md

public/fonts/SourceSans3-Regular.woff2
public/fonts/SourceSans3-Semibold.woff2
public/fonts/SourceSerif4-Regular.woff2
```

不代表每一個都必須修改。

如果不需要，不要製造 unnecessary diff。

---

# 22. Files That Should Normally NOT Change

除非實際 build defect 必須修正：

```text
astro.config.mjs
package.json
package-lock.json

publication factual data
roles factual data
recognition factual data
learning factual data
site metadata wording
GitHub Actions deployment architecture
```

---

# 23. Mandatory Build Checks

完成所有修改後執行：

```bash
npm ci
npm run check
npm run build
node scripts/check-build.mjs
```

如果本地既有 dependencies 已可信，可開發期間不必重跑 `npm ci`；但 final isolated verification 應依 repo 原本流程執行。

全部必須通過。

---

# 24. Definition of Done

任務只有在以下全部成立時才算完成：

### Opening
- line-by-line Text Reveal 正常
- 160ms stagger
- 約 1 秒完成
- interaction 不被阻擋
- reduced motion正常

### Navigation
- active underline 已被 pill 取代
- static pill 正確
- supported browser 能 glide
- unsupported browser正常 fallback
- page body 完全不 transition

### Design system
- Research 使用 PageHeading
- 三頁使用 SectionIndex
- motion runtime 不依賴 `.theme-index`
- record patterns已有 shared CSS primitive
- visual regression minimal

### Evidence
- 三個 Home selected work 具有指定 evidence metadata
- EN / zh 正確
- evidence 來自 existing methods
- data invariant 可偵測不一致

### Fonts
- glyph coverage完整
- published payload ideally ≥40% reduction
- 若不能安全達成則保留原字型
- Lighthouse / layout 不 regression

### Quality
- check pass
- build pass
- check-build pass
- Chromium / Firefox / WebKit pass
- 320px 無 overflow
- keyboard pass
- reduced motion pass
- no-JS pass
- deep links pass
- back/forward pass

---

# 25. Implementation Philosophy for Codex

不要重新設計。

不要先問使用者 routine implementation decisions。

本規格中已指定的項目直接實作。

只有遇到以下情況才停止並提出問題：

1. 規格與瀏覽器實際行為互相矛盾，且無 progressive-enhancement fallback 可解。
2. 必須新增 production dependency 才能完成。
3. 必須修改研究／經歷 factual content。
4. 必須破壞既有 accessibility contract。
5. Font subsetting 無法保留必要 glyph coverage。
6. 實際 production output 與此規格假設存在重大不一致。

小型 CSS 數值調整、class naming、component internal structure、temporary test tooling 都由工程師自行判斷，不需要重新詢問。

最終交付時請提供：

- modified files summary
- implementation summary for five requirements
- any deviation from this spec
- check/build results
- browser QA results
- before/after font byte count
- Lighthouse before/after summary
- screenshots or visual QA evidence for Home desktop/mobile and navigation pill states