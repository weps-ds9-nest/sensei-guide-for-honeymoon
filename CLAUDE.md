# Project: Susi Ghiso Japan

## What This Project Is

This is a small React single-page guide my friends can use while in Japan on their honeymoon, in which I include my knowledge and suggestions. There are no limits besides this being a small project I need to set up within the next 4 hours, and it's going on Vercel with a simple login page (if necessary). The explicit limit I want to put is that it shouldn't be traceable by any crawler or any bot. It should be as private as possible.

## Lifecycle State

Implementation

<!-- Valid states: Brainstorm | Proposal | Spec Review | Implementation | Deployed | Paused | Done -->
<!-- Auto-transitions: /generate-proposal → Proposal | /create-specs → Spec Review | /implement-specs → Implementation | /deploy (confirmed success) → Deployed -->
<!-- Loop-back: Spec Review → Proposal (via /generate-proposal, if rework is needed before implementation) -->
<!-- Paused / Done are settable from any state and override the flow above -->

## Status

Building

<!-- Only meaningful when Lifecycle State is Implementation (Building | Refinement) or Deployed (Stable | Refinement) -->
<!-- Refinement = a spec change was accepted after this phase started; returns to Building/Stable on the next /implement-specs or /deploy run -->

## Active Agents

- Evolution agent — active
- Creation agent — inactive

## Current Spec

See `spec/current-state.md` for the latest synthesis.
Last version: v0 — no version checkpoint yet (project created 2026-10-31)

## Agent Rules

_No project-specific rules yet. Add constraints here as they emerge — e.g., "don't propose a version until X is resolved", "creation agent may only touch src/feature-x/"._

## Blocked On

_Nothing yet. Add blockers here that require human input before agents can proceed._

---

_Brain Version: 0.11_
