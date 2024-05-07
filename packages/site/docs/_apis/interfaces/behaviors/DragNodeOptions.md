[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [behaviors](../../modules/behaviors.md) / DragNodeOptions

[behaviors](../../modules/behaviors.md).DragNodeOptions

## Properties

### delegateStyle

• `Optional` **delegateStyle**: `Object`

The drawing properties when the nodes are dragged.
Only used when enableDelegate is true.

#### Index signature

▪ [key: `string`]: `unknown`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fill?` | `string` |
| `fillOpacity?` | `number` |
| `lineDash?` | [`number`, `number`] |
| `lineWidth?` | `number` |
| `stroke?` | `string` |
| `strokeOpacity?` | `number` |

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:32](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L32)

___

### enableDelegate

• `Optional` **enableDelegate**: `boolean`

Whether to use a virtual rect moved with the dragging mouse instead of the node.
Defaults to false.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:27](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L27)

___

### enableTransient

• `Optional` **enableTransient**: `boolean`

Whether to draw dragging nodes in transient layer.
Ignored when enableDelegate is true.
Defaults to true.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:22](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L22)

___

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:60](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L60)

___

### hideRelatedEdges

• `Optional` **hideRelatedEdges**: `boolean`

Whether to hide the related edges to avoid calculation while dragging nodes.
Ignored when enableTransient or enableDelegate is true.
Defaults to false.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:51](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L51)

___

### selectedState

• `Optional` **selectedState**: `string`

The state name to be considered as "selected".
Defaults to "selected".

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:56](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L56)

___

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

[packages/g6/src/stdlib/behavior/drag-node.ts:68](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L68)

___

### throttle

• `Optional` **throttle**: `number`

The time in milliseconds to throttle moving. Useful to avoid the frequent calculation.
Defaults to 0.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:45](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L45)

___

### updateComboStructure

• `Optional` **updateComboStructure**: `boolean`

Whether change the combo hierarchy structure or only change size.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:64](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/drag-node.ts#L64)
