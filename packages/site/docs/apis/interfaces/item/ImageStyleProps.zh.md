---
title: ImageStyleProps
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [item](../../modules/item.zh.md) / ImageStyleProps

[item](../../modules/item.zh.md).ImageStyleProps

## Hierarchy

- `BaseStyleProps`

  ↳ **`ImageStyleProps`**

## Properties

### anchor

• `Optional` **anchor**: `string` \| [`number`, `number`, `number`] \| [`number`, `number`] \| `Float32Array`

how do we define the 'position' of a shape?
eg. the default anchor of a Rect is top-left, we can change it to its' center [0.5, 0.5].

#### Inherited from

BaseStyleProps.anchor

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:47

---

### billboardRotation

• `Optional` **billboardRotation**: `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:13

---

### class

• `Optional` **class**: `string`

#### Inherited from

BaseStyleProps.class

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:34

---

### clipPath

• `Optional` **clipPath**: `DisplayObject`<`any`, `any`\>

clip path

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path

#### Inherited from

BaseStyleProps.clipPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:68

---

### cursor

• `Optional` **cursor**: `Cursor`

the cursor style when the target is active

#### Inherited from

BaseStyleProps.cursor

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:63

---

### display

• `Optional` **display**: `string`

#### Inherited from

BaseStyleProps.display

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:171

---

### draggable

• `Optional` **draggable**: `boolean`

**`See`**

https://g-next.antv.vision/zh/docs/plugins/dragndrop#drag

#### Inherited from

BaseStyleProps.draggable

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:175

---

### droppable

• `Optional` **droppable**: `boolean`

**`See`**

https://g-next.antv.vision/zh/docs/plugins/dragndrop#drop

#### Inherited from

BaseStyleProps.droppable

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:179

---

### fill

• `Optional` **fill**: `string` \| `Pattern`

填充颜色

#### Inherited from

BaseStyleProps.fill

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:79

---

### fillOpacity

• `Optional` **fillOpacity**: `string` \| `number`

填充透明度

#### Inherited from

BaseStyleProps.fillOpacity

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:81

---

### fillRule

• `Optional` **fillRule**: `"nonzero"` \| `"evenodd"`

The fill-rule attribute is a presentation attribute defining the algorithm to use to determine the inside part of a shape.

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule

#### Inherited from

BaseStyleProps.fillRule

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:86

---

### filter

• `Optional` **filter**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/filter

#### Inherited from

BaseStyleProps.filter

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:162

---

### height

• `Optional` **height**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:11

---

### hitArea

• `Optional` **hitArea**: `DisplayObject`<`any`, `any`\>

交互区域

#### Inherited from

BaseStyleProps.hitArea

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:105

---

### img

• `Optional` **img**: `string` \| `HTMLImageElement`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:8

---

### increasedLineWidthForHitTesting

• `Optional` **increasedLineWidthForHitTesting**: `string` \| `number`

increased line width when hitting test

#### Inherited from

BaseStyleProps.increasedLineWidthForHitTesting

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:101

---

### isBillboard

• `Optional` **isBillboard**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:12

---

### isSizeAttenuation

• `Optional` **isSizeAttenuation**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:14

---

### lineCap

• `Optional` **lineCap**: `CanvasLineCap`

alias of strokeLinecap

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap

#### Inherited from

BaseStyleProps.lineCap

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:114

---

### lineDash

• `Optional` **lineDash**: `string` \| `number` \| (`string` \| `number`)[]

alias of strokeDasharray

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash

#### Inherited from

BaseStyleProps.lineDash

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:132

---

### lineDashOffset

• `Optional` **lineDashOffset**: `number`

alias of strokeDashoffset

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset

#### Inherited from

BaseStyleProps.lineDashOffset

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:141

---

### lineJoin

• `Optional` **lineJoin**: `CanvasLineJoin`

alias of strokeLinejoin

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin

#### Inherited from

BaseStyleProps.lineJoin

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:123

---

### lineWidth

• `Optional` **lineWidth**: `string` \| `number`

alias if strokeWidth

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth

#### Inherited from

BaseStyleProps.lineWidth

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:97

---

### miterLimit

• `Optional` **miterLimit**: `string` \| `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit

#### Inherited from

BaseStyleProps.miterLimit

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:170

---

### offsetDistance

• `Optional` **offsetDistance**: `number`

#### Inherited from

BaseStyleProps.offsetDistance

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:74

---

### offsetPath

• `Optional` **offsetPath**: `DisplayObject`<`any`, `any`\>

offset path

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path

#### Inherited from

BaseStyleProps.offsetPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:73

---

### opacity

• `Optional` **opacity**: `string` \| `number`

整体透明度

#### Inherited from

BaseStyleProps.opacity

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:88

---

### pointerEvents

• `Optional` **pointerEvents**: `"fill"` \| `"stroke"` \| `"visible"` \| `CSSGlobalKeywords` \| `"none"` \| `"auto"` \| `"painted"` \| `"visiblestroke"` \| `"visiblefill"` \| `"visiblepainted"` \| `"all"` \| `"non-transparent-pixel"`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

#### Inherited from

BaseStyleProps.pointerEvents

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:55

---

### shadowBlur

• `Optional` **shadowBlur**: `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur

#### Inherited from

BaseStyleProps.shadowBlur

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:146

---

### shadowColor

• `Optional` **shadowColor**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor

#### Inherited from

BaseStyleProps.shadowColor

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:150

---

### shadowOffsetX

• `Optional` **shadowOffsetX**: `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX

#### Inherited from

BaseStyleProps.shadowOffsetX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:154

---

### shadowOffsetY

• `Optional` **shadowOffsetY**: `number`

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY

#### Inherited from

BaseStyleProps.shadowOffsetY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:158

---

### shadowType

• `Optional` **shadowType**: `"both"` \| `"inner"` \| `"outer"`

#### Inherited from

BaseStyleProps.shadowType

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:142

---

### src

• `Optional` **src**: `string` \| `HTMLImageElement`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:9

---

### stroke

• `Optional` **stroke**: `string` \| `Pattern`

#### Inherited from

BaseStyleProps.stroke

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:75

---

### strokeDasharray

• `Optional` **strokeDasharray**: `string` \| (`string` \| `number`)[]

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

#### Inherited from

BaseStyleProps.strokeDasharray

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:127

---

### strokeDashoffset

• `Optional` **strokeDashoffset**: `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset

#### Inherited from

BaseStyleProps.strokeDashoffset

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:136

---

### strokeLinecap

• `Optional` **strokeLinecap**: `CanvasLineCap`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

#### Inherited from

BaseStyleProps.strokeLinecap

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:109

---

### strokeLinejoin

• `Optional` **strokeLinejoin**: `CanvasLineJoin`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin

#### Inherited from

BaseStyleProps.strokeLinejoin

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:118

---

### strokeOpacity

• `Optional` **strokeOpacity**: `string` \| `number`

描边透明度

#### Inherited from

BaseStyleProps.strokeOpacity

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:77

---

### strokeWidth

• `Optional` **strokeWidth**: `string` \| `number`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width

#### Inherited from

BaseStyleProps.strokeWidth

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:92

---

### textTransform

• `Optional` **textTransform**: `""` \| `TextTransform`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform

#### Inherited from

BaseStyleProps.textTransform

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:166

---

### transform

• `Optional` **transform**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/transform

#### Inherited from

BaseStyleProps.transform

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:38

---

### transformOrigin

• `Optional` **transformOrigin**: `string`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin

#### Inherited from

BaseStyleProps.transformOrigin

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:42

---

### visibility

• `Optional` **visibility**: `"visible"` \| `CSSGlobalKeywords` \| `"hidden"`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/CSS/visibility

#### Inherited from

BaseStyleProps.visibility

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:51

---

### width

• `Optional` **width**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:10

---

### x

• `Optional` **x**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:5

---

### y

• `Optional` **y**: `string` \| `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:6

---

### z

• `Optional` **z**: `number`

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/display-objects/Image.d.ts:7

---

### zIndex

• `Optional` **zIndex**: `number`

z-index in CSS

#### Inherited from

BaseStyleProps.zIndex

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/types.d.ts:59
