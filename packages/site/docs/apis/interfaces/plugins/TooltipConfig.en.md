---
title: TooltipConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / TooltipConfig

[plugins](../../modules/plugins.en.md).TooltipConfig

The `TooltipConfig` interface contains the following properties:

- `getContent`: An optional function for getting the content of the tooltip. It takes an optional argument of type `IG6GraphEvent`, and returns a value of type HTMLDivElement, string, or Promise (resolving to HTMLDivElement or string).
- `offsetX`: An optional number representing the offset of the tooltip in the X direction.
- `offsetY`: An optional number representing the offset of the tooltip in the Y direction.
- `shouldBegin`: An optional function for determining whether the tooltip should be displayed. It takes an optional argument of type `IG6GraphEvent`, and returns a boolean value.
- `itemTypes`: An optional array of strings representing the types of items for which the tooltip is allowed to be displayed. The possible values are 'node', 'edge', 'combo', and 'canvas'.
- `trigger`: An optional string, either 'pointerenter' or 'click', representing the event type that triggers the display of the tooltip.
- `fixToNode`: An optional array of two numbers, a string representing a placement, or undefined, representing how to fix the tooltip to a node.
- `loadingContent`: An optional HTMLDivElement or string representing the loading DOM.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`TooltipConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L5)

___

### fixToNode

• `Optional` **fixToNode**: [`number`, `number`] \| `Placement`

How to fix tooltip to node

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:85](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L85)

___

### getContent

• `Optional` **getContent**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md)) => `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Type declaration

▸ (`evt?`): `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

Function for getting tooltip content

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md) |

##### Returns

`string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:71](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L71)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L7)

___

### itemTypes

• `Optional` **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"`` \| ``"canvas"``)[]

Types of items for which tooltip is allowed to be displayed

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:81](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L81)

___

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

Loading DOM

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:87](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L87)

___

### offsetX

• `Optional` **offsetX**: `number`

Offset of tooltip in X direction

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:75](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L75)

___

### offsetY

• `Optional` **offsetY**: `number`

Offset of tooltip in Y direction

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:77](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L77)

___

### shouldBegin

• `Optional` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md)) => `boolean`

#### Type declaration

▸ (`evt?`): `boolean`

Determine whether to display tooltip

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.en.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:79](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L79)

___

### trigger

• `Optional` **trigger**: ``"click"`` \| ``"pointerenter"``

Event type that triggers display of tooltip

#### Defined in

[packages/g6/src/stdlib/plugin/tooltip/index.ts:83](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L83)
