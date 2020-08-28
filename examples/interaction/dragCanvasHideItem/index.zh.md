---
title: 拖拽画布时隐藏元素
order: 13
---

拖拽画布会触发非常频繁的全局渲染，为了提升性能，v3.5.11 推出了内置交互 'drag-canvas' 的布尔型配置项 `enableOptimize`，若 `enableOptimize` 为 `true`，则拖拽画布时，将隐藏除节点 keyShape 以外的所有图形。

## 使用指南

配置内置交互 'drag-canvas' 的布尔型配置项 `enableOptimize`。详见 [drag-canvas](/zh/docs/manual/middle/states/defaultBehavior#drag-canvas)。
