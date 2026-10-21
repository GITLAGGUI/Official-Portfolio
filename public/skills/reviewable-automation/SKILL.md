---
name: reviewable-automation
description: "Design or repair a bounded automation with explicit triggers, idempotency, review points and observable outcomes."
---

# Reviewable automation

Map the real process before building a workflow: trigger, input, credentials, transformation, action, owner and failure path. Verify what each connected tool can actually do in the current environment.

Test read access and a representative input first. Keep credentials in private configuration rather than workflow exports or screenshots. Validate records before they reach an action that changes external state.

Give repeated work a stable identifier. Define duplicate handling, timeout behavior and the point where retries stop. Distinguish an accepted request from delivery, completion and the business outcome.

Preserve the user's authorized recipients, accounts and action scope. A workflow for drafting or review does not authorize automatic sending. Keep a meaningful review point before an external action when the task calls for it.

Exercise one successful path and a relevant failure or replay. Check logs and the destination state without exposing secrets. Deliver an editable workflow, required configuration names and a short operating handoff that explains how to recognize success or stop a failing run.
