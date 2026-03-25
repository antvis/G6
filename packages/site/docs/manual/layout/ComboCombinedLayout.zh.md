---
title: 复合布局 ComboCombined
order: 4
---

## 概述

ComboCombined 复合布局适用于复合分组结构的图数据展示场景，支持灵活配置 Combo 内部元素的布局以及最外层 Combo 和节点之间的布局。 默认情况内部元素采用 Concentric 同心圆布局，外部布局采用 gForce 力导向布局，兼顾布局效果与整体稳定性。参考更多 ComboCombined 复合布局[样例](/examples#layout-combo-layout)和[源码](https://github.com/antvis/layout/blob/v5/packages/layout/src/combo-combined.ts)

## 使用场景

- 用户画像分析: 分析用户行为与商品关系，将用户兴趣圈层作为 Combo，内部节点展示具体商品和行为标签，帮助运营人员识别用户消费路径。
- 供应链管理图：供应商、制造商、仓储、分销商按角色或区域划分 Combo，内部节点展示资源、人员或设备，清晰展示供应链各环节内部结构。

## 配置项

| 属性         | 描述                                                                                                | 类型                                                                                       | 默认值 | 必选 |
| ------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------ | ---- |
| type         | 布局类型                                                                                            | `combo-combined`                                                                           | -      | ✓    |
| center       | 布局中心                                                                                            | [`PointTuple`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L829) | 图中心 |      |
| layout       | 布局配置。可固定指定，也可根据 `comboId` 动态返回                                                   | `string` \| `object` \| `(comboId?: string) => string \| object`                           | -      |      |
| nodeSize     | 节点大小（直径）。用于碰撞检测                                                                      | `number` \| `number[]` \| (d?: [NodeData](/manual/data#节点数据nodedata)) => number        | -      |      |
| nodeSpacing  | 节点间距                                                                                            | `number` \| (d?: [NodeData](/manual/data#节点数据nodedata)) => number                      | -      |      |
| comboSpacing | Combo 之间的间距                                                                                    | `number` \| (d?: unknown) => number                                                        | -      |      |
| comboPadding | Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 Combo 内部 padding 值相同的值 | `((d?: unknown) => number)` \| `number` \| `number[]` \| `undefined`                       | -      |      |

### layout

> _`string | object | (comboId?: string) => string | object`_

5.1 中推荐使用单个 `layout` 字段为不同层级选择布局，而不是分别配置 `innerLayout` 和 `outerLayout`。

**示例**:

```ts
new Graph({
  layout: {
    type: 'combo-combined',
    layout: (comboId) => (comboId ? { type: 'grid' } : { type: 'force' }),
  },
});
```

## 示例代码

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
