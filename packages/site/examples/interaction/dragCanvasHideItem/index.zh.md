---
title: 拖拽缩放画布时隐藏元素
order: 13
---

拖拽画布和缩放画布频繁地全局渲染。为了提升性能，v3.5.11 推出了内置交互 'drag-canvas' 和 'zoom-canvas' 的布尔型配置项 `enableOptimize`。若 `enableOptimize` 为 `true`，则拖拽画布时，将隐藏除节点 keyShape 以外的所有图形。此外，当 `enableOptimize` 为 true 时，画布缩小到一定程度后（缩放值小于 `optimizeZoom`），'zoom-canvas' 将隐藏文字以提升可读性与性能。

## 使用指南

配置内置交互 'drag-canvas' 和 'zoom-canvas' 的布尔型配置项 `enableOptimize`。详见 [drag-canvas](/zh/docs/manual/middle/states/default-behavior#drag-canvas) 和 [zoom-canvas](/zh/docs/manual/middle/states/default-behavior#zoom-canvas)。
