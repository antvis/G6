---
title: GraphData
order: 1
---

本章介绍的 GraphData 是图数据的类型，是 Graph 接收的数据类型之一。同时，v5 还打通了 Graph 和 TreeGraph，即使用同一个 Graph 类，即可以读取本文中的 GraphData 数据格式，也可以读取树图的数据格式，树图数据格式见 [TreeData](./TreeData.zh.md)。

## 属性

### nodes

- 是否必须：`是`；
- 类型： [`NodeUserModel`](./NodeUserModel.zh.md)[]；

### edges

- 是否必须：`是`；
- 类型： [`EdgeUserModel`](./EdgeUserModel.zh.md)[]；

### combos

- 是否必须：`否`；
- 类型： [`ComboUserModel`](./ComboUserModel.zh.md)[]；
