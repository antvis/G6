[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [layout](../../modules/layout.md) / ForceLayoutOptions

[layout](../../modules/layout.md).ForceLayoutOptions

## Hierarchy

- `CommonForceLayoutOptions`

  ↳ **`ForceLayoutOptions`**

## Properties

### center

• `Optional` **center**: `PointTuple`

#### Inherited from

CommonForceLayoutOptions.center

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:255

___

### centripetalOptions

• `Optional` **centripetalOptions**: `CentripetalOptions`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:281

___

### clusterNodeStrength

• `Optional` **clusterNodeStrength**: `number` \| (`node`: `Node`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:285

___

### clustering

• `Optional` **clustering**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:283

___

### collideStrength

• `Optional` **collideStrength**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:286

___

### coulombDisScale

• `Optional` **coulombDisScale**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:277

___

### damping

• `Optional` **damping**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:275

___

### dimensions

• `Optional` **dimensions**: `number`

#### Inherited from

CommonForceLayoutOptions.dimensions

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:254

___

### distanceThresholdMode

• `Optional` **distanceThresholdMode**: ``"min"`` \| ``"max"`` \| ``"mean"``

#### Inherited from

CommonForceLayoutOptions.distanceThresholdMode

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:258

___

### edgeStrength

• `Optional` **edgeStrength**: `number` \| (`d?`: `Edge`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:271

___

### factor

• `Optional` **factor**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:279

___

### getCenter

• `Optional` **getCenter**: (`node?`: `Node`, `degree?`: `number`) => `number`[]

#### Type declaration

▸ (`node?`, `degree?`): `number`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `Node` |
| `degree?` | `number` |

##### Returns

`number`[]

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:289

___

### getMass

• `Optional` **getMass**: (`node?`: `Node`) => `number`

#### Type declaration

▸ (`node?`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `Node` |

##### Returns

`number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:288

___

### gravity

• `Optional` **gravity**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:278

___

### height

• `Optional` **height**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:268

___

### interval

• `Optional` **interval**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:280

___

### leafCluster

• `Optional` **leafCluster**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:282

___

### linkDistance

• `Optional` **linkDistance**: `number` \| (`edge?`: `Edge`, `source?`: `any`, `target?`: `any`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:269

___

### maxDistance

• `Optional` **maxDistance**: `number`

If distance is specified, sets the maximum distance between nodes over which this force is considered.
If distance is not specified, returns the current maximum distance, which defaults to infinity.
Specifying a finite maximum distance improves performance and produces a more localized layout.

#### Inherited from

CommonForceLayoutOptions.maxDistance

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:264

___

### maxIteration

• `Optional` **maxIteration**: `number`

#### Inherited from

CommonForceLayoutOptions.maxIteration

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:257

___

### maxSpeed

• `Optional` **maxSpeed**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:276

___

### minMovement

• `Optional` **minMovement**: `number`

#### Inherited from

CommonForceLayoutOptions.minMovement

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:256

___

### monitor

• `Optional` **monitor**: (`params`: { `edges`: `Edge`[] ; `energy`: `number` ; `iterations`: `number` ; `nodes`: `Node`[]  }) => `void`

#### Type declaration

▸ (`params`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.edges` | `Edge`[] |
| `params.energy` | `number` |
| `params.iterations` | `number` |
| `params.nodes` | `Node`[] |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:290

___

### nodeClusterBy

• `Optional` **nodeClusterBy**: `string`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:284

___

### nodeSize

• `Optional` **nodeSize**: `number` \| `number`[] \| (`d?`: `Node`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:273

___

### nodeSpacing

• `Optional` **nodeSpacing**: `number` \| (`d?`: `Node`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:274

___

### nodeStrength

• `Optional` **nodeStrength**: `number` \| (`d?`: `Node`) => `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:270

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

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:287

___

### preventOverlap

• `Optional` **preventOverlap**: `boolean`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:272

___

### width

• `Optional` **width**: `number`

#### Defined in

node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:267
