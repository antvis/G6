---
title: ForceAtlas2LayoutOptions
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [layout](../../modules/layout.zh.md) / ForceAtlas2LayoutOptions

[layout](../../modules/layout.zh.md).ForceAtlas2LayoutOptions

## Hierarchy

- `CommonForceLayoutOptions`

  ↳ **`ForceAtlas2LayoutOptions`**

## Properties

### barnesHut

• `Optional` **barnesHut**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:305

---

### center

• `Optional` **center**: `PointTuple`

#### Inherited from

CommonForceLayoutOptions.center

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:252

---

### dimensions

• `Optional` **dimensions**: `number`

#### Inherited from

CommonForceLayoutOptions.dimensions

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:251

---

### dissuadeHubs

• `Optional` **dissuadeHubs**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:304

---

### distanceThresholdMode

• `Optional` **distanceThresholdMode**: `"min"` \| `"max"` \| `"mean"`

#### Inherited from

CommonForceLayoutOptions.distanceThresholdMode

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:255

---

### height

• `Optional` **height**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:296

---

### kg

• `Optional` **kg**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:298

---

### kr

• `Optional` **kr**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:297

---

### ks

• `Optional` **ks**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:299

---

### ksmax

• `Optional` **ksmax**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:300

---

### maxDistance

• `Optional` **maxDistance**: `number`

If distance is specified, sets the maximum distance between nodes over which this force is considered.
If distance is not specified, returns the current maximum distance, which defaults to infinity.
Specifying a finite maximum distance improves performance and produces a more localized layout.

#### Inherited from

CommonForceLayoutOptions.maxDistance

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:261

---

### maxIteration

• `Optional` **maxIteration**: `number`

#### Inherited from

CommonForceLayoutOptions.maxIteration

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:254

---

### minMovement

• `Optional` **minMovement**: `number`

#### Inherited from

CommonForceLayoutOptions.minMovement

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:253

---

### mode

• `Optional` **mode**: `"normal"` \| `"linlog"`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:302

---

### nodeSize

• `Optional` **nodeSize**: `number` \| `number`[] \| (`node?`: `Node`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:307

---

### onTick

• `Optional` **onTick**: (`data`: `LayoutMapping`) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name   | Type            |
| :----- | :-------------- |
| `data` | `LayoutMapping` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:308

---

### preventOverlap

• `Optional` **preventOverlap**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:303

---

### prune

• `Optional` **prune**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:306

---

### tao

• `Optional` **tao**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:301

---

### width

• `Optional` **width**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:295
