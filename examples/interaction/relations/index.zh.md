---
title: 高亮相邻节点
order: 0
redirect_from:
  - /zh/examples
---

演示了 G6 内置的 activate-relations 和自定义实现高亮相邻节点的方式。

## 使用指南

在图分析应用中，鼠标 hover 到某个节点后，高亮其相邻的节点及边是非常常见的需求，因此，G6 也内置了 activate-relations Behavior，专门用于处理这种需求。另外， 如果内置的不能满足需求，用户也可以通过第二种方式来自定义，可以直接使用 `graph.on`，也可以通过[自定义 Behavior](zh/docs/manual/advanced/custom-behavior) 来实现。