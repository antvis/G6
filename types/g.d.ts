export declare namespace G {
  export type ShapeType =
    | 'arc'
    | 'circle'
    | 'dom'
    | 'ellipse'
    | 'fan'
    | 'image'
    | 'line'
    | 'marker'
    | 'path'
    | 'polygon'
    | 'polyline'
    | 'rect'
    | 'text';
  type Item = Shape | Group;
  type Cfg = { [k in string]: any };
  type Attrs = { [k in string]: any };
  interface Box {
    x: number;
    y: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
  }
  export interface Group extends Element {
    new (cfg: Cfg): Group;
    isGroup: true;
    type: 'group';
    canFill: boolean;
    canStroke: boolean;

    getDefaultCfg(): Cfg;

    addShape(type: ShapeType, cfg: Cfg): Shape;

    /** 添加图组
     * @param  {Function|Object|undefined} param 图组类
     * @param  {Object} cfg 配置项
     * @return {Object} rst 图组
     */
    addGroup(param: Function | Cfg | undefined, cfg: Cfg): Group;

    /** 绘制背景
     * @param  {Array} padding 内边距
     * @param  {Attrs} attrs 图形属性
     * @return {Object} 背景层对象
     */
    renderBack(padding: [number, number, number, number], attrs: Attrs): Shape;

    removeChild(item: Item, destroy: boolean): this;

    /**
     * 向组中添加shape或者group
     * @param {Object} items 图形或者分组
     * @return {Object} group 本尊
     */
    add(items: Item[]): this;

    contain(item: Item): boolean;

    getChildByIndex(index: number): any;

    getFirst(): Item;

    getLast(): Item;

    getBBox(): Box;

    getCount(): number;

    sort(): this;

    findById(): Item;

    findByClassName(className: string): Item;

    /**
     * 根据查找函数查找分组或者图形
     * @param  {Function} fn 匹配函数
     * @return {Canvas.Base} 分组或者图形
     */
    find(fn: Function | string): Item;

    /**
     * @param  {Function} fn filter mathod
     * @return {Array} all the matching shapes and groups
     */
    findAll(fn: (...args: any[]) => boolean): Item[];

    /**
     * @Deprecated
     */
    findBy: Function;
    /**
     * @Deprecated
     */
    findAllBy: Function;

    getShape(x: any, y: any): Shape;

    clearTotalMatrix(): void;

    clear(delayRemove?: boolean): this;

    destroy(): void;

    clone(): Group;
  }
  export interface Shape extends Element {
    new (cfg: Cfg): Shape;
    isPointInPath(x: number, y: number): boolean;
    isShape: true;

    drawInner(context: any): void;

    /**
     * 击中图形时是否进行包围盒判断
     * @return {Boolean} [description]
     */
    isHitBox(): boolean;

    /**
     * 节点是否能够被击中
     * @param {Number} x x坐标
     * @param {Number} y y坐标
     * @return {Boolean} 是否在图形中
     */
    isHit(x: number, y: number): boolean;

    /**
     * 获取拾取时线的宽度，需要考虑附加的线的宽度
     */
    getHitLineWidth(): number;

    /**
     * 清除当前的矩阵
     */
    clearTotalMatrix(): void;

    clearBBox(): void;

    getBBox(): Box;

    clone(): Shape;
  }

  interface Element extends Attribute, Transform, Animate, AdvancedEventEmitter {
    new (): Element;
    init(): void;
    getParent(): Element;
    /**
     * 获取默认的配置信息
     * @protected
     * @return {Object} 默认的属性
     */
    getDefaultCfg(): Cfg;
    set(name: string, value: any): this;
    /**
     * @deprecated
     */
    setSilent: Function;
    get(name: string): any;
    show(): this;
    hide(): this;
    remove(destroy: boolean | undefined, delayRemove?: boolean): this;
    destroy(): void;
    toFront(): void;
    toBack(): void;
    setZIndex(zIndex: number): number;
    clone(): Element;
    getBBox(): any;
  }

  interface Attribute {
    canFill: boolean;
    canStroke: boolean;
    initAttrs(attrs: Attrs): this;
    /**
     * @protected
     */
    getDefaultAttrs(): any;
    /**
     * 设置或者设置属性，有以下 4 种情形：
     *   - name 不存在, 则返回属性集合
     *   - name 为字符串，value 为空，获取属性值
     *   - name 为字符串，value 不为空，设置属性值，返回 this
     *   - name 为键值对，value 为空，设置属性值
     *
     * @param  {String | Object} name  属性名
     * @param  {*} value 属性值
     * @return {*} 属性值
     */
    attr(): Attrs;
    attr(name: string): any;
    attr(name: string, value: any): this;
    attr(attrs: Attrs): this;
    clearBBox(): void;
    hasFill(): boolean;
    hasStroke(): boolean;
  }

  interface Transform {
    initTransform(): void;
    resetMatrix(): void;
    translate(tx: number, ty: number): this;
    rotate(radian: number): this;
    scale(s1: number, s2: number): this;
    rotateAtStart(rotate: number): this;
    move(x: number, y: number): this;
    transform(ts: [string, number, number?]): this;
    setTransform(ts: [string, number, number?]): this;
    getMatrix(): any;
    setMatrix(m: any): this;
    apply(v: any, root: any): this;
    getTotalMatrix(): any;
    clearTotalMatrix: Function;
    invert(v: any): this;
    resetTransform(context: any): void;
  }

  interface Animate {
    /**
     * 执行动画
     * @param  {Object}   toProps  动画最终状态
     * @param  {Number}   duration 动画执行时间
     * @param  {String}   easing   动画缓动效果
     * @param  {Function} callback 动画执行后的回调
     * @param  {Number}   delay    动画延迟时间
     */
    animate(
      toProps: { onFrame?: any; repeat?: any },
      duration: number,
      easing: string,
      callback: Function,
      delay: number,
    ): void;
    stopAnimate(): void;
    pauseAnimate(): this;
    resumeAnimate(): this;
  }

  interface AdvancedEventEmitter extends EventEmitter {
    new (): AdvancedEventEmitter;
    emit(evt: string, e?: Event): void;
  }

  interface EventEmitter {
    new (): EventEmitter;
    on(evt: string, callback: Function, one: any): this;
    one(evt: string, callback: Function): this;
    emit(evt: string): void;
    trigger(): void;
    off(evt: string, callback: Function): this | undefined;
    removeEvent(): this;
  }
}
