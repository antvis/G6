---
title: ClickSelect 点击选中
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

当鼠标点击元素时，可以激活元素的状态，例如选中节点或边。当 degree 设置为 `1` 时，点击节点会高亮当前节点及其直接相邻的节点和边。

## 配置项

### <Badge type="success">Required</Badge> type

> _`click-select` \| string_

此插件已内置，你可以通过 `type: 'click-select'` 来使用它。

### animation

> _boolean_ **Default:** `true`

是否启用动画

### degree

> _number \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => number)_ **Default:** `0`

选中元素的度，即决定了影响范围

- 对于节点来说，`0` 表示只选中当前节点，`1` 表示选中当前节点及其直接相邻的节点和边，以此类推。
- 对于边来说，`0` 表示只选中当前边，`1` 表示选中当前边及其直接相邻的节点，以此类推。

**示例 1**：点击选中节点及其直接相连的邻接节点

该节点及其直接相连的邻接节点会从默认状态（`default`）切换为激活状态（`active`），视觉上表现为填充色由浅蓝色（'#289fff'）变为深蓝色（'#0052d9'）

```typescript
new Graph({
  node: {
    style: {
      fill: '#289fff',
    },
    state: {
      active: {
        fill: '#0052d9',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
    },
  ],
});
```

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用点击元素的功能

可以通过函数的方式动态控制是否启用，例如只有节点被选中时才启用。

```typescript
{
  enable: (event) => event.targetType === 'node';
}
```

### multiple

> _boolean_ **Default:** `false`

是否允许多选

### neighborState

> _string_ **Default:** `'selected'`

当有元素选中时，其相邻 n 度关系的元素应用的状态。n 的值由属性 degree 控制，例如 degree 为 1 时表示直接相邻的元素

### onClick

> _(event: [Event](/manual/graph-api/event#事件对象属性)) => void_

点击元素时的回调

### state

> _string_ **Default:** `'selected'`

当元素被选中时应用的状态

内置状态：

- `'selected'`
- `'active'`
- `'inactive'`
- `'disabled'`
- `'highlight'`

### trigger

> _string[]_ **Default:** `['shift']`

按下该快捷键配合鼠标点击进行多选

### unselectedState

> _string_

当有元素被选中时，除了选中元素及其受影响的邻居元素外，其他所有元素应用的状态。

内置状态：

- `'selected'`
- `'active'`
- `'inactive'`
- `'disabled'`
- `'highlight'`

## API

### ClickSelect.destroy()

```typescript
destroy(): void;
```
