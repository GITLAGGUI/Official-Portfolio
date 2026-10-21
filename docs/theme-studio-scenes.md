# Theme studio scenes

The original user-supplied photos remain photographic. Modeled Three.js objects and the whole Home ambient canvas change with the selected theme. Studio Dark is the default; saved choices remain respected. Light is variant07 after the default.

| Appearance | Original photo | 3D setting | Whole landing motion |
| --- | --- | --- | --- |
| Studio Dark (default) | Existing warm studio portrait | Warm desk lamp, books, optical aperture | Warm dust and soft lamp glow |
| 01 Dracula | Purple studio | Beveled crescent moon, glass crystal and orbital details | Stars and aurora-like paths |
| 02 GitHub Dark | Black/green studio | Commit-like data paths, traveling signal and terminal forms | Green traces and grid |
| 03 Monokai | Yellow studio | Mechanical keycap sculpture and audio waveform | Rising amber sparks |
| 04 VS Code | Blue studio | Layered architectural frames and code chevrons | Blue paths and diagonal grid |
| 05 Rosé Pine | Warm pink studio | Paper color studies and rose glass | Drifting petal forms and ribbons |
| 06 Nord | Cool gray/blue studio | Layered mountain ridges and frosted prism | Wind paths and snow |
| 07 Light | White daylight studio | Ceramic ribbon and modeled plant | Sunbeams and daylight motes |

Seven supplied PNGs were encoded to960px WebP, preserving their content. Sources are not altered with generated facial features. The earlier generated avatar was discarded from the implementation after the user clarified the direction; it is not referenced or shipped.

No product dependency was added. Procedural softbox environment reflections support the metal/glass, and demand rendering stops the scene when paused/reduced-motion/offscreen. The ambient canvas is mounted on the entire Home editor pane, independent of the portrait area, and is capped at30fps. Other page backgrounds are unchanged. Theme photos also appear in the sidebar, About and the picker.

Code: src/components/HeroScene.tsx, SceneDecor.tsx, LandingBackdrop.tsx, src/portrait-studio.css and src/data/themes.ts. Images: public/assets/profile/themes/. Unsupported WebGL shows the real photo instead of an empty hero.

Verification: TypeScript/Vite build, lint and portfolio tests pass. Asset checks include all8 unique portrait references, defaultStudio and Light variant07; earlier LeadMaps/video separation assertions remain intact. CUA reported Local browser use is disabled in Work settings even for the requested Codex IAB, so no new rendered visual check or motion screenshot is claimed.

## Copy, assistant and performance follow-up

Home now reads "I turn ambitious ideas. Into real-world solutions." About introduces Joel as a computer scientist who builds, followed by factual work areas and recent LeadMaps/RiceGuardAI projects.

Joel Assistant uses a casual, direct Gen Z tone, brief answers and optional playful emoji. Harmless jokes/small talk are allowed, followed by a natural portfolio bridge. It receives at most6 recent conversation turns, limited to user/assistant roles and1000characters each; trusted system context remains separate. The output budget is220tokens. The UI and offline fallback use concise wording and current Services/Tools links.

The picker uses320px previews instead of full portraits:121,222bytes across eight images versus647,324bytes for full portraits, an81.3% asset-byte reduction. Sidebar avatars total55,832bytes. This is an image-size comparison, not a measured page-load improvement. WebGL is capped at1.25DPR on coarse-pointer devices/1.5otherwise, and drops to1DPR after sustained slow frames. Background drawing caps at30fps with34 mobile or58desktop particles. Three.js remains lazy-loaded; compositor transforms/opacity, hidden-tab/offscreen pause and reduced motion are preserved. Font CSS is requested in parallel with preconnected font origins instead of a nested CSS import.

Tests include bounded assistant conversation, dropped system/tool history roles, length/input/error handling and prompt/output budget. Existing deployment credentials remain server-side. Actual FPS, mobile interaction and Lighthouse results are not available while browser automation is disabled; no performance score is claimed.
