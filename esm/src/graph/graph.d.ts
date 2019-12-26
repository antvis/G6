import EventEmitter from '@antv/event-emitter';
import { BBox, Point } from '@antv/g-base/lib/types';
import { GraphOptions, IGraph, IModeOption, IModeType, IStates } from '@g6/interface/graph';
import { IEdge, INode } from '@g6/interface/item';
import { EdgeConfig, GraphData, GroupConfig, Item, ITEM_TYPE, ModelConfig, NodeConfig, NodeMapConfig, Padding } from '@g6/types';
interface IGroupBBox {
    [key: string]: BBox;
}
interface PrivateGraphOption extends GraphOptions {
    data: GraphData;
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
    private animating;
    private _cfg;
    destroyed: boolean;
    constructor(cfg: GraphOptions);
    private init;
    private initCanvas;
    private initPlugin;
    private initGroups;
    getDefaultCfg(): PrivateGraphOption;
    /**
     * 将值设置到 this._cfg 变量上面
     * @param key 键 或 对象值
     * @param val 值
     */
    set<T = any>(key: string | object, val?: T): Graph;
    /**
     * 获取 this._cfg 中的值
     * @param key 键
     */
    get(key: string): any;
    /**
     * 清理元素多个状态
     * @param {string|Item} item 元素id或元素实例
     * @param {string[]} states 状态
     */
    clearItemStates(item: Item, states: string[]): void;
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
    node(nodeFn: (config: NodeConfig) => NodeConfig): void;
    /**
     * 设置各个边样式
     * @param {function} edgeFn 指定每个边的样式,用法同 node
     */
    edge(edgeFn: (config: EdgeConfig) => EdgeConfig): void;
    /**
     * 根据 ID 查询图元素实例
     * @param id 图元素 ID
     */
    findById(id: string): Item;
    /**
     * 根据对应规则查找单个元素
     * @param {ITEM_TYPE} type 元素类型(node | edge | group)
     * @param {(item: T, index: number) => T} fn 指定规则
     * @return {T} 元素实例
     */
    find<T extends Item>(type: ITEM_TYPE, fn: (item: T, index?: number) => boolean): T;
    /**
     * 查找所有满足规则的元素
     * @param {string} type 元素类型(node|edge)
     * @param {string} fn 指定规则
     * @return {array} 元素实例
     */
    findAll<T extends Item>(type: ITEM_TYPE, fn: (item: T, index?: number) => boolean): T[];
    /**
     * 查找所有处于指定状态的元素
     * @param {string} type 元素类型(node|edge)
     * @param {string} state 状态
     * @return {object} 元素实例
     */
    findAllByState<T extends Item>(type: ITEM_TYPE, state: string): T[];
    /**
     * 平移画布
     * @param dx 水平方向位移
     * @param dy 垂直方向位移
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
    fitView(padding: Padding): void;
    /**
     * 新增行为
     * @param {string | IModeOption | IModeType[]} behaviors 添加的行为
     * @param {string | string[]} modes 添加到对应的模式
     * @return {Graph} Graph
     */
    addBehaviors(behaviors: string | IModeOption | IModeType[], modes: string | string[]): Graph;
    /**
     * 移除行为
     * @param {string | IModeOption | IModeType[]} behaviors 移除的行为
     * @param {string | string[]} modes 从指定的模式中移除
     * @return {Graph} Graph
     */
    removeBehaviors(behaviors: string | IModeOption | IModeType[], modes: string | string[]): Graph;
    /**
     * 伸缩窗口
     * @param ratio 伸缩比例
     * @param center 以center的x, y坐标为中心缩放
     */
    zoom(ratio: number, center?: Point): void;
    /**
     * 伸缩视口到一固定比例
     * @param {number} toRatio 伸缩比例
     * @param {Point} center 以center的x, y坐标为中心缩放
     */
    zoomTo(toRatio: number, center: Point): void;
    /**
     * 将元素移动到视口中心
     * @param {Item} item 指定元素
     */
    focusItem(item: Item): void;
    /**
     * 自动重绘
     * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
     */
    autoPaint(): void;
    /**
     * 仅画布重新绘制
     */
    paint(): void;
    /**
     * 将屏幕坐标转换为视口坐标
     * @param {number} clientX 屏幕x坐标
     * @param {number} clientY 屏幕y坐标
     * @return {Point} 视口坐标
     */
    getPointByClient(clientX: number, clientY: number): Point;
    /**
     * 将视口坐标转换为屏幕坐标
     * @param {number} x 视口x坐标
     * @param {number} y 视口y坐标
     * @return {Point} 视口坐标
     */
    getClientByPoint(x: number, y: number): Point;
    /**
     * 将画布坐标转换为视口坐标
     * @param {number} canvasX 画布 x 坐标
     * @param {number} canvasY 画布 y 坐标
     * @return {object} 视口坐标
     */
    getPointByCanvas(canvasX: number, canvasY: number): Point;
    /**
     * 将视口坐标转换为画布坐标
     * @param {number} x 视口 x 坐标
     * @param {number} y 视口 y 坐标
     * @return {object} 画布坐标
     */
    getCanvasByPoint(x: number, y: number): Point;
    /**
     * 显示元素
     * @param {Item} item 指定元素
     */
    showItem(item: Item): void;
    /**
     * 隐藏元素
     * @param {Item} item 指定元素
     */
    hideItem(item: Item): void;
    /**
     * 刷新元素
     * @param {string|object} item 元素id或元素实例
     */
    refreshItem(item: Item): void;
    /**
     * 设置是否在更新/刷新后自动重绘
     * @param {boolean} auto 自动重绘
     */
    setAutoPaint(auto: boolean): void;
    /**
     * 删除元素
     * @param {Item} item 元素id或元素实例
     */
    remove(item: Item): void;
    /**
     * 删除元素
     * @param {Item} item 元素id或元素实例
     */
    removeItem(item: Item): void;
    /**
     * 新增元素 或 节点分组
     * @param {string} type 元素类型(node | edge | group)
     * @param {ModelConfig} model 元素数据模型
     * @return {Item} 元素实例
     */
    addItem(type: ITEM_TYPE, model: ModelConfig): Item;
    add(type: ITEM_TYPE, model: ModelConfig): Item;
    /**
     * 更新元素
     * @param {Item} item 元素id或元素实例
     * @param {ModelConfig} cfg 需要更新的数据
     */
    updateItem(item: Item, cfg: ModelConfig): void;
    /**
     * 更新元素
     * @param {Item} item 元素id或元素实例
     * @param {ModelConfig} cfg 需要更新的数据
     */
    update(item: Item, cfg: ModelConfig): void;
    /**
     * 设置元素状态
     * @param {Item} item 元素id或元素实例
     * @param {string} state 状态
     * @param {boolean} enabled 是否启用状态
     */
    setItemState(item: Item, state: string, enabled: boolean): void;
    /**
     * 设置视图初始化数据
     * @param {GraphData} data 初始化数据
     */
    data(data: GraphData): void;
    /**
     * 根据data接口的数据渲染视图
     */
    render(): void;
    /**
     * 接收数据进行渲染
     * @Param {Object} data 初始化数据
     */
    read(data: GraphData): void;
    private diffItems;
    /**
     * 更改源数据，根据新数据重新渲染视图
     * @param {object} data 源数据
     * @return {object} this
     */
    changeData(data: GraphData): Graph;
    /**
     * 根据数据渲染群组
     * @param {GraphData} data 渲染图的数据
     * @param {string} groupType group类型
     */
    renderCustomGroup(data: GraphData, groupType: string): void;
    /**
     * 导出图数据
     * @return {object} data
     */
    save(): GraphData;
    /**
     * 改变画布大小
     * @param  {number} width  画布宽度
     * @param  {number} height 画布高度
     * @return {object} this
     */
    changeSize(width: number, height: number): Graph;
    /**
     * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
     */
    refresh(): void;
    /**
     * 获取当前图中所有节点的item实例
     * @return {INode} item数组
     */
    getNodes(): INode[];
    /**
     * 获取当前图中所有边的item实例
     * @return {IEdge} item数组
     */
    getEdges(): IEdge[];
    /**
     * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
     */
    positionsAnimate(): void;
    /**
     * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
     */
    refreshPositions(): void;
    stopAnimate(): void;
    isAnimating(): boolean;
    /**
     * 获取当前视口伸缩比例
     * @return {number} 比例
     */
    getZoom(): number;
    /**
     * 获取当前的行为模式
     * @return {string} 当前行为模式
     */
    getCurrentMode(): string;
    /**
     * 切换行为模式
     * @param {string} mode 指定模式
     * @return {object} this
     */
    setMode(mode: string): Graph;
    /**
     * 清除画布元素
     * @return {object} this
     */
    clear(): Graph;
    /**
     * 返回图表的 dataUrl 用于生成图片
     * @return {string} 图片 dataURL
     */
    toDataURL(): string;
    /**
     * 画布导出图片
     * @param {String} name 图片的名称
     */
    downloadImage(name: string): void;
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
     * 收起分组
     * @param {string} groupId 分组ID
     */
    collapseGroup(groupId: string): void;
    /**
     * 展开分组
     * @param {string} groupId 分组ID
     */
    expandGroup(groupId: string): void;
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
     * 销毁画布
     */
    destroy(): void;
}
export {};
