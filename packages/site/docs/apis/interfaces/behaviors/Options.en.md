---
title: Options
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / Options

[behaviors](../../modules/behaviors.en.md).Options

## Properties

### disableAnimate

• **disableAnimate**: `boolean`

Whether disable the collapse / expand animation triggered by this behavior.

#### Defined in

[packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:21](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-tree.ts#L21)

---

### eventName

• **eventName**: `string`

The event name to trigger when select/unselect an item.

#### Defined in

[packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:17](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-tree.ts#L17)

---

### shouldBegin

• **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

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

[packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:25](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-tree.ts#L25)

---

### shouldUpdate

• **shouldUpdate**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

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

[packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:31](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-tree.ts#L31)

---

### trigger

• **trigger**: `"click"` \| `"dblclick"`

The key to pressed with mouse click to apply multiple selection.
Defaults to `"shift"`.
Could be "shift", "ctrl", "alt", or "meta".

#### Defined in

[packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:13](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-tree.ts#L13)
