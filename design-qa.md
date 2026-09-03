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

final result: passed
