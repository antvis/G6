---
title: 高亮相邻节点
order: 0
---

在图分析应用中，鼠标 hover 到某个节点后，高亮其相邻的节点及边是一种非常常见的需求。

## 使用指南

该示例演示了 G6 内置的 activate-relations 和自定义实现高亮相邻节点的方式。另外，如果内置高亮关注点及其邻居的行为不能满足需求，用户也可以通过使用 `graph.on` 或[自定义 Behavior](/zh/docs/manual/middle/states/custom-behavior) 实现。
