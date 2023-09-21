---
title: NodeUserModelData
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [item](../../modules/item.zh.md) / NodeUserModelData

[item](../../modules/item.zh.md).NodeUserModelData

Data in user input model.

## Hierarchy

- `PlainObject`

  ↳ **`NodeUserModelData`**

## Properties

### anchorPoints

• `Optional` **anchorPoints**: `number`[][]

The ratio position of the keyShape for related edges linking into. e.g. `[[0,0.5],[1,0.5]]`
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:73](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L73)

---

### badges

• `Optional` **badges**: { `position`: [`BadgePosition`](../../enums/item/BadgePosition.zh.md) ; `text`: `string` ; `type`: `"text"` \| `"icon"` }[]

The badges to show on the node.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:78](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L78)

---

### color

• `Optional` **color**: `string`

The subject color of the node's keyShape and anchor points.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L42)

---

### icon

• `Optional` **icon**: `Object`

The icon to show on the node.
More styles should be configured in node mapper.

#### Type declaration

| Name    | Type                 |
| :------ | :------------------- |
| `img?`  | `string`             |
| `text?` | `string`             |
| `type`  | `"text"` \| `"icon"` |

#### Defined in

[packages/g6/src/types/node.ts:64](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L64)

---

### isRoot

• `Optional` **isRoot**: `boolean`

Whether to be a root at when used as a tree.

#### Defined in

[packages/g6/src/types/node.ts:59](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L59)

---

### label

• `Optional` **label**: `string`

The text to show on the node.
More styles should be configured in node mapper.

#### Defined in

[packages/g6/src/types/node.ts:47](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L47)

---

### parentId

• `Optional` **parentId**: `ID`

The id of parent combo.

#### Defined in

[packages/g6/src/types/node.ts:55](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L55)

---

### preventPolylineEdgeOverlap

• `Optional` **preventPolylineEdgeOverlap**: `boolean`

Whether to prevent overlap with unassociated edges.

- Used to preempt position.
- Defaults to false.
- Only valid for polyline

#### Defined in

[packages/g6/src/types/node.ts:89](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L89)

---

### type

• `Optional` **type**: `string`

The type of node, e.g. `circle-node`.

#### Defined in

[packages/g6/src/types/node.ts:37](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L37)

---

### visible

• `Optional` **visible**: `boolean`

Whether show the node by default.

#### Defined in

[packages/g6/src/types/node.ts:51](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L51)

---

### x

• `Optional` **x**: `number`

The x-coordinate of node.

#### Defined in

[packages/g6/src/types/node.ts:25](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L25)

---

### y

• `Optional` **y**: `number`

The y-coordinate of node.

#### Defined in

[packages/g6/src/types/node.ts:29](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L29)

---

### z

• `Optional` **z**: `number`

The z-coordinate of node.

#### Defined in

[packages/g6/src/types/node.ts:33](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/node.ts#L33)
