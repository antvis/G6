---
title: EdgeDisplayModel 渲染数据
order: 11
---

EdgeDisplayModel（边的渲染/展示数据） 由 EdgeModel（内部流转数据）通过您配置在图实例上 mapper（[specification.edge](../graph/Specification.zh.md#edge)）映射后的结果，仅用于内部渲染时消费，您在其他任何地方不会消费它。数据类型继承自内部流转的边数据类型 [`EdgeModel`](./EdgeModel.zh.md)，扩展后定义如下：

```typescript
interface EdgeDisplayModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeDisplayModelData; // 扩展了 EdgeModelData
}
```

## id

边的唯一 ID，边创建后，ID 不可被修改。

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

EdgeDisplayModelData 中的数据已经是 EdgeModel 通过 Graph 实例上配置的对应 mapper（[specification.edge](../graph/Specification.zh.md#edge)）映射后的结果，这里面应当存储所有 EdgeModel 的内容，再额外加上许多的图形样式配置。

- **是否必须**: 是；
- **类型**: [`EdgeDisplayModelData`](#EdgeDisplayModelDatalodlevels)，基于 [`EdgeModel`](./EdgeModel.zh.md#edgemodeldatatype) 额外扩展内容如下文：

### EdgeDisplayModelData.lodLevels

对于该边而言，设定图缩放等级的划分方式。是一个缩放系数范围的数组，表示缩放等级的划分。其中有一项的 `primary` 应当为 `true`，代表该层级的序号为 0，`zoomRange` 小于当前层级的，序号递减；大于当前层级的，序号递增。序号为在下面的图形配置中 `lod` 所对应的值。

- **是否必须**: 否；
- **类型**: `LodLevel`[]，其中 `LodLevel` 如下表：

| Name        | Type               | Description                                                                                                                                                                                                                             |
| :---------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zoomRange` | `[number, number]` | 本层级所定义的图缩放等级范围，当图缩放等级 zoom >= zoomRange[0] && zoom < zoomRange[1] 时，表示在该层级下                                                                                                                               |
| `primary`   | `boolean`          | 是否为主层级，若为 `true` 则代表该层级的序号为 0，`zoomRange` 小于当前层级的，序号递减；大于当前层级的，序号递增。序号为在下面的图形配置中 `lod` 所对应的值。在 `EdgeDisplayModelData.lodLevels` 中，应当只有一个层级为 `primary: true` |

### EdgeDisplayModelData.animates

出现、消失、显示、隐藏、更新时，各个图形动画配置。支持一次更新，多个动画的顺序执行（`order`）。[动画 DEMO](/zh/examples/scatter/changePosition/#itemAnimates)。

- **是否必须**: 否；
- **类型**: `IAnimates`，定义如下：

```typescript
interface IAnimates {
  buildIn?: IAnimate[]; // 边中某些图形创建时的动画
  buildOut?: IAnimate[]; // 边中某些图形销毁时的动画
  show?: IAnimate[]; // 边中某些图形从隐藏变为显示时的动画
  hide?: IAnimate[]; // 边中某些图形从显示变为隐藏时的动画
  update?: (IAnimate | IStateAnimate)[]; // 边中某些图形在相关数据或状态更新时的动画
}
```

其中，`IAnimate` 定义如下：

| Name                   | Type       | Default                                      | Description                                                                                                                                   |
| :--------------------- | :--------- | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `IAnimate.fields`      | `string[]` | `undefined`                                  | 该动画相关的图形样式属性名称，例如 `['fill', 'lineWidth']`                                                                                    |
| `IAnimate.shapeId`     | `string`   | `group`                                      | 该动画需要在哪个图形上执行，此处指定该图形的 ID。不指定则代表整个图形分组上的动画                                                             |
| `IAnimate.order?`      | `number`   | `0`                                          | 该动画在 `IAnimate[]` 中执行的顺序，借此可实现一次更新多个动画的顺序播放                                                                      |
| `IAnimate.duration?`   | `number`   | `500`                                        | 该动画执行一次所使用的时间，该值越小，则动画速度越快                                                                                          |
| `IAnimate.iterations?` | `number`   | `1`                                          | 该动画执行的次数，-1 代表循环执行                                                                                                             |
| `IAnimate.easing?`     | `string`   | `'cubic-bezier(0.250, 0.460, 0.450, 0.940)'` | 该动画的缓动函数，可以设置的值可参考 [MDN easing 定义](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#easing) |

`IStateAnimate` 定义如下，即在 `IAnimate` 基础上增加了一个指定状态的字段 `states`，表示该动画在这些状态变更的时候执行：

```typescript
interface IStateAnimate extends IAnimate {
  states: string[];
}
```

### EdgeDisplayModelData.keyShape

边主图形的样式配置。边的主图形是边的整体路径图形。

- **是否必须**: 否；
- **类型**: `ShapeStyle`，根据不同的主图形，图形样式配置项不同。例如 `'line-edge'` 的主图形是 `'line'` 参考 [Line 图形样式](../shape/LineStyleProps.zh.md)；`'cubic-edge'` 的主图形是 `'path'` 参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

### EdgeDisplayModelData.iconShape

边的图标图形（内置边支持，继承这些内置边的自定义边在无复写相关内容的情况下同样支持），位于文本前方。可以是图片或文本，文本支持 iconfont。

- **是否必须**: 否；
- **类型**:

```typescript
Partial<
  TextStyleProps &
    ImageStyleProps &
    ShapeStyle & {
      offsetX?: number;
      offsetY?: number;
      lod?: number;
    }
>;
```

其中，相关的图形样式参考 [Text 图形样式](../shape/TextStyleProps.zh.md)，和 [Image 图形样式](../shape/ImageStyleProps.zh.md)。

### EdgeDisplayModelData.haloShape

在内置的边和主题中，`haloShape` 指的是边在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置边的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)。

- **是否必须**: 否；
- **类型**: `ShapeStyle`，`haloShape` 的图形类型跟随主图形(`keyShape`)。根据不同的主图形，图形样式配置项不同。例如 `'line-edge'` 的主图形是 `'line'` 参考 [Line 图形样式](../shape/LineStyleProps.zh.md)；`'cubic-edge'` 的主图形是 `'path'` 参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

### EdgeDisplayModelData.labelShape

边的文本图形，内置边或继承内置边（未复写相关内容）的自定义边均支持。

- **是否必须**: 否；
- **类型**:

```typescript
  TextStyleProps & {
    /**
     * 文本相对于边主图形 (keyShape) 的位置，支持在边的起始处、中央、结束处
     */
    position?: 'start' | 'middle' | 'end';
    /**
     * 文本图形相对于主图形 (keyShape) 在 x 方向上的偏移量
     */
    offsetX?: number;
    /**
     * 文本图形相对于主图形 (keyShape) 在 y 方向上的偏移量
     */
    offsetY?: number;
    /**
     * 文本图形相对于主图形 (keyShape) 在 z 方向上的偏移量
     */
    offsetZ?: number;
    /**
     * 允许文本的最大宽度，若指定为数字，则表示像素值，若指定为带有 '%' 的文本，代表相对于主图形 (keyShape) 包围盒大小的百分比。默认值为 '60%'，表示文本图形的最大宽度不可以超过主图形宽度的两倍。若超过，则自动截断并在末尾增加省略号 '...'
     */
    maxWidth?: string | number;
    /**
     * 文本是否跟随边旋转
     */
    autoRotate?: boolean;
  };
```

其中，相关的图形样式参考 [Text 图形样式](../shape/TextStyleProps.zh.md)。

### EdgeDisplayModelData.labelBackgroundShape

边的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

- **是否必须**: 否；
- **类型**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // 文本距离背景矩形四周的留白距离
};
```

其中，参考矩形样式类型 [`RectStyleProps`](../shape/RectStyleProps.zh.md)。

### EdgeDisplayModelData.badgeShape

边的徽标，包括了文本和背景图形。和节点支持多个徽标不同，内置边仅支持一个徽标，位于文本后方。

- **是否必须**: 否；
- **类型**:

```typescript
  ShapeStyleProps & {
    /**
     * 徽标的背景颜色
     */
    color?: string;
    /**
     * 徽标上文本的颜色
     */
    textColor?: string;
  }
```

### EdgeDisplayModelData.otherShapes

上面所有的 xxShape(s) 均为 G6 定义的规范边中可能存在的图形。自定义边中的其他图形应当定义和配置在 `otherShapes` 中。

- **是否必须**: 否；
- **类型**:

```typescript
{
  // key 为图形 id，规范格式为 xxShape
  // value 为图形样式配置（不同图形配置不同，见图形相关文档），以及图形的动画
  [shapeId: string]: ShapeStyleProps;
}
```

其中，不同的图形样式参考[图形样式](../shape/BaseStyleProps.zh.md)目录下对应的图形类型文档。
