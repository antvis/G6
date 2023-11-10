## anchor

**类型**：`string` | `number[]`

**默认值**：`[0, 0]`

**是否必须**：false

**说明**：图形的原点（锚点）位置，基于包围盒定义，取值范围 `[0, 0]` ~ `[1, 1]`，其中 `[0, 0]` 代表包围盒左上角，`[1, 1]` 代表右下角

不同图形的默认锚点如下，示例：

- Circle，Ellipse 为圆心位置 `[0.5, 0.5]`
- Rect，Image，Line，Polyline，Polygon，Path 为包围盒左上角顶点位置 `[0, 0]`
- Text 为文本锚点位置，应该使用 textBaseline 与 textAlign 这两个属性设置，因此设置此属性无效
- Group 无几何定义，因此设置此属性无效

## className

**类型**：`string`

**默认值**：`''`

**是否必须**：false

**说明**：元素的 class 属性的值，多个 class 用空格分隔

## clipPath

**类型**：`DisplayObject`

**默认值**：`null`

**是否必须**：false

**说明**：使用裁剪方式创建元素的可显示区域，区域内的部分显示，区域外的隐藏

## cursor

**类型**：`string`

**默认值**：`'default'`

**是否必须**：false

**说明**：指针悬停在元素上时的样式，可选值参考：[CSS cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)

## fill

**类型**：`string`

**默认值**：`'none'`

**是否必须**：false

**说明**：图形填充的颜色

## fillOpacity

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：图形填充的透明度，取值范围为 `[0, 1]`

## fillRule

**类型**：`'nonzero'` | `'evenodd'`

**默认值**：`'nonzero'`

**是否必须**：false

**说明**：图形填充的规则

## filter

**类型**：`string`

**默认值**：`'none'`

**是否必须**：false

**说明**：滤镜可以对已生成的图像进行一些处理，例如模糊、高亮、提升对比度等

- CSS Filter：https://developer.mozilla.org/en-US/docs/Web/CSS/filter
- Canvas Filter：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/filter
- SVG Filter：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/filter
- WebGL 中一般称作后处理

## lineCap

**类型**：`'butt'` | `'round'` | `'square'`

**默认值**：`'butt'`

**是否必须**：false

**说明**：图形描边的端点样式

- 'butt' 线段末端以方形结束
- 'round' 线段末端以圆形结束
- 'square' 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域

## lineDash

**类型**：`number[]`

**默认值**：`[]`

**是否必须**：false

**说明**：图形描边的虚线样式，数组中的值依次为虚线长度，虚线间隔，虚线长度，虚线间隔，...

## lineDashOffset

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：图形描边的虚线偏移量

## lineJoin

**类型**：`'miter'` | `'round'` | `'bevel'`

**默认值**：`'miter'`

**是否必须**：false

**说明**：连接处样式

- 'miter' 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域
- 'round' 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度
- 'bevel' 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角

## lineWidth

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：图形描边的宽度

## miterLimit

**类型**：`number`

**默认值**：`10`(Canvas) `4`(SVG)

**是否必须**：false

**说明**：当 lineJoin 为 'miter' 时，设置斜接面限制比例

## opacity

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：图形的透明度，取值范围为 `[0, 1]`

## pointerEvents

**类型**：`'none'` | `'auto'` | `'stroke'` | `'fill'` | `'painted'` | `'visible'` | `'visiblestroke'` | `'visiblefill'` | `'visiblepainted'` | `'all'` | `'non-transparent-pixel'`

**默认值**：`'auto'`

**是否必须**：false

**说明**：设置图形如何响应交互事件，可参考：https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events

## shadowBlur

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：阴影的模糊级别，值越大越模糊

## shadowColor

**类型**：`string`

**默认值**：`'none'`

**是否必须**：false

**说明**：阴影的颜色

## shadowType

**类型**：`'inner'` | `'outer'`

**默认值**：`'outer'`

**是否必须**：false

**说明**：阴影类型

- `'outer'` 外阴影，阴影在图形填充或者描边的外侧
- `'inner'` 内阴影，阴影在图形内部

## shadowOffsetX

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：阴影在 x 轴方向的偏移量

## shadowOffsetY

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：阴影在 y 轴方向的偏移量

## stroke

**类型**：`string`

**默认值**：`'none'`

**是否必须**：false

**说明**：图形描边的颜色

## strokeOpacity

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：图形描边的透明度，取值范围为 `[0, 1]`

## visibility

**类型**：`'visible'` | `'hidden'`

**默认值**：`'visible'`

**是否必须**：false

**说明**：元素的可见性

## zIndex

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：元素的层级，值越大越靠上
