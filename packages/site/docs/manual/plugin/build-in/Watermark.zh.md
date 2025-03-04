---
title: Watermark 水印
---

支持使用文本和图片作为水印，实现原理是在 Graph 容器的 div 上加上 `background-image` 属性，然后就可以通过 css 来控制水印的位置和样式。对于文本，会使用隐藏 canvas 转成图片的方式来实现

<embed src="@/common/api/plugins/watermark.md"></embed>

**参考示例**：

- [文本水印](/examples/plugin/watermark/#text)
- [图片水印](/examples/plugin/watermark/#repeat)

## 配置项

### <Badge type="success">Required</Badge> type

> _`watermark` \| string_

此插件已内置，你可以通过 `type: 'watermark'` 来使用它。

### backgroundAttachment

> _string_

水印的背景定位行为

### backgroundBlendMode

> _string_

水印的背景混合

### backgroundClip

> _string_

水印的背景裁剪

### backgroundColor

> _string_

水印的背景颜色

### backgroundImage

> _string_

水印的背景图片

### backgroundOrigin

> _string_

水印的背景原点

### backgroundPosition

> _string_

水印的背景位置

### backgroundPositionX

> _string_

水印的背景位置-x

### backgroundPositionY

> _string_

水印的背景位置-y

### backgroundRepeat

> _string_ **Default:** `'repeat'`

水印的背景重复

### backgroundSize

> _string_

水印的背景大小

### height

> _number_ **Default:** `100`

水印的高度（单个）

### imageURL

> _string_

图片地址，如果有值，则使用，否则使用文本

### opacity

> _number_ **Default:** `0.2`

水印的透明度

### rotate

> _number_ **Default:** `Math.PI / 12`

水印的旋转角度

### text

> _string_

水印文本

### textAlign

> _'center' \| 'end' \| 'left' \| 'right' \| 'start'_ **Default:** `'center'`

文本水印的文本对齐方式

### textBaseline

> _'alphabetic' \| 'bottom' \| 'hanging' \| 'ideographic' \| 'middle' \| 'top'_ **Default:** `'middle'`

文本水印的文本对齐基线

### textFill

> _string_ **Default:** `'#000'`

文本水印的文字颜色

### textFontFamily

> _string_

文本水印的文本字体

### textFontSize

> _number_ **Default:** `16`

文本水印的文本大小

### textFontVariant

> _string_

文本水印的文本字体变体

### textFontWeight

> _string_

文本水印的文本字体粗细

### width

> _number_ **Default:** `200`

水印的宽度（单个）

## API
