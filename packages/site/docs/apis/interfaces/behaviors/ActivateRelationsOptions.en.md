---
title: ActivateRelationsOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / ActivateRelationsOptions

[behaviors](../../modules/behaviors.en.md).ActivateRelationsOptions

## Properties

### activeState

• `Optional` **activeState**: `"selected"`

Defaults to `"selected"`.

#### Defined in

[packages/g6/src/stdlib/behavior/activate-relations.ts:37](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L37)

---

### multiple

• `Optional` **multiple**: `boolean`

Whether to allow multiple selection.
Defaults to true.
If set to false, `trigger` options will be ignored.

#### Defined in

[packages/g6/src/stdlib/behavior/activate-relations.ts:24](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L24)

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

[packages/g6/src/stdlib/behavior/activate-relations.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L42)

---

### shouldUpdate

• `Optional` **shouldUpdate**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

#### Type declaration

▸ (`event`): `boolean`

Whether to update item state.
If it returns false, you may probably listen to `eventName` and
manage states or data manually

##### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.en.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/behavior/activate-relations.ts:48](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L48)

---

### trigger

• `Optional` **trigger**: `"click"` \| `"mouseenter"`

The key to pressed with mouse click to apply multiple selection.
Defaults to `"click"`.
Could be "click", "mouseenter".

#### Defined in

[packages/g6/src/stdlib/behavior/activate-relations.ts:30](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L30)
