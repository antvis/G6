---
title: FruchtermanLayoutOptions
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [layout](../../modules/layout.en.md) / FruchtermanLayoutOptions

[layout](../../modules/layout.en.md).FruchtermanLayoutOptions

## Hierarchy

- `CommonForceLayoutOptions`

  ↳ **`FruchtermanLayoutOptions`**

## Properties

### center

• `Optional` **center**: `PointTuple`

#### Inherited from

CommonForceLayoutOptions.center

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:252

___

### clusterGravity

• `Optional` **clusterGravity**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:316

___

### clustering

• `Optional` **clustering**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:315

___

### dimensions

• `Optional` **dimensions**: `number`

#### Inherited from

CommonForceLayoutOptions.dimensions

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:251

___

### distanceThresholdMode

• `Optional` **distanceThresholdMode**: ``"max"`` \| ``"min"`` \| ``"mean"``

#### Inherited from

CommonForceLayoutOptions.distanceThresholdMode

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:255

___

### gravity

• `Optional` **gravity**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:313

___

### height

• `Optional` **height**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:312

___

### maxDistance

• `Optional` **maxDistance**: `number`

If distance is specified, sets the maximum distance between nodes over which this force is considered.
If distance is not specified, returns the current maximum distance, which defaults to infinity.
Specifying a finite maximum distance improves performance and produces a more localized layout.

#### Inherited from

CommonForceLayoutOptions.maxDistance

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:261

___

### maxIteration

• `Optional` **maxIteration**: `number`

#### Inherited from

CommonForceLayoutOptions.maxIteration

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:254

___

### minMovement

• `Optional` **minMovement**: `number`

#### Inherited from

CommonForceLayoutOptions.minMovement

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:253

___

### nodeClusterBy

• `Optional` **nodeClusterBy**: `string`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:317

___

### onTick

• `Optional` **onTick**: (`data`: `LayoutMapping`) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `LayoutMapping` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:318

___

### speed

• `Optional` **speed**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:314

___

### width

• `Optional` **width**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:311
