---
title: Specification 图配置项
order: 0
---

## container <Badge type="error">必须</Badge>

**类型**：`string | HTMLElement`

图的容器 DOM，可以是已经存在的 DOM id，也可以是 DOM 对象。

## height

**类型**：`number`

画布标签 DOM 的高度。未指定，则自适应容器。

## width

**类型**：`number`

画布标签 DOM 的宽度。未指定，则自适应容器。

## renderer

**类型**：`RendererCfg`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    RendererCfg
  </summary>

```typescript
type RendererCfg =
  | RendererName
  | {
      // 渲染器名称
      type: RendererName;
      // 是否使用无头浏览器，默认为 false。true 适用于 node 端渲染
      headless?: boolean;
      // 像素比，不指定将自动获取当前设备自动像素比。一般在 1-3 之间。可在渲染模糊的情况下，设置较大的值
      pixelRatio?: number;
    };

type RendererName = 'canvas' | 'webgl' | 'svg' | 'webgl-3d';
```

</details>

渲染器类型名称，默认为 `'canvas'`。大规模数据建议使用 `'webgl'`。若使用 `'webgl-3d'` 应当配合 3D 相关的交互和元素类型。

## data

**类型**：`GraphData | InlineGraphDataConfig | InlineTreeDataConfig`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    InlineGraphDataConfig
  </summary>

```typescript
type InlineGraphDataConfig = {
  type: 'graphData';
  value: GraphData;
};
```

</details>

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    InlineTreeDataConfig
  </summary>

```typescript
type InlineTreeDataConfig = {
  type: 'treeData';
  value: TreeData;
};
```

</details>

- [GraphData](../data/GraphData.zh.md)

- [TreeData](../data/TreeData.zh.md)

图数据。可以在此配置项中给出，也可以通过 Graph 的 API 写入，见 [graph.read](./Graph.zh.md#read)。

## transforms

**类型**：`TransformsConfig`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    TransformsConfig
  </summary>

```typescript
type TransformsConfig =
  | string[]
  | {
      type: string;
      /**
       * 决定 transform 函数生效时机，默认只在初始化数据时生效
       * `'all'` 表示在所有数据生命周期阶段激活，也可以指定在一个或多个生命周期阶段
       */
      activeLifecycle: 'all' | DataLifecycleType | DataLifecycleType[];
      [param: string]: unknown;
    }[]
  | TransformerFn[];
type DataLifecycleType = 'read' | 'changeData' | 'updateData' | 'addData' | 'removeData';
```

</details>

数据转换器。可配置多个内置的或自定义的数据转换器，图读取用户数据时，将按照配置的数组顺序，线性执行数据转换器。即前一个数据处理器的结果将输入到下一个数据处理器中。所有数据处理器完成后，生成 G6 内部流转的数据。详见[数据介绍文档](../data/DataIntro.zh.md)。自定义方式见[自定义数据处理器文档](../data/CustomTransform.zh.md)。

## node

**类型**：`NodeEncode | (data: NodeModel) => NodeDisplayModel`

- [NodeModel](../data//NodeModel.zh.md)

- [NodeDisplayModel](../data/NodeDisplayModel.zh.md)

节点映射器（mapper），可以是 JSON 配置，也可以函数映射。映射器的生成结果应当是渲染所需的图形样式等。这一映射器在每次渲染节点时，将内部流转数据转换为渲染数据，详见[数据介绍文档](../data/DataIntro.zh.md)。

## edge

**类型**：`EdgeEncode | (data: EdgeModel) => EdgeDisplayModel`

- [EdgeModel](../data/EdgeModel.zh.md)

- [EdgeDisplayModel](../data/EdgeDisplayModel.zh.md)

边映射器（mapper），可以是 JSON 配置，也可以函数映射。映射器的生成结果应当是渲染所需的图形样式等。这一映射器在每次渲染边时，将内部流转数据转换为渲染数据，详见[数据介绍文档](../data/DataIntro.zh.md)。

## combo

**类型**：`ComboEncode | (data: ComboModel) => ComboDisplayModel`

- [ComboModel](../data/ComboModel.zh.md)

- [ComboDisplayModel](../data/ComboDisplayModel.zh.md)

Combo 映射器（mapper），可以是 JSON 配置，也可以函数映射。映射器的生成结果应当是渲染所需的图形样式等。这一映射器在每次渲染 Combo 时，将内部流转数据转换为渲染数据，详见[数据介绍文档](../data/DataIntro.zh.md)。

## nodeState

**类型**：`NodeStateStyles`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    NodeStateStyles
  </summary>

```typescript
{
  // key 为状态名称，例如 selected
  [stateName: string]: {
    // key 为图形名称，值表示该状态下该图形的样式
    [shapeId]: ShapStyle
  }
}
```

</details>

节点的状态样式配置。内置主题中已经提供了 `'selected'`、`'active'`、`'highlight'`、`'inactive'`、`'disable'` 的状态样式。如果需要修改或为自定义状态名设置样式，可在此处配置。

## edgeState

**类型**：`EdgeStateStyles`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    EdgeStateStyles
  </summary>

```typescript
type EdgeStateStyles = {
  // key 为状态名称，例如 selected
  [stateName: string]: {
    // key 为图形名称，值表示该状态下该图形的样式
    [shapeId]: ShapStyle;
  };
};
```

</details>

边的状态样式配置。内置主题中已经提供了 `'selected'`、`'active'`、`'highlight'`、`'inactive'`、`'disable'` 的状态样式。如果需要修改或为自定义状态名设置样式，可在此处配置。

## comboState

**类型**：`ComboStateStyles`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    ComboStateStyles
  </summary>

```typescript
{
  // key 为状态名称，例如 selected
  [stateName: string]: {
    // key 为图形名称，值表示该状态下该图形的样式
    [shapeId]: ShapStyle
  }
}
```

</details>

Combo 的状态样式配置。内置主题中已经提供了 `'selected'`、`'active'`、`'highlight'`、`'inactive'`、`'disable'` 的状态样式。如果需要修改或为自定义状态名设置样式，可在此处配置。

## theme

**类型**：`ThemeCfg`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    ThemeCfg
  </summary>

```typescript
type ThemeCfg = {
  type: 'spec';
  // 自定义主题基于的内置主题，默认为 'light'
  base: 'light' | 'dark';
  specification: {
    [itemType: ITEM_TYPE]: {
      // 节点/边/ combo 的数据类型字段，例如节点根据 'cluster' 字段分类，则可指定 dataTypeField: 'cluster'，后续将根据此分类从色板中取色
      dataTypeField: string;
      // 色板
      palette: Palette;
      // 自定义色板对应图形的样式
      getStyleSets: (palette: Palette) => {
        default: {
          [shapeId: string]: ShapeStyle;
        };
        [stateName: string]: {
          [shapeId: string]: ShapeStyle;
        };
      };
    };
    canvas: {
      // 画布背景色的配置，不配置则跟随 base 的默认色
      backgroundColor: string;
    };
  };
};
// 色板的类型，可以是十六进制颜色字符串数组，也可以是对象形式 key 为数据类型名，value 为十六进制颜色值
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
```

</details>

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    示例
  </summary>

```javascript
const data = {
  nodes: [
    { id: 'node1', data: { cluster: '1' } },
    { id: 'node2', data: { cluster: '1' } },
    { id: 'node3', data: { cluster: '2' } },
  ],
};
const graph = new Graph({
  // ... 其他配置
  theme: {
    type: 'spec',
    base: 'light',
    specification: {
      canvas: {
        backgroundColor: '#f3faff',
      },
      node: {
        dataTypeField: 'cluster',
        palette: ['#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66'],
      },
    },
  },
});
```

</details>

主题配置，默认使用亮色主题。

## layout

**类型**：`LayoutOptions`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LayoutOptions
  </summary>

```typescript
type LayoutOptions = StandardLayoutOptions
  | ImmediatelyInvokedLayoutOptions;

type PureLayoutOptions = CircularLayout | RandomLayout | ...; // 各个布局配置，详见布局配置文档

type StandardLayoutOptions = PureLayoutOptions & {
  type: string;
  // 预布局，以提升力导向布局的质量和收敛速度
  presetLayout?: StandardLayoutOptions;
  // 是否启用迭代动画，适用于力导向布局
  animated: boolean;
  // 是否启用 webworker，避免计算过程阻塞页面
  workerEnabled: boolean;
};
```

</details>

布局的配置。若不配置，且节点数据中存在 `x` `y`，则使用数据中的位置信息进行绘制。若不配置，且数据中无位置信息，则使用 `'grid'` 网格布局进行计算和绘制。各个布局的详细配置见[布局总览](../layout/LayoutOverview.zh.md)下的各个子文档。

## modes

**类型**：`ModesCfg`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    ModesCfg
  </summary>

```typescript
type ModesCfg = {
  default: BehaviorCfg[];
  [mode: string]: BehaviorCfg[];
};
type BehaviorCfg =
  | string // 可只指定 type 类型名称字符串
  | {
      // 若后续需要删改，需要指定唯一 key 用以检索
      key: string;
      type: string;
      // ...其他配置，各个交互不相同
    }
  | BehaviorClass;
```

</details>

交互模式配置。G6 图提供不同的交互模式配置，可以理解为交互的分组。不同模式下配置不同交互，以便快速切换不同的交互分组。例如只读模式下，只能拖拽和缩放画布。编辑模式下，可以创建边等。此处可配置图上的交互分组，后续需要动态切换和通过 Graph 的 API [`setMode`](#setmode) 切换交互模式，[`getMode`](#getmode) 获取当前的交互模式。

## zoom

**类型**：`number`

初次渲染的绝对缩放比例值。

## autoFit

**类型**：`AutoFitType`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    AutoFitType
  </summary>

```ts
type AutoFitType =
  | 'center'
  | 'view'
  | {
      effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>;
      padding?: Padding;
      rules?: FitViewRules;
      type: 'view';
    }
  | { effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>; type: 'center' }
  | {
      alignment?: GraphAlignment;
      effectTiming?: Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>;
      position: Point;
      type: 'position';
    };

type FitViewRules = {
  onlyOutOfViewport?: boolean;
  onlyZoomAtLargerThanViewport?: boolean;
  direction?: 'x' | 'y' | 'both';
  ratioRule?: 'max' | 'min';
  boundsType?: 'render' | 'layout';
};

type GraphAlignment = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'center' | [number, number];
```

</details>

是否自适应容器，以及自适应的方式。`'view'` 表示缩放并平移以适配容器。`'center'` 表示仅平移不缩放以时图内容中心对齐容器中心。

## animate

**类型**：`AnimateCfg`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    AnimateCfg
  </summary>

```typescript
type AnimateCfg = {
  /**
   * 一次动画执行的时长（ms）。
   */
  duration?: number;
  /**
   * 动画的缓动函数。
   */
  easing?: string;
  /**
   * 动画开始前的延迟时长（ms）。
   */
  delay?: number;
  /**
   * 动画执行的次数，Infinity 表示循环。
   */
  iterations?: number | typeof Infinity;
  /**
   * 动画结束时的回调函数。
   */
  callback?: () => void;
  /**
   * 动画暂停时的回调函数。
   */
  pauseCallback?: () => void;
  /**
   * 动画恢复时的回调函数。
   */
  resumeCallback?: () => void;
};
```

</details>

是否开启全局动画，优先级低于各 API 指定的动画。

## plugins

**类型**：`PluginsCfg`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    PluginsCfg
  </summary>

```typescript
type PluginsCfg = (
  | string
  | {
      // 若后续需要删改，需要指定唯一 key 用以检索
      key: string;
      type: string;
      // ... 其他配置，不同的插件配置不哦那个
    }
  | PluginClass
)[];
```

</details>

配置自由插件。

**TODO**: 链接各个插件的配置文档

## enableStack

**类型**：`boolean`

是否允许开启历史栈。

## stackCfg

**类型**：`StackCfg`

<embed src="../../common/StackCfg.zh.md"></embed>

## optimize

**类型**：`OptimizeCfg`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    OptimizeCfg
  </summary>

```typescript
{
  /** 是否开启首屏的分片渲染。若指定 number，则表示开启分片渲染的元素数量上限*/
  tileFirstRender?: boolean | number;
  /** 单片/一帧渲染包含的元素数量。*/
  tileFirstRenderSize?: number;
  /** 是否在 drag-canvas, zoom-canvas 的现实隐藏图形过程中，启用分片渲染。若指定 number，则表示开启分片渲染的元素数量上限。但各个交互中的 enableOptimize 拥有更高的优先级。*/
  tileBehavior?: boolean | number;
  /** 交互的分片渲染单片/一帧渲染的元素数量。但各个交互中的 enableOptimize 拥有更高的优先级。*/
  tileBehaviorSize?: number;
  /** 信息分层分片渲染的单片/一帧渲染的元素数量。*/
  tileLodSize?: number;
}
```

</details>

图实例性能优化配置项。控制首屏分片渲染、分片交互等。包括单片的元素数量和开启分片渲染的上限。后续可能继续添加与性能优化有关的配置内容。
