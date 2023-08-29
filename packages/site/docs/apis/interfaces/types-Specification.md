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

[types/spec.ts:101](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L101)

___

### autoFit

• `Optional` **autoFit**: ``"center"`` \| ``"view"`` \| { `alignment`: `GraphAlignment` ; `position`: `Point`  }

#### Defined in

[types/spec.ts:49](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L49)

___

### backgroundCanvas

• `Optional` **backgroundCanvas**: `Canvas`

#### Defined in

[types/spec.ts:36](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L36)

___

### canvas

• `Optional` **canvas**: `Canvas`

#### Defined in

[types/spec.ts:37](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L37)

___

### combo

• `Optional` **combo**: `ComboEncode` \| (`data`: [`ComboModel`](../modules/types.md#combomodel)) => [`ComboDisplayModel`](../modules/types.md#combodisplaymodel)

#### Defined in

[types/spec.ts:71](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L71)

___

### comboState

• `Optional` **comboState**: `Object`

#### Index signature

▪ [stateName: `string`]: (`data`: [`ComboModel`](../modules/types.md#combomodel)) => [`ComboDisplayModel`](../modules/types.md#combodisplaymodel) \| `ComboShapesEncode`

#### Defined in

[types/spec.ts:84](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L84)

___

### container

• `Optional` **container**: `string` \| `HTMLElement`

#### Defined in

[types/spec.ts:35](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L35)

___

### data

• `Optional` **data**: `DataConfig`

data

#### Defined in

[types/spec.ts:59](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L59)

___

### edge

• `Optional` **edge**: `EdgeEncode` \| (`data`: [`EdgeModel`](../modules/types.md#edgemodel)) => [`EdgeDisplayModel`](../modules/types.md#edgedisplaymodel)

#### Defined in

[types/spec.ts:70](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L70)

___

### edgeState

• `Optional` **edgeState**: `Object`

#### Index signature

▪ [stateName: `string`]: (`data`: [`EdgeModel`](../modules/types.md#edgemodel)) => [`EdgeDisplayModel`](../modules/types.md#edgedisplaymodel) \| `EdgeShapesEncode`

#### Defined in

[types/spec.ts:79](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L79)

___

### enableStack

• `Optional` **enableStack**: `boolean`

#### Defined in

[types/spec.ts:116](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L116)

___

### height

• `Optional` **height**: `number`

#### Defined in

[types/spec.ts:40](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L40)

___

### layout

• `Optional` **layout**: [`LayoutOptions`](../modules/types.md#layoutoptions) \| [`LayoutOptions`](../modules/types.md#layoutoptions)[]

layout

#### Defined in

[types/spec.ts:91](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L91)

___

### mode

• `Optional` **mode**: `string`

#### Defined in

[types/spec.ts:98](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L98)

___

### modes

• `Optional` **modes**: `Object`

interaction

#### Index signature

▪ [mode: `string`]: `BehaviorOptionsOf`<`B`\>[]

#### Defined in

[types/spec.ts:94](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L94)

___

### node

• `Optional` **node**: [`NodeEncode`](types-NodeEncode.md) \| (`data`: [`NodeModel`](../modules/types.md#nodemodel)) => [`NodeDisplayModel`](../modules/types.md#nodedisplaymodel)

item

#### Defined in

[types/spec.ts:69](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L69)

___

### nodeState

• `Optional` **nodeState**: `Object`

item state styles

#### Index signature

▪ [stateName: `string`]: (`data`: [`NodeModel`](../modules/types.md#nodemodel)) => [`NodeDisplayModel`](../modules/types.md#nodedisplaymodel) \| `NodeShapesEncode`

#### Defined in

[types/spec.ts:74](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L74)

___

### optimizeThreshold

• `Optional` **optimizeThreshold**: `number`

#### Defined in

[types/spec.ts:56](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L56)

___

### plugins

• `Optional` **plugins**: (`string` \| { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string`  })[]

free plugins

#### Defined in

[types/spec.ts:104](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L104)

___

### renderer

• `Optional` **renderer**: `RendererName` \| { `headless`: `boolean` ; `pixelRatio`: `number` ; `type`: `RendererName`  }

#### Defined in

[types/spec.ts:41](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L41)

___

### stackCfg

• `Optional` **stackCfg**: `StackCfg`

#### Defined in

[types/spec.ts:118](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L118)

___

### theme

• `Optional` **theme**: `ThemeOptionsOf`<`T`\>

theme

#### Defined in

[types/spec.ts:114](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L114)

___

### transform

• `Optional` **transform**: `string`[] \| { `[param: string]`: `unknown`; `type`: `string`  }[] \| `TransformerFn`[]

#### Defined in

[types/spec.ts:60](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L60)

___

### transientCanvas

• `Optional` **transientCanvas**: `Canvas`

#### Defined in

[types/spec.ts:38](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L38)

___

### width

• `Optional` **width**: `number`

#### Defined in

[types/spec.ts:39](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L39)

___

### zoom

• `Optional` **zoom**: `number`

#### Defined in

[types/spec.ts:48](https://github.com/antvis/G6/blob/f5420ab2ac/packages/g6/src/types/spec.ts#L48)
