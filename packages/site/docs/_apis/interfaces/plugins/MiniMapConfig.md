[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [plugins](../../modules/plugins.md) / MiniMapConfig

[plugins](../../modules/plugins.md).MiniMapConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`MiniMapConfig`**

## Properties

### className

• `Optional` **className**: `string`

Class name of minimap

#### Overrides

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:21](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L21)

___

### container

• `Optional` **container**: `HTMLDivElement`

Container for minimap

#### Overrides

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:35](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L35)

___

### delegateStyle

• `Optional` **delegateStyle**: `Partial`<[`CircleStyleProps`](../item/CircleStyleProps.md) & [`RectStyleProps`](../item/RectStyleProps.md) & [`EllipseStyleProps`](../item/EllipseStyleProps.md) & [`PolygonStyleProps`](../item/PolygonStyleProps.md) & [`LineStyleProps`](../item/LineStyleProps.md) & [`PolylineStyleProps`](../item/PolylineStyleProps.md) & [`TextStyleProps`](../item/TextStyleProps.md) & [`ImageStyleProps`](../item/ImageStyleProps.md) & [`PathStyleProps`](../item/PathStyleProps.md) & [`SphereGeometryProps`](../item/SphereGeometryProps.md) & [`CubeGeometryProps`](../item/CubeGeometryProps.md) & [`PlaneGeometryProps`](../item/PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

Style of delegate shape

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:27](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L27)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L7)

___

### hideEdge

• `Optional` **hideEdge**: `boolean`

Whether to hide edges on minimap to enhance performance

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:33](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L33)

___

### mode

• `Optional` **mode**: ``"keyShape"`` \| ``"default"`` \| ``"delegate"``

Mode of minimap

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:23](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L23)

___

### padding

• `Optional` **padding**: `number`

Padding of minimap

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:31](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L31)

___

### refresh

• `Optional` **refresh**: `boolean`

Whether to refresh minimap

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:29](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L29)

___

### size

• `Optional` **size**: `number`[]

Size of minimap

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:25](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L25)

___

### viewportClassName

• `Optional` **viewportClassName**: `string`

Class name of viewport

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:19](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/minimap/index.ts#L19)
