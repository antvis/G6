---
title: TooltipConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / TooltipConfig

[plugins](../../modules/plugins.en.md).TooltipConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`TooltipConfig`**

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

### fixToNode

• `Optional` **fixToNode**: [`number`, `number`] \| `Placement`

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:66](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L66)

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

[packages/g6/src/stdlib/plugin/tooltip/index.ts:57](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L57)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/plugin.ts#L7)

___

### itemTypes

• `Optional` **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"`` \| ``"canvas"``)[]

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:64](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L64)

___

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:67](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L67)

___

### offsetX

• `Optional` **offsetX**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:60](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L60)

___

### offsetY

• `Optional` **offsetY**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:61](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L61)

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

[packages/g6/src/stdlib/plugin/tooltip/index.ts:62](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L62)

___

### trigger

• `Optional` **trigger**: ``"click"`` \| ``"pointerenter"``

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:65](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/tooltip/index.ts#L65)
