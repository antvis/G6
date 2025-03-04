---
title: Behavior Overview
order: 1
---

## Overview

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

Behavior refers to a series of operational behaviors between the user and the canvas or elements, such as dragging, scaling, panning, and selecting. Interactions help users to more intuitively obtain information from the graph.

:::warning{title=Note}
In G6 5.x, the concept of "interaction mode" (Mode) has been removed. Users only need to manage the currently enabled behaviors.
:::

G6 provides a rich set of interactive features, and users can choose the appropriate interactive behaviors according to their needs, including:

- [Brush Select](/en/api/behaviors/brush-select): Box Selection
- [Click Select](/en/api/behaviors/click-select): Single Click Selection
- [Collapse Expand](/en/api/behaviors/collapse-expand): Expand and Collapse
- [Create Edge](/en/api/behaviors/create-edge): Create an Edge
- [Drag Canvas](/en/api/behaviors/drag-canvas): Drag the Canvas
- [Drag Element](/en/api/behaviors/drag-element): Drag an Element
- [Focus Element](/en/api/behaviors/focus-element): Focus on an Element
- [Hover Element](/en/api/behaviors/hover-activate): Hover Over an Element
- [Lasso Select](/en/api/behaviors/lasso-select): Lasso Selection
- [Zoom Canvas](/en/api/behaviors/zoom-canvas): Zoom the Canvas

## Register Behavior

You can directly use the built-in behaviors. If you want to use other behaviors, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomBehavior } from 'package-name/or/path-to-your-custom-behavior';

register(ExtensionCategory.BEHAVIOR, 'custom-behavior', CustomBehavior);
```

## Configure Behavior

You can directly configure the names of behavior types in the `behaviors` array, for example:

```typescript
{
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select'],
}
```

It also supports passing configuration parameters in the form of an `object`, for example:

```typescript
{
  behaviors: [
    {
      type: 'zoom-canvas',
      sensitivity: 2,
    },
  ],
}
```

> Different behaviors support different configuration parameters. For details, please refer to [behaviors](/en/api/behaviors/brush-select).

### Update Behavior

If you need to update behaviors after initialization, for example, to temporarily disable a certain behavior, you can use the [updateBehavior](/en/api/graph/method#graphupdatebehaviorbehavior) method:

```typescript
// Disable the `zoom-canvas` behavior.
graph.updateBehavior({
  key: 'zoom-canvas',
  enable: false,
});
```

:::warning{title=Note}
To use the `updateBehavior` method, you must configure the behavior as an `object` during initialization and provide a `key` value.
:::

You can also use the [setBehaviors](/en/api/graph/method#graphsetbehaviorsbehaviors) method to add, update, or remove current behavior behaviors at any time:

```typescript
// Add the `lasso-select` behavior
graph.setBehaviors((behaviors) => [...behaviors, 'lasso-select']);

// Update the `zoom-canvas` behavior (requires configure the behavior as an `object` with a `key` during initialization)
graph.setBehaviors((behaviors) =>
  behaviors.map((behavior) => {
    if (behavior.key === 'zoom-canvas') {
      return { ...behavior, sensitivity: 2 };
    }
    return behavior;
  }),
);

// Remove the `click-select` behavior
graph.setBehaviors((behaviors) => behaviors.filter((behavior) => behavior !== 'click-select'));
```

## Custom Behavior

If the built-in behaviors do not meet your requirements, you can create custom behaviors. For details, please refer to [Custom Behavior](/en/manual/custom-extension/behavior).
