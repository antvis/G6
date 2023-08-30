[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [behaviors](../modules/behaviors.md) / BrushSelectOptions

# Interface: BrushSelectOptions

[behaviors](../modules/behaviors.md).BrushSelectOptions

## Properties

### brushStyle

• **brushStyle**: `Object`

The shape style of the brush while selecting.

#### Index signature

▪ [key: `string`]: `unknown`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill?` | `string` |
| `fillOpacity?` | `number` |
| `lineWidth?` | `number` |
| `stroke?` | `string` |

#### Defined in

[stdlib/behavior/brush-select.ts:46](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L46)

___

### eventName

• **eventName**: `string`

The event name to trigger when select/unselect an item.

#### Defined in

[stdlib/behavior/brush-select.ts:42](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L42)

___

### itemTypes

• **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"``)[]

Item types to be able to select.
Defaults to `["nodes"]`.
Should be an array of "node", "edge", or "combo".

#### Defined in

[stdlib/behavior/brush-select.ts:32](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L32)

___

### onDeselect

• **onDeselect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[]  }, `deselectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[]  }) => `void`

#### Type declaration

▸ (`selectedIds`, `deselectedIds`): `void`

A callback be called after deselecting.

##### Parameters

| Name | Type |
| :------ | :------ |
| `selectedIds` | `Object` |
| `selectedIds.combos` | `ID`[] |
| `selectedIds.edges` | `ID`[] |
| `selectedIds.nodes` | `ID`[] |
| `deselectedIds` | `Object` |
| `deselectedIds.combos` | `ID`[] |
| `deselectedIds.edges` | `ID`[] |
| `deselectedIds.nodes` | `ID`[] |

##### Returns

`void`

#### Defined in

[stdlib/behavior/brush-select.ts:77](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L77)

___

### onSelect

• **onSelect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[]  }) => `void`

#### Type declaration

▸ (`selectedIds`): `void`

A callback be called after selecting.

##### Parameters

| Name | Type |
| :------ | :------ |
| `selectedIds` | `Object` |
| `selectedIds.combos` | `ID`[] |
| `selectedIds.edges` | `ID`[] |
| `selectedIds.nodes` | `ID`[] |

##### Returns

`void`

#### Defined in

[stdlib/behavior/brush-select.ts:73](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L73)

___

### selectSetMode

• **selectSetMode**: ``"union"`` \| ``"intersect"`` \| ``"diff"`` \| ``"latest"``

The mode to compose the selections from times of brush

#### Defined in

[stdlib/behavior/brush-select.ts:54](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L54)

___

### selectedState

• **selectedState**: ``"selected"``

The state to be applied when select.
Defaults to `"selected"`.
Can be set to "active", "highlighted", etc.

#### Defined in

[stdlib/behavior/brush-select.ts:38](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L38)

___

### shouldBegin

• **shouldBegin**: (`event`: [`IG6GraphEvent`](types-IG6GraphEvent.md)) => `boolean`

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

[stdlib/behavior/brush-select.ts:58](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L58)

___

### shouldUpdate

• **shouldUpdate**: (`itemType`: `ITEM_TYPE`, `id`: `ID`, `action`: ``"select"`` \| ``"deselect"``, `self`: `default`) => `boolean`

#### Type declaration

▸ (`itemType`, `id`, `action`, `self`): `boolean`

Whether to update item state.
If it returns false, you may probably listen to `eventName` and
manage states or data manually

##### Parameters

| Name | Type |
| :------ | :------ |
| `itemType` | `ITEM_TYPE` |
| `id` | `ID` |
| `action` | ``"select"`` \| ``"deselect"`` |
| `self` | `default` |

##### Returns

`boolean`

#### Defined in

[stdlib/behavior/brush-select.ts:64](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L64)

___

### trigger

• **trigger**: ``"drag"`` \| ``"shift"`` \| ``"ctrl"`` \| ``"alt"`` \| ``"meta"``

The key to pressed with mouse click to apply multiple selection.
Defaults to `"shift"`.
Could be "drag", "shift", "ctrl", "alt", or "meta".

#### Defined in

[stdlib/behavior/brush-select.ts:26](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/behavior/brush-select.ts#L26)
