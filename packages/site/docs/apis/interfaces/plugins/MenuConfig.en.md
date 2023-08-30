---
title: MenuConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / MenuConfig

[plugins](../../modules/plugins.en.md).MenuConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`MenuConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/plugin.ts#L5)

___

### getContent

• `Optional` **getContent**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md)) => `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Type declaration

▸ (`evt?`): `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md) |

##### Returns

`string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:41](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L41)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/plugin.ts#L7)

___

### handleMenuClick

• `Optional` **handleMenuClick**: (`target`: `HTMLElement`, `item`: `default`) => `void`

#### Type declaration

▸ (`target`, `item`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `item` | `default` |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:39](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L39)

___

### itemTypes

• `Optional` **itemTypes**: `string`[]

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:47](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L47)

___

### liHoverStyle

• `Optional` **liHoverStyle**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:52](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L52)

___

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:51](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L51)

___

### offsetX

• `Optional` **offsetX**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:44](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L44)

___

### offsetY

• `Optional` **offsetY**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:45](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L45)

___

### onHide

• `Optional` **onHide**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:49](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L49)

___

### shouldBegin

• `Optional` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md)) => `boolean`

#### Type declaration

▸ (`evt?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:46](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L46)

___

### trigger

• `Optional` **trigger**: ``"contextmenu"`` \| ``"click"``

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:48](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/menu/index.ts#L48)
