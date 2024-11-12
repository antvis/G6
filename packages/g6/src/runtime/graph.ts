import EventEmitter from '@antv/event-emitter';
import type { AABB, BaseStyleProps } from '@antv/g';
import { debounce, isEqual, isFunction, isNumber, isObject, isString, omit } from '@antv/util';
import { COMBO_KEY, GraphEvent } from '../constants';
import type { Plugin } from '../plugins/types';
import type {
  BehaviorOptions,
  ComboData,
  ComboOptions,
  EdgeData,
  EdgeOptions,
  GraphData,
  GraphOptions,
  LayoutOptions,
  NodeData,
  NodeOptions,
  PluginOptions,
  ThemeOptions,
  TransformOptions,
} from '../spec';
import type { UpdateBehaviorOption } from '../spec/behavior';
import type { UpdatePluginOption } from '../spec/plugin';
import type { UpdateTransformOption } from '../spec/transform';
import type {
  DataID,
  EdgeDirection,
  ElementDatum,
  ElementType,
  FitViewOptions,
  HierarchyKey,
  ID,
  IEvent,
  NodeLikeData,
  PartialEdgeData,
  PartialGraphData,
  PartialNodeLikeData,
  Point,
  State,
  Vector2,
  ViewportAnimationEffectTiming,
} from '../types';
import { isCollapsed } from '../utils/collapsibility';
import { sizeOf } from '../utils/dom';
import { getSubgraphRelatedEdges } from '../utils/edge';
import { GraphLifeCycleEvent, emit } from '../utils/event';
import { idOf } from '../utils/id';
import { format } from '../utils/print';
import { subtract } from '../utils/vector';
import { getZIndexOf } from '../utils/z-index';
import { Animation } from './animation';
import { BatchController } from './batch';
import { BehaviorController } from './behavior';
import type { DataURLOptions } from './canvas';
import { Canvas } from './canvas';
import { DataController } from './data';
import { ElementController } from './element';
import { LayoutController } from './layout';
import { PluginController } from './plugin';
import { TransformController } from './transform';
import { RuntimeContext } from './types';
import { ViewportController } from './viewport';

export class Graph extends EventEmitter {
  private options: GraphOptions;

  /**
   * @internal
   */
  static defaultOptions: GraphOptions = {
    autoResize: false,
    theme: 'light',
    rotation: 0,
    zoom: 1,
    zoomRange: [0.01, 10],
  };

  /**
   * <zh/> 当前图实例是否已经渲染
   *
   * <en/> Whether the current graph instance has been rendered
   */
  public rendered = false;

  /**
   * <zh/> 当前图实例是否已经被销毁
   *
   * <en/> Whether the current graph instance has been destroyed
   */
  public destroyed = false;

  // @ts-expect-error will be initialized in createRuntime
  private context: RuntimeContext = {
    model: new DataController(),
  };

  constructor(options: GraphOptions) {
    super();
    this.options = Object.assign({}, Graph.defaultOptions, options);
    this._setOptions(this.options, true);
    this.context.graph = this;

    // Listening resize to autoResize.
    this.options.autoResize && globalThis.addEventListener?.('resize', this.onResize);
  }

  /**
   * <zh/> 获取配置项
   *
   * <en/> Get options
   * @returns <zh/> 配置项 | <en/> options
   * @apiCategory option
   */
  public getOptions(): GraphOptions {
    return this.options;
  }

  /**
   * <zh/> 设置配置项
   *
   * <en/> Set options
   * @param options - <zh/> 配置项 | <en/> options
   * @remarks
   * <zh/> 要更新 devicePixelRatio、container 属性请销毁后重新创建实例
   *
   * <en/> To update devicePixelRatio and container properties, please destroy and recreate the instance
   * @apiCategory option
   */
  public setOptions(options: GraphOptions): void {
    this._setOptions(options, false);
  }

  private _setOptions(options: GraphOptions, isInit: boolean) {
    this.updateCanvas(options);

    if (isInit) {
      const { data } = options;
      if (data) this.addData(data);
      return;
    }
    Object.assign(this.options, options);
    const { behaviors, combo, data, edge, layout, node, plugins, theme, transforms } = options;
    if (behaviors) this.setBehaviors(behaviors);
    if (data) this.setData(data);
    if (node) this.setNode(node);
    if (edge) this.setEdge(edge);
    if (combo) this.setCombo(combo);
    if (layout) this.setLayout(layout);
    if (theme) this.setTheme(theme);
    if (plugins) this.setPlugins(plugins);
    if (transforms) this.setTransforms(transforms);
  }

  /**
   * <zh/> 获取当前画布容器的尺寸
   *
   * <en/> Get the size of the current canvas container
   * @returns <zh/> 画布尺寸 | <en/> canvas size
   * @apiCategory canvas
   */
  public getSize(): [number, number] {
    if (this.context.canvas) return this.context.canvas.getSize();
    return [this.options.width || 0, this.options.height || 0];
  }

  /**
   * <zh/> 设置当前画布容器的尺寸
   *
   * <en/> Set the size of the current canvas container
   * @param width - <zh/> 画布宽度 | <en/> canvas width
   * @param height - <zh/> 画布高度 | <en/> canvas height
   * @apiCategory canvas
   */
  public setSize(width: number, height: number): void {
    if (width) this.options.width = width;
    if (height) this.options.height = height;

    this.resize(width, height);
  }

  /**
   * <zh/> 设置当前图的缩放区间
   *
   * <en/> Get the zoom range of the current graph
   * @param zoomRange - <zh/> 缩放区间 | <en/> zoom range
   * @apiCategory viewport
   */
  public setZoomRange(zoomRange: GraphOptions['zoomRange']): void {
    this.options.zoomRange = zoomRange;
  }

  /**
   * <zh/> 获取当前图的缩放区间
   *
   * <en/> Get the zoom range of the current graph
   * @returns <zh/> 缩放区间 | <en/> zoom range
   * @apiCategory viewport
   */
  public getZoomRange(): GraphOptions['zoomRange'] {
    return this.options.zoomRange;
  }

  /**
   * <zh/> 设置节点样式映射
   *
   * <en/> Set node mapper
   * @param node - <zh/> 节点配置 | <en/> node options
   * @remarks
   * <zh/> 即 `options.node` 的值
   *
   * <en/> The value of `options.node`
   * @apiCategory element
   */
  public setNode(node: NodeOptions): void {
    this.options.node = node;
    this.context.model.refreshData();
  }

  /**
   * <zh/> 设置边样式映射
   *
   * <en/> Set edge mapper
   * @param edge - <zh/> 边配置 | <en/> edge options
   * @remarks
   * <zh/> 即 `options.edge` 的值
   *
   * <en/> The value of `options.edge`
   * @apiCategory element
   */
  public setEdge(edge: EdgeOptions): void {
    this.options.edge = edge;
    this.context.model.refreshData();
  }

  /**
   * <zh/> 设置组合样式映射
   *
   * <en/> Set combo mapper
   * @param combo - <zh/> 组合配置 | <en/> combo options
   * @remarks
   * <zh/> 即 `options.combo` 的值
   *
   * <en/> The value of `options.combo`
   * @apiCategory element
   */
  public setCombo(combo: ComboOptions): void {
    this.options.combo = combo;
    this.context.model.refreshData();
  }

  /**
   * <zh/> 获取主题
   *
   * <en/> Get theme
   * @returns <zh/> 当前主题 | <en/> current theme
   * @apiCategory theme
   */
  public getTheme(): ThemeOptions {
    return this.options.theme!;
  }

  /**
   * <zh/> 设置主题
   *
   * <en/> Set theme
   * @param theme - <zh/> 主题名 | <en/> theme name
   * @example
   * ```ts
   * graph.setTheme('dark');
   * ```
   * @apiCategory theme
   */
  public setTheme(theme: ThemeOptions | ((prev: ThemeOptions) => ThemeOptions)): void {
    this.options.theme = isFunction(theme) ? theme(this.getTheme()) : theme;
  }

  /**
   * <zh/> 设置布局
   *
   * <en/> Set layout
   * @param layout - <zh/> 布局配置 | <en/> layout options
   * @example
   * ```ts
   * graph.setLayout({
   *  type: 'dagre',
   * })
   * ```
   * @apiCategory layout
   */
  public setLayout(layout: LayoutOptions | ((prev: LayoutOptions) => LayoutOptions)): void {
    this.options.layout = isFunction(layout) ? layout(this.getLayout()) : layout;
  }

  /**
   * <zh/> 获取布局配置
   *
   * <en/> Get layout options
   * @returns <zh/> 布局配置 | <en/> layout options
   * @apiCategory layout
   */
  public getLayout(): LayoutOptions {
    return this.options.layout!;
  }

  /**
   * <zh/> 设置交互
   *
   * <en/> Set behaviors
   * @param behaviors - <zh/> 交互配置 | <en/> behavior options
   * @remarks
   * <zh/> 设置的交互会全量替换原有的交互，如果需要新增交互可以使用如下方式：
   *
   * <en/> The set behavior will completely replace the original behavior. If you need to add behavior, you can use the following method:
   *
   * ```ts
   * graph.setBehaviors((behaviors) => [...behaviors, { type: 'zoom-canvas' }])
   * ```
   * @apiCategory behavior
   */
  public setBehaviors(behaviors: BehaviorOptions | ((prev: BehaviorOptions) => BehaviorOptions)): void {
    this.options.behaviors = isFunction(behaviors) ? behaviors(this.getBehaviors()) : behaviors;
    this.context.behavior?.setBehaviors(this.options.behaviors);
  }

  /**
   * <zh/> 更新指定的交互配置
   *
   * <en/> Update specified behavior options
   * @param behavior - <zh/> 交互配置 | <en/> behavior options
   * @remarks
   * <zh/> 如果要更新一个交互，那么必须在交互配置中指定 key 字段，例如：
   *
   * <en/> If you want to update a behavior, you must specify the key field in the behavior options, for example:
   * ```ts
   * {
   *   behaviors: [{ type: 'zoom-canvas', key: 'zoom-canvas' }]
   * }
   *
   * graph.updateBehavior({ key: 'zoom-canvas', enable: false })
   * ```
   * @apiCategory behavior
   */
  public updateBehavior(behavior: UpdateBehaviorOption): void {
    this.setBehaviors((behaviors) =>
      behaviors.map((_behavior) => {
        if (typeof _behavior === 'object' && _behavior.key === behavior.key) {
          return { ..._behavior, ...behavior };
        }
        return _behavior;
      }),
    );
  }

  /**
   * <zh/> 获取交互配置
   *
   * <en/> Get behaviors options
   * @returns <zh/> 交互配置 | <en/> behavior options
   * @apiCategory behavior
   */
  public getBehaviors(): BehaviorOptions {
    return this.options.behaviors || [];
  }

  /**
   * <zh/> 设置插件配置
   *
   * <en/> Set plugins options
   * @param plugins - <zh/> 插件配置 | <en/> plugin options
   * @remarks
   * <zh/> 设置的插件会全量替换原有的插件配置，如果需要新增插件可以使用如下方式：
   *
   * <en/> The set plugin will completely replace the original plugin configuration. If you need to add a plugin, you can use the following method:
   * ```ts
   * graph.setPlugins((plugins) => [...plugins, { key: 'grid-line' }])
   * ```
   * @apiCategory plugin
   */
  public setPlugins(plugins: PluginOptions | ((prev: PluginOptions) => PluginOptions)): void {
    this.options.plugins = isFunction(plugins) ? plugins(this.getPlugins()) : plugins;
    this.context.plugin?.setPlugins(this.options.plugins);
  }

  /**
   * <zh/> 更新插件配置
   *
   * <en/> Update plugin options
   * @param plugin - <zh/> 插件配置 | <en/> plugin options
   * @remarks
   * <zh/> 如果要更新一个插件，那么必须在插件配置中指定 key 字段，例如：
   *
   * <en/> If you want to update a plugin, you must specify the key field in the plugin options, for example:
   * ```ts
   * {
   *   plugins: [{ key: 'grid-line' }]
   * }
   *
   * graph.updatePlugin({ key: 'grid-line', follow: true })
   * ```
   * @apiCategory plugin
   */
  public updatePlugin(plugin: UpdatePluginOption): void {
    this.setPlugins((plugins) =>
      plugins.map((_plugin) => {
        if (typeof _plugin === 'object' && _plugin.key === plugin.key) {
          return { ..._plugin, ...plugin };
        }
        return _plugin;
      }),
    );
  }

  /**
   * <zh/> 获取插件配置
   *
   * <en/> Get plugins options
   * @returns <zh/> 插件配置 | <en/> plugin options
   * @apiCategory plugin
   */
  public getPlugins(): PluginOptions {
    return this.options.plugins || [];
  }

  /**
   * <zh/> 获取插件实例
   *
   * <en/> Get plugin instance
   * @param key - <zh/> 插件 key | <en/> plugin key
   * @returns <zh/> 插件实例 | <en/> plugin instance
   * @remarks
   * <zh/> 一些插件提供了 API 方法可供调用，例如全屏插件可以调用 `request` 和 `exit` 方法来请求和退出全屏
   *
   * <en/> Some plugins provide API methods for calling, such as the full-screen plugin can call the `request` and `exit` methods to request and exit full-screen
   * ```ts
   * const fullscreen = graph.getPluginInstance('fullscreen');
   *
   * fullscreen.request();
   *
   * fullscreen.exit();
   * ```
   * @apiCategory plugin
   */
  public getPluginInstance<T extends Plugin>(key: string) {
    return this.context.plugin!.getPluginInstance(key) as unknown as T;
  }

  /**
   * <zh/> 设置数据转换器
   *
   * <en/> Set data transforms
   * @param transforms - <zh/> 数据转换配置 | <en/> data transform options
   * @remarks
   * <zh/> 数据转换器能够在图渲染过程中执行数据转换，目前支持在渲染前对绘制数据进行转化。
   *
   * <en/> Data transforms can perform data transformation during the rendering process of the graph. Currently, it supports transforming the drawing data before rendering.
   * @apiCategory transform
   */
  public setTransforms(transforms: TransformOptions | ((prev: TransformOptions) => TransformOptions)): void {
    this.options.transforms = isFunction(transforms) ? transforms(this.getTransforms()) : transforms;
    this.context.transform?.setTransforms(this.options.transforms);
  }

  /**
   * <zh/> 更新数据转换器
   *
   * <en/> Update data transform
   * @param transform - <zh/> 数据转换器配置 | <en/> data transform options
   * @apiCategory transform
   */
  public updateTransform(transform: UpdateTransformOption): void {
    this.setTransforms((transforms) =>
      transforms.map((_transform) => {
        if (typeof _transform === 'object' && _transform.key === transform.key) {
          return { ..._transform, ...transform };
        }
        return _transform;
      }),
    );
    this.context.model.refreshData();
  }

  /**
   * <zh/> 获取数据转换器配置
   *
   * <en/> Get data transforms options
   * @returns <zh/> 数据转换配置 | <en/> data transform options
   * @apiCategory transform
   */
  public getTransforms(): TransformOptions {
    return this.options.transforms || [];
  }

  /**
   * <zh/> 获取图数据
   *
   * <en/> Get graph data
   * @returns <zh/> 图数据 | <en/> Graph data
   * <zh/> 获取当前图的数据，包括节点、边、组合数据
   *
   * <en/> Get the data of the current graph, including node, edge, and combo data
   * @apiCategory data
   */
  public getData(): Required<GraphData> {
    return this.context.model.getData();
  }

  /**
   * <zh/> 获取单个元素数据
   *
   * <en/> Get element data by ID
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素数据 | <en/> element data
   * @remarks
   * <zh/> 直接获取元素的数据而不必考虑元素类型
   *
   * <en/> Get element data directly without considering the element type
   * @apiCategory data
   */
  public getElementData(id: ID): ElementDatum;
  /**
   * <zh/> 批量获取多个元素数据
   *
   * <en/> Get multiple element data in batch
   * @param ids - <zh/> 元素 ID 数组 | <en/> element ID array
   * @remarks
   * <zh/> 直接获取元素的数据而不必考虑元素类型
   *
   * <en/> Get element data directly without considering the element type
   * @apiCategory data
   */
  public getElementData(ids: ID[]): ElementDatum[];
  public getElementData(ids: ID | ID[]): ElementDatum | ElementDatum[] {
    if (Array.isArray(ids)) return ids.map((id) => this.context.model.getElementDataById(id));
    return this.context.model.getElementDataById(ids);
  }

  /**
   * <zh/> 获取所有节点数据
   *
   * <en/> Get all node data
   * @returns <zh/> 节点数据 | <en/> node data
   * @apiCategory data
   */
  public getNodeData(): NodeData[];
  /**
   * <zh/> 获取单个节点数据
   *
   * <en/> Get single node data
   * @param id - <zh/> 节点 ID | <en/> node ID
   * @returns <zh/> 节点数据 | <en/> node data
   * @example
   * ```ts
   * const node1 = graph.getNodeData('node-1');
   * ```
   * @apiCategory data
   */
  public getNodeData(id: ID): NodeData;
  /**
   * <zh/> 批量获取多个节点数据
   *
   * <en/> Get multiple node data in batch
   * @param ids - <zh/> 节点 ID 数组 | <en/> node ID array
   * @returns <zh/> 节点数据 | <en/> node data
   * @example
   * ```ts
   * const [node1, node2] = graph.getNodeData(['node-1', 'node-2']);
   * ```
   * @apiCategory data
   */
  public getNodeData(ids: ID[]): NodeData[];
  public getNodeData(id?: ID | ID[]): NodeData | NodeData[] {
    if (id === undefined) return this.context.model.getNodeData();
    if (Array.isArray(id)) return this.context.model.getNodeData(id);
    return this.context.model.getNodeData([id])?.[0];
  }

  /**
   * <zh/> 获取所有边数据
   *
   * <en/> Get all edge data
   * @returns <zh/> 边数据 | <en/> edge data
   * @apiCategory data
   */
  public getEdgeData(): EdgeData[];
  /**
   * <zh/> 获取单条边数据
   *
   * <en/> Get single edge data
   * @param id - <zh/> 边 ID | <en/> edge ID
   * @returns <zh/> 边数据 | <en/> edge data
   * @example
   * ```ts
   * const edge1 = graph.getEdgeData('edge-1');
   * ```
   * @apiCategory data
   */
  public getEdgeData(id: ID): EdgeData;
  /**
   * <zh/> 批量获取多条边数据
   *
   * <en/> Get multiple edge data in batch
   * @param ids - <zh/> 边 ID 数组 | <en/> edge ID array
   * @returns <zh/> 边数据 | <en/> edge data
   * @example
   * ```ts
   * const [edge1, edge2] = graph.getEdgeData(['edge-1', 'edge-2']);
   * ```
   * @apiCategory data
   */
  public getEdgeData(ids: ID[]): EdgeData[];
  public getEdgeData(id?: ID | ID[]): EdgeData | EdgeData[] {
    if (id === undefined) return this.context.model.getEdgeData();
    if (Array.isArray(id)) return this.context.model.getEdgeData(id);
    return this.context.model.getEdgeData([id])?.[0];
  }

  /**
   * <zh/> 获取所有组合数据
   *
   * <en/> Get all combo data
   * @returns <zh/> 组合数据 | <en/> combo data
   * @apiCategory data
   */
  public getComboData(): ComboData[];
  /**
   * <zh/> 获取单个组合数据
   *
   * <en/> Get single combo data
   * @param id - <zh/> 组合ID | <en/> combo ID
   * @returns <zh/> 组合数据 | <en/> combo data
   * @example
   * ```ts
   * const combo1 = graph.getComboData('combo-1');
   * ```
   * @apiCategory data
   */
  public getComboData(id: ID): ComboData;
  /**
   * <zh/> 批量获取多个组合数据
   *
   * <en/> Get multiple combo data in batch
   * @param ids - <zh/> 组合ID 数组 | <en/> combo ID array
   * @returns <zh/> 组合数据 | <en/> combo data
   * @example
   * ```ts
   * const [combo1, combo2] = graph.getComboData(['combo-1', 'combo-2']);
   * ```
   * @apiCategory data
   */
  public getComboData(ids: ID[]): ComboData[];
  public getComboData(id?: ID | ID[]): ComboData | ComboData[] {
    if (id === undefined) return this.context.model.getComboData();
    if (Array.isArray(id)) return this.context.model.getComboData(id);
    return this.context.model.getComboData([id])?.[0];
  }

  /**
   * <zh/> 设置全量数据
   *
   * <en/> Set full data
   * @param data - <zh/> 数据 | <en/> data
   * @remarks
   * <zh/> 设置全量数据会替换当前图中的所有数据，G6 会自动进行数据差异计算
   *
   * <en/> Setting full data will replace all data in the current graph, and G6 will automatically calculate the data difference
   * @apiCategory data
   */
  public setData(data: GraphData | ((prev: GraphData) => GraphData)): void {
    this.context.model.setData(isFunction(data) ? data(this.getData()) : data);
  }

  /**
   * <zh/> 新增元素数据
   *
   * <en/> Add element data
   * @param data - <zh/> 元素数据 | <en/> element data
   * @example
   * ```ts
   * graph.addData({
   *  nodes: [{ id: 'node-1' }, { id: 'node-2' }],
   *  edges: [{ source: 'node-1', target: 'node-2' }],
   * });
   * ```
   * @apiCategory data
   */
  public addData(data: GraphData | ((prev: GraphData) => GraphData)): void {
    this.context.model.addData(isFunction(data) ? data(this.getData()) : data);
  }

  /**
   * <zh/> 新增节点数据
   *
   * <en/> Add node data
   * @param data - <zh/> 节点数据 | <en/> node data
   * @example
   * ```ts
   * graph.addNodeData([{ id: 'node-1' }, { id: 'node-2' }]);
   * ```
   * @apiCategory data
   */
  public addNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void {
    this.context.model.addNodeData(isFunction(data) ? data(this.getNodeData()) : data);
  }

  /**
   * <zh/> 新增边数据
   *
   * <en/> Add edge data
   * @param data - <zh/> 边数据 | <en/> edge data
   * @example
   * ```ts
   * graph.addEdgeData([{ source: 'node-1', target: 'node-2' }]);
   * ```
   * @apiCategory data
   */
  public addEdgeData(data: EdgeData[] | ((prev: EdgeData[]) => EdgeData[])): void {
    this.context.model.addEdgeData(isFunction(data) ? data(this.getEdgeData()) : data);
  }

  /**
   * <zh/> 新增组合数据
   *
   * <en/> Add combo data
   * @param data - <zh/> 组合数据 | <en/> combo data
   * @example
   * ```ts
   * graph.addComboData([{ id: 'combo-1' }]);
   * ```
   * @apiCategory data
   */
  public addComboData(data: ComboData[] | ((prev: ComboData[]) => ComboData[])): void {
    this.context.model.addComboData(isFunction(data) ? data(this.getComboData()) : data);
  }

  /**
   * <zh/> 为树图节点添加子节点数据
   *
   * <en/> Add child node data to the tree node
   * @param parentId - <zh/> 父节点 ID | <en/> parent node ID
   * @param childrenData - <zh/> 子节点数据 | <en/> child node data
   * @remarks
   * <zh/> 为组合添加子节点使用 addNodeData / addComboData 方法
   *
   * <en/> Use addNodeData / addComboData method to add child nodes to the combo
   * @apiCategory data
   */
  public addChildrenData(parentId: ID, childrenData: NodeData[]) {
    this.context.model.addChildrenData(parentId, childrenData);
  }

  /**
   * <zh/> 更新元素数据
   *
   * <en/> Update element data
   * @param data - <zh/> 元素数据 | <en/> element data
   * @remarks
   * <zh/> 只需要传入需要更新的数据即可，不必传入完整的数据
   *
   * <en/> Just pass in the data that needs to be updated, no need to pass in the complete data
   * @example
   * ```ts
   * graph.updateData({
   *   nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
   *   edges: [{ id: 'edge-1', style: { lineWidth: 2 } }]
   * });
   * ```
   * @apiCategory data
   */
  public updateData(data: PartialGraphData | ((prev: GraphData) => PartialGraphData)): void {
    this.context.model.updateData(isFunction(data) ? data(this.getData()) : data);
  }

  /**
   * <zh/> 更新节点数据
   *
   * <en/> Update node data
   * @param data - <zh/> 节点数据 | <en/> node data
   * @remarks
   * <zh/> 只需要传入需要更新的数据即可，不必传入完整的数据
   *
   * <en/> Just pass in the data that needs to be updated, no need to pass in the complete data
   * @example
   * ```ts
   * graph.updateNodeData([{ id: 'node-1', style: { x: 100, y: 100 } }]);
   * ```
   * @apiCategory data
   */
  public updateNodeData(
    data: PartialNodeLikeData<NodeData>[] | ((prev: NodeData[]) => PartialNodeLikeData<NodeData>[]),
  ): void {
    this.context.model.updateNodeData(isFunction(data) ? data(this.getNodeData()) : data);
  }

  /**
   * <zh/> 更新边数据
   *
   * <en/> Update edge data
   * @param data - <zh/> 边数据 | <en/> edge data
   * @remarks
   * <zh/> 只需要传入需要更新的数据即可，不必传入完整的数据
   *
   * <en/> Just pass in the data that needs to be updated, no need to pass in the complete data
   * @example
   * ```ts
   * graph.updateEdgeData([{ id: 'edge-1', style: { lineWidth: 2 } }]);
   * ```
   * @apiCategory data
   */
  public updateEdgeData(data: PartialEdgeData<EdgeData>[] | ((prev: EdgeData[]) => PartialEdgeData<EdgeData>[])): void {
    this.context.model.updateEdgeData(isFunction(data) ? data(this.getEdgeData()) : data);
  }

  /**
   * <zh/> 更新组合数据
   *
   * <en/> Update combo data
   * @param data - <zh/> 组合数据 | <en/> combo data
   * @remarks
   * <zh/> 只需要传入需要更新的数据即可，不必传入完整的数据
   *
   * <en/> Just pass in the data that needs to be updated, no need to pass in the complete data
   * @example
   * ```ts
   * graph.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100 } }]);
   * ```
   * @apiCategory data
   */
  public updateComboData(
    data: PartialNodeLikeData<ComboData>[] | ((prev: ComboData[]) => PartialNodeLikeData<ComboData>[]),
  ): void {
    this.context.model.updateComboData(isFunction(data) ? data(this.getComboData()) : data);
  }

  /**
   * <zh/> 删除元素数据
   *
   * <en/> Remove element data
   * @param ids - <zh/> 元素 ID 数组 | <en/> element ID array
   * @example
   * ```ts
   * graph.removeData({
   *   nodes: ['node-1', 'node-2'],
   *   edges: ['edge-1'],
   * });
   * ```
   * @apiCategory data
   */
  public removeData(ids: DataID | ((data: GraphData) => DataID)): void {
    this.context.model.removeData(isFunction(ids) ? ids(this.getData()) : ids);
  }

  /**
   * <zh/> 删除节点数据
   *
   * <en/> Remove node data
   * @param ids - <zh/> 节点 ID 数组 | <en/> node ID array
   * @example
   * ```ts
   * graph.removeNodeData(['node-1', 'node-2']);
   * ```
   * @apiCategory data
   */
  public removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])): void {
    this.context.model.removeNodeData(isFunction(ids) ? ids(this.getNodeData()) : ids);
  }

  /**
   * <zh/> 删除边数据
   *
   * <en/> Remove edge data
   * @param ids - <zh/> 边 ID 数组 | <en/> edge ID array
   * @remarks
   * <zh/> 如果传入边数据时仅提供了 source 和 target，那么需要通过 `idOf` 方法获取边的实际 ID
   *
   * <en/> If only the source and target are provided when passing in the edge data, you need to get the actual ID of the edge through the `idOf` method
   * @example
   * ```ts
   * graph.removeEdgeData(['edge-1']);
   * ```
   * @apiCategory data
   */
  public removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])): void {
    this.context.model.removeEdgeData(isFunction(ids) ? ids(this.getEdgeData()) : ids);
  }

  /**
   * <zh/> 删除组合数据
   *
   * <en/> Remove combo data
   * @param ids - <zh/> 组合 ID 数组 | <en/> 组合 ID array
   * @example
   * ```ts
   * graph.removeComboData(['combo-1']);
   * ```
   * @apiCategory data
   */
  public removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])): void {
    this.context.model.removeComboData(isFunction(ids) ? ids(this.getComboData()) : ids);
  }

  /**
   * <zh/> 获取元素类型
   *
   * <en/> Get element type
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素类型 | <en/> element type
   * @apiCategory element
   */
  public getElementType(id: ID): ElementType {
    return this.context.model.getElementType(id);
  }

  /**
   * <zh/> 获取节点或组合关联边的数据
   *
   * <en/> Get edge data related to the node or combo
   * @param id - <zh/> 节点或组合ID | <en/> node or combo ID
   * @param direction - <zh/> 边的方向 | <en/> edge direction
   * @returns <zh/> 边数据 | <en/> edge data
   * @apiCategory data
   */
  public getRelatedEdgesData(id: ID, direction: EdgeDirection = 'both'): EdgeData[] {
    return this.context.model.getRelatedEdgesData(id, direction);
  }

  /**
   * <zh/> 获取节点或组合的一跳邻居节点数据
   *
   * <en/> Get the one-hop neighbor node data of the node or combo
   * @param id - <zh/> 节点或组合ID | <en/> node or combo ID
   * @returns <zh/> 邻居节点数据 | <en/> neighbor node data
   * @apiCategory data
   */
  public getNeighborNodesData(id: ID): NodeData[] {
    return this.context.model.getNeighborNodesData(id);
  }

  /**
   * <zh/> 获取节点或组合的祖先元素数据
   *
   * <en/> Get the ancestor element data of the node or combo
   * @param id - <zh/> 节点或组合ID | <en/> node or combo ID
   * @param hierarchy - <zh/> 指定树图层级关系还是组合层级关系 | <en/> specify tree or combo hierarchy relationship
   * @returns <zh/> 祖先元素数据 | <en/> ancestor element data
   * @remarks
   * <zh/> 数组中的顺序是从父节点到祖先节点
   *
   * <en/> The order in the array is from the parent node to the ancestor node
   * @apiCategory data
   */
  public getAncestorsData(id: ID, hierarchy: HierarchyKey): NodeLikeData[] {
    return this.context.model.getAncestorsData(id, hierarchy);
  }

  /**
   * <zh/> 获取节点或组合的父元素数据
   *
   * <en/> Get the parent element data of the node or combo
   * @param id - <zh/> 节点或组合ID | <en/> node or combo ID
   * @param hierarchy - <zh/> 指定树图层级关系还是组合层级关系 | <en/> specify tree or combo hierarchy relationship
   * @returns <zh/> 父元素数据 | <en/> parent element data
   * @apiCategory data
   */
  public getParentData(id: ID, hierarchy: HierarchyKey): NodeLikeData | undefined {
    return this.context.model.getParentData(id, hierarchy);
  }

  /**
   * <zh/> 获取节点或组合的子元素数据
   *
   * <en/> Get the child element data of the node or combo
   * @param id - <zh/> 节点或组合ID | <en/> node or combo ID
   * @returns <zh/> 子元素数据 | <en/> child element data
   * @apiCategory data
   */
  public getChildrenData(id: ID): NodeLikeData[] {
    return this.context.model.getChildrenData(id);
  }

  /**
   * <zh/> 获取节点或组合的后代元素数据
   *
   * <en/> Get the descendant element data of the node or combo
   * @param id - <zh/> 节点或组合ID | <en/> node or combo ID
   * @returns <zh/> 后代元素数据 | <en/> descendant element data
   * @apiCategory data
   */
  public getDescendantsData(id: ID): NodeLikeData[] {
    return this.context.model.getDescendantsData(id);
  }

  /**
   * <zh/> 获取指定状态下的节点数据
   *
   * <en/> Get node data in a specific state
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 节点数据 | <en/> node data
   * @example
   * ```ts
   * const nodes = graph.getElementDataByState('node', 'selected');
   * ```
   * @apiCategory data
   */
  public getElementDataByState(elementType: 'node', state: State): NodeData[];
  /**
   * <zh/> 获取指定状态下的边数据
   *
   * <en/> Get edge data in a specific state
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 边数据 | <en/> edge data
   * @example
   * ```ts
   * const nodes = graph.getElementDataByState('edge', 'selected');
   * ```
   * @apiCategory data
   */
  public getElementDataByState(elementType: 'edge', state: State): EdgeData[];
  /**
   * <zh/> 获取指定状态下的组合数据
   *
   * <en/> Get combo data in a specific state
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 组合数据 | <en/> combo data
   * @example
   * ```ts
   * const nodes = graph.getElementDataByState('node', 'selected');
   * ```
   * @apiCategory data
   */
  public getElementDataByState(elementType: 'combo', state: State): ComboData[];
  public getElementDataByState(elementType: ElementType, state: State): ElementDatum[] {
    return this.context.model.getElementDataByState(elementType, state);
  }

  private async initCanvas() {
    if (this.context.canvas) return await this.context.canvas.ready;

    const {
      container = 'container',
      width,
      height,
      renderer,
      cursor,
      background,
      canvas: canvasOptions,
      devicePixelRatio = globalThis.devicePixelRatio ?? 1,
    } = this.options;
    if (container instanceof Canvas) {
      this.context.canvas = container;
      if (cursor) container.setCursor(cursor);
      if (renderer) container.setRenderer(renderer);
      await container.ready;
    } else {
      const $container = isString(container) ? document.getElementById(container!) : container;
      const containerSize = sizeOf($container!);

      this.emit(GraphEvent.BEFORE_CANVAS_INIT, { container: $container, width, height });
      const options = {
        ...canvasOptions,
        container: $container!,
        width: width || containerSize[0],
        height: height || containerSize[1],
        background,
        renderer,
        cursor,
        devicePixelRatio,
      };

      const canvas = new Canvas(options);

      this.context.canvas = canvas;
      await canvas.ready;
      this.emit(GraphEvent.AFTER_CANVAS_INIT, { canvas });
    }
  }

  private updateCanvas(options: GraphOptions) {
    const { renderer, cursor, height, width } = options;
    const canvas = this.context.canvas;
    if (!canvas) return;

    if (renderer) {
      this.emit(GraphEvent.BEFORE_RENDERER_CHANGE, { renderer: this.options.renderer });
      canvas.setRenderer(renderer);
      this.emit(GraphEvent.AFTER_RENDERER_CHANGE, { renderer });
    }

    if (cursor) canvas.setCursor(cursor);

    if (isNumber(width) || isNumber(height))
      this.setSize(width ?? this.options.width ?? 0, height ?? this.options.height ?? 0);
  }

  private initRuntime() {
    this.context.options = this.options;
    if (!this.context.batch) this.context.batch = new BatchController(this.context);
    if (!this.context.plugin) this.context.plugin = new PluginController(this.context);
    if (!this.context.viewport) this.context.viewport = new ViewportController(this.context);
    if (!this.context.transform) this.context.transform = new TransformController(this.context);
    if (!this.context.element) this.context.element = new ElementController(this.context);
    if (!this.context.animation) this.context.animation = new Animation(this.context);
    if (!this.context.layout) this.context.layout = new LayoutController(this.context);
    if (!this.context.behavior) this.context.behavior = new BehaviorController(this.context);
  }

  private async prepare(): Promise<void> {
    // 等待同步任务执行完成，避免 render 后立即调用 destroy 导致的问题
    // Wait for synchronous tasks to complete, to avoid problems caused by calling destroy immediately after render
    await Promise.resolve();

    if (this.destroyed) throw new Error(format('The graph instance has been destroyed'));

    await this.initCanvas();
    this.initRuntime();
  }

  /**
   * <zh/> 执行渲染
   *
   * <en/> Render
   * @remarks
   * <zh/> 此过程会执行数据更新、绘制元素、执行布局
   *
   * > ⚠️ render 为异步方法，如果需要在 render 后执行一些操作，可以使用 `await graph.render()` 或者监听 GraphEvent.AFTER_RENDER 事件
   *
   * <en/> This process will execute data update, element rendering, and layout execution
   *
   * > ⚠️ render is an asynchronous method. If you need to perform some operations after render, you can use `await graph.render()` or listen to the GraphEvent.AFTER_RENDER event
   * @apiCategory render
   */
  public async render(): Promise<void> {
    await this.prepare();
    emit(this, new GraphLifeCycleEvent(GraphEvent.BEFORE_RENDER));
    const animation = this.context.element!.draw({ type: 'render' });
    await Promise.all([animation?.finished, this.context.layout!.layout()]);
    await this.autoFit();
    this.rendered = true;
    emit(this, new GraphLifeCycleEvent(GraphEvent.AFTER_RENDER));
  }

  /**
   * <zh/> 绘制元素
   *
   * <en/> Draw elements
   * @returns <zh/> 渲染结果 | <en/> draw result
   * @remarks
   * <zh/> 仅执行元素绘制，不会重新布局
   *
   * <zh/> ⚠️ draw 为异步方法，如果需要在 draw 后执行一些操作，可以使用 `await graph.draw()` 或者监听 GraphEvent.AFTER_DRAW 事件
   *
   * <en/> Only execute element drawing, no re-layout
   *
   * <en/> ⚠️ draw is an asynchronous method. If you need to perform some operations after draw, you can use `await graph.draw()` or listen to the GraphEvent.AFTER_DRAW event
   * @apiCategory render
   */
  public async draw(): Promise<void> {
    await this.prepare();
    await this.context.element!.draw()?.finished;
  }

  /**
   * <zh/> 执行布局
   *
   * <en/> Execute layout
   * @apiCategory layout
   */
  public async layout() {
    await this.context.layout!.layout();
  }

  /**
   * <zh/> 停止布局
   *
   * <en/> Stop layout
   * @remarks
   * <zh/> 适用于带有迭代动画的布局，目前有 `force` 属于此类布局，即停止力导布局的迭代，一般用于布局迭代时间过长情况下的手动停止迭代动画，例如在点击画布/节点的监听中调用
   *
   * <en/> Suitable for layouts with iterative animations. Currently, `force` belongs to this type of layout, that is, stop the iteration of the force-directed layout. It is generally used to manually stop the iteration animation when the layout iteration time is too long, such as calling in the click canvas/node listener
   * @apiCategory layout
   */
  public stopLayout() {
    this.context.layout!.stopLayout();
  }

  /**
   * <zh/> 清空画布元素
   *
   * <en/> Clear canvas elements
   * @apiCategory canvas
   */
  public async clear(): Promise<void> {
    this.context.model.setData({});
    await this.draw();
  }

  /**
   * <zh/> 销毁当前图实例
   *
   * <en/> Destroy the current graph instance
   * @remarks
   * <zh/> 销毁后无法进行任何操作，如果需要重新使用，需要重新创建一个新的图实例
   *
   * <en/> After destruction, no operations can be performed. If you need to reuse it, you need to create a new graph instance
   * @apiCategory instance
   */
  public destroy(): void {
    emit(this, new GraphLifeCycleEvent(GraphEvent.BEFORE_DESTROY));

    const { layout, animation, element, model, canvas, behavior, plugin } = this.context;
    plugin?.destroy();
    behavior?.destroy();
    layout?.destroy();
    animation?.destroy();
    element?.destroy();
    model.destroy();
    canvas?.destroy();
    this.options = {};
    // @ts-expect-error force delete
    this.context = {};

    this.off();
    globalThis.removeEventListener?.('resize', this.onResize);

    this.destroyed = true;

    emit(this, new GraphLifeCycleEvent(GraphEvent.AFTER_DESTROY));
  }

  /**
   * <zh/> 获取画布实例
   *
   * <en/> Get canvas instance
   * @returns - <zh/> 画布实例 | <en/> canvas instance
   * @apiCategory canvas
   */
  public getCanvas(): Canvas {
    return this.context.canvas;
  }

  /**
   * <zh/> 调整画布大小为图容器大小
   *
   * <en/> Resize the canvas to the size of the graph container
   * @apiCategory viewport
   */
  public resize(): void;
  /**
   * <zh/> 调整画布大小为指定宽高
   *
   * <en/> Resize the canvas to the specified width and height
   * @param width - <zh/> 宽度 | <en/> width
   * @param height - <zh/> 高度 | <en/> height
   * @apiCategory viewport
   */
  public resize(width: number, height: number): void;
  public resize(width?: number, height?: number): void {
    const containerSize = sizeOf(this.context.canvas?.getContainer());
    const specificSize: Vector2 = [width || containerSize[0], height || containerSize[1]];

    if (!this.context.canvas) return;

    const canvasSize = this.context.canvas!.getSize();
    if (isEqual(specificSize, canvasSize)) return;

    emit(this, new GraphLifeCycleEvent(GraphEvent.BEFORE_SIZE_CHANGE, { size: specificSize }));
    this.context.canvas.resize(...specificSize);
    emit(this, new GraphLifeCycleEvent(GraphEvent.AFTER_SIZE_CHANGE, { size: specificSize }));
  }

  /**
   * <zh/> 将图缩放至合适大小并平移至视口中心
   *
   * <en/> Zoom the graph to fit the viewport and move it to the center of the viewport
   * @param options - <zh/> 适配配置 | <en/> fit options
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory viewport
   */
  public async fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport?.fitView(options, animation);
  }

  /**
   * <zh/> 将图平移至视口中心
   *
   * <en/> Move the graph to the center of the viewport
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory viewport
   */
  public async fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport?.fitCenter(animation);
  }

  private async autoFit(): Promise<void> {
    const { autoFit } = this.context.options;
    if (!autoFit) return;

    if (isString(autoFit)) {
      if (autoFit === 'view') await this.fitView();
      else if (autoFit === 'center') await this.fitCenter();
    } else {
      const { type, animation } = autoFit;
      if (type === 'view') await this.fitView(autoFit.options, animation);
      else if (type === 'center') await this.fitCenter(animation);
    }
  }

  /**
   * <zh/> 聚焦元素
   *
   * <en/> Focus on element
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @remarks
   * <zh/> 移动图，使得元素对齐到视口中心
   *
   * <en/> Move the graph so that the element is aligned to the center of the viewport
   * @apiCategory viewport
   */
  public async focusElement(id: ID | ID[], animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport?.focusElements(Array.isArray(id) ? id : [id], animation);
  }

  /**
   * <zh/> 基于当前缩放比例进行缩放（相对缩放）
   *
   * <en/> Zoom based on the current zoom ratio (relative zoom)
   * @param ratio - <zh/> 缩放比例 | <en/> zoom ratio
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @param origin - <zh/> 缩放中心(视口坐标) | <en/> zoom center(viewport coordinates)
   * @remarks
   * <zh/>
   * - ratio > 1 放大
   * - ratio < 1 缩小
   *
   * <en/>
   * - ratio > 1 zoom in
   * - ratio < 1 zoom out
   * @apiCategory viewport
   */
  public async zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    await this.context.viewport!.transform({ mode: 'relative', scale: ratio, origin }, animation);
  }

  /**
   * <zh/> 缩放画布至指定比例（绝对缩放）
   *
   * <en/> Zoom the canvas to the specified ratio (absolute zoom)
   * @param zoom - <zh/> 指定缩放比例 | <en/> specified zoom ratio
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @param origin - <zh/> 缩放中心(视口坐标) | <en/> zoom center(viewport coordinates)
   * @remarks
   * <zh/>
   * - zoom = 1 默认大小
   * - zoom > 1 放大
   * - zoom < 1 缩小
   *
   * <en/>
   * - zoom = 1 default size
   * - zoom > 1 zoom in
   * - zoom < 1 zoom out
   * @apiCategory viewport
   */
  public async zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    this.context.viewport!.transform({ mode: 'absolute', scale: zoom, origin }, animation);
  }

  /**
   * <zh/> 获取当前缩放比例
   *
   * <en/> Get the current zoom ratio
   * @returns <zh/> 缩放比例 | <en/> zoom ratio
   * @apiCategory viewport
   */
  public getZoom(): number {
    return this.context.viewport!.getZoom();
  }

  /**
   * <zh/> 基于当前旋转角度进行旋转（相对旋转）
   *
   * <en/> Rotate based on the current rotation angle (relative rotation)
   * @param angle - <zh/> 旋转角度 | <en/> rotation angle
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @param origin - <zh/> 旋转中心(视口坐标) | <en/> rotation center(viewport coordinates)
   * @apiCategory viewport
   */
  public async rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    await this.context.viewport!.transform({ mode: 'relative', rotate: angle, origin }, animation);
  }

  /**
   * <zh/> 旋转画布至指定角度 (绝对旋转)
   *
   * <en/> Rotate the canvas to the specified angle (absolute rotation)
   * @param angle - <zh/> 目标角度 | <en/> target angle
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @param origin - <zh/> 旋转中心(视口坐标) | <en/> rotation center(viewport coordinates)
   * @apiCategory viewport
   */
  public async rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    await this.context.viewport!.transform({ mode: 'absolute', rotate: angle, origin }, animation);
  }

  /**
   * <zh/> 获取当前旋转角度
   *
   * <en/> Get the current rotation angle
   * @returns <zh/> 旋转角度 | <en/> rotation angle
   * @apiCategory viewport
   */
  public getRotation(): number {
    return this.context.viewport!.getRotation();
  }

  /**
   * <zh/> 将图平移指定距离 (相对平移)
   *
   * <en/> Translate the graph by the specified distance (relative translation)
   * @param offset - <zh/> 偏移量 | <en/> offset
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory viewport
   */
  public async translateBy(offset: Point, animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport!.transform({ mode: 'relative', translate: offset }, animation);
  }

  /**
   * <zh/> 将图平移至指定位置 (绝对平移)
   *
   * <en/> Translate the graph to the specified position (absolute translation)
   * @param position - <zh/> 指定位置 | <en/> specified position
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory viewport
   */
  public async translateTo(position: Point, animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport!.transform({ mode: 'absolute', translate: position }, animation);
  }

  /**
   * <zh/> 获取图的位置
   *
   * <en/> Get the position of the graph
   * @returns <zh/> 图的位置 | <en/> position of the graph
   * @remarks
   * <zh/> 即画布原点在视口坐标系下的位置。默认状态下，图的位置为 [0, 0]
   *
   * <en/> That is, the position of the canvas origin in the viewport coordinate system. By default, the position of the graph is [0, 0]
   * @apiCategory viewport
   */
  public getPosition(): Point {
    return subtract([0, 0], this.getCanvasByViewport([0, 0]));
  }

  /**
   * <zh/> 将元素平移指定距离 (相对平移)
   *
   * <en/> Translate the element by the specified distance (relative translation)
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param offset - <zh/> 偏移量 | <en/> offset
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async translateElementBy(id: ID, offset: Point, animation?: boolean): Promise<void>;
  /**
   * <zh/> 批量将元素平移指定距离 (相对平移)
   *
   * <en/> Batch translate elements by the specified distance (relative translation)
   * @param offsets - <zh/> 偏移量配置 | <en/> offset options
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async translateElementBy(offsets: Record<ID, Point>, animation?: boolean): Promise<void>;
  public async translateElementBy(
    args1: ID | Record<ID, Point>,
    args2?: Point | boolean,
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1 as ID]: args2 as Point }, args3];

    Object.entries(config).forEach(([id, offset]) => this.context.model.translateNodeLikeBy(id, offset));
    await this.context.element!.draw({ animation, stage: 'translate' })?.finished;
  }

  /**
   * <zh/> 将元素平移至指定位置 (绝对平移)
   *
   * <en/> Translate the element to the specified position (absolute translation)
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param position - <zh/> 指定位置 | <en/> specified position
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async translateElementTo(id: ID, position: Point, animation?: boolean): Promise<void>;
  /**
   * <zh/> 批量将元素平移至指定位置 (绝对平移)
   *
   * <en/> Batch translate elements to the specified position (absolute translation)
   * @param positions - <zh/> 位置配置 | <en/> position options
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async translateElementTo(positions: Record<ID, Point>, animation?: boolean): Promise<void>;
  public async translateElementTo(
    args1: ID | Record<ID, Point>,
    args2?: boolean | Point,
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1 as ID]: args2 as Point }, args3];

    Object.entries(config).forEach(([id, position]) => this.context.model.translateNodeLikeTo(id, position));
    await this.context.element!.draw({ animation, stage: 'translate' })?.finished;
  }

  /**
   * <zh/> 获取元素位置
   *
   * <en/> Get element position
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素位置 | <en/> element position
   * @apiCategory element
   */
  public getElementPosition(id: ID): Point {
    return this.context.model.getElementPosition(id);
  }

  /**
   * <zh/> 获取元素渲染样式
   *
   * <en/> Get element rendering style
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素渲染样式 | <en/> element rendering style
   * @apiCategory element
   */
  public getElementRenderStyle(id: ID): Record<string, any> {
    return omit(this.context.element!.getElement(id)!.attributes, ['context']);
  }

  /**
   * <zh/> 设置元素可见性
   *
   * <en/> Set element visibility
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param visibility - <zh/> 可见性 | <en/> visibility
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @remarks
   * <zh/> 可见性配置包括 `visible` 和 `hidden` 两种状态
   *
   * <en/> Visibility configuration includes two states: `visible` and `hidden`
   * @apiCategory element
   */
  public async setElementVisibility(
    id: ID,
    visibility: BaseStyleProps['visibility'],
    animation?: boolean,
  ): Promise<void>;
  /**
   * <zh/> 批量设置元素可见性
   *
   * <en/> Batch set element visibility
   * @param visibility - <zh/> 可见性配置 | <en/> visibility options
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory element
   */
  public async setElementVisibility(
    visibility: Record<ID, BaseStyleProps['visibility']>,
    animation?: boolean,
  ): Promise<void>;
  public async setElementVisibility(
    args1: ID | Record<ID, BaseStyleProps['visibility']>,
    args2?: boolean | BaseStyleProps['visibility'],
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1]: args2 as BaseStyleProps['visibility'] }, args3];

    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    Object.entries(config).forEach(([id, value]) => {
      const elementType = this.getElementType(id);
      dataToUpdate[`${elementType}s`].push({ id, style: { visibility: value } });
    });

    const { model, element } = this.context;
    model.preventUpdateNodeLikeHierarchy(() => {
      model.updateData(dataToUpdate);
    });
    await element!.draw({ animation, stage: 'visibility' })?.finished;
  }

  /**
   * <zh/> 显示元素
   *
   * <en/> Show element
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async showElement(id: ID | ID[], animation?: boolean): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];
    await this.setElementVisibility(
      Object.fromEntries(ids.map((_id) => [_id, 'visible'] as [ID, BaseStyleProps['visibility']])),
      animation,
    );
  }

  /**
   * <zh/> 隐藏元素
   *
   * <en/> Hide element
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async hideElement(id: ID | ID[], animation?: boolean): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];
    await this.setElementVisibility(
      Object.fromEntries(ids.map((_id) => [_id, 'hidden'] as [ID, BaseStyleProps['visibility']])),
      animation,
    );
  }

  /**
   * <zh/> 获取元素可见性
   *
   * <en/> Get element visibility
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素可见性 | <en/> element visibility
   * @apiCategory element
   */
  public getElementVisibility(id: ID): BaseStyleProps['visibility'] {
    const element = this.context.element!.getElement(id)!;
    return element?.style?.visibility ?? 'visible';
  }

  /**
   * <zh/> 设置元素层级
   *
   * <en/> Set element z-index
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param zIndex - <zh/> 层级 | <en/> z-index
   * @apiCategory element
   */
  public async setElementZIndex(id: ID, zIndex: number): Promise<void>;
  /**
   * <zh/> 批量设置元素层级
   *
   * <en/> Batch set element z-index
   * @param zIndex - <zh/> 层级配置 | <en/> z-index options
   * @apiCategory element
   */
  public async setElementZIndex(zIndex: Record<ID, number>): Promise<void>;
  public async setElementZIndex(args1: ID | Record<ID, number>, args2?: number): Promise<void> {
    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    const config = isObject(args1) ? args1 : { [args1 as ID]: args2 as number };

    Object.entries(config).forEach(([id, value]) => {
      const elementType = this.getElementType(id);
      dataToUpdate[`${elementType}s`].push({ id, style: { zIndex: value } });
    });

    const { model, element } = this.context;
    model.preventUpdateNodeLikeHierarchy(() => model.updateData(dataToUpdate));
    await element!.draw({ animation: false, stage: 'zIndex' })?.finished;
  }

  /**
   * <zh/> 将元素置于最顶层
   *
   * <en/> Bring the element to the front
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @apiCategory element
   */
  public async frontElement(id: ID | ID[]): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];
    const { model } = this.context;
    const zIndexes: Record<ID, number> = {};

    ids.map((_id) => {
      const zIndex = model.getFrontZIndex(_id);
      const elementType = model.getElementType(_id);
      if (elementType === 'combo') {
        const ancestor = model.getAncestorsData(_id, COMBO_KEY).at(-1) || this.getComboData(_id);
        const descendants = [ancestor, ...model.getDescendantsData(idOf(ancestor))];
        const delta = zIndex - getZIndexOf(ancestor);
        descendants.forEach((combo) => {
          zIndexes[idOf(combo)] = this.getElementZIndex(idOf(combo)) + delta;
        });

        const { internal } = getSubgraphRelatedEdges(descendants.map(idOf), (id) => model.getRelatedEdgesData(id));
        internal.forEach((edge) => {
          const edgeId = idOf(edge);
          zIndexes[edgeId] = this.getElementZIndex(edgeId) + delta;
        });
      } else zIndexes[_id] = zIndex;
    });

    await this.setElementZIndex(zIndexes);
  }

  /**
   * <zh/> 获取元素层级
   *
   * <en/> Get element z-index
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素层级 | <en/> element z-index
   * @apiCategory element
   */
  public getElementZIndex(id: ID): number {
    return getZIndexOf(this.context.model.getElementDataById(id));
  }

  /**
   * <zh/> 设置元素状态
   *
   * <en/> Set element state
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param state - <zh/> 状态 | <en/> state
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory element
   */
  public async setElementState(id: ID, state: State | State[], animation?: boolean): Promise<void>;
  /**
   * <zh/> 批量设置元素状态
   *
   * <en/> Batch set element state
   * @param state - <zh/> 状态配置 | <en/> state options
   * @param animation - <zh/> 动画配置 | <en/> animation options
   * @apiCategory element
   */
  public async setElementState(state: Record<ID, State | State[]>, animation?: boolean): Promise<void>;
  public async setElementState(
    args1: ID | Record<ID, State | State[]>,
    args2?: boolean | State | State[],
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1]: args2 as State | State[] }, args3];

    const parseState = (state: State | State[]) => {
      if (!state) return [];
      return Array.isArray(state) ? state : [state];
    };

    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    Object.entries(config).forEach(([id, value]) => {
      const elementType = this.getElementType(id);
      dataToUpdate[`${elementType}s`].push({ id, states: parseState(value) });
    });
    this.updateData(dataToUpdate);

    await this.context.element!.draw({ animation, stage: 'state' })?.finished;
  }

  /**
   * <zh/> 获取元素状态
   *
   * <en/> Get element state
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素状态 | <en/> element state
   * @apiCategory element
   */
  public getElementState(id: ID): State[] {
    return this.context.model.getElementState(id);
  }

  /**
   * <zh/> 获取元素自身以及子节点在世界坐标系下的渲染包围盒
   *
   * <en/> Get the rendering bounding box of the element itself and its child nodes in the world coordinate system
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 渲染包围盒 | <en/> render bounding box
   * @apiCategory element
   */
  public getElementRenderBounds(id: ID): AABB {
    return this.context.element!.getElement(id)!.getRenderBounds();
  }

  private isCollapsingExpanding = false;

  /**
   * <zh/> 收起组合
   *
   * <en/> Collapse Combo
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async collapseElement(id: ID, animation: boolean = true): Promise<void> {
    const { model, element } = this.context;
    if (isCollapsed(model.getNodeLikeData([id])[0])) return;

    if (this.isCollapsingExpanding) return;

    const elementType = model.getElementType(id);

    await this.frontElement(id);
    this.isCollapsingExpanding = true;
    this.setElementCollapsibility(id, true);
    if (elementType === 'node') await element!.collapseNode(id, animation);
    else if (elementType === 'combo') await element!.collapseCombo(id, animation);

    this.isCollapsingExpanding = false;
  }

  /**
   * <zh/> 展开组合
   *
   * <en/> Expand Combo
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否启用动画 | <en/> whether to enable animation
   * @apiCategory element
   */
  public async expandElement(id: ID, animation: boolean = true): Promise<void> {
    const { model, element } = this.context;
    if (!isCollapsed(model.getNodeLikeData([id])[0])) return;

    if (this.isCollapsingExpanding) return;

    const elementType = model.getElementType(id);

    this.isCollapsingExpanding = true;
    this.setElementCollapsibility(id, false);
    if (elementType === 'node') await element!.expandNode(id, animation);
    else if (elementType === 'combo') await element!.expandCombo(id, animation);

    this.isCollapsingExpanding = false;
  }

  private setElementCollapsibility(id: ID, collapsed: boolean) {
    const elementType = this.getElementType(id);
    if (elementType === 'node') this.updateNodeData([{ id, style: { collapsed } }]);
    else if (elementType === 'combo') this.updateComboData([{ id, style: { collapsed } }]);
  }

  /**
   * <zh/> 导出画布内容为 DataURL
   *
   * <en/> Export canvas content as DataURL
   * @param options - <zh/> 导出配置 | <en/> export options
   * @returns <zh/> DataURL | <en/> DataURL
   * @apiCategory exportImage
   */
  public async toDataURL(options: Partial<DataURLOptions> = {}): Promise<string> {
    return this.context.canvas!.toDataURL(options);
  }

  /**
   * <zh/> 给定的视窗 DOM 坐标，转换为画布上的绘制坐标
   *
   * <en/> Convert the given viewport DOM coordinates to the drawing coordinates on the canvas
   * @param point - <zh/> 视窗坐标 | <en/> viewport coordinates
   * @returns <zh/> 画布上的绘制坐标 | <en/> drawing coordinates on the canvas
   * @apiCategory viewport
   */
  public getCanvasByViewport(point: Point): Point {
    return this.context.canvas.getCanvasByViewport(point);
  }

  /**
   * <zh/> 给定画布上的绘制坐标，转换为视窗 DOM 的坐标
   *
   * <en/> Convert the given drawing coordinates on the canvas to the coordinates of the viewport DOM
   * @param point - <zh/> 画布坐标 | <en/> canvas coordinates
   * @returns <zh/> 视窗 DOM 的坐标 | <en/> coordinates of the viewport DOM
   * @apiCategory viewport
   */
  public getViewportByCanvas(point: Point): Point {
    return this.context.canvas.getViewportByCanvas(point);
  }

  /**
   * <zh/> 给定画布上的绘制坐标，转换为浏览器坐标
   *
   * <en/> Convert the given drawing coordinates on the canvas to browser coordinates
   * @param point - <zh/> 画布坐标 | <en/> canvas coordinates
   * @returns <zh/> 浏览器坐标 | <en/> browser coordinates
   * @apiCategory viewport
   */
  public getClientByCanvas(point: Point): Point {
    return this.context.canvas.getClientByCanvas(point);
  }

  /**
   * <zh/> 给定的浏览器坐标，转换为画布上的绘制坐标
   *
   * <en/> Convert the given browser coordinates to drawing coordinates on the canvas
   * @param point - <zh/> 浏览器坐标 | <en/> browser coordinates
   * @returns <zh/> 画布上的绘制坐标 | <en/> drawing coordinates on the canvas
   * @apiCategory viewport
   */
  public getCanvasByClient(point: Point): Point {
    return this.context.canvas.getCanvasByClient(point);
  }

  /**
   * <zh/> 获取视口中心的画布坐标
   *
   * <en/> Get the canvas coordinates of the viewport center
   * @returns <zh/> 视口中心的画布坐标 | <en/> Canvas coordinates of the viewport center
   * @apiCategory viewport
   */
  public getViewportCenter(): Point {
    return this.context.viewport!.getViewportCenter();
  }

  /**
   * <zh/> 获取视口中心的视口坐标
   *
   * <en/> Get the viewport coordinates of the viewport center
   * @returns <zh/> 视口中心的视口坐标 | <en/> Viewport coordinates of the viewport center
   * @apiCategory viewport
   */
  public getCanvasCenter(): Point {
    return this.context.viewport!.getCanvasCenter();
  }

  private onResize = debounce(() => {
    this.resize();
  }, 300);

  /**
   * <zh/> 监听事件
   *
   * <en/> Listen to events
   * @param eventName - <zh/> 事件名称 | <en/> event name
   * @param callback - <zh/> 回调函数 | <en/> callback function
   * @param once - <zh/> 是否只监听一次 | <en/> whether to listen only once
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   * @apiCategory event
   */
  public on<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void, once?: boolean): this {
    return super.on(eventName, callback, once);
  }

  /**
   * <zh/> 一次性监听事件
   *
   * <en/> Listen to events once
   * @param eventName - <zh/> 事件名称 | <en/> event name
   * @param callback - <zh/> 回调函数 | <en/> callback function
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   * @apiCategory event
   */
  public once<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void): this {
    return super.once(eventName, callback);
  }

  /**
   * <zh/> 移除全部事件监听
   *
   * <en/> Remove all event listeners
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   * @apiCategory event
   */
  public off(): this;
  /**
   * <zh/> 移除指定事件的全部监听
   *
   * <en/> Remove all listeners for the specified event
   * @param eventName - <zh/> 事件名称 | <en/> event name
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   * @apiCategory event
   */
  public off(eventName: string): this;
  /**
   * <zh/> 移除事件监听
   *
   * <en/> Remove event listener
   * @param eventName - <zh/> 事件名称 | <en/> event name
   * @param callback - <zh/> 回调函数 | <en/> callback function
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   * @apiCategory event
   */
  public off(eventName: string, callback: (...args: any[]) => void): this;
  public off(eventName?: string, callback?: (...args: any[]) => void) {
    return super.off(eventName, callback);
  }
}
