---
title: AutoAdaptLabel 标签自适应显示
---

## 概述

标签自适应显示是一种动态标签管理策略，旨在根据当前可视范围的空间分配、节点重要性等因素，智能调整哪些标签应显示或隐藏。通过对可视区域的实时分析，确保用户在不同的交互场景下获得最相关最清晰的信息展示，同时避免视觉过载和信息冗余。

## 使用场景

这一交互主要用于：

- 缩放画布
- 拖动画布

## 在线体验

<embed src="@/common/api/behaviors/auto-adapt-label.md"></embed>

## 基本用法

在图配置中添加这一交互

```javascript
// 使用默认配置
const graph = new Graph({
    // 其他配置...
    behaviors: ['auto-adapt-label'], // 直接添加，使用默认配置
});

// 或使用自定义配置
const graph = new Graph({
  // 其他配置
  behaviors: [
    {
      type: 'auto-adapt-label',
      throttle: 200,
      padding: 10
    }
  ]
});
```

## 配置项

| 配置项        | 说明      | 类型         | 默认值            | 必选 |
| -------------- | -------------------------------------------------------- | ------------ | ------------ | ---- |
| type         | 交互类型名称                | string                   | `auto-adapt-label` | √   |
| enable       | 是否启用该交互              |  boolean \| ((event:_ [Event](/api/event#事件对象属性)_) => boolean)                           | true   |           |
| throttle     | 标签更新节流时间（ms）       | number                   | 100                |     |
| padding      | 标签检测重叠时的额外间距     | number | [number, number, ...]    | 0         |      |
| [sort](#sort)         | 自定义排序函数              | (a: ElementDatum, b: ElementDatum) |     |      |
| [sortNode](#sortNode)     | 节点优先级                  | _[NodeCentralityOptions](#nodecentralityoptions) \| ((nodeA: [NodeData](/manual/data#节点数据nodedata), nodeB: [NodeData](/manual/data#节点数据nodedata)) => -1 \| 0 \| 1)_  | `type: 'degree'` |       |
| [sortEdge](#sortEdge)     | 边优先级                    | _(edgeA: [EdgeData](/manual/data#边数据edgedata), edgeB: [EdgeData](/manual/data#边数据edgedata)) => -1 \| 0 \| 1_   |        |                      |
| [sortCombo](#sortCombo)    | Combo优先级                 |  _(comboA: [ComboData](/manual/data#组合数据combodata), comboB: [ComboData](/manual/data#组合数据combodata)) => -1 \| 0 \| 1_   |        |                        |

### sort

> _(elementA:_ _NodeData \| EdgeData \| ComboData, elementB:_ _NodeData \| EdgeData \| ComboData) => -1 \| 0 \| 1_

根据元素的重要性从高到低排序，重要性越高的元素其标签显示优先级越高。一般情况下 combo > node > edge

### sortCombo

> _(comboA: [ComboData](/manual/data#组合数据combodata), comboB: [ComboData](/manual/data#组合数据combodata)) => -1 \| 0 \| 1_

> 根据群组的重要性从高到低排序，重要性越高的群组其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sort`，则 `sortCombo` 不会生效

### sortEdge

> _(edgeA: [EdgeData](/manual/data#边数据edgedata), edgeB: [EdgeData](/manual/data#边数据edgedata)) => -1 \| 0 \| 1_

根据边的重要性从高到低排序，重要性越高的边其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sort`，则 `sortEdge` 不会生效

### sortNode

> _[NodeCentralityOptions](#nodecentralityoptions) \| ((nodeA: [NodeData](/manual/data#节点数据nodedata), nodeB: [NodeData](/manual/data#节点数据nodedata)) => -1 \| 0 \| 1)_ **Default:** `type: 'degree'`

根据节点的重要性从高到低排序，重要性越高的节点其标签显示优先级越高。内置几种中心性算法，也可以自定义排序函数。需要注意，如果设置了 `sort`，则 `sortNode` 不会生效

#### NodeCentralityOptions

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

## 实际案例

<Playground path="behavior/auto-adapt-label/demo/basic.js" rid="default-auto-adapt-label"></Playground>