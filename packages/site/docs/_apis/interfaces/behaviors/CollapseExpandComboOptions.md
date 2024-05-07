[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [behaviors](../../modules/behaviors.md) / CollapseExpandComboOptions

[behaviors](../../modules/behaviors.md).CollapseExpandComboOptions

## Properties

### shouldBegin

• `Optional` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.md)) => `boolean`

#### Type declaration

▸ (`event`): `boolean`

Whether allow the behavior happen on the current item.

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:22](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/collapse-expand-combo.ts#L22)

___

### trigger

• **trigger**: ``"click"`` \| ``"dblclick"``

The key to pressed with mouse click to apply multiple selection.
Defaults to `"dblclick"`.
Could be "dblclick", "click".

#### Defined in

[packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:18](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/collapse-expand-combo.ts#L18)
