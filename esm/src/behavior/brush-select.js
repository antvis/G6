var min = Math.min;
var max = Math.max;
var abs = Math.abs;
var DEFAULT_TRIGGER = 'shift';
var ALLOW_EVENTS = ['drag', 'shift', 'ctrl', 'alt', 'control'];
export default {
    getDefaultCfg: function () {
        return {
            brushStyle: {
                fill: '#EEF6FF',
                fillOpacity: 0.4,
                stroke: '#DDEEFE',
                lineWidth: 1
            },
            onSelect: function () { },
            onDeselect: function () { },
            selectedState: 'selected',
            trigger: DEFAULT_TRIGGER,
            includeEdges: true,
            selectedEdges: [],
            selectedNodes: []
        };
    },
    getEvents: function () {
        var trigger;
        // 检测输入是否合法
        if (ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1) {
            trigger = this.trigger;
        }
        else {
            trigger = DEFAULT_TRIGGER;
            console.warn('Behavior brush-select的trigger参数不合法，请输入drag、shift、ctrl或alt');
        }
        if (trigger === 'drag') {
            return {
                mousedown: 'onMouseDown',
                mousemove: 'onMouseMove',
                mouseup: 'onMouseUp',
                'canvas:click': 'clearStates'
            };
        }
        return {
            mousedown: 'onMouseDown',
            mousemove: 'onMouseMove',
            mouseup: 'onMouseUp',
            'canvas:click': 'clearStates',
            keyup: 'onKeyUp',
            keydown: 'onKeyDown'
        };
    },
    onMouseDown: function (e) {
        // 按在node上面拖动时候不应该是框选
        var item = e.item;
        if (item) {
            return;
        }
        if (this.trigger !== 'drag' && !this.keydown) {
            return;
        }
        if (this.selectedNodes && this.selectedNodes.length !== 0) {
            this.clearStates();
        }
        var brush = this.brush;
        if (!brush) {
            brush = this.createBrush();
        }
        this.originPoint = { x: e.canvasX, y: e.canvasY };
        brush.attr({ width: 0, height: 0 });
        brush.show();
        this.dragging = true;
    },
    onMouseMove: function (e) {
        if (!this.dragging) {
            return;
        }
        if (this.trigger !== 'drag' && !this.keydown) {
            return;
        }
        this.updateBrush(e);
        this.graph.paint();
    },
    onMouseUp: function (e) {
        if (!this.brush && !this.dragging) {
            return;
        }
        if (this.trigger !== 'drag' && !this.keydown) {
            return;
        }
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        this.brush.destroy();
        this.brush = null;
        this.getSelectedNodes(e);
        this.dragging = false;
        this.graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    clearStates: function () {
        var graph = this.graph;
        var autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        var selectedState = this.selectedState;
        var nodes = graph.findAllByState('node', selectedState);
        var edges = graph.findAllByState('edge', selectedState);
        nodes.forEach(function (node) { return graph.setItemState(node, selectedState, false); });
        edges.forEach(function (edge) { return graph.setItemState(edge, selectedState, false); });
        this.selectedNodes = [];
        this.selectedEdges = [];
        this.onDeselect && this.onDeselect(this.selectedNodes, this.selectedEdges);
        graph.emit('nodeselectchange', { targets: {
                nodes: [],
                edges: []
            }, select: false });
        graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    getSelectedNodes: function (e) {
        var _this = this;
        var graph = this.graph;
        var state = this.selectedState;
        var originPoint = this.originPoint;
        var p1 = { x: e.x, y: e.y };
        var p2 = graph.getPointByCanvas(originPoint.x, originPoint.y);
        var left = min(p1.x, p2.x);
        var right = max(p1.x, p2.x);
        var top = min(p1.y, p2.y);
        var bottom = max(p1.y, p2.y);
        var selectedNodes = [];
        var shouldUpdate = this.shouldUpdate;
        var selectedIds = [];
        graph.getNodes().forEach(function (node) {
            var bbox = node.getBBox();
            if (bbox.centerX >= left
                && bbox.centerX <= right
                && bbox.centerY >= top
                && bbox.centerY <= bottom) {
                if (shouldUpdate(node, 'select')) {
                    selectedNodes.push(node);
                    var model = node.getModel();
                    selectedIds.push(model.id);
                    graph.setItemState(node, state, true);
                }
            }
        });
        var selectedEdges = [];
        if (this.includeEdges) {
            // 选中边，边的source和target都在选中的节点中时才选中
            selectedNodes.forEach(function (node) {
                var edges = node.getEdges();
                edges.forEach(function (edge) {
                    var model = edge.getModel();
                    var source = model.source, target = model.target;
                    if (selectedIds.includes(source)
                        && selectedIds.includes(target)
                        && shouldUpdate(edge, 'select')) {
                        selectedEdges.push(edge);
                        graph.setItemState(edge, _this.selectedState, true);
                    }
                });
            });
        }
        this.selectedEdges = selectedEdges;
        this.selectedNodes = selectedNodes;
        this.onSelect && this.onSelect(selectedNodes, selectedEdges);
        graph.emit('nodeselectchange', { targets: {
                nodes: selectedNodes,
                edges: selectedEdges
            }, select: true });
    },
    createBrush: function () {
        var self = this;
        var brush = self.graph.get('canvas').addShape('rect', {
            attrs: self.brushStyle,
            capture: false
        });
        this.brush = brush;
        return brush;
    },
    updateBrush: function (e) {
        var originPoint = this.originPoint;
        this.brush.attr({
            width: abs(e.canvasX - originPoint.x),
            height: abs(e.canvasY - originPoint.y),
            x: min(e.canvasX, originPoint.x),
            y: min(e.canvasY, originPoint.y)
        });
    },
    onKeyDown: function (e) {
        var code = e.key;
        if (!code) {
            return;
        }
        // 按住control键时，允许用户设置trigger为ctrl
        if (code.toLowerCase() === this.trigger.toLowerCase()
            || code.toLowerCase() === 'control') {
            this.keydown = true;
        }
        else {
            this.keydown = false;
        }
    },
    onKeyUp: function () {
        if (this.brush) {
            // 清除所有选中状态后，设置拖得动状态为false，并清除框选的brush
            this.brush.destroy();
            this.brush = null;
            this.dragging = false;
        }
        this.keydown = false;
    }
};
//# sourceMappingURL=brush-select.js.map