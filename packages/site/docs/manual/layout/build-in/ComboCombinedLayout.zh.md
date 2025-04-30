---
title: ComboCombined 复合布局
---

## 概述

ComboCombined 复合布局适用于复合分组结构的图数据展示场景，支持灵活配置 Combo 内部元素的布局以及最外层 Combo 和节点之间的布局。 默认情况内部元素采用 Concentric 同心圆布局，外部布局采用 gForce 力导向布局，兼顾布局效果与整体稳定性。参考更多 ComboCombined 复合布局[样例](/examples#layout-combo-layout)和[源码](https://github.com/antvis/layout/blob/v5/packages/layout/src/combo-combined.ts)

## 使用场景

- 用户画像分析: 分析用户行为与商品关系，将用户兴趣圈层作为 Combo，内部节点展示具体商品和行为标签，帮助运营人员识别用户消费路径。
- 供应链管理图：供应商、制造商、仓储、分销商按角色或区域划分 Combo，内部节点展示资源、人员或设备，清晰展示供应链各环节内部结构。

## 配置项

| 属性         | 描述                                                                                                                                         | 类型                                                                                       | 默认值           | 必选 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------- | ---- |
| type         | 布局类型                                                                                                                                     | `combo-combined`                                                                           | -                | ✓    |
| center       | 布局中心                                                                                                                                     | [`PointTuple`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L829) | 图中心           |      |
| comboPadding | Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 Combo 内部 padding 值相同的值                                          | `((d?: unknown) => number)` \| `number` \| `number[]` \| `undefined`                       | 10               |      |
| innerLayout  | Combo 内部的布局算法, [说明](#innerlayout)                                                                                                   | [`Layout`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L881)     | ConcentricLayout |      |
| nodeSize     | 节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 size，则默认大小为 10                   | `number` \| `number[]` \| (d?: [NodeData](/manual/data#节点数据nodedata)) => number        | 10               |      |
| outerLayout  | 最外层的布局算法, [说明](#outerlayout)                                                                                                       | [`Layout`](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L866)     | ForceLayout      |      |
| spacing      | preventNodeOverlap 或 preventOverlap 为 `true` 时生效, 防止重叠时节点 / Combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距 | `number` \| (d?: [NodeData](/manual/data#节点数据nodedata)) => number                      | -                |      |
| treeKey      | treeKey                                                                                                                                      | `string`                                                                                   | -                |      |

### innerLayout

> _`Layout<any>`_ **Default:** `ConcentricLayout`

Combo 内部的布局算法，需要使用同步的布局算法，默认为 [ConcentricLayout](https://github.com/antvis/layout/blob/v5/packages/layout/src/concentric.ts)，[更多布局算法](https://github.com/antvis/layout/tree/v5/packages/layout)

**示例**:

```ts
import { ConcentricLayout } from '@antv/layout';

new Graph({
  layout: {
    type: 'combo-combined',
    /**
     * 查看更多 ConcentricLayout 配置参数:
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

最外层的布局算法，默认为 [ForceLayout](https://github.com/antvis/layout/blob/v5/packages/layout/src/force/index.ts)，[更多布局算法](https://github.com/antvis/layout/tree/v5/packages/layout)

**示例**

```ts
import { ForceLayout } from '@antv/layout';

new Graph({
  layout: {
    type: 'combo-combined',
    /**
     * 查看更多 ForceLayout 配置参数:
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

## 示例代码

<Playground path="layout/combo-layout/demo/combo-combined.js" rid="combo-combined"></Playground>
