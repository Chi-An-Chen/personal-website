## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# Personal Website Project

## Mission

Build a premium, person-centered, multi-page web résumé for Chi-An Chen.
The primary purpose is to introduce the person, education, experience, and
capabilities. Research and engineering work support this biography; public
repositories do not determine what belongs on the site.

The approved primary architecture is Home (/), Research (/research/),
Experience (/experience/), and About (/about/), all using the editorial system.
Keep static, noindex compatibility pages for /education/, /skills/, /honors/,
and /certifications/ with readable links to their migrated sections. Preserve
publication and role anchors. Home centers the person and selected work; GitHub
is a secondary profile link, not the hero's organizing principle.

Position the person as AI research & engineering, with agricultural VLM first,
collaborative reasoning and verification second, and CV / engineering extensions.
Speech research is excluded. The 2026-10-03 approved portfolio pass supersedes the Phase 1 visual freeze. The user subsequently restored the separate black Scroll down opening; the personal introduction stays light. Preserve factual records and stable anchors; the first-pass design and QA are recorded in docs/portfolio-review.md. The approved second pass is recorded in docs/accomplishment-review.md: Home summarizes research output, personal contributions, named team recognition, engineering delivery, and credentials; detailed interactive illustrations belong on Research and Experience. Website copy is maintained in English and Traditional Chinese; design explanations
use Traditional Chinese. English remains the default at existing URLs; the four
Chinese pages live under /zh/. Use shared page components and build-time translations,
with no client language detection or runtime translation service. Missing Chinese
translations must fail the build. Keep original publication, model, and credential
names, stable anchors, and a single source for factual records.


## Primary Design Direction

Use `docs/design-guidance.md` as the project design brief.
The direction below is a starting preference, not a fixed visual specification.
There is no required reference site, palette, font, layout, or section count.
Choose an appropriate direction from the selected content and explain the choice.
Apply the installed design skills only within the scope defined below.

Starting preferences:

- Apple-inspired editorial minimalism
- premium and restrained
- generous negative space
- typography-led design
- strong visual hierarchy
- calm visual language
- subtle depth
- highly intentional composition
- sophisticated motion
- research / engineering identity

Apple is a design-philosophy reference only.
Do not clone Apple's website, layouts, assets, or branding.

## Design Skill Scope and Conflict Resolution

The user's instructions and this project's content, accessibility, and technical
constraints take precedence over conflicting third-party design-skill defaults.
The skills are tools for judgment, not cumulative requirements to satisfy at once.
Keep third-party SKILL.md files intact; record project-specific adaptations here.

- `high-end-visual-design` (installed from `soft-skill`): use typography,
  composition, spacing, hierarchy, and restrained depth as guidance. Do not
  require Double-Bezel containers, pill buttons, glass navigation, badge labels,
  large radii, or entrance animations on every element. Do not assume a paid
  font is available, and do not ban readable system or CJK fallback fonts.
- `gpt-taste`: use as a secondary review of readable headings, contrast, rhythm,
  and purposeful layout variation. Do not enforce AIDA, pricing, testimonials,
  Bento grids, React, Tailwind, GSAP, continuous motion, or randomized layouts.
  Never present simulated Python output as an actual execution or validation.
  Heading line counts are design guidance, not a reason to shrink mobile text.
- `image-to-code`: use for visual concepts and design-to-code comparison when
  that helps the current phase. Image generation, image counts, signature
  component counts, and motion counts are not mandatory. A clear written brief
  or a small prototype is also valid. Generated images can guide composition,
  but cannot establish personal facts, research metrics, or project evidence.
  Do not implement the site merely because the skill includes a coding step.

When a skill conflicts with these limits, apply the useful parts and continue
without requesting permission for routine design choices. If a local skill is
unavailable in another checkout, use this file and the design brief as fallback.

## Anti-Template Preferences

Avoid:

- generic portfolio templates
- SaaS landing-page aesthetics
- card grids as the default layout
- excessive rounded rectangles
- bento-grid overload
- gradients everywhere
- glowing blobs
- excessive glassmorphism
- skill badge clouds
- pill-shaped elements everywhere
- generic "Hi, I'm..." hero layouts that obscure personal background; natural
  self-introductions, the person's name, and real portraits are welcome
- unnecessary icons
- decorative UI without purpose
- visual effects simply for showing off

Content itself should often become the layout.

## Motion

Motion must be restrained and content-driven.

The 2026-10-03 clarification preserves the original, normal-flow black Home
opening: “From perception, to reasoning, to practice.” and a native Scroll down
link. The personal introduction below stays light and concise. Never turn the
biography into a black hero or remove the separate opening without a new request.
Opening phrases may use a finite 2.4-second visible-time entrance: 1100ms duration,
300/800/1300ms delays, 16px rise, and readable opacity .48 to 1. Start after fonts
are ready and the tab is visible; pause in hidden tabs, resume without restarting,
and settle on focus, anchors, navigation, reduced motion and print. No CSS-only
starting-style entrance may consume this sequence in a background tab. No-JS and
unsupported browsers show the final statement immediately. Never block navigation
or auto-enter on a timer. Keep the original single downward gesture enhancement,
oversized-text fallback, native scrolling, optional per-tab first-entry check,
revisit/reload/history skip, and removal of the offscreen spent opening without
shifting visible content. Internal Home links retain #site-header.

Three native radio-controlled concept illustrations on Research (VLM, reasoning) and Experience (retrieval) explain selected work through
interruptible CSS transitions. They must work with keyboard, touch, reduced motion
and no JavaScript. Label them as conceptual; never imply measured model outputs
or unpublished performance.

Primary pages may opt selected heading clusters and concept figures into the
shared `MotionRuntime.astro` / `src/scripts/motion.ts` enhancement. HTML and base
CSS must remain visible. Start finite, reveal-once animations only on entry;
never introduce an unrevealed hidden state for ordinary body copy, records, or
page content, scroll-dependent scaling, scrubbed text, parallax, or pinned
content. Page-content transitions remain prohibited. The main-navigation active
pill is the sole animated cross-document View Transition element. Static named
navigation-label snapshots may keep text above the transition overlay; they
must not move or fade. The page/root content must not fade, slide, morph, or
otherwise animate between routes. Ordinary body copy and records remain stable. Settle motion on focus, anchors, history restoration,
reduced motion, and print. Keep CSS figure inspection available without JS.

Research alone enhances its existing native theme index with desktop sticky
orientation, contained by the three themes. Mobile, short viewports, and no-JS
use the normal-flow index. Preserve native links, focus and details/summary.
No animation dependencies, continuous scroll handlers, or permanent will-change.
Keep the combined head check and shared runtime below 4 KiB gzip, shared motion CSS and added Home CSS each below 3 KiB gzip, and their combined source below 4 KiB gzip; validate
the exact runtime/keyframes in the build check. Compatibility pages and 404 stay
script-free. See `docs/portfolio-review.md` for current implementation and QA; `docs/motion-identity-review.md` is historical.

## Technical Direction

- Astro
- TypeScript
- semantic HTML
- CSS-first
- minimal client-side JavaScript
- responsive
- accessible
- static-first
- GitHub Pages compatible
- performance-conscious

Do not add frameworks or dependencies without a concrete need.

## Project Sources and Editorial Selection

`docs/redesign-plan.md`, `docs/redesign-content-supplement.md`, and the approved
`docs/phase1-review.md` establish the editorial baseline.
`docs/deployment-readiness.md` records the final integration and QA status.
`reference_data/` is local-only source material, including résumés, LinkedIn
exports, photographs, certificates, awards, and personal profile links.
`reference_data/web.txt` is a source list, not an approved visual-reference list.

User-provided résumés, LinkedIn exports, certificates, and direct statements are
valid editorial evidence. A public repository or public source URL is not a
prerequisite. Describe publishable roles, tasks, methods, and capabilities even
when code, research, or project details are private. Never request public code
as a condition of inclusion, access private repositories, or infer unprovided
work details. Missing optional details should narrow a claim, not erase an
otherwise supported education or experience record.

Compare start/end dates and current-status claims item by item across sources.
Do not mechanically copy Present from an older résumé. Do not use the old
undergraduate résumé as the current identity. Preserve distinctions between
published, accepted, under review, and research topics. Keep numerical claims
within their supported scope; omit unnecessary metrics rather than inventing
conditions. A provided role can be shown without a speculative task description.

Merge duplicate scans and multiple proofs of the same event. Distinguish
professional credentials, course completion, participation, paper publication,
and awards. Keep team and individual recognition distinct. Do not count an
exam score report plus its certificate as separate achievements, or a school
recognition plus the original competition award as two wins.

Use Chi-An Chen as the English display name. Chinese pages display 陳麒安 with
Chi-An Chen as a secondary name. Preserve author names as supplied in the
chosen publication source. English editorial translations must not replace
original publication titles or imply an official translation. Source locations,
private details, discrepancies, and pending confirmations belong in work/.
Public copy should read as a natural résumé, without audit boilerplate such as
runtime-verification or repository-ownership disclaimers.

Use only real supplied photos of the person. Do not generate replacement faces,
change facial features, or infer professional qualities from travel photos.
Choose images intentionally and preserve the originals. Do not publish original
certificates, IDs, addresses, telephone numbers, full source PDFs, or raw exports
as website attachments. Only curated public copy and intentional website assets
may eventually enter src/ or public/. The site must build without local sources.

The previous repo-led A/B/C exploration is historical and superseded in content
and recommendation. Preserve its images; a new direction may reuse suitable
color or typography without inheriting that homepage structure.

## Version Control

Track website source, intentional public assets, project configuration,
package-manager lockfiles, project rules, and concise design documentation.
Project-local skill definitions and `skills-lock.json` may be tracked to retain
the design workflow; they must not be required by the website build.

Keep `reference_data/`, PDFs, local scratch work, credentials, dependencies,
and build output out of Git using `.gitignore`. Ignoring a file does not remove
an already tracked file: inspect the index before claiming it is excluded.
Do not delete local references as part of this policy or publish them elsewhere.

## Workflow

Continue from the approved 2026-10-03 portfolio direction. Earlier aesthetic decisions are historical; preserve factual and technical constraints.

For any future substantial visual changes:

1. inspect selected content and available references
2. establish visual direction
3. explain the proposed design system
4. prototype
5. inspect the result
6. refine
7. only then expand the implementation

Use the installed frontend design skills when relevant.
