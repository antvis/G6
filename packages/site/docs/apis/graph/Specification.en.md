---
title: Graph Specification
order: 0
---

## container

The DOM of the graph container, which can be the id of an existing DOM element or a DOM object.

• **Required**: True

• **Type**: `string` \| `HTMLElement`

## height

The height of the canvas DOM. If not specified, it will adapt to the container.

• **Required**: False

• **Type**: `number`

## width

The width of the canvas DOM. If not specified, it will adapt to the container.

• **Required**: False

• **Type**: `number`

## renderer

The name of the renderer type, default is `'canvas'`. For large-scale data, it is recommended to use` 'webgl'`. If `'webgl-3d'` is used, it should be combined with 3D interactive and element types.

• **Required**: False

• **Type**: `RendererCfg`

```typescript
type RendererName = 'canvas' | 'webgl' | 'svg' | 'webgl-3d';
type RendererCfg =
  | RendererName
  | {
      // The name of the renderer
      type: RendererName;
      // Whether to use headless browser, default is false. true is suitable for node-side rendering
      headless?: boolean;
      // Pixel ratio, if not specified, it will automatically get the current device pixel ratio. Generally between 1-3. Set a larger value when rendering is blurred
      pixelRatio?: number;
    };
```

## data

The data of the graph. It can be provided in this configuration or written to the graph through the Graph API, see [graph.read](./Graph.zh.md#read).

• **Required**: False

• **Type**: `DataConfig`

```typescript
type DataConfig = GraphData | InlineGraphDataConfig | InlineTreeDataConfig;

interface InlineGraphDataConfig {
  type: 'graphData';
  value: GraphData;
}

interface InlineTreeDataConfig {
  type: 'treeData';
  value: TreeData;
}
```

[`GraphData`](../data/GraphData.zh.md), [`TreeData`](../data/TreeData.zh.md) see the corresponding type definition document for details.

## transforms

Data transformers. Multiple built-in or custom data transformers can be configured. When the graph reads user data, the data transformers will be executed linearly in the order of the configured array. That is, the result of the previous data processor will be input into the next data processor. After all data processors are completed, the data required for G6's internal flow will be generated. See [Data Introduction](../data/DataIntro.en.md) for details. Custom method see [Custom Data Transformer](../data/CustomTransform.en.md).

• **Required**: False

• **Type**:

```typescript
string[]
  | {
      type: string;
      activeLifecycle: string | string[];
      [param: string]: unknown;
    }[]
  | TransformerFn[]
```

## node

Node mapper, can be a JSON configuration or a function. The result of the mapper should be the rendering data required for rendering the node style, etc. This mapper converts the internal flow data into rendering data each time a node is rendered, see [Data Introduction](../data/DataIntro.en.md) for details.

• **Required**: False

• **Type**: `NodeEncode` \| (`data`: [`NodeInnerModel`](../data/NodeInnerModel.en.md)) => [`NodeDisplayModel`](../data/NodeDisplayModel.en.md)

## edge

Edge mapper, can be a JSON configuration or a function. The result of the mapper should be the rendering data required for rendering the edge style, etc. This mapper converts the internal flow data into rendering data each time an edge is rendered, see [Data Introduction](../data/DataIntro.en.md) for details.

• **Required**: False

• **Type**: `EdgeEncode` \| (`data`: [`EdgeInnerModel`](../data/EdgeInnerModel.en.md)) => [`EdgeDisplayModel`](../data/EdgeDisplayModel.en.md)

## combo

Combo mapper, can be a JSON configuration or a function. The result of the mapper should be the rendering data required for rendering the combo style, etc. This mapper converts the internal flow data into rendering data each time a combo is rendered, see [Data Introduction](../data/DataIntro.en.md) for details.

• **Required**: False

• **Type**: `ComboEncode` \| (`data`: [`ComboInnerModel`](../data/ComboInnerModel.en.md)) => [`ComboDisplayModel`](../data/ComboDisplayModel.en.md)

## nodeState

Node state style configuration. The built-in theme has provided the styles of `'selected'`, `'active'`, `'highlight'`, `'inactive'`, `'disable'` states. If you need to modify or set styles for custom state names, you can configure them here.

• **Required**: False

• **Type**:

```typescript
{
  // The key is the state name, such as 'selected'
  [stateName: string]: {
    // The key is the shape name, and the value represents the style of the shape under
    [shapeId]: ShapStyle
  }
}
```

## edgeState

Edge state style configuration. The built-in theme already provides styles for `'selected'`, `'active'`, `'highlight'`, `'inactive'`, `'disable'` states. If you need to modify or set styles for custom state names, you can configure them here.

• **Required**: False

• **Type**:

```typescript
{
  // The key is the state name, e.g., 'selected'
  [stateName: string]: {
    // The key is the shape name, and the value represents the style of the shape under this state
    [shapeId]: ShapStyle
  }
}
```

## comboState

Combo state style configuration. The built-in theme already provides styles for `'selected'`, `'active'`, `'highlight'`, `'inactive'`, `'disable'` states. If you need to modify or set styles for custom state names, you can configure them here.

• **Required**: False

• **Type**:

```typescript
{
  // The key is the state name, e.g., 'selected'
  [stateName: string]: {
    // The key is the shape name, and the value represents the style of the shape under this state
    [shapeId]: ShapStyle
  }
}
```

## theme

Theme configuration. The default theme is the light theme.

• **Required**: False

• **Type**: `ThemeCfg`

```typescript
// The type of the color palette, which can be an array of hexadecimal color strings or an object with data type names as keys and hexadecimal colors as values
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type ThemeCfg = {
  type: 'spec';
  // The built-in theme that the custom theme is based on. The default value is 'light'
  base: 'light' | 'dark';
  specification: {
    [itemType: ITEM_TYPE]: {
      // The data type field of the node/edge/combo. For example, if the nodes are classified based on the 'cluster' field, you can specify dataTypeField: 'cluster', and the color will be taken from the color palette based on this classification
      dataTypeField: string;
      // The color palette
      palette: Palette;
      // The style of the shapes under the custom color palette
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
      // The background color of the canvas. If not specified, it will follow the default color of the base theme
      backgroundColor: string;
    };
  };
};
```

• Example:

```javascript
const data = {
  nodes: [
    { id: 'node1', data: { cluster: '1' } },
    { id: 'node2', data: { cluster: '1' } },
    { id: 'node3', data: { cluster: '2' } },
  ],
};
const graph = new Graph({
  // ... Other configurations
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

## layout

Layout configuration. If not configured and the nodes in the data have `x` and `y` positions, the graph will be rendered based on the position information in the data. If not configured and the data does not have position information, the graph will be rendered using the 'grid' grid layout. See the [Layout Overview](../layout/LayoutOverview.en.md) for configurations for different layouts.

• **Required**: False

• **Type**: `LayoutOptions`

```typescript
type layoutOptions = StandardLayoutOptions
  | ImmediatelyInvokedLayoutOptions;

type PureLayoutOptions = CircularLayout | RandomLayout | ...; // Configurations for various layouts, see the documentation for layout configurations for details

type StandardLayoutOptions = PureLayoutOptions & {
  type: string;
  // Pre-layout to improve the quality and convergence speed of force-directed layout
  presetLayout?: StandardLayoutOptions;
  // Whether to enable iterative animation, suitable for force-directed layout
  animated: boolean;
  // Whether to enable web worker to avoid blocking the page during calculation
  workerEnabled: boolean;
};
```

## modes

Interaction mode configuration. G6 provides different interaction mode configurations for the graph, which can be understood as groups of interactions. Different modes have different interaction configurations, allowing for quick switching between different interaction groups. For example, in read-only mode, you can only drag and zoom the canvas. In edit mode, you can create edges, etc. Here, you can configure the interaction groups on the graph. You can dynamically switch modes and switch interaction modes through the Graph API [`setMode`](#setmode), and get the current interaction mode through [`getMode`](#getmode).

• **Required**: False

• **Type**: `ModesCfg`

```typescript
type BehaviorCfg =
  | string // You can specify only the type name string
  | {
      // If you need to modify or delete it later, you need to specify a unique key for retrieval
      key: string;
      type: string;
      // ...Other configurations, different interactions are different
    }
  | BehaviorClass;

type ModesCfg = {
  default: BehaviorCfg[];
  [mode: string]: BehaviorCfg[];
};
```

## zoom

The absolute zoom ratio value for the initial rendering.

• **Required**: False

• **Type**: `number`

## autoFit

Whether to auto-fit the container and the way to auto-fit. `'view'` means zooming and panning to fit the container. `'center'` means only panning without zooming to align the center of the graph content with the center of the container.

• **Required**: False

• **Type**: `"center"` \| `"view"` \| { `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> ; `padding?`: `Padding` ; `rules?`: `FitViewRules` ; `type`: `"view"` } \| { `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> ; `type`: `"center"` } \| { `alignment?`: `GraphAlignment` ; `effectTiming?`: `Partial`<`Pick`<`IAnimationEffectTiming`, `"duration"` \| `"easing"` \| `"easingFunction"`\>\> ; `position`: `Point` ; `type`: `"position"` }

```typescript
type FitViewRules = {
  onlyOutOfViewport?: boolean;
  onlyZoomAtLargerThanViewport?: boolean;
  direction?: 'x' | 'y' | 'both';
  ratioRule?: 'max' | 'min';
  boundsType?: 'render' | 'layout';
};

type GraphAlignment = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'center' | [number, number];
```

## animate

Whether to enable global animation, with lower priority than the animation specified by each API.

• **Required**: False

• **Type**:

```typescript
interface AnimateCfg {
  /**
   * The duration (in ms) of each animation.
   */
  duration?: number;
  /**
   * The easing function of the animation.
   */
  easing?: string;
  /**
   * The delay (in ms) before the animation starts.
   */
  delay?: number;
  /**
   * The number of times the animation will be performed, with Infinity indicating infinite looping.
   */
  iterations?: number | typeof Infinity;
  /**
   * The callback function when the animation ends.
   */
  callback?: () => void;
  /**
   * The callback function when the animation is paused.
   */
  pauseCallback?: () => void;
  /**
   * The callback function when the animation is resumed.
   */
  resumeCallback?: () => void;
}
```

## plugins

Free plugins' configurations.

• **Required**: False

• **Type**: `PluginsCfg`

```typescript
type PluginsCfg = (
  | string
  | {
      // If you need to modify or delete it later, you need to specify a unique key for retrieval
      key: string;
      type: string;
      // ... Other configurations, different plugins have different configurations
    }
  | PluginClass
)[];
```

**TODO**: 链接各个插件的配置文档

## enableStack

Whether to enable the history stack.

• **Required**: False

• **Type**: `boolean`

## stackCfg

• **Required**: False

• **Type**: `StackCfg`

```typescript
type StackCfg = {
  /** The maximum number of steps allowed in the history stack. */
  stackSize?: number;
  /** Whether to allow pushing actions to the history stack by default. */
  stackActive?: boolean;
  /** API names to be excluded from being pushed to the history stack. This configuration takes the highest priority. */
  excludes?: string[];
  /** API names to be included in the history stack. This configuration takes the highest priority. */
  includes?: string[];
  /** Whether to ignore all add data operations. */
  ignoreAdd?: boolean;
  /** Whether to ignore all remove data operations. */
  ignoreRemove?: boolean;
  /** Whether to ignore all update data operations. */
  ignoreUpdate?: boolean;
  /** Whether to ignore all element state change operations. */
  ignoreStateChange?: boolean;
  /** Whether to ignore all layer change operations. */
  ignoreLayerChange?: boolean;
  /** Whether to ignore all display change operations. */
  ignoreDisplayChange?: boolean;
};
```

## optimize

Configuration options for performance optimization in a graph instance. This includes controlling first screen tile rendering, tile interaction limits, and other performance-related configurations.

```typescript
{
  /** Whether to enable tile-based rendering for the initial screen. If specified as a number, it indicates the maximum number of elements for tile-based rendering. */
  tileFirstRender?: boolean | number;
  /** The number of elements included in a single tile or frame of rendering. */
  tileFirstRenderSize?: number;
  /** Whether to enable tile-based rendering during the show/hide animation of drag-canvas and zoom-canvas. If specified as a number, it indicates the maximum number of elements for tile-based rendering. However, the `enableOptimize` option in each interaction has a higher priority. */
  tileBehavior?: boolean | number;
  /** The number of elements included in a single tile or frame of rendering during interactions. However, the `enableOptimize` option in each interaction has a higher priority. */
  tileBehaviorSize?: number;
  /** The number of elements included in a single tile or frame of rendering during the layer rendering. */
  tileLodSize?: number;
}
```
