---
title: LassoSelect 套索选择
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

用不规则多边形框选一组元素。

<embed src="@/common/api/behaviors/lasso-select.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`lasso-select` \| string_

此插件已内置，你可以通过 `type: 'lasso-select'` 来使用它。

### animation

> _boolean_ **Default:** `false`

是否启用动画

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用框选功能

### enableElements

> _'node' \| 'edge' \| 'combo'\_\_[]_ **Default:** `['node', 'combo', 'edge']`

可框选的元素类型

### immediately

> _boolean_ **Default:** `false`

是否及时框选, 仅在框选模式为 `default` 时生效

### mode

> _'union' \| 'intersect' \| 'diff' \| 'default'_ **Default:** `'default'`

框选的选择模式

- `'union'`：保持已选元素的当前状态，并添加指定的 state 状态。

- `'intersect'`：如果已选元素已有指定的 state 状态，则保留；否则清除该状态。

- `'diff'`：对已选元素的指定 state 状态进行取反操作。

- `'default'`：清除已选元素的当前状态，并添加指定的 state 状态。

### onSelect

> _(states:_ _Record**&lt;**string\_\_,_ _string_ _\|_ _string\_\_[]>) =>_ _Record**&lt;**string\_\_,_ _string_ _\|_ _string\_\_[]>_

框选元素状态回调。

### state

> _string_ **Default:** `'selected'`

被选中时切换到该状态

### style

> _RectStyleProps_

框选 框样式

### trigger

> _string[]_ **Default:** `['shift']`

按下该快捷键配合鼠标点击进行框选

注意，`trigger` 设置为 `['drag']` 时会导致 `drag-canvas` 行为失效。两者不可同时配置。

### key

> _string_

交互 key，即唯一标识

用于标识交互，从而进一步操作此交互

```typescript
// Update behavior options
graph.updateBehavior({key: 'key', ...});
```

### <Badge type="success">Required</Badge> type

> _string_

交互类型
