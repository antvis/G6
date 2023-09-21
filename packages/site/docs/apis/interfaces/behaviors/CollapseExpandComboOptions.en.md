---
title: CollapseExpandComboOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / CollapseExpandComboOptions

[behaviors](../../modules/behaviors.en.md).CollapseExpandComboOptions

## Properties

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

[packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-combo.ts#L22)

---

### trigger

• **trigger**: `"click"` \| `"dblclick"`

The key to pressed with mouse click to apply multiple selection.
Defaults to `"dblclick"`.
Could be "dblclick", "click".

#### Defined in

[packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:18](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-combo.ts#L18)
