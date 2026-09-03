# Product design QA

## Source and implementation

- Selected visual: `C:\Users\jenal\.codex\generated_images\01a05a8f-2f1f-73e0-b758-c158edf1587d\exec-3395311c-085c-4959-bb85-3ce90af1bb65.png`
- Desktop implementation: `C:\Users\jenal\Update_Portfolio\Official-Portfolio\qa\home-reference-size-final.png`
- Combined comparison: `C:\Users\jenal\Update_Portfolio\Official-Portfolio\qa\design-comparison-final.png`
- Mobile implementation: `C:\Users\jenal\Update_Portfolio\Official-Portfolio\qa\home-selected-mobile.png`
- Project gallery desktop: `C:\Users\jenal\Update_Portfolio\Official-Portfolio\qa\projects-rest-desktop.png`
- Project gallery mobile: `C:\Users\jenal\Update_Portfolio\Official-Portfolio\qa\projects-mobile.png`
- Face Guard case study: `C:\Users\jenal\Update_Portfolio\Official-Portfolio\qa\face-guard-case-study.png`

## Viewports and states

- Desktop: 1506 x 1045 reference-size comparison plus 1536 x 823 one-screen validation, initial loader, settled home, animated-grid phase 1 and phase 2, project gallery, assistant open, contact form, and Face Guard case study.
- Mobile: 390 x 844, settled home, image-first project gallery, and About profile.
- Motion: the grid interpolates through red, blue, yellow, teal, and violet on two-second phases; only the blue connection pulses move through the network. Reduced-motion and lower-power/mobile conditions receive a static WebP fallback.

## Comparison history

1. The selected direction established the required surfaces: VS Code shell, readable introduction, five code inputs, two automation hubs, three outcome nodes, blue connection pulses, and a quiet dark grid.
2. The first implementation matched the hierarchy but mobile project cards depended on a hover-capability query, so a narrow desktop emulation hid their titles.
3. Added the same compact title/meta reveal under the 720px breakpoint. The 390px recheck now shows the project image, category, year, and title without requiring hover.
4. Expanded the grid and network across the full editor, moved the five inputs, two real n8n hubs, and three outputs to match the selected composition, and kept the hero plus Terminal inside one viewport.
5. Replaced the certificates list with an image-first Certificates & Gallery grid. All five supplied event images load at their optimized 1170px source size; certificate copy appears only on hover or keyboard focus and gallery images remain text-free.

## Required fidelity surfaces

- PASS: VS Code shell, navigation, tabs, explorer, terminal, and status bar remain intact.
- PASS: Hero hierarchy and spacing match the selected direction while keeping plain-language copy for non-technical visitors.
- PASS: Real TypeScript, React/TSX, JSON, Markdown, and Python icons are visually distinct.
- PASS: Static 3D-styled nodes retain their positions while blue pulses travel through the connectors.
- PASS: Home document height equals viewport height at 1536 x 823 and 390 x 844; the editor does not retain a stale scroll position and the Terminal remains visible.
- PASS: Grid color and intensity change smoothly without layout or paint churn in the React tree.
- PASS: Project cards are image-first at rest; desktop hover/focus reveals transparent, text-shadowed story content, and mobile has an always-readable compact state.
- PASS: No horizontal overflow at 1536px or 390px.
- PASS: Initial load is masked by a branded progress animation and the Three.js scene remains code-split.
- PASS: Authentic Face Guard interface/training captures, profile photo, n8n workflow, RiceGuard inference, OpenClaw overview, property audit, ABSA evidence, and YouTube channel imagery are used.
- PASS: ATS resume exports as one page, uses black text only, shows three years of experience, and preserves selectable text and standard section headings.

## 2026-09-03 revision

- Compared the user-supplied full editor reference and previous Skills screenshot against the new implementation in `qa/comparison-2026-09-03.jpg`. The intentional differences are the full-width grid behind the introduction, deeper suspended nodes, a visible terminal, and language-led Skills rows instead of the former four large tiles.
- The full editor grid now uses a lightweight 24-fps 2D canvas and smoothly transitions through red, blue, green, yellow, and violet in two-second phases. The blue 3D connection pulses remain independent. Mobile keeps the animated grid without loading Three.js; reduced-motion keeps a static view.
- Fixed a first-frame negative-timestamp edge case found during browser QA. The grid no longer stops on its first frame.
- At 1536 x 823, 1280 x 720, and 390 x 844, the home fits one viewport and the terminal remains visible. Returning from scrolled About/Skills to Home resets the editor to zero. Lazy-route hash targets now resolve after their content mounts.
- Skills retain four categories and distinguish programming languages from tools/platforms. Checked the desktop row layout and single-column 390px layout without horizontal overflow.
- Added the actual TRON PDF page 9 team-leader certificate and page 14 third-place team certificate. All 13 certificate/gallery entries remain present. Certificate previews use contain sizing so the document is not cropped.
- Every project detail now has one deduplicated images-only gallery, before the story. No image captions, “Screens and workflow” heading, evidence helper copy, or “Honest boundary” panel remains. Orphan images span the row.
- Corrected the stale EmailJS template ID/public key. A real form test exposed `Gmail_API: Invalid grant`; reconnected the same `Portfolio_Contact` Gmail account and verified a successful retry: UI “Message sent” plus EmailJS history `OK` at 13:36 on 2026-09-03. The separate Maria Lourdes service and shared template were not edited.
- Assistant text renders safe bold, italics, paragraphs, and lists, with HTML escaped. Client timeout now allows the server request to finish.
- `npm test`: six Markdown checks, 19 unique projects, 23 existing image references, legacy routes, and both TRON assets passed. ESLint and the production build passed.

Evidence: `qa/home-full-grid-2026-09-03.png`, `qa/home-grid-phase-b-2026-09-03.png`, `qa/home-mobile-2026-09-03.png`, `qa/skills-2026-09-03.png`, `qa/skills-mobile-2026-09-03.png`, `qa/certificates-2026-09-03.png`, `qa/project-gallery-2026-09-03.png`, `qa/contact-success-2026-09-03.png`.

No unresolved P0/P1/P2 local UI findings. Production commit `84b4701` reached Vercel Ready and the live domain served the new bundle. The live assistant rendered three semantic bold labels and a bullet list, correctly returned three years of experience, and redirected an off-topic dinner question back to Joel's work. No browser console errors were recorded. A final send directly from the live contact page succeeded, with EmailJS history `OK` at 13:49 on 2026-09-03. Screenshots: `qa/assistant-live-2026-09-03.png` and `qa/contact-live-success-2026-09-03.png`.

final result: passed
