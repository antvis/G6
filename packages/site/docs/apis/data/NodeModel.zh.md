---
title: NodeModel 内部数据
order: 6
---

NodeModel 为内部流转的节点数据，由 NodeUserModel 经过皮质在图实例上的 transforms 计算而得。后续您在任意地方消费的都是这一份数据。每一项节点的类型继承自 [`NodeUserModel`](./NodeUserModel.zh.md)，扩展后定义如下：

```typescript
interface NodeModel {
  id: string | number;
  data: NodeModelData; // = NodeModelData
}
```

## id

节点的唯一 ID，节点创建后，ID 不可被修改。

- **是否必须**: 是；
- **类型**: `string|number`

## data

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

- **是否必须**: 是；
- **类型**: `NodeModelData`，同 [`NodeUserModelData`](./NodeUserModel.zh.md#nodeusermodeldatatype) 定义如下：

### NodeModelData.type

节点的渲染类型，可以是已经注册到图类上的节点类型，内置并默认注册的有 `'circle-node'`，`'rect-node'`，`'image-node'`。默认为 `'circle-node'`。

- **是否必须**: 否；
- **类型**: `string`；

### NodeModelData.x

节点的 x 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

- **是否必须**: 否；
- **类型**: `number`；

### NodeModelData.y

节点的 y 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

- **是否必须**: 否；
- **类型**: `number`；

### NodeModelData.z

对于 2D 的图，不需要指定 z 值。若指定可能导致 WebGL 渲染器下节点看不见。在 3D 图中，z 值是必须的，代表节点的 z 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

- **是否必须**: 否；
- **类型**: `number`；

### NodeModelData.visible

节点是否默认展示出来。

- **是否必须**: 否；
- **类型**: `boolean`；

### NodeModelData.color

该节点主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 keyShape 以及各种图形的图形样式。

- **是否必须**: 否；
- **类型**: `string`；

### NodeModelData.label

节点 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 labelShape 的 text 值或其他图形样式。

- **是否必须**: 否；
- **类型**: `string`；

### NodeModelData.badges

节点四周的徽标配置，其中的可配置的位置 `BadgePosition` 见后方。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 `badgeShapes` 的图形样式。

- **是否必须**: 否；
- **类型**:

```typescript
{
  position: BadgePosition,
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}[];
```

```typescript
BadgePosition: 'rightTop' |
  'right' |
  'rightBottom' |
  'bottomRight' |
  'bottom' |
  'bottomLeft' |
  'leftBottom' |
  'left' |
  'leftTop' |
  'topLeft' |
  'top' |
  'topRight';
```

### NodeModelData.icon

节点中心 icon 的配置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 iconShape 的图形样式。

- **是否必须**: 否；
- **类型**:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

### NodeModelData.anchorPoints

该节点四周连接图形的位置，也是边连入的位置。若不配置，边则自动寻找节点边缘最近的位置进行连接。例如 `[[0,0.5],[1,0.5]]`，数字表示在 x 或 y 方向上相对于节点主图形（keyShape）的百分比位置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 anchorShapes 的图形样式。

- **是否必须**: 否；
- **类型**: `number[][]`；

### NodeModelData.parentId

在有 combo 的图上表示该节点所属的 combo 的 id。

- **是否必须**: 否；
- **类型**: `string | number`；

### NodeModelData.isRoot

若要将该份数据作为树图展示，同时使用树图布局时，指定该节点是否为树的根节点之一。

- **是否必须**: 否；
- **类型**: `boolean`；

### NodeModelData.preventPolylineEdgeOverlap

是否将该节点作为一个障碍物，使 `'polyline-edge'` 类型的边躲避。默认为 `false`。

- **是否必须**: 否；
- **类型**: `boolean`；
