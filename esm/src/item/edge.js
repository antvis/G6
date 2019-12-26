import { __extends } from "tslib";
import isNil from '@antv/util/lib/is-nil';
import isPlainObject from '@antv/util/lib/is-plain-object';
import Item from './item';
var END_MAP = { source: 'start', target: 'end' };
var ITEM_NAME_SUFFIX = 'Node'; // 端点的后缀，如 sourceNode, targetNode
var POINT_NAME_SUFFIX = 'Point'; // 起点或者结束点的后缀，如 startPoint, endPoint
var ANCHOR_NAME_SUFFIX = 'Anchor';
var Edge = /** @class */ (function (_super) {
    __extends(Edge, _super);
    function Edge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Edge.prototype.getDefaultCfg = function () {
        return {
            type: 'edge',
            sourceNode: null,
            targetNode: null,
            startPoint: null,
            endPoint: null,
            linkCenter: false
        };
    };
    Edge.prototype.setEnd = function (name, value) {
        var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
        var itemName = name + ITEM_NAME_SUFFIX;
        var preItem = this.get(itemName);
        if (preItem) {
            // 如果之前存在节点，则移除掉边
            preItem.removeEdge(this);
        }
        if (isPlainObject(value)) { // 如果设置成具体的点，则清理节点
            this.set(pointName, value);
            this.set(itemName, null);
        }
        else {
            value.addEdge(this);
            this.set(itemName, value);
            this.set(pointName, null);
        }
    };
    /**
     * 获取连接点的坐标
     * @param name source | target
     * @param model 边的数据模型
     * @param controlPoints 控制点
     */
    Edge.prototype.getLinkPoint = function (name, model, controlPoints) {
        var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
        var itemName = name + ITEM_NAME_SUFFIX;
        var point = this.get(pointName);
        if (!point) {
            var item = this.get(itemName);
            var anchorName = name + ANCHOR_NAME_SUFFIX;
            var prePoint = this.getPrePoint(name, controlPoints);
            var anchorIndex = model[anchorName];
            if (isNil(anchorIndex)) { // 如果有锚点，则使用锚点索引获取连接点
                point = item.getLinkPointByAnchor(anchorIndex);
            }
            // 如果锚点没有对应的点或者没有锚点，则直接计算连接点
            point = point || item.getLinkPoint(prePoint);
            if (isNil(point.index)) {
                this.set(name + 'AnchorIndex', point.index);
            }
        }
        return point;
    };
    /**
     * 获取同端点进行连接的点，计算交汇点
     * @param name
     * @param controlPoints
     */
    Edge.prototype.getPrePoint = function (name, controlPoints) {
        if (controlPoints && controlPoints.length) {
            var index = name === 'source' ? 0 : controlPoints.length - 1;
            return controlPoints[index];
        }
        var oppositeName = name === 'source' ? 'target' : 'source'; // 取另一个节点的位置
        return this.getEndPoint(oppositeName);
    };
    /**
     * 获取端点的位置
     * @param name
     */
    Edge.prototype.getEndPoint = function (name) {
        var itemName = name + ITEM_NAME_SUFFIX;
        var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
        var item = this.get(itemName);
        // 如果有端点，直接使用 model
        if (item) {
            return item.get('model');
        } // 否则直接使用点
        return this.get(pointName);
    };
    /**
     * 通过端点的中心获取控制点
     * @param model
     */
    Edge.prototype.getControlPointsByCenter = function (model) {
        var sourcePoint = this.getEndPoint('source');
        var targetPoint = this.getEndPoint('target');
        var shapeFactory = this.get('shapeFactory');
        return shapeFactory.getControlPoints(model.shape, {
            startPoint: sourcePoint,
            endPoint: targetPoint
        });
    };
    Edge.prototype.getEndCenter = function (name) {
        var itemName = name + ITEM_NAME_SUFFIX;
        var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
        var item = this.get(itemName);
        // 如果有端点，直接使用 model
        if (item) {
            var bbox = item.getBBox();
            return {
                x: bbox.centerX,
                y: bbox.centerY
            };
        } // 否则直接使用点
        return this.get(pointName);
    };
    Edge.prototype.init = function () {
        _super.prototype.init.call(this);
        // 初始化两个端点
        this.setSource(this.get('source'));
        this.setTarget(this.get('target'));
    };
    Edge.prototype.getShapeCfg = function (model) {
        var self = this;
        var linkCenter = self.get('linkCenter'); // 如果连接到中心，忽视锚点、忽视控制点
        var cfg = _super.prototype.getShapeCfg.call(this, model);
        if (linkCenter) {
            cfg.startPoint = self.getEndCenter('source');
            cfg.endPoint = self.getEndCenter('target');
        }
        else {
            var controlPoints = cfg.controlPoints || self.getControlPointsByCenter(cfg);
            cfg.startPoint = self.getLinkPoint('source', model, controlPoints);
            cfg.endPoint = self.getLinkPoint('target', model, controlPoints);
        }
        cfg.sourceNode = self.get('sourceNode');
        cfg.targetNode = self.get('targetNode');
        return cfg;
    };
    /**
     * 获取边的数据模型
     */
    Edge.prototype.getModel = function () {
        var model = this.get('model');
        var out = Object.assign({}, model);
        var sourceItem = this.get('source' + ITEM_NAME_SUFFIX);
        var targetItem = this.get('target' + ITEM_NAME_SUFFIX);
        if (sourceItem) {
            out.source = sourceItem.get('id');
            delete out['source' + ITEM_NAME_SUFFIX];
        }
        else {
            out.source = this.get('start' + POINT_NAME_SUFFIX);
        }
        if (targetItem) {
            out.target = targetItem.get('id');
            delete out['target' + ITEM_NAME_SUFFIX];
        }
        else {
            out.target = this.get('end' + POINT_NAME_SUFFIX);
        }
        return out;
    };
    Edge.prototype.setSource = function (source) {
        this.setEnd('source', source);
        this.set('source', source);
    };
    Edge.prototype.setTarget = function (target) {
        this.setEnd('target', target);
        this.set('target', target);
    };
    Edge.prototype.getSource = function () {
        return this.get('source');
    };
    Edge.prototype.getTarget = function () {
        return this.get('target');
    };
    Edge.prototype.updatePosition = function () { };
    /**
     * 边不需要重计算容器位置，直接重新计算 path 位置
     * @param {object} cfg 待更新数据
     */
    Edge.prototype.update = function (cfg) {
        var model = this.get('model');
        Object.assign(model, cfg);
        this.updateShape();
        this.afterUpdate();
        this.clearCache();
    };
    Edge.prototype.destroy = function () {
        var sourceItem = this.get('source' + ITEM_NAME_SUFFIX);
        var targetItem = this.get('target' + ITEM_NAME_SUFFIX);
        if (sourceItem && !sourceItem.destroyed) {
            sourceItem.removeEdge(this);
        }
        if (targetItem && !targetItem.destroyed) {
            targetItem.removeEdge(this);
        }
        _super.prototype.destroy.call(this);
    };
    return Edge;
}(Item));
export default Edge;
//# sourceMappingURL=edge.js.map