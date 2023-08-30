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

[packages/g6/src/types/node.ts:65](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L65)

___

### badges

• `Optional` **badges**: { `position`: `BadgePosition` ; `text`: `string` ; `type`: ``"icon"`` \| ``"text"``  }[]

The badges to show on the node.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:70](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L70)

___

### color

• `Optional` **color**: `string`

Subject color for the keyShape and anchor points.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:34](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L34)

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
| `type` | ``"icon"`` \| ``"text"`` |

#### Defined in

[packages/g6/src/types/node.ts:56](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L56)

___

### isRoot

• `Optional` **isRoot**: `boolean`

Whether to be a root at when used as a tree.

#### Defined in

[packages/g6/src/types/node.ts:51](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L51)

___

### label

• `Optional` **label**: `string`

The text to show on the node.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:39](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L39)

___

### parentId

• `Optional` **parentId**: `ID`

Reserved for combo.

#### Defined in

[packages/g6/src/types/node.ts:47](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L47)

___

### preventPolylineEdgeOverlap

• `Optional` **preventPolylineEdgeOverlap**: `boolean`

Whether to prevent overlap with unassociated edges. Used to preempt position.
Defaults to false.
Only valid for polyline

#### Defined in

[packages/g6/src/types/node.ts:80](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L80)

___

### type

• `Optional` **type**: `string`

Node type, e.g. 'circle-node'.

#### Defined in

[packages/g6/src/types/node.ts:29](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L29)

___

### visible

• `Optional` **visible**: `boolean`

Whether show the node by default.

#### Defined in

[packages/g6/src/types/node.ts:43](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L43)

___

### x

• `Optional` **x**: `number`

Node position.

#### Defined in

[packages/g6/src/types/node.ts:23](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L23)

___

### y

• `Optional` **y**: `number`

#### Defined in

[packages/g6/src/types/node.ts:24](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L24)

___

### z

• `Optional` **z**: `number`

#### Defined in

[packages/g6/src/types/node.ts:25](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L25)
