---
title: Combo 力导布局
order: 10
---

*V3.5 新增功能。*Combo Force 是基于力导向的专用于带有 combo 的图的布局算法。通过自研改造经典力导向算法，将根据节点的 combo 信息，施加不同的力以达到同 combo 节点尽可能聚集，不同 combo 之间尽可能无重叠的布局。

## 使用指南

在有 Combo 的图上，推荐使用 `'comboForce'` 布局。其他内置布局将不会考虑 Combo 信息对布局的影响。
