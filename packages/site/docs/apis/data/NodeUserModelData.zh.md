---
title: NodeUserModelData
order: 3
---

用户输入数据中，每一项节点数据的 data 部分的类型说明如下。

## 属性

### type

- 是否必须：`否`；
- 类型： `string`；

节点的渲染类型，可以是已经注册到图类上的节点类型，内置并默认注册的有 `'circle-node'`，`'rect-node'`，`'image-node'`。

### x

- 是否必须：`否`；
- 类型： `number`；

节点的 x 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### y

- 是否必须：`否`；
- 类型： `number`；

节点的 y 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### z

- 是否必须：`否`；
- 类型： `number`；

对于 2D 的图，不需要指定 z 值。若指定可能导致 WebGL 渲染器下节点看不见。在 3D 图中，z 值是必须的，代表节点的 z 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### visible

- 是否必须：`否`；
- 类型： `boolean`；

• `Optional` **visible**: `boolean`

节点是否默认展示出来。

### color

- 是否必须：`否`；
- 类型： `string`；

该节点主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 keyShape 以及各种图形的图形样式。

### label

- 是否必须：`否`；
- 类型： `string`；

节点 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 labelShape 的 text 值或其他图形样式。

### badges

- 是否必须：`否`；
- 类型：

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

### icon

- 是否必须：`否`；
- 类型：

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

节点中心 icon 的配置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 iconShape 的图形样式。

### anchorPoints

- 是否必须：`否`；
- 类型： `number[][]`；

该节点四周连接图形的位置，也是边连入的位置。若不配置，边则自动寻找节点边缘最近的位置进行连接。例如 `[[0,0.5],[1,0.5]]`，数字表示在 x 或 y 方向上相对于节点主图形（keyShape）的百分比位置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 anchorShapes 的图形样式。

### parentId

- 是否必须：`否`；
- 类型： `string | number`；

在有 combo 的图上表示该节点所属的 combo 的 id。

### isRoot

- 是否必须：`否`；
- 类型： `boolean`；

若要将该份数据作为树图展示，同时使用树图布局时，指定该节点是否为树的根节点之一。

### preventPolylineEdgeOverlap

- 是否必须：`否`；
- 类型： `boolean`；

是否将该节点作为一个障碍物，使 `'polyline-edge'` 类型的边躲避。默认为 `false`。
