---
title: NodeUserModelData
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [item](../../modules/item.en.md) / NodeUserModelData

[item](../../modules/item.en.md).NodeUserModelData

Data in user input model.

## Hierarchy

- `PlainObject`

  ↳ **`NodeUserModelData`**

## Properties

### anchorPoints

• `Optional` **anchorPoints**: `number`[][]

The ratio position of the keyShape for related edges linking into.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:67](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L67)

___

### badges

• `Optional` **badges**: { `position`: `BadgePosition` ; `text`: `string` ; `type`: ``"text"`` \| ``"icon"``  }[]

The badges to show on the node.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:72](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L72)

___

### color

• `Optional` **color**: `string`

Subject color for the keyShape and anchor points.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:36](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L36)

___

### icon

• `Optional` **icon**: `Object`

The icon to show on the node.
More styles should be configured in node mapper.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `img?` | `string` |
| `text?` | `string` |
| `type` | ``"text"`` \| ``"icon"`` |

#### Defined in

[packages/g6/src/types/node.ts:58](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L58)

___

### isRoot

• `Optional` **isRoot**: `boolean`

Whether to be a root at when used as a tree.

#### Defined in

[packages/g6/src/types/node.ts:53](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L53)

___

### label

• `Optional` **label**: `string`

The text to show on the node.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:41](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L41)

___

### parentId

• `Optional` **parentId**: `ID`

Reserved for combo.

#### Defined in

[packages/g6/src/types/node.ts:49](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L49)

___

### preventPolylineEdgeOverlap

• `Optional` **preventPolylineEdgeOverlap**: `boolean`

Whether to prevent overlap with unassociated edges. Used to preempt position.
Defaults to false.
Only valid for polyline

#### Defined in

[packages/g6/src/types/node.ts:82](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L82)

___

### type

• `Optional` **type**: `string`

Node type, e.g. 'circle-node'.

#### Defined in

[packages/g6/src/types/node.ts:31](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L31)

___

### visible

• `Optional` **visible**: `boolean`

Whether show the node by default.

#### Defined in

[packages/g6/src/types/node.ts:45](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L45)

___

### x

• `Optional` **x**: `number`

Node position.

#### Defined in

[packages/g6/src/types/node.ts:25](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L25)

___

### y

• `Optional` **y**: `number`

#### Defined in

[packages/g6/src/types/node.ts:26](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L26)

___

### z

• `Optional` **z**: `number`

#### Defined in

[packages/g6/src/types/node.ts:27](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L27)
