---
title: Specification
---

> 📋 中文文档还在翻译中... 欢迎PR

[Overview - v5.0.0-beta.1](../../README.zh.md) / [Modules](../../modules.zh.md) / [graph](../../modules/graph.zh.md) / Specification

[graph](../../modules/graph.zh.md).Specification

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

[packages/g6/src/types/spec.ts:114](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L114)

___

### autoFit

• `Optional` **autoFit**: ``"center"`` \| ``"view"`` \| { `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> ; `padding?`: `Padding` ; `rules?`: `FitViewRules` ; `type`: ``"view"``  } \| { `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> ; `type`: ``"center"``  } \| { `alignment?`: `GraphAlignment` ; `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, ``"duration"`` \| ``"easing"`` \| ``"easingFunction"``\>\> ; `position`: `Point` ; `type`: ``"position"``  }

#### Defined in

[packages/g6/src/types/spec.ts:50](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L50)

___

### backgroundCanvas

• `Optional` **backgroundCanvas**: `Canvas`

#### Defined in

[packages/g6/src/types/spec.ts:37](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L37)

___

### canvas

• `Optional` **canvas**: `Canvas`

#### Defined in

[packages/g6/src/types/spec.ts:38](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L38)

___

### combo

• `Optional` **combo**: `ComboEncode` \| (`data`: `ComboModel`) => `ComboDisplayModel`

#### Defined in

[packages/g6/src/types/spec.ts:84](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L84)

___

### comboState

• `Optional` **comboState**: `Object`

#### Index signature

▪ [stateName: `string`]: (`data`: `ComboModel`) => `ComboDisplayModel` \| `ComboShapesEncode`

#### Defined in

[packages/g6/src/types/spec.ts:97](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L97)

___

### container

• `Optional` **container**: `string` \| `HTMLElement`

#### Defined in

[packages/g6/src/types/spec.ts:36](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L36)

___

### data

• `Optional` **data**: `DataConfig`

data

#### Defined in

[packages/g6/src/types/spec.ts:72](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L72)

___

### edge

• `Optional` **edge**: `EdgeEncode` \| (`data`: `EdgeModel`) => `EdgeDisplayModel`

#### Defined in

[packages/g6/src/types/spec.ts:83](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L83)

___

### edgeState

• `Optional` **edgeState**: `Object`

#### Index signature

▪ [stateName: `string`]: (`data`: `EdgeModel`) => `EdgeDisplayModel` \| `EdgeShapesEncode`

#### Defined in

[packages/g6/src/types/spec.ts:92](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L92)

___

### enableStack

• `Optional` **enableStack**: `boolean`

#### Defined in

[packages/g6/src/types/spec.ts:130](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L130)

___

### height

• `Optional` **height**: `number`

#### Defined in

[packages/g6/src/types/spec.ts:41](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L41)

___

### layout

• `Optional` **layout**: `LayoutOptions` \| `LayoutOptions`[]

layout

#### Defined in

[packages/g6/src/types/spec.ts:104](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L104)

___

### mode

• `Optional` **mode**: `string`

#### Defined in

[packages/g6/src/types/spec.ts:111](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L111)

___

### modes

• `Optional` **modes**: `Object`

interaction

#### Index signature

▪ [mode: `string`]: `BehaviorOptionsOf`<`B`\>[]

#### Defined in

[packages/g6/src/types/spec.ts:107](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L107)

___

### node

• `Optional` **node**: `NodeEncode` \| (`data`: `NodeModel`) => `NodeDisplayModel`

item

#### Defined in

[packages/g6/src/types/spec.ts:82](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L82)

___

### nodeState

• `Optional` **nodeState**: `Object`

item state styles

#### Index signature

▪ [stateName: `string`]: (`data`: `NodeModel`) => `NodeDisplayModel` \| `NodeShapesEncode`

#### Defined in

[packages/g6/src/types/spec.ts:87](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L87)

___

### optimizeThreshold

• `Optional` **optimizeThreshold**: `number`

#### Defined in

[packages/g6/src/types/spec.ts:69](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L69)

___

### plugins

• `Optional` **plugins**: (`string` \| `Plugin` \| { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  })[]

free plugins

#### Defined in

[packages/g6/src/types/spec.ts:117](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L117)

___

### renderer

• `Optional` **renderer**: `RendererName` \| { `headless`: `boolean` ; `pixelRatio`: `number` ; `type`: `RendererName`  }

#### Defined in

[packages/g6/src/types/spec.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L42)

___

### stackCfg

• `Optional` **stackCfg**: `StackCfg`

#### Defined in

[packages/g6/src/types/spec.ts:132](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L132)

___

### theme

• `Optional` **theme**: `ThemeOptionsOf`<`T`\>

theme

#### Defined in

[packages/g6/src/types/spec.ts:128](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L128)

___

### transforms

• `Optional` **transforms**: `string`[] \| { `[param: string]`: `unknown`; `type`: `string`  }[] \| `TransformerFn`[]

#### Defined in

[packages/g6/src/types/spec.ts:73](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L73)

___

### transientCanvas

• `Optional` **transientCanvas**: `Canvas`

#### Defined in

[packages/g6/src/types/spec.ts:39](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L39)

___

### width

• `Optional` **width**: `number`

#### Defined in

[packages/g6/src/types/spec.ts:40](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L40)

___

### zoom

• `Optional` **zoom**: `number`

#### Defined in

[packages/g6/src/types/spec.ts:49](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/spec.ts#L49)
