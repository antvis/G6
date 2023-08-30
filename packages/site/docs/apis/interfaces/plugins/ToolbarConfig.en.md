---
title: ToolbarConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / ToolbarConfig

[plugins](../../modules/plugins.en.md).ToolbarConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`ToolbarConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L5)

___

### getContent

• **getContent**: (`graph?`: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `string` \| `HTMLDivElement`

#### Type declaration

▸ (`graph?`): `string` \| `HTMLDivElement`

##### Parameters

| Name | Type |
| :------ | :------ |
| `graph?` | [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\> |

##### Returns

`string` \| `HTMLDivElement`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:14](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/toolbar/index.ts#L14)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L7)

___

### handleClick

• `Optional` **handleClick**: (`code`: `string`, `graph`: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `void`

#### Type declaration

▸ (`code`, `graph`): `void`

toolbar config

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | toolbar item code |
| `graph` | [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\> | Graph Instance |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:13](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/toolbar/index.ts#L13)

___

### maxZoom

• **maxZoom**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:17](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/toolbar/index.ts#L17)

___

### minZoom

• **minZoom**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:16](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/toolbar/index.ts#L16)

___

### zoomSensitivity

• **zoomSensitivity**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/toolbar/index.ts:15](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/toolbar/index.ts#L15)
