---
title: FisheyeConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / FisheyeConfig

[plugins](../../modules/plugins.en.md).FisheyeConfig

This is an interface named `FisheyeConfig`, which extends the `IPluginBaseConfig` interface. It contains the following properties:

- `trigger`: The trigger method, which can be `'mousemove'`, `'click'`, or `'drag'`.
- `d`: A number representing the magnification factor of the fisheye.
- `r`: A number representing the radius of the fisheye.
- `delegateStyle`: The shape style.
- `showLabel`: A boolean indicating whether to show the label.
- `scaleRBy`: Can be `'wheel'`, `'drag'`, `'unset'`, or `undefined`, representing the scaling method for the fisheye radius.
- `scaleDBy`: Can be `'wheel'`, `'drag'`, `'unset'`, or `undefined`, representing the scaling method for the fisheye magnification factor.
- `maxR`: A number representing the maximum value of the fisheye radius.
- `minR`: A number representing the minimum value of the fisheye radius.
- `maxD`: A number representing the maximum value of the fisheye magnification factor.
- `minD`: A number representing the minimum value of the fisheye magnification factor.
- `throttle`: A number representing the throttle time (in milliseconds).
- `showDPercent`: A boolean indicating whether to show the percentage of the fisheye magnification factor.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`FisheyeConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L6)

---

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L5)

---

### d

• `Optional` **d**: `number`

A number representing the magnification factor of the fisheye.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:30](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L30)

---

### delegateStyle

• `Optional` **delegateStyle**: `Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean` }\>

The shape style

**`Default`**

`{
 stroke: '#000',
   strokeOpacity: 0.8,
   lineWidth: 2,
   fillOpacity: 0.1,
   fill: '#ccc'
 }`

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:47](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L47)

---

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L7)

---

### maxD

• `Optional` **maxD**: `number`

A number representing the maximum value of the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:59](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L59)

---

### maxR

• `Optional` **maxR**: `number`

A number representing the maximum value of the fisheye radius.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:55](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L55)

---

### minD

• `Optional` **minD**: `number`

A number representing the minimum value of the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:61](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L61)

---

### minR

• `Optional` **minR**: `number`

A number representing the minimum value of the fisheye radius.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:57](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L57)

---

### r

• `Optional` **r**: `number`

A number representing the radius of the fisheye.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:32](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L32)

---

### scaleDBy

• `Optional` **scaleDBy**: `"unset"` \| `"drag"` \| `"wheel"`

Can be `'wheel'`, `'drag'`, `'unset'`, or `undefined`, representing the scaling method for the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:53](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L53)

---

### scaleRBy

• `Optional` **scaleRBy**: `"unset"` \| `"drag"` \| `"wheel"`

Can be `'wheel'`, `'drag'`, `'unset'`, or `undefined`, representing the scaling method for the fisheye radius.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:51](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L51)

---

### showDPercent

• `Optional` **showDPercent**: `boolean`

A boolean indicating whether to show the percentage of the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:65](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L65)

---

### showLabel

• `Optional` **showLabel**: `boolean`

A boolean indicating whether to show the label.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:49](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L49)

---

### throttle

• `Optional` **throttle**: `number`

A number representing the throttle time (in milliseconds).

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:63](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L63)

---

### trigger

• `Optional` **trigger**: `"click"` \| `"drag"` \| `"mousemove"`

The trigger method, which can be `'mousemove'`, `'click'`, or `'drag'`.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:28](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L28)
