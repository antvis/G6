import { addEventListener } from '@antv/dom-util';
import { ICanvas, IGroup, IShape } from '@antv/g-base';
import { each, isNil, wrapBehavior } from '@antv/util';
import { AbstractEvent, IG6GraphEvent, Matrix, Item, Util } from '@antv/g6-core';
import Graph from '../graph';

const { cloneEvent, isViewportChanged } = Util;

type Fun = () => void;

export default class EventController extends AbstractEvent {
  protected extendEvents: any[] = [];

  protected canvasHandler!: Fun;

  private resetHandler!: Fun;

  protected dragging: boolean = false;

  protected mousedown: boolean = false;

  protected preItem: Item | null = null;

  public destroyed: boolean;

  constructor(graph: Graph) {
    super(graph);
    this.destroy();
    this.graph = graph;
    this.destroyed = false;
    this.initEvents();
  }

  // 初始化 G6 中的事件
  protected initEvents() {
    const { graph, extendEvents = [] } = this;

    const canvas: ICanvas = graph.get('canvas');
    // canvas.set('draggable', true);
    const el = canvas.get('el');

    const canvasHandler: Fun = wrapBehavior(this, 'onCanvasEvents') as Fun;
    const originHandler = wrapBehavior(this, 'onExtendEvents');
    const wheelHandler = wrapBehavior(this, 'onWheelEvent');

    // each(EVENTS, event => {
    //   canvas.off(event).on(event, canvasHandler);
    // });

    canvas.off('*').on('*', canvasHandler);

    this.canvasHandler = canvasHandler;
    extendEvents.push(addEventListener(el, 'wheel', wheelHandler));

    if (typeof window !== 'undefined') {
      extendEvents.push(addEventListener(window as any, 'keydown', originHandler));
      extendEvents.push(addEventListener(window as any, 'keyup', originHandler));
      extendEvents.push(addEventListener(window as any, 'focus', originHandler));
    }

    // 数据变更，重置一些状态
    if (this.resetHandler) graph.off('afterchangedata', this.resetHandler);
    this.resetHandler = wrapBehavior(this, 'resetStatus') as Fun;
    graph.on('afterchangedata', this.resetHandler);
  }

  // 获取 shape 的 item 对象
  private static getItemRoot<T extends IShape>(shape: any): T {
    while (shape && !shape.get('item')) {
      shape = shape.get('parent');
    }
    return shape;
  }

  /**
   * 处理 canvas 事件
   * @param evt 事件句柄
   */
  protected onCanvasEvents(evt: IG6GraphEvent) {
    const { graph } = this;

    const canvas = graph.get('canvas');
    const { target } = evt;
    const eventType = evt.type;

    switch (eventType) {
      // solve G's problem: mousemove and mouseup are not triggered with drag and dragend
      case 'drag':
        this.onCanvasEvents(Object.assign({}, evt, { type: 'mousemove' }));
        break;
      case 'dragend':
        this.onCanvasEvents(Object.assign({}, evt, { type: 'mouseup' }));
        break;
      // solve G's problem: mousedown on other DOMs, mouseup on canvas, click event is triggered unexpectedly
      case 'mousedown':
        this.mousedown = true;
        break;
      case 'mouseup':
        // mouseup happend before click, so setTimeout to reset the tag for reference in click event
        setTimeout(() => this.mousedown = false);
        break;
      case 'click':
        // the mousedown is not happend, the click is invalid
        if (!this.mousedown) return;
        break;
      default:
        break;
    }
    /**
     * (clientX, clientY): 相对于页面的坐标；
     * (canvasX, canvasY): 相对于 <canvas> 左上角的坐标；
     * (x, y): 相对于整个画布的坐标, 与 model 的 x, y 是同一维度的。
     */
    evt.canvasX = evt.x;
    evt.canvasY = evt.y;
    let point = { x: evt.canvasX, y: evt.canvasY };

    const group: IGroup = graph.get('group');
    let matrix: Matrix = group.getMatrix();

    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    if (isViewportChanged(matrix)) {
      point = graph.getPointByClient(evt.clientX, evt.clientY);
    }

    evt.x = point.x;
    evt.y = point.y;

    evt.currentTarget = graph;

    if (target === canvas) {
      if (eventType === 'mousemove' || eventType === 'mouseleave') {
        this.handleMouseMove(evt, 'canvas');
      }
      evt.target = canvas;
      evt.item = null;

      graph.emit(eventType, evt);
      graph.emit(`canvas:${eventType}`, evt);
      return;
    }

    const itemShape: IShape = EventController.getItemRoot(target);
    if (!itemShape) {
      graph.emit(eventType, evt);
      return;
    }

    const item = itemShape.get('item');
    if (item.destroyed) {
      return;
    }

    const type = item.getType();

    // 事件target是触发事件的Shape实例，item是触发事件的item实例
    evt.target = target;
    evt.item = item;
    if (evt.canvasX === evt.x && evt.canvasY === evt.y) {
      const canvasPoint = graph.getCanvasByPoint(evt.x, evt.y);
      evt.canvasX = canvasPoint.x;
      evt.canvasY = canvasPoint.y;
    }

    if (evt.name && !evt.name.includes(':')) {
      graph.emit(`${type}:${eventType}`, evt); // emit('node:click', evt)
      graph.emit(eventType, evt); // emit('click', evt);
    } else if (evt.name) {
      graph.emit(evt.name, evt); // emit('text-shape:click', evt)
    }

    if (eventType === 'dragstart') {
      this.dragging = true;
    }
    if (eventType === 'dragend') {
      this.dragging = false;
    }
    if (eventType === 'mousemove') {
      this.handleMouseMove(evt, type);
    }
  }

  /**
   * 处理扩展事件
   * @param evt 事件句柄
   */
  protected onExtendEvents(evt: IG6GraphEvent) {
    this.graph.emit(evt.type, evt);
  }

  /**
   * 处理滚轮事件
   * @param evt 事件句柄
   */
  protected onWheelEvent(evt: IG6GraphEvent) {
    if (isNil(evt.wheelDelta)) {
      evt.wheelDelta = -evt.detail;
    }
    this.graph.emit('wheel', evt);
  }

  /**
   * 处理鼠标移动的事件
   * @param evt 事件句柄
   * @param type item 类型
   */
  private handleMouseMove(evt: IG6GraphEvent, type: string) {
    const { graph, preItem } = this;
    const canvas: ICanvas = graph.get('canvas');
    const item = (evt.target as any) === canvas ? null : evt.item;

    evt = cloneEvent(evt) as IG6GraphEvent;

    // 从前一个item直接移动到当前item，触发前一个item的leave事件
    if (preItem && preItem !== item && !preItem.destroyed) {
      evt.item = preItem;
      this.emitCustomEvent(preItem.getType(), 'mouseleave', evt);
      if (this.dragging) {
        this.emitCustomEvent(preItem.getType(), 'dragleave', evt);
      }
    }

    // 从一个item或canvas移动到当前item，触发当前item的enter事件
    if (item && preItem !== item) {
      evt.item = item;
      this.emitCustomEvent(type, 'mouseenter', evt);
      if (this.dragging) {
        this.emitCustomEvent(type, 'dragenter', evt);
      }
    }

    this.preItem = item;
  }

  /**
   * 在 graph 上面 emit 事件
   * @param itemType item 类型
   * @param eventType 事件类型
   * @param evt 事件句柄
   */
  private emitCustomEvent(itemType: string, eventType: string, evt: IG6GraphEvent) {
    evt.type = eventType;
    this.graph.emit(`${itemType}:${eventType}`, evt);
  }

  private resetStatus() {
    this.mousedown = false;
    this.dragging = false;
    this.preItem = null;
  }

  public destroy() {
    const { graph, canvasHandler, extendEvents } = this;
    const canvas: ICanvas = graph.get('canvas');

    // each(EVENTS, event => {
    //   canvas.off(event, canvasHandler);
    // });

    canvas.off('*', canvasHandler);

    each(extendEvents, (event) => {
      event.remove();
    });

    this.resetStatus();
    this.extendEvents.length = 0;
    (this.canvasHandler as Fun | null) = null;
    (this.resetHandler as Fun | null) = null;
    this.destroyed = true;
  }
}
