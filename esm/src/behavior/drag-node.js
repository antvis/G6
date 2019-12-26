import { __assign } from "tslib";
import deepMix from '@antv/util/lib/deep-mix';
import isString from '@antv/util/lib/is-string';
import Global from '../global';
var body = document.body;
export default {
    getDefaultCfg: function () {
        return {
            updateEdge: true,
            delegateStyle: {},
            // 是否开启delegate
            enableDelegate: false
        };
    },
    getEvents: function () {
        return {
            'node:dragstart': 'onDragStart',
            'node:drag': 'onDrag',
            'node:dragend': 'onDragEnd',
            'canvas:mouseleave': 'onOutOfRange'
        };
    },
    onDragStart: function (e) {
        var _this = this;
        if (!this.shouldBegin.call(this, e)) {
            return;
        }
        var item = e.item;
        var target = e.target;
        var hasLocked = item.hasLocked();
        if (hasLocked) {
            return;
        }
        // 如果拖动的target 是linkPoints / anchorPoints 则不允许拖动
        if (target) {
            var isAnchorPoint = target.get('isAnchorPoint');
            if (isAnchorPoint) {
                return;
            }
        }
        var graph = this.graph;
        this.targets = [];
        // 获取所有选中的元素
        var nodes = graph.findAllByState('node', 'selected');
        var currentNodeId = item.get('id');
        // 当前拖动的节点是否是选中的节点
        var dragNodes = nodes.filter(function (node) {
            var nodeId = node.get('id');
            return currentNodeId === nodeId;
        });
        // 只拖动当前节点
        if (dragNodes.length === 0) {
            this.target = item;
        }
        else {
            // 拖动多个节点
            if (nodes.length > 1) {
                nodes.forEach(function (node) {
                    var locked = node.hasLocked();
                    if (!locked) {
                        _this.targets.push(node);
                    }
                });
            }
            else {
                this.targets.push(item);
            }
        }
        this.origin = {
            x: e.x,
            y: e.y
        };
        this.point = {};
        this.originPoint = {};
    },
    onDrag: function (e) {
        var _this = this;
        if (!this.origin) {
            return;
        }
        if (!this.shouldUpdate(this, e)) {
            return;
        }
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        // 当targets中元素时，则说明拖动的是多个选中的元素
        if (this.targets.length > 0) {
            if (this.get('enableDelegate')) {
                this.updateDelegate(e);
            }
            else {
                this.targets.forEach(function (target) {
                    _this.update(target, e, _this.get('enableDelegate'));
                });
            }
        }
        else {
            // 只拖动单个元素
            this.update(this.target, e, this.get('enableDelegate'));
        }
        graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    onDragEnd: function (e) {
        var _this = this;
        if (!this.origin || !this.shouldEnd.call(this, e)) {
            return;
        }
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        if (this.shape) {
            this.shape.remove();
            this.shape = null;
        }
        if (this.target) {
            var delegateShape = this.target.get('delegateShape');
            if (delegateShape) {
                delegateShape.remove();
                this.target.set('delegateShape', null);
            }
        }
        if (this.targets.length > 0) {
            // 获取所有已经选中的节点
            this.targets.forEach(function (node) { return _this.update(node, e); });
        }
        else if (this.target) {
            this.update(this.target, e);
        }
        this.point = {};
        this.origin = null;
        this.originPoint = {};
        this.targets.length = 0;
        this.target = null;
        // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
        var fn = this.fn;
        if (fn) {
            body.removeEventListener('mouseup', fn, false);
            this.fn = null;
        }
        graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
    onOutOfRange: function (e) {
        var self = this;
        if (this.origin) {
            var canvasElement_1 = self.graph.get('canvas').get('el');
            var fn = function (ev) {
                if (ev.target !== canvasElement_1) {
                    self.onDragEnd(e);
                }
            };
            this.fn = fn;
            body.addEventListener('keyup', fn, false);
        }
    },
    update: function (item, e, force) {
        var origin = this.origin;
        var model = item.get('model');
        var nodeId = item.get('id');
        if (!this.point[nodeId]) {
            this.point[nodeId] = {
                x: model.x,
                y: model.y
            };
        }
        var x = e.x - origin.x + this.point[nodeId].x;
        var y = e.y - origin.y + this.point[nodeId].y;
        // 拖动单个未选中元素
        if (force) {
            this.updateDelegate(e, x, y);
            return;
        }
        var pos = { x: x, y: y };
        if (this.get('updateEdge')) {
            this.graph.updateItem(item, pos);
        }
        else {
            item.updatePosition(pos);
            // this.graph.paint();
        }
    },
    /**
     * 更新拖动元素时的delegate
     * @param {Event} e 事件句柄
     * @param {number} x 拖动单个元素时候的x坐标
     * @param {number} y 拖动单个元素时候的y坐标
     */
    updateDelegate: function (e, x, y) {
        var bbox = e.item.get('keyShape').getBBox();
        if (!this.shape) {
            // 拖动多个
            var parent_1 = this.graph.get('group');
            var attrs = deepMix({}, Global.delegateStyle, this.delegateStyle);
            if (this.targets.length > 0) {
                var _a = this.calculationGroupPosition(), cx = _a.x, cy = _a.y, width = _a.width, height = _a.height, minX = _a.minX, minY = _a.minY;
                this.originPoint = { x: cx, y: cy, width: width, height: height, minX: minX, minY: minY };
                // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
                this.shape = parent_1.addShape('rect', {
                    attrs: __assign({ width: width,
                        height: height, x: cx, y: cy }, attrs)
                });
            }
            else if (this.target) {
                this.shape = parent_1.addShape('rect', {
                    attrs: __assign({ width: bbox.width, height: bbox.height, x: x + bbox.x, y: y + bbox.y }, attrs)
                });
            }
            this.shape.set('capture', false);
        }
        else {
            if (this.targets.length > 0) {
                var clientX = e.x - this.origin.x + this.originPoint.minX;
                var clientY = e.y - this.origin.y + this.originPoint.minY;
                this.shape.attr({
                    x: clientX,
                    y: clientY
                });
            }
            else if (this.target) {
                this.shape.attr({
                    x: x + bbox.x,
                    y: y + bbox.y
                });
            }
        }
        this.target.set('delegateShape', this.shape);
        // this.graph.paint();
    },
    /**
     * 计算delegate位置，包括左上角左边及宽度和高度
     * @memberof ItemGroup
     * @return {object} 计算出来的delegate坐标信息及宽高
     */
    calculationGroupPosition: function () {
        var graph = this.graph;
        var nodes = graph.findAllByState('node', 'selected');
        var minx = Infinity;
        var maxx = -Infinity;
        var miny = Infinity;
        var maxy = -Infinity;
        // 获取已节点的所有最大最小x y值
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var id = nodes_1[_i];
            var element = isString(id) ? graph.findById(id) : id;
            var bbox = element.getBBox();
            var minX = bbox.minX, minY = bbox.minY, maxX = bbox.maxX, maxY = bbox.maxY;
            if (minX < minx) {
                minx = minX;
            }
            if (minY < miny) {
                miny = minY;
            }
            if (maxX > maxx) {
                maxx = maxX;
            }
            if (maxY > maxy) {
                maxy = maxY;
            }
        }
        var x = Math.floor(minx) - 20;
        var y = Math.floor(miny) + 10;
        var width = Math.ceil(maxx) - x;
        var height = Math.ceil(maxy) - y;
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            minX: minx,
            minY: miny
        };
    }
};
//# sourceMappingURL=drag-node.js.map