---
title: BrushSelectOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / BrushSelectOptions

[behaviors](../../modules/behaviors.en.md).BrushSelectOptions

## Properties

### brushStyle

• **brushStyle**: `Object`

The shape style of the brush while selecting.

#### Index signature

▪ [key: `string`]: `unknown`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `fill?`        | `string` |
| `fillOpacity?` | `number` |
| `lineWidth?`   | `number` |
| `stroke?`      | `string` |

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:46](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L46)

---

### eventName

• **eventName**: `string`

The event name to trigger when select/unselect an item.

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L42)

---

### itemTypes

• **itemTypes**: (`"node"` \| `"edge"` \| `"combo"`)[]

Item types to be able to select.
Defaults to `["nodes"]`.
Should be an array of "node", "edge", or "combo".

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:32](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L32)

---

### onDeselect

• **onDeselect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }, `deselectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }) => `void`

#### Type declaration

▸ (`selectedIds`, `deselectedIds`): `void`

A callback be called after deselecting.

##### Parameters

| Name                   | Type     |
| :--------------------- | :------- |
| `selectedIds`          | `Object` |
| `selectedIds.combos`   | `ID`[]   |
| `selectedIds.edges`    | `ID`[]   |
| `selectedIds.nodes`    | `ID`[]   |
| `deselectedIds`        | `Object` |
| `deselectedIds.combos` | `ID`[]   |
| `deselectedIds.edges`  | `ID`[]   |
| `deselectedIds.nodes`  | `ID`[]   |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:77](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L77)

---

### onSelect

• **onSelect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }) => `void`

#### Type declaration

▸ (`selectedIds`): `void`

A callback be called after selecting.

##### Parameters

| Name                 | Type     |
| :------------------- | :------- |
| `selectedIds`        | `Object` |
| `selectedIds.combos` | `ID`[]   |
| `selectedIds.edges`  | `ID`[]   |
| `selectedIds.nodes`  | `ID`[]   |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:73](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L73)

---

### selectSetMode

• **selectSetMode**: `"union"` \| `"intersect"` \| `"diff"` \| `"latest"`

The mode to compose the selections from times of brush

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:54](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L54)

---

### selectedState

• **selectedState**: `"selected"`

The state to be applied when select.
Defaults to `"selected"`.
Can be set to "active", "highlighted", etc.

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:38](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L38)

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

[packages/g6/src/stdlib/behavior/brush-select.ts:58](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L58)

---

### shouldUpdate

• **shouldUpdate**: (`itemType`: `ITEM_TYPE`, `id`: `ID`, `action`: `"select"` \| `"deselect"`, `self`: `BrushSelect`) => `boolean`

#### Type declaration

▸ (`itemType`, `id`, `action`, `self`): `boolean`

Whether to update item state.
If it returns false, you may probably listen to `eventName` and
manage states or data manually

##### Parameters

| Name       | Type                       |
| :--------- | :------------------------- |
| `itemType` | `ITEM_TYPE`                |
| `id`       | `ID`                       |
| `action`   | `"select"` \| `"deselect"` |
| `self`     | `BrushSelect`              |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:64](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L64)

---

### trigger

• **trigger**: `"shift"` \| `"drag"` \| `"ctrl"` \| `"alt"` \| `"meta"`

The key to pressed with mouse click to apply multiple selection.
Defaults to `"shift"`.
Could be "drag", "shift", "ctrl", "alt", or "meta".

#### Defined in

[packages/g6/src/stdlib/behavior/brush-select.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L26)
