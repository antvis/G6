[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [behaviors](../modules/behaviors.md) / ActivateRelationsOptions

# Interface: ActivateRelationsOptions

[behaviors](../modules/behaviors.md).ActivateRelationsOptions

## Properties

### activeState

• `Optional` **activeState**: ``"selected"``

Defaults to `"selected"`.

#### Defined in

[stdlib/behavior/activate-relations.ts:40](https://github.com/antvis/G6/blob/0b835e1b00/packages/g6/src/stdlib/behavior/activate-relations.ts#L40)

___

### multiple

• `Optional` **multiple**: `boolean`

Whether to allow multiple selection.
Defaults to true.
If set to false, `trigger` options will be ignored.

**`Description`**

fsafasfasf afa

#### Defined in

[stdlib/behavior/activate-relations.ts:27](https://github.com/antvis/G6/blob/0b835e1b00/packages/g6/src/stdlib/behavior/activate-relations.ts#L27)

___

### shouldBegin

• `Optional` **shouldBegin**: (`event`: [`IG6GraphEvent`](types-IG6GraphEvent.md)) => `boolean`

#### Type declaration

▸ (`event`): `boolean`

Whether allow the behavior happen on the current item.

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IG6GraphEvent`](types-IG6GraphEvent.md) |

##### Returns

`boolean`

#### Defined in

[stdlib/behavior/activate-relations.ts:45](https://github.com/antvis/G6/blob/0b835e1b00/packages/g6/src/stdlib/behavior/activate-relations.ts#L45)

___

### shouldUpdate

• `Optional` **shouldUpdate**: (`event`: [`IG6GraphEvent`](types-IG6GraphEvent.md)) => `boolean`

#### Type declaration

▸ (`event`): `boolean`

Whether to update item state.
If it returns false, you may probably listen to `eventName` and
manage states or data manually

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IG6GraphEvent`](types-IG6GraphEvent.md) |

##### Returns

`boolean`

#### Defined in

[stdlib/behavior/activate-relations.ts:51](https://github.com/antvis/G6/blob/0b835e1b00/packages/g6/src/stdlib/behavior/activate-relations.ts#L51)

___

### trigger

• `Optional` **trigger**: ``"click"`` \| ``"mouseenter"``

The key to pressed with mouse click to apply multiple selection.
Defaults to `"click"`.
Could be "click", "mouseenter".

#### Defined in

[stdlib/behavior/activate-relations.ts:33](https://github.com/antvis/G6/blob/0b835e1b00/packages/g6/src/stdlib/behavior/activate-relations.ts#L33)
