## iconShape

**类型**：`IconShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">IconShapeStyle</summary>

```typescript
type IconShapeStyle = Partial<
  TextStyleProps &
    ImageStyleProps &
    ShapeStyle & {
      /**
       *  图标图形相对于主图形 (keyShape) 在 x 方向上的偏移量
       */
      offsetX?: number;
      /**
       *  图标图形相对于主图形 (keyShape) 在 y 方向上的偏移量
       */
      offsetY?: number;
      lod?: number;
    }
>;
```

`iconShape` 根据不同的展示形式，图形样式配置项不同。例如图标为文本，支持 **iconfont**，参考 [Text 图形样式](../../shape/TextStyleProps.zh.md)；图标为图片。参考 [Image 图形样式](../../shape/ImageStyleProps.zh.md)。

</details>

**默认值**：undefined

边的图标图形，位于文本前方。

## haloShape

**类型**: `HaloShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">HaloShapeStyle</summary>

说明，`haloShape` 的图形类型跟随主图形(`keyShape`)。根据不同的主图形，图形样式配置项不同。例如 `'line-edge'` 的主图形是 `'line'` 参考 [Line 图形样式](../shape/LineStyleProps.zh.md)；`'cubic-edge'` 的主图形是 `'path'` 参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

</details>

**默认值**：undefined

在内置的边和主题中，`haloShape` 指的是边在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置边的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)。

## labelShape

**类型**：`LabelShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelShapeStyle</summary>

```typescript
type LabelShapeStyle = TextStyleProps & {
  /**
   *  文本相对于边主图形 (keyShape) 的位置，支持在边的起始处、中央、结束处。
   */
  position?: 'start' | 'middle' | 'end';
  /**
   *  文本图形相对于主图形 (keyShape) 在 x 方向上的偏移量。
   */
  offsetX?: number;
  /**
   *  文本图形相对于主图形 (keyShape) 在 y 方向上的偏移量
   */
  offsetY?: number;
  /**
   *  文本图形相对于主图形 (keyShape) 在 z 方向上的偏移量
   */
  offsetZ?: number;
  /**
   *  文本是否跟随边旋转
   */
  autoRotate?: boolean;
  /**
   * 允许文本的最大宽度，若指定为数字，则表示像素值。
   * 若指定为带有 '%' 的文本，代表相对于主图形 (keyShape) 包围盒大小的百分比。
   * 默认值为 `'200%'`，表示文本图形的最大宽度不可以超过主图形宽度的两倍。
   * 若超过，则自动截断并在末尾增加省略号 `'...'`
   **/
  maxWidth?: string | number;
};
```

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "position": "middle",
  "offsetX": 0,
  "offsetY": 0,
  "autoRotate": true,
  "maxWidth": "200%"
}
```

</details>

边的文本图形，内置边或继承内置边（未复写相关内容）的自定义边均支持。

## labelBackgroundShape

**类型**：`LabelShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelShapeStyle</summary>

```typescript
type LabelShapeStyle = RectStyleProps & {
  /**
   *  文本距离背景矩形四周的内边距区域
   */
  padding?: number | number[];
};
```

其中，相关的图形样式参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

</details>

**默认值**：undefined

边的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

## otherShapes

**类型**: `OtherShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">OtherShapesStyle</summary>

```typescript
type OtherShapesStyle = {
  /**
   * key 为图形 id，规范格式为 xxShape
   */
  /**
   * value 为图形样式配置（不同图形配置不同，见图形相关文档），以及图形的动画
   */
  [shapeId: string]: ShapeStyleProps;
};
```

其中，不同的图形样式参考[图形样式](../shape/BaseStyleProps.zh.md)目录下对应的图形类型文档。

</details>

**默认值**：undefined

上面所有的 xxShape(s) 均为 G6 定义的规范边中可能存在的图形。自定义边中的其他图形应当定义和配置在 `otherShapes` 中。
