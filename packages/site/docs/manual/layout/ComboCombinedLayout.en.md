---
title: ComboCombined Layout
order: 4
---

## Overview

ComboCombined composite layout is suitable for graph data with composite group structures. It supports flexible configuration of the layout for elements inside combos as well as the layout between the outermost combos and nodes. By default, the internal elements use the Concentric layout, and the outer layout uses the gForce force-directed layout, balancing layout effect and overall stability. See more ComboCombined layout [examples](/en/examples#layout-combo-layout) and [source code](https://github.com/antvis/layout/blob/v5/packages/layout/src/combo-combined.ts).

## Usage Scenarios

- User profile analysis: Analyze user behavior and product relationships, use user interest circles as combos, display specific products and behavior tags as internal nodes, and help operators identify user consumption paths.
- Supply chain management graph: Divide suppliers, manufacturers, warehouses, and distributors into combos by role or region, display resources, personnel, or equipment as internal nodes, and clearly show the internal structure of each link in the supply chain.

## Options

| Property     | Description                                                                                                                                        | Type                                                                                       | Default          | Required |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------- | -------- |
| type         | Layout type                                                                                                                                        | `combo-combined`                                                                           | -                | ✓        |
| center       | Layout center                                                                                                                                      | [`PointTuple`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L829) | Graph center     |          |
| comboPadding | Padding value inside the combo, used only for force calculation, not for rendering. It is recommended to set the same value as the visual padding. | `((d?: unknown) => number)` \| `number` \| `number[]` \| `undefined`                       | 10               |          |
| innerLayout  | Layout algorithm for elements inside the combo, [see below](#innerlayout)                                                                          | [`Layout`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L881)     | ConcentricLayout |          |
| nodeSize     | Node size (diameter), used for collision detection. If not specified, it is calculated from the node's size property, or defaults to 10.           | `number` \| `number[]` \| (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number     | 10               |          |
| outerLayout  | Layout algorithm for the outermost layer, [see below](#outerlayout)                                                                                | [`Layout`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L866)     | ForceLayout      |          |
| spacing      | Minimum spacing between node/combo edges when preventNodeOverlap or preventOverlap is `true`. Can be a callback for different nodes.               | `number` \| (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number                   | -                |          |
| treeKey      | treeKey                                                                                                                                            | `string`                                                                                   | -                |          |

### innerLayout

> _`Layout<any>`_ **Default:** `ConcentricLayout`

The layout algorithm for elements inside the combo. Must use a synchronous layout algorithm. Default is [ConcentricLayout](https://github.com/antvis/layout/blob/v5/packages/layout/src/concentric.ts). [More layouts](https://github.com/antvis/layout/tree/v5/packages/layout)

**Example**:

```ts
import { ConcentricLayout } from '@antv/layout';

new Graph({
  layout: {
    type: 'combo-combined',
    /**
     * See more ConcentricLayout options:
     * https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L397
     */
    innerLayout: new ConcentricLayout({
      sortBy: 'id',
      nodeSize: 20,
      clockwise: true,
    }),
  },
});
```

### outerLayout

> _`Layout<any>`_ **Default:** `ForceLayout`

The layout algorithm for the outermost layer. Default is [ForceLayout](https://github.com/antvis/layout/blob/v5/packages/layout/src/force/index.ts). [More layouts](https://github.com/antvis/layout/tree/v5/packages/layout)

**Example**

```ts
import { ForceLayout } from '@antv/layout';

new Graph({
  layout: {
    type: 'combo-combined',
    /**
     * See more ForceLayout options:
     * https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L950
     */
    outerLayout: new ForceLayout({
      gravity: 1,
      factor: 2,
      linkDistance: (edge: any, source: any, target: any) => {
        const nodeSize = ((source.size?.[0] || 30) + (target.size?.[0] || 30)) / 2;
        return Math.min(nodeSize * 1.5, 70);
      },
    }),
  },
});
```

## Example Code

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'combo-combined',
        comboPadding: 2,
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: (d) => d.combo,
        },
      },
      edge: {
        style: (model) => {
          const { size, color } = model.data;
          return {
            stroke: color || '#99ADD1',
            lineWidth: size || 1,
          };
        },
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      autoFit: 'view',
    });

    graph.render();
  });
```
