import EventEmitter from '@antv/event-emitter';
import { IGroup } from '@antv/g-base/lib/interfaces';
import { BBox, Point } from '@antv/g-base/lib/types';
import GCanvas from '@antv/g-canvas/lib/canvas';
import GSVGCanvas from '@antv/g-svg/lib/canvas';
import Group from '@antv/g-canvas/lib/group';
import { mat3 } from '@antv/matrix-util/lib';
import clone from '@antv/util/lib/clone';
import deepMix from '@antv/util/lib/deep-mix';
import each from '@antv/util/lib/each';
import isPlainObject from '@antv/util/lib/is-plain-object';
import isString from '@antv/util/lib/is-string';
import isNumber from '@antv/util/lib/is-number';
import {
  GraphAnimateConfig,
  GraphOptions,
  IGraph,
  IModeOption,
  IModeType,
  IStates,
} from '../interface/graph';
import { IEdge, INode } from '../interface/item';
import {
  EdgeConfig,
  GraphData,
  GroupConfig,
  Item,
  ITEM_TYPE,
  Matrix,
  ModelConfig,
  NodeConfig,
  NodeMap,
  Padding,
  TreeGraphData,
} from '../types';
import { getAllNodeInGroups } from '../util/group';
import { move, translate } from '../util/math';
import { groupBy } from 'lodash';
import Global from '../global';
import {
  CustomGroup,
  EventController,
  ItemController,
  LayoutController,
  ModeController,
  StateController,
  ViewController,
} from './controller';
import PluginBase from '../plugins/base';
import createDom from '@antv/dom-util/lib/create-dom';

const NODE = 'node';
const SVG = 'svg';
const CANVAS = 'canvas';

interface IGroupBBox {
  [key: string]: BBox;
}

export interface PrivateGraphOption extends GraphOptions {
  data: GraphData;

  // capture event
  event: boolean;

  nodes: NodeConfig[];

  edges: EdgeConfig[];

  groups: GroupConfig[];

  itemMap: NodeMap;

  callback: () => void;

  groupBBoxs: IGroupBBox;

  groupNodes: NodeMap;

  /**
   * 格式：
   * {
   *  hover: [Node, Node],
   *  selected: [Node]
   * }
   */
  states: IStates;
}

export default class Graph extends EventEmitter implements IGraph {
  private animating: boolean;

  private cfg: GraphOptions & { [key: string]: any };

  public destroyed: boolean;

  constructor(cfg: GraphOptions) {
    super();
    this.cfg = deepMix(this.getDefaultCfg(), cfg);
    this.init();
    this.animating = false;
    this.destroyed = false;
  }

  private init() {
    this.initCanvas();

    // instance controller
    const eventController = new EventController(this);
    const viewController = new ViewController(this);
    const modeController = new ModeController(this);
    const itemController = new ItemController(this);
    const layoutController = new LayoutController(this);
    const stateController = new StateController(this);
    const customGroupControll = new CustomGroup(this);

    this.set({
      eventController,
      viewController,
      modeController,
      itemController,
      layoutController,
      stateController,
      customGroupControll,
    });

    this.initPlugin();
  }

  private initCanvas() {
    let container: string | HTMLElement | null = this.get('container');
    if (isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }

    if (!container) {
      throw new Error('invalid container');
    }

    const width: number = this.get('width');
    const height: number = this.get('height');
    const renderer: string = this.get('renderer');

    let canvas;

    if (renderer === SVG) {
      canvas = new GSVGCanvas({
        container,
        width,
        height
      });
    } else {
      canvas = new GCanvas({
        container,
        width,
        height
      });
    }

    this.set('canvas', canvas);

    this.initGroups();
  }

  private initPlugin(): void {
    const self = this;
    each(self.get('plugins'), plugin => {
      if (!plugin.destroyed && plugin.initPlugin) {
        plugin.initPlugin(self);
      }
    });
  }

  // 初始化所有 Group
  private initGroups(): void {
    const canvas: GCanvas = this.get('canvas');
    const el: HTMLElement = this.get('canvas').get('el');
    const { id } = el;

    const group: IGroup = canvas.addGroup({
      id: `${id}-root`,
      className: Global.rootContainerClassName,
    });

    if (this.get('groupByTypes')) {
      const edgeGroup: IGroup = group.addGroup({
        id: `${id}-edge`,
        className: Global.edgeContainerClassName,
      });

      const nodeGroup: IGroup = group.addGroup({
        id: `${id}-node`,
        className: Global.nodeContainerClassName,
      });

      const delegateGroup: IGroup = group.addGroup({
        id: `${id}-delegate`,
        className: Global.delegateContainerClassName,
      });

      // 用于存储自定义的群组
      const customGroup: IGroup = group.addGroup({
        id: `${id}-group`,
        className: Global.customGroupContainerClassName,
      });

      customGroup.toBack();

      this.set({ nodeGroup, edgeGroup, customGroup, delegateGroup });
    }
    this.set('group', group);
  }

  // eslint-disable-next-line class-methods-use-this
  public getDefaultCfg(): Partial<PrivateGraphOption> {
    return {
      /**
       * Container could be dom object or dom id
       */
      container: undefined,

      /**
       * Canvas width
       * unit pixel if undefined force fit width
       */
      width: undefined,

      /**
       * Canvas height
       * unit pixel if undefined force fit height
       */
      height: undefined,
      /**
       * renderer canvas or svg
       * @type {string}
       */
      renderer: 'canvas',
      /**
       * control graph behaviors
       */
      modes: {},
      /**
       * 注册插件
       */
      plugins: [],
      /**
       * source data
       */
      data: {},
      /**
       * Fit view padding (client scale)
       */
      fitViewPadding: 10,
      /**
       * Minimum scale size
       */
      minZoom: 0.2,
      /**
       * Maxmum scale size
       */
      maxZoom: 10,
      /**
       *  capture events
       */
      event: true,
      /**
       * group node & edges into different graphic groups
       */
      groupByTypes: true,
      /**
       * determine if it's a directed graph
       */
      directed: false,
      /**
       * when data or shape changed, should canvas draw automatically
       */
      autoPaint: true,
      /**
       * store all the node instances
       */
      nodes: [],
      /**
       * store all the edge instances
       */
      edges: [],
      /**
       * all the instances indexed by id
       */
      itemMap: {},
      /**
       * 边直接连接到节点的中心，不再考虑锚点
       */
      linkCenter: false,
      /**
       * 默认的节点配置，data 上定义的配置会覆盖这些配置。例如：
       * defaultNode: {
       *  type: 'rect',
       *  size: [60, 40],
       *  style: {
       *    //... 样式配置项
       *  }
       * }
       * 若数据项为 { id: 'node', x: 100, y: 100 }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， type: 'rect', size: [60, 40] }
       * 若数据项为 { id: 'node', x: 100, y: 100, type: 'circle' }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， type: 'circle', size: [60, 40] }
       */
      defaultNode: {},
      /**
       * 默认边配置，data 上定义的配置会覆盖这些配置。用法同 defaultNode
       */
      defaultEdge: {},
      /**
       * 节点默认样式，也可以添加状态样式
       * 例如：
       * const graph = new G6.Graph({
       *  nodeStateStyles: {
       *    selected: { fill: '#ccc', stroke: '#666' },
       *    active: { lineWidth: 2 }
       *  },
       *  ...
       * });
       *
       */
      nodeStateStyles: {},
      /**
       * 边默认样式，用法同nodeStateStyle
       */
      edgeStateStyles: {},
      /**
       * graph 状态
       */
      states: {},
      /**
       * 是否启用全局动画
       */
      animate: false,
      /**
       * 动画设置,仅在 animate 为 true 时有效
       */
      animateCfg: {
        /**
         * 帧回调函数，用于自定义节点运动路径，为空时线性运动
         */
        onFrame: undefined,
        /**
         * 动画时长(ms)
         */
        duration: 500,
        /**
         * 指定动画动效
         */
        easing: 'easeLinear',
      },
      callback: undefined,
      /**
       * group类型
       */
      groupType: 'circle',
      /**
       * group bbox 对象
       * @private
       */
      groupBBoxs: {},
      /**
       * 以groupid分组的节点数据
       * @private
       */
      groupNodes: {},
      /**
       * group 数据
       */
      groups: [],
      /**
       * group样式
       */
      groupStyle: {},
    };
  }

  /**
   * 将值设置到 this.cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */
  public set<T = any>(key: string | object, val?: T): Graph {
    if (isPlainObject(key)) {
      this.cfg = Object.assign({}, this.cfg, key);
    } else {
      this.cfg[key] = val;
    }
    return this;
  }

  /**
   * 获取 this.cfg 中的值
   * @param key 键
   */
  public get(key: string) {
    return this.cfg[key];
  }

  /**
   * 清理元素多个状态
   * @param {string|Item} item 元素id或元素实例
   * @param {string[]} states 状态
   */
  public clearItemStates(item: Item | string, states?: string[] | string): void {
    if (isString(item)) {
      item = this.findById(item);
    }

    const itemController: ItemController = this.get('itemController');

    itemController.clearItemStates(item, states);

    if (!states) {
      states = item.get<string[]>('states');
    }

    const stateController: StateController = this.get('stateController');
    stateController.updateStates(item, states, false);
  }

  /**
   * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
   * 若是自定义节点切在各种状态下
   * graph.node(node => {
   *  return {
   *    type: 'rect',
   *    label: node.id,
   *    style: { fill: '#666' },
   *    stateStyles: {
   *       selected: { fill: 'blue' },
   *       custom: { fill: 'green' }
   *     }
   *   }
   * });
   * @param {function} nodeFn 指定每个节点样式
   */
  public node(nodeFn: (config: NodeConfig) => Partial<NodeConfig>): void {
    if (typeof nodeFn === 'function') {
      this.set('nodeMapper', nodeFn);
    }
  }

  /**
   * 设置各个边样式
   * @param {function} edgeFn 指定每个边的样式,用法同 node
   */
  public edge(edgeFn: (config: EdgeConfig) => Partial<EdgeConfig>): void {
    if (typeof edgeFn === 'function') {
      this.set('edgeMapper', edgeFn);
    }
  }

  /**
   * 根据 ID 查询图元素实例
   * @param id 图元素 ID
   */
  public findById(id: string): Item {
    return this.get('itemMap')[id];
  }

  /**
   * 根据对应规则查找单个元素
   * @param {ITEM_TYPE} type 元素类型(node | edge | group)
   * @param {(item: T, index: number) => T} fn 指定规则
   * @return {T} 元素实例
   */
  public find<T extends Item>(
    type: ITEM_TYPE,
    fn: (item: T, index?: number) => boolean,
  ): T | undefined {
    let result: T | undefined;
    const items = this.get(`${type}s`);

    // eslint-disable-next-line consistent-return
    each(items, (item, i) => {
      if (fn(item, i)) {
        result = item;
        return result;
      }
    });

    return result;
  }

  /**
   * 查找所有满足规则的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {array} 元素实例
   */
  public findAll<T extends Item>(type: ITEM_TYPE, fn: (item: T, index?: number) => boolean): T[] {
    const result: T[] = [];

    each(this.get(`${type}s`), (item, i) => {
      if (fn(item, i)) {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * 查找所有处于指定状态的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} state 状态
   * @return {object} 元素实例
   */
  public findAllByState<T extends Item>(type: ITEM_TYPE, state: string): T[] {
    return this.findAll(type, item => item.hasState(state));
  }

  /**
   * 平移画布
   * @param dx 水平方向位移
   * @param dy 垂直方向位移
   */
  public translate(dx: number, dy: number): void {
    const group: Group = this.get('group');

    let matrix: Matrix = clone(group.getMatrix());
    if (!matrix) {
      matrix = mat3.create();
    }
    mat3.translate(matrix, matrix, [dx, dy]);

    group.setMatrix(matrix);

    this.emit('viewportchange', { action: 'translate', matrix: group.getMatrix() });
    this.autoPaint();
  }

  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   */
  public moveTo(x: number, y: number): void {
    const group: Group = this.get('group');
    move(group, { x, y });
    this.emit('viewportchange', { action: 'move', matrix: group.getMatrix() });
  }

  /**
   * 调整视口适应视图
   * @param {object} padding 四周围边距
   */
  public fitView(padding?: Padding): void {
    if (padding) {
      this.set('fitViewPadding', padding);
    }

    const viewController: ViewController = this.get('viewController');
    viewController.fitView();

    this.autoPaint();
  }

  /**
   * 新增行为
   * @param {string | IModeOption | IModeType[]} behaviors 添加的行为
   * @param {string | string[]} modes 添加到对应的模式
   * @return {Graph} Graph
   */
  public addBehaviors(
    behaviors: string | IModeOption | IModeType[],
    modes: string | string[],
  ): Graph {
    const modeController: ModeController = this.get('modeController');
    modeController.manipulateBehaviors(behaviors, modes, true);
    return this;
  }

  /**
   * 移除行为
   * @param {string | IModeOption | IModeType[]} behaviors 移除的行为
   * @param {string | string[]} modes 从指定的模式中移除
   * @return {Graph} Graph
   */
  public removeBehaviors(
    behaviors: string | IModeOption | IModeType[],
    modes: string | string[],
  ): Graph {
    const modeController: ModeController = this.get('modeController');
    modeController.manipulateBehaviors(behaviors, modes, false);
    return this;
  }

  /**
   * 伸缩窗口
   * @param ratio 伸缩比例
   * @param center 以center的x, y坐标为中心缩放
   */
  public zoom(ratio: number, center?: Point): void {
    const group: Group = this.get('group');
    let matrix: Matrix = clone(group.getMatrix());
    const minZoom: number = this.get('minZoom');
    const maxZoom: number = this.get('maxZoom');

    if (!matrix) {
      matrix = mat3.create();
    }

    if (center) {
      mat3.translate(matrix, matrix, [-center.x, -center.y]);
      mat3.scale(matrix, matrix, [ratio, ratio]);
      mat3.translate(matrix, matrix, [center.x, center.y]);
    } else {
      mat3.scale(matrix, matrix, [ratio, ratio]);
    }

    if ((minZoom && matrix[0] < minZoom) || (maxZoom && matrix[0] > maxZoom)) {
      return;
    }

    group.setMatrix(matrix);
    this.emit('viewportchange', { action: 'zoom', matrix });
    this.autoPaint();
  }

  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {Point} center 以center的x, y坐标为中心缩放
   */
  public zoomTo(toRatio: number, center?: Point): void {
    const ratio = toRatio / this.getZoom();
    this.zoom(ratio, center);
  }

  /**
   * 将元素移动到视口中心
   * @param {Item} item 指定元素
   */
  public focusItem(item: Item | string): void {
    const viewController: ViewController = this.get('viewController');
    viewController.focus(item);

    this.autoPaint();
  }

  /**
   * 自动重绘
   * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
   */
  public autoPaint(): void {
    if (this.get('autoPaint')) {
      this.paint();
    }
  }

  /**
   * 仅画布重新绘制
   */
  public paint(): void {
    this.emit('beforepaint');
    this.get('canvas').draw();
    this.emit('afterpaint');
  }

  /**
   * 将屏幕坐标转换为视口坐标
   * @param {number} clientX 屏幕x坐标
   * @param {number} clientY 屏幕y坐标
   * @return {Point} 视口坐标
   */
  public getPointByClient(clientX: number, clientY: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getPointByClient(clientX, clientY);
  }

  /**
   * 将视口坐标转换为屏幕坐标
   * @param {number} x 视口x坐标
   * @param {number} y 视口y坐标
   * @return {Point} 视口坐标
   */
  public getClientByPoint(x: number, y: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getClientByPoint(x, y);
  }

  /**
   * 将画布坐标转换为视口坐标
   * @param {number} canvasX 画布 x 坐标
   * @param {number} canvasY 画布 y 坐标
   * @return {object} 视口坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getPointByCanvas(canvasX, canvasY);
  }

  /**
   * 将视口坐标转换为画布坐标
   * @param {number} x 视口 x 坐标
   * @param {number} y 视口 y 坐标
   * @return {object} 画布坐标
   */
  public getCanvasByPoint(x: number, y: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getCanvasByPoint(x, y);
  }

  /**
   * 显示元素
   * @param {Item} item 指定元素
   */
  public showItem(item: Item | string): void {
    const itemController: ItemController = this.get('itemController');
    itemController.changeItemVisibility(item, true);
  }

  /**
   * 隐藏元素
   * @param {Item} item 指定元素
   */
  public hideItem(item: Item | string): void {
    const itemController: ItemController = this.get('itemController');
    itemController.changeItemVisibility(item, false);
  }

  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   */
  public refreshItem(item: Item | string) {
    const itemController: ItemController = this.get('itemController');
    itemController.refreshItem(item);
  }

  /**
   * 设置是否在更新/刷新后自动重绘
   * @param {boolean} auto 自动重绘
   */
  public setAutoPaint(auto: boolean): void {
    const self = this;
    self.set('autoPaint', auto);
    const canvas: GCanvas = self.get('canvas');
    canvas.set('autoDraw', auto);
  }

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   */
  public remove(item: Item | string): void {
    this.removeItem(item);
  }

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   */
  public removeItem(item: Item | string): void {
    // 如果item是字符串，且查询的节点实例不存在，则认为是删除group
    let nodeItem = null;
    if (isString(item)) {
      nodeItem = this.findById(item);
    }

    if (!nodeItem && isString(item)) {
      const customGroupControll: CustomGroup = this.get('customGroupControll');
      customGroupControll.remove(item);
    } else {
      const itemController: ItemController = this.get('itemController');
      itemController.removeItem(item);
    }
  }

  /**
   * 新增元素 或 节点分组
   * @param {string} type 元素类型(node | edge | group)
   * @param {ModelConfig} model 元素数据模型
   * @return {Item} 元素实例
   */
  public addItem(type: ITEM_TYPE, model: ModelConfig) {
    if (type === 'group') {
      const { groupId, nodes, type: groupType, zIndex, title } = model;
      let groupTitle = title;

      if (isString(title)) {
        groupTitle = {
          text: title,
        };
      }

      return this.get('customGroupControll').create(
        groupId,
        nodes,
        groupType,
        zIndex,
        true,
        groupTitle,
      );
    }
    const itemController: ItemController = this.get('itemController');
    const item = itemController.addItem(type, model);
    this.autoPaint();
    return item;
  }

  public add(type: ITEM_TYPE, model: ModelConfig): Item {
    return this.addItem(type, model);
  }

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {Partial<NodeConfig> | EdgeConfig} cfg 需要更新的数据
   */
  public updateItem(item: Item | string, cfg: Partial<NodeConfig> | EdgeConfig): void {
    const itemController: ItemController = this.get('itemController');
    itemController.updateItem(item, cfg);
  }

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {Partial<NodeConfig> | EdgeConfig} cfg 需要更新的数据
   */
  public update(item: Item | string, cfg: Partial<NodeConfig> | EdgeConfig): void {
    this.updateItem(item, cfg);
  }

  /**
   * 设置元素状态
   * @param {Item} item 元素id或元素实例
   * @param {string} state 状态名称
   * @param {string | boolean} value 是否启用状态 或 状态值
   */
  public setItemState(item: Item | string, state: string, value: string | boolean): void {
    if (isString(item)) {
      item = this.findById(item);
    }

    const itemController: ItemController = this.get('itemController')
    itemController.setItemState(item, state, value);

    const stateController: StateController = this.get('stateController')

    if (isString(value)) {
      stateController.updateState(item, `${state}:${value}`, true);
    } else {
      stateController.updateState(item, state, value);
    }
  }

  /**
   * 设置视图初始化数据
   * @param {GraphData} data 初始化数据
   */
  public data(data?: GraphData | TreeGraphData): void {
    this.set('data', data);
  }

  /**
   * 根据data接口的数据渲染视图
   */
  public render(): void {
    const self = this;
    const data: GraphData = this.get('data');

    if (!data) {
      throw new Error('data must be defined first');
    }

    const { nodes = [], edges = [] } = data;

    this.clear();

    this.emit('beforerender');

    each(nodes, (node: NodeConfig) => {
      self.add('node', node);
    });

    each(edges, (edge: EdgeConfig) => {
      self.add('edge', edge);
    });

    if (!this.get('groupByTypes')) {
      // 为提升性能，选择数量少的进行操作
      if (data.nodes && data.edges && data.nodes.length < data.edges.length) {
        const nodesArr = this.getNodes();

        // 遍历节点实例，将所有节点提前。
        nodesArr.forEach(node => {
          node.toFront();
        });
      } else {
        const edgesArr = this.getEdges();

        // 遍历节点实例，将所有节点提前。
        edgesArr.forEach(edge => {
          edge.toBack();
        });
      }
    }

    // layout
    const animate = self.get('animate');
    self.set('animate', false);
    const layoutController = self.get('layoutController');
    if (!layoutController.layout(success)) {
      success();
    }

    function success() {
      self.set('animate', animate);
      if (self.get('fitView')) {
        self.fitView();
      }
      self.autoPaint();
      self.emit('afterrender');
    }

    // 防止传入的数据不存在nodes
    if (data.nodes) {
      // 获取所有有groupID的node
      const nodeInGroup = data.nodes.filter(node => node.groupId);

      // 所有node中存在groupID，则说明需要群组
      if (nodeInGroup.length > 0) {
        // 渲染群组
        const groupType = self.get('groupType');
        this.renderCustomGroup(data, groupType);
      }
    }
  }

  /**
   * 接收数据进行渲染
   * @Param {Object} data 初始化数据
   */
  public read(data: GraphData) {
    this.data(data);
    this.render();
  }

  // 比较item
  private diffItems(
    type: ITEM_TYPE,
    items: { nodes: INode[]; edges: IEdge[] },
    models: NodeConfig[] | EdgeConfig[],
  ) {
    const self = this;
    let item: INode;
    const itemMap: NodeMap = this.get('itemMap');

    each(models, model => {
      item = itemMap[model.id];
      if (item) {
        if (self.get('animate') && type === NODE) {
          let containerMatrix = item.getContainer().getMatrix();
          if (!containerMatrix) containerMatrix = mat3.create();
          item.set('originAttrs', {
            x: containerMatrix[6],
            y: containerMatrix[7],
          });
        }

        self.updateItem(item, model);
      } else {
        item = self.addItem(type, model);
      }
      (items as { [key: string]: any[] })[`${type}s`].push(item);
    });
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {object} data 源数据
   * @return {object} this
   */
  public changeData(data?: GraphData | TreeGraphData): Graph {
    const self = this;

    if (!data) {
      return this;
    }

    // 更改数据源后，取消所有状态
    this.getNodes().map(node => self.clearItemStates(node))
    this.getEdges().map(edge => self.clearItemStates(edge))

    const canvas = this.get('canvas');
    const localRefresh: boolean = canvas.get('localRefresh');
    canvas.set('localRefresh', false);

    if (!self.get('data')) {
      self.data(data);
      self.render();
    }

    const itemMap: NodeMap = this.get('itemMap');

    const items: {
      nodes: INode[];
      edges: IEdge[];
    } = {
      nodes: [],
      edges: [],
    };

    this.diffItems('node', items, (data as GraphData).nodes!);
    this.diffItems('edge', items, (data as GraphData).edges!);

    each(itemMap, (item: INode & IEdge, id: number) => {
      if (items.nodes.indexOf(item) < 0 && items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item);
      }
    });

    this.set({ nodes: items.nodes, edges: items.edges });

    const layoutController = this.get('layoutController');
    layoutController.changeData();


    if (self.get('animate') && !layoutController.getLayoutType()) {
      // 如果没有指定布局
      self.positionsAnimate();
    } else {
      self.autoPaint();
    }
    setTimeout(() => {
      canvas.set('localRefresh', localRefresh);
    }, 16);
    return this;
  }

  /**
   * 根据数据渲染群组
   * @param {GraphData} data 渲染图的数据
   * @param {string} groupType group类型
   */
  public renderCustomGroup(data: GraphData, groupType: string) {
    const { groups, nodes = [] } = data;

    // 第一种情况，，不存在groups，则不存在嵌套群组
    let groupIndex = 10;
    if (!groups) {
      // 存在单个群组
      // 获取所有有groupID的node
      const nodeInGroup = nodes.filter(node => node.groupId);
      const groupsArr: GroupConfig[] = [];
      // 根据groupID分组
      const groupIds = groupBy(nodeInGroup, 'groupId');
      // tslint:disable-next-line:forin
      Object.keys(groupIds).forEach(groupId => {
        const nodeIds = groupIds[groupId].map(node => node.id);
        this.get('customGroupControll').create(groupId, nodeIds, groupType, groupIndex);
        groupIndex--;
        // 获取所有不重复的 groupId
        if (!groupsArr.find(d => d.id === groupId)) {
          groupsArr.push({
            id: groupId,
          });
        }
      });

      this.set({
        groups: groupsArr,
      });
    } else {
      // 将groups的数据存到groups中
      this.set({ groups });

      // 第二种情况，存在嵌套的群组，数据中有groups字段
      const groupNodes = getAllNodeInGroups(data);
      // tslint:disable-next-line:forin
      Object.keys(groupNodes).forEach(groupId => {
        const tmpNodes = groupNodes[groupId];
        this.get('customGroupControll').create(groupId, tmpNodes, groupType, groupIndex);
        groupIndex--;
      });

      // 对所有Group排序
      const customGroup = this.get('customGroup');
      customGroup.sort();
    }
  }

  /**
   * 导出图数据
   * @return {object} data
   */
  public save(): TreeGraphData | GraphData {
    const nodes: NodeConfig[] = [];
    const edges: EdgeConfig[] = [];
    each(this.get('nodes'), (node: INode) => {
      nodes.push(node.getModel() as NodeConfig);
    });

    each(this.get('edges'), (edge: IEdge) => {
      edges.push(edge.getModel());
    });

    return { nodes, edges, groups: this.get('groups') };
  }

  /**
   * 改变画布大小
   * @param  {number} width  画布宽度
   * @param  {number} height 画布高度
   * @return {object} this
   */
  public changeSize(width: number, height: number): Graph {
    const viewController: ViewController = this.get('viewController');
    viewController.changeSize(width, height);
    return this;
  }

  /**
   * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
   */
  public refresh(): void {
    const self = this;

    self.emit('beforegraphrefresh');

    if (self.get('animate')) {
      self.positionsAnimate();
    } else {
      const nodes: INode[] = self.get('nodes');
      const edges: IEdge[] = self.get('edges');

      each(nodes, (node: INode) => {
        node.refresh();
      });

      each(edges, (edge: IEdge) => {
        edge.refresh();
      });
    }


    self.emit('aftergraphrefresh');
    self.autoPaint();
  }

  /**
   * 获取当前图中所有节点的item实例
   * @return {INode} item数组
   */
  public getNodes(): INode[] {
    return this.get('nodes');
  }

  /**
   * 获取当前图中所有边的item实例
   * @return {IEdge} item数组
   */
  public getEdges(): IEdge[] {
    return this.get('edges');
  }

  /**
   * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
   */
  public positionsAnimate(): void {
    const self = this;

    self.emit('beforeanimate');

    const animateCfg: GraphAnimateConfig = self.get('animateCfg');

    const { onFrame } = animateCfg;

    const nodes = self.getNodes();

    const toNodes = nodes.map(node => {
      const model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y,
      };
    });

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    const canvas: GCanvas = self.get('canvas');

    canvas.animate(
      (ratio: number) => {
        each(toNodes, data => {
          const node: Item = self.findById(data.id);

          if (!node || node.destroyed) {
            return;
          }

          let originAttrs: Point = node.get('originAttrs');

          const model: NodeConfig = node.get('model');

          if (!originAttrs) {
            let containerMatrix = node.getContainer().getMatrix();
            if (!containerMatrix) containerMatrix = mat3.create();
            originAttrs = {
              x: containerMatrix[6],
              y: containerMatrix[7],
            };
            node.set('originAttrs', originAttrs);
          }

          if (onFrame) {
            const attrs = onFrame(node, ratio, data, originAttrs);
            node.set('model', Object.assign(model, attrs));
          } else {
            model.x = originAttrs.x + (data.x - originAttrs.x) * ratio;
            model.y = originAttrs.y + (data.y - originAttrs.y) * ratio;
          }
        });

        self.refreshPositions();
      },
      {
        duration: animateCfg.duration,
        easing: animateCfg.easing,
        callback: () => {
          each(nodes, (node: INode) => {
            node.set('originAttrs', null);
          });

          if (animateCfg.callback) {
            animateCfg.callback();
          }

          self.emit('afteranimate');
          self.animating = false;
        },
      },
    );
  }

  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  public refreshPositions() {
    const self = this;
    self.emit('beforegraphrefreshposition');

    const nodes: INode[] = self.get('nodes');
    const edges: IEdge[] = self.get('edges');

    let model: NodeConfig;

    const updatedNodes: { [key: string]: boolean } = {};
    each(nodes, (node: INode) => {
      model = node.getModel() as NodeConfig;
      const originAttrs = node.get('originAttrs');
      if (originAttrs && model.x === originAttrs.x && model.y === originAttrs.y) {
        return;
      }
      node.updatePosition({ x: model.x!, y: model.y! });
      updatedNodes[model.id] = true;
    });

    each(edges, (edge: IEdge) => {
      const sourceModel = edge.getSource().getModel();
      const targetModel = edge.getTarget().getModel();
      if (updatedNodes[sourceModel.id as string] || updatedNodes[targetModel.id as string]) {
        edge.refresh();
      }
    });

    self.emit('aftergraphrefreshposition');
    self.autoPaint();
  }

  public stopAnimate(): void {
    this.get('canvas').stopAnimate();
  }

  public isAnimating(): boolean {
    return this.animating;
  }

  /**
   * 获取当前视口伸缩比例
   * @return {number} 比例
   */
  public getZoom(): number {
    const matrix = this.get('group').getMatrix();
    return matrix ? matrix[0] : 1;
  }

  /**
   * 获取当前的行为模式
   * @return {string} 当前行为模式
   */
  public getCurrentMode(): string {
    const modeController: ModeController = this.get('modeController');
    return modeController.getMode();
  }

  /**
   * 切换行为模式
   * @param {string} mode 指定模式
   * @return {object} this
   */
  public setMode(mode: string): Graph {
    const modeController: ModeController = this.get('modeController');
    modeController.setMode(mode);
    return this;
  }

  /**
   * 清除画布元素
   * @return {object} this
   */
  public clear(): Graph {
    const canvas = this.get('canvas');
    canvas.clear();

    this.initGroups();

    // 清空画布时同时清除数据
    this.set({ itemMap: {}, nodes: [], edges: [], groups: [] });
    return this;
  }

  /**
   * 返回图表的 dataUrl 用于生成图片
   * @return {string} 图片 dataURL
   */
  public toDataURL(type?: string, backgroundColor?: string): string {
    const canvas: GCanvas = this.get('canvas');
    const renderer = canvas.getRenderer();
    const canvasDom = canvas.get('el');

    if (!type) type = 'image/png';

    let dataURL = '';
    if (renderer === 'svg') {
      const clone = canvasDom.cloneNode(true);
      const svgDocType = document.implementation.createDocumentType(
        'svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
      );
      const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
      svgDoc.replaceChild(clone, svgDoc.documentElement);
      const svgData = (new XMLSerializer()).serializeToString(svgDoc);
      dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
    } else {
      let imageData;
      const context = canvasDom.getContext('2d');
      const width = this.get('width');
      const height = this.get('height');
      let compositeOperation;
      if (backgroundColor) {
        const pixelRatio = window.devicePixelRatio;
        imageData = context.getImageData(0, 0, width * pixelRatio, height * pixelRatio);
        compositeOperation = context.globalCompositeOperation;
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
      }
      dataURL = canvasDom.toDataURL(type);
      if (backgroundColor) {
        context.clearRect(0, 0, width, height);
        context.putImageData(imageData, 0, 0);
        context.globalCompositeOperation = compositeOperation;
      }
    }
    return dataURL;
  }

  /**
   * 导出包含全图的图片
   * @param {String} name 图片的名称
   */
  public downloadFullImage(name?: string, imageConfig?: { backgroundColor?: string, padding?: number | number[] }): void {
    const bbox = this.get('group').getCanvasBBox();
    const height = bbox.height;
    const width = bbox.width;
    const renderer = this.get('renderer');
    const vContainerDOM = createDom('<div id="test"></div>');

    let backgroundColor = imageConfig ? imageConfig.backgroundColor : undefined;
    let padding = imageConfig ? imageConfig.padding : undefined;
    if (!padding) padding = [0, 0, 0, 0];
    else if (isNumber(padding)) padding = [padding, padding, padding, padding];

    const vHeight = height + padding[0] + padding[2];
    const vWidth = width + padding[1] + padding[3];
    const canvasOptions = {
      container: vContainerDOM,
      height: vHeight,
      width: vWidth
    };
    const vCanvas = renderer === 'svg' ? new GSVGCanvas(canvasOptions) : new GCanvas(canvasOptions);

    const group = this.get('group');
    const vGroup = group.clone();

    let matrix = vGroup.getMatrix();
    if (!matrix) matrix = mat3.create();
    const centerX = (bbox.maxX + bbox.minX) / 2;
    const centerY = (bbox.maxY + bbox.minY) / 2;
    mat3.translate(matrix, matrix, [-centerX, -centerY]);
    mat3.translate(matrix, matrix, [width / 2 + padding[3], height / 2 + padding[0]]);

    vGroup.resetMatrix();
    vGroup.setMatrix(matrix);
    vCanvas.add(vGroup);

    const vCanvasEl = vCanvas.get('el');

    setTimeout(() => {
      const type = 'image/png';
      let dataURL = '';
      if (renderer === 'svg') {
        const clone = vCanvasEl.cloneNode(true);
        const svgDocType = document.implementation.createDocumentType(
          'svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
        );
        const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
        svgDoc.replaceChild(clone, svgDoc.documentElement);
        const svgData = (new XMLSerializer()).serializeToString(svgDoc);
        dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
      } else {
        let imageData;
        const context = vCanvasEl.getContext('2d');
        let compositeOperation;
        if (backgroundColor) {
          const pixelRatio = window.devicePixelRatio;
          imageData = context.getImageData(0, 0, vWidth * pixelRatio, vHeight * pixelRatio);
          compositeOperation = context.globalCompositeOperation;
          context.globalCompositeOperation = "destination-over";
          context.fillStyle = backgroundColor;
          context.fillRect(0, 0, vWidth, vHeight);
        }
        dataURL = vCanvasEl.toDataURL(type);
        if (backgroundColor) {
          context.clearRect(0, 0, vWidth, vHeight);
          context.putImageData(imageData, 0, 0);
          context.globalCompositeOperation = compositeOperation;
        }
      }

      const link: HTMLAnchorElement = document.createElement('a');
      const fileName: string = (name || 'graph') + (renderer === 'svg' ? '.svg' : '.png');

      this.dataURLToImage(dataURL, renderer, link, fileName);

      const e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    }, 16);
  }

  /**
   * 画布导出图片，图片仅包含画布可见区域部分内容
   * @param {String} name 图片的名称
   */
  public downloadImage(name?: string, backgroundColor?: string): void {
    const self = this;

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    const canvas = self.get('canvas');
    const renderer = canvas.getRenderer();
    const fileName: string = (name || 'graph') + (renderer === 'svg' ? '.svg' : '.png');
    const link: HTMLAnchorElement = document.createElement('a');
    setTimeout(() => {
      const dataURL = self.toDataURL('image/png', backgroundColor);
      this.dataURLToImage(dataURL, renderer, link, fileName);

      const e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    }, 16);
  }

  private dataURLToImage(dataURL: string, renderer: string, link, fileName) {
    if (typeof window !== 'undefined') {
      if (window.Blob && window.URL && renderer !== 'svg') {
        const arr = dataURL.split(',');
        let mime = '';
        if (arr && arr.length > 0) {
          const match = arr[0].match(/:(.*?);/);
          // eslint-disable-next-line prefer-destructuring
          if (match && match.length >= 2) mime = match[1];
        }

        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        const blobObj = new Blob([u8arr], { type: mime });

        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blobObj, fileName);
        } else {
          link.addEventListener('click', () => {
            link.download = fileName;
            link.href = window.URL.createObjectURL(blobObj);
          });
        }
      } else {
        link.addEventListener('click', function () {
          link.download = fileName;
          link.href = dataURL;
        });
      }
    }
  }
  /**
   * 更换布局配置项
   * @param {object} cfg 新布局配置项
   * 若 cfg 含有 type 字段或为 String 类型，且与现有布局方法不同，则更换布局
   * 若 cfg 不包括 type ，则保持原有布局方法，仅更新布局配置项
   */
  public updateLayout(cfg: any): void {
    const layoutController = this.get('layoutController');
    let newLayoutType;

    if (isString(cfg)) {
      newLayoutType = cfg;
      cfg = {
        type: newLayoutType,
      };
    } else {
      newLayoutType = cfg.type;
    }

    const oriLayoutCfg = this.get('layout');
    const oriLayoutType = oriLayoutCfg ? oriLayoutCfg.type : undefined;

    if (!newLayoutType || oriLayoutType === newLayoutType) {
      // no type or same type, update layout
      const layoutCfg: any = {};
      Object.assign(layoutCfg, oriLayoutCfg, cfg);
      layoutCfg.type = oriLayoutType || 'random';

      this.set('layout', layoutCfg);

      layoutController.updateLayoutCfg(layoutCfg);
    } else {
      // has different type, change layout
      this.set('layout', cfg);
      layoutController.changeLayout(newLayoutType);
    }
  }

  /**
   * 重新以当前示例中配置的属性进行一次布局
   */
  public layout(): void {
    const layoutController = this.get('layoutController');
    const layoutCfg = this.get('layout');

    if (layoutCfg.workerEnabled) {
      // 如果使用web worker布局
      layoutController.layout();
      return;
    }
    if (layoutController.layoutMethod) {
      layoutController.relayout();
    } else {
      layoutController.layout();
    }
  }

  /**
   * 收起分组
   * @param {string} groupId 分组ID
   */
  public collapseGroup(groupId: string): void {
    const customGroupControll: CustomGroup = this.get('customGroupControll');
    customGroupControll.collapseGroup(groupId);
  }

  /**
   * 展开分组
   * @param {string} groupId 分组ID
   */
  public expandGroup(groupId: string): void {
    const customGroupControll: CustomGroup = this.get('customGroupControll');
    customGroupControll.expandGroup(groupId);
  }

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  public addPlugin(plugin: PluginBase): void {
    const self = this;
    if (plugin.destroyed) {
      return;
    }
    self.get('plugins').push(plugin);
    plugin.initPlugin(self);
  }

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  public removePlugin(plugin: PluginBase): void {
    const plugins = this.get('plugins');
    const index = plugins.indexOf(plugin);
    if (index >= 0) {
      plugin.destroyPlugin();
      plugins.splice(index, 1);
    }
  }

  /**
   * 销毁画布
   */
  public destroy() {
    this.clear();

    each(this.get('plugins'), plugin => {
      plugin.destroyPlugin();
    });

    this.get('eventController').destroy();
    this.get('itemController').destroy();
    this.get('modeController').destroy();
    this.get('viewController').destroy();
    this.get('stateController').destroy();
    this.get('layoutController').destroy();
    this.get('customGroupControll').destroy();
    this.get('canvas').destroy();
    (this.cfg as any) = null;
    this.destroyed = true;
  }
}
