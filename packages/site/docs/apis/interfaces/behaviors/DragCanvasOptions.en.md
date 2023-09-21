---
title: DragCanvasOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / DragCanvasOptions

[behaviors](../../modules/behaviors.en.md).DragCanvasOptions

## Properties

### direction

• `Optional` **direction**: `"x"` \| `"y"` \| `"both"`

The direction to drag the canvas. 'both' by default.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L22)

---

### dragOnItems

• `Optional` **dragOnItems**: `boolean`

Whether allow trigger this behavior when drag start on nodes / edges / combos.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:14](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L14)

---

### enableOptimize

• `Optional` **enableOptimize**: `boolean`

Whether enable optimize strategies, which will hide all the shapes excluding node keyShape while dragging.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:10](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L10)

---

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:48](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L48)

---

### scalableRange

• `Optional` **scalableRange**: `string` \| `number`

The range of canvas to limit dragging, 0 by default, which means the graph cannot be dragged totally out of the view port range.
If scalableRange is number or a string without 'px', means it is a ratio of the graph content.
If scalableRange is a string with 'px', it is regarded as pixels.
If scalableRange = 0, no constrains;
If scalableRange > 0, the graph can be dragged out of the view port range
If scalableRange < 0, the range is smaller than the view port.
Refer to https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:44](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L44)

---

### secondaryKey

• `Optional` **secondaryKey**: `string`

The assistant secondary key on keyboard. If it is not assigned, the behavior will be triggered when trigger happens.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L26)

---

### secondaryKeyToDisable

• `Optional` **secondaryKeyToDisable**: `string`

The assistant secondary key on keyboard to prevent the behavior to be tiggered. 'shift' by default.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:30](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L30)

---

### shouldBegin

• `Optional` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

#### Type declaration

▸ (`event`): `boolean`

Whether allow the behavior happen on the current item.

##### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.en.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:52](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L52)

---

### speedUpKey

• `Optional` **speedUpKey**: `string`

The key on keyboard to speed up translating while pressing and drag-canvas by direction keys. The trigger should be 'directionKeys' for this option.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:34](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L34)

---

### trigger

• `Optional` **trigger**: `"drag"` \| `"directionKeys"`

The trigger for the behavior, 'drag' by default. 'directionKeys' means trigger this behavior by up / down / left / right keys on keyboard.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-canvas.ts:18](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L18)
