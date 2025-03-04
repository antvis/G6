---
title: ComboCombined 复合布局
---

## 配置项

### center

> _PointTuple_

布局的中心、默认为图的中心

### comboPadding

> _((d?: unknown) => number) \| number \| number[] \| undefined_ **Default:** `10`

Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 combo 内部 padding 值相同的值

### innerLayout

> _Layout<any>_ **Default:** `ConcentricLayout`

combo 内部的布局算法，需要使用同步的布局算法，默认为 concentric

**示例**:

```ts
import { ConcentricLayout } from '@antv/layout';

innerLayout: new ConcentricLayout({
  sortBy: 'id',
});
```

### nodeSize

> _number \| number[] \| ((d?: Node) => number)_ **Default:** `10`

节点大小（直径）。用于碰撞检测

若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 size，则默认大小为 10

### outerLayout

> _Layout<any>_ **Default:** `ForceLayout`

最外层的布局算法，默认为 force

**示例**

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

> _number \| ((d?: Node) => number)_

preventNodeOverlap 或 preventOverlap 为 true 时生效, 防止重叠时节点/ combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距

### treeKey

> _string_

treeKey
