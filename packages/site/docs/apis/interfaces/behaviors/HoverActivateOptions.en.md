---
title: HoverActivateOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / HoverActivateOptions

[behaviors](../../modules/behaviors.en.md).HoverActivateOptions

## Properties

### activateState

• `Optional` **activateState**: `string`

The state name to be considered as "selected".
Defaults to "selected".

#### Defined in

[packages/g6/src/stdlib/behavior/hover-activate.ts:16](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L16)

---

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/hover-activate.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L26)

---

### itemTypes

• **itemTypes**: (`"node"` \| `"edge"` \| `"combo"`)[]

Item types to be able to acitvate.
Defaults to `["node", "edge"]`.
Should be an array of "node", "edge", or "combo".

#### Defined in

[packages/g6/src/stdlib/behavior/hover-activate.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L22)

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

[packages/g6/src/stdlib/behavior/hover-activate.ts:30](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L30)

---

### throttle

• `Optional` **throttle**: `number`

The time in milliseconds to throttle moving. Useful to avoid the frequent calculation.
Defaults to 0.

#### Defined in

[packages/g6/src/stdlib/behavior/hover-activate.ts:11](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L11)
