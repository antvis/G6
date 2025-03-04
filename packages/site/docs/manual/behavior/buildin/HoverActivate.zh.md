---
title: HoverActivate 悬停激活
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

当鼠标悬停在元素上时，可以激活元素的状态，例如高亮节点或边。

## 配置项

### <Badge type="success">Required</Badge> type

> _`hover-activate` \| string_

此插件已内置，你可以通过 `type: 'hover-activate'` 来使用它。

### animation

> _boolean_ **Default:** `true`

是否启用动画

### degree

> _number \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => number)_ **Default:** `0`

激活元素的n度关系

- 默认为 `0`，表示只激活当前节点

- `1` 表示激活当前节点及其直接相邻的节点和边，以此类推

### direction

> _'in' \| 'out' \| 'both'_ **Default:** `'both'`

指定边的方向

- `'both'`: 表示激活当前节点的所有关系

- `'in'`: 表示激活当前节点的入边和入节点

- `'out'`: 表示激活当前节点的出边和出节点

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用悬浮元素的功能

### inactiveState

> _string_

非激活元素的状态，默认为不改变

### onHover

> _(event:_ [Event](/manual/graph-api/event#事件对象属性)_) => void_

当元素被悬停时的回调

### onHoverEnd

> _(event:_ [Event](/manual/graph-api/event#事件对象属性)_) => void_

当悬停结束时的回调

### state

> _string_ **Default:** `'active'`

激活元素的状态，默认为 `active`

## API

### HoverActivate.destroy()

```typescript
destroy(): void;
```

### HoverActivate.getActiveIds(event)

```typescript
protected getActiveIds(event: IPointerEvent<Element>): string[];
```

| 参数  | 类型                                                                    | 描述     | 默认值 | 必选 |
| ----- | ----------------------------------------------------------------------- | -------- | ------ | ---- |
| event | [Event](/manual/graph-api/event#事件对象属性)&lt;Node \| Edge \| Combo> | 事件对象 | -      | ✓    |
