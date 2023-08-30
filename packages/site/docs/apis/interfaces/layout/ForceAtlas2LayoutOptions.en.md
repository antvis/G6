---
title: ForceAtlas2LayoutOptions
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [layout](../../modules/layout.en.md) / ForceAtlas2LayoutOptions

[layout](../../modules/layout.en.md).ForceAtlas2LayoutOptions

## Hierarchy

- `CommonForceLayoutOptions`

  ↳ **`ForceAtlas2LayoutOptions`**

## Properties

### barnesHut

• `Optional` **barnesHut**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:305

___

### center

• `Optional` **center**: `PointTuple`

#### Inherited from

CommonForceLayoutOptions.center

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:252

___

### dimensions

• `Optional` **dimensions**: `number`

#### Inherited from

CommonForceLayoutOptions.dimensions

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:251

___

### dissuadeHubs

• `Optional` **dissuadeHubs**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:304

___

### distanceThresholdMode

• `Optional` **distanceThresholdMode**: ``"max"`` \| ``"min"`` \| ``"mean"``

#### Inherited from

CommonForceLayoutOptions.distanceThresholdMode

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:255

___

### height

• `Optional` **height**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:296

___

### kg

• `Optional` **kg**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:298

___

### kr

• `Optional` **kr**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:297

___

### ks

• `Optional` **ks**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:299

___

### ksmax

• `Optional` **ksmax**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:300

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

### mode

• `Optional` **mode**: ``"normal"`` \| ``"linlog"``

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:302

___

### nodeSize

• `Optional` **nodeSize**: `number` \| `number`[] \| (`node?`: `Node`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:307

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

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:308

___

### preventOverlap

• `Optional` **preventOverlap**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:303

___

### prune

• `Optional` **prune**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:306

___

### tao

• `Optional` **tao**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:301

___

### width

• `Optional` **width**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:295
