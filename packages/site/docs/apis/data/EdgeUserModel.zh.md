---
title: EdgeUserModel 输入数据
order: 4
---

用户输入数据中，每一项边数据类型说明如下。

```typescript
interface EdgeUserModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeUserModelData;
}
```

## id

边的唯一 ID，节点创建后，ID 不可被修改。

- **是否必须**: 是；
- **类型**: `string|number`

## source

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

- **是否必须**: 是；
- **类型**: `string|number`

## target

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

- **是否必须**: 是；
- **类型**: `string|number`

## data

边除 ID、起点 ID、终点 ID 以外的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](../graph/Specification.zh.md#transforms)。转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的边 mapper 进行映射，见 [Specification.edge](../graph/Specification.zh.md#edge)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。

- **是否必须**: 是；
- **类型**: [`EdgeUserModelData`](#edgeusermodeldatatype)

### EdgeUserModelData.type

边的渲染类型，可以是已经注册到图类上的边类型，内置并默认注册的有 `'line-edge'`，`'loop-edge'`。

- 是否必须：否；
- 类型： `string`；

### EdgeUserModelData.visible

边是否默认展示出来。

- 是否必须：否；
- 类型： `boolean`；

### EdgeUserModelData.color

该边的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 keyShape 以及各种图形的图形样式。

- 是否必须：否；
- 类型： `string`；

### EdgeUserModelData.label

边 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 labelShape 的 text 值或其他图形样式。

- 是否必须：否；
- 类型： `string`；

### EdgeUserModelData.badge

边上的徽标配置，内置边的徽标绘制在文本后方。更多的样式配置应当在 Graph 实例的边 mapper 中配置 badgeShapes 的图形样式。

- 是否必须：否；
- 类型：

```typescript
{
  position: BadgePosition,
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
};
```

### EdgeUserModelData.icon

边上的 icon 配置。内置边的 icon 绘制在文本后方。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 iconShape 的图形样式。

- 是否必须：否；
- 类型：

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

### EdgeUserModelData.sourceAnchor

起点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `sourceAnchor` 表示了这条边连入起点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。

- 是否必须：否；
- 类型： `number`；

### EdgeUserModelData.targetAnchor

终点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `targetAnchor` 表示了这条边连入终点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。

- 是否必须：否；
- 类型： `number`；
