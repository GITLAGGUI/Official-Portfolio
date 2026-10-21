---
name: spatial-product-motion
description: "Create a spatial product scene for an interactive website or a rendered product film, using actual product visuals."
---

# Spatial product motion

Choose the output first: a real-time web scene and a rendered film have different loading, interaction and timing needs. Inspect the product media and references. Preserve their actual branding and behavior.

Give the scene a coherent spatial arrangement: a focal product surface, supporting layers and enough separation to read their depth. Use perspective, thickness, lighting and occlusion intentionally. A shadow or tilt alone does not establish a complete scene.

For a web scene, fit the camera to the viewport, damp pointer movement and keep animation out of React state updates. Reuse geometry and textures. Pause continuous rendering when offscreen, hidden or explicitly paused. Provide a readable fallback if graphics are unavailable.

For a film, map the viewer's story to visible product actions before choosing camera paths. Keep related surfaces in a shared world; let the camera explain their relationship. Align motion and sound to the actual action. Use cuts when the brief calls for them.

Use genuine screenshots or supplied product footage for proof. Label conceptual UI as such. Check the first frame, the strongest transitions, small-screen legibility and the complete export. Deliver editable sources with the finished scene or film, and record dimensions, frame rate and any unverified behavior.
