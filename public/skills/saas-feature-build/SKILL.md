---
name: saas-feature-build
description: "Implement a bounded feature in an existing web or SaaS application while preserving its stack and working flows."
---

# SaaS feature build

Trace the existing flow before editing: user action, route, server boundary, data operation and response. Query an available code map, then inspect the source it cites. Treat the map as navigation, not runtime proof.

Define the visible result and important failure cases. Reuse current components and data conventions. Prefer the smallest readable implementation that handles the complete flow.

Keep secrets server-side. Validate input at the boundary that uses it. Preserve workspace or account isolation. Model empty, loading, success and failure states in the interface, including a useful retry when appropriate.

For durable or repeated work, make ownership and idempotency explicit. Decide what happens after a timeout or restart; do not make a local browser counter stand in for shared server state.

Run relevant checks and exercise the feature from the browser through its API and persistence layer. Verify the resulting data and the user-visible response. Deliver the code and evidence, explaining any environment configuration still needed. A successful build does not establish a successful deployment or external integration.
