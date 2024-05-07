[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [plugins](../../modules/plugins.md) / LegendConfig

[plugins](../../modules/plugins.md).LegendConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`LegendConfig`**

## Properties

### activeState

• `Optional` **activeState**: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:85](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L85)

___

### background

• `Optional` **background**: `string`

The color used to clear the canvas when it is initialized.

**`See`**

https://g.antv.antgroup.com/api/canvas/options#background

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:67](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L67)

___

### canvas

• `Optional` **canvas**: `Canvas`

User-defined GCanvas

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:62](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L62)

___

### className

• `Optional` **className**: `string`

ClassName for the DOM wrapper, "g6-category-legend" by default

#### Overrides

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:71](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L71)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

Container for the legend, using graph's container by default

#### Overrides

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:54](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L54)

___

### edge

• `Optional` **edge**: `ItemLegendConfig`

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:91](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L91)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L7)

___

### inactiveState

• `Optional` **inactiveState**: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:87](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L87)

___

### node

• `Optional` **node**: `ItemLegendConfig`

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:89](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L89)

___

### orientation

• `Optional` **orientation**: ``"horizontal"`` \| ``"vertical"``

Orientation for the legend layout.

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:79](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L79)

___

### renderer

• `Optional` **renderer**: `RendererName`

Renderer for the legend canvas, 'canvas' by default

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:58](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L58)

___

### selectedState

• `Optional` **selectedState**: `string`

Selected state name, triggered while clicking a legend item. Click will not take effect if selectedState is not assigned

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:83](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L83)

___

### size

• `Optional` **size**: ``"fit-content"`` \| [`string` \| `number`, `string` \| `number`]

Size for the legend canvas, 'fit-content', or an array of number(px) and string(percentage with %)

#### Defined in

[packages/g6/src/stdlib/plugin/legend/index.ts:75](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/legend/index.ts#L75)
