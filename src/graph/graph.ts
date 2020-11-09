import EventEmitter from '@antv/event-emitter';
import { IGroup } from '@antv/g-base/lib/interfaces';
import { BBox, Point } from '@antv/g-base/lib/types';
import GCanvas from '@antv/g-canvas/lib/canvas';
import GSVGCanvas from '@antv/g-svg/lib/canvas';
import { mat3 } from '@antv/matrix-util/lib';
import { clone, deepMix, each, isPlainObject, isString, isNumber, groupBy } from '@antv/util';
import { IGraph, DataUrlType } from '../interface/graph';
import { IEdge, INode, ICombo } from '../interface/item';
import {
  GraphAnimateConfig,
  GraphOptions,
  EdgeConfig,
  GraphData,
  Item,
  ITEM_TYPE,
  Matrix,
  ModelConfig,
  NodeConfig,
  NodeMap,
  Padding,
  TreeGraphData,
  ComboConfig,
  ModeOption,
  ModeType,
  States,
  ComboTree,
  HullCfg,
  WaterMarkerConfig,
} from '../types';
import { move } from '../util/math';
import Global from '../global';
import {
  EventController,
  ItemController,
  LayoutController,
  ModeController,
  StateController,
  ViewController,
} from './controller';
import PluginBase from '../plugins/base';
import createDom from '@antv/dom-util/lib/create-dom';
import { plainCombosToTrees, traverseTree, reconstructTree, traverseTreeUp } from '../util/graphic';
import degree from '../algorithm/degree';
import Stack from '../algorithm/structs/stack';
import adjMatrix from '../algorithm/adjacent-matrix';
import floydWarshall from '../algorithm/floydWarshall';

import Hull from '../item/hull';

const NODE = 'node';
const SVG = 'svg';

interface IGroupBBox {
  [key: string]: BBox;
}

export interface PrivateGraphOption extends GraphOptions {
  data: GraphData;

  // capture event
  event: boolean;

  nodes: NodeConfig[];

  edges: EdgeConfig[];

  vedges: EdgeConfig[];

  combos: ComboConfig[];

  itemMap: NodeMap;

  callback: () => void;

  /**
   * 格式：
   * {
   *  hover: [Node, Node],
   *  selected: [Node]
   * }
   */
  states: States;
}

export default class Graph extends EventEmitter implements IGraph {
  private animating: boolean;

  private cfg: GraphOptions & { [key: string]: any };

  public destroyed: boolean;

  // undo 栈
  private undoStack: Stack;

  // redo 栈
  private redoStack: Stack;

  constructor(cfg: GraphOptions) {
    super();
    this.cfg = deepMix(this.getDefaultCfg(), cfg);
    this.init();
    this.animating = false;
    this.destroyed = false;

    // 启用 stack 后，实例化 undoStack 和 redoStack
    if (this.cfg.enabledStack) {
      // 实例化 undo 和 redo 栈
      this.undoStack = new Stack(this.cfg.maxStep);
      this.redoStack = new Stack(this.cfg.maxStep);
    }
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

    this.set({
      eventController,
      viewController,
      modeController,
      itemController,
      layoutController,
      stateController,
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
        height,
      });
    } else {
      const canvasCfg: any = {
        container,
        width,
        height,
      };
      const pixelRatio = this.get('pixelRatio');
      if (pixelRatio) {
        canvasCfg.pixelRatio = pixelRatio;
      }
      canvas = new GCanvas(canvasCfg);
    }

    this.set('canvas', canvas);

    this.initGroups();
  }

  private initPlugin(): void {
    const self = this;
    each(self.get('plugins'), (plugin) => {
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

      const comboGroup: IGroup = group.addGroup({
        id: `${id}-combo`,
        className: Global.comboContainerClassName,
      });

      // 用于存储自定义的群组
      comboGroup.toBack();

      this.set({ nodeGroup, edgeGroup, comboGroup });
    }
    const delegateGroup: IGroup = group.addGroup({
      id: `${id}-delegate`,
      className: Global.delegateContainerClassName,
    });
    this.set({ delegateGroup });
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
       * store all the combo instances
       */
      combos: [],
      /**
       * store all the edge instances which are virtual edges related to collapsed combo
       */
      vedges: [],
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

      // 默认不启用 undo & redo 功能
      enabledStack: false,

      // 只有当 enabledStack 为 true 时才起作用
      maxStep: 10,

      // 存储图上的 tooltip dom，方便销毁
      tooltips: [],
    };
  }

  /**
   * 将值设置到 this.cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */
  public set<T = any>(key: string | object, val?: T): Graph {
    if (isPlainObject(key)) {
      this.cfg = { ...this.cfg, ...key };
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
   * 获取 graph 的根图形分组
   * @return 根 group
   */
  public getGroup(): IGroup {
    return this.get('group');
  }

  /**
   * 获取 graph 的 DOM 容器
   * @return DOM 容器
   */
  public getContainer(): HTMLElement {
    return this.get('container');
  }

  /**
   * 获取 graph 的最小缩放比例
   * @return minZoom
   */
  public getMinZoom(): number {
    return this.get('minZoom');
  }

  /**
   * 设置 graph 的最小缩放比例
   * @return minZoom
   */
  public setMinZoom(ratio: number) {
    return this.set('minZoom', ratio);
  }

  /**
   * 获取 graph 的最大缩放比例
   * @param maxZoom
   */
  public getMaxZoom(): number {
    return this.get('maxZoom');
  }

  /**
   * 设置 graph 的最大缩放比例
   * @param maxZoom
   */
  public setMaxZoom(ratio: number) {
    return this.set('maxZoom', ratio);
  }

  /**
   * 获取 graph 的宽度
   * @return width
   */
  public getWidth(): number {
    return this.get('width');
  }

  /**
   * 获取 graph 的高度
   * @return width
   */
  public getHeight(): number {
    return this.get('height');
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

    if (!states) {
      states = item.get<string[]>('states');
    }

    itemController.clearItemStates(item, states);


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
   * 设置各个 combo 的配置
   * @param comboFn
   */
  public combo(comboFn: (config: ComboConfig) => Partial<ComboConfig>): void {
    if (typeof comboFn === 'function') {
      this.set('comboMapper', comboFn);
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
    return this.findAll(type, (item) => item.hasState(state));
  }

  /**
   * 平移画布
   * @param dx 水平方向位移
   * @param dy 垂直方向位移
   */
  public translate(dx: number, dy: number): void {
    const group: IGroup = this.get('group');

    let matrix: Matrix = clone(group.getMatrix());
    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
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
    const group: IGroup = this.get('group');
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
   * 调整视口适应视图，不缩放，仅将图 bbox 中心对齐到画布中心
   */
  public fitCenter(): void {
    const viewController: ViewController = this.get('viewController');
    viewController.fitCenter();
    this.autoPaint();
  }

  /**
   * 新增行为
   * @param {string | ModeOption | ModeType[]} behaviors 添加的行为
   * @param {string | string[]} modes 添加到对应的模式
   * @return {Graph} Graph
   */
  public addBehaviors(
    behaviors: string | ModeOption | ModeType[],
    modes: string | string[],
  ): Graph {
    const modeController: ModeController = this.get('modeController');
    modeController.manipulateBehaviors(behaviors, modes, true);
    return this;
  }

  /**
   * 移除行为
   * @param {string | ModeOption | ModeType[]} behaviors 移除的行为
   * @param {string | string[]} modes 从指定的模式中移除
   * @return {Graph} Graph
   */
  public removeBehaviors(
    behaviors: string | ModeOption | ModeType[],
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
    const group: IGroup = this.get('group');
    let matrix: Matrix = clone(group.getMatrix());
    const minZoom: number = this.get('minZoom');
    const maxZoom: number = this.get('maxZoom');

    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
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
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  public focusItem(item: Item | string, animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    const viewController: ViewController = this.get('viewController');
    let isAnimate = false;
    if (animate) isAnimate = true;
    else if (animate === undefined) isAnimate = this.get('animate');
    let curAniamteCfg = {} as GraphAnimateConfig;
    if (animateCfg) curAniamteCfg = animateCfg;
    else if (animateCfg === undefined) curAniamteCfg = this.get('animateCfg');

    viewController.focus(item, isAnimate, curAniamteCfg);

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
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  public showItem(item: Item | string, stack: boolean = true): void {
    const itemController: ItemController = this.get('itemController');
    const object = itemController.changeItemVisibility(item, true);
    if (stack && this.get('enabledStack')) {
      const id = object.getID();
      const type = object.getType();
      const before: GraphData = {};
      const after: GraphData = {};
      switch (type) {
        case 'node':
          before.nodes = [{ id, visible: false }];
          after.nodes = [{ id, visible: true }];
          break;
        case 'edge':
          before.nodes = [{ id, visible: false }];
          after.edges = [{ id, visible: true }];
          break;
        case 'combo':
          before.nodes = [{ id, visible: false }];
          after.combos = [{ id, visible: true }];
          break;
        default:
          break;
      }
      this.pushStack('visible', { before, after });
    }
  }

  /**
   * 隐藏元素
   * @param {Item} item 指定元素
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  public hideItem(item: Item | string, stack: boolean = true): void {
    const itemController: ItemController = this.get('itemController');
    const object = itemController.changeItemVisibility(item, false);
    if (stack && this.get('enabledStack')) {
      const id = object.getID();
      const type = object.getType();
      const before: GraphData = {};
      const after: GraphData = {};
      switch (type) {
        case 'node':
          before.nodes = [{ id, visible: true }];
          after.nodes = [{ id, visible: false }];
          break;
        case 'edge':
          before.nodes = [{ id, visible: true }];
          after.edges = [{ id, visible: false }];
          break;
        case 'combo':
          before.nodes = [{ id, visible: true }];
          after.combos = [{ id, visible: false }];
          break;
        default:
          break;
      }
      this.pushStack('visible', { before, after });
    }
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
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  public remove(item: Item | string, stack: boolean = true): void {
    this.removeItem(item, stack);
  }

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  public removeItem(item: Item | string, stack: boolean = true): void {
    let nodeItem = item;
    if (isString(item)) nodeItem = this.findById(item);

    if (!nodeItem && isString(item)) {
      console.warn('The item to be removed does not exist!');
    } else if (nodeItem) {
      let type = '';
      if ((nodeItem as Item).getType) type = (nodeItem as Item).getType();

      // 将删除的元素入栈
      if (stack && this.get('enabledStack')) {
        const deletedModel = {
          ...(nodeItem as Item).getModel(),
          itemType: type,
        }
        const before: GraphData = {};
        switch (type) {
          case 'node': {
            before.nodes = [deletedModel as NodeConfig];
            before.edges = [];
            const edges = (nodeItem as INode).getEdges();
            for (let i = edges.length - 1; i >= 0; i--) {
              before.edges.push({
                ...edges[i].getModel(),
                itemType: 'edge'
              });
            }
            break;
          }
          case 'edge':
            before.edges = [deletedModel as EdgeConfig];
            break;
          case 'combo':
            before.combos = [deletedModel as ComboConfig];
            break;
          default:
            break;
        }
        this.pushStack('delete', {
          before, after: {}
        });
      }

      const itemController: ItemController = this.get('itemController');
      itemController.removeItem(item);
      if (type === 'combo') {
        const newComboTrees = reconstructTree(this.get('comboTrees'));
        this.set('comboTrees', newComboTrees);
      }
    }
  }

  /**
   * 新增元素
   * @param {ITEM_TYPE} type 元素类型(node | edge)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @param {boolean} sortCombo 本次操作是否需要更新 combo 层级顺序，内部参数，用户在外部使用 addItem 时始终时需要更新
   * @return {Item} 元素实例
   */
  public addItem(type: ITEM_TYPE, model: ModelConfig, stack: boolean = true, sortCombo: boolean = true) {
    const currentComboSorted = this.get('comboSorted');
    this.set('comboSorted', currentComboSorted && !sortCombo);
    const itemController: ItemController = this.get('itemController');

    if (model.id && this.findById(model.id as string)) {
      console.warn(`This item exists already. Be sure the id %c${model.id}%c is unique.`, 'font-size: 20px; color: red;', '');
      return;
    }

    let item;
    let comboTrees = this.get('comboTrees');
    if (!comboTrees) comboTrees = [];
    if (type === 'combo') {
      const itemMap = this.get('itemMap');
      let foundParent = false;
      comboTrees.forEach((ctree: ComboTree) => {
        if (foundParent) return; // terminate the forEach after the tree containing the item is done
        traverseTreeUp<ComboTree>(ctree, (child) => {
          // find the parent
          if (model.parentId === child.id) {
            foundParent = true;
            const newCombo: ComboTree = {
              id: model.id as string,
              depth: child.depth + 2,
              ...model,
            };
            if (child.children) child.children.push(newCombo);
            else child.children = [newCombo];
            model.depth = newCombo.depth;
            item = itemController.addItem(type, model) as ICombo;
          }
          const childItem = itemMap[child.id];
          // after the parent is found, update all the ancestors
          if (foundParent && childItem && childItem.getType && childItem.getType() === 'combo') {
            itemController.updateCombo(childItem, child.children);
          }
          return true;
        });
      });
      // if the parent is not found, add it to the root
      if (!foundParent) {
        const newCombo: ComboTree = {
          id: model.id as string,
          depth: 0,
          ...model,
        };
        model.depth = newCombo.depth;
        comboTrees.push(newCombo);
        item = itemController.addItem(type, model) as ICombo;
      }
      this.set('comboTrees', comboTrees);
    } else if (type === 'node' && isString(model.comboId) && comboTrees) {
      const parentCombo = this.findById(model.comboId as string);
      if (parentCombo && parentCombo.getType && parentCombo.getType() !== 'combo') {
        console.warn(
          `'${model.comboId}' is a not id of a combo in the graph, the node will be added without combo.`,
        );
        return;
      }
      item = itemController.addItem(type, model);

      const itemMap = this.get('itemMap');
      let foundParent = false,
        foundNode = false;
      (comboTrees || []).forEach((ctree: ComboTree) => {
        if (foundNode || foundParent) return; // terminate the forEach
        traverseTreeUp<ComboTree>(ctree, (child) => {
          if (child.id === model.id) {
            // if the item exists in the tree already, terminate
            foundNode = true;
            return false;
          }
          if (model.comboId === child.id && !foundNode) {
            // found the parent, add the item to the children of its parent in the tree
            foundParent = true;
            const cloneNode = clone(model);
            cloneNode.itemType = 'node';
            if (child.children) child.children.push(cloneNode as any);
            else child.children = [cloneNode as any];
            model.depth = child.depth + 1;
          }
          // update the size of all the ancestors
          if (foundParent && itemMap[child.id].getType && itemMap[child.id].getType() === 'combo') {
            itemController.updateCombo(itemMap[child.id], child.children);
          }
          return true;
        });
      });
    } else {
      item = itemController.addItem(type, model);
    }

    if ((type === 'node' && model.comboId) || (type === 'combo' && model.parentId)) {
      // add the combo to the parent's children array
      const parentCombo = this.findById(
        (model.comboId as string) || (model.parentId as string),
      ) as ICombo;
      if (parentCombo) parentCombo.addChild(item);
    }

    const combos = this.get('combos');
    if (combos && combos.length > 0) {
      this.sortCombos();
    }
    this.autoPaint();

    if (stack && this.get('enabledStack')) {
      const addedModel = {
        ...item.getModel(),
        itemType: type
      }
      const after: GraphData = {};
      switch (type) {
        case 'node':
          after.nodes = [addedModel];
          break;
        case 'edge':
          after.edges = [addedModel];
          break;
        case 'combo':
          after.combos = [addedModel];
          break;
        default:
          break;
      }
      this.pushStack('add', {
        before: {}, after
      });
    }

    return item;
  }

  /**
   * 新增元素
   * @param {ITEM_TYPE} type 元素类型(node | edge)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @return {Item} 元素实例
   */
  public add(type: ITEM_TYPE, model: ModelConfig, stack: boolean = true, sortCombo: boolean = true): Item {
    return this.addItem(type, model, stack, sortCombo);
  }

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {Partial<NodeConfig> | EdgeConfig} cfg 需要更新的数据
   */
  public updateItem(
    item: Item | string,
    cfg: Partial<NodeConfig> | EdgeConfig,
    stack: boolean = true,
  ): void {
    const itemController: ItemController = this.get('itemController');
    let currentItem;
    if (isString(item)) {
      currentItem = this.findById(item);
    } else {
      currentItem = item;
    }

    const UnupdateModel = clone(currentItem.getModel());

    let type = '';
    if (currentItem.getType) type = currentItem.getType();
    const states = [...currentItem.getStates()];
    if (type === 'combo') {
      each(states, (state) => this.setItemState(currentItem, state, false));
    }
    itemController.updateItem(currentItem, cfg);

    if (type === 'combo') {
      each(states, (state) => this.setItemState(currentItem, state, true));
    }

    if (stack && this.get('enabledStack')) {
      const before = { nodes: [], edges: [], combos: [] };
      const after = { nodes: [], edges: [], combos: [] };
      const afterModel = {
        id: UnupdateModel.id,
        ...cfg
      };
      switch (type) {
        case 'node':
          before.nodes.push(UnupdateModel);
          after.nodes.push(afterModel);
          break;
        case 'edge':
          before.edges.push(UnupdateModel);
          after.edges.push(afterModel);
          break;
        case 'combo':
          before.combos.push(UnupdateModel);
          after.combos.push(afterModel);
          break;
        default:
          break;
      }
      if (type === 'node') {
        before.nodes.push(UnupdateModel);
      }
      this.pushStack('update', { before, after });
    }
  }

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {Partial<NodeConfig> | EdgeConfig} cfg 需要更新的数据
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  public update(
    item: Item | string,
    cfg: Partial<NodeConfig> | EdgeConfig,
    stack: boolean = true,
  ): void {
    this.updateItem(item, cfg, stack);
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

    const itemController: ItemController = this.get('itemController');
    itemController.setItemState(item, state, value);

    const stateController: StateController = this.get('stateController');

    if (isString(value)) {
      stateController.updateState(item, `${state}:${value}`, true);
    } else {
      stateController.updateState(item, state, value);
    }
  }

  /**
   * 将指定状态的优先级提升为最高优先级
   * @param {Item} item 元素id或元素实例
   * @param state 状态名称
   */
  public priorityState(item: Item | string, state: string): void {
    const itemController: ItemController = this.get('itemController');
    itemController.priorityState(item, state);
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
    this.set('comboSorted', false);
    const data: GraphData = this.get('data');

    if (this.get('enabledStack')) {
      // render 之前清空 redo 和 undo 栈
      this.clearStack();
    }

    if (!data) {
      throw new Error('data must be defined first');
    }

    const { nodes = [], edges = [], combos = [] } = data;

    this.clear();

    this.emit('beforerender');

    each(nodes, (node: NodeConfig) => {
      self.add('node', node, false, false);
    });

    // process the data to tree structure
    if (combos && combos.length !== 0) {
      const comboTrees = plainCombosToTrees(combos, nodes);
      this.set('comboTrees', comboTrees);
      // add combos
      self.addCombos(combos);
    }

    each(edges, (edge: EdgeConfig) => {
      self.add('edge', edge, false, false);
    });

    const animate = self.get('animate');
    if (self.get('fitView') || self.get('fitCenter')) {
      self.set('animate', false);
    }

    // layout
    const layoutController = self.get('layoutController');
    if (!layoutController.layout(success)) {
      success();
    }
    function success() {
      if (self.get('fitView')) {
        self.fitView();
      } else if (self.get('fitCenter')) {
        self.fitCenter();
      }
      self.autoPaint();
      self.emit('afterrender');

      if (self.get('fitView') || self.get('fitCenter')) {
        self.set('animate', animate);
      }
    }

    if (!this.get('groupByTypes')) {
      if (combos && combos.length !== 0) {
        this.sortCombos();
      } else {
        // 为提升性能，选择数量少的进行操作
        if (data.nodes && data.edges && data.nodes.length < data.edges.length) {
          const nodesArr = this.getNodes();

          // 遍历节点实例，将所有节点提前。
          nodesArr.forEach((node) => {
            node.toFront();
          });
        } else {
          const edgesArr = this.getEdges();

          // 遍历节点实例，将所有节点提前。
          edgesArr.forEach((edge) => {
            edge.toBack();
          });
        }
      }
    }

    if (this.get('enabledStack')) {
      this.pushStack('render');
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

    each(models, (model) => {
      item = itemMap[model.id];
      if (item) {
        if (self.get('animate') && type === NODE) {
          let containerMatrix = item.getContainer().getMatrix();
          if (!containerMatrix) containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          item.set('originAttrs', {
            x: containerMatrix[6],
            y: containerMatrix[7],
          });
        }

        self.updateItem(item, model, false);
      } else {
        item = self.addItem(type, model, false);
      }
      (items as { [key: string]: any[] })[`${type}s`].push(item);
    });
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {GraphData | TreeGraphData} data 源数据
   * @param {boolean} 是否入栈，默认为true
   * @return {object} this
   */
  public changeData(data?: GraphData | TreeGraphData, stack: boolean = true): Graph {
    const self = this;
    if (!data) {
      return this;
    }
    if (stack && this.get('enabledStack')) {
      this.pushStack('changedata', {
        before: self.save(),
        after: data
      });
    }
    this.set('comboSorted', false);

    // 更改数据源后，取消所有状态
    this.getNodes().map((node) => self.clearItemStates(node));
    this.getEdges().map((edge) => self.clearItemStates(edge));

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

    const combosData = (data as GraphData).combos;
    if (combosData) {
      const comboTrees = plainCombosToTrees(combosData, (data as GraphData).nodes);
      this.set('comboTrees', comboTrees);
    }

    this.diffItems('node', items, (data as GraphData).nodes!);

    each(itemMap, (item: INode & IEdge & ICombo, id: number) => {
      itemMap[id].getModel().depth = 0;
      if (item.getType && item.getType() === 'edge') return;
      if (item.getType && item.getType() === 'combo') {
        delete itemMap[id];
        item.destroy();
      } else if (items.nodes.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item, false);
      }
    });

    // clear the destroyed combos here to avoid removing sub nodes before removing the parent combo
    const comboItems = this.getCombos();
    const combosLength = comboItems.length;
    for (let i = combosLength - 1; i >= 0; i--) {
      if (comboItems[i].destroyed) {
        comboItems.splice(i, 1);
      }
    }

    // process the data to tree structure
    if (combosData) {
      // add combos
      self.addCombos(combosData);
      if (!this.get('groupByTypes')) {
        this.sortCombos();
      }
    }

    this.diffItems('edge', items, (data as GraphData).edges!);
    each(itemMap, (item: INode & IEdge & ICombo, id: number) => {
      if (item.getType && (item.getType() === 'node' || item.getType() === 'combo')) return;
      if (items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item, false);
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
   * 私有方法，在 render 和 changeData 的时候批量添加数据中所有平铺的 combos
   * @param {ComboConfig[]} combos 平铺的 combos 数据
   */
  private addCombos(combos: ComboConfig[]) {
    const self = this;
    const comboTrees = self.get('comboTrees');
    const itemController: ItemController = this.get('itemController');
    itemController.addCombos(comboTrees, combos);
  }

  /**
   * 根据已经存在的节点或 combo 创建新的 combo
   * @param combo combo ID 或 Combo 配置
   * @param children 添加到 Combo 中的元素，包括节点和 combo
   */
  public createCombo(combo: string | ComboConfig, children: string[]): void {
    this.set('comboSorted', false);
    // step 1: 创建新的 Combo
    let comboId = '';
    let comboConfig: ComboConfig;
    if (!combo) return;
    if (isString(combo)) {
      comboId = combo;
      comboConfig = {
        id: combo,
      };
    } else {
      comboId = combo.id;
      if (!comboId) {
        console.warn('Create combo failed. Please assign a unique string id for the adding combo.');
        return;
      }
      comboConfig = combo;
    }

    const trees: ComboTree[] = children.map((elementId) => {
      const item = this.findById(elementId);

      let type = '';
      if (item.getType) type = item.getType();
      const cItem: ComboTree = {
        id: item.getID(),
        itemType: type as 'node' | 'combo',
      };

      if (type === 'combo') {
        (cItem as ComboConfig).parentId = comboId;
      } else if (type === 'node') {
        (cItem as NodeConfig).comboId = comboId;
      }

      return cItem;
    });

    comboConfig.children = trees;

    // step 2: 添加 Combo，addItem 时会将子将元素添加到 Combo 中
    this.addItem('combo', comboConfig, false);
    this.set('comboSorted', false);

    // step3: 更新 comboTrees 结构
    const comboTrees = this.get('comboTrees');
    (comboTrees || []).forEach((ctree) => {
      traverseTreeUp<ComboTree>(ctree, (child) => {
        if (child.id === comboId) {
          child.itemType = 'combo';
          child.children = trees as ComboTree[];
          return false;
        }
        return true;
      });
    });
    if (comboTrees) {
      this.sortCombos();
    }
  }

  /**
   * 解散 combo
   * @param {String | INode | ICombo} combo 需要被解散的 Combo item 或 id
   */
  public uncombo(combo: string | ICombo) {
    const self = this;
    let comboItem: ICombo = combo as ICombo;
    if (isString(combo)) {
      comboItem = this.findById(combo) as ICombo;
    }

    if (!comboItem || (comboItem.getType && comboItem.getType() !== 'combo')) {
      console.warn('The item is not a combo!');
      return;
    }

    const parentId = comboItem.getModel().parentId;
    let comboTrees = self.get('comboTrees');
    if (!comboTrees) comboTrees = [];
    const itemMap = this.get('itemMap');
    const comboId = comboItem.get('id');
    let treeToBeUncombo;
    let brothers = [];
    const comboItems = this.get('combos');
    const parentItem = this.findById(parentId as string) as ICombo;

    comboTrees.forEach((ctree) => {
      if (treeToBeUncombo) return; // terminate the forEach
      traverseTreeUp<ComboTree>(ctree, (subtree) => {
        // find the combo to be uncomboed, delete the combo from map and cache
        if (subtree.id === comboId) {
          treeToBeUncombo = subtree;
          // delete the related edges
          const edges = comboItem.getEdges();
          edges.forEach((edge) => {
            this.removeItem(edge, false);
          });
          const index = comboItems.indexOf(combo);
          comboItems.splice(index, 1);
          delete itemMap[comboId];
          comboItem.destroy();
        }
        // find the parent to remove the combo from the combo's brothers array and add the combo's children to the combo's brothers array in the tree
        if (parentId && treeToBeUncombo && subtree.id === parentId) {
          parentItem.removeCombo(comboItem);
          brothers = subtree.children; // the combo's brothers
          // remove the combo from its brothers array
          const index = brothers.indexOf(treeToBeUncombo);
          if (index !== -1) {
            brothers.splice(index, 1);
          }

          // append the combo's children to the combo's brothers array
          treeToBeUncombo.children?.forEach((child) => {
            const item = this.findById(child.id) as ICombo | INode;
            const childModel = item.getModel();
            if (item.getType && item.getType() === 'combo') {
              child.parentId = parentId;
              delete child.comboId;
              childModel.parentId = parentId; // update the parentId of the model
              delete childModel.comboId;
            } else if (item.getType && item.getType() === 'node') {
              child.comboId = parentId;
              childModel.comboId = parentId; // update the parentId of the model
            }
            parentItem.addChild(item);
            brothers.push(child);
          });
          return false;
        }
        return true;
      });
    });

    // if the parentId is not found, remove the combo from the roots
    if (!parentId && treeToBeUncombo) {
      const index = comboTrees.indexOf(treeToBeUncombo);
      comboTrees.splice(index, 1);
      // modify the parentId of the children
      treeToBeUncombo.children?.forEach((child) => {
        child.parentId = undefined;
        const childModel = this.findById(child.id).getModel();
        childModel.parentId = undefined; // update the parentId of the model
        if (child.itemType !== 'node') comboTrees.push(child);
      });
    }
  }

  /**
   * 根据节点的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围
   */
  public updateCombos() {
    const self = this;
    const comboTrees = this.get('comboTrees');
    const itemController: ItemController = self.get('itemController');

    const itemMap = self.get('itemMap');
    (comboTrees || []).forEach((ctree: ComboTree) => {
      traverseTreeUp<ComboTree>(ctree, (child) => {
        if (!child) {
          return true;
        }
        const childItem = itemMap[child.id];
        if (childItem && childItem.getType && childItem.getType() === 'combo') {
          // 更新具体的 Combo 之前先清除所有的已有状态，以免将 state 中的样式更新为 Combo 的样式
          const states = [...childItem.getStates()];
          each(states, (state) => this.setItemState(childItem, state, false));

          // 更新具体的 Combo
          itemController.updateCombo(childItem, child.children);

          // 更新 Combo 后，还原已有的状态
          each(states, (state) => this.setItemState(childItem, state, true));
        }
        return true;
      });
    });
    self.sortCombos();
  }

  /**
   * 根据节点的 bbox 更新 combo 及其祖先 combos 的绘制，包括 combos 的位置和范围
   * @param {String | ICombo} combo 需要被更新的 Combo 或 id，若指定，则该 Combo 及所有祖先 Combod 都会被更新
   */
  public updateCombo(combo: string | ICombo) {
    const self = this;

    let comboItem: ICombo = combo as ICombo;
    let comboId;
    if (isString(combo)) {
      comboItem = this.findById(combo) as ICombo;
    }
    if (!comboItem || (comboItem.getType && comboItem.getType() !== 'combo')) {
      console.warn('The item to be updated is not a combo!');
      return;
    }
    comboId = comboItem.get('id');

    const comboTrees = this.get('comboTrees');
    const itemController: ItemController = self.get('itemController');

    const itemMap = self.get('itemMap');
    (comboTrees || []).forEach((ctree: ComboTree) => {
      traverseTreeUp<ComboTree>(ctree, (child) => {
        if (!child) {
          return true;
        }
        const childItem = itemMap[child.id];
        if (
          comboId === child.id &&
          childItem &&
          childItem.getType &&
          childItem.getType() === 'combo'
        ) {
          // 更新具体的 Combo 之前先清除所有的已有状态，以免将 state 中的样式更新为 Combo 的样式
          const states = [...childItem.getStates()];
          // || !item.getStateStyle(stateName)
          each(states, (state) => {
            if (childItem.getStateStyle(state)) {
              this.setItemState(childItem, state, false);
            }
          });

          // 更新具体的 Combo
          itemController.updateCombo(childItem, child.children);

          // 更新 Combo 后，还原已有的状态
          each(states, (state) => {
            if (childItem.getStateStyle(state)) {
              this.setItemState(childItem, state, true);
            }
          });

          if (comboId) comboId = child.parentId;
        }
        return true;
      });
    });
  }

  /**
   * 更新树结构，例如移动子树等
   * @param {String | INode | ICombo} item 需要被更新的 Combo 或 节点 id
   * @param {string | undefined} parentId 新的父 combo id，undefined 代表没有父 combo
   */
  public updateComboTree(item: string | INode | ICombo, parentId?: string | undefined) {
    const self = this;
    this.set('comboSorted', false);
    let uItem: INode | ICombo;
    if (isString(item)) {
      uItem = self.findById(item) as INode | ICombo;
    } else {
      uItem = item as INode | ICombo;
    }

    const model = uItem.getModel();
    const oldParentId = (model.comboId as string) || (model.parentId as string);

    // 若 item 是 Combo，且 parentId 是其子孙 combo 的 id，则警告并终止
    if (parentId && uItem.getType && uItem.getType() === 'combo') {
      const comboTrees = this.get('comboTrees');
      let valid = true;
      let itemSubTree;
      (comboTrees || []).forEach((ctree) => {
        if (itemSubTree) return;
        traverseTree(ctree, (subTree) => {
          if (itemSubTree) return;
          // 找到从 item 开始的子树
          if (subTree.id === uItem.getID()) {
            itemSubTree = subTree;
          }
          return true;
        });
      });
      // 在以 item 为根的子树中寻找与 parentId 相同的后继元素
      traverseTree(itemSubTree, subTree => {
        if (subTree.id === parentId) {
          valid = false;
          return false;
        }
        return true;
      })
      // parentId 是 item 的一个后继元素，不能进行更新
      if (!valid) {
        console.warn('Failed to update the combo tree! The parentId points to a descendant of the combo!');
        return;
      }
    }

    // 当 combo 存在parentId 或 comboId 时，才将其移除
    if (model.parentId || model.comboId) {
      const combo = this.findById((model.parentId || model.comboId) as string) as ICombo;
      if (combo) {
        combo.removeChild(uItem);
      }
    }

    let type = '';
    if (uItem.getType) type = uItem.getType();

    if (type === 'combo') {
      model.parentId = parentId;
    } else if (type === 'node') {
      model.comboId = parentId;
    }

    // 只有当移入到指定 combo 时才添加
    if (parentId) {
      const parentCombo = this.findById(parentId) as ICombo;
      if (parentCombo) {
        // 将元素添加到 parentCombo 中
        parentCombo.addChild(uItem as ICombo | INode);
      }
    }
    // 如果原先有父亲 combo，则从原父 combo 的子元素数组中删除
    if (oldParentId) {
      const parentCombo = this.findById(oldParentId) as ICombo;
      if (parentCombo) {
        // 将元素从 parentCombo 中移除
        parentCombo.removeChild(uItem as ICombo | INode);
      }
    }

    const newComboTrees = reconstructTree(this.get('comboTrees'), model.id, parentId);
    this.set('comboTrees', newComboTrees);

    this.updateCombos();
  }

  /**
   * 导出图数据
   * @return {object} data
   */
  public save(): TreeGraphData | GraphData {
    const nodes: NodeConfig[] = [];
    const edges: EdgeConfig[] = [];
    const combos: ComboConfig[] = [];
    each(this.get('nodes'), (node: INode) => {
      nodes.push(node.getModel() as NodeConfig);
    });

    each(this.get('edges'), (edge: IEdge) => {
      edges.push(edge.getModel() as EdgeConfig);
    });

    each(this.get('combos'), (combo: ICombo) => {
      combos.push(combo.getModel() as ComboConfig);
    });

    return { nodes, edges, combos };
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
      const vedges: IEdge[] = self.get('edges');

      each(nodes, (node: INode) => {
        node.refresh();
      });

      each(edges, (edge: IEdge) => {
        edge.refresh();
      });

      each(vedges, (vedge: IEdge) => {
        vedge.refresh();
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
   * 获取图中所有的 combo 实例
   */
  public getCombos(): ICombo[] {
    return this.get('combos');
  }

  /**
   * 获取指定 Combo 中所有的节点
   * @param comboId combo ID
   */
  public getComboChildren(combo: string | ICombo): { nodes: INode[]; combos: ICombo[] } {
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (!combo || (combo.getType && combo.getType() !== 'combo')) {
      console.warn('The combo does not exist!');
      return;
    }
    return combo.getChildren();
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

    const toNodes = nodes.map((node) => {
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
        each(toNodes, (data) => {
          const node: Item = self.findById(data.id);

          if (!node || node.destroyed) {
            return;
          }

          let originAttrs: Point = node.get('originAttrs');

          const model: NodeConfig = node.get('model');

          if (!originAttrs) {
            let containerMatrix = node.getContainer().getMatrix();
            if (!containerMatrix) containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
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
    const vedges: IEdge[] = self.get('vedges');
    const combos: ICombo[] = self.get('combos');

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
      if (model.comboId) updatedNodes[model.comboId] = true;
    });

    if (combos && combos.length !== 0) {
      self.updateCombos();
    }

    each(edges, (edge: IEdge) => {
      const sourceModel = edge.getSource().getModel();
      const targetModel = edge.getTarget().getModel();
      if (
        updatedNodes[sourceModel.id as string] ||
        updatedNodes[targetModel.id as string] ||
        edge.getModel().isComboEdge
      ) {
        edge.refresh();
      }
    });

    each(vedges, (vedge: IEdge) => {
      vedge.refresh();
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
    this.set({ itemMap: {}, nodes: [], edges: [], groups: [], combos: [], comboTrees: [] });
    this.emit('afterrender');
    return this;
  }

  /**
   * 返回可见区域的图的 dataUrl，用于生成图片
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {string} backgroundColor 图片背景色
   * @return {string} 图片 dataURL
   */
  public toDataURL(type?: DataUrlType, backgroundColor?: string): string {
    const canvas: GCanvas = this.get('canvas');
    const renderer = canvas.getRenderer();
    const canvasDom = canvas.get('el');

    if (!type) type = 'image/png';

    let dataURL = '';
    if (renderer === 'svg') {
      const cloneNode = canvasDom.cloneNode(true);
      const svgDocType = document.implementation.createDocumentType(
        'svg',
        '-//W3C//DTD SVG 1.1//EN',
        'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd',
      );
      const svgDoc = document.implementation.createDocument(
        'http://www.w3.org/2000/svg',
        'svg',
        svgDocType,
      );
      svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
      const svgData = new XMLSerializer().serializeToString(svgDoc);
      dataURL = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgData)}`;
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
        context.globalCompositeOperation = 'destination-over';
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
   * 返回整个图（包括超出可见区域的部分）的 dataUrl，用于生成图片
   * @param {Function} callback 异步生成 dataUrl 完成后的回调函数，在这里处理生成的 dataUrl 字符串
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
   */
  public toFullDataURL(
    callback: (res: string) => any,
    type?: DataUrlType,
    imageConfig?: { backgroundColor?: string; padding?: number | number[] },
  ) {
    const bbox = this.get('group').getCanvasBBox();
    const height = bbox.height;
    const width = bbox.width;
    const renderer = this.get('renderer');
    const vContainerDOM: HTMLDivElement = createDom('<id="virtual-image"></div>');

    const backgroundColor = imageConfig ? imageConfig.backgroundColor : undefined;
    let padding = imageConfig ? imageConfig.padding : undefined;
    if (!padding) padding = [0, 0, 0, 0];
    else if (isNumber(padding)) padding = [padding, padding, padding, padding];

    const vHeight = height + padding[0] + padding[2];
    const vWidth = width + padding[1] + padding[3];
    const canvasOptions = {
      container: vContainerDOM,
      height: vHeight,
      width: vWidth,
      quickHit: true,
    };
    const vCanvas = renderer === 'svg' ? new GSVGCanvas(canvasOptions) : new GCanvas(canvasOptions);

    const group = this.get('group');
    const vGroup = group.clone();

    let matrix = clone(vGroup.getMatrix());
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const centerX = (bbox.maxX + bbox.minX) / 2;
    const centerY = (bbox.maxY + bbox.minY) / 2;
    mat3.translate(matrix, matrix, [-centerX, -centerY]);
    mat3.translate(matrix, matrix, [width / 2 + padding[3], height / 2 + padding[0]]);

    vGroup.resetMatrix();
    vGroup.setMatrix(matrix);
    vCanvas.add(vGroup);

    const vCanvasEl = vCanvas.get('el');

    let dataURL = '';
    if (!type) type = 'image/png';

    setTimeout(() => {
      if (renderer === 'svg') {
        const cloneNode = vCanvasEl.cloneNode(true);
        const svgDocType = document.implementation.createDocumentType(
          'svg',
          '-//W3C//DTD SVG 1.1//EN',
          'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd',
        );
        const svgDoc = document.implementation.createDocument(
          'http://www.w3.org/2000/svg',
          'svg',
          svgDocType,
        );
        svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
        const svgData = new XMLSerializer().serializeToString(svgDoc);
        dataURL = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgData)}`;
      } else {
        let imageData;
        const context = vCanvasEl.getContext('2d');
        let compositeOperation;
        if (backgroundColor) {
          const pixelRatio = window.devicePixelRatio;
          imageData = context.getImageData(0, 0, vWidth * pixelRatio, vHeight * pixelRatio);
          compositeOperation = context.globalCompositeOperation;
          context.globalCompositeOperation = 'destination-over';
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
      callback?.(dataURL);
    }, 16);
  }

  /**
   * 导出包含全图的图片
   * @param {String} name 图片的名称
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
   */
  public downloadFullImage(
    name?: string,
    type?: DataUrlType,
    imageConfig?: { backgroundColor?: string; padding?: number | number[] },
  ): void {
    const bbox = this.get('group').getCanvasBBox();
    const height = bbox.height;
    const width = bbox.width;
    const renderer = this.get('renderer');
    const vContainerDOM: HTMLDivElement = createDom('<id="virtual-image"></div>');

    const backgroundColor = imageConfig ? imageConfig.backgroundColor : undefined;
    let padding = imageConfig ? imageConfig.padding : undefined;
    if (!padding) padding = [0, 0, 0, 0];
    else if (isNumber(padding)) padding = [padding, padding, padding, padding];

    const vHeight = height + padding[0] + padding[2];
    const vWidth = width + padding[1] + padding[3];
    const canvasOptions = {
      container: vContainerDOM,
      height: vHeight,
      width: vWidth,
    };
    const vCanvas = renderer === 'svg' ? new GSVGCanvas(canvasOptions) : new GCanvas(canvasOptions);

    const group = this.get('group');
    const vGroup = group.clone();

    let matrix = clone(vGroup.getMatrix());
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const centerX = (bbox.maxX + bbox.minX) / 2;
    const centerY = (bbox.maxY + bbox.minY) / 2;
    mat3.translate(matrix, matrix, [-centerX, -centerY]);
    mat3.translate(matrix, matrix, [width / 2 + padding[3], height / 2 + padding[0]]);

    vGroup.resetMatrix();
    vGroup.setMatrix(matrix);
    vCanvas.add(vGroup);

    const vCanvasEl = vCanvas.get('el');

    if (!type) type = 'image/png';
    setTimeout(() => {
      let dataURL = '';
      if (renderer === 'svg') {
        const cloneNode = vCanvasEl.cloneNode(true);
        const svgDocType = document.implementation.createDocumentType(
          'svg',
          '-//W3C//DTD SVG 1.1//EN',
          'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd',
        );
        const svgDoc = document.implementation.createDocument(
          'http://www.w3.org/2000/svg',
          'svg',
          svgDocType,
        );
        svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
        const svgData = new XMLSerializer().serializeToString(svgDoc);
        dataURL = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgData)}`;
      } else {
        let imageData;
        const context = vCanvasEl.getContext('2d');
        let compositeOperation;
        if (backgroundColor) {
          const pixelRatio = window.devicePixelRatio;
          imageData = context.getImageData(0, 0, vWidth * pixelRatio, vHeight * pixelRatio);
          compositeOperation = context.globalCompositeOperation;
          context.globalCompositeOperation = 'destination-over';
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
      const fileName: string =
        (name || 'graph') + (renderer === 'svg' ? '.svg' : `.${type.split('/')[1]}`);

      this.dataURLToImage(dataURL, renderer, link, fileName);

      const e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    }, 16);
  }

  /**
   * 画布导出图片，图片仅包含画布可见区域部分内容
   * @param {String} name 图片的名称
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {string} backgroundColor 图片背景色
   */
  public downloadImage(name?: string, type?: DataUrlType, backgroundColor?: string): void {
    const self = this;

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    const canvas = self.get('canvas');
    const renderer = canvas.getRenderer();
    if (!type) type = 'image/png';
    const fileName: string = (name || 'graph') + (renderer === 'svg' ? '.svg' : type.split('/')[1]);
    const link: HTMLAnchorElement = document.createElement('a');
    setTimeout(() => {
      const dataURL = self.toDataURL(type, backgroundColor);
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
        link.addEventListener('click', () => {
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
   * 销毁布局，changeData 时不会再使用原来的布局方法对新数据进行布局
   */
  public destroyLayout(): void {
    const layoutController = this.get('layoutController');
    layoutController.destroyLayout();
  }


  /**
   * 重新以当前示例中配置的属性进行一次布局
   */
  public layout(): void {
    const layoutController = this.get('layoutController');
    const layoutCfg = this.get('layout');
    if (!layoutCfg) return;

    if (layoutCfg.workerEnabled) {
      // 如果使用web worker布局
      layoutController.layout();
      return;
    }
    if (layoutController.layoutMethod) {
      layoutController.relayout(true);
    } else {
      layoutController.layout();
    }
  }

  /**
   * 收起指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */
  public collapseCombo(combo: string | ICombo): void {
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (!combo) {
      console.warn('The combo to be collapsed does not exist!');
      return;
    }

    const comboModel = combo.getModel();

    const itemController: ItemController = this.get('itemController');
    itemController.collapseCombo(combo);
    comboModel.collapsed = true;

    // add virtual edges
    const edges = this.getEdges().concat(this.get('vedges'));

    // find all the descendant nodes and combos
    let cnodes = [];
    let ccombos = [];
    const comboTrees = this.get('comboTrees');
    let found = false;
    let brothers = {};
    (comboTrees || []).forEach((ctree) => {
      brothers[ctree.id] = ctree;
    });
    (comboTrees || []).forEach((ctree) => {
      if (found) return; // if the combo is found, terminate the forEach
      traverseTree(ctree, (subTree) => {
        // if the combo is found and the it is traversing the other brothers, terminate
        if (found && brothers[subTree.id]) return false;
        if (comboModel.parentId === subTree.id) {
          // if the parent is found, store the brothers
          brothers = {};
          subTree.children.forEach((child) => {
            brothers[child.id] = child;
          });
        } else if (comboModel.id === subTree.id) {
          // if the combo is found
          found = true;
        }
        if (found) {
          // if the combo is found, concat the descendant nodes and combos
          const item = this.findById(subTree.id) as ICombo;
          if (item && item.getType && item.getType() === 'combo') {
            cnodes = cnodes.concat(item.getNodes());
            ccombos = ccombos.concat(item.getCombos());
          }
        }
        return true;
      });
    });

    const edgeWeightMap = {};
    const addedVEdges = [];
    edges.forEach((edge) => {
      if (edge.isVisible() && !edge.getModel().isVEdge) return;
      let source = edge.getSource();
      let target = edge.getTarget();
      if (
        ((cnodes.includes(source) || ccombos.includes(source)) &&
          !cnodes.includes(target) &&
          !ccombos.includes(target)) ||
        source.getModel().id === comboModel.id
      ) {
        const edgeModel = edge.getModel();
        if (edgeModel.isVEdge) {
          this.removeItem(edge, false);
          return;
        }

        let targetModel = target.getModel();
        while (!target.isVisible()) {
          target = this.findById(
            (targetModel.parentId as string) || (targetModel.comboId as string),
          ) as ICombo;
          if (!target || (!targetModel.parentId && !targetModel.comboId)) return; // all the ancestors are hidden, then ignore the edge
          targetModel = target.getModel();
        }

        const targetId = targetModel.id;

        if (edgeWeightMap[`${comboModel.id}-${targetId}`]) {
          edgeWeightMap[`${comboModel.id}-${targetId}`] += edgeModel.size || 1;
          return;
        }
        // the source is in the combo, the target is not
        const vedge = this.addItem(
          'vedge',
          {
            source: comboModel.id,
            target: targetId,
            isVEdge: true,
          },
          false,
        );
        edgeWeightMap[`${comboModel.id}-${targetId}`] = edgeModel.size || 1;
        addedVEdges.push(vedge);
      } else if (
        (!cnodes.includes(source) &&
          !ccombos.includes(source) &&
          (cnodes.includes(target) || ccombos.includes(target))) ||
        target.getModel().id === comboModel.id
      ) {
        const edgeModel = edge.getModel();
        if (edgeModel.isVEdge) {
          this.removeItem(edge, false);
          return;
        }
        let sourceModel = source.getModel();
        while (!source.isVisible()) {
          source = this.findById(
            (sourceModel.parentId as string) || (sourceModel.comboId as string),
          ) as ICombo;
          if (!source || (!sourceModel.parentId && !sourceModel.comboId)) return; // all the ancestors are hidden, then ignore the edge
          sourceModel = source.getModel();
        }
        const sourceId = sourceModel.id;
        if (edgeWeightMap[`${sourceId}-${comboModel.id}`]) {
          edgeWeightMap[`${sourceId}-${comboModel.id}`] += edgeModel.size || 1;
          return;
        }
        // the target is in the combo, the source is not
        const vedge = this.addItem(
          'vedge',
          {
            target: comboModel.id,
            source: sourceId,
            isVEdge: true,
          },
          false,
        );
        edgeWeightMap[`${sourceId}-${comboModel.id}`] = edgeModel.size || 1;
        addedVEdges.push(vedge);
      }
    });

    // update the width of the virtual edges, which is the sum of merged actual edges
    // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges
    addedVEdges.forEach((vedge) => {
      const vedgeModel = vedge.getModel();
      this.updateItem(
        vedge,
        {
          size: edgeWeightMap[`${vedgeModel.source}-${vedgeModel.target}`],
        },
        false,
      );
    });
  }

  /**
   * 展开指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */
  public expandCombo(combo: string | ICombo): void {
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (!combo || (combo.getType && combo.getType() !== 'combo')) {
      console.warn('The combo to be collapsed does not exist!');
      return;
    }
    const comboModel = combo.getModel();

    const itemController: ItemController = this.get('itemController');
    itemController.expandCombo(combo);
    comboModel.collapsed = false;

    // add virtual edges
    const edges = this.getEdges().concat(this.get('vedges'));

    // find all the descendant nodes and combos
    let cnodes = [];
    let ccombos = [];
    const comboTrees = this.get('comboTrees');
    let found = false;
    let brothers = {};
    (comboTrees || []).forEach((ctree) => {
      brothers[ctree.id] = ctree;
    });
    (comboTrees || []).forEach((ctree) => {
      if (found) return; // if the combo is found, terminate
      traverseTree(ctree, (subTree) => {
        if (found && brothers[subTree.id]) {
          return false;
        }
        if (comboModel.parentId === subTree.id) {
          brothers = {};
          subTree.children.forEach((child) => {
            brothers[child.id] = child;
          });
        } else if (comboModel.id === subTree.id) {
          found = true;
        }
        if (found) {
          const item = this.findById(subTree.id) as ICombo;
          if (item && item.getType && item.getType() === 'combo') {
            cnodes = cnodes.concat(item.getNodes());
            ccombos = ccombos.concat(item.getCombos());
          }
        }
        return true;
      });
    });

    const edgeWeightMap = {};
    const addedVEdges = {};
    edges.forEach((edge) => {
      if (edge.isVisible() && !edge.getModel().isVEdge) return;
      let source = edge.getSource();
      let target = edge.getTarget();
      let sourceId = source.get('id');
      let targetId = target.get('id');
      if (
        ((cnodes.includes(source) || ccombos.includes(source)) &&
          !cnodes.includes(target) &&
          !ccombos.includes(target)) ||
        sourceId === comboModel.id
      ) {
        // the source is in the combo, the target is not

        // ignore the virtual edges
        if (edge.getModel().isVEdge) {
          this.removeItem(edge, false);
          return;
        }

        let targetModel = target.getModel();
        // find the nearest visible ancestor
        while (!target.isVisible()) {
          target = this.findById(
            (targetModel.comboId as string) || (targetModel.parentId as string),
          ) as ICombo;
          if (!target || (!targetModel.parentId && !targetModel.comboId)) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }
          targetModel = target.getModel();
        }
        targetId = targetModel.id;

        let sourceModel = source.getModel();
        // find the nearest visible ancestor
        while (!source.isVisible()) {
          source = this.findById(
            (sourceModel.comboId as string) || (sourceModel.parentId as string),
          ) as ICombo;
          if (!source || (!sourceModel.parentId && !sourceModel.comboId)) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }
          if (sourceModel.comboId === comboModel.id || sourceModel.parentId === comboModel.id) {
            break; // if the next ancestor is the combo, break the while
          }
          sourceModel = source.getModel();
        }
        sourceId = sourceModel.id;

        if (targetId) {
          const vedgeId = `${sourceId}-${targetId}`;
          // update the width of the virtual edges, which is the sum of merged actual edges
          // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges
          if (edgeWeightMap[vedgeId]) {
            edgeWeightMap[vedgeId] += edge.getModel().size || 1;
            this.updateItem(
              addedVEdges[vedgeId],
              {
                size: edgeWeightMap[vedgeId],
              },
              false,
            );
            return;
          }
          const vedge = this.addItem(
            'vedge',
            {
              source: sourceId,
              target: targetId,
              isVEdge: true,
            },
            false,
          );

          edgeWeightMap[vedgeId] = edge.getModel().size || 1;
          addedVEdges[vedgeId] = vedge;
        }
      } else if (
        (!cnodes.includes(source) &&
          !ccombos.includes(source) &&
          (cnodes.includes(target) || ccombos.includes(target))) ||
        targetId === comboModel.id
      ) {
        // the target is in the combo, the source is not

        // ignore the virtual edges
        if (edge.getModel().isVEdge) {
          this.removeItem(edge, false);
          return;
        }

        let sourceModel = source.getModel();
        // find the nearest visible ancestor
        while (!source.isVisible()) {
          source = this.findById(
            (sourceModel.comboId as string) || (sourceModel.parentId as string),
          ) as ICombo;
          if (!source || (!sourceModel.parentId && !sourceModel.comboId)) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }
          sourceModel = source.getModel();
        }
        sourceId = sourceModel.id;

        let targetModel = target.getModel();
        // find the nearest visible ancestor
        while (!target.isVisible()) {
          target = this.findById(
            (targetModel.comboId as string) || (targetModel.parentId as string),
          ) as ICombo;
          if (!target || (!targetModel.parentId && !targetModel.comboId)) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }
          if (targetModel.comboId === comboModel.id || targetModel.parentId === comboModel.id) {
            break; // if the next ancestor is the combo, break the while
          }
          targetModel = target.getModel();
        }
        targetId = targetModel.id;

        if (sourceId) {
          const vedgeId = `${sourceId}-${targetId}`;
          // update the width of the virtual edges, which is the sum of merged actual edges
          // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges
          if (edgeWeightMap[vedgeId]) {
            edgeWeightMap[vedgeId] += edge.getModel().size || 1;
            this.updateItem(
              addedVEdges[vedgeId],
              {
                size: edgeWeightMap[vedgeId],
              },
              false,
            );
            return;
          }
          const vedge = this.addItem(
            'vedge',
            {
              target: targetId,
              source: sourceId,
              isVEdge: true,
            },
            false,
          );
          edgeWeightMap[vedgeId] = edge.getModel().size || 1;
          addedVEdges[vedgeId] = vedge;
        }
      } else if (
        (cnodes.includes(source) || ccombos.includes(source)) &&
        (cnodes.includes(target) || ccombos.includes(target))
      ) {
        // both source and target are in the combo, if the target and source are both visible, show the edge
        if (source.isVisible() && target.isVisible()) {
          edge.show();
        }
      }
    });
  }

  public collapseExpandCombo(combo: string | ICombo) {
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (combo.getType && combo.getType() !== 'combo') return;

    const comboModel = combo.getModel();

    // if one ancestor combo of the combo is collapsed, it should not be collapsed or expanded
    let parentItem = this.findById(comboModel.parentId as string);
    while (parentItem) {
      const parentModel = parentItem.getModel();
      if (parentModel.collapsed) {
        console.warn(`Fail to expand the combo since it's ancestor combo is collapsed.`);
        parentItem = undefined;
        return;
      }
      parentItem = this.findById(parentModel.parentId as string);
    }
    const collapsed = comboModel.collapsed;
    // 该群组已经处于收起状态，需要展开
    if (collapsed) {
      this.expandCombo(combo);
    } else {
      this.collapseCombo(combo);
    }
    this.updateCombo(combo);
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
   * 根据 comboTree 结构整理 Combo 相关的图形绘制层级，包括 Combo 本身、节点、边
   * @param {GraphData} data 数据
   */
  private sortCombos() {
    const comboSorted = this.get('comboSorted');
    if (comboSorted) return;
    this.set('comboSorted', true);
    const depthMap = [];
    const dataDepthMap = {};
    const comboTrees = this.get('comboTrees');
    (comboTrees || []).forEach((cTree) => {
      traverseTree(cTree, (child) => {
        if (depthMap[child.depth]) depthMap[child.depth].push(child.id);
        else depthMap[child.depth] = [child.id];
        dataDepthMap[child.id] = child.depth;
        return true;
      });
    });
    const edges = this.getEdges().concat(this.get('vedges'));
    (edges || []).forEach((edgeItem) => {
      const edge = edgeItem.getModel();
      const sourceDepth: number = dataDepthMap[edge.source as string] || 0;
      const targetDepth: number = dataDepthMap[edge.target as string] || 0;
      const depth = Math.max(sourceDepth, targetDepth);
      if (depthMap[depth]) depthMap[depth].push(edge.id);
      else depthMap[depth] = [edge.id];
    });
    depthMap.forEach((array) => {
      if (!array || !array.length) return;
      for (let i = array.length - 1; i >= 0; i--) {
        const item = this.findById(array[i]);
        item?.toFront();
      }
    });
  }

  /**
   * 获取节点所有的邻居节点
   *
   * @param {(string | INode)} node 节点 ID 或实例
   * @returns {INode[]}
   * @memberof IGraph
   */
  public getNeighbors(node: string | INode, type?: 'source' | 'target' | undefined): INode[] {
    let item = node as INode;
    if (isString(node)) {
      item = this.findById(node) as INode;
    }
    return item.getNeighbors(type);
  }

  /**
   * 获取 node 的度数
   *
   * @param {(string | INode)} node 节点 ID 或实例
   * @param {('in' | 'out' | 'total' | 'all' | undefined)} 度数类型，in 入度，out 出度，total 总度数，all 返回三种类型度数的对象
   * @returns {Number | Object} 该节点的度数
   * @memberof IGraph
   */
  public getNodeDegree(
    node: string | INode,
    type: 'in' | 'out' | 'total' | 'all' | undefined = undefined,
  ): Number | Object {
    let item = node as INode;
    if (isString(node)) {
      item = this.findById(node) as INode;
    }
    let degrees = this.get('degrees');
    if (!degrees) {
      degrees = degree(this);
    }
    this.set('degees', degrees);
    const nodeDegrees = degrees[item.getID()];
    let res;
    switch (type) {
      case 'in':
        res = nodeDegrees.inDegree;
        break;
      case 'out':
        res = nodeDegrees.outDegree;
        break;
      case 'all':
        res = nodeDegrees;
        break;
      default:
        res = nodeDegrees.degree;
        break;
    }
    return res;
  }

  public getUndoStack() {
    return this.undoStack;
  }

  public getRedoStack() {
    return this.redoStack;
  }

  /**
   * 获取 undo 和 redo 栈的数据
   */
  public getStackData() {
    if (!this.get('enabledStack')) {
      return null;
    }

    return {
      undoStack: this.undoStack.toArray(),
      redoStack: this.redoStack.toArray(),
    };
  }

  /**
   * 清空 undo stack & redo stack
   */
  public clearStack() {
    if (this.get('enabledStack')) {
      this.undoStack.clear();
      this.redoStack.clear();
    }
  }

  /**
   * 将操作类型和操作数据入栈
   * @param action 操作类型
   * @param data 入栈的数据
   * @param stackType 栈的类型
   */
  public pushStack(action: string = 'update', data?: unknown, stackType: string = 'undo') {
    if (!this.get('enabledStack')) {
      console.warn('请先启用 undo & redo 功能，在实例化 Graph 时候配置 enabledStack: true !');
      return;
    }

    const stackData = data ? clone(data) : {
      before: {},
      after: clone(this.save())
    };

    if (stackType === 'redo') {
      this.redoStack.push({
        action,
        data: stackData,
      });
    } else {
      this.undoStack.push({
        action,
        data: stackData,
      });
    }

    this.emit('stackchange', {
      undoStack: this.undoStack,
      redoStack: this.redoStack,
    });
  }

  /**
   * 获取邻接矩阵
   *
   * @param {boolean} cache 是否使用缓存的
   * @param {boolean} directed 是否是有向图，默认取 graph.directed
   * @returns {Matrix} 邻接矩阵
   * @memberof IGraph
   */
  public getAdjMatrix(cache: boolean = true, directed?: boolean): Number | Object {
    if (directed === undefined) directed = this.get('directed');
    let currentAdjMatrix = this.get('adjMatrix');
    if (!currentAdjMatrix || !cache) {
      currentAdjMatrix = adjMatrix(this, directed);
      this.set('adjMatrix', currentAdjMatrix);
    }
    return currentAdjMatrix;
  }

  /**
   * 获取最短路径矩阵
   *
   * @param {boolean} cache 是否使用缓存的
   * @param {boolean} directed 是否是有向图，默认取 graph.directed
   * @returns {Matrix} 最短路径矩阵
   * @memberof IGraph
   */
  public getShortestPathMatrix(cache: boolean = true, directed?: boolean): Number | Object {
    if (directed === undefined) directed = this.get('directed');
    let currentAdjMatrix = this.get('adjMatrix');
    let currentShourtestPathMatrix = this.get('shortestPathMatrix');
    if (!currentAdjMatrix || !cache) {
      currentAdjMatrix = adjMatrix(this, directed);
      this.set('adjMatrix', currentAdjMatrix);
    }
    if (!currentShourtestPathMatrix || !cache) {
      currentShourtestPathMatrix = floydWarshall(this, directed);
      this.set('shortestPathMatrix', currentShourtestPathMatrix);
    }
    return currentShourtestPathMatrix;
  }

  /**
   * 销毁画布
   */
  public destroy() {
    this.clear();

    // 清空栈数据
    this.clearStack();

    each(this.get('plugins'), (plugin) => {
      plugin.destroyPlugin();
    });

    // destroy tooltip doms, removed when upgrade G6 4.0
    const tooltipDOMs = this.get('tooltips');
    if (tooltipDOMs) {
      for (let i = 0; i < tooltipDOMs.length; i++) {
        const container = tooltipDOMs[i];
        if (!container) continue;
        const parent = container.parentElement;
        if (!parent) continue;
        parent.removeChild(container);
      }
    }

    this.get('eventController').destroy();
    this.get('itemController').destroy();
    this.get('modeController').destroy();
    this.get('viewController').destroy();
    this.get('stateController').destroy();
    this.get('layoutController').destroy();
    this.get('canvas').destroy();

    if (this.get('graphWaterMarker')) {
      this.get('graphWaterMarker').destroy();
    }
    if (document.querySelector('.g6-graph-watermarker')) {
      document.querySelector('.g6-graph-watermarker').remove()
    }

    (this.cfg as any) = null;
    this.destroyed = true;
    this.redoStack = null;
    this.undoStack = null;
  }

  /**
   * 创建凸包或凹包轮廓
   * @param cfg HullCfg 轮廓配置项
   */
  public createHull(cfg: HullCfg) {
    let parent = this.get('hullGroup');
    let hullMap = this.get('hullMap');
    if (!hullMap) {
      hullMap = {};
      this.set('hullMap', hullMap);
    }
    if (!parent) {
      parent = this.get('group').addGroup({
        id: 'hullGroup',
      });
      parent.toBack();
      this.set('hullGroup', parent);
    }
    if (hullMap[cfg.id]) {
      console.warn('Existed hull id.');
      return hullMap[cfg.id];
    }
    const group = parent.addGroup({
      id: `${cfg.id}-container`,
    });
    const hull = new Hull(this, {
      ...cfg,
      group,
    });
    const hullId = hull.id;
    hullMap[hullId] = hull;
    return hull;
  }

  /**
   * 获取当前 graph 中存在的包裹轮廓
   * @return {[key: string]: Hull} hullId 对应的 hull 实例
   */
  public getHulls(): Hull[] {
    return this.get('hullMap');
  }

  /**
   * 根据 hullId 获取对应的 hull 
   * @return Hull
   */
  public getHullById(hullId: string): Hull {
    return this.get('hullMap')[hullId];
  }

  public removeHull(hull: Hull | string) {
    let hullInstance: Hull;
    if (isString(hull)) {
      hullInstance = this.getHullById(hull);
    } else {
      hullInstance = hull;
    }
    const hullMap = this.get('hullMap');
    delete hullMap[hullInstance.id];
    hullInstance.destroy();
  }

  /**
   * 设置图片水印
   * @param {string} imgURL 图片水印的url地址
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  public setImageWaterMarker(
    imgURL: string = Global.waterMarkerImage,
    config?: WaterMarkerConfig) {
    let container: string | HTMLElement | null = this.get('container')
    if (isString(container)) {
      container = document.getElementById(container)
    }

    if (!container.style.position) {
      container.style.position = 'relative'
    }

    let canvas = this.get('graphWaterMarker')

    const waterMarkerConfig: WaterMarkerConfig = deepMix({}, Global.imageWaterMarkerConfig, config)
    const { width, height, compatible, image } = waterMarkerConfig

    if (!canvas) {
      const canvasCfg: any = {
        container,
        width,
        height,
        capture: false,
      };
      const pixelRatio = this.get('pixelRatio')
      if (pixelRatio) {
        canvasCfg.pixelRatio = pixelRatio
      }
      canvas = new GCanvas(canvasCfg)
      this.set('graphWaterMarker', canvas)
    }
    canvas.get('el').style.display = 'none'
    const ctx = canvas.get('context')

    const { rotate, x, y } = image
    // 旋转20度
    ctx.rotate((-rotate * Math.PI) / 180)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imgURL
    img.onload = () => {
      ctx.drawImage(img, x, y, image.width, image.height)
      // 恢复旋转角度
      ctx.rotate((rotate * Math.PI) / 180)

      // 默认按照现代浏览器处理        
      if (!compatible) {
        let box = document.querySelector('.g6-graph-watermarker') as HTMLElement
        if (!box) {
          box = document.createElement('div')
          box.className = 'g6-graph-watermarker'
        }
        box.className = 'g6-graph-watermarker'
        if (!canvas.destroyed) {
          box.style.cssText = `background-image: url(${canvas.get('el').toDataURL('image/png')});background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;z-index:-1;`;
          (container as HTMLElement).appendChild(box)
        }
      } else {
        // 当需要兼容不支持 pointer-events属性的浏览器时，将 compatible 设置为 true
        (container as HTMLElement).style.cssText = `background-image: url(${canvas.get('el').toDataURL('image/png')});background-repeat:repeat;`
      }
    }

  }

  /**
   * 设置文本水印
   * @param {string[]} texts 水印的文本内容
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  public setTextWaterMarker(texts: string[], config?: WaterMarkerConfig) {
    let container: string | HTMLElement | null = this.get('container')
    if (isString(container)) {
      container = document.getElementById(container)
    }

    if (!container.style.position) {
      container.style.position = 'relative'
    }

    let canvas = this.get('graphWaterMarker')

    const waterMarkerConfig: WaterMarkerConfig = deepMix({}, Global.textWaterMarkerConfig, config)
    const { width, height, compatible, text } = waterMarkerConfig

    if (!canvas) {
      const canvasCfg: any = {
        container,
        width,
        height,
        capture: false,
      };
      const pixelRatio = this.get('pixelRatio')
      if (pixelRatio) {
        canvasCfg.pixelRatio = pixelRatio
      }
      canvas = new GCanvas(canvasCfg)
      this.set('graphWaterMarker', canvas)
    }
    canvas.get('el').style.display = 'none'
    const ctx = canvas.get('context')

    const { rotate, fill, fontFamily, fontSize, baseline, x, y, lineHeight } = text
    // 旋转20度
    ctx.rotate((-rotate * Math.PI) / 180)

    // 设置文字样式   
    ctx.font = `${fontSize}px ${fontFamily}`

    // 设置文字颜色  
    ctx.fillStyle = fill

    ctx.textBaseline = baseline

    for (let i = texts.length - 1; i >= 0; i--) {
      // 将文字绘制到画布        
      ctx.fillText(texts[i], x, y + i * lineHeight)
    }

    // 恢复旋转角度
    ctx.rotate((rotate * Math.PI) / 180)

    // 默认按照现代浏览器处理        
    if (!compatible) {
      let box = document.querySelector('.g6-graph-watermarker') as HTMLElement
      if (!box) {
        box = document.createElement('div')
        box.className = 'g6-graph-watermarker'
      }
      box.style.cssText = `background-image: url(${canvas.get('el').toDataURL('image/png')});background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;z-index:99;`;
      container.appendChild(box)
    } else {
      // 当需要兼容不支持 pointer-events属性的浏览器时，将 compatible 设置为 true
      container.style.cssText = `background-image: url(${canvas.get('el').toDataURL('image/png')});background-repeat:repeat;`;
    }
  }
}
