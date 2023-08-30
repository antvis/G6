[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / types

# Module: types

## Interfaces

- [GraphData](../interfaces/types-GraphData.md)
- [IG6GraphEvent](../interfaces/types-IG6GraphEvent.md)
- [IGraph](../interfaces/types-IGraph.md)
- [NodeEncode](../interfaces/types-NodeEncode.md)
- [Specification](../interfaces/types-Specification.md)

## Functions

### isImmediatelyInvokedLayoutOptions

▸ **isImmediatelyInvokedLayoutOptions**(`options`): options is ImmediatelyInvokedLayoutOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

options is ImmediatelyInvokedLayoutOptions

#### Defined in

[types/layout.ts:74](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/layout.ts#L74)

___

### isLayoutWorkerized

▸ **isLayoutWorkerized**(`options`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`StandardLayoutOptions`](types.md#standardlayoutoptions) |

#### Returns

`boolean`

#### Defined in

[types/layout.ts:80](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/layout.ts#L80)

## Type Aliases

### ComboDisplayModel

Ƭ **ComboDisplayModel**: `GNode`<`ComboDisplayModelData`\>

Displayed model, only for drawing and not received by users.

#### Defined in

[types/combo.ts:153](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/combo.ts#L153)

___

### ComboModel

Ƭ **ComboModel**: `GNode`<`ComboModelData`\>

Inner node model, clone and transform from user data.

#### Defined in

[types/combo.ts:150](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/combo.ts#L150)

___

### ComboUserModel

Ƭ **ComboUserModel**: `GNode`<`ComboUserModelData`\>

User input model.

#### Defined in

[types/combo.ts:147](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/combo.ts#L147)

___

### EdgeDisplayModel

Ƭ **EdgeDisplayModel**: `GEdge`<`EdgeDisplayModelData`\>

Displayed data, only for drawing and not received by users.

#### Defined in

[types/edge.ts:92](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/edge.ts#L92)

___

### EdgeModel

Ƭ **EdgeModel**: `GEdge`<`EdgeModelData`\>

Inner node data, clone and transform from user data.

#### Defined in

[types/edge.ts:89](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/edge.ts#L89)

___

### EdgeUserModel

Ƭ **EdgeUserModel**: `GEdge`<`EdgeUserModelData`\>

User input data.

#### Defined in

[types/edge.ts:86](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/edge.ts#L86)

___

### ICombo

Ƭ **ICombo**: `IItem`

#### Defined in

[types/combo.ts:177](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/combo.ts#L177)

___

### IEdge

Ƭ **IEdge**: `IItem`

#### Defined in

[types/edge.ts:122](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/edge.ts#L122)

___

### INode

Ƭ **INode**: `IItem`

#### Defined in

[types/node.ts:174](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L174)

___

### ImmediatelyInvokedLayoutOptions

Ƭ **ImmediatelyInvokedLayoutOptions**: { `execute`: (`graph`: `GraphCore`, `options?`: `any`) => `Promise`<`LayoutMapping`\>  } & `Animatable`

#### Defined in

[types/layout.ts:42](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/layout.ts#L42)

___

### LayoutOptions

Ƭ **LayoutOptions**: [`StandardLayoutOptions`](types.md#standardlayoutoptions) \| [`ImmediatelyInvokedLayoutOptions`](types.md#immediatelyinvokedlayoutoptions)

#### Defined in

[types/layout.ts:70](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/layout.ts#L70)

___

### NodeDisplayModel

Ƭ **NodeDisplayModel**: `GNode`<`NodeDisplayModelData`\>

Displayed model, only for drawing and not received by users.

#### Defined in

[types/node.ts:144](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L144)

___

### NodeModel

Ƭ **NodeModel**: `GNode`<[`NodeModelData`](types.md#nodemodeldata)\>

Inner node model, clone and transform from user data.

#### Defined in

[types/node.ts:141](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L141)

___

### NodeModelData

Ƭ **NodeModelData**: `NodeUserModelData`

Data in inner model. Same format to the user data.

#### Defined in

[types/node.ts:84](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L84)

___

### NodeUserModel

Ƭ **NodeUserModel**: `GNode`<`NodeUserModelData`\>

User input model.

#### Defined in

[types/node.ts:138](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/node.ts#L138)

___

### StandardLayoutOptions

Ƭ **StandardLayoutOptions**: `CircularLayout` \| `RandomLayout` \| `ConcentricLayout` \| `GridLayout` \| `MDSLayout` \| `RadialLayout` \| `FruchtermanLayout` \| `D3ForceLayout` \| `ForceLayout` \| `ForceAtlas2` \| `CustomLayout` & `Animatable` & `Workerized`

#### Defined in

[types/layout.ts:54](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/layout.ts#L54)
