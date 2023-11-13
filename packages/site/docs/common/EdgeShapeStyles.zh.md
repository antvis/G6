### KeyShapeStyle.startArrow

**类型**：`boolean` | `ArrowStyle`

**默认值**：undefined

**是否必须**：否

**说明**：边的起始端箭头。

<embed src="./ArrowStyle.zh.md"></embed>

### KeyShapeStyle.endArrow

**类型**：`boolean` | `ArrowStyle`

**默认值**：undefined

**是否必须**：否

**说明**：边的结束端箭头。箭头参数同上。

## LabelShapeStyle

边的文本图形，内置边或继承内置边（未复写相关内容）的自定义边均支持。

此处图形样式参考 [Text 图形样式](../../shape/TextStyleProps.zh.md)，扩展配置如下：

### LabelShapeStyle.position

**类型**：`'start'` | `'middle'` | `'end'`

**默认值**：`'middle'`

**是否必须**：否

**说明**：文本相对于边主图形 (keyShape) 的位置，支持在边的起始处、中央、结束处。

### LabelShapeStyle.offsetX

**类型**：`number`

**默认值**：`0`

**是否必须**：否

**说明**：文本图形相对于主图形 (keyShape) 在 x 方向上的偏移量。

### LabelShapeStyle.offsetY

**类型**：`number`

**默认值**：`0`

**是否必须**：否

**说明**：文本图形相对于主图形 (keyShape) 在 y 方向上的偏移量。

### LabelShapeStyle.offsetZ

**类型**：`number`

**默认值**：`0`

**是否必须**：否

**说明**：文本图形相对于主图形 (keyShape) 在 z 方向上的偏移量。

### LabelShapeStyle.autoRotate

**类型**：`boolean`

**默认值**：`true`

**是否必须**：否

**说明**：文本是否跟随边旋转。

### LabelShapeStyle.maxWidth

**类型**：`string` | `number`

**默认值**：`'200%'`

**是否必须**：否

**说明**：允许文本的最大宽度，若指定为数字，则表示像素值，若指定为带有 '%' 的文本，代表相对于主图形 (keyShape) 包围盒大小的百分比。默认值为 `'200%'`，表示文本图形的最大宽度不可以超过主图形宽度的两倍。若超过，则自动截断并在末尾增加省略号 `'...'`。

## LabelBackgroundShapeStyle

边的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

此处图形样式参考 [Rect 图形样式](../../shape/RectStyleProps.zh.md)，扩展配置如下：

### LabelBackgroundShapeStyle.padding

**类型**：`number` | `number[]`

**默认值**：undefined

**是否必须**：否

**说明**：文本距离背景矩形四周的内边距区域。

## IconShapeStyle

边的图标图形，位于文本前方。

**类型**: `ShapeStyle`，`iconShape` 根据不同的展示形式，图形样式配置项不同。例如图标为文本，支持 **iconfont**，参考 [Text 图形样式](../../shape/TextStyleProps.zh.md)；图标为图片。参考 [Image 图形样式](../../shape/ImageStyleProps.zh.md)。

扩展配置如下：

### IconShapeStyle.offsetX

**类型**：`number`

**默认值**：`0`

**是否必须**：否

**说明**：图标图形相对于主图形 (keyShape) 在 x 方向上的偏移量。

### IconShapeStyle.offsetY

**类型**：`number`

**默认值**：`0`

**是否必须**：否

**说明**：图标图形相对于主图形 (keyShape) 在 y 方向上的偏移量。

## HaloShapeStyle

在内置的边和主题中，`haloShape` 指的是边在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置边的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)。

**类型**: `ShapeStyle`，`haloShape` 的图形类型跟随主图形(`keyShape`)。根据不同的主图形，图形样式配置项不同。例如 `'line-edge'` 的主图形是 `'line'` 参考 [Line 图形样式](../shape/LineStyleProps.zh.md)；`'cubic-edge'` 的主图形是 `'path'` 参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

**是否必须**: 否
