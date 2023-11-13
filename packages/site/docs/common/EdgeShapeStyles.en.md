### KeyShapeStyle.startArrow

**Type**: `boolean` | `ArrowStyle`

**Default**: undefined

**Required**: No

**Description**: Arrow at the start of the edge.

<embed src="./ArrowStyle.en.md"></embed>

### KeyShapeStyle.endArrow

**Type**: `boolean` | `ArrowStyle`

**Default**: undefined

**Required**: No

**Description**: Arrow at the end of the edge. The arrow parameters are as mentioned above.

## LabelShapeStyle

Text graphic for the edge, supported by both built-in edges and custom edges that inherit from built-in edges (without overriding related content).

Basic graphic style refers to [Text Graphic Style](../../shape/TextStyleProps.en.md), with the following extended configurations:

### LabelShapeStyle.position

**Type**: `'start'` | `'middle'` | `'end'`

**Default**: `'middle'`

**Required**: No

**Description**: Position of the text relative to the main graphic (keyShape) of the edge, supporting placement at the start, middle, or end of the edge.

### LabelShapeStyle.offsetX

**Type**: `number`

**Default**: `0`

**Required**: No

**Description**: Offset of the text graphic from the main graphic (keyShape) in the x-direction.

### LabelShapeStyle.offsetY

**Type**: `number`

**Default**: `0`

**Required**: No

**Description**: Offset of the text graphic from the main graphic (keyShape) in the y-direction.

### LabelShapeStyle.offsetZ

**Type**: `number`

**Default**: `0`

**Required**: No

**Description**: Offset of the text graphic from the main graphic (keyShape) in the z-direction.

### LabelShapeStyle.autoRotate

**Type**: `boolean`

**Default**: `true`

**Required**: No

**Description**: Specifies whether the text rotates with the edge.

### LabelShapeStyle.maxWidth

**Type**: `string` | `number`

**Default**: `'200%'`

**Required**: No

**Description**: The maximum allowed width of the text. If specified as a number, it represents the value in pixels. If specified as a text with '%', it represents a percentage relative to the bounding box size of the main graphic (keyShape). The default value of `'200%'` means the maximum width of the text graphic can be up to twice the width of the main graphic. If exceeded, the text is automatically truncated and ellipsis `'...'` is added at the end.

## LabelBackgroundShapeStyle

Background graphic for the text of the edge, which is a rectangle. If not set, it is not displayed. Setting it to `{}` will display the text background graphic using the default style in the theme.

Basic graphic style refers to [Rect Graphic Style](../../shape/RectStyleProps.en.md), with the following extended configurations:

### LabelBackgroundShapeStyle.padding

**Type**: `number` | `number[]`

**Default**: undefined

**Required**: No

**Description**: Padding area around the text within the background rectangle.

## IconShapeStyle

边的图标图形，位于文本前方。

Icon graphic for the edge, located in front of the text.

**Type**: `ShapeStyle`. The `iconShape` graphic style configuration varies depending on the display form. For example, if the icon is text, supporting iconfont, refer to [Text Graphic Style](../../shape/TextStyleProps.en.md); if the icon is an image, refer to [Image Graphic Style](../../shape/ImageStyleProps.en.md).

Extended configurations are as follows:

### IconShapeStyle.offsetX

**Type**: `number`

**Default**: `0`

**Required**: No

**Description**: Offset of the icon graphic from the main graphic (keyShape) in the x-direction.

### IconShapeStyle.offsetY

**Type**: `number`

**Default**: `0`

**Required**: No

**Description**: Offset of the icon graphic from the main graphic (keyShape) in the y-direction.

## HaloShapeStyle

In built-in edges and themes, haloShape refers to the halo effect graphic displayed around the main graphic (keyShape) of the edge in active (usually triggered when the mouse hovers) and selected (usually triggered in the selected state) states. In the logic of built-in edges, the graphic type and color of haloShape follow the main graphic (keyShape).

**Type**: `ShapeStyle`. The graphic type of `haloShape` follows the main graphic (`keyShape`). The graphic style configuration varies depending on the main graphic. For example, the main graphic of `'line-edge'` is `'line'`, refer to [Line Graphic Style](../shape/LineStyleProps.en.md); the main graphic of `'cubic-edge'` is `'path'`, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

**Required**: No
