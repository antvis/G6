---
title: 常见问题
order: 6
---

### Extension 和 Plugin 有什么区别？

`Extension` 是 G6 中的一个概念，是所有可注册内容的统称，包含元素、交互、布局、插件等。

`Plugin` 是 G6 提供的灵活扩展机制，是一种特殊的 `Extension`。

### 设置文本超出省略

以 label 为例，设置 `labelWordWrap` 和 `labelWordWrapWidth` 即可实现文本超出省略。

```typescript
{
  labelText: 'This is a long text',
  labelWordWrap: true,
  labelWordWrapWidth: 50,
}
```

### 按键不生效

一些插件或交互支持配置触发按键，请使用标准按键名：如 `Control`, `Shift`, `Alt`, `Meta`，以及字母、数字、符号等。

### 更新数据后画布不更新

请确保数据更新后调用 `graph.draw()` 或者 `graph.render()` 更新画布。

> G6 对于多次数据更新，会在 `draw` 或 `render` 后合并差异并统一更新画布，以提高性能。

### 交互有冲突如何解决

当多个交互之间存在冲突时，你可以设置交互的启用时机来避免多个交互被同时触发。

以 `drag-canvas` 和 `brush-select` 为例，如果直接配置这两个交互，当指针在画布上进行拖拽时，会导致交互异常。可以设置为在按下 `shift` 键时禁用 `drag-canvas` 交互。

```typescript
behaviors: [
  {
    type: 'drag-canvas',
    enable: (event) => event.shiftKey === false,
  },
  {
    type: 'brush-select',
  },
];
```

此时，当按下 `shift` 键时，`drag-canvas` 交互会被禁用，`brush-select` 交互会不会受到影响。

### draw 和 render 的区别

`draw` 和 `render` 都会执行绘制操作，但 `render` 会在 `draw` 的基础上额外进行**布局**、**视图自适应**操作。

可以简单理解为：`render` = `draw` + `layout` + `fitView`/`fitCenter`。
