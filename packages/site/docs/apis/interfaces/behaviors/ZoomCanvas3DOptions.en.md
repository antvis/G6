---
title: ZoomCanvas3DOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / ZoomCanvas3DOptions

[behaviors](../../modules/behaviors.en.md).ZoomCanvas3DOptions

## Properties

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:33](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L33)

---

### maxZoom

• `Optional` **maxZoom**: `number`

The max value of camera's dolly to constrain the zoom-canvas-3d behavior

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:41](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L41)

---

### minZoom

• `Optional` **minZoom**: `number`

The min value of camera's dolly to constrain the zoom-canvas-3d behavior

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:37](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L37)

---

### secondaryKey

• `Optional` **secondaryKey**: `string`

The assistance secondary key to trigger the behavior.
If it is not assigned, triggered only by trigger.
You can also assigned it with a key on keyboard e.g. 'shift',
to make the behavior triggered only when the key is pressing and trigger is happening.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:21](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L21)

---

### sensitivity

• `Optional` **sensitivity**: `number`

Sensitivity of zooming.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:25](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L25)

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

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:45](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L45)

---

### trigger

• `Optional` **trigger**: `"wheel"` \| `"upDownKeys"`

The way to tranlate the canvas. 'drag' (default) means dragged by mouse, 'directionKeys' means the up/down/left/right key on keyBoard.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:14](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L14)

---

### triggerOnItems

• `Optional` **triggerOnItems**: `boolean`

Whether allow zooming canvas on a node/edge/combo.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:29](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts#L29)
