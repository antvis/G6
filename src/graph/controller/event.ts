import addEventListener from '@antv/dom-util/lib/add-event-listener';
import { ICanvas } from '@antv/g-base/lib/interfaces';
import Group from '@antv/g-canvas/lib/group';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import each from '@antv/util/lib/each';
import isNil from '@antv/util/lib/is-nil';
import wrapBehavior from '@antv/util/lib/wrap-behavior';
import Graph from '../graph';
import { IG6GraphEvent, Matrix, Item } from '../../types';
import { cloneEvent, isViewportChanged } from '../../util/base';
import { mat3 } from '@antv/matrix-util';


type Fun = () => void;

const EVENTS = [
  'click',
  'mousedown',
  'mousewheel',
  'mouseup',
  'dblclick',
  'contextmenu',
  'mouseenter',
  'mouseout',
  'mouseover',
  'mousemove',
  'mouseleave',
  'dragstart',
  'dragend',
  'drag',
  'dragenter',
  'dragleave',
  'dragover',
  'dragout',
  'drop',
  'touchstart',
  'touchmove',
  'touchend',
];
export default class EventController {
  private graph: Graph;

  private extendEvents: any[];

  private canvasHandler!: Fun;

  private dragging: boolean;

  private preItem: Item | null = null;

  public destroyed: boolean;

  constructor(graph: Graph) {
    this.graph = graph;
    this.extendEvents = [];
    this.dragging = false;
    this.destroyed = false;
    this.initEvents();
  }

  // 初始化 G6 中的事件
  private initEvents() {
    const { graph, extendEvents } = this;

    const canvas: ICanvas = graph.get('canvas');
    // canvas.set('draggable', true);
    const el = canvas.get('el');

    const canvasHandler: Fun = wrapBehavior(this, 'onCanvasEvents') as Fun;
    const originHandler = wrapBehavior(this, 'onExtendEvents');
    const wheelHandler = wrapBehavior(this, 'onWheelEvent');

    each(EVENTS, event => {
      canvas.on(event, canvasHandler);
    });

    this.canvasHandler = canvasHandler;
    extendEvents.push(addEventListener(el, 'DOMMouseScroll', wheelHandler));
    extendEvents.push(addEventListener(el, 'mousewheel', wheelHandler));

    if (typeof window !== 'undefined') {
      extendEvents.push(addEventListener(window as any, 'keydown', originHandler));
      extendEvents.push(addEventListener(window as any, 'keyup', originHandler));
    }
  }

  // 获取 shape 的 item 对象
  private static getItemRoot<T extends ShapeBase>(shape: any): T {
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
    /**
     * (clientX, clientY): 相对于页面的坐标；
     * (canvasX, canvasY): 相对于 <canvas> 左上角的坐标；
     * (x, y): 相对于整个画布的坐标, 与 model 的 x, y 是同一维度的。
     */
    evt.canvasX = evt.x;
    evt.canvasY = evt.y;
    let point = { x: evt.canvasX, y: evt.canvasY };

    const group: Group = graph.get('group');
    let matrix: Matrix = group.getMatrix();
    if (!matrix) {
      matrix = mat3.create();
    }

    if (isViewportChanged(matrix)) {
      point = graph.getPointByCanvas(evt.canvasX, evt.canvasY);
    }

    evt.x = point.x;
    evt.y = point.y;

    evt.currentTarget = graph;

    if (target === canvas) {
      if (eventType === 'mousemove') {
        this.handleMouseMove(evt, 'canvas');
      }
      evt.target = canvas;
      evt.item = null;

      graph.emit(eventType, evt);
      graph.emit(`canvas:${eventType}`, evt);
      return;
    }

    const itemShape: ShapeBase = EventController.getItemRoot(target);
    if (!itemShape) {
      graph.emit(eventType, evt);
      return;
    }

    const item = itemShape.get('item');
    if (item.destroyed) {
      return;
    }

    const type = item.getType();

    // 事件target是触发事件的Shape实例，, item是触发事件的item实例
    evt.target = target;
    evt.item = item;
    graph.emit(eventType, evt);

    // g的事件会冒泡，如果target不是canvas，可能会引起同个节点触发多次，需要另外判断
    if (
      eventType === 'mouseenter' ||
      eventType === 'mouseleave' ||
      eventType === 'dragenter' ||
      eventType === 'dragleave'
    ) {
      return;
    }

    graph.emit(`${type}:${eventType}`, evt);

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
    const item = evt.target === canvas ? null : evt.item;

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

  public destroy() {
    const { graph, canvasHandler, extendEvents } = this;
    const canvas: ICanvas = graph.get('canvas');

    each(EVENTS, event => {
      canvas.off(event, canvasHandler);
    });

    each(extendEvents, event => {
      event.remove();
    });

    this.dragging = false;
    this.preItem = null;
    this.extendEvents.length = 0;
    (this.canvasHandler as Fun | null) = null;
    this.destroyed = true;
  }
}
