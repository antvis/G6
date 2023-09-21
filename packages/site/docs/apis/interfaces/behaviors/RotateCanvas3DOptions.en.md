---
title: RotateCanvas3DOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / RotateCanvas3DOptions

[behaviors](../../modules/behaviors.en.md).RotateCanvas3DOptions

## Properties

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:31](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts#L31)

---

### secondaryKey

• `Optional` **secondaryKey**: `string`

The assistance secondary key to trigger the behavior.
If it is not assigned, triggered only by trigger.
You can also assigned it with a key on keyboard e.g. 'shift',
to make the behavior triggered only when the key is pressing and trigger is happening.

#### Defined in

[packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:19](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts#L19)

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

[packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:35](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts#L35)

---

### speedUpKey

• `Optional` **speedUpKey**: `string`

To speed up rotating while pressing and rotate the canvas by direciton keys (trigger = 'directionKeys').

#### Defined in

[packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:23](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts#L23)

---

### trigger

• `Optional` **trigger**: `"drag"` \| `"directionKeys"`

The way to tranlate the canvas. 'drag' (default) means dragged by mouse, 'directionKeys' means the up/down/left/right key on keyBoard.

#### Defined in

[packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:12](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts#L12)

---

### triggerOnItems

• `Optional` **triggerOnItems**: `boolean`

Whether allow zooming canvas on a node/edge/combo.

#### Defined in

[packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:27](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts#L27)
