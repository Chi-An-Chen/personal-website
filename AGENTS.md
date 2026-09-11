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

Build a premium personal portfolio for Chi-An Chen.

The website should communicate three identities:

1. AI / Computer Vision researcher
2. Engineer
3. Someone with strong visual and product taste

The result must feel intentionally designed, not generated from a
generic portfolio template.

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
- generic "Hi, I'm..." hero layouts
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

`docs/design-guidance.md` contains public profile links, optional reference
websites, and adaptable design principles.

`reference_data/web.txt` contains personal profile links, not an approved list
of visual references. The entire `reference_data/` directory is local-only.

PDFs in `reference_data/`, including `簡歷_陳麒安_0514.pdf`, are optional source
material for website creation. They are not a specification, a required section
list, or proof that every time-sensitive statement is still current.

Select only content that supports the website's research and engineering story.
It is acceptable to omit GPA, certificates, older awards, contact details,
minor projects, and any other material that is irrelevant, dated, or weakly
supported. Do not reproduce the full resume or require the user to update all
PDFs before proceeding. Missing optional facts should not block design work.

Use supported facts faithfully when selected. Preserve distinctions between
published, accepted, under review, and ongoing work. For an unverified current
status, omit the claim or mark it for confirmation rather than inventing an
update. Keep numerical claims tied to their source and original scope.

Use Chi-An Chen as the working display name from this brief; retain Chi-An Chen
when matching publication author names. The working audience is research and
engineering collaborators and potential employers. These are editable defaults,
not reasons to interrupt progress. Choose a coherent initial language from the
selected content and state the assumption; bilingual routing is not required.

Only curated, intended-for-publication text and website assets belong in the
site. Never copy whole source PDFs, raw contact data, or reference directories
into `public/`, `src/`, generated site output, or public documentation.
The website must build without the local reference directory or PDFs.

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
