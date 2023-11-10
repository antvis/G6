---
title: BaseStyleProps
---

BaseStyleProps are the basic style configuration items for all shapes. All shapes can use these configurations

## anchor

**Type**: `string | number[]`

**Default**: `[0, 0]`

**Required**: false

**Description**: The origin (anchor) position of the graphic, based on the bounding box definition, ranging from `[0, 0]` to `[1, 1]`, where `[0, 0]` represents the top-left corner of the bounding box, and `[1, 1]` represents the bottom-right corner

- Circle, Ellipse at the center position `[0.5, 0.5]`
- Rect, Image, Line, Polyline, Polygon, Path at the top-left vertex position of the bounding box `[0, 0]`
- Text at the text anchor position, should use the textBaseline and textAlign properties to set, so setting this property is invalid
- Group has no geometric definition, so setting this property is invalid

## className

**Type**: `string`

**Default**: `''`

**Required**: false

**Description**: The value of the class attribute of the element. Multiple classes are separated by spaces

## clipPath

**Type**: `DisplayObject`

**Default**: `null`

**Required**: false

**Description**: Use clipping to create the displayable area of the element, where the part inside the area is displayed, and the part outside is hidden

## cursor

**Type**: `string`

**Default**: `'default'`

**Required**: false

**Description**: The style of the pointer when hovering over the element, optional values refer to: [CSS cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)。

## fill

**Type**: `string`

**Default**: `'none'`

**Required**: false

**Description**: The color used to fill the shape

## fillOpacity

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The opacity of the shape's fill, with a value range of `[0, 1]`

## fillRule

**Type**: `'nonzero' | 'evenodd'`

**Default**: `'nonzero'`

**Required**: false

**Description**: The rule for filling the shape

## filter

**Type**: `string`

**Default**: `'none'`

**Required**: false

**Description**: Filters can process an already generated image, such as blurring, highlighting, increasing contrast, etc

- CSS Filter：https://developer.mozilla.org/en-US/docs/Web/CSS/filter
- Canvas Filter：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/filter
- SVG Filter：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/filter
- In WebGL, it is generally called post-processing

## lineCap

**Type**: `'butt' | 'round' | 'square'`

**Default**: `'butt'`

**Required**: false

**Description**: The style of the endpoints of the shape's stroke

- 'butt' Default value. The end of the line segment ends in a square
- 'round' The end of the line segment ends in a circle
- 'square' The end of the line segment ends in a square, but adds a rectangle with the same width as the line segment and half the thickness of the line segment

## lineDash

**Type**: `number[]`

**Default**: `[]`

**Required**: false

**Description**: The dash style of the shape's stroke, with values in the array alternating between dash length and spacing

## lineDashOffset

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: The dash offset for the shape's stroke

## lineJoin

**Type**: `'miter' | 'round' | 'bevel'`

**Default**: `'miter'`

**Required**: false

**Description**: The style of the stroke's joints

- 'miter' Default value. By extending the outer edge of the connected part, it intersects at one point to form an additional rhombus area
- 'round' By filling an additional sector with the center at the end of the connected part, the shape of the corner is drawn. The radius of the rounded corner is the width of the line segment
- 'bevel' Fill an additional triangular area at the end of the connected part, and each part has its own independent rectangular corner

## lineWidth

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The width of the shape's stroke

## miterLimit

**Type**: `number`

**Default**: `10`(Canvas) `4`(SVG)

**Required**: false

**Description**: When lineJoin is set to 'miter', this sets the miter limit ratio

## opacity

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The opacity of the shape, with a value range of `[0, 1]`

## pointerEvents

**Type**: `'none'` | `'auto'` | `'stroke'` | `'fill'` | `'painted'` | `'visible'` | `'visiblestroke'` | `'visiblefill'` | `'visiblepainted'` | `'all'` | `'non-transparent-pixel'`

**Default**: `'auto'`

**Required**: false

**Description**: How the shape responds to interactive events, for reference: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events

## shadowBlur

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: The level of blur for the shadow, with higher values indicating more blur

## shadowColor

**Type**: `string`

**Default**: `'none'`

**Required**: false

**Description**: The color of the shadow

## shadowType

**Type**: `'inner'` | `'outer'`

**Default**: `'outer'`

**Required**: false

**Description**: The type of shadow

- `'outer'` Outer shadow, the shadow is outside the shape's fill or stroke
- `'inner'` Inner shadow, the shadow is inside the shape

## shadowOffsetX

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: The offset of the shadow in the x-axis direction

## shadowOffsetY

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: The offset of the shadow in the y-axis direction

## stroke

**Type**: `string`

**Default**: `'none'`

**Required**: false

**Description**: The color of the shape's stroke

## strokeOpacity

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The opacity of the shape's stroke, with a value range of `[0, 1]`

## visibility

**Type**: `'visible' | 'hidden'`

**Default**: `'visible'`

**Required**: false

**Description**: The visibility of the element

## zIndex

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: The z-index of the element, with higher values being closer to the top
