---
title: TreeData
order: 2
---

本章介绍的 TreeData 是树图数据的类型，即是 Graph 接收的数据类型之一。是 Graph 接收的数据类型。v5 打通了 Graph 和 TreeGraph，即使用同一个 Graph 类，即可以读取 [GraphData](./GraphData.zh.md) 数据格式，也可以读取本文中的树图的数据格式。`TreeGraph` 是一个嵌套的数据结构，表达了树的父子层级。不像 `GraphData`，`TreeData` 不显式定义边，没有 `edges` 数组，其中 `children` 的嵌套隐式表示了边，即父子节点之间存在一条边。

v5 的 Graph 可以读取 `GraphData`、`TreeData`、`TreeData[]`，即可以展示图数据、树图数据、多棵树的森林数据。

## 属性

### id

- 是否必须：`是`；
- 类型： `string | number`；

节点的唯一 ID，节点创建后，ID 不可被修改。

### data

- 是否必须：`是`；
- 类型：[`NodeUserModelData`](./NodeUserModel.zh.md#nodeusermodeldatatype)；

节点除 ID 以外的的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](../graph/Specification.zh.md#transforms)。转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的节点 mapper 进行映射，见 [Specification.node](../graph/Specification.zh.md#node)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。

### children

- 是否必须：`否`；
- 类型：`TreeData`；

该节点的子节点数组。嵌套的 `TreeData` 格式的节点。
