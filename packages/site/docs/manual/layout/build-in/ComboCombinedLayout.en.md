---
title: ComboCombined
---

## Options

### center

> _PointTuple_

The center of the layout, default to the center of the graph

### comboPadding

> _((d?: unknown) => number) \| number \| number[] \| undefined_ **Default:** `10`

The padding value inside the combo, which is not used for rendering, but only for calculating force. It is recommended to set it to the same value as the combo internal padding value on the view

### innerLayout

> _Layout&lt;any>_ **Default:** `ConcentricLayout`

The layout algorithm inside the combo, which needs to use a synchronized layout algorithm, default to concentric

**Example**

```ts
import { ConcentricLayout } from '@antv/layout';

innerLayout: new ConcentricLayout({
  sortBy: 'id',
});
```

### nodeSize

> _number \| number[] \| ((d?:_ _Node) => number)_ **Default:** `10`

The size of the node (diameter). Used for collision detection

If not specified, it will be calculated based on the size attribute of the incoming node. If neither is specified, the default size is 10

### outerLayout

> _Layout&lt;any>_ **Default:** `ForceLayout`

The outermost layout algorithm, default to force

**Example**

```ts
import { ForceLayout } from '@antv/layout';

outerLayout: new ForceLayout({
  gravity: 1,
  factor: 2,
  linkDistance: (edge: any, source: any, target: any) => {
    const nodeSize = ((source.size?.[0] || 30) + (target.size?.[0] || 30)) / 2;
    return Math.min(nodeSize * 1.5, 700);
  },
});
```

### spacing

> _number \| ((d?:_ _Node) => number)_

It takes effect when preventNodeOverlap or preventOverlap is true. The minimum spacing between nodes when overlapping is prevented. It can be a callback function, and different minimum spacing can be set for different nodes

### treeKey

> _string_

treeKey
