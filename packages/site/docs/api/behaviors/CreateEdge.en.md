---
title: CreateEdge
---

Create edges by dragging or clicking nodes, and support custom edge styles.

<embed src="@/common/api/behaviors/create-edge.md"></embed>

## Options

### key

> _string_

Behavior key, that is, the unique identifier

Used to identify the behavior for further operations

```typescript
// Update behavior options
graph.updateBehavior({key: 'key', ...});
```

### <Badge type="success">Required</Badge> type

> _string_

Behavior type

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether to enable the function of creating edges

### onCreate

> _(edge:_ [EdgeData](/api/graph/option#edgedata)_) =>_ [EdgeData](/api/graph/option#edgedata)

Callback when create edge, return EdgeData.

### onFinish

> _(edge:_ [EdgeData](/api/graph/option#edgedata)_) => void_

Callback when create is completed.

### style

> _EdgeStyle_

Style configs of the new edge

### trigger

> _'click' \| 'drag'_ **Default:** `'drag'`

trigger click or drag.

## API

### CreateEdge.destroy()

```typescript
destroy(): void;
```
