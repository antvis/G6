[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [types](../modules/types.md) / Specification

# Interface: Specification<B, T\>

[types](../modules/types.md).Specification

## Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `BehaviorRegistry` |
| `T` | extends `ThemeRegistry` |

## Properties

### animate

• `Optional` **animate**: `AnimateCfg`

global animate

#### Defined in

[types/spec.ts:113](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L113)

___

### autoFit

• `Optional` **autoFit**: ``"center"`` \| ``"view"`` \| { `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> ; `padding?`: `Padding` ; `rules?`: `FitViewRules` ; `type`: ``"view"``  } \| { `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> ; `type`: ``"center"``  } \| { `alignment?`: `GraphAlignment` ; `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> ; `position`: `Point` ; `type`: ``"position"``  }

#### Defined in

[types/spec.ts:49](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L49)

___

### backgroundCanvas

• `Optional` **backgroundCanvas**: `Canvas`

#### Defined in

[types/spec.ts:36](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L36)

___

### canvas

• `Optional` **canvas**: `Canvas`

#### Defined in

[types/spec.ts:37](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L37)

___

### combo

• `Optional` **combo**: `ComboEncode` \| (`data`: [`ComboModel`](../modules/types.md#combomodel)) => [`ComboDisplayModel`](../modules/types.md#combodisplaymodel)

#### Defined in

[types/spec.ts:83](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L83)

___

### comboState

• `Optional` **comboState**: `Object`

#### Index signature

▪ [stateName: `string`]: (`data`: [`ComboModel`](../modules/types.md#combomodel)) => [`ComboDisplayModel`](../modules/types.md#combodisplaymodel) \| `ComboShapesEncode`

#### Defined in

[types/spec.ts:96](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L96)

___

### container

• `Optional` **container**: `string` \| `HTMLElement`

#### Defined in

[types/spec.ts:35](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L35)

___

### data

• `Optional` **data**: `DataConfig`

data

#### Defined in

[types/spec.ts:71](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L71)

___

### edge

• `Optional` **edge**: `EdgeEncode` \| (`data`: [`EdgeModel`](../modules/types.md#edgemodel)) => [`EdgeDisplayModel`](../modules/types.md#edgedisplaymodel)

#### Defined in

[types/spec.ts:82](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L82)

___

### edgeState

• `Optional` **edgeState**: `Object`

#### Index signature

▪ [stateName: `string`]: (`data`: [`EdgeModel`](../modules/types.md#edgemodel)) => [`EdgeDisplayModel`](../modules/types.md#edgedisplaymodel) \| `EdgeShapesEncode`

#### Defined in

[types/spec.ts:91](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L91)

___

### enableStack

• `Optional` **enableStack**: `boolean`

#### Defined in

[types/spec.ts:128](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L128)

___

### height

• `Optional` **height**: `number`

#### Defined in

[types/spec.ts:40](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L40)

___

### layout

• `Optional` **layout**: [`LayoutOptions`](../modules/types.md#layoutoptions) \| [`LayoutOptions`](../modules/types.md#layoutoptions)[]

layout

#### Defined in

[types/spec.ts:103](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L103)

___

### mode

• `Optional` **mode**: `string`

#### Defined in

[types/spec.ts:110](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L110)

___

### modes

• `Optional` **modes**: `Object`

interaction

#### Index signature

▪ [mode: `string`]: `BehaviorOptionsOf`<`B`\>[]

#### Defined in

[types/spec.ts:106](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L106)

___

### node

• `Optional` **node**: [`NodeEncode`](types-NodeEncode.md) \| (`data`: [`NodeModel`](../modules/types.md#nodemodel)) => [`NodeDisplayModel`](../modules/types.md#nodedisplaymodel)

item

#### Defined in

[types/spec.ts:81](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L81)

___

### nodeState

• `Optional` **nodeState**: `Object`

item state styles

#### Index signature

▪ [stateName: `string`]: (`data`: [`NodeModel`](../modules/types.md#nodemodel)) => [`NodeDisplayModel`](../modules/types.md#nodedisplaymodel) \| `NodeShapesEncode`

#### Defined in

[types/spec.ts:86](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L86)

___

### optimizeThreshold

• `Optional` **optimizeThreshold**: `number`

#### Defined in

[types/spec.ts:68](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L68)

___

### plugins

• `Optional` **plugins**: (`string` \| { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  })[]

free plugins

#### Defined in

[types/spec.ts:116](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L116)

___

### renderer

• `Optional` **renderer**: `RendererName` \| { `headless`: `boolean` ; `pixelRatio`: `number` ; `type`: `RendererName`  }

#### Defined in

[types/spec.ts:41](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L41)

___

### stackCfg

• `Optional` **stackCfg**: `StackCfg`

#### Defined in

[types/spec.ts:130](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L130)

___

### theme

• `Optional` **theme**: `ThemeOptionsOf`<`T`\>

theme

#### Defined in

[types/spec.ts:126](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L126)

___

### transform

• `Optional` **transform**: `string`[] \| { `[param: string]`: `unknown`; `type`: `string`  }[] \| `TransformerFn`[]

#### Defined in

[types/spec.ts:72](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L72)

___

### transientCanvas

• `Optional` **transientCanvas**: `Canvas`

#### Defined in

[types/spec.ts:38](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L38)

___

### width

• `Optional` **width**: `number`

#### Defined in

[types/spec.ts:39](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L39)

___

### zoom

• `Optional` **zoom**: `number`

#### Defined in

[types/spec.ts:48](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/spec.ts#L48)
