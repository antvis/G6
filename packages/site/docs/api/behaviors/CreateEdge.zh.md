---
title: CreateEdge 创建边
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

通过拖拽或点击节点创建边，支持自定义边样式。

<embed src="@/common/api/behaviors/create-edge.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`create-edge` \| string_

此插件已内置，你可以通过 `type: 'create-edge'` 来使用它。

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用创建边的功能

### onCreate

> _(edge:_ [EdgeData](/api/graph/option#edgedata)_) =>_ [EdgeData](/api/graph/option#edgedata)

创建边回调，返回边数据

### onFinish

> _(edge:_ [EdgeData](/api/graph/option#edgedata)_) => void_

成功创建边回调

### style

> _EdgeStyle_

新建边的样式配置

### trigger

> _'click' \| 'drag'_ **Default:** `'drag'`

交互配置 点击 或 拖拽

## API

### CreateEdge.destroy()

```typescript
destroy(): void;
```
