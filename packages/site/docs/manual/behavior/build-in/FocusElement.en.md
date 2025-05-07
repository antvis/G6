---
title: FocusElement
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

| Option    | Description                         | Type                                                            | Default                                | Required |
| --------- | ----------------------------------- | --------------------------------------------------------------- | -------------------------------------- | -------- |
| type      | Behavior type name                  | string                                                          | `focus-element`                        | ✓        |
| animation | Focus animation settings            | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | `{ duration: 500, easing: 'ease-in' }` |          |
| enable    | Whether to enable the focus feature | boolean \| ((event: IElementEvent) => boolean)                  | true                                   |          |

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

<Playground path="behavior/focus/demo/basic.js" rid="focus-element"></Playground>
