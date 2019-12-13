import EventEmitter from '@antv/event-emitter'
import { Point } from '@antv/g-base/lib/types';
import GCanvas from '@antv/g-canvas/lib/canvas'
import Group from '@antv/g-canvas/lib/group';
import { mat3 } from '@antv/matrix-util/lib';
import clone from '@antv/util/lib/clone';
import deepMix from '@antv/util/lib/deep-mix'
import isPlainObject from '@antv/util/lib/is-plain-object';
import isString from '@antv/util/lib/is-string'
import { GraphOptions, IGraph, IStates } from '@g6/interface/graph';
import { IItem } from '@g6/interface/item';
import { EdgeConfig, GraphData, GroupConfig, Matrix, NodeConfig, NodeMapConfig } from '@g6/types';
import { translate } from '@g6/util/math'
import { EventController, ModeController, ViewController } from './controller'

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
  private _cfg: GraphOptions

  constructor(cfg: GraphOptions) {
    super()
    this._cfg = deepMix(this.getDefaultCfg(), cfg)
    this.init()
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
  private _initCanvas() {
    let container = this.get('container');
    if (isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }
    if (!container) {
      throw Error('invalid container');
    }
    const canvas = new GCanvas({
      container,
      width: this.get('width'),
      height: this.get('height'),
      renderer: this.get('renderer'),
      pixelRatio: this.get('pixelRatio')
    });
    this.set('canvas', canvas);
    // this._initGroups();
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
  public findById(id: string): IItem {
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
}