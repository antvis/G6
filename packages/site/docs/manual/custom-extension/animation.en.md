---
title: Custom Animation
order: 6
---

## Overview

## Implement Animation

For circular node (Circle) elements, the main shape is a circle. Now, let's create an animation for it so that when the size of the node changes, it transitions with a scaling animation:

```typescript
[
  {
    fields: ['r'],
    shape: 'key',
  },
];
```

Now let's create a graph instance and update the element size to trigger the update animation:

```typescript
const graph = new Graph({
  container: 'container',
  width: 50,
  height: 50,
  data: {
    nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
  },
  node: {
    animation: {
      update: [{ fields: ['r'], shape: 'key' }],
    },
  },
});

graph.draw().then(() => {
  graph.updateNodeData([{ id: 'node-1', style: { size: 40 } }]);
  graph.draw();
});
```

> ⬇️ Move the pointer to the graph below and click the play button on the left to replay

<embed src="@/docs/manual/custom-extension-common/animation/implement-animation.md"></embed>

#### Principle Analysis

When animating an element, the element converts its animation frame parameters into animation frame parameters for its individual sub-graphics and executes the corresponding animations.

In the example above, by updating the node size, an animation was performed on the node, and its animation frame parameters were:

```json
[{ "size": 20 }, { "size": 40 }]
```

After obtaining the attribute, the node element converts it into animation frame parameters for the main shape (circle):

```json
[{ "r": 10 }, { "r": 20 }]
```

Therefore, what is ultimately happening here is that a transition animation is being performed on the circle, changing its radius from 10 to 20.

#### Composite Animation

By directly combining the position change animation with the size change animation into a single animation paradigm, you can obtain a composite animation paradigm:

```typescript
[
  {
    fields: ['x', 'y'],
  },
  {
    fields: ['r'],
    shape: 'key',
  },
];
```

And update both the position and size of the node simultaneously:

```typescript
graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40 } }]);
graph.draw();
```

> ⬇️ Move the pointer to the graph below and click the play button on the left to replay

<embed src="@/docs/manual/custom-extension-common/animation/composite-animation-1.md"></embed>

Add color transition:

```typescript
[
  {
    fields: ['x', 'y'],
  },
  {
    fields: ['r', 'fill'],
    shape: 'key',
  },
];
```

Execute node update:

```typescript
graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40, fill: 'pink' } }]);
graph.draw();
```

> ⬇️ Move the pointer to the graph below and click the play button on the left to replay

<embed src="@/docs/manual/custom-extension-common/animation/composite-animation-2.md"></embed>
