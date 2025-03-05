---
title: EdgeBundling 边绑定
---

边绑定（Edge Bundling）是一种图可视化技术，用于减少复杂网络图中的视觉混乱，并揭示图中的高级别模式和结构。其思想是将相邻的边捆绑在一起。

G6 中提供的边绑定插件是基于 FEDB（Force-Directed Edge Bundling for Graph Visualization）一文的实现：将边建模为可以相互吸引的柔性弹簧，通过自组织的方式进行捆绑。

**参考示例**：

- [边绑定](/examples/plugin/edge-bundling/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`edge-bundling` \| string_

此插件已内置，你可以通过 `type: 'edge-bundling'` 来使用它。

### bundleThreshold

> _number_ **Default:** `0.6`

边兼容性阈值，决定了哪些边应该被绑定在一起

### cycles

> _number_ **Default:** `6`

模拟周期数

### divisions

> _number_ **Default:** `1`

初始切割点数。在后续的周期中，切割点数将根据 `divRate` 逐步递增

### divRate

> _number_ **Default:** `2`

切割点数增长率

### iterations

> _number_ **Default:** `90`

指定在第一个周期中执行的迭代次数。在后续的周期中，迭代次数将根据 `iterRate` 逐步递减

### iterRate

> _number_ **Default:** `2 / 3`

迭代次数递减率

### K

> _number_ **Default:** `0.1`

边的强度

### lambda

> _number_ **Default:** `0.1`

初始步长。在后续的周期中，步长将双倍递增

## API

### EdgeBundling.destroy()

```typescript
destroy(): void;
```
