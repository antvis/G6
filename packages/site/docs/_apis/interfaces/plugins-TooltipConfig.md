[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [plugins](../modules/plugins.md) / TooltipConfig

# Interface: TooltipConfig

[plugins](../modules/plugins.md).TooltipConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`TooltipConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[types/plugin.ts:6](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[types/plugin.ts:5](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/plugin.ts#L5)

___

### fixToNode

• `Optional` **fixToNode**: [`number`, `number`] \| `Placement`

#### Defined in

[stdlib/plugin/tooltip/index.ts:66](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L66)

___

### getContent

• `Optional` **getContent**: (`evt?`: [`IG6GraphEvent`](types-IG6GraphEvent.md)) => `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Type declaration

▸ (`evt?`): `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](types-IG6GraphEvent.md) |

##### Returns

`string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Defined in

[stdlib/plugin/tooltip/index.ts:57](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L57)

___

### graph

• `Optional` **graph**: [`IGraph`](types-IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[types/plugin.ts:7](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/plugin.ts#L7)

___

### itemTypes

• `Optional` **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"`` \| ``"canvas"``)[]

#### Defined in

[stdlib/plugin/tooltip/index.ts:64](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L64)

___

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

#### Defined in

[stdlib/plugin/tooltip/index.ts:67](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L67)

___

### offsetX

• `Optional` **offsetX**: `number`

#### Defined in

[stdlib/plugin/tooltip/index.ts:60](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L60)

___

### offsetY

• `Optional` **offsetY**: `number`

#### Defined in

[stdlib/plugin/tooltip/index.ts:61](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L61)

___

### shouldBegin

• `Optional` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](types-IG6GraphEvent.md)) => `boolean`

#### Type declaration

▸ (`evt?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](types-IG6GraphEvent.md) |

##### Returns

`boolean`

#### Defined in

[stdlib/plugin/tooltip/index.ts:62](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L62)

___

### trigger

• `Optional` **trigger**: ``"click"`` \| ``"pointerenter"``

#### Defined in

[stdlib/plugin/tooltip/index.ts:65](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/stdlib/plugin/tooltip/index.ts#L65)
