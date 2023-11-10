---
title: Graph 实例方法
order: 1
---

## 配置项操作 Specification

### getSpecification

获取当前图配置 Spec 的复制。

• **类型**: () => [`Specification`](Specification.zh.md)<`B`, `T`\>

### updateSpecification

更新当前图配置 Spec。

• **类型**: (`spec`: [`Specification`](Specification.zh.md)<`B`, `T`\>) => [`Specification`](Specification.zh.md)<`B`, `T`\>

• **参数**: 需要更新的增量部分配置。

### updateTheme

更新当前图配置 spec 中的主题部分。

• **类型**: (`theme`: `ThemeOptionsOf`<`T`\>) => `void`

• **参数**: 需要更新的主题配置。

### updateMapper

更新节点/边/ Combo 的映射器(mapper)，并重新渲染相关元素。

• **类型**: (`type`, `mapper`): `void`

• **参数**:

| Name     | Type                                          | Description        |
| :------- | :-------------------------------------------- | :----------------- |
| `type`   | `ITEM_TYPE`                                   | 需要更新的元素类型 |
| `mapper` | `NodeMapper` \| `EdgeMapper` \| `ComboMapper` | 更新的 mapper      |

### updateStateConfig

更新节点/边/ Combo 的状态样式配置，并重新渲染相关状态下的元素。

• **类型**: (`itemType`, `stateConfig`, `updateType?`): `void`

• **参数**:

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default value    | Description                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------- | :---------------------------------------------------------------------- |
| `itemType`    | `ITEM_TYPE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`      | 需要更新的元素类型                                                      |
| `stateConfig` | { `[stateName: string]`: (`data`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md)) => [`NodeDisplayModel`](../data/NodeDisplayModel.zh.md) \| `NodeShapesEncode`; } \| { `[stateName: string]`: (`data`: [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md)) => [`EdgeDisplayModel`](../data/EdgeDisplayModel.zh.md) \| `EdgeShapesEncode`; } \| { `[stateName: string]`: (`data`: [`ComboInnerModel`](../data/ComboInnerModel.zh.md)) => [`ComboDisplayModel`](../data/ComboDisplayModel.zh.md) \| `ComboShapesEncode`; } | `undefined`      | 更新的状态样式配置                                                      |
| `updateType`  | `"replace"` \| `"mergeReplace"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `'mergeReplace'` | `'replace'` 表示直接替换，`'mergeReplace'` 表示融合到原 mapper 上后替换 |

## 数据

### read

初次读取并渲染数据。

• **类型**: (`data`: [`GraphData`](GraphData.zh.md)) => `void`

• **参数**:

| Name   | Type                           |
| :----- | :----------------------------- |
| `data` | [`GraphData`](GraphData.zh.md) |

### addData

新增一个类型的数据。

• **类型**:

```typescript
 (itemType: ITEM_TYPE, model: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[]) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[]
```

• **参数**:
| Name | Type | Description |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `itemType` | `ITEM_TYPE` | 需要新增的元素类型，意味着一次调用只能新增一类元素，建议先增加节点再增加边，避免新增边时新增节点不存在 |
| `model` | [`NodeUserModel`](../data/NodeUserModel.zh.md) \| [`EdgeUserModel`](../data/EdgeUserModel.zh.md) \| [`ComboUserModel`](../data/ComboUserModel.zh.md) \| [`NodeUserModel`](../data/NodeUserModel.zh.md)[] \| [`EdgeUserModel`](../data/EdgeUserModel.zh.md)[] \| [`ComboUserModel`](../data/ComboUserModel.zh.md)[] | 新增的用户数据，可以是单条数据，也可以是数组 |

• **返回值**: 新增的数据

### changeData

全量更换数据。两种更换形式，`"replace"` 代表完全抛弃原有的数据，使用新数据;`"mergeReplace"` 表示，若新数据中有某些 id 的节点 / 边 / Combo 已经存在于画布中，则与对应的原数据进行融合后替换原始数据。

• **类型**:

```typescript
(data: GraphData, type: "replace" | "mergeReplace") => void
```

• **参数**:
| Name | Type | Description |
| :----- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [`GraphData`](GraphData.zh.md) | 新数据 |
| `type` | `"replace"` \| `"mergeReplace"` | 更换形式，`"replace"` 代表完全抛弃原有的数据，使用新数据;`"mergeReplace"` 表示，若新数据中有某些 id 的节点 / 边 / Combo 已经存在于画布中，则与对应的原数据进行融合后替换原始数据。 |

### updateData

一次更新一个类型的部分数据。

• **类型**:

```typescript
(itemType: ITEM_TYPE, model: Partial<NodeUserModel> | Partial<EdgeUserModel> | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[]>) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[]
```

• **参数**:

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                                       | Description                                                |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `itemType` | `ITEM_TYPE`                                                                                                                                                                                                                                                                                                                                                                                | 需要更新的数据类型，这意味着一次调用只能更新一个类型的数据 |
| `model`    | `Partial`<[`NodeUserModel`](../data/NodeUserModel.zh.md)\> \| `Partial`<[`EdgeUserModel`](../data/EdgeUserModel.zh.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.zh.md)\>[] \| `Partial`<[`EdgeUserModel`](../data/EdgeUserModel.zh.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md)\>[]\> | 需要更新的数据，可以是单条数据，或一个数组                 |

• **返回值**: 更新后的数据

[`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md) \| [`NodeInnerModel`](../data/NodeInnerModel.zh.md)[] \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md)[] \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)[]

### removeData

删除一条或多条同一类型的数据。

• **类型**: (`itemType`: `ITEM_TYPE`, `id`: `ID` \| `ID`[]) => `void`

• **参数**:
| Name | Type | Description |
| :--------- | :------------- | :----------------------------------- |
| `itemType` | `ITEM_TYPE` | 需要移除的数据类型，'node' \| 'edge' \| 'combo' |
| `id` | `ID` \| `ID`[] | 需要移除的数据 id，一条或多条 |

### getAllNodesData

获取所有的节点数据（内部流转数据）。

• **类型**: () => [`NodeInnerModel`](../data/NodeInnerModel.zh.md)[]

### getAllEdgesData

获取所有的边数据（内部流转数据）。

• **类型**: () => [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md)[]

### getAllCombosData

获取所有的 Combo 数据（内部流转数据）。

• **类型**: () => [`ComboInnerModel`](../data/ComboInnerModel.zh.md)[]

### getNodeData

获得指定 id 或条件的节点数据（内部流转数据）。

• **类型**: (`condition`: `Function` \| `ID`) => [`NodeInnerModel`](../data/NodeInnerModel.zh.md)

• **参数**:
| Name | Type | Description |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | 节点 id 或条件函数，条件函数的入参是节点内部流转数据 |

### getEdgeData

获得指定 id 或条件的边数据（内部流转数据）。

• **类型**: (`condition`: `Function` \| `ID`) => [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md)

• **参数**:
| Name | Type | Description |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | 边 id 或条件函数，条件函数的入参是边内部流转数据 |

### getComboData

获得指定 id 或条件的边数据（内部流转数据）。

• **类型**: (`condition`: `Function` \| `ID`) => [`ComboInnerModel`](../data/ComboInnerModel.zh.md)

• **参数**:
| Name | Type | Description |
| :---------- | :----------------- | :----------------------- |
| `condition` | `Function` \| `ID` | Combo id 或条件函数，条件函数的入参是 Combo 内部流转数据 |

### getNeighborNodesData

获取指定节点的一跳邻居节点数据（内部流转数据）。

• **类型**: (`nodeId`: `ID`, `direction?`: `"both"` \| `"in"` \| `"out"`) => [`NodeInnerModel`](../data/NodeInnerModel.zh.md)[]

• **参数**:
| Name | Type | Description |
| :----------- | :---------------------------- | :------------------- |
| `nodeId` | `ID` | 起始节点 id |
| `direction?` | `"both"` \| `"in"` \| `"out"` | 邻居的类型/方向，所有邻居("both")，指向起始节点的邻居("in")，从起始节点出发的邻居("out") |

• **返回值**: `NodeModel[]`，节点数据（内部流转数据）。

### getRelatedEdgesData

获取指定节点相关的边数据（内部流转数据）。

• **类型**: (`nodeId`: `ID`, `direction?`: `"both"` \| `"in"` \| `"out"`) => [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md)[]

• **参数**:
| Name | Type | Description |
| :----------- | :---------------------------- | :------------------- |
| `nodeId` | `ID` | 起始节点 id |
| `direction?` | `"both"` \| `"in"` \| `"out"` | 相关边的类型/方向，所有相关边("both")，指向起始节点的边("in")，从起始节点出发的边("out") |

• **返回值**: `EdgeModel[]`，相关边数据（内部流转数据）。

### getNearEdgesData

使用四叉树检测获取指定节点周围的相关边。

• **类型**: (`nodeId`: `ID`) => [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md)[]

• **参数**:
| Name | Type | Description |
| :------- | :--- | :--------------- |
| `nodeId` | `ID` | 目标节点的 id |

• **返回值**: `EdgeModel[]`，附近的边数据（内部流转数据）。

### updateNodePosition

更新单个/多个节点位置。此 API 不更新传入的其他样式，以达到更好的位置更新性能。

• **类型**:

```javascript
 (models: Partial<NodeUserModel> | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<ComboUserModel>[]>, upsertAncestors?: boolean, disableAnimate?: boolean, callback?: (model: NodeModel | EdgeModel | ComboModel, canceled?: boolean) => void) => NodeModel | ComboModel | NodeModel[] | ComboModel[]
```

• **参数**:

| Name               | Type                                                                                                                                                                                                                                                         | Description                                                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `models`           | `Partial`<[`NodeUserModel`](../data/NodeUserModel.zh.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.zh.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md)\>[]\> | 更新的配置项，每条数据包含节点 id 和 data，data 中包括 x y 信息                        |
| `upsertAncestors?` | `boolean`                                                                                                                                                                                                                                                    | 是否同时更新祖先 Combo                                                                 |
| `disableAnimate?`  | `boolean`                                                                                                                                                                                                                                                    | 是否禁用动画                                                                           |
| `callback?`        | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md), `canceled?`: `boolean`) => `void`                                                      | 位置更新完成后的回调函数。位置更新的渲染可能是异步的，可通过该回调进行更新完成后的逻辑 |

### clear

清空图内容，即移除所有的元素。

• **类型**: () => `void`

## 渲染器

### changeRenderer

运行时切换渲染器。

• **类型**: (`type`: `RendererName`) => `void`

• **参数**:
| Name | Type | Description |
| :----- | :------------- | :------------ |
| `type` | `RendererName` | 渲染器名称，可以是 'canvas'、'webgl'、'svg'、'webgl-3d'。使用 'webgl-3d' 时应当使用对应的交互和元素类型 |

## 元素

### findIdByState

获取指定状态和类型的元素 id 列表。

• **类型**: (`itemType`: `ITEM_TYPE`, `state`: `string`, `value?`: `string` \| `boolean`, `additionalFilter?`: (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)) => `boolean`) => `ID`[]

• **参数**:

| Name                | Type                                                                                                                                                                               | Description                                        |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `itemType`          | `ITEM_TYPE`                                                                                                                                                                        | 元素类型                                           |
| `state`             | `string`                                                                                                                                                                           | 状态名称                                           |
| `value?`            | `string` \| `boolean`                                                                                                                                                              | 状态值，默认为 `true`                              |
| `additionalFilter?` | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)) => `boolean` | 额外的筛选器，入参为满足状态的数据（内部流转数据） |

• **返回值**: `ID`[]，满足条件的元素的 id 列表。

### getItemAllStates

获取指定元素的所有 `true` 的状态名。

• **类型**: (`id`: `ID`) => `string`[]

• **参数**:

| Name | Type | Description   |
| :--- | :--- | :------------ |
| `id` | `ID` | 指定的元素 id |

• **返回值**: `string[]`，状态名列表。

### getItemState

获取指定元素、指定状态的状态值。

• **类型**: (`id`: `ID`, `state`: `string`) => `string` \| `boolean`

• **参数**:

| Name    | Type     | Description   |
| :------ | :------- | :------------ |
| `id`    | `ID`     | 指定的元素 id |
| `state` | `string` | 指定的状态名  |

• **返回值**: `string | boolean`，指定元素、指定状态的状态值。

### setItemState

设置单个/多个元素状态。

• **类型**: (`ids`: `ID` \| `ID`[], `state`: `string`, `value`: `boolean`) => `void`

• **参数**:

| Name    | Type           | Description                         |
| :------ | :------------- | :---------------------------------- |
| `ids`   | `ID` \| `ID`[] | 单个或多个需要被设置状态的元素的 id |
| `state` | `string`       | 需要被设置的状态名                  |
| `value` | `boolean`      | 状态值                              |

### clearItemState

清除指定单个/多个元素的状态。

• **类型**: (`ids`: `ID` \| `ID`[], `states?`: `string`[]) => `void`

• **参数**:

| Name      | Type           | Description            |
| :-------- | :------------- | :--------------------- |
| `ids`     | `ID` \| `ID`[] | 需要被清空的元素的 id  |
| `states?` | `string`[]     | 需要被清空的元素名列表 |

### showItem

显示单个或多个元素。和 [hideItem](#hideitem) 对应。

• **类型**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **参数**:

| Name              | Type           | Description                  |
| :---------------- | :------------- | :--------------------------- |
| `ids`             | `ID` \| `ID`[] | 需要被显示的元素 id          |
| `disableAnimate?` | `boolean`      | 是否禁用动画，默认为 `false` |

### hideItem

隐藏单个或多个元素。和 [showItem](#showitem) 对应。

• **类型**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **参数**:

| Name              | Type           | Description                  |
| :---------------- | :------------- | :--------------------------- |
| `ids`             | `ID` \| `ID`[] | 需要被隐藏的元素 id          |
| `disableAnimate?` | `boolean`      | 是否禁用动画，默认为 `false` |

### getItemVisible

获取指定元素的可见性。

• **类型**: (`id`: `ID`) => `boolean`

• **参数**:

| Name | Type | Description |
| :--- | :--- | :---------- |
| `id` | `ID` | 元素 id     |

### frontItem

将指定单个/多个元素层级放到最前。需要注意的是，节点的层级永远高于边。

• **类型**: (`ids`: `ID` \| `ID`[]) => `void`

• **参数**:

| Name  | Type           | Description               |
| :---- | :------------- | :------------------------ |
| `ids` | `ID` \| `ID`[] | 需要被调整层级的元素的 id |

### backItem

将指定单个/多个元素层级放到最后。需要注意的是，节点的层级永远高于边。

• **类型**: (`ids`: `ID` \| `ID`[]) => `void`

• **参数**:

| Name  | Type           | Description               |
| :---- | :------------- | :------------------------ |
| `ids` | `ID` \| `ID`[] | 需要被调整层级的元素的 id |

## Combo

### addCombo

新增 combo，同时更新指定的子节点，从原父 combo 中移动到新 combo 中。本质上是 addData，但在增加 combo 数据的基础上做一些 Combo 层级嵌套树的调整。

• **类型**: (`model`: [`ComboUserModel`](../data/ComboUserModel.zh.md), `childrenIds`: `ID`[]) => [`ComboInnerModel`](../data/ComboInnerModel.zh.md)

• **参数**:

| Name          | Type                                             | Description            |
| :------------ | :----------------------------------------------- | :--------------------- |
| `model`       | [`ComboUserModel`](../data/ComboUserModel.zh.md) | Combo 数据（用户数据） |
| `childrenIds` | `ID`[]                                           | 子节点 id 列表         |

• **返回值**: [`ComboInnerModel`](../data/ComboInnerModel.zh.md)，新增的 Combo 数据（内部流转数据）。

### collapseCombo

收起指定的单个/多个 Combo，与 [expandCombo](#expandCombo) 对应。

• **类型**: (`comboIds`: `ID` \| `ID`[]) => `void`

• **参数**:

| Name       | Type                  |
| :--------- | :-------------------- |
| `comboIds` | 需要被收起的 combo id |

### expandCombo

展开指定的单个/多个 Combo，与 [collapseCombo](#collapseCombo) 对应。

• **类型**: (`comboIds`: `ID` \| `ID`[]) => `void`

• **参数**:

| Name       | Type                  |
| :--------- | :-------------------- |
| `comboIds` | 需要被展开的 combo id |

### moveCombo

移动单个/多个 Combo 一个相对的距离（dx，dy）。该 API 将不更新其他样式以提升更新位置的性能。事实上，由于 Combo 的位置取决的内部子元素的分布和位置，因此该 API 实际上是在更新指定 Combo 的后继元素的位置，以影响该 Combo 以达到移动该 Combo 的目的，而不是直接更新该 Combo 的位置。

• **类型**: (`ids`: `ID`[], `dx`: `number`, `dy`: `number`, `upsertAncestors?`: `boolean`, `callback?`: (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md), `canceled?`: `boolean`) => `void`) => [`ComboInnerModel`](../data/ComboInnerModel.zh.md)[]

• **参数**:

| Name               | Type                                                                                                                                                                                                    | Description            |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- |
| `ids`              | `ID`[]                                                                                                                                                                                                  | 需要被更新的 Combo id  |
| `dx`               | `number`                                                                                                                                                                                                | 移动的 x 轴相对距离    |
| `dy`               | `number`                                                                                                                                                                                                | 移动的 y 轴相对距离    |
| `upsertAncestors?` | `boolean`                                                                                                                                                                                               | 是否同时更新祖先 Combo |
| `callback?`        | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md), `canceled?`: `boolean`) => `void` | 更新完成后的回调函数   |

• **返回值**: `ComboModel[]`，更新后的 Combo 数据（内部流转数据）。

### updateComboPosition

更新单个或多个 Combo 的位置到指定位置（x，y）上。类似节点的对应 API [updateNodePosition](#updatenodeposition)。

• **类型**: (`models`: `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.zh.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md)\>[]\>, `upsertAncestors?`: `boolean`, `disableAnimate?`: `boolean`, `callback?`: (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)) => `void`) => [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md) \| [`NodeInnerModel`](../data/NodeInnerModel.zh.md)[] \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)[]

• **参数**:

| Name               | Type                                                                                                                                                                                                                                                           | Description                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `models`           | `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md)\> \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md) \| `Partial`<[`NodeUserModel`](../data/NodeUserModel.zh.md)\>[] \| `Partial`<[`ComboUserModel`](../data/ComboUserModel.zh.md)\>[]\> | 每条数据带有需要更新的 Combo id 以及 data，data 中包含新的 `x` `y` 信息 |
| `upsertAncestors?` | `boolean`                                                                                                                                                                                                                                                      | 是否同时更新祖先 Combo                                                  |
| `disableAnimate?`  | `boolean`                                                                                                                                                                                                                                                      | 是否禁用动画                                                            |
| `callback?`        | (`model`: [`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`EdgeInnerModel`](../data/EdgeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)) => `void`                                                                                | 更新完成的回调函数                                                      |

• **返回值**: [`ComboInnerModel`](../data/ComboInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md)[]，更新后的 Combo 数据（内部流转数据）。

### getComboChildrenData

获取 Combo 子元素（节点/ Combo）数据（内部流转数据）。

• **类型**: (`comboId`: `ID`) => ([`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md))[]

• **参数**:

| Name      | Type     |
| :-------- | :------- |
| `comboId` | Combo id |

• **返回值**: ([`NodeInnerModel`](../data/NodeInnerModel.zh.md) \| [`ComboInnerModel`](../data/ComboInnerModel.zh.md))[]，子元素数据（内部流转数据）。

## 布局

### layout

执行布局。若不传参，则按照图实例化配置的 spec 中的 layout 配置重新执行布局。若传参，则更新图的布局配置的同时，重新执行布局。

• **类型**: (`options?`: `LayoutOptions`, `disableAnimate?`: `boolean`) => `Promise`<`void`\>

• **参数**:

| Name              | Type            | Description                  |
| :---------------- | :-------------- | :--------------------------- |
| `options?`        | `LayoutOptions` | 布局配置                     |
| `disableAnimate?` | `boolean`       | 是否禁用布局完成后的插值动画 |

• **返回值**: `Promise`<`void`\>，布局可能是异步执行的，返回布局执行的 Promise。

### stopLayout

停止布局。适用于带有迭代动画的布局，目前有 `'force'` 属于此类布局，即停止力导布局的迭代，一般用于布局迭代时间过长情况下的手动停止迭代动画，例如在点击画布/节点的监听中调用。

• **类型**: () => `void`

## 交互与事件

### on

监听一个事件。

• **类型**: (`evtName`, `listener`: (`evt`: `IG6GraphEvent`) => `void`): `void`

• **参数**:

| Name       | Type                                                                    | Description |
| :--------- | :---------------------------------------------------------------------- | :---------- |
| `evtName`  | `string`                                                                | 事件名称    |
| `listener` | (`evt`: [`IG6GraphEvent`](../behaviors//IG6GraphEvent.zh.md)) => `void` | 监听函数    |

### once

监听一个事件，仅监听一次，一旦完成后便销毁。

• **类型**: (`evtName`, `listener`: (`evt`: `IG6GraphEvent`) => `void`): `void`

• **参数**:

| Name       | Type                                                                    | Description |
| :--------- | :---------------------------------------------------------------------- | :---------- |
| `evtName`  | `string`                                                                | 事件名称    |
| `listener` | (`evt`: [`IG6GraphEvent`](../behaviors//IG6GraphEvent.zh.md)) => `void` | 监听函数    |

### off

取消一个监听，或一个事件名称下的所有监听

• **类型**: (`evtName`: `string`, `listener?`: (`evt: IG6GraphEvent`) => `void`): `void`

• **参数**:

| Name        | Type       | Description                                         |
| :---------- | :--------- | :-------------------------------------------------- |
| `evtName`   | `string`   | 事件名称                                            |
| `listener?` | `Function` | 监听句柄。若不指定，则取消 `evtName` 相关的所有监听 |

### emit

触发一个事件。

• **类型**: (`evtName`, `param`: `any`): `void`

• **参数**:

| Name      | Type     | Description                                                                                                                                                                     |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `evtName` | `string` | 出发的事件名称，除了可手动触发交互事件以外，还可以触发任意自定义事件，即指定 `evtName` 为任意字符串，后续可通过 `graph.on` 监听对应字符串名的事件以达到自定义事件及其监听的目的 |
| `param`   | `any`    | 触发事件伴随的参数，不同的事件可能内容不相同                                                                                                                                    |

### getMode

G6 图提供不同的交互模式配置，可以理解为交互的分组。不同模式下配置不同交互，以便快速切换不同的交互分组。例如只读模式下，只能拖拽和缩放画布。编辑模式下，可以创建边等。通过 [`setMode`](#setmode) 切换交互模式，[`getMode`](#getmode) 获取当前的交互模式。

• **类型**: () => `string`

### setMode

G6 图提供不同的交互模式配置，可以理解为交互的分组。不同模式下配置不同交互，以便快速切换不同的交互分组。例如只读模式下，只能拖拽和缩放画布。编辑模式下，可以创建边等。通过 [`setMode`](#setmode) 切换交互模式，[`getMode`](#getmode) 获取当前的交互模式。

• **类型**: (`mode`: `string`) => `void`

| Name   | Type     | Description                                            |
| :----- | :------- | :----------------------------------------------------- |
| `mode` | `string` | 模式名称，和图实例配置 spec 中 modes 对象中的 key 对应 |

### addBehaviors

为指定的模式（默认为 default 模式）中新增一个或多个交互。

• **类型**: (`behaviors`: `BehaviorOptionsOf`<`B`\> \| `BehaviorOptionsOf`<`B`\>[], `modes`: `string` \| `string`[]) => `void`

• **参数**:

| Name        | Type                                                     | Description                                |
| :---------- | :------------------------------------------------------- | :----------------------------------------- |
| `behaviors` | `BehaviorOptionsOf`<`B`\> \| `BehaviorOptionsOf`<`B`\>[] | 单个或多个交互的配置                       |
| `modes`     | `string` \| `string`[]                                   | 被加入交互的交互模式名称，默认为 `default` |

### removeBehaviors

从指定的模式（默认为 default 模式）中移除一个交互。

• **类型**: (`behaviorKeys`: `string`[], `modes`: `string` \| `string`[]) => `void`

• **参数**:

| Name           | Type                   | Description                                                                                                                |
| :------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `behaviorKeys` | `string`[]             | 需要被移除的交互配置中的 key。如果有移除和更新交互的诉求，必须在配置交互时，在配置项中给到唯一的 key，以便删改时找到对应。 |
| `modes`        | `string` \| `string`[] | 需要从哪个交互模式中移除指定的交互                                                                                         |

### updateBehavior

更新一个交互的配置。

• **类型**: (`behavior`: `BehaviorOptionsOf`<`B`\>, `mode?`: `string`) => `void`

• **参数**:

| Name       | Type                      | Description                                                                                                                             |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `behavior` | `BehaviorOptionsOf`<`B`\> | 更新的交互配置，通过配置中的 key 进行对应。如果有移除和更新交互的诉求，必须在配置交互时，在配置项中给到唯一的 key，以便删改时找到对应。 |
| `mode?`    | `string`                  | 交互模式的名称                                                                                                                          |

### drawTransient

绘制一个临时图形，一般用于配合交互过程中更新临时图形以表达交互，从而避免更新主图层中的图形造成不必要的性能开销。 采用临时层画布提升交互性能原理如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VkT7T4Qzt2gAAAAAAAAAAAAADmJ7AQ/original" />

• **类型**: (`type`: `ITEM_TYPE` \| `SHAPE_TYPE`, `id`: `ID`, `config`: `any`, `canvas?`: `Canvas`) => `DisplayObject`<`any`, `any`\>

• **参数**:

| Name     | Type                        | Description                                                                                                           |
| :------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `type`   | `ITEM_TYPE` \| `SHAPE_TYPE` | 图形或元素的类型，例如 `'circle'`, `'line'` 等图形类型名称，或 `'node'`, `'edge'`, `'combo'` 以复制现有的元素到临时层 |
| `id`     | `ID`                        | 给出临时图形的 id 方便后续检索。若是复制当前画布上的节点 / 边 / Combo，则指定为对应元素的 id                          |
| `config` | `any`                       | 图形样式的配置，例如大小、颜色等。适用于绘制临时图形，而不是复制元素，因为复制元素将直接使用被复制元素的样式          |

• **返回值**: `DisplayObject`<`any`, `any`\>，被绘制的图形对象。若为复制元素，则将返回包含所有相关图形的图形分组。

## 视图

### zoom

给出**相对的**缩放比例，以及缩放中心，进行图的缩放。

• **类型**: (`ratio`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name            | Type                                                                                            | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `ratio`         | `number`                                                                                        | 相对的缩放比例                                                     |
| `center?`       | `Point`                                                                                         | 缩放中心                                                           |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

• **返回值**: `Promise`<`void`\>，由于带动画的缩放是异步完成的，因此返回 Promise。

### zoomTo

给出**绝对的**缩放比例值，以及缩放中心，将图缩放到指定的比例上。

• **类型**: (`toRatio`: `number`, `center?`: `Point`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name            | Type                                                                                            | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `toRatio`       | `number`                                                                                        | 指定绝对的缩放比例                                                 |
| `center?`       | `Point`                                                                                         | 缩放中心                                                           |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

• **返回值**: `Promise`<`void`\>，由于带动画的缩放是异步完成的，因此返回 Promise。

### getZoom

获取当前图的缩放比例。

• **类型**: () => `number`

### translate

给出相对的平移距离（`dx`，`dy`），移动画布。

• **类型**: (`distance`: `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number` }\>, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name            | Type                                                                                            | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `distance`      | `Partial`<{ `dx`: `number` ; `dy`: `number` ; `dz`: `number` }\>                                | 相对的移动距离                                                     |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

• **返回值**: `Promise`<`void`\>，由于带动画的平移是异步完成的，因此返回 Promise。

### translateTo

给出绝对的目标位置（`x`，`y`），将图内容移动到指定位置。

• **类型**: (`point`: `PointLike`, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name            | Type                                                                                            | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `point`         | `PointLike`                                                                                     | 绝对的目标位置                                                     |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

• **返回值**: `Promise`<`void`\>，由于带动画的平移是异步完成的，因此返回 Promise。

### fitCenter

将图内容平移，使图内容的中心对齐当前视窗的中心点。不进行缩放。

• **类型**: (`effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name            | Type                                                                                            | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

• **返回值**: `Promise`<`void`\>，由于带动画的适配是异步完成的，因此返回 Promise。

### fitView

将图内容平移和缩放，使图内容适配当前视窗大小。

• **类型**: (`options?`: { `padding`: `Padding` ; `rules`: `FitViewRules` }, `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name              | Type                                                                                            | Description                                                        |
| :---------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `options?`        | `object`                                                                                        | 适配视窗的参数                                                     |
| `options.padding` | `Padding`                                                                                       | 适配视窗使，四周的留白距离                                         |
| `options.rules`   | `FitViewRules`                                                                                  | 适配视窗的规则，类型见下方                                         |
| `effectTiming?`   | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

`FitViewRules` 类型如下

| Name                            | Type                       | Description                                                                                                                                             |
| :------------------------------ | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onlyOutOfViewport?`            | `boolean`                  | 是否仅当图内容超出视窗时，进行适配                                                                                                                      |
| `onlyZoomAtLargerThanViewport?` | `boolean`                  | 是否仅当图内容大于视窗时，进行适配                                                                                                                      |
| `direction?`                    | `'x'` \| `'y'` \| `'both'` | 适配时限制缩放的方向，默认为 `'both'`                                                                                                                   |
| `ratioRule?`                    | `'max'` \| `'min'`         | 缩放比例应当根据横、纵方向上的较大者还是较小者                                                                                                          |
| `boundsType?`                   | `'render'` \| `'layout'`   | 根据渲染的包围盒进行适配，还是根据节点布局的位置进行适配。默认为 `'render'`， `'layout'` 适用于初次渲染时，完成了布局计算，但未完成渲染层面的更新时使用 |

• **返回值**: `Promise`<`void`\>，由于带动画的适配是异步完成的，因此返回 Promise。

### focusItem

平移画布以使指定的单个或多个元素（平均中心）对齐到当前视窗的中心。

• **类型**: (`id`: `ID` \| `ID`[], `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\>) => `Promise`<`void`\>

• **参数**:

| Name            | Type                                                                                            | Description                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `id`            | `ID` \| `ID`[]                                                                                  | 单个或多个元素的 id                                                |
| `effectTiming?` | `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> | 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 |

• **返回值**: `Promise`<`void`\>，由于带动画的平移是异步完成的，因此返回 Promise。

### stopTransformTransition

停止所有平移、缩放相关的动画。

• **类型**: () => `void`

### getSize

获取当前图容器的大小。

• **类型**: () => `number`[]

• **参数**: `number`[]，表示 [宽度, 高度]

### setSize

设置当前图容器的大小。

• **类型**: (`size`: `number`[]) => `void`

• **参数**:

| Name   | Type       |
| :----- | :--------- |
| `size` | `number`[] |

### getViewportCenter

获取当前视窗的中心点坐标。例如 500 \* 500 的容器，将返回中心值 { x: 250, y: 250 }。

• **类型**: () => `PointLike`

• **返回值**: `PointLike`，即 `{ x: number, y: number }`

### getCanvasByClient

给定的浏览器坐标，转换为画布上的绘制坐标。

• **类型**: (`ClientPoint`: `Point`) => `Point`

• **参数**:

| Name          | Type    |
| :------------ | :------ |
| `ClientPoint` | `Point` |

### getCanvasByViewport

给定的视窗 DOM 坐标，转换为画布上的绘制坐标。

• **类型**: (`viewportPoint`: `Point`) => `Point`

• **参数**:

| Name            | Type    |
| :-------------- | :------ |
| `viewportPoint` | `Point` |

### getClientByCanvas

给定画布上的绘制坐标，转换为浏览器坐标。

• **类型**: (`canvasPoint`: `Point`) => `Point`

• **参数**:

| Name          | Type    |
| :------------ | :------ |
| `canvasPoint` | `Point` |

### getViewportByCanvas

给定画布上的绘制坐标，转换为视窗 DOM 的坐标。

• **类型**: (`canvasPoint`: `Point`) => `Point`

• **参数**:

| Name          | Type    |
| :------------ | :------ |
| `canvasPoint` | `Point` |

### getRenderBBox

获取指定元素的包围盒。若不指定元素，则表示获取当前渲染的图所有内容的整体包围盒。

• **类型**: (`id`: `ID`, `onlyKeyShape?`: `boolean`, `isTransient?`: `boolean`) => `false` \| `AABB`

• **参数**:

| Name            | Type      | Description                                                                  |
| :-------------- | :-------- | :--------------------------------------------------------------------------- |
| `id`            | `ID`      | 指定元素获取包围盒。若不指定元素，则表示获取当前渲染的图所有内容的整体包围盒 |
| `onlyKeyShape?` | `boolean` | 是否仅计算主图形 keyShape 的包围盒                                           |
| `isTransient?`  | `boolean` | 是计算的是临时图形的包围盒                                                   |

• **返回值**: `false` \| `AABB`。若不存在对应元素则返回 `false`

## 树图

### collapse

收起一个或多个子树。和展开 [expand](#expand) 对应。

• **类型**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **参数**:

| Name              | Type           | Description     |
| :---------------- | :------------- | :-------------- |
| `ids`             | `ID` \| `ID`[] | 子树根节点的 id |
| `disableAnimate?` | `boolean`      | 是否禁用动画    |

### expand

展开一个或多个子树。和收起 [collapse](#collapse) 对应。

• **类型**: (`ids`: `ID` \| `ID`[], `disableAnimate?`: `boolean`) => `void`

• **参数**:

| Name              | Type           | Description     |
| :---------------- | :------------- | :-------------- |
| `ids`             | `ID` \| `ID`[] | 子树根节点的 id |
| `disableAnimate?` | `boolean`      | 是否禁用动画    |

## 历史栈

### isHistoryEnabled

• **isHistoryEnabled**: () => `void`

#### Type declaration

▸ (): `void`

Determine if history (redo/undo) is enabled.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:674](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L674)

---

### getRedoStack

• **getRedoStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the current undo stack which consists of operations that were undone

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:703](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L703)

---

### getUndoStack

• **getUndoStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the current redo stack which consists of operations that could be undone

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:698](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L698)

---

### getStack

• **getStack**: () => `void`

#### Type declaration

▸ (): `void`

Retrieve the complete history stack

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:709](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L709)

---

### pushStack

• **pushStack**: (`cmd`: `Command`[], `stackType`: `"redo"` \| `"undo"`) => `void`

#### Type declaration

▸ (`cmd`, `stackType`): `void`

Push the operation(s) onto the specified stack

##### Parameters

| Name        | Type                 | Description           |
| :---------- | :------------------- | :-------------------- |
| `cmd`       | `Command`[]          | commands to be pushed |
| `stackType` | `"redo"` \| `"undo"` | undo/redo stack       |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:681](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L681)

---

### pauseStack

• **pauseStack**: () => `void`

#### Type declaration

▸ (): `void`

Pause stacking operation.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:685](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L685)

---

### resumeStack

• **resumeStack**: () => `void`

#### Type declaration

▸ (): `void`

Resume stacking operation.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:689](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L689)

---

### startHistoryBatch

• **startHistoryBatch**: () => `void`

#### Type declaration

▸ (): `void`

Begin a historyBatch operation.
Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
treated as a single operation when undoing or redoing.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:738](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L738)

---

### stopHistoryBatch

• **stopHistoryBatch**: () => `void`

#### Type declaration

▸ (): `void`

End a historyBatch operation.
Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
treated as a single operation when undoing or redoing.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:745](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L745)

---

### executeWithNoStack

• **executeWithNoStack**: (`callback`: () => `void`) => `void`

#### Type declaration

▸ (`callback`): `void`

Execute a callback without allowing any stacking operations.

##### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `callback` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:694](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L694)

---

### undo

• **undo**: () => `void`

#### Type declaration

▸ (): `void`

Revert the last n operation(s) on the graph.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:715](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L715)

---

### redo

• **redo**: () => `void`

#### Type declaration

▸ (): `void`

Restore the operation that was last n reverted on the graph.

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:721](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L721)

---

### cleanHistory

• **cleanHistory**: (`stackType?`: `"redo"` \| `"undo"`) => `void`

#### Type declaration

▸ (`stackType?`): `void`

Execute a provided function within a batched context
All operations performed inside callback will be treated as a composite operation
more convenient way without manually invoking `startHistoryBatch` and `stopHistoryBatch`.

##### Parameters

| Name         | Type                 |
| :----------- | :------------------- |
| `stackType?` | `"redo"` \| `"undo"` |

##### Returns

`void`

#### Defined in

[packages/g6/src/types/graph.ts:760](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/graph.ts#L760)

---

## 自由插件

### addPlugins

为图实例增加自由插件。

• **类型**: (`pluginCfgs`: { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` }[]) => `void`

• **参数**:

| Name         | Type                                                                     |
| :----------- | :----------------------------------------------------------------------- |
| `pluginCfgs` | { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` }[] |

### removePlugins

为图实例删除插件。若有删除和更新插件的目的，应当在配置插件或新增插件时，为插件配置唯一的 key 以方便删改时的检索。

• **类型**: (`pluginKeys`: `string`[]) => `void`

• **参数**:

| Name         | Type       | Description               |
| :----------- | :--------- | :------------------------ |
| `pluginKeys` | `string`[] | 需要被删除的插件的 key 值 |

### updatePlugin

更新某一个插件。若有删除和更新插件的目的，应当在配置插件或新增插件时，为插件配置唯一的 key 以方便删改时的检索。

• **类型**: (`pluginCfg`: { `[cfgName: string]`: `unknown`; `key`: `string` ; `type`: `string` }) => `void`

• **参数**:

| Name             | Type     | Description                                                 |
| :--------------- | :------- | :---------------------------------------------------------- |
| `pluginCfg`      | `Object` | 更新的参数                                                  |
| `pluginCfg.key`  | `string` | 用于检索的唯一 id，应当在配置或新增插件时配置               |
| `pluginCfg.type` | `string` | 插件的类型名称，此外 `pluginCfg` 中其他为需要更新的配置内容 |

## 下载

### downloadFullImage

下载包含所有图内容的图片。

• **类型**: (`name?`, `type?`, `imageConfig?`): `void`

• **参数**:

| Name                   | Type                   | Description                          |
| :--------------------- | :--------------------- | :----------------------------------- |
| `name?`                | `string`               | 下载后的图片名称                     |
| `type?`                | `DataURLType`          | 图片格式类型，默认值是 `'image/png'` |
| `imageConfig?`         | `Object`               | 图片的配置                           |
| `imageConfig.padding?` | `number` \| `number`[] | 图片下载时四周的留白距离             |

### downloadImage

下载在窗口内的内容为图片。

• **类型**: (`name?`, `type?`): `void`

• **参数**:

| Name    | Type          | Description                          |
| :------ | :------------ | :----------------------------------- |
| `name?` | `string`      | 下载后的图片名称                     |
| `type?` | `DataURLType` | 图片格式类型，默认值是 `'image/png'` |

### toFullDataURL

生成所有图内容的图片 URL。

• **类型**: (`type?`, `imageConfig?`): `Promise`<`unknown`\>

• **参数**:

| Name                   | Type                   | Description                          |
| :--------------------- | :--------------------- | :----------------------------------- |
| `type?`                | `DataURLType`          | 图片格式类型，默认值是 `'image/png'` |
| `imageConfig?`         | `Object`               | 图片的配置                           |
| `imageConfig.padding?` | `number` \| `number`[] | 图片下载时四周的留白距离             |

• **返回值**: `Promise`<`string`\>

### toDataURL

生成当前窗口内容的图片 URL。

• **类型**: (`type?`): `Promise`<`string`\>

• **参数**:

| Name    | Type          | Description                          |
| :------ | :------------ | :----------------------------------- |
| `type?` | `DataURLType` | 图片格式类型，默认值是 `'image/png'` |

• **返回值**: `Promise`<`string`\>

## 图实例

### setCursor

设置和当前的鼠标样式。但元素上的鼠标样式拥有更高的优先级。

• **类型**: (`cursor`): `void`

• **参数**:

| Name     | Type     |
| :------- | :------- |
| `cursor` | `Cursor` |

### destroy

销毁当前图实例。

• **类型**: (`callback?`: `Function`) => `void`

• **参数**:

| Name        | Type       | Description          |
| :---------- | :--------- | :------------------- |
| `callback?` | `Function` | 销毁完成后的回调函数 |
