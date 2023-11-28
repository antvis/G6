## labelShape

**类型**: `LabelShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelShapeStyle</summary>

```typescript
type LabelShapeStyle = TextStyleProps & {
  /**
   * 文本相对于 Combo 主图形 (keyShape) 的位置，可指定方位以及在 combo 的内部或外部
   */
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'left-top'
    | 'ouside-top'
    | 'ouside-left'
    | 'ouside-right'
    | 'ouside-bottom';
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
};
```

其中，相关的图形样式参考 [Text 图形样式](../shape/TextStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "position": "bottom",
  "maxWidth": "200%"
}
```

</details>

Combo 的文本图形

## labelBackgroundShape

**类型**: `LabelBackgroundShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelBackgroundShapeStyle</summary>

```typescript
type LabelBackgroundShapeStyle = ShapeStyle & {
  /**
   * 文本距离背景矩形四周的留白距离
   */
  padding?: number | number[];
};
```

其中，相关的图形样式参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

</details>

**默认值**：undefined

Combo 的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

## haloShape

**类型**: `HaloShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">HaloShapeStyle</summary>

```typescript
type HaloShapeStyle = ShapeStyle;
```

`haloShape` 的图形类型跟随主图形(`keyShape`)。根据不同的主图形，图形样式配置项不同。例如 `'circle-combo'` 的主图形是 `'circle'` 参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)；`'rect-combo'` 的主图形是 `'rect'` 参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

</details>

**默认值**：undefined

在内置的 Combo 和主题中，`haloShape` 指的是 Combo 在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置 Combo 的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)。

## badgeShapes

**类型**: `BadgeShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">BadgeShapesStyle</summary>

```typescript
type IBadgePosition =
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop'
  | 'topLeft'
  | 'top'
  | 'topRight';

type BadgeShapesStyle = {
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
};
```

其中，相关的图形样式参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

</details>

**默认值**：undefined

Combo 四周的徽标，单个徽标包括了 Combo 和背景图形，badgeShapes 配置的是多个徽标。

## anchorShapes

**类型**: `AnchorShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">AnchorShapesStyle</summary>

```typescript
/**
 * 外层可配置对所有连接桩（圆形）的样式，优先级低于单独的连接桩配置
 */
type AnchorShapesStyle = StyleProps & {
  /**
   * 单独的连接桩图形配置，优先级高于外层的 CircleStyleProps
   */
  [key: number]: StyleProps & {
    /**
     * 该连接桩的位置，可配置字符串或数字数组表示相对于主图形 (keyShape) 包围盒的百分比位置，例如 [0.5, 1] 表示位于主图形的右侧中间
     */
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

其中，相关的图形样式参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)。

</details>

**默认值**：undefined

Combo 四周的边连入位置圆形图形（连接桩），anchorShapes 配置的是多个连接桩。

## otherShapes

**类型**：`OtherShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">OtherShapeStyle</summary>

```typescript
type OtherShapeStyle = {
  // key 为图形 id，规范格式为 xxShape
  // value 为图形样式配置（不同图形配置不同，见图形相关文档），以及图形的动画
  [shapeId: string]: ShapeStyleProps;
};
```

其中，不同的图形样式参考[图形样式](../shape/BaseStyleProps.zh.md)目录下对应的图形类型文档。

</details>

**默认值**：undefined

上面所有的 xxShape(s) 均为 G6 定义的规范 Combo 中可能存在的图形。自定义 Combo 中的其他图形应当定义和配置在 `otherShapes` 中。
