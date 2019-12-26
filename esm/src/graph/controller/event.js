import addEventListener from '@antv/dom-util/lib/add-event-listener';
import each from '@antv/util/lib/each';
import isNil from '@antv/util/lib/is-nil';
import wrapBehavior from '@antv/util/lib/wrap-behavior';
import { G6Event } from '@g6/types';
import { cloneEvent } from '@g6/util/base';
var ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];
var MATRIX_LEN = 9;
var EventController = /** @class */ (function () {
    function EventController(graph) {
        this.graph = graph;
        this.extendEvents = [];
        this.dragging = false;
        // this.initEvents()
    }
    // 初始化 G6 中的事件
    EventController.prototype.initEvents = function () {
        var self = this;
        var graph = this.graph;
        var canvas = graph.get('canvas');
        var el = canvas.get('el');
        var extendEvents = this.extendEvents;
        var canvasHandler = wrapBehavior(self, 'onCanvasEvents');
        var originHandler = wrapBehavior(self, 'onExtendEvents');
        var wheelHandler = wrapBehavior(self, 'onWheelEvent');
        each(G6Event, function (event) {
            canvas.on(event, canvasHandler);
        });
        this.canvasHandler = canvasHandler;
        extendEvents.push(addEventListener(el, 'DOMMouseScroll', wheelHandler));
        extendEvents.push(addEventListener(el, 'mousewheel', wheelHandler));
        if (typeof window !== 'undefined') {
            extendEvents.push(addEventListener(window, 'keydown', originHandler));
            extendEvents.push(addEventListener(window, 'keyup', originHandler));
        }
    };
    // 判断 viewport 是否改变，通过和单位矩阵对比
    EventController.prototype.isViewportChanged = function (matrix) {
        for (var i = 0; i < MATRIX_LEN; i++) {
            if (matrix[i] !== ORIGIN_MATRIX[i]) {
                return true;
            }
        }
        return false;
    };
    // 获取 shape 的 item 对象
    EventController.prototype.getItemRoot = function (shape) {
        while (shape && !shape.get('item')) {
            shape = shape.get('parent');
        }
        return shape;
    };
    /**
     * 处理 canvas 事件
     * @param evt 事件句柄
     */
    EventController.prototype.onCanvasEvents = function (evt) {
        var self = this;
        var graph = self.graph;
        var canvas = graph.get('canvas');
        var pixelRatio = canvas.get('pixelRatio');
        var target = evt.target;
        var eventType = evt.type;
        /**
         * (clientX, clientY): 相对于页面的坐标；
         * (canvasX, canvasY): 相对于 <canvas> 左上角的坐标；
         * (x, y): 相对于整个画布的坐标, 与 model 的 x, y 是同一维度的。
         */
        evt.canvasX = evt.x / pixelRatio;
        evt.canvasY = evt.y / pixelRatio;
        var point = { x: evt.canvasX, y: evt.canvasY };
        var group = graph.get('group');
        var matrix = group.getMatrix();
        if (this.isViewportChanged(matrix)) {
            point = graph.getPointByCanvas(evt.canvasX, evt.canvasY);
        }
        evt.x = point.x;
        evt.y = point.y;
        evt.currentTarget = graph;
        if (target === canvas) {
            if (eventType === 'mousemove') {
                self.handleMouseMove(evt, 'canvas');
            }
            evt.target = canvas;
            evt.item = null;
            graph.emit(eventType, evt);
            graph.emit('canvas:' + eventType, evt);
            return;
        }
        var itemShape = this.getItemRoot(target);
        if (!itemShape) {
            graph.emit(eventType, evt);
            return;
        }
        var item = itemShape.get('item');
        if (item.destroyed) {
            return;
        }
        var type = item.getType();
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
    };
    /**
     * 处理扩展事件
     * @param evt 事件句柄
     */
    EventController.prototype.onExtendEvents = function (evt) {
        this.graph.emit(evt.type, evt);
    };
    /**
     * 处理滚轮事件
     * @param evt 事件句柄
     */
    EventController.prototype.onWheelEvent = function (evt) {
        if (isNil(evt.wheelDelta)) {
            evt.wheelDelta = -evt.detail;
        }
        this.graph.emit('wheel', evt);
    };
    /**
     * 处理鼠标移动的事件
     * @param evt 事件句柄
     * @param type item 类型
     */
    EventController.prototype.handleMouseMove = function (evt, type) {
        var self = this;
        var graph = this.graph;
        var canvas = graph.get('canvas');
        var item = evt.target === canvas ? null : evt.item;
        var preItem = this.preItem;
        evt = cloneEvent(evt);
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
    };
    /**
     * 在 graph 上面 emit 事件
     * @param itemType item 类型
     * @param eventType 事件类型
     * @param evt 事件句柄
     */
    EventController.prototype.emitCustomEvent = function (itemType, eventType, evt) {
        evt.type = eventType;
        this.graph.emit(itemType + ':' + eventType, evt);
    };
    EventController.prototype.destroy = function () {
        var graph = this.graph;
        var canvasHandler = this.canvasHandler;
        var extendEvents = this.extendEvents;
        var canvas = graph.get('canvas');
        each(G6Event, function (event) {
            canvas.off(event, canvasHandler);
        });
        each(extendEvents, function (event) {
            event.remove();
        });
        this.dragging = false;
        this.preItem = null;
        this.extendEvents.length = 0;
        this.canvasHandler = null;
    };
    return EventController;
}());
export default EventController;
//# sourceMappingURL=event.js.map