---
title: DragNodeOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / DragNodeOptions

[behaviors](../../modules/behaviors.en.md).DragNodeOptions

## Properties

### delegateStyle

• `Optional` **delegateStyle**: `Object`

The drawing properties when the nodes are dragged.
Only used when enableDelegate is true.

#### Index signature

▪ [key: `string`]: `unknown`

#### Type declaration

| Name             | Type                 |
| :--------------- | :------------------- |
| `fill?`          | `string`             |
| `fillOpacity?`   | `number`             |
| `lineDash?`      | [`number`, `number`] |
| `lineWidth?`     | `number`             |
| `stroke?`        | `string`             |
| `strokeOpacity?` | `number`             |

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:32](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L32)

---

### enableDelegate

• `Optional` **enableDelegate**: `boolean`

Whether to use a virtual rect moved with the dragging mouse instead of the node.
Defaults to false.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:27](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L27)

---

### enableTransient

• `Optional` **enableTransient**: `boolean`

Whether to draw dragging nodes in transient layer.
Ignored when enableDelegate is true.
Defaults to true.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L22)

---

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when drag end.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:60](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L60)

---

### hideRelatedEdges

• `Optional` **hideRelatedEdges**: `boolean`

Whether to hide the related edges to avoid calculation while dragging nodes.
Ignored when enableTransient or enableDelegate is true.
Defaults to false.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:51](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L51)

---

### selectedState

• `Optional` **selectedState**: `string`

The state name to be considered as "selected".
Defaults to "selected".

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:56](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L56)

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

[packages/g6/src/stdlib/behavior/drag-node.ts:68](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L68)

---

### throttle

• `Optional` **throttle**: `number`

The time in milliseconds to throttle moving. Useful to avoid the frequent calculation.
Defaults to 0.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:45](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L45)

---

### updateComboStructure

• `Optional` **updateComboStructure**: `boolean`

Whether change the combo hierarchy structure or only change size.

#### Defined in

[packages/g6/src/stdlib/behavior/drag-node.ts:64](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-node.ts#L64)
