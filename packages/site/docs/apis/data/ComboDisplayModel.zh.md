---
title: ComboDisplayModel 渲染数据
order: 12
---

ComboDisplayModel（Combo 的渲染/展示数据） 由 ComboModel（内部流转数据）通过您配置在图实例上 mapper（[specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，仅用于内部渲染时消费，您在其他任何地方不会消费它。数据类型继承自内部流转的 Combo 数据类型 [`ComboModel`](./ComboModel.zh.md)，扩展后定义如下：

```typescript
interface ComboDisplayModel {
  id: string | number;
  data: ComboDisplayModelData; // 扩展了 ComboModelData
}
```

## id

Combo 的唯一 ID，Combo 创建后，ID 不可被修改。

- **是否必须**: 是；
- **类型**: `string|number`

## data

ComboDisplayModelData 中的数据已经是 ComboModel 通过 Graph 实例上配置的对应 mapper（[specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，这里面应当存储所有 ComboModel 的内容，再额外加上许多的图形样式配置。

- **是否必须**: 是；
- **类型**: [`ComboDisplayModelData`](#combodisplaymodeldatalodlevels)，基于 [`ComboModel`](./ComboModel.zh.md#combomodeldatatype) 额外扩展内容如下文：

### ComboDisplayModelData.lodLevels

对于该 Combo 而言，设定图缩放等级的划分方式。是一个缩放系数范围的数组，表示缩放等级的划分。其中有一项的 `primary` 应当为 `true`，代表该层级的序号为 0，`zoomRange` 小于当前层级的，序号递减；大于当前层级的，序号递增。序号为在下面的图形配置中 `lod` 所对应的值。

- **是否必须**: 否；
- **类型**: `LodLevel`[]，其中 `LodLevel` 如下表：

| Name        | Type               | Description                                                                                                                                                                                                                              |
| :---------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zoomRange` | `[number, number]` | 本层级所定义的图缩放等级范围，当图缩放等级 zoom >= zoomRange[0] && zoom < zoomRange[1] 时，表示在该层级下                                                                                                                                |
| `primary`   | `boolean`          | 是否为主层级，若为 `true` 则代表该层级的序号为 0，`zoomRange` 小于当前层级的，序号递减；大于当前层级的，序号递增。序号为在下面的图形配置中 `lod` 所对应的值。在 `ComboDisplayModelData.lodLevels` 中，应当只有一个层级为 `primary: true` |

### ComboDisplayModelData.animates

出现、消失、显示、隐藏、更新时，各个图形动画配置。支持一次更新，多个动画的顺序执行（`order`）。[动画 DEMO](/zh/examples/scatter/changePosition/#itemAnimates)。

- **是否必须**: 否；
- **类型**: `IAnimates`，定义如下：

```typescript
interface IAnimates {
  buildIn?: IAnimate[]; // Combo 中某些图形创建时的动画
  buildOut?: IAnimate[]; // Combo 中某些图形销毁时的动画
  show?: IAnimate[]; // Combo 中某些图形从隐藏变为显示时的动画
  hide?: IAnimate[]; // Combo 中某些图形从显示变为隐藏时的动画
  update?: (IAnimate | IStateAnimate)[]; // Combo 中某些图形在相关数据或状态更新时的动画
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

### ComboDisplayModelData.keyShape

Combo 主图形的样式配置。Combo 的主图形表达了 Combo 的主要形状。还用于计算边的连入位置。

- **是否必须**: 否；
- **类型**: `ShapeStyle`，根据不同的主图形，图形样式配置项不同。例如 `'circle-combo'` 的主图形是 `'circle'` 参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)；`'rect-combo'` 的主图形是 `'rect'` 参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

### ComboDisplayModelData.haloShape

在内置的 Combo 和主题中，`haloShape` 指的是 Combo 在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置 Combo 的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)。

- **是否必须**: 否；
- **类型**: `ShapeStyle`，`haloShape` 的图形类型跟随主图形(`keyShape`)。根据不同的主图形，图形样式配置项不同。例如 `'circle-combo'` 的主图形是 `'circle'` 参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)；`'rect-combo'` 的主图形是 `'rect'` 参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

### ComboDisplayModelData.labelShape

Combo 的文本图形，内置 Combo 或继承内置 Combo（未复写相关内容）的自定义 Combo 均支持。

- **是否必须**: 否；
- **类型**:

```typescript
  TextStyleProps & {
    /**
     * 文本相对于 Combo 主图形 (keyShape) 的位置，可指定方位以及在 combo 的内部或外部
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'ouside-top'| 'ouside-left' | 'ouside-right' | 'ouside-bottom';
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
     * 允许文本的最大宽度，若指定为数字，则表示像素值，若指定为带有 '%' 的文本，代表相对于主图形 (keyShape) 包围盒大小的百分比。默认值为 '200%'，表示文本图形的最大宽度不可以超过主图形宽度的两倍。若超过，则自动截断并在末尾增加省略号 '...'
     */
    maxWidth?: string | number;
    /**
     * 文本旋转角度（弧度制）
     */
    angle?: number;
  };
```

其中，相关的图形样式参考 [Text 图形样式](../shape/TextStyleProps.zh.md)。

### ComboDisplayModelData.labelBackgroundShape

Combo 的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

- **是否必须**: 否；
- **类型**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // 文本距离背景矩形四周的留白距离
};
```

其中，参考矩形样式类型 [`RectStyleProps`](../shape/RectStyleProps.zh.md)。

### ComboDisplayModelData.badgeShapes

Combo 四周的徽标，单个徽标包括了 Combo 和背景图形，badgeShapes 配置的是多个徽标。

- **是否必须**: 否；
- **类型**:

```typescript
  {
    /**
     * 徽标的背景颜色（对所有徽标生效，优先级低于下面单个徽标的 color 设置）
     */
    color?: string;
    /**
     * 徽标背景颜色的色板，意味着下面各个徽标将自动取用该色板中的颜色。
     * 优先级低于下面单个徽标的 color 设置
     */
    palette?: string[];
    /**
     * 徽标上文本的颜色（对所有徽标生效，优先级低于下面单个徽标的 textColor 设置）
     */
    textColor?: string;
    /**
     * 单个徽标的样式配置，由县局高于上面的配置
     */
    [key: number]: ShapeStyle & {
     /**
       * 该徽标的位置，支持的取值见下文
       */
      position?: IBadgePosition;
      /**
       * 该徽标的背景色
       */
      color?: string;
      /**
       * 该徽标的文本色
       */
      textColor?: string;
    };
  }
```

`BadgePosition` 取值如下：

| Value           | Description                |
| :-------------- | :------------------------- |
| `'rightTop'`    | 右上角，推荐               |
| `'right'`       | 右侧中间，推荐             |
| `'rightBottom'` | 右下角，推荐               |
| `'leftTop'`     | 左上角                     |
| `'left'`        | 左侧中间                   |
| `'leftBottom'`  | 左下角                     |
| `'bottom'`      | 下方中间                   |
| `'top'`         | 上方中间                   |
| `'bottomRight'` | 右下角，同 `'rightBottom'` |
| `'bottomLeft'`  | 左下角，同 `'leftBottom'`  |
| `'topRight'`    | 右上角，同 `'rightTop'`    |
| `'topLeft'`     | 左上角，同 `'leftTop'`     |

### ComboDisplayModelData.anchorShapes

Combo 四周的边连入位置圆形图形（连接桩），anchorShapess 配置的是多个连接桩。

- **是否必须**: 否；
- **类型**:

```typescript
// 外层可配置对所有连接桩（圆形）的样式，优先级低于单独的连接桩配置
CircleStyleProps & {
  // 单独的连接桩图形配置，优先级高于外层的 CircleStyleProps
  [key: number]: CircleStyleProps & {
    // 该连接桩的位置，可配置字符串或数字数组表示相对于主图形 (keyShape) 包围盒的百分比位置，例如 [0.5, 1] 表示位于主图形的右侧中间
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

其中，相关的图形样式参考 [`CircleStyleProps` 圆形图形样式](../shape/CircleStyleProps.zh.md)。

### ComboDisplayModelData.otherShapes

上面所有的 xxShape(s) 均为 G6 定义的规范 Combo 中可能存在的图形。自定义 Combo 中的其他图形应当定义和配置在 `otherShapes` 中。

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
