---
title: MiniMapConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / MiniMapConfig

[plugins](../../modules/plugins.en.md).MiniMapConfig

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`MiniMapConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Overrides

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:19](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L19)

___

### container

• `Optional` **container**: `HTMLDivElement`

#### Overrides

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:26](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L26)

___

### delegateStyle

• `Optional` **delegateStyle**: `Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:22](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L22)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/types/plugin.ts#L7)

___

### hideEdge

• `Optional` **hideEdge**: `boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:25](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L25)

___

### mode

• `Optional` **mode**: ``"keyShape"`` \| ``"default"`` \| ``"delegate"``

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:20](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L20)

___

### padding

• `Optional` **padding**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:24](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L24)

___

### refresh

• `Optional` **refresh**: `boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:23](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L23)

___

### size

• `Optional` **size**: `number`[]

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:21](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L21)

___

### viewportClassName

• `Optional` **viewportClassName**: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/minimap/index.ts:18](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/plugin/minimap/index.ts#L18)
