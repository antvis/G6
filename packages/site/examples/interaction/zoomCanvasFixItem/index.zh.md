---
title: 缩放画布时固定选中元素
order: 12
---

为了在缩放画布时能够保持关注节点/边的高亮效果，v3.5.11 推出了内置交互 'zoom-canvas' 的配置项 `fixSelectedItems` 以达到缩放画布时固定选中节点的需求。

## 使用指南

配置内置交互 'zoom-canvas' 的配置项 `fixSelectedItems`，`fixSelectedItems` 是一个对象，包括 `fixState`、`fixAll`、`fixLabel`、`fixLineWidth`，可达到在缩小画布时固定选定的元素的大小、文本大小、描边粗细。详见 [zoom-canvas](/zh/docs/manual/middle/states/defaultBehavior#zoom-canvas)。
