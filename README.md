# Composable UI System

A React and TypeScript component library that explores how small, reusable interface primitives can be composed into complete form workflows. Storybook is the primary documentation and review surface.

## What this project demonstrates

- Token-led visual decisions for color, typography, spacing, and shape
- Typed component APIs built with React and CSS Modules
- Searchable and filterable menu inputs rendered through portals
- Composed modal workflows with validation and responsive behavior
- Storybook documentation, controls, interaction testing, and accessibility checks

The Storybook sidebar retains the atomic hierarchy required by the original interview exercise: **Atoms, Elements, Mixtures, Compounds, and Organisms**.

## Run locally

```bash
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`.

## Quality checks

```bash
npm run lint
npm run build
npm run build-storybook
npm run test-storybook
```

## Project structure

```text
src/
  atoms/       Shared design tokens
  elements/    Focused interface primitives
  mixtures/    Components that combine multiple behaviors
  compounds/   Reusable interface patterns
  organisms/   Complete form workflows
  stories/     Portfolio introduction and supporting assets
```

Start with the **Introduction** story for project context, then move through the required atomic hierarchy and finish with the organism examples.
