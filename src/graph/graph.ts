import EventEmitter from '@antv/event-emitter'
import { IGroup } from '@antv/g-base/lib/interfaces';
import { AnimateCfg, Point } from '@antv/g-base/lib/types';
import GCanvas from '@antv/g-canvas/lib/canvas'
import Canvas from '@antv/g-canvas/lib/canvas';
import Group from '@antv/g-canvas/lib/group';
import { mat3 } from '@antv/matrix-util/lib';
import clone from '@antv/util/lib/clone';
import deepMix from '@antv/util/lib/deep-mix'
import each from '@antv/util/lib/each'
import isPlainObject from '@antv/util/lib/is-plain-object';
import isString from '@antv/util/lib/is-string'
import { GraphAnimateConfig, GraphOptions, IGraph, IStates } from '@g6/interface/graph';
import { IEdge, IItem, INode } from '@g6/interface/item';
import { EdgeConfig, GraphData, GroupConfig, ITEM_TYPE, ItemType, Matrix, ModelConfig, NodeConfig, NodeMapConfig } from '@g6/types';
import { translate } from '@g6/util/math'
import Global from '../global'
import { EventController, ModeController, ViewController } from './controller'

const NODE = 'node'
const EDGE = 'edge'

interface PrivateGraphOption extends GraphOptions {
  data: GraphData;

  // capture event
  event: boolean;

  nodes: NodeConfig[];

  edges: EdgeConfig[];

  groups: GroupConfig[];

  itemMap: NodeMapConfig;

  callback: () => void;

  // TODO 需要将暴力出去的配置和内部使用的进行区分
  groupBBoxs: any;

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

  constructor(cfg: GraphOptions) {
    super()
    this._cfg = deepMix(this.getDefaultCfg(), cfg)
    this.init()
    this.animating = false
  }

  private init() {
    this.initCanvas()

    // instance controller
    const eventController = new EventController(this)
    const viewController = new ViewController(this)
    const modeController = new ModeController(this)

    this.set({
      eventController,
      viewController,
      modeController
    })
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
   * 根据 ID 查询图元素实例
   * @param id 图元素 ID
   */
  public findById(id: string): ItemType {
    return this.get('itemMap')[id]
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
   * 伸缩窗口
   * @param ratio 伸缩比例
   * @param center 以center的x, y坐标为中心缩放
   */
  public zoom(ratio: number,  center: Point): void {
    const group: Group = this.get('group')
    const matrix: Matrix = clone(group.getMatrix())
    const minZoom: number = this.get('minZoom')
    const maxZoom: number = this.get('maxZoom')

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
    return this.get('viewController').getPointByClient(clientX, clientY);
  }

  /**
   * 将视口坐标转换为屏幕坐标
   * @param {number} x 视口x坐标
   * @param {number} y 视口y坐标
   * @return {Point} 视口坐标
   */
  public getClientByPoint(x: number, y: number): Point {
    return this.get('viewController').getClientByPoint(x, y);
  }

  /**
   * 将画布坐标转换为视口坐标
   * @param {number} canvasX 画布 x 坐标
   * @param {number} canvasY 画布 y 坐标
   * @return {object} 视口坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): Point {
    return this.get('viewController').getPointByCanvas(canvasX, canvasY);
  }

  /**
   * 将视口坐标转换为画布坐标
   * @param {number} x 视口 x 坐标
   * @param {number} y 视口 y 坐标
   * @return {object} 画布坐标
   */
  public getCanvasByPoint(x: number, y: number): Point {
    return this.get('viewController').getCanvasByPoint(x, y);
  }

  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   */
  public refreshItem(item: string | IItem) {
    this.get('itemController').refreshItem(item);
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
   * @param {ItemType} item 元素id或元素实例
   */
  public remove(item: ItemType): void {
    this.removeItem(item);
  }

  /**
   * 删除元素
   * @param {ItemType} item 元素id或元素实例
   */
  public removeItem(item: ItemType): void {
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
   * @return {ItemType} 元素实例
   */
  public addItem(type: ITEM_TYPE, model: ModelConfig): ItemType {
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
    return this.get('itemController').addItem(type, model);
  }

  public add(type: ITEM_TYPE, model: ModelConfig): ItemType {
    return this.addItem(type, model)
  }

  /**
   * 更新元素
   * @param {ItemType} item 元素id或元素实例
   * @param {ModelConfig} cfg 需要更新的数据
   */
  public updateItem(item: ItemType, cfg: ModelConfig): void {
    this.get('itemController').updateItem(item, cfg);
  }

  /**
   * 更新元素
   * @param {ItemType} item 元素id或元素实例
   * @param {ModelConfig} cfg 需要更新的数据
   */
  public update(item: ItemType, cfg: ModelConfig): void {
    this.updateItem(item, cfg)
  }

  /**
   * 设置元素状态
   * @param {ItemType} item 元素id或元素实例
   * @param {string} state 状态
   * @param {boolean} enabled 是否启用状态
   */
  public setItemState(item: ItemType, state: string, enabled: boolean): void {
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

    // layout
    const layoutController = self.get('layoutController');
    if (!layoutController.layout(success)) {
      success();
    }

    function success() {
      if (self.get('fitView')) {
        self.get('viewController')._fitView();
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

    const layoutController = this.get('layoutController');
    layoutController.changeData();

    if (self.get('animate') && !layoutController.getLayoutType()) {
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
          const node: ItemType = self.findById(data.id);

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
    return this.get('group').getMatrix()[0];
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
}