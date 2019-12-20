import addEventListener from '@antv/dom-util/lib/add-event-listener'
import Canvas from '@antv/g-base/lib/abstract/canvas';
import Group from '@antv/g-canvas/lib/group';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import each from '@antv/util/lib/each'
import isNil from '@antv/util/lib/is-nil';
import wrapBehavior from '@antv/util/lib/wrap-behavior';
import { IGraph } from '@g6/interface/graph';
import { G6Event, IG6GraphEvent, Matrix } from '@g6/types';
import { cloneEvent } from '@g6/util/base';

type Fun = () => void

const ORIGIN_MATRIX = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
const MATRIX_LEN = 9;

export default class EventController {
  private graph: IGraph
  private extendEvents: any[]
  private canvasHandler: Fun;
  private dragging: boolean
  private preItem

  constructor(graph: IGraph) {
    this.graph = graph
    this.extendEvents = []
    this.dragging = false
    this.initEvents()
  }

  // 初始化 G6 中的事件
  private initEvents() {
    const self = this
    const graph = this.graph;
    const canvas = graph.get('canvas');
    const el = canvas.get('el');
    const extendEvents = this.extendEvents;
    const canvasHandler: Fun = wrapBehavior(self, 'onCanvasEvents') as Fun;
    const originHandler = wrapBehavior(self, 'onExtendEvents');
    const wheelHandler = wrapBehavior(self, 'onWheelEvent');
    each(G6Event, event => {
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

  // 判断 viewport 是否改变，通过和单位矩阵对比
  private isViewportChanged(matrix: Matrix) {
    // matrix 为 null， 则说明没有变化
    if(!matrix) {
      return false
    }

    for (let i = 0; i < MATRIX_LEN; i++) {
      if (matrix[i] !== ORIGIN_MATRIX[i]) {
        return true;
      }
    }
    return false;
  }

  // 获取 shape 的 item 对象
  private getItemRoot<T extends ShapeBase>(shape: any): T {
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
    const self = this;
    const graph = self.graph;
    const canvas = graph.get('canvas');
    const pixelRatio: number = canvas.get('pixelRatio');
    const target = evt.target;
    const eventType = evt.type;
    /**
     * (clientX, clientY): 相对于页面的坐标；
     * (canvasX, canvasY): 相对于 <canvas> 左上角的坐标；
     * (x, y): 相对于整个画布的坐标, 与 model 的 x, y 是同一维度的。
     */
    evt.canvasX = evt.x / pixelRatio;
    evt.canvasY = evt.y / pixelRatio;
    let point = { x: evt.canvasX, y: evt.canvasY };

    const group: Group = graph.get('group')
    const matrix: Matrix = group.getMatrix()
    
    if(this.isViewportChanged(matrix)) {
      point = graph.getPointByCanvas(evt.canvasX, evt.canvasY)
    }

    evt.x = point.x
    evt.y = point.y

    evt.currentTarget = graph

    if(target === canvas) {
      if (eventType === 'mousemove') {
        self.handleMouseMove(evt, 'canvas');
      }
      evt.target = canvas;
      evt.item = null;
      graph.emit(eventType, evt);
      graph.emit('canvas:' + eventType, evt);
      return;
    }

    const itemShape: ShapeBase = this.getItemRoot(target);
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
    if (eventType === 'mouseenter' || eventType === 'mouseleave' || eventType === 'dragenter' || eventType === 'dragleave') {
      return;
    }

    graph.emit(type + ':' + eventType, evt);

    if (eventType === 'dragstart') {
      self.dragging = true;
    }
    if (eventType === 'dragend') {
      self.dragging = false;
    }
    if (eventType === 'mousemove') {
      self.handleMouseMove(evt, type);
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
    const self = this;
    const graph = this.graph
    const canvas: Canvas = graph.get('canvas');
    const item = evt.target === canvas ? null : evt.item;
    const preItem = this.preItem;

    evt = cloneEvent(evt) as IG6GraphEvent

    // 从前一个item直接移动到当前item，触发前一个item的leave事件
    if (preItem && preItem !== item && !preItem.destroyed) {
      evt.item = preItem;
      self.emitCustomEvent(preItem.getType(), 'mouseleave', evt);
      if (self.dragging) {
        self.emitCustomEvent(preItem.getType(), 'dragleave', evt);
      }
    }

    // 从一个item或canvas移动到当前item，触发当前item的enter事件
    if (item && preItem !== item) {
      evt.item = item;
      self.emitCustomEvent(type, 'mouseenter', evt);
      if (self.dragging) {
        self.emitCustomEvent(type, 'dragenter', evt);
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
    this.graph.emit(itemType + ':' + eventType, evt);
  }

  public destroy() {
    const graph = this.graph;
    const canvasHandler = this.canvasHandler;
    const extendEvents = this.extendEvents
    const canvas: Canvas = graph.get('canvas');

    each(G6Event, event => {
      canvas.off(event, canvasHandler);
    });

    each(extendEvents, event => {
      event.remove();
    });

    this.dragging = false
    this.preItem = null
    this.extendEvents.length = 0
    this.canvasHandler = null
  }
}

