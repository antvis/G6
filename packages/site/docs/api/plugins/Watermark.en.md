---
title: Watermark
---

Support using text and image as watermark, the principle is to add the `background-image` property to the div of the Graph container, and then you can control the position and style of the watermark through css. For text, it will be converted to an image using a hidden canvas

<embed src="@/common/api/plugins/watermark.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### backgroundAttachment

> _string_

The background attachment of watermark

### backgroundBlendMode

> _string_

The background blend of watermark

### backgroundClip

> _string_

The background clip of watermark

### backgroundColor

> _string_

The background color of watermark

### backgroundImage

> _string_

The background image of watermark

### backgroundOrigin

> _string_

The background origin of watermark

### backgroundPosition

> _string_

The background position of watermark

### backgroundPositionX

> _string_

The background position-x of watermark

### backgroundPositionY

> _string_

The background position-y of watermark

### backgroundRepeat

> _string_ **Default:** `'repeat'`

The background repeat of watermark

### backgroundSize

> _string_

The background size of watermark

### height

> _number_ **Default:** `100`

The height of watermark(single)

### imageURL

> _string_

The image url, if it has a value, it will be used, otherwise it will use the text

### opacity

> _number_ **Default:** `0.2`

The opacity of watermark

### rotate

> _number_ **Default:** `Math.PI / 12`

The rotate angle of watermark

### text

> _string_

The text of watermark

### textAlign

> _'center' \| 'end' \| 'left' \| 'right' \| 'start'_ **Default:** `'center'`

The text align of text watermark

### textBaseline

> _'alphabetic' \| 'bottom' \| 'hanging' \| 'ideographic' \| 'middle' \| 'top'_ **Default:** `'middle'`

The text baseline of text watermark

### textFill

> _string_ **Default:** `'#000'`

The color of text watermark

### textFontFamily

> _string_

The font of text watermark

### textFontSize

> _number_ **Default:** `16`

The font size of text watermark

### textFontVariant

> _string_

The font variant of text watermark

### textFontWeight

> _string_

The font weight of text watermark

### width

> _number_ **Default:** `200`

The width of watermark(single)

## API
