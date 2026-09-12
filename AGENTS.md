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

Plan seven distinct site pages: Home (/), Education (/education/), Experience
(/experience/), Skills (/skills/), Research (/research/), Honors (/honors/), and
Certifications (/certifications/). These are page routes, not a single page's
section anchors. Home centers the name, a real supplied photograph, a natural
introduction, education summary, and capabilities overview. Its primary actions
lead to internal pages. GitHub is an optional secondary/footer link; no repository
list belongs in the hero.

The site should communicate a computer vision / AI research background,
engineering capability, and considered visual taste through the person's actual
background. Use English website copy and Traditional Chinese design explanations.
The result must feel intentionally designed, not like a generic template.

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

Prefer:

- typography reveals
- smooth section transitions
- subtle scroll-linked movement
- restrained parallax
- image scaling
- sticky editorial storytelling
- carefully timed entrance transitions

Avoid excessive or continuous motion.
Keep essential content visible without animation or JavaScript. Respect
`prefers-reduced-motion`, keyboard navigation, visible focus, and readable
contrast. Static presentation is acceptable.

Use CSS first.
Introduce GSAP only when CSS is insufficient.

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

`docs/design-guidance.md` is the current editorial and visual brief.
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

Use Chi-An Chen as the display name; preserve author names as supplied in the
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

Do not jump directly from requirements to full implementation.

For substantial visual changes:

1. inspect selected content and available references
2. establish visual direction
3. explain the proposed design system
4. prototype
5. inspect the result
6. refine
7. only then expand the implementation

Use the installed frontend design skills when relevant.
