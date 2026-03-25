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

| Property     | Description                                                                                                                                        | Type                                                                                       | Default      | Required |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ | -------- |
| type         | Layout type                                                                                                                                        | `combo-combined`                                                                           | -            | ✓        |
| center       | Layout center                                                                                                                                      | [`PointTuple`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L829) | Graph center |          |
| layout       | Layout configuration. Can be fixed, or returned dynamically based on `comboId`                                                                     | `string` \| `object` \| `(comboId?: string) => string \| object`                           | -            |          |
| nodeSize     | Node size (diameter), used for collision detection                                                                                                 | `number` \| `number[]` \| (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number     | -            |          |
| nodeSpacing  | Spacing between nodes                                                                                                                              | `number` \| (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number                   | -            |          |
| comboSpacing | Spacing between combos                                                                                                                             | `number` \| (d?: unknown) => number                                                        | -            |          |
| comboPadding | Padding value inside the combo, used only for force calculation, not for rendering. It is recommended to set the same value as the visual padding. | `((d?: unknown) => number)` \| `number` \| `number[]` \| `undefined`                       | -            |          |

### layout

> _`string | object | (comboId?: string) => string | object`_

In `5.1`, it is recommended to use a single `layout` field to choose layouts for different levels, instead of configuring `innerLayout` and `outerLayout` separately.

**Example**:

```ts
new Graph({
  layout: {
    type: 'combo-combined',
    layout: (comboId) => (comboId ? { type: 'grid' } : { type: 'force' }),
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
