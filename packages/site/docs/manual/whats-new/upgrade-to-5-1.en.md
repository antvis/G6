---
title: Upgrade from 5.0 to 5.1 (Layout)
order: 7
---

This page focuses on layout documentation changes introduced in G6 `5.1`. Starting from `5.1`, layout pages prioritize the field naming aligned with `@antv/layout`; common `5.0` layout writeups are collected here for migration reference.

## What Changed

- Since `5.1`, layout docs prioritize shared `@antv/layout` fields such as `width`, `height`, `center`, `enableWorker`, `node`, and `edge`
- Individual layout pages mainly keep the recommended `5.1` writeup
- If you are migrating an existing `5.0` project, use this page to map old field names to the new documentation style

## D3Force: center force to shortcut fields

In `5.0` documentation, the center force was commonly written inside `center`:

```typescript
{
  layout: {
    type: 'd3-force',
    center: {
      x: 250,
      y: 150,
      strength: 0.8,
    },
  },
}
```

In `5.1` documentation, the recommended form is the shortcut fields:

```typescript
{
  layout: {
    type: 'd3-force',
    centerX: 250,
    centerY: 150,
    centerStrength: 0.8,
  },
}
```

- `center.x` maps to `centerX`
- `center.y` maps to `centerY`
- `center.strength` maps to `centerStrength`

For the full field description, see [D3Force Layout](/en/manual/layout/d3-force-layout).

## ComboCombined: innerLayout / outerLayout to layout

In `5.0` documentation, the inner combo layout and the outer layout were commonly configured separately:

```typescript
import { ConcentricLayout, ForceLayout } from '@antv/layout';

{
  layout: {
    type: 'combo-combined',
    innerLayout: new ConcentricLayout({
      sortBy: 'id',
    }),
    outerLayout: new ForceLayout({
      gravity: 1,
    }),
  },
}
```

In `5.1` documentation, the recommended form is a single `layout` entry that returns different configurations for different levels based on `comboId`:

```typescript
{
  layout: {
    type: 'combo-combined',
    layout: (comboId) =>
      comboId
        ? { type: 'concentric', sortBy: 'id' }
        : { type: 'force', gravity: 1 },
  },
}
```

- When `comboId` has a value, it refers to the layout inside a combo
- When `comboId` is empty, it refers to the outermost layout
- Multiple layout choices are unified under the `layout` entry

For the `5.1` recommended form, see [ComboCombined Layout](/en/manual/layout/combo-combined-layout).

## Migration Suggestion

1. Identify the matching layout type from your existing `5.0` project
2. Map the old fields to the recommended `5.1` documentation style
3. Return to the specific layout page to verify shared fields and defaults
