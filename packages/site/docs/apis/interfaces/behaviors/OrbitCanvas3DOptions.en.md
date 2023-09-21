---
title: OrbitCanvas3DOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / OrbitCanvas3DOptions

[behaviors](../../modules/behaviors.en.md).OrbitCanvas3DOptions

## Properties

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:24](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts#L24)

---

### secondaryKey

• `Optional` **secondaryKey**: `string`

The assistance secondary key to trigger the behavior.
If it is not assigned, triggered only by trigger.
You can also assigned it with a key on keyboard e.g. 'shift',
to make the behavior triggered only when the key is pressing and trigger is happening.

#### Defined in

[packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:20](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts#L20)

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

[packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:28](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts#L28)

---

### trigger

• `Optional` **trigger**: `"drag"` \| `"directionKeys"`

The way to tranlate the canvas. 'drag' (default) means dragged by mouse, 'directionKeys' means the up/down/left/right key on keyBoard.

#### Defined in

[packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:13](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts#L13)
