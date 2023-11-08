---
title: ToolbarConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / ToolbarConfig

[plugins](../../modules/plugins.en.md).ToolbarConfig

The `ToolbarConfig` interface contains the following properties:

- `handleClick`: An optional function for handling clicks on the toolbar. It takes two arguments: `code` (of type string) and `graph` (of type IGraph), and has no return value.
- `getContent`: A required function for getting the content of the toolbar. It takes an optional argument of type `IGraph`, and returns a value of type HTMLDivElement or string.
- `zoomSensitivity`: An optional number representing the zoom sensitivity of the toolbar. The default value is 10.
- `minZoom`: An optional number representing the minimum zoom ratio of the toolbar. The default value is 0.00001.
- `maxZoom`: An optional number representing the maximum zoom ratio of the toolbar. The default value is 1000.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`ToolbarConfig`**

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

### getContent

• **getContent**: (`graph?`: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `string` \| `HTMLDivElement`

#### Type declaration

▸ (`graph?`): `string` \| `HTMLDivElement`

Function for getting content of toolbar

##### Parameters

| Name | Type |
| :------ | :------ |
| `graph?` | [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\> |

##### Returns

`string` \| `HTMLDivElement`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:20](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L20)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L7)

___

### handleClick

• `Optional` **handleClick**: (`code`: `string`, `graph`: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `void`

#### Type declaration

▸ (`code`, `graph`): `void`

Function for handling clicks on toolbar

##### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `graph` | [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\> |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:18](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L18)

___

### maxZoom

• **maxZoom**: `number`

Maximum zoom ratio of toolbar

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:26](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L26)

___

### minZoom

• **minZoom**: `number`

Minimum zoom ratio of toolbar

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:24](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L24)

___

### zoomSensitivity

• **zoomSensitivity**: `number`

Zoom sensitivity of toolbar

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:22](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L22)
