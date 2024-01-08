---
title: Graph 实例方法
order: 1
---

## 配置项操作 Specification

### getSpecification

**类型**：`() => Specification<B, T>`

- [Specification](Specification.zh.md)

获取当前图配置 Spec 的复制

### updateSpecification

**类型**：`(spec: Specification<B, T>) => Specification<B, T>`

- [Specification](Specification.zh.md)

**参数**：需要更新的增量部分配置。

更新当前图配置 Spec

### updateTheme

**类型**：`(theme: ThemeOptionsOf<T>) => void`

**参数**：需要更新的主题配置。

更新当前图配置 spec 中的主题部分

### updateMapper

**类型**：`(type: ITEM_TYPE, mapper: NodeMapper | EdgeMapper | ComboMapper) => void`

更新节点/边/ Combo 的映射器(mapper)，并重新渲染相关元素

### updateStateConfig

**类型**：`UpdateStateConfig`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateStateConfig
  </summary>

```ts
type UpdateStateConfig = (
  /** 需要更新的元素类型 */
  itemType: ITEM_TYPE,
  /** 更新的状态样式配置 */
  stateConfig:
    | { [stateName: string]: (data: NodeModel) => NodeDisplayModel | NodeShapesEncode }
    | { [stateName: string]: (data: EdgeModel) => EdgeDisplayModel | EdgeShapesEncode }
    | { [stateName: string]: (data: ComboModel) => ComboDisplayModel | ComboShapesEncode },
  /** 更新类型，'replace' 表示直接替换，'mergeReplace' 表示融合到原 mapper 上后替换 */
  updateType?: 'replace' | 'mergeReplace',
) => void;
```

</details>

更新节点/边/ Combo 的状态样式配置，并重新渲染相关状态下的元素

## 数据

### read

**类型**：`(data: GraphData) => void`

- [GraphData](GraphData.zh.md)

初次读取并渲染数据

### addData

**类型**：`AddData`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    AddData
  </summary>

```typescript
type AddData = (
  /** 需要新增的元素类型，意味着一次调用只能新增一类元素，建议先增加节点再增加边，避免新增边时新增节点不存在 */
  itemType: ITEM_TYPE,
  /** 新增的用户数据，可以是单条数据，也可以是数组 */
  model: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[],
) => /** 新增的数据 */
NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];
```

</details>

新增一个类型的数据

### changeData

**类型**：`(data: GraphData, type: 'replace' | 'mergeReplace') => void`

- [GraphData](GraphData.zh.md)

全量更换数据。

- `'replace'`: 完全抛弃原有的数据，使用新数据

- `'mergeReplace'`: 若新数据中有某些 id 的节点 / 边 / Combo 已经存在于画布中，则与对应的原数据进行融合后替换原始数据

### updateData

**类型**：`UpdateData`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateData
  </summary>

```typescript
type UpdateData = (
  /** 需要更新的元素类型，意味着一次调用只能更新一类元素 */
  itemType: ITEM_TYPE,
  /** 需要更新的数据，可以是单条数据，也可以是数组 */
  model:
    | Partial<NodeUserModel>
    | Partial<EdgeUserModel>
    | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[]>,
) => /** 更新后的数据 */
NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];
```

</details>

- [NodeModel](../data/NodeModel.zh.md)

- [NodeUserModel](../data/NodeUserModel.zh.md)

- [EdgeModel](../data/EdgeModel.zh.md)

- [EdgeUserModel](../data/EdgeUserModel.zh.md)

- [ComboModel](../data/ComboModel.zh.md)

- [ComboUserModel](../data/ComboUserModel.zh.md)

一次更新一个类型的部分数据

### removeData

**类型**：`(itemType: ITEM_TYPE, id: ID | ID[]) => void`

删除一条或多条同一类型的数据

### getAllNodesData

**类型**：`() => NodeModel[]`

- [NodeModel](../data/NodeModel.zh.md)

获取所有的节点数据（内部流转数据）

### getAllEdgesData

**类型**：`() => EdgeModel[]`

- [EdgeModel](../data/EdgeModel.zh.md)

获取所有的边数据（内部流转数据）

### getAllCombosData

**类型**：`() => ComboModel[]`

- [ComboModel](../data/ComboModel.zh.md)

获取所有的 Combo 数据（内部流转数据）

### getNodeData

**类型**：`(condition: Function | ID) => NodeModel`

- [NodeModel](../data/NodeModel.zh.md)

获得指定 id 或条件的节点数据（内部流转数据）

### getEdgeData

**类型**：`(condition: Function | ID) => EdgeModel`

- [EdgeModel](../data/EdgeModel.zh.md)

获得指定 id 或条件的边数据（内部流转数据）

### getComboData

**类型**：`(condition: Function | ID) => ComboModel`

- [ComboModel](../data/ComboModel.zh.md)

获得指定 id 或条件的边数据（内部流转数据）

### getNeighborNodesData

**类型**：`(nodeId: ID, direction?: 'both' | 'in' | 'out') => NodeModel[]`

- [NodeModel](../data/NodeModel.zh.md)

获取指定节点的一跳邻居节点数据（内部流转数据）

### getRelatedEdgesData

**类型**：`(nodeId: ID, direction?: 'both' | 'in' | 'out') => EdgeModel[]`

- [EdgeModel](../data/EdgeModel.zh.md)

获取指定节点相关的边数据（内部流转数据）

### getNearEdgesData

**类型**：`(nodeId: ID) => EdgeModel[]`

- [EdgeModel](../data/EdgeModel.zh.md)

使用四叉树检测获取指定节点周围的相关边

### updateNodePosition

**类型**：`UpdateNodePosition`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateNodePosition
  </summary>

```ts
type UpdateNodePosition = (
  /** 更新的配置项，每条数据包含节点 id 和 data，data 中包括 x y 信息 */
  models: Partial<NodeUserModel> | Partial<NodeUserModel>[],
  /** 是否同时更新祖先 Combo */
  upsertAncestors?: boolean,
  /** 是否禁用动画 */
  disableAnimate?: boolean,
  /** 位置更新完成后的回调函数。位置更新的渲染可能是异步的，可通过该回调进行更新完成后的逻辑 */
  callback?: (model: NodeModel, canceled?: boolean) => void,
) => NodeModel | NodeModel[];
```

</details>

- [NodeModel](../data/NodeModel.zh.md)

- [NodeUserModel](../data/NodeUserModel.zh.md)

更新单个/多个节点位置。此 API 不更新传入的其他样式，以达到更好的位置更新性能

### clear

**类型**：`() => void`

清空图内容，即移除所有的元素

## 渲染器

### changeRenderer

**类型**：`(type: 'canvas' | 'webgl' | 'svg' | 'webgl-3d') => void`

运行时切换渲染器

## 元素

### findIdByState

**类型**：`(itemType: ITEM_TYPE, state: string, value?: string | boolean, additionalFilter?: (model: NodeModel | EdgeModel | ComboModel) => boolean) => ID[]`

- [NodeModel](../data/NodeModel.zh.md)

- [EdgeModel](../data/EdgeModel.zh.md)

- [ComboModel](../data/ComboModel.zh.md)

获取指定状态和类型的元素 id 列表

### getItemAllStates

**类型**：`(id: ID) => string[]`

获取指定元素的所有 `true` 的状态名

### getItemState

**类型**：`(id: ID, state: string) => string | boolean`

获取指定元素、指定状态的状态值

### setItemState

**类型**：`(ids: ID | ID[], state: string, value: boolean) => void`

设置单个/多个元素状态

### clearItemState

**类型**：`(ids: ID | ID[], states?: string[]) => void`

清除指定单个/多个元素的状态

### showItem

**类型**：`(ids: ID | ID[], disableAnimate?: boolean) => void`

显示单个或多个元素。和 [hideItem](#hideitem) 对应

### hideItem

**类型**：`(ids: ID | ID[], disableAnimate?: boolean) => void`

隐藏单个或多个元素。和 [showItem](#showitem) 对应

### getItemVisible

**类型**：`(id: ID) => boolean`

获取指定元素的可见性

### frontItem

**类型**：`(ids: ID | ID[]) => void`

将指定单个/多个元素层级放到最前。需要注意的是，节点的层级永远高于边

### backItem

**类型**：`(ids: ID | ID[]) => void`

将指定单个/多个元素层级放到最后。需要注意的是，节点的层级永远高于边

## Combo

### addCombo

**类型**：`(model: ComboUserModel, childrenIds: ID[]) => ComboModel`

- [ComboModel](../data/ComboModel.zh.md)

- [ComboUserModel](../data/ComboUserModel.zh.md)

新增 combo，同时更新指定的子节点，从原父 combo 中移动到新 combo 中

本质上是 addData，但在增加 combo 数据的基础上做一些 Combo 层级嵌套树的调整

### collapseCombo

**类型**：`(comboIds: ID | ID[]) => void`

收起指定的单个/多个 Combo，与 [expandCombo](#expandCombo) 对应

### expandCombo

**类型**：`(comboIds: ID | ID[]) => void`

展开指定的单个/多个 Combo，与 [collapseCombo](#collapseCombo) 对应

### moveCombo

**类型**：`MoveCombo`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    MoveCombo
  </summary>

```ts
type MoveCombo = (
  /** 需要被更新的 Combo id */
  ids: ID[],
  /** 移动的 x 轴相对距离 */
  dx: number,
  /** 移动的 y 轴相对距离 */
  dy: number,
  /** 是否同时更新祖先 Combo */
  upsertAncestors?: boolean,
  /** 更新完成后的回调函数 */
  callback?: (model: ComboModel, canceled?: boolean) => void,
) => /** 更新后的 Combo 数据（内部流转数据） */
ComboModel[];
```

</details>

移动单个/多个 Combo 一个相对的距离（dx，dy）

该 API 将不更新其他样式以提升更新位置的性能。事实上，由于 Combo 的位置取决的内部子元素的分布和位置，因此该 API 实际上是在更新指定 Combo 的后继元素的位置，以影响该 Combo 以达到移动该 Combo 的目的，而不是直接更新该 Combo 的位置

### updateComboPosition

**类型**：`UpdateComboPosition`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    UpdateComboPosition
  </summary>

```ts
type UpdateComboPosition = (
  /** 每条数据带有需要更新的 Combo id 以及 data，data 中包含新的 `x` `y` 信息 */
  models: Partial<ComboUserModel | Partial<ComboUserModel>[]>,
  /** 是否同时更新祖先 Combo */
  upsertAncestors?: boolean,
  /** 是否禁用动画 */
  disableAnimate?: boolean,
  /** 更新完成的回调函数 */
  callback?: (model: ComboModel) => void,
) => /** 更新后的 Combo 数据（内部流转数据） */
ComboModel | ComboModel[];
```

</details>

- [ComboModel](../data/ComboModel.zh.md)

- [ComboUserModel](../data/ComboUserModel.zh.md)

更新单个或多个 Combo 的位置到指定位置（x，y）上。类似节点的对应 API [updateNodePosition](#updatenodeposition)

### getComboChildrenData

**类型**：`(comboId: ID) => ComboModel[]`

- [ComboModel](../data/ComboModel.zh.md)

获取 Combo 子元素（节点/ Combo）数据（内部流转数据）

## 布局

### layout

**类型**：`(options?: LayoutOptions, disableAnimate?: boolean) => Promise<void>`

执行布局

- 不传参，则按照图实例化配置的 spec 中的 layout 配置重新执行布局

- 若传参，则更新图的布局配置的同时，重新执行布局

### stopLayout

**类型**：`() => void`

停止布局

适用于带有迭代动画的布局，目前有 `'force'` 属于此类布局，即停止力导布局的迭代，一般用于布局迭代时间过长情况下的手动停止迭代动画，例如在点击画布/节点的监听中调用

## 交互与事件

### on

**类型**：`(eventName: string, listener: (event: IG6GraphEvent) => void) => void`

<embed src='../../common/IG6GraphEvent.zh.md'></embed>

监听一个事件

### once

**类型**：`(eventName: string, listener: (event: IG6GraphEvent) => void) => void`

<embed src='../../common/IG6GraphEvent.zh.md'></embed>

监听一个事件，仅监听一次，一旦完成后便销毁

### off

**类型**：`(eventName: string, listener?: (event: IG6GraphEvent) => void) => void`

取消一个监听，或一个事件名称下的所有监听

### emit

**类型**：`(eventName, param: any) => void`

触发一个事件

### getMode

**类型**：`() => string`

获取当前的[交互](/manual/tutorial/behavior)模式

### setMode

**类型**：`(mode: string) => void`

设置当前的[交互](/manual/tutorial/behavior)模式

### addBehaviors

**类型**：`(behaviors: BehaviorOptionsOf<B> | BehaviorOptionsOf<B>[], modes: string | string[]) => void`

为指定的模式（默认为 default 模式）中新增一个或多个交互

### removeBehaviors

**类型**：`(behaviorKeys: string[], modes: string | string[]) => void`

从指定的模式（默认为 default 模式）中移除一个交互

### updateBehavior

**类型**：`(behavior: BehaviorOptionsOf<B>, mode?: string) => void`

更新一个交互的配置

### drawTransient

**类型**：`(type: ITEM_TYPE | SHAPE_TYPE, id: ID, config: any, canvas?: Canvas) => DisplayObject<any, any>`

绘制一个临时图形，一般用于配合交互过程中更新临时图形以表达交互，从而避免更新主图层中的图形造成不必要的性能开销

采用临时层画布提升交互性能原理如下：

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VkT7T4Qzt2gAAAAAAAAAAAAADmJ7AQ/original' />

## 视图

### zoom

**类型**：`Zoom`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    Zoom
  </summary>

```ts
type Zoom = (
  /** 相对的缩放比例 */
  ratio: number,
  /** 缩放中心 */
  center?: Point,
  /** 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

给出**相对的**缩放比例，以及缩放中心，进行图的缩放

### zoomTo

**类型**：`ZoomTo`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    ZoomTo
  </summary>

```ts
type ZoomTo = (
  /** 绝对的缩放比例 */
  toRatio: number,
  /** 缩放中心 */
  center?: Point,
  /** 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

给出**绝对的**缩放比例值，以及缩放中心，将图缩放到指定的比例上

### getZoom

**类型**：`() => number`

获取当前图的缩放比例

### translate

**类型**：`Translate`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    Translate
  </summary>

```ts
type Translate = (
  /** 相对的平移距离 */
  distance: Partial<{ dx: number; dy: number; dz: number }>,
  /** 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

将画布在 x 轴和 y 轴上平移指定的距离

### translateTo

**类型**：`TranslateTo`

<details>
  <summary style='color: #873bf4; cursor: pointer;'>
    TranslateTo
  </summary>

```ts
type TranslateTo = (
  /** 绝对的目标位置 */
  point: PointLike,
  /** 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

将画布在 x 轴和 y 轴上平移到指定的位置

### fitCenter

**类型**：`FitCenter`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    FitCenter
  </summary>

```ts
type FitCenter = (
  /** 动画配置，配置空对象，则使用默认的动画参数。不指定该参数，则无动画 */
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

将图内容平移，使图内容的中心对齐当前视窗的中心点。不进行缩放

### fitView

**类型**：`FitView`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    FitView
  </summary>

```ts
type FitView = (
  options?: {
    /** 视窗内边距 */
    padding: Padding;
    /** 适配视窗的规则 */
    rules: FitViewRules;
  },
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;

type FitViewRules = {
  /** 是否仅当图内容超出视窗时，进行适配 */
  onlyOutOfViewport?: boolean;
  /** 是否仅当图内容大于视窗时，进行适配 */
  onlyZoomAtLargerThanViewport?: boolean;
  /** 适配时限制缩放的方向，默认为 'both' */
  direction?: 'x' | 'y' | 'both';
  /** 缩放比例应当根据横、纵方向上的较大者还是较小者 */
  ratioRule?: 'max' | 'min';
  /** 根据渲染的包围盒进行适配，还是根据节点布局的位置进行适配。默认为 'render'，'layout' 适用于初次渲染时，完成了布局计算，但未完成渲染层面的更新时使用 */
  boundsType?: 'render' | 'layout';
};
```

</details>

将图内容平移和缩放，使图内容适配当前视窗大小

### focusItem

**类型**：`FocusItem`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    FocusItem
  </summary>

```ts
type FocusItem = (
  id: ID | ID[],
  effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>,
) => Promise<void>;
```

</details>

平移画布以使指定的单个或多个元素（平均中心）对齐到当前视窗的中心

### stopTransformTransition

**类型**：`() => void`

停止所有平移、缩放相关的动画

### getSize

**类型**：`() => [number, number]`

获取当前图容器的大小

### setSize

**类型**：`(size: [number, number]) => void`

设置当前图容器的大小

### getViewportCenter

**类型**：`() => { x: number, y: number }`

获取当前视窗的中心点坐标。例如 500 \* 500 的容器，将返回中心值 { x: 250, y: 250 }

### getCanvasByClient

**类型**：`(ClientPoint: Point) => Point`

给定的浏览器坐标，转换为画布上的绘制坐标

### getCanvasByViewport

**类型**：`(viewportPoint: Point) => Point`

给定的视窗 DOM 坐标，转换为画布上的绘制坐标

### getClientByCanvas

**类型**：`(canvasPoint: Point) => Point`

给定画布上的绘制坐标，转换为浏览器坐标

### getViewportByCanvas

**类型**：`(canvasPoint: Point) => Point`

给定画布上的绘制坐标，转换为视窗 DOM 的坐标

### getRenderBBox

**类型**：`(id: ID, onlyKeyShape?: boolean, isTransient?: boolean) => false | AABB`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    GetRenderBBox
  </summary>

```ts
type GetRenderBBox = (
  /** 指定元素获取包围盒。若不指定元素，则表示获取当前渲染的图所有内容的整体包围盒 */
  id: ID,
  /** 是否仅计算主图形 keyShape 的包围盒 */
  onlyKeyShape?: boolean,
  /** 是否计算的是临时图形的包围盒 */
  isTransient?: boolean,
) => /** 若不存在对应元素则返回 false */
false | AABB;
```

</details>

获取指定元素的包围盒

## 树图

### collapse

**类型**：`(ids: ID | ID[], disableAnimate?: boolean) => void`

收起一个或多个子树

### expand

**类型**：`(ids: ID | ID[], disableAnimate?: boolean) => void`

展开一个或多个子树

## 自由插件

### addPlugins

**类型**：`AddPlugins`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    AddPlugins
  </summary>

```ts
type AddPlugins = (pluginCfgs: { [cfgName: string]: unknown; key: string; type: string }[]) => void;
```

</details>

为图实例增加自由插件

### removePlugins

**类型**：`(pluginKeys: string[]) => void`

为图实例删除插件。若有删除和更新插件的目的，应当在配置插件或新增插件时，为插件配置唯一的 key 以方便删改时的检索

### updatePlugin

**类型**：`(pluginCfg: { [cfgName: string]: unknown; key: string ; type: string }) => void`

更新某一个插件。若有删除和更新插件的目的，应当在配置插件或新增插件时，为插件配置唯一的 key 以方便删改时的检索

## 下载

### downloadFullImage

**类型**：`(name?: string, type: DataURLType = 'image/png', imageConfig: { padding: number | number[] }) => void`

下载包含所有图内容的图片

### downloadImage

**类型**：`(name?: string, type: DataURLType = 'image/png') => void`

下载在窗口内的内容为图片

### toFullDataURL

**类型**：`(type: DataURLType = 'image/png', imageConfig: { padding: number | number[] }) => Promise<string>`

生成所有图内容的图片 URL

### toDataURL

**类型**：`(type: DataURLType = 'image/png') => Promise<string>`

生成当前窗口内容的图片 URL

## 图实例

### setCursor

**类型**：`(cursor: Cursor) => void`

设置和当前的鼠标样式。但元素上的鼠标样式拥有更高的优先级

### destroy

**类型**：`(callback?: Function) => void`

销毁当前图实例
