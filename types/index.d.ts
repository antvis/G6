/// <reference path="./g.d.ts" />

import {
  deepMix,
  mix,
  debounce,
  each,
  throttle,
  isNil,
  isArray,
  remove,
  extend,
  augment,
  clone,
  uniqueId,
  isNumber,
  isPlainObject,
  isString,
  isObject,
  wrapBehavior,
  upperFirst,
} from '@antv/util';
import vec2 from '@antv/util/lib/matrix/vec2';
import vec3 from '@antv/util/lib/matrix/vec3';
import mat3 from '@antv/util/lib/matrix/mat3';
import transform from '@antv/util/lib/matrix/transform';
import createDom from '@antv/util/lib/dom/create-dom';
import modifyCSS from '@antv/util/lib/dom/modify-css';
import addEventListener from '@antv/util/lib/dom/add-event-listener';
import { G } from './g';

/**
 * 元素类型
 */
type ElementType = 'node' | 'edge';

interface IMode {
  type: string;
  [key: string]: any;
}

interface G6Event extends MouseEvent {
  item: G6.Node & G6.Edge;
  target: any;
}

// tslint:disable-next-line:export-just-namespace
export = G6;
export as namespace G6;

declare namespace G6 {
  interface EdgeConfig {
    source: string;
    target: string;
    [key: string]: any;
  }

  interface NodeConfig {
    id?: string;
    [key: string]: any;
  }

  /**
   * 坐标点
   */
  interface Point {
    x: number;
    y: number;
  }

  /**
   * 矩形
   */
  interface Rect extends Point {
    width: number;
    height: number;
  }

  /**
   * 圆
   */
  interface Circle extends Point {
    r: number;
  }

  /**
   * 椭圆
   */
  interface Ellipse extends Point {
    rx: number;
    ry: number;
  }

  export class Item {
    constructor(cfg: any);
  
    isItem(): boolean;
  
    getDefaultCfg(): any;
  
    getKeyShapeStyle(): any;
  
    /**
     * 获取当前元素的所有状态
     * @return {Array} 元素的所有状态
     */
    getStates(): any;
  
    /**
     * 当前元素是否处于某状态
     * @param {String} state 状态名
     * @return {Boolean} 是否处于某状态
     */
    hasState(state: string): boolean;
  
    getStateStyle(state: string): any;
  
    getOriginStyle(): any;
  
    getCurrentStatesStyle(): any;
  
    /**
     * 更改元素状态， visible 不属于这个范畴
     * @internal 仅提供内部类 graph 使用
     * @param {String} state 状态名
     * @param {Boolean} enable 节点状态值
     */
    setState(state: string, enable: boolean): void;
  
    clearStates(states: string | string[]): void;
  
    /**
     * 节点的图形容器
     * @return {G.Group} 图形容器
     */
    getContainer(): G.Group;
  
    /**
     * 节点的关键形状，用于计算节点大小，连线截距等
     * @return {G.Shape} 关键形状
     */
    getKeyShape(): G.Shape;
  
    /**
     * 节点数据模型
     * @return {Object} 数据模型
     */
    getModel<T = any>(): T;
  
    /**
     * 节点类型
     * @return {string} 节点的类型
     */
    getType(): string;
  
    getShapeCfg(model: any): any;
  
    /**
     * 刷新一般用于处理几种情况
     * 1. item model 在外部被改变
     * 2. 边的节点位置发生改变，需要重新计算边
     *
     * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
     */
    refresh(): void;
  
    /**
     * 将更新应用到 model 上，刷新属性
     * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
     * @param  {Object} cfg       配置项，可以是增量信息
     */
    update(cfg: any): void;
  
    /**
     * 更新元素内容，样式
     */
    updateShape(): void;
  
    /**
     * 更新位置，避免整体重绘
     * @param {object} cfg 待更新数据
     */
    updatePosition(cfg: any): void;
  
    /**
     * 更新/刷新等操作后，清除 cache
     */
    clearCache(): void;
  
    /**
     * 绘制元素
     */
    draw(): void;
  
    /**
     * 获取元素的包围盒
     */
    getBBox(): G.Box;
  
    /**
     * 将元素放到最前面
     */
    toFront(): void;
  
    /**
     * 将元素放到最后面
     */
    toBack(): void;
  
    /**
     * 显示元素
     */
    show(): void;
  
    /**
     * 隐藏元素
     */
    hide(): void;
  
    /**
     * 更改是否显示
     * @param  {Boolean} visible 是否显示
     */
    changeVisibility(visible: boolean): void;
  
    /**
     * 是否捕获及触发该元素的交互事件
     * @param {Boolean} enable 标识位
     */
    enableCapture(enable: boolean): void;
  
    isVisible(): boolean;
  
    get(key: string): any;
    set(key: string, value: any): void;
  }

  export class Edge extends Item {
    setSource(source: any): void;

    setTarget(target: any): void;

    getSource(): any;

    getTarget(): any;
  }

  export class Node extends Item {
    /**
     * 获取从节点关联的所有边
     * @return {Array} 边的集合
     */
    getEdges(): Edge[];

    /**
     * 获取引入节点的边 target == this
     * @return {Array} 边的集合
     */
    getInEdges(): any[];

    /**
     * 获取从节点引出的边 source == this
     * @return {Array} 边的集合
     */
    getOutEdges(): any[];

    /**
     * 根据锚点的索引获取连接点
     * @param  {Number} index 索引
     * @return {Object} 连接点 {x,y}
     */
    getLinkPointByAnchor(index: number): G6.Point;

    /**
     * 获取连接点
     * @param {Object} point 节点外面的一个点，用于计算交点、最近的锚点
     * @return {Object} 连接点 {x,y}
     */
    getLinkPoint(point: G6.Point): G6.Point;

    /**
     * 添加边
     * @param {Edge} edge 边
     */
    addEdge(edge: Edge): void;

    /**
     * 移除边
     * @param {Edge} edge 边
     */
    removeEdge(edge: Edge): void;

    clearCache(): void;

    /**
     * 获取锚点的定义
     * @return {array} anchorPoints， {x,y,...cfg}
     */
    getAnchorPoints(): any;
  }

  interface GraphOptions {
    /**
     * 图的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
     */
    container: string | HTMLElement;
    /**
     * 指定画布宽度，单位为 'px'
     */
    width: number;
    /**
     * 指定画布高度，单位为 'px'
     */
    height: number;
    /**
     * 渲染引擎，支持canvas和svg。
     */
    renderer?: 'canvas' | 'svg';

    fitView?: boolean;

    layout?: any;

    /**
     * 图适应画布时，指定四周的留白。
     * 可以是一个值, 例如：fitViewPadding: 20
     * 也可以是一个数组，例如：fitViewPadding: [20, 40, 50,20]
     * 当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距。
     */
    fitViewPadding?: number[] | number;
    /**
     * 各种元素是否在一个分组内，决定节点和边的层级问题，默认情况下所有的节点在一个分组中，所有的边在一个分组中，当这个参数为 false 时，节点和边的层级根据生成的顺序确定。
     * 默认值：true
     */
    groupByTypes?: boolean;

    groupStyle?: {
      default?: any;
      hover?: any;
      /**
       * 收起状态样式
       */
      collapseStyle?: any;
    };

    /**
     * 当图中元素更新，或视口变换时，是否自动重绘。建议在批量操作节点时关闭，以提高性能，完成批量操作后再打开，参见后面的 setAutoPaint() 方法。
     * 默认值：true
     */
    autoPaint?: boolean;

    /**
     * 设置画布的模式。详情可见G6中的Mode文档。
     */
    modes?: {
      default?: Array<string | IMode>;
      addNode?: Array<string | IMode>;
      addEdge?: Array<string | IMode>;
    };

    /**
     * 各个状态下节点的样式，对 G6 内置节点有效。
     */
    nodeStyle?: any;

    /**
     * 各个状态下边的样式，对 G6 内置边有效。
     */
    edgeStyle?: any;

    /**
     * 默认状态下节点的配置，比如 shape, size, color。会被写入的 data 覆盖。
     */
    defaultNode?: any;

    /**
     * 默认状态下边的配置，比如 shape, size, color。会被写入的 data 覆盖。
     */
    defaultEdge?: any;

    nodeStateStyles?: any;

    edgeStateStyles?: any;

    /**
     * 向 graph 注册插件。插件机制请见：plugin
     */
    plugins?: any[];
    /**
     * 是否启用全局动画。
     */
    animate?: boolean;

    /**
     * 动画配置项，仅在animate为true时有效。
     */
    animateCfg?: {
      /**
       * 回调函数，用于自定义节点运动路径。
       */
      onFrame?: Function | null;
      /**
       * 动画时长，单位为毫秒。
       */
      duration?: number;
      /**
       * 动画动效。
       * 默认值：easeLinear
       */
      easing?: string;
    };
    /**
     * 最小缩放比例
     * 默认值 0.2
     */
    minZoom?: number;
    /**
     * 最大缩放比例
     * 默认值 10
     */
    maxZoom?: number;
    /**
     * 像素比率
     * 默认值 1.0
     */
    pixelRatio?: number;

    groupType?: string;

    /**
     * Edge 是否连接到节点中间
     */
    linkCenter?: boolean;
  }
  /**
   * Graph Class
   */
  export class Graph {
    constructor(options: GraphOptions);

    on<T = G6Event>(eventName: string, handler: (e: T) => void): void;
    emit(eventName: string, params: object): void;

    /**
     * 获取指定配置项的值
     * @param key 配置项名称，只支持第一层级
     */
    get(key: string): any;

    /**
     * 设置指定配置项的值
     * @param key
     * @param val
     */
    set(key: string, val: any): this;

    /**
     * 更新元素
     * @param {string|object} item 元素id或元素实例
     * @param {object} cfg 需要更新的数据
     */
    update(item: any, cfg: any): void;

    /**
     * 更新元素
     * @param {string|object} item 元素id或元素实例
     * @param {object} cfg 需要更新的数据
     */
    updateItem(item: any, cfg: any): void;

    /**
     * 设置元素状态
     * @param {string|object} item 元素id或元素实例
     * @param state 状态
     * @param enabled 是否启用状态
     */
    setItemState(item: any, state: string, enabled: boolean): void;

    /**
     * 清理元素多个状态
     * @param {string|object} item 元素id或元素实例
     * @param states 状态
     */
    clearItemStates(item: any, states?: string[] | string | null): void;

    /**
     * 新增元素
     * @param type 元素类型(node | edge)
     * @param {object} model 元素数据模型
     * @return {object} 元素实例
     */
    add(type: ElementType, model: any): void;

    /**
     * 新增元素 或 节点分组
     * @param {string} type 元素类型(node | edge | group)
     * @param {object} model 元素数据模型
     * @return {object} 元素实例
     */
    addItem(type: ElementType | 'group', model: any): any;

    /**
     * 删除元素
     * @param {string|object} item 元素id或元素实例
     */
    remove(item: string | object): void;

    /**
     * 删除元素
     * @param {string|object} item 元素id或元素实例
     */
    removeItem(item: string | object): void;

    /**
     * 设置视图初始化数据
     * @param {object} data 初始化数据
     */
    data(data: { edges?: EdgeConfig[]; nodes?: NodeConfig[]; [key: string]: any }): any;

    /**
       * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
       * 若是自定义节点切在各种状态下
       * graph.node(node => {
       *  return {
       *    {
              shape: 'rect',
              label: node.id,
              style: { fill: '#666' },
              stateStyles: {
                selected: { fill: 'blue' },
                custom: { fill: 'green' }
              }
            }
      *  }
      * });
      * @param {function} nodeFn 指定每个节点样式
      */
    node(nodeFn: Function): void;

    /**
     * 设置各个边样式
     * @param {function} edgeFn 指定每个边的样式,用法同 node
     */
    edge(edgeFn: Function): any;

    /**
     * 刷新元素
     * @param {string|object} item 元素id或元素实例
     */
    refreshItem(item: string | object): void;

    /**
     * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
     */
    refresh(): void;

    /**
     * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
     */
    refreshPositions(): void;

    /**
     * 根据data接口的数据渲染视图
     */
    render(): void;

    /**
     * 根据数据渲染群组
     * @param {object} data 渲染图的数据
     * @param {string} groupType group类型
     */
    renderCustomGroup(data: any, groupType: string): any;

    /**
     * 接收数据进行渲染
     * @Param {Object} data 初始化数据
     */
    read(data: any): void;

    /**
     * 更改源数据，根据新数据重新渲染视图
     * @param {object} data 源数据
     * @return {object} this
     */
    changeData(data?: any): this;

    /**
     * 仅画布重新绘制
     */
    paint(): void;

    /**
     * 导出图数据
     * @return {object} data
     */
    save(): any;

    /**
     * 改变画布大小
     * @param  {number} width  画布宽度
     * @param  {number} height 画布高度
     * @return {object} this
     */
    changeSize(width: number, height: number): this;

    /**
     * 平移画布
     * @param {number} dx 水平方向位移
     * @param {number} dy 垂直方向位移
     */
    translate(dx: number, dy: number): void;

    /**
     * 平移画布到某点
     * @param {number} x 水平坐标
     * @param {number} y 垂直坐标
     */
    moveTo(x: number, y: number): void;

    /**
     * 调整视口适应视图
     * @param {object} padding 四周围边距
     */
    fitView(padding?: any): void;

    /**
     * 新增行为
     * @param {string|array} behaviors 添加的行为
     * @param {string|array} modes 添加到对应的模式
     * @return {object} this
     */
    addBehaviors(behaviors: string | string[], modes: string | string[]): this;

    /**
     * 移除行为
     * @param {string|array} behaviors 移除的行为
     * @param {string|array} modes 从指定的模式中移除
     * @return {object} this
     */
    removeBehaviors(behaviors: string | string[], modes: string | string[]): this;

    /**
     * 切换行为模式
     * @param {string} mode 指定模式
     * @return {object} this
     */
    setMode(mode: string): this;

    /**
     * 获取当前的行为模式
     * @return {string} 当前行为模式
     */
    getCurrentMode(): string;

    /**
     * 获取当前视口伸缩比例
     * @return {number} 比例
     */
    getZoom(): number;

    /**
     * 获取当前图中所有节点的item实例
     * @return {array} item数组
     */
    getNodes(): any[];

    /**
     * 获取当前图中所有边的item实例
     * @return {array} item数组
     */
    getEdges(): G6.EdgeConfig[];

    /**
     * 伸缩视口
     * @param {number} ratio 伸缩比例
     * @param {object} center 以center的x, y坐标为中心缩放
     */
    zoom(ratio: number, center: object): void;

    /**
     * 伸缩视口到一固定比例
     * @param {number} toRatio 伸缩比例
     * @param {object} center 以center的x, y坐标为中心缩放
     */
    zoomTo(toRatio: number, center: object): void;

    /**
     * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
     */
    positionsAnimate(): void;

    stopAnimate(): void;

    isAnimating(): boolean;

    /**
     * 将元素移动到视口中心
     * @param {string|object} item 指定元素
     */
    focusItem(item: string | object): void;

    /**
     * 将屏幕坐标转换为视口坐标
     * @param {number} clientX 屏幕x坐标
     * @param {number} clientY 屏幕y坐标
     * @return {object} 视口坐标
     */
    getPointByClient(clientX: number, clientY: number): any;

    /**
     * 将视口坐标转换为屏幕坐标
     * @param {number} x 视口x坐标
     * @param {number} y 视口y坐标
     * @return {object} 视口坐标
     */
    getClientByPoint(x: number, y: number): any;

    /**
     * 将画布坐标转换为视口坐标
     * @param {number} canvasX 屏幕x坐标
     * @param {number} canvasY 屏幕y坐标
     * @return {object} 视口坐标
     */
    getPointByCanvas(canvasX: number, canvasY: number): any;

    /**
     * 将视口坐标转换为画布坐标
     * @param {number} x 屏幕x坐标
     * @param {number} y 屏幕y坐标
     * @return {object} 画布坐标
     */
    getCanvasByPoint(x: number, y: number): any;

    /**
     * 显示元素
     * @param {string|object} item 指定元素
     */
    showItem(item: string | object): void;

    /**
     * 隐藏元素
     * @param {string|object} item 指定元素
     */
    hideItem(item: string | object): void;

    /**
     * 查找对应id的元素
     * @param {string} id 元素id
     * @return {object} 元素实例
     */
    findById(id: string): any;

    /**
     * 根据对应规则查找单个元素
     * @param {string} type 元素类型(node|edge)
     * @param {string} fn 指定规则
     * @return {object} 元素实例
     */
    find(type: ElementType, fn: Function): any;

    /**
     * 查找所有满足规则的元素
     * @param {string} type 元素类型(node|edge)
     * @param {string} fn 指定规则
     * @return {array} 元素实例
     */
    findAll(type: ElementType, fn: Function): any;

    /**
     * 查找所有处于指定状态的元素
     * @param {string} type 元素类型(node|edge)
     * @param {string} state z状态
     * @return {object} 元素实例
     */
    findAllByState(type: ElementType, state: string): any;

    /**
     * 设置是否在更新/刷新后自动重绘
     * @param {boolean} auto 自动重绘
     */
    setAutoPaint(auto: boolean): void;

    /**
     * 返回图表的 dataUrl 用于生成图片
     * @return {string/Object} 图片 dataURL
     */
    toDataURL(): string | object;
    /**
     * 画布导出图片
     * @param {String} name 图片的名称
     */
    downloadImage(name: string): void;
    /**
     * 添加插件
     * @param {object} plugin 插件实例
     */
    addPlugin(plugin: any): void;

    /**
     * 添加插件
     * @param {object} plugin 插件实例
     */
    removePlugin(plugin: any): void;

    /**
     * 更换布局配置项
     * @param {object} cfg 新布局配置项
     * 若 cfg 含有 type 字段或为 String 类型，且与现有布局方法不同，则更换布局
     * 若 cfg 不包括 type ，则保持原有布局方法，仅更新布局配置项
     */
    updateLayout(cfg: any): void;

    /**
     * 重新以当前示例中配置的属性进行一次布局
     */
    layout(): void;

    /**
     * 清除画布元素
     * @return {object} this
     */
    clear(): this;

    /**
     * 销毁画布
     */
    destroy(): void;

    // group 相关方法
    /**
     * 收起分组
     * @param {string} groupId 分组ID
     */
    collapseGroup(groupId: string): void;

    /**
     * 展开分组
     * @param {string} groupId 分组ID
     */
    expandGroup(groupId: string): void;

    clearItemStates(node: Node): void;

    downloadImage(): void;
  }

  interface TreeGraphOptions extends GraphOptions {}
  /**
   * TreeGraph Class
   */
  export class TreeGraph extends Graph {
    constructor(config: TreeGraphOptions);

    getDefaultCfg(): Partial<TreeGraphOptions>;

    /**
     * 添加子树到对应 id 的节点
     * @param {object} data 子树数据模型
     * @param {string} parent 子树的父节点id
     */
    addChild(data: any, parent: string): void;

    /**
     * 更新源数据，差量更新子树
     * @param {object} data 子树数据模型
     * @param {string} parent 子树的父节点id
     */
    updateChild(data: any, parent: string): void;

    /**
     * 删除子树
     * @param {string} id 子树根节点id
     */
    removeChild(id: string): void;

    /**
     * 根据id获取对应的源数据
     * @param {string|object} id 元素id
     * @param {object} parent 从哪个节点开始寻找，为空时从根节点开始查找
     * @return {object} 对应源数据
     */
    findDataById(id: string | object, parent?: object): any;

    /**
     * 更改并应用树布局算法
     * @param {object} layout 布局算法
     */
    changeLayout(layout: object): void;

    /**
     * 根据目前的 data 刷新布局，更新到画布上。用于变更数据之后刷新视图。
     * @param {boolean} fitView 更新布局时是否需要适应窗口
     */
    refreshLayout(fitView: boolean): void;

    /**
     * 布局动画接口，用于数据更新时做节点位置更新的动画
     * @param {object} data 更新的数据
     * @param {function} onFrame 定义节点位置更新时如何移动
     */
    layoutAnimate(data: any, onFrame: Function): void;

    /**
     * 立即停止布局动画
     */
    stopLayoutAnimate(): void;

    /**
     * 是否在布局动画
     * @return {boolean} 是否有布局动画
     */
    isLayoutAnimating(): boolean;
  }

  /**
   * Util
   */
  interface Util {
    deepMix: typeof deepMix;
    mix: typeof mix;
    debounce: typeof debounce;
    each: typeof each;
    throttle: typeof throttle;
    mat3: typeof mat3;
    vec2: typeof vec2;
    vec3: typeof vec3;
    transform: typeof transform;
    clone: typeof clone;
    upperFirst: typeof upperFirst;
    isNil: typeof isNil;
    isArray: typeof isArray;
    createDom: typeof createDom;
    modifyCSS: typeof modifyCSS;
    isObject: typeof isObject;
    isPlainObject: typeof isPlainObject;
    isNumber: typeof isNumber;
    isString: typeof isString;
    uniqueId: typeof uniqueId;
    addEventListener: typeof addEventListener;
    wrapBehavior: typeof wrapBehavior;
    extend: typeof extend;
    augment: typeof augment;
    remove: typeof remove;

    /**
     * turn padding into [top, right, bottom, right]
     * @param padding
     */
    formatPadding(padding: number | string | number[]): [number, number, number, number];

    /**
     * 拷贝事件
     * @param e
     */
    cloneEvent(e: any): any;

    getBBox(element: any, parent: any): G.Box;

    /**
     * 获取某元素的自环边配置
     * @param cfg
     */
    getLoopCfgs(cfg: any): any;

    traverseTree(data: any, fn: Function): void;

    radialLayout(data: any, layout?: any): any;

    /**
     * 根据 label 所在线条的位置百分比，计算 label 坐标
     * @param {object}  pathShape  G 的 path 实例，一般是 Edge 实例的 keyShape
     * @param {number}  percent    范围 0 - 1 的线条百分比
     * @param {number}  refX     x 轴正方向为基准的 label 偏移
     * @param {number}  refY     y 轴正方向为基准的 label 偏移
     * @param {boolean} rotate     是否根据线条斜率旋转文本
     * @return {object} 文本的 x, y, 文本的旋转角度
     */
    getLabelPosition(
      pathShape: any,
      percent: number,
      refX: number,
      refY: number,
      rotate: boolean,
    ): {
      x: number;
      y: number;
      angle: number;
      rotate?: number;
    };

    getSpline(points: any): any;

    /**
     * 根据起始点、相对位置、偏移量计算控制点
     * @param  {Object} startPoint 起始点，包含 x,y
     * @param  {Object} endPoint  结束点, 包含 x,y
     * @param  {Number} percent   相对位置,范围 0-1
     * @param  {Number} offset    偏移量
     * @return {Object} 控制点，包含 x,y
     */
    getControlPoint(startPoint: Point, endPoint: Point, percent: number, offset: number): Point;

    /**
     * 是否在区间内
     * @param   {number}       value  值
     * @param   {number}       min    最小值
     * @param   {number}       max    最大值
     * @return  {boolean}      bool   布尔
     */
    isBetween(value: number, min: number, max: number): boolean;

    /**
     * 两线段交点
     * @param  {object}  p0 第一条线段起点
     * @param  {object}  p1 第一条线段终点
     * @param  {object}  p2 第二条线段起点
     * @param  {object}  p3 第二条线段终点
     * @return {object}  交点
     */
    getLineIntersect(p0: Point, p1: Point, p2: Point, p3: Point): Point;

    /**
     * point and rectangular intersection point
     * @param  {object} rect  rect
     * @param  {object} point point
     * @return {object} rst;
     */
    getRectIntersectByPoint(rect: Rect, point: Point): Point;

    /**
     * get point and circle inIntersect
     * @param {Object} circle 圆点，x,y,r
     * @param {Object} point 点 x,y
     * @return {object} applied point
     */
    getCircleIntersectByPoint(circle: Circle, point: Point): Point;

    /**
     * get point and ellipse inIntersect
     * @param {Object} ellipse 椭圆 x,y,rx,ry
     * @param {Object} point 点 x,y
     * @return {object} applied point
     */
    getEllispeIntersectByPoint(ellipse: Ellipse, point: Point): Point;

    /**
     * coordinate matrix transformation
     * @param  {number} point   coordinate
     * @param  {number} matrix  matrix
     * @param  {number} tag     could be 0 or 1
     * @return {object} transformed point
     */
    applyMatrix(point: Point, matrix: number, tag?: number): Point;

    /**
     * coordinate matrix invert transformation
     * @param  {number} point   coordinate
     * @param  {number} matrix  matrix
     * @param  {number} tag     could be 0 or 1
     * @return {object} transformed point
     */
    invertMatrix(point: Point, matrix: number, tag?: number): Point;

    /**
     * 扁平的数据格式转成树形
     * @param {array} data 扁平结构的数据
     * @param {string} value 树状结构的唯一标识
     * @param {string} parentId 父节点的键值
     * @return {array} 转成的树形结构数据
     */
    flatToTree(data: any[], value?: string, parentId?: string): any[];

    /**
     * 获取各个group中的节点
     * @param {object} data G6的数据模型
     * @return {object} 各个group中的节点
     */
    getAllNodeInGroups(data: any): any;
  }
  export const Util: Util;

  export const Layout: any;

  export const G: any;

  /**
   * Global
   */
  interface Global {
    /**
     * 只读，版本号
     */
    readonly version: string;

    /**
     * 根容器类名
     */
    rootContainerClassName: string;

    /**
     * 节点容器类名
     */
    nodeContainerClassName: string;

    /**
     * 连接线容器类名
     */
    edgeContainerClassName: string;

    /**
     * 自定义组容器类名
     */
    customGroupContainerClassName: string;

    /**
     * 委托容器类名
     */
    delegateContainerClassName: string;
    defaultNode: any;
    defaultEdge: any;
    nodeLabel: any;
    edgeLabel: any;

    /**
     * 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
     */
    nodeStateStyle: any;
    edgeStateStyle: any;
    loopPosition: any;
    delegateStyle: any;
  }
  export const Global: Global;

  /**
   * Shape
   */
  interface Shape {
    // 注册 Geometry 获取图形的入口
    registerFactory(factoryType: string, cfg: any): any;

    // 获得 ShapeFactory
    getFactory(factoryType: string): any;

    get(key: string): any;
  }
  export const Shape: Shape;

  export function registerNode(shapeType: string, cfg: any, extendShapeType?: string): any;

  export function registerEdge(shapeType: string, cfg: any, extendShapeType?: string): any;

  export function registerLayout(layoutType: string, cfg: any, extendLayoutType?: string): void;

  export function registerBehavior(type: string, behavior: any): void;

  /**
   * 版本号
   */
  export const version: string;
}
