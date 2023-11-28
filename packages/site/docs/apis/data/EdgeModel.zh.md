---
title: EdgeModel 内部数据
order: 8
---

EdgeModel 为内部流转的边数据，由 EdgeUserModel 经过皮质在图实例上的 transforms 计算而得。后续您在任意地方消费的都是这一份数据。每一项边的类型继承自 [`EdgeUserModel`](./EdgeUserModel.zh.md)，扩展后定义如下：

```typescript
interface EdgeModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeModelData; // = EdgeModelData
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

边的唯一 ID，节点创建后，ID 不可被修改。

## source

- **是否必须**: 是；
- **类型**: `string|number`

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

## target

- **是否必须**: 是；
- **类型**: `string|number`

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

## data

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

- **是否必须**: 是；
- **类型**: `EdgeModelData`，同 [`EdgeModelData`](./EdgeUserModel.zh.md#EdgeModelDatatype) 定义如下：

### EdgeModelData.type

- **是否必须**: 否；
- **类型**: `string`；

边的渲染类型，可以是已经注册到图类上的边类型，内置并默认注册的有 `'line-edge'`，`'loop-edge'`。默认为 `'line-edge'`。

### EdgeModelData.visible

- **是否必须**: 否；
- **类型**: `boolean`；

边是否默认展示出来。

### EdgeModelData.color

- **是否必须**: 否；
- **类型**: `string`；

该边的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 keyShape 以及各种图形的图形样式。

### EdgeModelData.label

- **是否必须**: 否；
- **类型**: `string`；

边 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 labelShape 的 text 值或其他图形样式。

### EdgeModelData.badge

- **是否必须**: 否；
- **类型**:

```typescript
{
  position: BadgePosition,
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
};
```

边上的徽标配置，内置边的徽标绘制在文本后方。更多的样式配置应当在 Graph 实例的边 mapper 中配置 badgeShapes 的图形样式。

### EdgeModelData.icon

- **是否必须**: 否；
- **类型**:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

边上的 icon 配置。内置边的 icon 绘制在文本后方。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 iconShape 的图形样式。

### EdgeModelData.sourceAnchor

- **是否必须**: 否；
- **类型**: `number`；

起点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `sourceAnchor` 表示了这条边连入起点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。

### EdgeModelData.targetAnchor

- **是否必须**: 否；
- **类型**: `number`；

终点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `targetAnchor` 表示了这条边连入终点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。
