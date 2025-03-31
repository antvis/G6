---
title: FocusElement
---

## Overview

FocusElement is a built-in interaction in G6 that enables focusing elements by centering them in the viewport when clicked. This interaction helps users quickly locate and focus on specific graph elements.

## Use Cases

- Quickly centering nodes or edges of interest

## Live Demo

<embed src="@/common/api/behaviors/focus-element.md"></embed>

## Basic Usage

Add this interaction to the graph configuration:

**1. Quick Configuration (Static)**

Use string form for direct declaration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['focus-element'],
});
```

**2. Object Configuration (Recommended)**

Use object form for configuration with custom parameters:

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

## Options

| Option    | Description                                               | Type                                                            | Default                                | Required |
| --------- | --------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------- | -------- |
| type      | Behavior type                                             | string                                                          | `focus-element`                        | ✓        |
| animation | Focus animation settings                                  | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | `{ duration: 500, easing: 'ease-in' }` |          |
| enable    | Whether to enable the function of focusing on the element | boolean \| ((event: IElementEvent) => boolean)                  | true                                   |          |

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

### Basic Focus Functionality

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

### Conditional Focus Enable

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      enable: (event) => {
        // Only enable focus for nodes, not edges
        return event.target.type === 'node';
      },
    },
  ],
});
```

## Live Example

<Playground path="behavior/focus/demo/basic.js" rid="focus-element"></Playground>

## API

### FocusElement.destroy()

```typescript
destroy(): void;
```
