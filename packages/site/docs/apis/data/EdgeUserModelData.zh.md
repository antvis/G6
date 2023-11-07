---
title: EdgeUserModelData
order: 4
---

用户输入数据中，每一项边数据的 data 部分的类型说明如下。

## 属性

### type

- 是否必须：`否`；
- 类型： `string`；
- 定义于：[packages/g6/src/types/edge.ts:16](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#L16)

边的渲染类型，可以是已经注册到图类上的边类型，内置并默认注册的有 `'line-edge'`，`'loop-edge'`。

### visible

- 是否必须：`否`；
- 类型： `boolean`；
- 定义于：[packages/g6/src/types/edge.ts:39](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#L39)

• `Optional` **visible**: `boolean`

边是否默认展示出来。

### color

- 是否必须：`否`；
- 类型： `string`；
- 定义于：[packages/g6/src/types/edge.ts:30](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#L30)

该边的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 keyShape 以及各种图形的图形样式。

### label

- 是否必须：`否`；
- 类型： `string`；
- 定义于：[packages/g6/src/types/edge.ts:36](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#36)

边 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 labelShape 的 text 值或其他图形样式。

### badge

- 是否必须：`否`；
- 类型：

```typescript
{
  position: BadgePosition,
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
};
```

- 定义于：[packages/g6/src/types/edge.ts:58](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#58)

边上的徽标配置，内置边的徽标绘制在文本后方。更多的样式配置应当在 Graph 实例的边 mapper 中配置 badgeShapes 的图形样式。

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

- 定义于：[packages/g6/src/types/edge.ts:44](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#44)

边上的 icon 配置。内置边的 icon 绘制在文本后方。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的边 mapper 中配置 iconShape 的图形样式。

### sourceAnchor

- 是否必须：`否`；
- 类型： `number`；
- 定义于：[packages/g6/src/types/edge.ts:20](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#20)

起点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `sourceAnchor` 表示了这条边连入起点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。

### targetAnchor

- 是否必须：`否`；
- 类型： `number`；
- 定义于：[packages/g6/src/types/edge.ts:21](https://github.com/antvis/G6/blob/v5/packages/g6/src/types/edge.ts#21)

终点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `sourceAnchor` 表示了这条边连入终点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。
