[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [plugins](../../modules/plugins.md) / FisheyeConfig

[plugins](../../modules/plugins.md).FisheyeConfig

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

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L5)

___

### d

• `Optional` **d**: `number`

A number representing the magnification factor of the fisheye.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:30](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L30)

___

### delegateStyle

• `Optional` **delegateStyle**: `Partial`<[`CircleStyleProps`](../item/CircleStyleProps.md) & [`RectStyleProps`](../item/RectStyleProps.md) & [`EllipseStyleProps`](../item/EllipseStyleProps.md) & [`PolygonStyleProps`](../item/PolygonStyleProps.md) & [`LineStyleProps`](../item/LineStyleProps.md) & [`PolylineStyleProps`](../item/PolylineStyleProps.md) & [`TextStyleProps`](../item/TextStyleProps.md) & [`ImageStyleProps`](../item/ImageStyleProps.md) & [`PathStyleProps`](../item/PathStyleProps.md) & [`SphereGeometryProps`](../item/SphereGeometryProps.md) & [`CubeGeometryProps`](../item/CubeGeometryProps.md) & [`PlaneGeometryProps`](../item/PlaneGeometryProps.md) & { `interactive?`: `boolean`  } & { `animates?`: `IAnimates` ; `lod?`: `number` ; `visible?`: `boolean`  }\>

The shape style

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:34](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L34)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L7)

___

### maxD

• `Optional` **maxD**: `number`

A number representing the maximum value of the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:46](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L46)

___

### maxR

• `Optional` **maxR**: `number`

A number representing the maximum value of the fisheye radius.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:42](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L42)

___

### minD

• `Optional` **minD**: `number`

A number representing the minimum value of the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:48](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L48)

___

### minR

• `Optional` **minR**: `number`

A number representing the minimum value of the fisheye radius.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:44](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L44)

___

### r

• `Optional` **r**: `number`

A number representing the radius of the fisheye.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:32](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L32)

___

### scaleDBy

• `Optional` **scaleDBy**: ``"unset"`` \| ``"drag"`` \| ``"wheel"``

Can be `'wheel'`, `'drag'`, `'unset'`, or `undefined`, representing the scaling method for the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:40](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L40)

___

### scaleRBy

• `Optional` **scaleRBy**: ``"unset"`` \| ``"drag"`` \| ``"wheel"``

Can be `'wheel'`, `'drag'`, `'unset'`, or `undefined`, representing the scaling method for the fisheye radius.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:38](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L38)

___

### showDPercent

• `Optional` **showDPercent**: `boolean`

A boolean indicating whether to show the percentage of the fisheye magnification factor.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:52](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L52)

___

### showLabel

• `Optional` **showLabel**: `boolean`

A boolean indicating whether to show the label.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:36](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L36)

___

### throttle

• `Optional` **throttle**: `number`

A number representing the throttle time (in milliseconds).

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:50](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L50)

___

### trigger

• `Optional` **trigger**: ``"click"`` \| ``"drag"`` \| ``"mousemove"``

The trigger method, which can be `'mousemove'`, `'click'`, or `'drag'`.

#### Defined in

[packages/g6/src/stdlib/plugin/fisheye/index.ts:28](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/fisheye/index.ts#L28)
