---
title: TextStyleProps
---

> 📋 中文文档还在翻译中... 欢迎PR

[Overview - v5.0.0-beta.1](../../README.zh.md) / [Modules](../../modules.zh.md) / [item](../../modules/item.zh.md) / TextStyleProps

[item](../../modules/item.zh.md).TextStyleProps

## Hierarchy

- `BaseStyleProps`

  ↳ **`TextStyleProps`**

## Properties

### anchor

• `Optional` **anchor**: `string` \| [`number`, `number`, `number`] \| [`number`, `number`] \| `Float32Array`

how do we define the 'position' of a shape?
eg. the default anchor of a Rect is top-left, we can change it to its' center [0.5, 0.5].

#### Inherited from

BaseStyleProps.anchor

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:47

___

### billboardRotation

• `Optional` **billboardRotation**: `number`

The rotation of the billboard in radians.

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:18

___

### class

• `Optional` **class**: `string`

#### Inherited from

BaseStyleProps.class

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:34

___

### clipPath

• `Optional` **clipPath**: `DisplayObject`<`any`, `any`\>

clip path

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path

#### Inherited from

BaseStyleProps.clipPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:68

___

### cursor

• `Optional` **cursor**: `Cursor`

the cursor style when the target is active

#### Inherited from

BaseStyleProps.cursor

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:63

___

### display

• `Optional` **display**: `string`

#### Inherited from

BaseStyleProps.display

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:171

___

### draggable

• `Optional` **draggable**: `boolean`

**`See`**

https://g-next.antv.vision/zh/docs/plugins/dragndrop#drag

#### Inherited from

BaseStyleProps.draggable

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:175

___

### droppable

• `Optional` **droppable**: `boolean`

**`See`**

https://g-next.antv.vision/zh/docs/plugins/dragndrop#drop

#### Inherited from

BaseStyleProps.droppable

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:179

___

### dx

• `Optional` **dx**: `string` \| `number`

The dx attribute indicates a shift along the x-axis on the position of an element or its content.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:131

___

### dy

• `Optional` **dy**: `string` \| `number`

The dy attribute indicates a shift along the y-axis on the position of an element or its content.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:136

___

### fill

• `Optional` **fill**: `string` \| `Pattern`

填充颜色

#### Inherited from

BaseStyleProps.fill

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:79

___

### fillOpacity

• `Optional` **fillOpacity**: `string` \| `number`

填充透明度

#### Inherited from

BaseStyleProps.fillOpacity

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:81

___

### fillRule

• `Optional` **fillRule**: ``"nonzero"`` \| ``"evenodd"``

The fill-rule attribute is a presentation attribute defining the algorithm to use to determine the inside part of a shape.

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule

#### Inherited from

BaseStyleProps.fillRule

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:86

___

### filter

• `Optional` **filter**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/filter

#### Inherited from

BaseStyleProps.filter

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:162

___

### fontFamily

• `Optional` **fontFamily**: `string`

The font-family property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/font-family

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:84

___

### fontSize

• `Optional` **fontSize**: `string` \| `number`

The font-size property sets the size of the font.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/font-size

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:79

___

### fontStyle

• `Optional` **fontStyle**: ``"normal"`` \| `CSSGlobalKeywords` \| ``"italic"`` \| ``"oblique"``

The font-style property sets whether a font should be styled with a normal, italic, or oblique face from its font-family.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/font-style

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:74

___

### fontVariant

• `Optional` **fontVariant**: `string`

The font-variant shorthand property allows you to set all the font variants for a font.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:94

___

### fontWeight

• `Optional` **fontWeight**: `number` \| ``"normal"`` \| `CSSGlobalKeywords` \| ``"bold"`` \| ``"bolder"`` \| ``"lighter"``

The font-weight property sets the weight (or boldness) of the font. The weights available depend on the font-family that is currently set.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:89

___

### hitArea

• `Optional` **hitArea**: `DisplayObject`<`any`, `any`\>

交互区域

#### Inherited from

BaseStyleProps.hitArea

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:105

___

### increasedLineWidthForHitTesting

• `Optional` **increasedLineWidthForHitTesting**: `string` \| `number`

increased line width when hitting test

#### Inherited from

BaseStyleProps.increasedLineWidthForHitTesting

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:101

___

### isBillboard

• `Optional` **isBillboard**: `boolean`

Always face the camera.

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:14

___

### isSizeAttenuation

• `Optional` **isSizeAttenuation**: `boolean`

Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.)

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:22

___

### leading

• `Optional` **leading**: `number`

There is no "CSS leading" property

**`See`**

https://css-tricks.com/how-to-tame-line-height-in-css/

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:113

___

### letterSpacing

• `Optional` **letterSpacing**: `string` \| `number`

It specifies the spacing between letters when drawing text.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/letterSpacing

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:104

___

### lineCap

• `Optional` **lineCap**: `CanvasLineCap`

alias of strokeLinecap

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap

#### Inherited from

BaseStyleProps.lineCap

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:114

___

### lineDash

• `Optional` **lineDash**: `string` \| `number` \| (`string` \| `number`)[]

alias of strokeDasharray

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash

#### Inherited from

BaseStyleProps.lineDash

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:132

___

### lineDashOffset

• `Optional` **lineDashOffset**: `number`

alias of strokeDashoffset

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset

#### Inherited from

BaseStyleProps.lineDashOffset

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:141

___

### lineHeight

• `Optional` **lineHeight**: `string` \| `number`

The line-height property sets the height of a line box.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/line-height

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:99

___

### lineJoin

• `Optional` **lineJoin**: `CanvasLineJoin`

alias of strokeLinejoin

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin

#### Inherited from

BaseStyleProps.lineJoin

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:123

___

### lineWidth

• `Optional` **lineWidth**: `string` \| `number`

alias if strokeWidth

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth

#### Inherited from

BaseStyleProps.lineWidth

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:97

___

### maxLines

• `Optional` **maxLines**: `number`

Borrow from CanvasKit ParagraphStyle.

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:43

___

### miterLimit

• `Optional` **miterLimit**: `string` \| `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit

#### Inherited from

BaseStyleProps.miterLimit

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:170

___

### offsetDistance

• `Optional` **offsetDistance**: `number`

#### Inherited from

BaseStyleProps.offsetDistance

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:74

___

### offsetPath

• `Optional` **offsetPath**: `DisplayObject`<`any`, `any`\>

offset path

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path

#### Inherited from

BaseStyleProps.offsetPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:73

___

### opacity

• `Optional` **opacity**: `string` \| `number`

整体透明度

#### Inherited from

BaseStyleProps.opacity

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:88

___

### pointerEvents

• `Optional` **pointerEvents**: ``"fill"`` \| ``"stroke"`` \| ``"visible"`` \| `CSSGlobalKeywords` \| ``"none"`` \| ``"auto"`` \| ``"painted"`` \| ``"visiblestroke"`` \| ``"visiblefill"`` \| ``"visiblepainted"`` \| ``"all"`` \| ``"non-transparent-pixel"``

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

#### Inherited from

BaseStyleProps.pointerEvents

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:55

___

### shadowBlur

• `Optional` **shadowBlur**: `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur

#### Inherited from

BaseStyleProps.shadowBlur

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:146

___

### shadowColor

• `Optional` **shadowColor**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor

#### Inherited from

BaseStyleProps.shadowColor

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:150

___

### shadowOffsetX

• `Optional` **shadowOffsetX**: `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX

#### Inherited from

BaseStyleProps.shadowOffsetX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:154

___

### shadowOffsetY

• `Optional` **shadowOffsetY**: `number`

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY

#### Inherited from

BaseStyleProps.shadowOffsetY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:158

___

### shadowType

• `Optional` **shadowType**: ``"both"`` \| ``"inner"`` \| ``"outer"``

#### Inherited from

BaseStyleProps.shadowType

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:142

___

### stroke

• `Optional` **stroke**: `string` \| `Pattern`

#### Inherited from

BaseStyleProps.stroke

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:75

___

### strokeDasharray

• `Optional` **strokeDasharray**: `string` \| (`string` \| `number`)[]

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

#### Inherited from

BaseStyleProps.strokeDasharray

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:127

___

### strokeDashoffset

• `Optional` **strokeDashoffset**: `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset

#### Inherited from

BaseStyleProps.strokeDashoffset

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:136

___

### strokeLinecap

• `Optional` **strokeLinecap**: `CanvasLineCap`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

#### Inherited from

BaseStyleProps.strokeLinecap

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:109

___

### strokeLinejoin

• `Optional` **strokeLinejoin**: `CanvasLineJoin`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin

#### Inherited from

BaseStyleProps.strokeLinejoin

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:118

___

### strokeOpacity

• `Optional` **strokeOpacity**: `string` \| `number`

描边透明度

#### Inherited from

BaseStyleProps.strokeOpacity

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:77

___

### strokeWidth

• `Optional` **strokeWidth**: `string` \| `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width

#### Inherited from

BaseStyleProps.strokeWidth

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:92

___

### text

• **text**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:23

___

### textAlign

• `Optional` **textAlign**: `CSSGlobalKeywords` \| ``"start"`` \| ``"center"`` \| ``"middle"`` \| ``"end"`` \| ``"left"`` \| ``"right"``

The text-align property sets the horizontal alignment of the inline-level content.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/text-align

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:28

___

### textBaseline

• `Optional` **textBaseline**: `CSSGlobalKeywords` \| ``"middle"`` \| ``"top"`` \| ``"hanging"`` \| ``"alphabetic"`` \| ``"ideographic"`` \| ``"bottom"``

It specifies the current text baseline used when drawing text.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:33

___

### textDecorationColor

• `Optional` **textDecorationColor**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:65

___

### textDecorationLine

• `Optional` **textDecorationLine**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:61

___

### textDecorationStyle

• `Optional` **textDecorationStyle**: `TextDecorationStyle`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:69

___

### textOverflow

• `Optional` **textOverflow**: `string`

The text-overflow property sets how hidden overflow content is signaled to users.
It can be clipped, display an ellipsis ('…'), or display a custom string.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow#values

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:39

___

### textPath

• `Optional` **textPath**: `Path`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:47

___

### textPathSide

• `Optional` **textPathSide**: ``"left"`` \| ``"right"``

The side attribute determines the side of a path the text is placed on (relative to the path direction).

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/side

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:52

___

### textPathStartOffset

• `Optional` **textPathStartOffset**: `string` \| `number`

The startOffset attribute defines an offset from the start of the path for the initial current text position along the path after converting the path to the \<textPath\> element's coordinate system.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/startOffset

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:57

___

### textTransform

• `Optional` **textTransform**: ``""`` \| `TextTransform`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform

#### Inherited from

BaseStyleProps.textTransform

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:166

___

### transform

• `Optional` **transform**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/transform

#### Inherited from

BaseStyleProps.transform

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:38

___

### transformOrigin

• `Optional` **transformOrigin**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin

#### Inherited from

BaseStyleProps.transformOrigin

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:42

___

### visibility

• `Optional` **visibility**: ``"visible"`` \| `CSSGlobalKeywords` \| ``"hidden"``

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/visibility

#### Inherited from

BaseStyleProps.visibility

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:51

___

### wordWrap

• `Optional` **wordWrap**: `boolean`

The overflow-wrap CSS property applies to inline elements,
setting whether the browser should insert line breaks within an otherwise unbreakable string to prevent text from overflowing its line box.

The overflow-wrap property acts in the same way as the non-standard property word-wrap.
The word-wrap property is now treated by browsers as an alias of the standard property.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:122

___

### wordWrapWidth

• `Optional` **wordWrapWidth**: `number`

Max width of overflowing box.

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:126

___

### x

• `Optional` **x**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:8

___

### y

• `Optional` **y**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:9

___

### z

• `Optional` **z**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Text.d.ts:10

___

### zIndex

• `Optional` **zIndex**: `number`

z-index in CSS

#### Inherited from

BaseStyleProps.zIndex

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:59
