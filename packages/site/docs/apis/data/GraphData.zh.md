---
title: GraphData
order: 1
---

本章介绍的 GraphData 是图数据的类型，是 Graph 接收的数据类型之一。同时，v5 还打通了 Graph 和 TreeGraph，即使用同一个 Graph 类，即可以读取本文中的 GraphData 数据格式，也可以读取树图的数据格式，树图数据格式见 [TreeData](./TreeData.zh.md)。

## 属性

### nodes

- 是否必须：`是`；
- 类型： [`NodeUserModel[]`](#NodeUserModel)；
- 定义于：[packages/g6/src/types/data.ts:12](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/data.ts#L12)

#### NodeUserModel

• `必须` **id**: `string|number`

节点的唯一 ID，节点创建后，ID 不可被修改。

• `必须` **data**: [`NodeUserModelData`](./NodeUserModelData.zh.md)

节点除 ID 以外的的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](TODO)。转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的节点 mapper 进行映射，见 [Specification.node](TODO)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。

### edges

- 是否必须：`是`；
- 类型： `EdgeUserModel`[]；
- 定义于：[packages/g6/src/types/data.ts:13](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/data.ts#L13)

#### EdgeUserModel

• `必须` **id**: `string|number`

边的唯一 ID，节点创建后，ID 不可被修改。

• `必须` **source**: `string|number`

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

• `必须` **target**: `string|number`

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

• `必须` **data**: [`EdgeUserModelData`](./EgdeUserModelData.zh.md)

边除 ID、起点 ID、终点 ID 以外的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](TODO)。转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的边 mapper 进行映射，见 [Specification.edge](TODO)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。

### combos

- 是否必须：`否`；
- 类型： `ComboUserModel`[]；
- 定义于：[packages/g6/src/types/data.ts:14](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/data.ts#L14)

#### ComboUserModel

• `必须` **id**: `string|number`

Combo 的唯一 ID，Combo 创建后，ID 不可被修改。

• `必须` **data**: [`ComboUserModelData`](./ComboUserModelData.zh.md)

Combo 除 ID 以外的的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](TODO)。转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的 combo mapper 进行映射，见 [Specification.combo](TODO)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。
