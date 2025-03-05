---
title: EdgeFilterLens 边过滤镜
---

边过滤镜可以将关注的边保留在过滤镜范围内，其他边将在该范围内不显示。

**参考示例**：

- [边过滤镜](/examples/plugin/edge-filter-lens/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`edge-filter-lens` \| string_

此插件已内置，你可以通过 `type: 'edge-filter-lens'` 来使用它。

### edgeStyle

> _EdgeStyle \| (datum: [EdgeData](/manual/data#边数据edgedata)) => EdgeStyle_

在透镜中边的样式

### filter

> _(id: string, elementType: 'node' \| 'edge' \| 'combo') => boolean_

过滤出始终不在透镜中显示的元素

### maxR

> _number_ **Default:** `canvas 宽高最小值的一半`

透镜的最大半径。只有在 `scaleRBy` 为 `wheel` 时生效

### minR

> _number_ **Default:** `0`

透镜的最小半径。只有在 `scaleRBy` 为 `wheel` 时生效

### nodeStyle

> _NodeStyle_ _\| ((datum:_ [NodeData](/manual/data#节点数据nodedata)_) =>_ _NodeStyle\_\_)_

在透镜中节点的样式

### nodeType

> _'both' \| 'source' \| 'target' \| 'either'_ **Default:** `'both'`

边显示的条件

- `'both'`：只有起始节点和目标节点都在透镜中时，边才会显示

- `'source'`：只有起始节点在透镜中时，边才会显示

- `'target'`：只有目标节点在透镜中时，边才会显示

- `'either'`：只要起始节点或目标节点有一个在透镜中时，边就会显示

### preventDefault

> _boolean_ **Default:** `true`

是否阻止默认事件

### r

> _number_ **Default:** `60`

透镜的半径

### scaleRBy

> _'wheel'_ **Default:** ``

缩放透镜半径的方式

- `'wheel'`：通过滚轮缩放透镜的半径

### style

> _BaseStyleProps_

透镜的样式

### trigger

> _'pointermove' \| 'click' \| 'drag'_ **Default:** `'pointermove'`

移动透镜的方式

- `'pointermove'`：始终跟随鼠标移动

- `'click'`：鼠标点击时透镜移动

- `'drag'`：拖拽透镜

## API

### EdgeFilterLens.destroy()

```typescript
destroy(): void;
```

### EdgeFilterLens.update(options)

```typescript
update(options: Partial<EdgeFilterLensOptions>): void;
```

| 参数    | 类型                                      | 描述   | 默认值 | 必选 |
| ------- | ----------------------------------------- | ------ | ------ | ---- |
| options | Partial<[EdgeFilterLensOptions](#配置项)> | 配置项 | -      | ✓    |
