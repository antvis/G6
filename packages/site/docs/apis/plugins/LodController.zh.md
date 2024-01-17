---
title: LodController
order: 0
---

LodController 将图中的文本单独渲染到独立的 canvas 上，这样的好处是：

- 提高渲染性能
- 在画布缩放过程中，能够保持文本字号不变
- 提供了文本密度控制的能力，避免文本过于密集导致的视觉混乱

:::warning{title=注意}
LodController 是一个 `单例` 的插件，G6 会默认注册该插件，无需手动注册。
:::

## 配置项

### debounce

**类型**：`'auto' | number`

**默认值**：`'auto'`

延迟渲染时间，单位：毫秒

> 在主画布缩放、平移时，LodController 会延迟一段时间后再次渲染文本，以避免频繁渲染

### disableLod

**类型**：`boolean`

**默认值**：`false`

是否禁用信息分层渲染

### cellSize

**类型**：`number`

**默认值**：`200`

单元格大小，单位：像素

### numberPerCell

**类型**：`number`

**默认值**：`1`

每个单元格中最多渲染的文本数量
