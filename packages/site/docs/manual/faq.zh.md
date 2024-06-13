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
