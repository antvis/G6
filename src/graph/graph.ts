import EventEmitter from '@antv/event-emitter'
import { IGroup } from '@antv/g-base/lib/interfaces';
import { BBox, Point } from '@antv/g-base/lib/types';
import GCanvas from '@antv/g-canvas/lib/canvas'
import Canvas from '@antv/g-canvas/lib/canvas';
import Group from '@antv/g-canvas/lib/group';
import { mat3 } from '@antv/matrix-util/lib';
import clone from '@antv/util/lib/clone';
import deepMix from '@antv/util/lib/deep-mix'
import each from '@antv/util/lib/each'
import isPlainObject from '@antv/util/lib/is-plain-object';
import isString from '@antv/util/lib/is-string'
import { GraphAnimateConfig, GraphOptions, IGraph, IModeOption, IModeType, IStates } from '@g6/interface/graph';
import { IEdge, INode } from '@g6/interface/item';
import { EdgeConfig, GraphData, GroupConfig, Item, ITEM_TYPE, Matrix, ModelConfig, NodeConfig, NodeMapConfig, Padding } from '@g6/types';
import { move, translate } from '@g6/util/math'
import Global from '../global'
import { EventController, ItemController, ModeController, StateController, ViewController } from './controller'

const NODE = 'node'
const EDGE = 'edge'

interface IGroupBBox {
  [key:string]: BBox;
}

interface PrivateGraphOption extends GraphOptions {
  data: GraphData;

  // capture event
  event: boolean;

  nodes: NodeConfig[];

  edges: EdgeConfig[];

  groups: GroupConfig[];

  itemMap: NodeMapConfig;

  callback: () => void;

  groupBBoxs: IGroupBBox;

  groupNodes: NodeMapConfig;

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
  private animating: boolean
  private _cfg: GraphOptions
  public destroyed: boolean

  constructor(cfg: GraphOptions) {
    super()
    this._cfg = deepMix(this.getDefaultCfg(), cfg)
    this.init()
    this.animating = false
    this.destroyed = false
  }

  private init() {
    this.initCanvas()

    // instance controller
    const eventController = new EventController(this)
    const viewController = new ViewController(this)
    const modeController = new ModeController(this)
    const itemController = new ItemController(this)
    const stateController = new StateController(this)

    this.set({
      eventController,
      viewController,
      modeController,
      itemController,
      stateController
    })

    // TODO  缺少初始化plugin的方法的实现
    this.initPlugin()
  }

  private initCanvas() {
    let container: string | HTMLElement = this.get('container')
    if(isString(container)) {
      container = document.getElementById(container)
      this.set('container', container)
    }

    if(!container) {
      throw new Error('invalid container')
    }

    const width: number = this.get('width')
    const height: number = this.get('height')
    const pixelRatio: number = this.get('pixelRatio')

    const canvas = new GCanvas({
      container,
      width,
      height,
      pixelRatio
    })

    this.set('canvas', canvas)

    this.initGroups()
  }

  private initPlugin(): void {

  }

  // 初始化所有 Group
  private initGroups(): void {
    const canvas: Canvas = this.get('canvas');
    const id: string = this.get('canvas').get('el').id;

    const group: IGroup = canvas.addGroup({ 
      id: `${id}-root`, 
      className: Global.rootContainerClassName 
    });
    
    if (this.get('groupByTypes')) {
      const edgeGroup: IGroup = group.addGroup({ 
        id: `${id}-edge`, 
        className: Global.edgeContainerClassName 
      });

      const nodeGroup: IGroup = group.addGroup({ 
        id: `${id}-node`, 
        className: Global.nodeContainerClassName 
      });

      const delegateGroup: IGroup = group.addGroup({
        id: `${id}-delagate`,
        className: Global.delegateContainerClassName
      });

      // 用于存储自定义的群组
      const customGroup: IGroup = group.addGroup({
        id: `${id}-group`,
        className: Global.customGroupContainerClassName
      });

      customGroup.toBack();

      this.set({ nodeGroup, edgeGroup, customGroup, delegateGroup });
    }
    this.set('group', group);
  }

  public getDefaultCfg(): PrivateGraphOption {
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
       *  shape: 'rect',
       *  size: [60, 40],
       *  style: {
       *    //... 样式配置项
       *  }
       * }
       * 若数据项为 { id: 'node', x: 100, y: 100 }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， shape: 'rect', size: [60, 40] }
       * 若数据项为 { id: 'node', x: 100, y: 100, shape: 'circle' }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， shape: 'circle', size: [60, 40] }
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
       *  nodeStateStyle: {
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
        onFrame: null,
        /**
         * 动画时长(ms)
         */
        duration: 500,
        /**
         * 指定动画动效
         */
        easing: 'easeLinear'
      },
      callback: null,
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
      groupStyle: {}
    };
  }

  /**
   * 将值设置到 this._cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */
  public set<T = any>(key: string | object, val?: T): Graph {
    if(isPlainObject(key)) {
      this._cfg = Object.assign({}, this._cfg, key)
    } else {
      this._cfg[key] = val
    }
    return this
  }

  /**
   * 获取 this._cfg 中的值
   * @param key 键
   */
  public get(key: string) {
    return this._cfg[key]
  }

  /**
   * 清理元素多个状态
   * @param {string|Item} item 元素id或元素实例
   * @param {string[]} states 状态
   */
  public clearItemStates(item: Item, states: string[]): void {
    if(isString(item))  {
      item = this.findById(item)
    }

    const itemController: ItemController = this.get('itemController')

    itemController.clearItemStates(item, states)

    if(!states) {
      states = item.get<string[]>('states')
    }

    const stateController: StateController = this.get('stateController')
    stateController.updateStates(item, states, false)
  }

  /**
   * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
   * 若是自定义节点切在各种状态下
   * graph.node(node => {
   *  return {
   *    {
   *       shape: 'rect',
   *      label: node.id,
   *       style: { fill: '#666' },
   *      stateStyles: {
   *         selected: { fill: 'blue' },
   *         custom: { fill: 'green' }
   *       }
   *     }
   *  }
   * });
   * @param {function} nodeFn 指定每个节点样式
   */
  public node(nodeFn: (config: NodeConfig) => NodeConfig): void {
    if (typeof nodeFn === 'function') {
      this.set('nodeMapper', nodeFn);
    }
  }

  /**
   * 设置各个边样式
   * @param {function} edgeFn 指定每个边的样式,用法同 node
   */
  public edge(edgeFn: (config: EdgeConfig) => EdgeConfig): void {
    if (typeof edgeFn === 'function') {
      this.set('edgeMapper', edgeFn);
    }
  }

  /**
   * 根据 ID 查询图元素实例
   * @param id 图元素 ID
   */
  public findById(id: string): Item {
    return this.get('itemMap')[id]
  }

  /**
   * 根据对应规则查找单个元素
   * @param {ITEM_TYPE} type 元素类型(node | edge | group)
   * @param {(item: T, index: number) => T} fn 指定规则
   * @return {T} 元素实例
   */
  public find<T extends Item>(type: ITEM_TYPE, fn: (item: T, index?: number) => boolean): T  {
    let result;
    const items = this.get(type + 's');

    each(items, (item, i) => {
      if (fn(item, i)) {
        result = item;
        return false;
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
    const result = [];

    each(this.get(type + 's'), (item, i) => {
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
    return this.findAll(type, (item) => {
      return item.hasState(state);
    });
  }

  /**
   * 平移画布
   * @param dx 水平方向位移
   * @param dy 垂直方向位移
   */
  public translate(dx: number, dy: number): void {
    const group: Group = this.get('group')
    translate(group, { x: dx, y: dy })
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

    this.autoPaint();
  }

  /**
   * 调整视口适应视图
   * @param {object} padding 四周围边距
   */
  public fitView(padding: Padding): void {
    if (padding) {
      this.set('fitViewPadding', padding);
    }

    const viewController: ViewController = this.get('viewController')
    viewController.fitView();

    this.paint();
  }

  /**
   * 新增行为
   * @param {string | IModeOption | IModeType[]} behaviors 添加的行为
   * @param {string | string[]} modes 添加到对应的模式
   * @return {Graph} Graph
   */
  public addBehaviors(behaviors: string | IModeOption | IModeType[], modes: string | string[]): Graph {
    const modeController: ModeController = this.get('modeController')
    modeController.manipulateBehaviors(behaviors, modes, true);
    return this;
  }

  /**
   * 移除行为
   * @param {string | IModeOption | IModeType[]} behaviors 移除的行为
   * @param {string | string[]} modes 从指定的模式中移除
   * @return {Graph} Graph
   */
  public removeBehaviors(behaviors: string | IModeOption | IModeType[], modes: string | string[]): Graph {
    const modeController: ModeController = this.get('modeController')
    modeController.manipulateBehaviors(behaviors, modes, false);
    return this;
  }

  /**
   * 伸缩窗口
   * @param ratio 伸缩比例
   * @param center 以center的x, y坐标为中心缩放
   */
  public zoom(ratio: number,  center?: Point): void {
    const group: Group = this.get('group')
    let matrix: Matrix = clone(group.getMatrix())
    const minZoom: number = this.get('minZoom')
    const maxZoom: number = this.get('maxZoom')

    if (!matrix) { 
      matrix = mat3.create(); 
    }

    if(center) {
      mat3.translate(matrix, matrix, [ -center.x, -center.y ])
      mat3.scale(matrix, matrix, [ ratio, ratio ])
      mat3.translate(matrix, matrix, [ center.x, center.y ])
    } else {
      mat3.scale(matrix, matrix, [ ratio, ratio ])
    }

    if (minZoom && matrix[0] < minZoom) {
      return;
    }
    if (maxZoom && matrix[0] > maxZoom) {
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
  public zoomTo(toRatio: number, center: Point): void {
    const ratio = toRatio / this.getZoom();
    this.zoom(ratio, center);
  }

  /**
   * 将元素移动到视口中心
   * @param {Item} item 指定元素
   */
  public focusItem(item: Item): void {
    const viewController: ViewController = this.get('viewController')
    viewController.focus(item)

    this.autoPaint()
  }

  /**
   * 自动重绘
   * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
   */
  public autoPaint(): void {
    if(this.get('autoPaint')) {
      this.paint()
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
    const viewController: ViewController = this.get('viewController')
    return viewController.getPointByClient(clientX, clientY);
  }

  /**
   * 将视口坐标转换为屏幕坐标
   * @param {number} x 视口x坐标
   * @param {number} y 视口y坐标
   * @return {Point} 视口坐标
   */
  public getClientByPoint(x: number, y: number): Point {
    const viewController: ViewController = this.get('viewController')
    return viewController.getClientByPoint(x, y);
  }

  /**
   * 将画布坐标转换为视口坐标
   * @param {number} canvasX 画布 x 坐标
   * @param {number} canvasY 画布 y 坐标
   * @return {object} 视口坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): Point {
    const viewController: ViewController = this.get('viewController')
    return viewController.getPointByCanvas(canvasX, canvasY);
  }

  /**
   * 将视口坐标转换为画布坐标
   * @param {number} x 视口 x 坐标
   * @param {number} y 视口 y 坐标
   * @return {object} 画布坐标
   */
  public getCanvasByPoint(x: number, y: number): Point {
    const viewController: ViewController = this.get('viewController')
    return viewController.getCanvasByPoint(x, y);
  }

  /**
   * 显示元素
   * @param {Item} item 指定元素
   */
  public showItem(item: Item): void {
    const itemController: ItemController = this.get('itemController')
    itemController.changeItemVisibility(item, true) 
  }

  /**
   * 隐藏元素
   * @param {Item} item 指定元素
   */
  public hideItem(item: Item): void {
    const itemController: ItemController = this.get('itemController')
    itemController.changeItemVisibility(item, false) 
  }

  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   */
  public refreshItem(item: Item) {
    const itemController: ItemController = this.get('itemController')
    itemController.refreshItem(item);
  }

  /**
   * 设置是否在更新/刷新后自动重绘
   * @param {boolean} auto 自动重绘
   */
  public setAutoPaint(auto: boolean): void {
    this.set('autoPaint', auto);
  }

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   */
  public remove(item: Item): void {
    this.removeItem(item);
  }

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   */
  public removeItem(item: Item): void {
    // 如果item是字符串，且查询的节点实例不存在，则认为是删除group
    let nodeItem = null;
    if (isString(item)) {
      nodeItem = this.findById(item);
    }

    if (!nodeItem && isString(item)) {
      this.get('customGroupControll').remove(item);
    } else {
      this.get('itemController').removeItem(item);
    }
  }

  /**
   * 新增元素 或 节点分组
   * @param {string} type 元素类型(node | edge | group)
   * @param {ModelConfig} model 元素数据模型
   * @return {Item} 元素实例
   */
  public addItem(type: ITEM_TYPE, model: ModelConfig): Item {
    if (type === 'group') {
      const { groupId, nodes, type: groupType, zIndex, title } = model;
      let groupTitle = title;

      if (isString(title)) {
        groupTitle = {
          text: title
        };
      }

      return this.get('customGroupControll').create(groupId, nodes, groupType, zIndex, true, groupTitle);
    }
    const itemController: ItemController = this.get('itemController')
    return itemController.addItem(type, model);
  }

  public add(type: ITEM_TYPE, model: ModelConfig): Item {
    return this.addItem(type, model)
  }

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {ModelConfig} cfg 需要更新的数据
   */
  public updateItem(item: Item, cfg: ModelConfig): void {
    this.get('itemController').updateItem(item, cfg);
  }

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {ModelConfig} cfg 需要更新的数据
   */
  public update(item: Item, cfg: ModelConfig): void {
    this.updateItem(item, cfg)
  }

  /**
   * 设置元素状态
   * @param {Item} item 元素id或元素实例
   * @param {string} state 状态
   * @param {boolean} enabled 是否启用状态
   */
  public setItemState(item: Item, state: string, enabled: boolean): void {
    if (isString(item)) {
      item = this.findById(item);
    }

    this.get('itemController').setItemState(item, state, enabled);
    this.get('stateController').updateState(item, state, enabled);
  }

  /**
   * 设置视图初始化数据
   * @param {GraphData} data 初始化数据
   */
  public data(data: GraphData): void {
    this.set('data', data)
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

    this.clear();

    this.emit('beforerender');
    const autoPaint = this.get('autoPaint');
    this.setAutoPaint(false);

    each(data.nodes, (node: NodeConfig) => {
      self.add(ITEM_TYPE.NODE, node);
    });

    each(data.edges, (edge: EdgeConfig) => {
      self.add(ITEM_TYPE.EDGE, edge);
    });

    if (!this.get('groupByTypes')) {
      // 为提升性能，选择数量少的进行操作
      if (data.nodes.length < data.edges.length) {
        const nodes = this.getNodes();

        // 遍历节点实例，将所有节点提前。
        nodes.forEach(node => {
          node.toFront();
        });
      } else {
        const edges = this.getEdges();

        // 遍历节点实例，将所有节点提前。
        edges.forEach(edge => {
          edge.toBack();
        });

      }
    }

    // TODO: wait for layout ts
    // layout
    // const layoutController = self.get('layoutController');
    // if (!layoutController.layout(success)) {
    //   success();
    // }

    function success() {
      if (self.get('fitView')) {
        self.get('viewController').fitView();
      }
      self.paint();
      self.setAutoPaint(autoPaint);
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
  private diffItems(type: ITEM_TYPE, items, models: NodeConfig[] | EdgeConfig[]) {
    const self = this;
    let item;
    const itemMap: NodeMapConfig = this.get('itemMap');

    each(models, model => {
      item = itemMap[model.id];
      if (item) {
        if (self.get('animate') && type === NODE) {
          const containerMatrix = item.getContainer().getMatrix();

          item.set('originAttrs', {
            x: containerMatrix[6],
            y: containerMatrix[7]
          });
        }

        self.updateItem(item, model);
      } else {
        item = self.addItem(type, model);
      }
      items[type + 's'].push(item);
    });
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {object} data 源数据
   * @return {object} this
   */
  public changeData(data: GraphData): Graph {
    const self = this;

    if (!data) {
      return this;
    }

    if (!self.get('data')) {
      self.data(data);
      self.render();
    }

    const autoPaint: boolean = this.get('autoPaint');
    const itemMap: NodeMapConfig = this.get('itemMap');

    const items = {
      nodes: [],
      edges: []
    };

    this.setAutoPaint(false);

    this.diffItems(ITEM_TYPE.NODE, items, data.nodes);
    this.diffItems(ITEM_TYPE.EDGE, items, data.edges);
    
    each(itemMap, (item: INode, id: number) => {
      if (items.nodes.indexOf(item) < 0 && items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item);
      }
    });

    this.set({ nodes: items.nodes, edges: items.edges });

    // TODO: wait for layout ts
    // const layoutController = this.get('layoutController');
    // layoutController.changeData();

    // if (self.get('animate') && !layoutController.getLayoutType()) {
    if (self.get('animate')) {
      // 如果没有指定布局
      self.positionsAnimate();
    } else {
      self.paint();
    }

    self.setAutoPaint(autoPaint);
    return this;
  }

  /**
   * 根据数据渲染群组
   * @param {GraphData} data 渲染图的数据
   * @param {string} groupType group类型
   */
  public renderCustomGroup(data: GraphData, groupType: string) {
    
  }

  /**
   * 导出图数据
   * @return {object} data
   */
  public save(): GraphData {
    const nodes = [];
    const edges = [];
    each(this.get('nodes'), (node: INode) => {
      nodes.push(node.getModel());
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
    this.get('viewController').changeSize(width, height);
    this.autoPaint();
    return this;
  }

  /**
   * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
   */
  public refresh(): void {
    const self = this;
    const autoPaint: boolean = self.get('autoPaint');
    self.setAutoPaint(false);

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

    self.setAutoPaint(autoPaint);

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

    const onFrame = animateCfg.onFrame;

    const nodes = self.getNodes();

    const toNodes = nodes.map(node => {
      const model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y
      };
    });

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    const canvas: Canvas = self.get('canvas')

    canvas.animate({
      onFrame(ratio) {
        each(toNodes, data => {
          const node: Item = self.findById(data.id);

          if (!node || node.destroyed) {
            return;
          }

          let originAttrs: Point = node.get('originAttrs');

          const model: NodeConfig = node.get('model');

          if (!originAttrs) {
            const containerMatrix = node.getContainer().getMatrix();
            originAttrs = {
              x: containerMatrix[6],
              y: containerMatrix[7]
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
      }
    }, animateCfg.duration, animateCfg.easing, () => {
      each(nodes, (node: INode) => {
        node.set('originAttrs', null);
      });

      if (animateCfg.callback) {
        animateCfg.callback();
      }

      self.emit('afteranimate');
      self.animating = false;
    });
  }

  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  public refreshPositions() {
    const self = this;
    self.emit('beforegraphrefreshposition');

    const nodes: INode[] = self.get('nodes');
    const edges: IEdge[]  = self.get('edges');

    let model: NodeConfig;

    each(nodes, (node: INode) => {
      model = node.getModel() as NodeConfig;
      node.updatePosition({ x: model.x, y: model.y });
    });

    each(edges, (edge: IEdge) => {
      edge.refresh();
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
    return this.get('mode');
  }

  /**
   * 切换行为模式
   * @param {string} mode 指定模式
   * @return {object} this
   */
  public setMode(mode: string): Graph {
    this.set('mode', mode);
    this.get('modeController').setMode(mode);
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
  public toDataURL(): string {
    const canvas: Canvas = this.get('canvas');
    const canvasDom = canvas.get('el');
    const dataURL = canvasDom.toDataURL('image/png');
    return dataURL;
  }

  /**
   * 画布导出图片
   * @param {String} name 图片的名称
   */
  public downloadImage(name: string): void {
    const self = this;

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    const fileName: string = (name || 'graph') + ('.png');
    const link: HTMLAnchorElement = document.createElement('a');
    setTimeout(() => {
      const dataURL = self.toDataURL();
      if (typeof window !== 'undefined') {
        if (window.Blob && window.URL) {
          const arr = dataURL.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);

          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }

          const blobObj = new Blob([ u8arr ], { type: mime });

          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blobObj, fileName);
          } else {
            link.addEventListener('click', function() {
              link.download = fileName;
              link.href = window.URL.createObjectURL(blobObj);
            });
          }
        }
      }

      const e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);

      link.dispatchEvent(e);
    }, 16);
  }

  /**
   * 更换布局配置项
   * @param {object} cfg 新布局配置项
   * 若 cfg 含有 type 字段或为 String 类型，且与现有布局方法不同，则更换布局
   * 若 cfg 不包括 type ，则保持原有布局方法，仅更新布局配置项
   */
  public updateLayout(cfg): void {
    const layoutController = this.get('layoutController');
    let newLayoutType;

    if (isString(cfg)) {
      newLayoutType = cfg;
      cfg = {
        type: newLayoutType
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
      layoutCfg.type = oriLayoutType ? oriLayoutType : 'random';

      this.set('layout', layoutCfg);

      layoutController.updateLayoutCfg(layoutCfg);
    } else { // has different type, change layout
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
    this.get('customGroupControll').collapseGroup(groupId);
  }

  /**
   * 展开分组
   * @param {string} groupId 分组ID
   */
  public expandGroup(groupId: string): void {
    this.get('customGroupControll').expandGroup(groupId);
  }

  // TODO plugin 机制完善后再补充类型
  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  public addPlugin(plugin): void {
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
  public removePlugin(plugin): void {
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
    // this.get('layoutController').destroy();
    // this.get('customGroupControll').destroy();
    this.get('canvas').destroy();
    this._cfg = null;
    this.destroyed = true;
  }
}