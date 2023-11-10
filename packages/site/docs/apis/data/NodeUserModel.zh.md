---
title: NodeUserModel
order: 3
---

用户输入数据中，每一项节点类型：

```typescript
interface NodeUserModel {
  id: string | number;
  data: NodeUserModelData;
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

节点的唯一 ID，节点创建后，ID 不可被修改。

## data

- **是否必须**: 是；
- **类型**: [`NodeUserModelData`](#nodeusermodeldatatype)，详细见下文

节点除 ID 以外的的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](../graph/Specification.zh.md#transforms)。转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的节点 mapper 进行映射，见 [Specification.node](../graph/Specification.zh.md#node)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。

### NodeUserModelData.type

- **是否必须**: 否；
- **类型**: `string`；

节点的渲染类型，可以是已经注册到图类上的节点类型，内置并默认注册的有 `'circle-node'`，`'rect-node'`，`'image-node'`。

### NodeUserModelData.x

- **是否必须**: 否；
- **类型**: `number`；

节点的 x 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### NodeUserModelData.y

- **是否必须**: 否；
- **类型**: `number`；

节点的 y 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### NodeUserModelData.z

- **是否必须**: 否；
- **类型**: `number`；

对于 2D 的图，不需要指定 z 值。若指定可能导致 WebGL 渲染器下节点看不见。在 3D 图中，z 值是必须的，代表节点的 z 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### NodeUserModelData.visible

- **是否必须**: 否；
- **类型**: `boolean`；

节点是否默认展示出来。

### NodeUserModelData.color

- **是否必须**: 否；
- **类型**: `string`；

该节点主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 keyShape 以及各种图形的图形样式。

### NodeUserModelData.label

- **是否必须**: 否；
- **类型**: `string`；

节点 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 labelShape 的 text 值或其他图形样式。

### NodeUserModelData.badges

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

节点四周的徽标配置，其中的可配置的位置 `BadgePosition` 如下。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 badgeShapes 的图形样式。

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

### NodeUserModelData.icon

- **是否必须**: 否；
- **类型**:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

节点中心 icon 的配置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 iconShape 的图形样式。

### NodeUserModelData.anchorPoints

- **是否必须**: 否；
- **类型**: `number[][]`；

该节点四周连接图形的位置，也是边连入的位置。若不配置，边则自动寻找节点边缘最近的位置进行连接。例如 `[[0,0.5],[1,0.5]]`，数字表示在 x 或 y 方向上相对于节点主图形（keyShape）的百分比位置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 anchorShapes 的图形样式。

### NodeUserModelData.parentId

- **是否必须**: 否；
- **类型**: `string | number`；

在有 combo 的图上表示该节点所属的 combo 的 id。

### NodeUserModelData.isRoot

- **是否必须**: 否；
- **类型**: `boolean`；

若要将该份数据作为树图展示，同时使用树图布局时，指定该节点是否为树的根节点之一。

### NodeUserModelData.preventPolylineEdgeOverlap

- **是否必须**: 否；
- **类型**: `boolean`；

是否将该节点作为一个障碍物，使 `'polyline-edge'` 类型的边躲避。默认为 `false`。
