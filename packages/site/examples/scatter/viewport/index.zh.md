---
title: 视口变换动画
order: 0
---

为视口/全图的平移、缩放、自适应等配置动画。

### 使用指南

通过在调用各个视口操作 API 时配置 `animate` 和 `animateCfg` 参数，可以非常快捷地为这些变换配置动画。这些 API 包括 `graph.translate`, `graph.moveTo`, `graph.zoom`, `graph.zoomTo`, `graph.fitView`, `graph.fitCenter`, `graph.focusItem` 等。详见 [图视口 API](/zh/docs/api/graph-func/transform)。