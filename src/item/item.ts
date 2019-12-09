import Group from '@antv/g-canvas/lib/group';
import each from '@antv/util/lib/each'
import isNil from '@antv/util/lib/is-nil';
import isPlainObject from '@antv/util/lib/is-plain-object'
import isString from '@antv/util/lib/is-string'
import uniqueId from '@antv/util/lib/unique-id'
import { IBBox, IEdgeConfig, IModelConfig, IModelStyle, INodeConfig, IPoint, IShapeBase } from '../../types';
import { IItem, IItemConfig } from "../interface/item";
import { getBBox } from '../util/graphic';
import { translate } from '../util/math';

const CACHE_BBOX = 'bboxCache';

const RESERVED_STYLES = [ 'fillStyle', 'strokeStyle', 
  'path', 'points', 'img', 'symbol' ];

export default  class Item implements IItem {
  public _cfg: IItemConfig = {}
  private defaultCfg: IItemConfig = {
    /**
     * id
     * @type {string}
     */
    id: null,

    /**
     * 类型
     * @type {string}
     */
    type: 'item',

    /**
     * data model
     * @type {object}
     */
    model: {} as IModelConfig,

    /**
     * g group
     * @type {G.Group}
     */
    group: null,

    /**
     * is open animate
     * @type {boolean}
     */
    animate: false,

    /**
     * visible - not group visible
     * @type {boolean}
     */
    visible: true,

    /**
     * locked - lock node
     * @type {boolean}
     */
    locked: false,
    /**
     * capture event
     * @type {boolean}
     */
    event: true,
    /**
     * key shape to calculate item's bbox
     * @type object
     */
    keyShape: null,
    /**
     * item's states, such as selected or active
     * @type Array
     */
    states: []
  };

  public destroyed: boolean = false

  constructor(cfg: IItemConfig) {
    this._cfg = Object.assign(this.defaultCfg, this.getDefaultCfg(), cfg)
    const group = cfg.group
    group.set('item', this)

    let id = this.get('model').id

    if(!id) {
      id = uniqueId(this.get('type'))
    }

    this.set('id', id)
    group.set('id', id)

    this.init()
    this.draw()
  }

  /**
   * 根据 keyshape 计算包围盒
   */
  private calculateBBox(): IBBox {
    const keyShape: IShapeBase = this.get('keyShape');
    const group: Group = this.get('group');
    // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒
    const bbox = getBBox(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  }

  /**
   * draw shape
   */
  private drawInner() {
    const self = this;
    const shapeFactory = self.get('shapeFactory');
    const group: Group = self.get('group');
    const model: IModelConfig = self.get('model');
    group.clear();

    if (!shapeFactory) {
      return;
    }
    self.updatePosition(model);
    const cfg = self.getShapeCfg(model); // 可能会附加额外信息
    const shapeType: string = cfg.shape;
    const keyShape: IShapeBase = shapeFactory.draw(shapeType, cfg, group);
    if (keyShape) {
      keyShape.isKeyShape = true;
      self.set('keyShape', keyShape);
      self.set('originStyle', this.getKeyShapeStyle());
    }
    // 防止由于用户外部修改 model 中的 shape 导致 shape 不更新
    this.set('currentShape', shapeType);
    this.resetStates(shapeFactory, shapeType);
  }

  /**
   * reset shape states
   * @param shapeFactory 
   * @param shapeType 
   */
  private resetStates(shapeFactory, shapeType: string) {
    const self = this;
    const states: string[] = self.get('states');
    each(states, state => {
      shapeFactory.setState(shapeType, state, true, self);
    });
  }

  protected init() {
    // TODO 实例化工厂方法，需要等 Shape 重构完成
    // const shapeFactory = Shape.getFactory(this.get('type'));
    // this.set('shapeFactory', shapeFactory);
  }

  /**
   * 获取属性
   * @internal 仅内部类使用
   * @param  {String} key 属性名
   * @return {object | string | number} 属性值
   */
  public get(key: string) {
    return this._cfg[key]
  }

  /**
   * 设置属性
   * @internal 仅内部类使用
   * @param {String|Object} key 属性名，也可以是对象
   * @param {object | string | number} val 属性值
   */
  public set(key: string, val): void {
    if(isPlainObject(key)) {
      this._cfg = Object.assign({}, this._cfg, key)
    } else {
      this._cfg[key] = val
    }
  }

  protected getDefaultCfg() {
    return {}
  }


  /**
   * 更新/刷新等操作后，清除 cache
   */
  protected clearCache() {
    this.set(CACHE_BBOX, null);
  }

  /**
   * 渲染前的逻辑，提供给子类复写
   */
  protected beforeDraw() {

  }

  /**
   * 渲染后的逻辑，提供给子类复写
   */
  protected afterDraw() {

  }

  /**
   * 更新后做一些工作
   */
  protected afterUpdate() {

  }

  /**
   * draw shape
   */
  public draw() {
    this.beforeDraw()
    this.drawInner()
    this.afterDraw()
  }

  public getKeyShapeStyle(): IModelStyle {
    const keyShape = this.getKeyShape();
    if (keyShape) {
      const styles: IModelStyle = {};
      each(keyShape.attr(), (val, key) => {
        if (RESERVED_STYLES.indexOf(key) < 0) {
          styles[key] = val;
        }
      });
      return styles;
    }
  }

  // TODO 确定还是否需要该方法
  public getShapeCfg(model: IModelConfig): IModelConfig {
    const styles = this.get('styles');
    if (styles && styles.default) {
      // merge graph的item样式与数据模型中的样式
      const newModel = Object.assign({}, model);
      newModel.style = Object.assign({}, styles.default, model.style);
      return newModel;
    }
    return model;
  }

  /**
   * 获取指定状态的样式，去除了全局样式
   * @param state 状态名称
   */
  public getStateStyle(state: string) {
    const type: string = this.getType()
    const styles = this.get(`${type}StateStyles`);
    const stateStyle = styles && styles[state];
    return stateStyle;
  }

  /**
   * get keyshape style
   */
  public getOriginStyle(): IModelStyle {
    return this.get('originStyle');
  }

  public getCurrentStatesStyle(): IModelStyle {
    const self = this;
    const originStyle = self.getOriginStyle();
    each(self.getStates(), state => {
      Object.assign(originStyle, self.getStateStyle(state));
    });
    return originStyle;
  }

  /**
   * 更改元素状态， visible 不属于这个范畴
   * @internal 仅提供内部类 graph 使用
   * @param {String} state 状态名
   * @param {Boolean} enable 节点状态值
   */
  public setState(state: string, enable: boolean) {
    const states: string[] = this.get('states');
    const shapeFactory = this.get('shapeFactory');
    const index = states.indexOf(state);
    if (enable) {
      if (index > -1) {
        return;
      }
      states.push(state);
    } else if (index > -1) {
      states.splice(index, 1);
    }

    if (shapeFactory) {
      const model: IModelConfig = this.get('model');
      shapeFactory.setState(model.shape, state, enable, this);
    }
  }

  // TODO 
  public clearStates(states: string[]) {
    const self = this;
    const originStates = self.getStates();
    const shapeFactory = self.get('shapeFactory');
    const shape: string = self.get('model').shape;
    if (!states) {
      self.set('states', []);
      shapeFactory.setState(shape, originStates[0], false, self);
      return;
    }
    if (isString(states)) {
      states = [ states ];
    }
    const newStates = originStates.filter(state => {
      shapeFactory.setState(shape, state, false, self);
      if (states.indexOf(state) >= 0) {
        return false;
      }
      return true;
    });
    self.set('states', newStates);
  }

  /**
   * 节点的图形容器
   * @return {G.Group} 图形容器
   */
  public getContainer(): Group {
    return this.get('group');
  }

  /**
   * 节点的关键形状，用于计算节点大小，连线截距等
   * @return {G.Shape} 关键形状
   */
  public getKeyShape(): IShapeBase {
    return this.get('keyShape');
  }

  /**
   * 节点数据模型
   * @return {Object} 数据模型
   */
  public getModel(): IModelConfig {
    return this.get('model');
  }

  /**
   * 节点类型
   * @return {string} 节点的类型
   */
  public getType(): string {
    return this.get('type');
  }

  /**
   * 是否是 Item 对象，悬空边情况下进行判定
   */
  public isItem(): boolean {
    return true
  }
  
  /**
   * 获取当前元素的所有状态
   * @return {Array} 元素的所有状态
   */
  public getStates(): string[] {
    return this.get('states');
  }

  /**
   * 当前元素是否处于某状态
   * @param {String} state 状态名
   * @return {Boolean} 是否处于某状态
   */
  public hasState(state: string): boolean {
    const states = this.getStates()
    return states.indexOf(state) >= 0;
  }

  /**
   * 刷新一般用于处理几种情况
   * 1. item model 在外部被改变
   * 2. 边的节点位置发生改变，需要重新计算边
   *
   * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
   */
  public refresh() {
    const model: IModelConfig = this.get('model');
    // 更新元素位置
    this.updatePosition(model);
    // 更新元素内容，样式
    this.updateShape();
    // 做一些更新之后的操作
    this.afterUpdate();
    // 清除缓存
    this.clearCache();
  }

  public isOnlyMove(cfg?: IModelConfig): boolean {
    return false
  }

  /**
   * 将更新应用到 model 上，刷新属性
   * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
   * @param  {Object} cfg       配置项，可以是增量信息
   */
  public update(cfg: IModelConfig) {
    const model: IModelConfig = this.get('model');
    const originPosition: IPoint = { x: model.x, y: model.y };

    // 直接将更新合到原数据模型上，可以保证用户在外部修改源数据然后刷新时的样式符合期待。
    Object.assign(model, cfg);
    
    // isOnlyMove 仅用于node
    const onlyMove = this.isOnlyMove(cfg);
    // 仅仅移动位置时，既不更新，也不重绘
    if (onlyMove) {
      this.updatePosition(model);
    } else {
      // 如果 x,y 有变化，先重置位置
      if (originPosition.x !== model.x || originPosition.y !== model.y) {
        this.updatePosition(model);
      }
      this.updateShape();
    }
    this.afterUpdate();
    this.clearCache();
  }

  /**
   * 更新元素内容，样式
   */
  public updateShape() {
    const shapeFactory = this.get('shapeFactory');
    const model = this.get('model');
    const shape = model.shape;
    // 判定是否允许更新
    // 1. 注册的节点允许更新
    // 2. 更新后的 shape 等于原先的 shape
    if (shapeFactory.shouldUpdate(shape) && shape === this.get('currentShape')) {
      const updateCfg = this.getShapeCfg(model);
      shapeFactory.update(shape, updateCfg, this);
    } else {
      // 如果不满足上面两种状态，重新绘制
      this.draw();
    }
    this.set('originStyle', this.getKeyShapeStyle());
    // 更新后重置节点状态
    this.resetStates(shapeFactory, shape);
  }

  /**
   * 更新位置，避免整体重绘
   * @param {object} cfg 待更新数据
   */
  public updatePosition(cfg: IModelConfig) {
    const model: IModelConfig = this.get('model');

    const x = isNil(cfg.x) ? model.x : cfg.x;
    const y = isNil(cfg.y) ? model.y : cfg.y;

    const group: Group = this.get('group');

    if (isNil(x) || isNil(y)) {
      return;
    }
    group.resetMatrix();
    // G 4.0 element 中移除了矩阵相关方法，详见https://www.yuque.com/antv/blog/kxzk9g#4rMMV
    translate(group, { x, y });
    model.x = x;
    model.y = y;
    this.clearCache();     // 位置更新后需要清除缓存
  }

  /**
   * 获取元素的包围盒
   * @return {Object} 包含 x,y,width,height, centerX, centerY
   */
  public getBBox(): IBBox {
    // 计算 bbox 开销有些大，缓存
    let bbox: IBBox = this.get(CACHE_BBOX);
    if (!bbox) {
      bbox = this.calculateBBox();
      this.set(CACHE_BBOX, bbox);
    }
    return bbox;
  }

  /**
   * 将元素放到最前面
   */
  public toFront() {
    this.get('group').toFront();
  }

  /**
   * 将元素放到最后面
   */
  public toBack() {
    this.get('group').toBack();
  }

  /**
   * 显示元素
   */
  public show() {
    this.changeVisibility(true);
  }

  /**
   * 隐藏元素
   */
  public hide() {
    this.changeVisibility(false);
  }

  /**
   * 更改是否显示
   * @param  {Boolean} visible 是否显示
   */
  public changeVisibility(visible: boolean) {
    const group: Group = this.get('group');
    if (visible) {
      group.show();
    } else {
      group.hide();
    }
    this.set('visible', visible);
  }

  /**
   * 元素是否可见
   */
  public isVisible(): boolean {
    return this.get('visible');
  }

  /**
   * 是否拾取及出发该元素的交互事件
   * @param {Boolean} enable 标识位
   */
  public enableCapture(enable: boolean) {
    const group: Group = this.get('group');
    if(group) {
      group.attr('capture', enable)
    }
  }

  public destroy() {
    if(!this.destroyed) {
      const animate = this.get('animate');
      const group: Group = this.get('group');
      if (animate) {
        group.stopAnimate();
      }
      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  }

}