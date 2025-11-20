---
title: FocusElement
order: 10
---

## Overview

FocusElement is a built-in behavior in G6 used to implement the element focusing feature, allowing elements to be focused to the center of the view by clicking on them. This behavior helps users quickly locate and focus on specific graph elements.

## Use Cases

- Quickly center the focused nodes or edges in the display

## Online Experience

<embed src="@/common/api/behaviors/focus-element.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['focus-element'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      animation: {
        duration: 500,
        easing: 'ease-in',
      },
    },
  ],
});
```

## Configuration Options

| Option    | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                                            | Default                                | Required |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------- | -------- |
| type      | Behavior type name                                                                                                                                                                                                                                                                                                                                                          | string                                                          | `focus-element`                        | ✓        |
| animation | Focus animation settings                                                                                                                                                                                                                                                                                                                                                    | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | `{ duration: 500, easing: 'ease-in' }` |          |
| enable    | Whether to enable the focus feature                                                                                                                                                                                                                                                                                                                                         | boolean \| ((event: IElementEvent) => boolean)                  | true                                   |          |
| trigger   | Press this shortcut key in combination with mouse perform foucs element **Key reference:** _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_. If set to an **empty array**, it means drag element can be performed with mouse without pressing other keys <br/> | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]        | [`shift`]                              |          |

### ViewportAnimationEffectTiming

```typescript
type ViewportAnimationEffectTiming =
  | boolean // true to enable default animation, false to disable animation
  | {
      easing?: string; // Animation easing function: 'ease-in-out', 'ease-in', 'ease-out', 'linear'
      duration?: number; // Animation duration (milliseconds)
    };
```

## Code Examples

### Basic Focus Feature

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['focus-element'],
});
```

### Custom Animation Effects

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      animation: {
        duration: 800,
        easing: 'ease-in-out',
      },
    },
  ],
});
```

### Conditional Focus Enablement

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      enable: (event) => {
        // Enable focus only for nodes, not edges
        return event.target.type === 'node';
      },
    },
  ],
});
```

## Practical Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 110, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 190, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 150, y: 260 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  node: {
    style: { labelText: (d) => d.id },
  },
  data,
  behaviors: ['collapse-expand', 'focus-element'],
});

graph.render();
```
