---
title: Behavior
order: 5
---

## Overview

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

Interaction (Behavior) refers to a series of operational behaviors between the user and the canvas or elements, such as dragging, scaling, panning, and selecting. Interactions help users to more intuitively obtain information from the graph.

:::warning{title=Note}
In G6 5.x, the concept of "interaction mode" (Mode) has been removed. Users only need to manage the currently enabled interaction behaviors.
:::

G6 provides a rich set of interactive features, and users can choose the appropriate interactive behaviors according to their needs, including:

- [Brush Select](/api/behaviors/brush-select): Box Selection
- [Click Select](/api/behaviors/click-element): Single Click Selection
- [Collapse Expand](/api/behaviors/collapse-expand): Expand and Collapse
- [Create Edge](/api/behaviors/create-edge): Create an Edge
- [Drag Canvas](/api/behaviors/drag-canvas): Drag the Canvas
- [Drag Element](/api/behaviors/drag-element): Drag an Element
- [Focus Element](/api/behaviors/focus-element): Focus on an Element
- [Hover Element](/api/behaviors/hover-element): Hover Over an Element
- [Lasso Select](/api/behaviors/lasso-select): Lasso Selection
- [Zoom Canvas](/api/behaviors/zoom-canvas): Zoom the Canvas

## Registering Interactions

You can directly use the built-in interactions. If you want to use other interactions, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomBehavior } from 'package-name/or/path-to-your-custom-behavior';

register(ExtensionCategory.BEHAVIOR, 'custom-behavior', CustomBehavior);
```

## Configuring Interactions

You can directly configure the names of interaction types in the `behaviors` array, for example:

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

> Different interaction behaviors support different configuration parameters. For details, please refer to [Interaction Behaviors](/api/behaviors/brush-select).

### Updating Interactions

If you need to update interaction behaviors after initialization, for example, to temporarily disable a certain interaction behavior, you can use the [updateBehavior](/api/graph/method#graphupdatebehaviorbehavior) method:

```typescript
// Disable the `zoom-canvas` interaction.
graph.updateBehavior({
  key: 'zoom-canvas',
  enable: false,
});
```

:::warning{title=Note}
To use the `updateBehavior` method, you must configure the interaction as an `object` during initialization and provide a `key` value.
:::

You can also use the [setBehaviors](/api/graph/method#graphsetbehaviorsbehaviors) method to add, update, or remove current interaction behaviors at any time:

```typescript
// Add the `lasso-select` interaction
graph.setBehaviors((behaviors) => [...behaviors, 'lasso-select']);

// Update the `zoom-canvas` interaction (requires configuring the interaction as an `object` with a `key` during initialization)
graph.setBehaviors((behaviors) =>
  behaviors.map((behavior) => {
    if (behavior.key === 'zoom-canvas') {
      return { ...behavior, sensitivity: 2 };
    }
    return behavior;
  }),
);

// Remove the `click-select` interaction
graph.setBehaviors((behaviors) => behaviors.filter((behavior) => behavior !== 'click-select'));
```

## Custom Interactions

If the built-in interactions do not meet your requirements, you can create custom interaction behaviors. For details, please refer to [Custom Interactions](/manual/custom-extension/behavior).
