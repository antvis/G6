import EventEmitter from '@antv/event-emitter';
import { ICanvas, IGroup, Point } from '@antv/g-base';
import { ext } from '@antv/matrix-util';
import { clone, deepMix, each, isPlainObject, isString, debounce } from '@antv/util';
import {
  getDegree,
  getAdjMatrix as getAdjacentMatrix,
  Stack,
  floydWarshall,
} from '@antv/algorithm';
import { IAbstractGraph } from '../interface/graph';
import { IEdge, INode, ICombo } from '../interface/item';
import {
  GraphAnimateConfig,
  GraphOptions,
  EdgeConfig,
  GraphData,
  Item,
  ITEM_TYPE,
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
  IG6GraphEvent,
  IPoint,
  FitViewRules,
  G6Event,
} from '../types';
import { lerp, move } from '../util/math';
import { dataValidation, singleDataValidation } from '../util/validation';
import Global from '../global';
import { ItemController, ModeController, StateController, ViewController } from './controller';
import { plainCombosToTrees, traverseTree, reconstructTree, traverseTreeUp, getAnimateCfgWithCallback } from '../util/graphic';
import Hull from '../item/hull';

const { transform } = ext;
const NODE = 'node';

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

export default abstract class AbstractGraph extends EventEmitter implements IAbstractGraph {
  protected animating: boolean;

  protected cfg: GraphOptions & { [key: string]: any };

  public destroyed: boolean;

  // undo 栈
  protected undoStack: Stack;

  // redo 栈
  protected redoStack: Stack;

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

  protected init() {
    this.initCanvas();

    // instance controller
    const viewController = new ViewController(this);
    const modeController = new ModeController(this);
    const itemController = new ItemController(this);
    const stateController = new StateController(this);

    this.set({
      viewController,
      modeController,
      itemController,
      stateController,
    });

    // 初始化布局机制
    this.initLayoutController();

    // 初始化事件机制
    this.initEventController();

    this.initGroups();

    /** 初始化插件 */
    this.initPlugins();
  }

  protected abstract initLayoutController(): void;

  protected abstract initEventController(): void;

  /**
   * initCanvas 需要在 PC 和 Mobile 分别实现
   */
  protected abstract initCanvas(): void;

  /**
   * initPlugins 需要在 PC 和 Mobile 分别实现
   */
  protected abstract initPlugins(): void;

  // 初始化所有 Group
  protected initGroups(): void {
    const canvas: ICanvas = this.get('canvas');
    if (!canvas) return;
    const el: HTMLElement = canvas.get('el');
    const { id = 'g6' } = el || {};

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
      minZoom: 0.02,
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

      // 达到这一节点数量(默认值 1000)，将开启性能优化模式。目前包括：节点状态样式变更是否影响相关边的更新
      optimizeThreshold: 1000
    };
  }

  /**
   * 将值设置到 this.cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */
  public set<T = any>(key: string | object, val?: T): AbstractGraph {
    if (isPlainObject(key)) {
      this.cfg = { ...this.cfg, ...key };
    } else {
      this.cfg[key] = val;
    }
    if (key === 'enabledStack' && val && !this.undoStack && !this.redoStack) {
      this.undoStack = new Stack(this.cfg.maxStep);
      this.redoStack = new Stack(this.cfg.maxStep);
    }
    return this;
  }

  /**
   * 获取 this.cfg 中的值
   * @param key 键
   */
  public get(key: string) {
    return this.cfg?.[key];
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
  public findAllByState<T extends Item>(type: ITEM_TYPE, state: string, additionalFilter?: (item: Item) => boolean): T[] {
    if (additionalFilter) {
      return this.findAll(type, item => item.hasState(state) && additionalFilter(item));
    } else {
      return this.findAll(type, item => item.hasState(state));
    }
  }

  /**
   * 平移画布
   * @param dx 水平方向位移
   * @param dy 垂直方向位移
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  public translate(dx: number, dy: number, animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    const group: IGroup = this.get('group');

    let matrix = clone(group.getMatrix());
    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    if (animate) {
      const animateConfig = getAnimateCfgWithCallback({
        animateCfg,
        callback: () => this.emit('viewportchange', { action: 'translate', matrix: group.getMatrix() })
      });

      move(group, {
        x: group.getCanvasBBox().x + dx,
        y: group.getCanvasBBox().y + dy
      }, animate, animateConfig || {
        duration: 500,
        easing: 'easeCubic'
      });
    } else {
      matrix = transform(matrix, [['t', dx, dy]]);
      group.setMatrix(matrix);

      this.emit('viewportchange', { action: 'translate', matrix });
      this.autoPaint();
    }
  }

  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  public moveTo(x: number, y: number, animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    const group: IGroup = this.get('group');
    move(
      group,
      { x, y },
      animate,
      animateCfg || {
        duration: 500,
        easing: 'easeCubic',
      }
    );
    this.emit('viewportchange', { action: 'move', matrix: group.getMatrix() });
  }

  /**
   * 调整视口适应视图
   * @param {object} padding 四周围边距
   * @param {FitViewRules} rules fitView的规则
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  public fitView(padding?: Padding, rules?: FitViewRules, animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    if (padding) {
      this.set('fitViewPadding', padding);
    }

    const viewController: ViewController = this.get('viewController');

    if (rules) {
      viewController.fitViewByRules(rules, animate, animateCfg);
    } else {
      viewController.fitView(animate, animateCfg);
    }

    this.autoPaint();
  }

  /**
   * 调整视口适应视图，不缩放，仅将图 bbox 中心对齐到画布中心
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  public fitCenter(animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    const viewController: ViewController = this.get('viewController');
    viewController.fitCenter(animate, animateCfg);
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
  ): AbstractGraph {
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
  ): AbstractGraph {
    const modeController: ModeController = this.get('modeController');
    modeController.manipulateBehaviors(behaviors, modes, false);
    return this;
  }

  /**
   * 更新行为参数
   * @param {string | ModeOption | ModeType} behavior 需要更新的行为
   * @param {string | string[]} modes 指定的模式中的行为，不指定则为 default
   * @return {Graph} Graph
   */
  public updateBehavior(behavior: string, newCfg: object, mode?: string): AbstractGraph {
    const modeController: ModeController = this.get('modeController');
    modeController.updateBehavior(behavior, newCfg, mode);
    return this;
  }

  /**
   * 伸缩窗口
   * @param ratio 伸缩比例
   * @param center 以center的x, y坐标为中心缩放
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   * @return {boolean} 缩放是否成功
   */
  public zoom(ratio: number, center?: Point, animate?: boolean, animateCfg?: GraphAnimateConfig): boolean {
    const group: IGroup = this.get('group');
    let matrix = clone(group.getMatrix()) || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const minZoom: number = this.get('minZoom');
    const maxZoom: number = this.get('maxZoom');
    const currentZoom = this.getZoom() || 1;
    const targetZoom = currentZoom * ratio;
    let finalRatio = ratio;

    let failed = false;
    if (minZoom && targetZoom < minZoom) {
      finalRatio = minZoom / currentZoom;
      failed = true;
    } else if (maxZoom && targetZoom > maxZoom) {
      finalRatio = maxZoom / currentZoom;
      failed = true;
    }

    if (center) {
      matrix = transform(matrix, [
        ['t', -center.x, -center.y],
        ['s', finalRatio, finalRatio],
        ['t', center.x, center.y],
      ]);
    } else {
      matrix = transform(matrix, [['s', finalRatio, finalRatio]]);
    }

    if (animate) {
      // Clone the original matrix to perform the animation
      let aniMatrix = clone(group.getMatrix());
      if (!aniMatrix) {
        aniMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      }
      const initialRatio = aniMatrix[0];
      const targetRatio = initialRatio * finalRatio;

      const animateConfig = getAnimateCfgWithCallback({
        animateCfg,
        callback: () => this.emit('viewportchange', { action: 'zoom', matrix: group.getMatrix() })
      });

      group.animate((ratio: number) => {
        if (ratio === 1) {
          // Reuse the first transformation
          aniMatrix = matrix;
        } else {
          const scale = lerp(initialRatio, targetRatio, ratio) / aniMatrix[0];
          if (center) {
            aniMatrix = transform(aniMatrix, [['t', -center.x, -center.y], ['s', scale, scale], ['t', center.x, center.y]]);
          } else {
            aniMatrix = transform(aniMatrix, [['s', scale, scale]]);
          }
        }
        return { matrix: aniMatrix };
      }, animateConfig);
    } else {
      group.setMatrix(matrix);
      this.emit('viewportchange', { action: 'zoom', matrix });
      this.autoPaint();
    }

    return !failed;
  }

  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {Point} center 以center的x, y坐标为中心缩放
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   * @return {boolean} 缩放是否成功
   */
  public zoomTo(toRatio: number, center?: Point, animate?: boolean, animateCfg?: GraphAnimateConfig): boolean {
    const ratio = toRatio / this.getZoom();
    return this.zoom(ratio, center, animate, animateCfg);
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
   * Focus on the passed items
   * @param {Item[]} items Items you want to focus on
   * @param {boolean} zoomToFit Wether to zoom on the passed items
   * @param {boolean} animate Wether to animate the transition
   * @param {GraphAnimateConfig} animateCfg Animation configuration
   */
  public focusItems(items: Item[], zoomToFit?: boolean, animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    const viewController: ViewController = this.get('viewController');
    viewController.focusItems(items, zoomToFit, animate, animateCfg);
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
   * 将绘制坐标转换为屏幕坐标
   * @param {number} x 绘制坐标 x
   * @param {number} y 绘制坐标 y
   * @return {Point} 绘制坐标
   */
  public getClientByPoint(x: number, y: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getClientByPoint(x, y);
  }

  /**
   * 将画布坐标转换为绘制坐标
   * @param {number} canvasX 画布 x 坐标
   * @param {number} canvasY 画布 y 坐标
   * @return {object} 绘制坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getPointByCanvas(canvasX, canvasY);
  }

  /**
   * 将绘制坐标转换为画布坐标
   * @param {number} x 绘制坐标 x
   * @param {number} y 绘制坐标 y
   * @return {object} 画布坐标
   */
  public getCanvasByPoint(x: number, y: number): Point {
    const viewController: ViewController = this.get('viewController');
    return viewController.getCanvasByPoint(x, y);
  }

  /**
   * 获取图内容的中心绘制坐标
   * @return {object} 中心绘制坐标
   */
  public getGraphCenterPoint(): Point {
    const bbox = this.get('group').getCanvasBBox();
    return {
      x: (bbox.minX + bbox.maxX) / 2,
      y: (bbox.minY + bbox.maxY) / 2,
    };
  }

  /**
   * 获取视口中心绘制坐标
   * @return {object} 视口中心绘制坐标
   */
  public getViewPortCenterPoint(): Point {
    return this.getPointByCanvas(this.get('width') / 2, this.get('height') / 2);
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
    const canvas: ICanvas = self.get('canvas');
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
    if (isString(item)) nodeItem = this.findById(item as string);

    if (!nodeItem && isString(item)) {
      console.warn(`The item ${item} to be removed does not exist!`);
    } else if (nodeItem) {
      let type = '';
      if ((nodeItem as Item).getType) type = (nodeItem as Item).getType();

      // 将删除的元素入栈
      if (stack && this.get('enabledStack')) {
        const deletedModel = {
          ...(nodeItem as Item).getModel(),
          itemType: type,
        };
        const before: GraphData = {};
        switch (type) {
          case 'node': {
            before.nodes = [deletedModel as NodeConfig];
            before.edges = [];
            const edges = (nodeItem as INode).getEdges();
            for (let i = edges.length - 1; i >= 0; i--) {
              before.edges.push({
                ...edges[i].getModel(),
                itemType: 'edge',
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
          before,
          after: {},
        });
      }

      if (type === 'node') {
        const model = (nodeItem as INode).getModel();
        // 如果删除的是节点，且该节点存在于某个 Combo 中，则需要先将 node 从 combo 中移除，否则删除节点后，操作 combo 会出错
        if (model.comboId) {
          this.updateComboTree(nodeItem as INode, undefined, false);
        }
      }

      const itemController: ItemController = this.get('itemController');
      itemController.removeItem(nodeItem);
      if (type === 'combo') {
        const newComboTrees = reconstructTree(this.get('comboTrees'));
        this.set('comboTrees', newComboTrees);
      }
    }
  }

  private innerAddItem(
    type: ITEM_TYPE,
    model: ModelConfig,
    itemController: ItemController
  ): Item | boolean {
    // 添加节点、边或combo之前，先验证数据是否符合规范
    if (!singleDataValidation(type, model)) {
      return false;
    }

    if (model.id && this.findById(model.id as string)) {
      console.warn(
        `This item exists already. Be sure the id %c${model.id}%c is unique.`,
        'font-size: 20px; color: red;',
        '',
      );
      return;
    }

    let item;
    const comboTrees = this.get('comboTrees') || [];
    if (type === 'combo') {
      const itemMap = this.get('itemMap');
      let foundParent = false;
      comboTrees.forEach((ctree: ComboTree) => {
        if (foundParent) return; // terminate the forEach after the tree containing the item is done
        traverseTreeUp<ComboTree>(ctree, child => {
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

      if (model.collapsed) {
        this.collapseCombo(item as ICombo, false);
        this.updateCombo(item as ICombo);
      }

    } else if (type === 'node' && isString(model.comboId) && comboTrees) {
      const parentCombo = this.findById(model.comboId as string);
      if (parentCombo && parentCombo.getType && parentCombo.getType() !== 'combo') {
        console.warn(
          `'${model.comboId}' is not a id of a combo in the graph, the node will be added without combo.`,
        );
      }
      item = itemController.addItem(type, model);

      const itemMap = this.get('itemMap');
      let foundParent = false,
        foundNode = false;
      comboTrees.forEach((ctree: ComboTree) => {
        if (foundNode || foundParent) return; // terminate the forEach
        traverseTreeUp<ComboTree>(ctree, child => {
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
            cloneNode.depth = child.depth + 1;
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
      if (parentCombo && parentCombo.getType && parentCombo.getType() === 'combo')
        parentCombo.addChild(item);
    }

    return item;
  }

  /**
   * 新增元素
   * @param {ITEM_TYPE} type 元素类型(node | edge)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @param {boolean} sortCombo 本次操作是否需要更新 combo 层级顺序，内部参数，用户在外部使用 addItem 时始终时需要更新
   * @return {Item} 元素实例
   */
  public addItem(
    type: ITEM_TYPE,
    model: ModelConfig,
    stack: boolean = true,
    sortCombo: boolean = true,
  ): Item | boolean {
    const currentComboSorted = this.get('comboSorted');
    this.set('comboSorted', currentComboSorted && !sortCombo);
    const itemController: ItemController = this.get('itemController');

    const item = this.innerAddItem(type, model, itemController);

    if (item === false || item === true) {
      return item;
    }

    const combos = this.get('combos');
    if (combos && combos.length > 0) {
      this.sortCombos();
    }

    this.autoPaint();

    if (stack && this.get('enabledStack')) {
      const addedModel = {
        ...item.getModel() as any,
        itemType: type,
      };
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
        before: {},
        after,
      });
    }

    return item;
  }

  public addItems(
    items: { type: ITEM_TYPE, model: ModelConfig }[] = [],
    stack: boolean = true,
    sortCombo: boolean = true
  ) {
    const currentComboSorted = this.get('comboSorted');
    this.set('comboSorted', currentComboSorted && !sortCombo);
    const itemController: ItemController = this.get('itemController');

    const returnItems: (Item | boolean)[] = [];

    // 1. add anything that is not an edge.
    // Add undefined as a placeholder for the next cycle. This way we return items matching the input order
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type !== 'edge' && item.type !== 'vedge') {
        returnItems.push(this.innerAddItem(item.type, item.model, itemController));
      } else {
        returnItems.push(undefined);
      }
    }

    // 2. add all the edges
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type === 'edge' || item.type === 'vedge') {
        returnItems[i] = this.innerAddItem(item.type, item.model, itemController);
      }
    }

    if (sortCombo) {
      const combos = this.get('combos');
      if (combos && combos.length > 0) {
        this.sortCombos();
      }
    }

    this.autoPaint();

    if (stack && this.get('enabledStack')) {
      const after: GraphData = { nodes: [], edges: [], combos: [] };

      for (let i = 0; i < items.length; i++) {
        const type = items[i].type;
        const returnItem = returnItems[i];
        if (!!returnItem && returnItem !== true) {
          const addedModel: any = {
            ...returnItem.getModel(),
            itemType: type,
          };
          switch (type) {
            case 'node':
              after.nodes.push(addedModel);
              break;
            case 'edge':
              after.edges.push(addedModel);
              break;
            case 'combo':
              after.combos.push(addedModel);
              break;
            default:
              break;
          }
        }
      }

      this.pushStack('addItems', {
        before: {},
        after,
      });
    }

    return returnItems;
  }

  /**
   * 新增元素
   * @param {ITEM_TYPE} type 元素类型(node | edge)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @param {boolean} sortCombo 本次操作是否需要更新 combo 层级顺序，内部参数，用户在外部使用 addItem 时始终时需要更新
   * @return {Item} 元素实例
   */
  public add(
    type: ITEM_TYPE,
    model: ModelConfig,
    stack: boolean = true,
    sortCombo: boolean = true,
  ): Item | boolean {
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
    let currentItem: Item;
    if (isString(item)) {
      currentItem = this.findById(item as string);
    } else {
      currentItem = item;
    }

    const stackEnabled = stack && this.get('enabledStack');
    let unupdatedModel;
    if (stackEnabled) {
      unupdatedModel = clone(currentItem.getModel());
    }

    let type = '';
    if (currentItem.getType) type = currentItem.getType();
    const states = [...currentItem.getStates()];
    if (type === 'combo') {
      each(states, state => this.setItemState(currentItem, state, false));
    }
    itemController.updateItem(currentItem, cfg);

    if (type === 'combo') {
      each(states, state => this.setItemState(currentItem, state, true));
    }

    if (stackEnabled) {
      const before = { nodes: [], edges: [], combos: [] };
      const after = { nodes: [], edges: [], combos: [] };
      const afterModel = {
        id: unupdatedModel.id,
        ...cfg,
      };
      switch (type) {
        case 'node':
          before.nodes.push(unupdatedModel);
          after.nodes.push(afterModel);
          break;
        case 'edge':
          before.edges.push(unupdatedModel);
          after.edges.push(afterModel);
          break;
        case 'combo':
          before.combos.push(unupdatedModel);
          after.combos.push(afterModel);
          break;
        default:
          break;
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
      item = this.findById(item as string);
    }

    const itemController: ItemController = this.get('itemController');
    itemController.setItemState(item, state, value);

    const stateController: StateController = this.get('stateController');
    stateController.updateState(item, state, value);
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
    dataValidation(data);
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

    this.clear(true);

    this.emit('beforerender');

    self.addItems(
      nodes.map(node => ({ type: 'node', model: node })),
      false,
      false
    );

    // process the data to tree structure
    if (combos?.length !== 0) {
      const comboTrees = plainCombosToTrees((combos as ComboConfig[]), (nodes as NodeConfig[]));
      this.set('comboTrees', comboTrees);
      // add combos
      self.addCombos(combos);
    }

    self.addItems(
      edges.map(edge => ({ type: 'edge', model: edge })),
      false,
      false
    );


    const animate = self.get('animate');
    if (self.get('fitView') || self.get('fitCenter')) {
      self.set('animate', false);
    }

    // layout
    const layoutController = self.get('layoutController');
    if (layoutController) {
      layoutController.layout(success);
      if (this.destroyed) return;
    } else {
      success();
    }
    // 将在 onLayoutEnd 中被调用
    function success() {
      // 自底向上将 collapsed 的 combo 合起
      (self.get('comboTrees') || []).forEach(ctree => {
        traverseTreeUp<ComboTree>(ctree, child => {
          const item = self.findById(child.id);
          if (item.getType() === 'combo' && child.collapsed) {
            self.collapseCombo(child.id, false);
            self.updateCombo(item as ICombo);
          }
          return true;
        });
      });
      // fitView 与 fitCenter 共存时，fitView 优先，fitCenter 不再执行
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
      setTimeout(() => {
        self.getCombos()?.forEach(combo => {
          combo.set('animate', true)
        })
      }, 0);
    }

    if (!this.get('groupByTypes')) {
      if (combos && combos.length !== 0) {
        this.sortCombos();
      } else {
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
  protected diffItems(
    type: ITEM_TYPE,
    items: { nodes: INode[]; edges: IEdge[] },
    models: NodeConfig[] | EdgeConfig[],
  ) {
    const self = this;
    let item: INode;
    const itemMap: NodeMap = this.get('itemMap');
    const itemsArray = items[`${type}s`];
    const itemsToAdd: { type: ITEM_TYPE; model: NodeConfig | EdgeConfig }[] = [];

    each(models, (model: NodeConfig | EdgeConfig) => {
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
        itemsToAdd.push({ type, model });
      }

      if (item) {
        itemsArray.push(item);
      }
    });

    if (itemsToAdd.length) {
      const items = self.addItems(itemsToAdd, false);
      for (var i = 0; i < items.length; i++) {
        const item = items[i];
        if (item) {
          itemsArray.push(item);
        }
      }
    }
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {GraphData | TreeGraphData} data 源数据
   * @param {boolean} 是否入栈，默认为true
   * @return {object} this
   */
  public changeData(propsData?: GraphData | TreeGraphData, stack: boolean = true): AbstractGraph {
    const self = this;
    const data = propsData || self.get('data');
    if (!dataValidation(data)) {
      return this;
    }
    this.emit('beforechangedata');
    if (stack && this.get('enabledStack')) {
      this.pushStack('changedata', {
        before: self.save(),
        after: data,
      });
    }
    this.set('comboSorted', false);

    // 删除 hulls
    this.removeHulls();

    // 更改数据源后，取消所有状态
    this.getNodes().map(node => self.clearItemStates(node));
    this.getEdges().map(edge => self.clearItemStates(edge));

    const canvas: ICanvas = this.get('canvas');
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
    } else {
      this.set('comboTrees', []);
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

    // 自底向上将 collapsed 的 combo 合起
    (this.get('comboTrees') || []).forEach(ctree => {
      traverseTreeUp<ComboTree>(ctree, child => {
        const item = this.findById(child.id);
        if (item.getType() === 'combo' && child.collapsed) {
          this.collapseCombo(child.id, false);
        }
        return true;
      });
    });

    this.set({ nodes: items.nodes, edges: items.edges });

    const { relayoutAtChangeData = true } = this.get('layout') || {};
    const layoutController = this.get('layoutController');
    if (relayoutAtChangeData && layoutController) {
      layoutController.changeData(() => {
        setTimeout(() => {
          self.getCombos()?.forEach(combo => {
            combo.set('animate', true)
          })
        }, 0);
      });

      if (self.get('animate') && !layoutController.getLayoutType()) {
        // 如果没有指定布局
        self.positionsAnimate();
        self.getCombos()?.forEach(combo => combo.set('animate', true))
      } else {
        self.autoPaint();
      }
    }

    setTimeout(() => {
      canvas.set('localRefresh', localRefresh);
    }, 16);
    this.set('data', data);
    this.emit('afterchangedata');
    return this;
  }

  /**
   * 私有方法，在 render 和 changeData 的时候批量添加数据中所有平铺的 combos
   * @param {ComboConfig[]} combos 平铺的 combos 数据
   */
  protected addCombos(combos: ComboConfig[]) {
    const self = this;
    const comboTrees = self.get('comboTrees');
    const itemController: ItemController = this.get('itemController');
    itemController.addCombos(comboTrees, combos);
  }

  /**
   * 根据已经存在的节点或 combo 创建新的 combo
   * @param combo combo ID 或 Combo 配置
   * @param childrenIds 添加到 Combo 中的元素，包括节点和 combo
   */
  public createCombo(combo: string | ComboConfig, childrenIds: string[], stack: boolean = true): void {
    const itemController: ItemController = this.get('itemController');

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

    const shouldStack = stack && this.get('enabledStack');

    // cache the children's old parent for stack
    const childrenParentCache = { nodes: [], combos: [] };
    if (shouldStack) {
      childrenIds.forEach(childId => {
        const childItem = this.findById(childId);
        const childType = childItem.getType();
        if (childType !== 'node' && childType !== 'combo') return;
        const childModel = childItem.getModel();
        childrenParentCache[`${childType}s`].push({
          id: childId,
          parentId: childType === 'node' ? childModel.comboId : childModel.parentId,
        })
      });
    }

    // step 2: Pull children out of their parents
    let comboTrees = this.get('comboTrees');
    const childrenIdsSet = new Set<string>(childrenIds);
    const pulledComboTreesById = new Map<string, ComboTree>();

    if (comboTrees) {
      comboTrees.forEach(ctree => {
        traverseTreeUp<ComboTree>(ctree, (treeNode, parentTreeNode, index) => {
          if (childrenIdsSet.has(treeNode.id)) {
            if (parentTreeNode) {
              const parentItem = this.findById(parentTreeNode.id) as ICombo;
              const item = this.findById(treeNode.id) as INode | ICombo;

              // Removing current item from the tree during the traversal is ok because children traversal is done
              // in an *inverse order* - indices of the next-traversed items are not disturbed by the removal.
              parentTreeNode.children.splice(index, 1);
              parentItem.removeChild(item);

              // We have to update the parent node geometry since nodes were removed from them, _while they are still visible_
              // (combos may be moved inside the new combo and become hidden)
              itemController.updateCombo(parentItem, parentTreeNode.children);
            }

            if (treeNode.itemType === 'combo') {
              pulledComboTreesById.set(treeNode.id, treeNode);
            }
          }

          return true;
        });
      });
      comboTrees = comboTrees.filter(ctree => !childrenIdsSet.has(ctree.id));

      this.set('comboTrees', comboTrees);
    }

    // step 3: 更新 children，根据类型添加 comboId 或 parentId
    const newChildrenParent = { nodes: [], combos: [] };
    const trees: ComboTree[] = childrenIds.map(elementId => {
      const item = this.findById(elementId);
      const model = item.getModel();

      let type = '';
      if (item.getType) type = item.getType();

      // Combos will be just moved around, so their children can be preserved
      const cItem: ComboTree = pulledComboTreesById.get(elementId) || {
        id: item.getID(),
        itemType: type as 'node' | 'combo',
      };

      if (type === 'combo') {
        (cItem as ComboConfig).parentId = comboId;
        model.parentId = comboId;
      } else if (type === 'node') {
        (cItem as NodeConfig).comboId = comboId;
        model.comboId = comboId;
      }
      if (shouldStack) {
        newChildrenParent[`${type}s`].push({
          id: model.id,
          parentId: comboId
        });
      }

      return cItem;
    });

    comboConfig.children = trees;

    // step 4: 添加 Combo，addItem 时会将子将元素添加到 Combo 中
    this.addItem('combo', comboConfig, false);
    this.set('comboSorted', false);

    // step 5: 更新 comboTrees 结构
    if (comboTrees) {
      comboTrees.forEach(ctree => {
        traverseTree<ComboTree>(ctree, (treeNode) => {
          // Set the children to the newly created combo
          if (treeNode.id === comboId) {
            treeNode.itemType = 'combo';
            treeNode.children = trees as ComboTree[];
            return false;
          }

          return true;
        });
      });

      this.sortCombos();
    }

    if (shouldStack) {
      newChildrenParent.combos.push(comboConfig);
      this.pushStack('createCombo', {
        before: childrenParentCache,
        after: newChildrenParent
      });
    }

    // Fixes issue of nested child combos not being interactive (under parent on graph).
    const comboItem = this.findById(comboId) as ICombo;

    if (!comboItem.getModel().parentId && comboItem.getChildren().combos.length) {
      this.updateComboTree(comboItem, undefined, false);
    }

    setTimeout(() => {
      comboItem.set('animate', true);
    }, 0);
  }

  /**
   * 解散 combo
   * @param {String | INode | ICombo} combo 需要被解散的 Combo item 或 id
   */
  public uncombo(combo: string | ICombo, stack: boolean = true) {
    const self = this;
    let comboItem: ICombo = combo as ICombo;
    if (isString(combo)) {
      comboItem = this.findById(combo) as ICombo;
    }

    if (!comboItem || (comboItem.getType && comboItem.getType() !== 'combo')) {
      console.warn('The item is not a combo!');
      return;
    }

    const comboModel = comboItem.getModel();
    const parentId = comboItem.getModel().parentId;
    let comboTrees = self.get('comboTrees');
    if (!comboTrees) comboTrees = [];
    const itemMap = this.get('itemMap');
    const comboId = comboItem.get('id');
    let treeToBeUncombo;
    let brothers = [];
    const comboItems = this.get('combos');
    const parentItem = this.findById(parentId as string) as ICombo;


    const shouldStack = stack && this.get('enabledStack');
    let comboConfig: any = {};
    if (shouldStack) {
      comboConfig = clone(comboModel);
      comboConfig.children = [];
    }

    comboTrees.forEach(ctree => {
      if (treeToBeUncombo) return; // terminate the forEach
      traverseTreeUp<ComboTree>(ctree, subtree => {
        // find the combo to be uncomboed, delete the combo from map and cache
        if (subtree.id === comboId) {
          treeToBeUncombo = subtree;
          // delete the related edges
          const edgeIds = comboItem.getEdges().map(edge => edge.getID());
          edgeIds.forEach(edgeId => {
            this.removeItem(edgeId, false);
          });
          const index = comboItems.indexOf(comboItem);
          comboItems.splice(index, 1);
          delete itemMap[comboId];
          const itemModel = clone(comboItem.getModel());
          comboItem.destroy();
          this.emit('afterremoveitem', { item: itemModel, type: 'combo' });
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
          treeToBeUncombo.children?.forEach(child => {
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
          this.updateCombo(parentItem);
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
      treeToBeUncombo.children?.forEach(child => {
        child.parentId = undefined;
        const childModel = this.findById(child.id).getModel();
        delete childModel.parentId; // update the parentId of the model
        delete childModel.comboId; // update the comboId of the model
        if (child.itemType !== 'node') comboTrees.push(child);
      });
    }

    if (shouldStack) {
      // cache the children's old parent and combo model for stack
      const childrenParentCache = { nodes: [], combos: [] };
      const childNewParent = { nodes: [], combos: [] };
      treeToBeUncombo.children?.forEach(child => {
        const childItem = this.findById(child.id);
        const childType = childItem.getType();
        if (childType !== 'node' && childType !== 'combo') return;
        childrenParentCache[`${childType}s`].push({
          id: child.id,
          parentId: comboId
        });
        childNewParent[`${childType}s`].push({
          id: child.id,
          parentId
        });
      });

      childrenParentCache.combos.push(comboConfig);
      this.pushStack('uncombo', {
        before: childrenParentCache,
        after: childNewParent
      });
    }
  }

  /**
   * 根据 combo 位置更新内部节点位置 followCombo = true
   * 或根据内部元素的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围，followCombo = false
   */
  public updateCombos(followCombo: boolean = false) {
    const self = this;
    const comboTrees = this.get('comboTrees');
    const itemController: ItemController = self.get('itemController');

    const itemMap = self.get('itemMap');
    (comboTrees || []).forEach((ctree: ComboTree) => {
      traverseTreeUp<ComboTree>(ctree, child => {
        if (!child) {
          return true;
        }
        const childItem = itemMap[child.id];
        if (childItem?.getType?.() === 'combo') {
          // 更新具体的 Combo 之前先清除所有的已有状态，以免将 state 中的样式更新为 Combo 的样式
          const states = [...childItem.getStates()];
          each(states, state => this.setItemState(childItem, state, false));

          // 更新具体的 Combo
          itemController.updateCombo(childItem, child.children, followCombo);

          // 更新 Combo 后，还原已有的状态
          each(states, state => this.setItemState(childItem, state, true));
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
      traverseTreeUp<ComboTree>(ctree, child => {
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
          each(states, state => {
            if (childItem.getStateStyle(state)) {
              this.setItemState(childItem, state, false);
            }
          });

          // 更新具体的 Combo
          itemController.updateCombo(childItem, child.children);

          // 更新 Combo 后，还原已有的状态
          each(states, state => {
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
  public updateComboTree(
    item: string | INode | ICombo,
    parentId?: string | undefined,
    stack: boolean = true,
  ) {
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

    let type = '';
    if (uItem.getType) type = uItem.getType();

    // 若 item 是 Combo，且 parentId 是其子孙 combo 的 id，则警告并终止
    if (parentId && type === 'combo') {
      const comboTrees = this.get('comboTrees');
      let valid = true;
      let itemSubTree;
      (comboTrees || []).forEach(ctree => {
        if (itemSubTree) return;
        traverseTree(ctree, subTree => {
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
      });
      // parentId 是 item 的一个后继元素，不能进行更新
      if (!valid) {
        console.warn(
          'Failed to update the combo tree! The parentId points to a descendant of the combo!',
        );
        return;
      }
    }

    if (stack && this.get('enabledStack')) {
      const beforeData: GraphData = {},
        afterData: GraphData = {};
      if (type === 'combo') {
        beforeData.combos = [
          {
            id: model.id,
            parentId: (model as ComboConfig).parentId,
          },
        ];
        afterData.combos = [
          {
            id: model.id,
            parentId,
          },
        ];
      } else if (type === 'node') {
        beforeData.nodes = [
          {
            id: model.id,
            parentId: (model as NodeConfig).comboId,
          },
        ];
        afterData.nodes = [
          {
            id: model.id,
            parentId,
          },
        ];
      }
      this.pushStack('updateComboTree', {
        before: beforeData,
        after: afterData,
      });
    }

    // 当 combo 存在 parentId 或 comboId 时，才将其移除
    if (model.parentId || model.comboId) {
      const combo = this.findById((model.parentId || model.comboId) as string) as ICombo;
      if (combo) {
        combo.removeChild(uItem);
      }
    }

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
  public save(): GraphData | TreeGraphData {
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
  public changeSize(width: number, height: number): AbstractGraph {
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
  public positionsAnimate(referComboModel?: boolean): void {
    const self = this;
    self.emit('beforeanimate');

    const animateCfg: GraphAnimateConfig = self.get('animateCfg');

    const { onFrame } = animateCfg;

    const nodes = referComboModel ? self.getNodes().concat(self.getCombos()) : self.getNodes();

    const toNodes = nodes.map(node => {
      const model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y,
      };
    });

    self.stopAnimate();

    const canvas: ICanvas = self.get('canvas');

    self.animating = true;
    setTimeout(() => {
      canvas.animate(
        (ratio: number) => {
          each(toNodes, data => {
            const node: Item = self.findById(data.id);

            if (!node || node.destroyed) {
              return;
            }

            let originAttrs: Point = node.get('originAttrs');

            const model: NodeConfig = node.get('model');

            const containerMatrix = node.getContainer().getMatrix();

            if (originAttrs === undefined || originAttrs === null) {
              // 变换前存在位置，设置到 originAttrs 上。否则标记 0 表示变换前不存在位置，不需要计算动画
              if (containerMatrix) {
                originAttrs = {
                  x: containerMatrix[6],
                  y: containerMatrix[7],
                }
              }
              node.set('originAttrs', originAttrs || 0);
            }

            if (onFrame) {
              const attrs = onFrame(node, ratio, data, originAttrs || { x: 0, y: 0 });
              node.set('model', Object.assign(model, attrs));
            } else if (originAttrs) {
              // 变换前存在位置，进行动画
              model.x = originAttrs.x + (data.x - originAttrs.x) * ratio;
              model.y = originAttrs.y + (data.y - originAttrs.y) * ratio;
            } else {
              // 若在变换前不存在位置信息，则直接放到最终位置上
              model.x = data.x;
              model.y = data.y;
            }
          });

          self.refreshPositions(referComboModel);
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
    }, 0);
  }

  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  public refreshPositions(referComboModel?: boolean) {
    const self = this;
    self.emit('beforegraphrefreshposition');

    const nodes: INode[] = self.get('nodes');
    const edges: IEdge[] = self.get('edges');
    const vedges: IEdge[] = self.get('vedges');
    const combos: ICombo[] = self.get('combos');

    let model: NodeConfig | ComboConfig;

    const updatedNodes: { [key: string]: boolean } = {};

    const updateItems = (items) => {
      each(items, (item: INode) => {
        model = item.getModel() as NodeConfig | ComboConfig;
        const originAttrs = item.get('originAttrs');
        if (originAttrs && model.x === originAttrs.x && model.y === originAttrs.y) {
          return;
        }
        const changed = item.updatePosition({ x: model.x!, y: model.y! });
        updatedNodes[model.id] = changed;
        if (model.comboId) updatedNodes[(model as NodeConfig).comboId] = updatedNodes[(model as NodeConfig).comboId] || changed;
        if (model.parentId) updatedNodes[(model as ComboConfig).parentId] = updatedNodes[(model as ComboConfig).parentId] || changed;
      });
    }

    updateItems(combos);
    updateItems(nodes);

    if (combos && combos.length !== 0) {
      if (referComboModel) {
        updateItems(combos);
        self.updateCombos();
      } else {
        self.updateCombos();
      }
    }

    each(edges, (edge: IEdge) => {
      const sourceModel = edge.getSource().getModel();
      const target = edge.getTarget();
      // 避免 target 是纯对象的情况下调用 getModel 方法
      // 拖动生成边的时候 target 会是纯对象
      if (!isPlainObject(target)) {
        const targetModel = (target as INode | ICombo).getModel();
        if (
          updatedNodes[sourceModel.id as string] ||
          updatedNodes[targetModel.id as string] ||
          edge.getModel().isComboEdge
        ) {
          edge.refresh();
        }
      }
    });

    each(vedges, (vedge: IEdge) => {
      vedge.refresh();
    });

    self.emit('aftergraphrefreshposition');
    self.autoPaint();
  }

  public stopAnimate(): void {
    const canvas = this.get('canvas');
    const timeline = canvas.cfg.timeline;
    if (timeline) {
      timeline.stopAllAnimations();
    }
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
  public setMode(mode: string): AbstractGraph {
    const modeController: ModeController = this.get('modeController');
    modeController.setMode(mode);
    return this;
  }

  /**
   * 清除画布元素
   * @return {object} this
   */
  public clear(avoidEmit: boolean = false): AbstractGraph {
    this.get('canvas')?.clear();

    this.initGroups();

    // 清空画布时同时清除数据
    this.set({ itemMap: {}, nodes: [], edges: [], vedges: [], groups: [], combos: [], comboTrees: [] });
    if (!avoidEmit) this.emit('afterrender');
    return this;
  }

  /**
   * 更换布局配置项
   * @param {object} cfg 新布局配置项
   * @param {'center' | 'begin'} align 对齐方式，可选中心（center）对齐到对齐点，或左上角（begin）对齐到对齐点
   * @param {IPoint} alignPoint 画布上的对齐点，为 Canvas 坐标系（Canvas DOM）
   * 若 cfg 含有 type 字段或为 String 类型，且与现有布局方法不同，则更换布局
   * 若 cfg 不包括 type ，则保持原有布局方法，仅更新布局配置项
   */
  public updateLayout(cfg: any = {}, align?: 'center' | 'begin', alignPoint?: IPoint, stack: boolean = true): void {
    const layoutController = this.get('layoutController');

    if (isString(cfg)) {
      cfg = {
        type: cfg,
      };
    }

    // align the graph after layout
    if (align) {
      let toPoint = alignPoint;
      if (!toPoint) {
        if (align === 'begin') toPoint = { x: 0, y: 0 };
        else toPoint = { x: this.getWidth() / 2, y: this.getHeight() / 2 };
      }
      // translate to point coordinate system
      toPoint = this.getPointByCanvas(toPoint.x, toPoint.y);

      const forceTypes = ['force', 'gForce', 'fruchterman', 'force2'];

      // if it is force layout, only center takes effect, and assign center force
      if (forceTypes.includes(cfg.type) || (!cfg.type && forceTypes.includes(layoutController?.layoutType))) {
        cfg.center = [toPoint.x, toPoint.y];
      } else {
        this.once('afterlayout', e => {
          const matrix = this.getGroup().getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
          toPoint.x = toPoint.x * matrix[0] + matrix[6];
          toPoint.y = toPoint.y * matrix[0] + matrix[7];

          const { minX, maxX, minY, maxY } = this.getGroup().getCanvasBBox();
          const bboxPoint = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
          if (align === 'begin') {
            bboxPoint.x = minX;
            bboxPoint.y = minY;
          }

          this.translate(toPoint.x - bboxPoint.x, toPoint.y - bboxPoint.y);
        });
      }
    }

    const oriLayoutCfg = { ...this.get('layout') };
    const layoutCfg: any = {};
    Object.assign(layoutCfg, oriLayoutCfg, cfg);
    if (cfg.pipes && !cfg.type) delete layoutCfg.type;
    else if (!cfg.pipes && layoutCfg.type) delete layoutCfg.pipes;
    this.set('layout', layoutCfg);

    if (!layoutController) return;
    if (
      layoutController.isLayoutTypeSame(layoutCfg) &&
      layoutCfg.gpuEnabled === oriLayoutCfg.gpuEnabled
    ) {
      // no type or same type, or switch the gpu and cpu, update layout
      layoutController.updateLayoutCfg(layoutCfg);
    } else {
      // has different type, change layout
      layoutController.changeLayout(layoutCfg);
    }

    if (stack && this.get('enabledStack')) {
      this.pushStack('layout', { before: oriLayoutCfg, after: layoutCfg });
    }
  }

  /**
   * 销毁布局，changeData 时不会再使用原来的布局方法对新数据进行布局
   */
  public destroyLayout(): void {
    const layoutController = this.get('layoutController');
    layoutController?.destroyLayout();
  }

  /**
   * 重新以当前示例中配置的属性进行一次布局
   */
  public layout(): void {
    const layoutController = this.get('layoutController');
    const layoutCfg = this.get('layout');
    if (!layoutCfg || !layoutController) return;

    if (layoutCfg.workerEnabled) {
      // 如果使用web worker布局
      layoutController.layout();
      return;
    }
    if (layoutController.layoutMethods?.length) {
      layoutController.relayout(true);
    } else {
      layoutController.layout();
    }
  }

  /**
   * 收起指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */
  public collapseCombo(combo: string | ICombo, stack: boolean = true): void {
    if (this.destroyed) return;
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (!combo) {
      console.warn('The combo to be collapsed does not exist!');
      return;
    }
    this.emit('beforecollapseexpandcombo', { action: 'collapse', item: combo });

    const comboModel = combo.getModel();

    const itemController: ItemController = this.get('itemController');
    itemController.collapseCombo(combo, stack);
    comboModel.collapsed = true;

    // add virtual edges
    const edges = this.getEdges().concat(this.get('vedges'));

    // find all the descendant nodes and combos
    let cNodesCombos = [];
    const comboTrees = this.get('comboTrees');
    let found = false;
    (comboTrees || []).forEach(ctree => {
      if (found) return; // if the combo is found, terminate the forEach
      traverseTree(ctree, subTree => {
        // if the combo is found and it is traversing the other branches, terminate
        if (found && subTree.depth <= comboModel.depth) return false;
        // if the combo is found
        if (comboModel.id === subTree.id) found = true;
        if (found) {
          // if the combo is found, concat the descendant nodes and combos
          const item = this.findById(subTree.id) as ICombo;
          if (item && item.getType && item.getType() === 'combo') {
            cNodesCombos = cNodesCombos.concat(item.getNodes());
            cNodesCombos = cNodesCombos.concat(item.getCombos());
          }
        }
        return true;
      });
    });

    const addedVEdgeMap = {};
    edges.forEach(edge => {
      const { isVEdge, size = 1 } = edge.getModel();
      if (edge.isVisible() && !isVEdge) return;
      const source = edge.getSource();
      const target = edge.getTarget();
      let otherEnd = null;
      let otherEndIsSource;
      if (source.getModel().id === comboModel.id ||
        (cNodesCombos.includes(source) && !cNodesCombos.includes(target))) {
        // source is the current combo, or descent node/combo is the source but not the target)
        otherEnd = target;
        otherEndIsSource = false;
      } else if (target.getModel().id === comboModel.id ||
        (!cNodesCombos.includes(source) && cNodesCombos.includes(target))
      ) {
        // target is the current combo, or descent node/combo is the target but not the source)
        otherEnd = source;
        otherEndIsSource = true;
      }

      if (otherEnd) {
        if (isVEdge) {
          this.removeItem(edge, false);
          return;
        }
        let otherEndModel = otherEnd.getModel();
        while (!otherEnd.isVisible()) {
          const { parentId: otherEndPId, comboId: otherEndCId } = otherEndModel;
          const otherEndParentId = otherEndPId || otherEndCId;
          otherEnd = this.findById(otherEndParentId) as ICombo;
          if (!otherEnd || !otherEndParentId) return; // all the ancestors are hidden, then ignore the edge
          otherEndModel = otherEnd.getModel();
        }

        const otherEndId = otherEndModel.id;

        const vEdgeInfo = otherEndIsSource ? {
          source: otherEndId,
          target: comboModel.id,
          size,
          isVEdge: true,
        } : {
          source: comboModel.id,
          target: otherEndId,
          size,
          isVEdge: true,
        };
        const key = `${vEdgeInfo.source}-${vEdgeInfo.target}`;
        if (addedVEdgeMap[key]) {
          addedVEdgeMap[key].size += size;
          return;
        } else {
          const inverseKey = `${vEdgeInfo.target}-${vEdgeInfo.source}`;
          if (addedVEdgeMap[inverseKey]) {
            addedVEdgeMap[inverseKey].size += size;
            return;
          }
        }
        addedVEdgeMap[key] = vEdgeInfo;
      }
    });

    // update the width of the virtual edges, which is the sum of merged actual edges
    // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges
    this.addItems(
      Object.values(addedVEdgeMap).map(edgeInfo => ({ type: 'vedge', model: edgeInfo as EdgeConfig })),
      false
    );
    this.emit('aftercollapseexpandcombo', { action: 'collapse', item: combo });
  }

  /**
   * 展开指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */
  public expandCombo(combo: string | ICombo, stack: boolean = true): void {
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (!combo || (combo.getType && combo.getType() !== 'combo')) {
      console.warn('The combo to be collapsed does not exist!');
      return;
    }
    this.emit('beforecollapseexpandcombo', { action: 'expand', item: combo });

    const comboModel = combo.getModel();

    const itemController: ItemController = this.get('itemController');
    itemController.expandCombo(combo, stack);
    comboModel.collapsed = false;

    // add virtual edges
    const edges = this.getEdges().concat(this.get('vedges'));

    // find all the descendant nodes and combos
    let cNodesCombos = [];
    const comboTrees = this.get('comboTrees');
    let found = false;
    (comboTrees || []).forEach(ctree => {
      if (found) return; // if the combo is found, terminate
      traverseTree(ctree, subTree => {
        // if the combo is found and it is traversing the other branches, terminate
        if (found && subTree.depth <= comboModel.depth) return false;
        if (comboModel.id === subTree.id) found = true;
        if (found) {
          const item = this.findById(subTree.id) as ICombo;
          if (item && item.getType && item.getType() === 'combo') {
            cNodesCombos = cNodesCombos.concat(item.getNodes());
            cNodesCombos = cNodesCombos.concat(item.getCombos());
          }
        }
        return true;
      });
    });

    const addedVEdgeMap = {};
    edges.forEach(edge => {
      if (edge.isVisible() && !edge.getModel().isVEdge) return;
      const source = edge.getSource();
      const target = edge.getTarget();
      const sourceId = source.get('id');
      const targetId = target.get('id');
      let otherEnd = null;
      let otherEndIsSource;
      if (sourceId === comboModel.id ||
        (cNodesCombos.includes(source) && !cNodesCombos.includes(target))
      ) {
        // the source is in the combo, the target is not
        otherEnd = target;
        otherEndIsSource = false;
      } else if (targetId === comboModel.id ||
        (!cNodesCombos.includes(source) && (cNodesCombos.includes(target)))
      ) {
        // the target is in the combo, the source is not
        otherEnd = source;
        otherEndIsSource = true;
      } else if (cNodesCombos.includes(source) && cNodesCombos.includes(target)) {
        // both source and target are in the combo, if the target and source are both visible, show the edge
        if (source.isVisible() && target.isVisible()) {
          edge.show();
        }
      }

      if (otherEnd) {
        const { isVEdge, size = 1 } = edge.getModel();
        // ignore the virtual edges
        if (isVEdge) {
          this.removeItem(edge, false);
          return;
        }

        let otherEndModel = otherEnd.getModel();
        // find the nearest visible ancestor
        while (!otherEnd.isVisible()) {
          const { parentId: otherEndPId, comboId: otherEndCId } = otherEndModel;
          const otherEndParentId = otherEndPId || otherEndCId;
          otherEnd = this.findById(otherEndParentId) as ICombo;
          if (!otherEnd || !otherEndParentId) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }
          otherEndModel = otherEnd.getModel();
        }
        const otherEndId = otherEndModel.id;

        let selfEnd = otherEndIsSource ? target : source;
        let selfEndModel = selfEnd.getModel();
        // find the nearest visible ancestor
        while (!selfEnd.isVisible()) {
          const { parentId: selfEndPId, comboId: selfEndCId } = selfEndModel;
          const selfEndParentId = (selfEndPId || selfEndCId) as string;
          selfEnd = this.findById(selfEndParentId) as ICombo;
          if (!selfEnd || !selfEndParentId) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }
          if (selfEndModel.comboId === comboModel.id || selfEndModel.parentId === comboModel.id) {
            break; // if the next ancestor is the combo, break the while
          }
          selfEndModel = selfEnd.getModel();
        }
        const selfEndId = selfEndModel.id;

        if (otherEndId) {
          const vEdgeInfo = otherEndIsSource ? {
            source: otherEndId,
            target: selfEndId,
            isVEdge: true,
            size
          } : {
            source: selfEndId,
            target: otherEndId,
            isVEdge: true,
            size
          }
          const vedgeId = `${vEdgeInfo.source}-${vEdgeInfo.target}`;
          // update the width of the virtual edges, which is the sum of merged actual edges
          // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges
          if (addedVEdgeMap[vedgeId]) {
            addedVEdgeMap[vedgeId].size += size;
            return;
          }
          addedVEdgeMap[vedgeId] = vEdgeInfo;
        }
      }
    });
    this.addItems(
      Object.values(addedVEdgeMap).map(edgeInfo => ({ type: 'vedge', model: edgeInfo as EdgeConfig })),
      false
    )
    this.emit('aftercollapseexpandcombo', { action: 'expand', item: combo });
  }

  public collapseExpandCombo(combo: string | ICombo, stack: boolean = true) {
    if (isString(combo)) {
      combo = this.findById(combo) as ICombo;
    }
    if (!combo || (combo.getType && combo.getType() !== 'combo')) return;

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
      this.expandCombo(combo, stack);
    } else {
      this.collapseCombo(combo, stack);
    }
    this.updateCombo(combo);
  }

  /**
   * 根据 comboTree 结构整理 Combo 相关的图形绘制层级，包括 Combo 本身、节点、边
   * @param {GraphData} data 数据
   */
  protected sortCombos = debounce(
    () => {
      const comboSorted = this.get('comboSorted');
      if (!this || this.destroyed || comboSorted) return;
      this.set('comboSorted', true);
      const depthMap = [];
      const dataDepthMap = {};
      const comboTrees = this.get('comboTrees');
      (comboTrees || []).forEach(cTree => {
        traverseTree(cTree, child => {
          if (depthMap[child.depth]) depthMap[child.depth].push(child.id);
          else depthMap[child.depth] = [child.id];
          dataDepthMap[child.id] = child.depth;
          return true;
        });
      });
      const edges = this.getEdges().concat(this.get('vedges'));
      (edges || []).forEach(edgeItem => {
        const edge = edgeItem.getModel();
        const sourceDepth: number = dataDepthMap[edge.source as string] || 0;
        const targetDepth: number = dataDepthMap[edge.target as string] || 0;
        const depth = Math.max(sourceDepth, targetDepth);
        if (depthMap[depth]) depthMap[depth].push(edge.id);
        else depthMap[depth] = [edge.id];
      });
      depthMap.forEach(array => {
        if (!array || !array.length) return;
        for (let i = array.length - 1; i >= 0; i--) {
          const item = this.findById(array[i]);
          if (item) item.toFront();
        }
      });
    },
    500,
    false
  )

  /**
   * 获取节点所有的邻居节点
   *
   * @param {(string | INode)} node 节点 ID 或实例
   * @returns {INode[]}
   * @memberof IAbstractGraph
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
   * @memberof IAbstractGraph
   */
  public getNodeDegree(
    node: string | INode,
    type: 'in' | 'out' | 'total' | 'all' | undefined = undefined,
    refresh: boolean = false,
  ): Number | Object {
    let item = node as INode;
    if (isString(node)) {
      item = this.findById(node) as INode;
    }
    let degrees = this.get('degrees');
    if (!degrees || refresh) {
      degrees = getDegree(this.save() as any);
      this.set('degrees', degrees);
    }
    const nodeDegrees = degrees[item.getID()];

    let res = 0;
    // 如果是通过 addItem 后面新增加的节点，此时它的所有度数都为 0
    if (!nodeDegrees) {
      return 0;
    }

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

      this.emit('stackchange', {
        undoStack: this.undoStack,
        redoStack: this.redoStack,
      });
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

    const stackData = data
      ? clone(data)
      : {
        before: {},
        after: clone(this.save()),
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
      action,
      stackType,
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
   * @memberof IAbstractGraph
   */
  public getAdjMatrix(cache: boolean = true, directed?: boolean): Number | Object {
    if (directed === undefined) directed = this.get('directed');
    let currentAdjMatrix = this.get('adjMatrix');
    if (!currentAdjMatrix || !cache) {
      currentAdjMatrix = getAdjacentMatrix(this.save() as any, directed);
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
   * @memberof IAbstractGraph
   */
  public getShortestPathMatrix(cache: boolean = true, directed?: boolean): Number | Object {
    if (directed === undefined) directed = this.get('directed');
    let currentAdjMatrix = this.get('adjMatrix');
    let currentShourtestPathMatrix = this.get('shortestPathMatrix');
    if (!currentAdjMatrix || !cache) {
      currentAdjMatrix = getAdjacentMatrix(this.save() as any, directed);
      this.set('adjMatrix', currentAdjMatrix);
    }
    if (!currentShourtestPathMatrix || !cache) {
      currentShourtestPathMatrix = floydWarshall(this.save() as any, directed);
      this.set('shortestPathMatrix', currentShourtestPathMatrix);
    }
    return currentShourtestPathMatrix;
  }

  /**
   * 重新定义监听函数，复写参数类型
   */
  public on<T = IG6GraphEvent>(eventName: G6Event, callback: (e: T) => void, once?: boolean): this {
    return super.on(eventName, callback, once);
  }

  /**
   * 销毁画布
   */
  public destroy() {
    this.emit('beforedestroy');

    this.clear();

    // 清空栈数据
    this.clearStack();

    this.get('itemController')?.destroy();
    this.get('modeController')?.destroy();
    this.get('viewController')?.destroy();
    this.get('stateController')?.destroy();
    this.get('canvas')?.destroy();

    (this.cfg as any) = null;
    this.destroyed = true;
    this.redoStack = null;
    this.undoStack = null;

    this.emit('afterdestroy');
  }

  /**
   * 创建凸包或凹包轮廓
   * @param cfg HullCfg 轮廓配置项
   */
  public createHull(cfg: HullCfg) {
    if (!cfg.members || cfg.members.length < 1) {
      console.warn('Create hull failed! The members is empty.');
      return;
    }
    let parent = this.get('hullGroup');
    let hullMap = this.get('hullMap');
    if (!hullMap) {
      hullMap = {};
      this.set('hullMap', hullMap);
    }
    if (!parent || parent.get('destroyed')) {
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
   * @return {[key: string]: Hull} Hull 的 map，hullId 对应的 hull 实例
   */
  public getHulls(): { [key: string]: Hull } {
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
    delete this.get('hullMap')?.[hullInstance.id];
    hullInstance.destroy();
  }

  public removeHulls() {
    const hulls = this.getHulls();
    if (!hulls || !Object.keys(hulls).length) return;
    Object.keys(hulls).forEach(key => {
      const hull = hulls[key];
      hull.destroy();
    });
    this.set('hullMap', {});
  }
}
