---
title: GPU 图布局
order: 12
---

Fruchterman Reingold 布局算法在原理上而言属于力导向布局算法。其引力与斥力的定义方式与经典的 Force Diected 力导向图布局有少许不同。

## 使用指南

G6 内置的 Fruchterman 布局可在实例化 Graph 时使用该布局。除此之外，还可以如[子图布局](/zh/docs/manual/middle/layout/#%E5%AD%90%E5%9B%BE%E5%B8%83%E5%B1%80)所示单独使用布局。该布局可以通过配置调整迭代次数、紧凑程度、是否按照聚类布局等。

- 代码演示 1 ：基本的 Fruchterman 布局。
- 代码演示 2 ：Fruchterman 的聚类布局。
- 代码演示 3 ：Fruchterman 布局参数动态变化。
- 代码演示 4 ：Fruchterman 使用 web-worker 以避免阻塞页面。
