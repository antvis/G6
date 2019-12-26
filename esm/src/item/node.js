import { __extends } from "tslib";
import each from '@antv/util/lib/each';
import isNil from '@antv/util/lib/is-nil';
import mix from '@antv/util/lib/mix';
import { distance, getCircleIntersectByPoint, getEllispeIntersectByPoint, getRectIntersectByPoint } from '@g6/util/math';
import Item from './item';
var CACHE_ANCHOR_POINTS = 'anchorPointsCache';
var CACHE_BBOX = 'bboxCache';
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node.prototype.getNearestPoint = function (points, curPoint) {
        var index = 0;
        var nearestPoint = points[0];
        var minDistance = distance(points[0], curPoint);
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var dis = distance(point, curPoint);
            if (dis < minDistance) {
                nearestPoint = point;
                minDistance = dis;
                index = i;
            }
        }
        nearestPoint.anchorIndex = index;
        return nearestPoint;
    };
    Node.prototype.getDefaultCfg = function () {
        return {
            type: 'node',
            edges: []
        };
    };
    /**
     * 获取从节点关联的所有边
     */
    Node.prototype.getEdges = function () {
        return this.get('edges');
    };
    /**
     * 获取所有的入边
     */
    Node.prototype.getInEdges = function () {
        var self = this;
        return this.get('edges').filter(function (edge) {
            return edge.get('target') === self;
        });
    };
    /**
     * 获取所有的出边
     */
    Node.prototype.getOutEdges = function () {
        var self = this;
        return this.get('edges').filter(function (edge) {
            return edge.get('source') === self;
        });
    };
    /**
     * 根据锚点的索引获取连接点
     * @param  {Number} index 索引
     */
    Node.prototype.getLinkPointByAnchor = function (index) {
        var anchorPoints = this.getAnchorPoints();
        return anchorPoints[index];
    };
    /**
     * 获取连接点
     * @param point
     */
    Node.prototype.getLinkPoint = function (point) {
        var keyShape = this.get('keyShape');
        var type = keyShape.get('type');
        var bbox = this.getBBox();
        var centerX = bbox.centerX, centerY = bbox.centerY;
        var anchorPoints = this.getAnchorPoints();
        var intersectPoint;
        switch (type) {
            case 'circle':
                intersectPoint = getCircleIntersectByPoint({
                    x: centerX,
                    y: centerY,
                    r: bbox.width / 2
                }, point);
                break;
            case 'ellipse':
                intersectPoint = getEllispeIntersectByPoint({
                    x: centerX,
                    y: centerY,
                    rx: bbox.width / 2,
                    ry: bbox.height / 2
                }, point);
                break;
            default:
                intersectPoint = getRectIntersectByPoint(bbox, point);
        }
        var linkPoint = intersectPoint;
        // 如果存在锚点，则使用交点计算最近的锚点
        if (anchorPoints.length) {
            if (!linkPoint) { // 如果计算不出交点
                linkPoint = point;
            }
            linkPoint = this.getNearestPoint(anchorPoints, linkPoint);
        }
        if (!linkPoint) { // 如果最终依然没法找到锚点和连接点，直接返回中心点
            linkPoint = { x: centerX, y: centerY };
        }
        return linkPoint;
    };
    /**
     * 获取锚点的定义
     * @return {array} anchorPoints
     */
    Node.prototype.getAnchorPoints = function () {
        var anchorPoints = this.get(CACHE_ANCHOR_POINTS);
        if (!anchorPoints) {
            anchorPoints = [];
            var shapeFactory = this.get('shapeFactory');
            var bbox_1 = this.getBBox();
            var model = this.get('model');
            var shapeCfg = this.getShapeCfg(model);
            var points = shapeFactory.getAnchorPoints(model.shape, shapeCfg) || [];
            each(points, function (pointArr, index) {
                var point = mix({
                    x: bbox_1.minX + pointArr.x * bbox_1.width,
                    y: bbox_1.minY + pointArr.y * bbox_1.height
                }, pointArr.anchorIndex, {
                    index: index
                });
                anchorPoints.push(point);
            });
            this.set(CACHE_ANCHOR_POINTS, anchorPoints);
        }
        return anchorPoints;
    };
    /**
     * add edge
     * @param edge Edge instance
     */
    Node.prototype.addEdge = function (edge) {
        this.get('edges').push(edge);
    };
    /**
     * 锁定节点
     */
    Node.prototype.lock = function () {
        this.set('locked', true);
    };
    /**
     * 解锁锁定的节点
     */
    Node.prototype.unlock = function () {
        this.set('locked', false);
    };
    Node.prototype.hasLocked = function () {
        return this.get('locked');
    };
    /**
     * 移除边
     * @param {Edge} edge 边
     */
    Node.prototype.removeEdge = function (edge) {
        var edges = this.getEdges();
        var index = edges.indexOf(edge);
        if (index > -1) {
            edges.splice(index, 1);
        }
    };
    Node.prototype.clearCache = function () {
        this.set(CACHE_BBOX, null); // 清理缓存的 bbox
        this.set(CACHE_ANCHOR_POINTS, null);
    };
    /**
     * 是否仅仅移动节点，其他属性没变化
     * @param cfg 节点数据模型
     */
    Node.prototype.isOnlyMove = function (cfg) {
        if (!cfg) {
            return false;
        }
        var existX = isNil(cfg.x);
        var existY = isNil(cfg.y);
        var keys = Object.keys(cfg);
        // 仅有一个字段，包含 x 或者 包含 y
        // 两个字段，同时有 x，同时有 y
        return (keys.length === 1 && (existX || existY))
            || (keys.length === 2 && existX && existY);
    };
    return Node;
}(Item));
export default Node;
//# sourceMappingURL=node.js.map