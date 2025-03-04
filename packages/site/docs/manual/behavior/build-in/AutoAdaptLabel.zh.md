---
title: AutoAdaptLabel 标签自适应显示
---

标签自适应显示是一种动态标签管理策略，旨在根据当前可视范围的空间分配、节点重要性等因素，智能调整哪些标签应显示或隐藏。通过对可视区域的实时分析，确保用户在不同的交互场景下获得最相关最清晰的信息展示，同时避免视觉过载和信息冗余。

## 配置项

### <Badge type="success">Required</Badge> type

> _`auto-adapt-label` \| string_

此插件已内置，你可以通过 `type: 'auto-adapt-label'` 来使用它。

### enable

> _boolean \| ((event:_ _IGraphLifeCycleEvent \| IAnimateEvent \| IElementLifeCycleEvent \| IViewportEvent \| IPointerEvent \| IWheelEvent \| IKeyboardEvent \| IDragEvent) => boolean)_ **Default:** ``

是否启用

### padding

> _number \| number[]_ **Default:** `0`

设置标签的内边距，用于判断标签是否重叠，以避免标签显示过于密集

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

### throttle

> _number_ **Default:** `32`

节流时间

## API

### AutoAdaptLabel.destroy()

```typescript
destroy(): void;
```

### AutoAdaptLabel.update(options)

```typescript
update(options: Partial<AutoAdaptLabelOptions>): void;
```

| 参数    | 类型                                      | 描述   | 默认值 | 必选 |
| ------- | ----------------------------------------- | ------ | ------ | ---- |
| options | Partial<[AutoAdaptLabelOptions](#配置项)> | 配置项 | -      | ✓    |
