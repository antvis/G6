import isNumber from "@antv/util/lib/is-number";
import isString from '@antv/util/lib/is-string';
import { formatPadding } from '@g6/util/base';
import { applyMatrix, invertMatrix } from '@g6/util/math';
var ViewController = /** @class */ (function () {
    function ViewController(graph) {
        this.graph = null;
        this.destroyed = false;
        this.graph = graph;
        this.destroyed = false;
    }
    // get view center coordinate
    ViewController.prototype.getViewCenter = function () {
        var padding = this.getFormatPadding();
        var graph = this.graph;
        var width = this.graph.get('width');
        var height = graph.get('height');
        return {
            x: (width - padding[2] - padding[3]) / 2 + padding[3],
            y: (height - padding[0] - padding[2]) / 2 + padding[0]
        };
    };
    // fit view graph
    ViewController.prototype.fitView = function () {
        var padding = this.getFormatPadding();
        var graph = this.graph;
        var group = graph.get('group');
        var width = graph.get('width');
        var height = graph.get('height');
        group.resetMatrix();
        var bbox = group.getBBox();
        var viewCenter = this.getViewCenter();
        var groupCenter = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
        graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
        var w = (width - padding[1] - padding[3]) / bbox.width;
        var h = (height - padding[0] - padding[2]) / bbox.height;
        var ratio = w;
        if (w > h) {
            ratio = h;
        }
        graph.zoom(ratio, viewCenter);
    };
    ViewController.prototype.getFormatPadding = function () {
        var padding = this.graph.get('fitViewPadding');
        return formatPadding(padding);
    };
    ViewController.prototype.focusPoint = function (point) {
        var viewCenter = this.getViewCenter();
        var modelCenter = this.getPointByCanvas(viewCenter.x, viewCenter.y);
        var viewportMatrix = this.graph.get('group').getMatrix();
        this.graph.translate((modelCenter.x - point.x) * viewportMatrix[0], (modelCenter.y - point.y) * viewportMatrix[4]);
    };
    /**
     * 将 Canvas 坐标转成视口坐标
     * @param canvasX canvas x 坐标
     * @param canvasY canvas y 坐标
     */
    ViewController.prototype.getPointByCanvas = function (canvasX, canvasY) {
        var viewportMatrix = this.graph.get('group').getMatrix();
        var point = invertMatrix({ x: canvasX, y: canvasY }, viewportMatrix);
        return point;
    };
    /**
     * 将页面坐标转成视口坐标
     * @param clientX 页面 x 坐标
     * @param clientY 页面 y 坐标
     */
    ViewController.prototype.getPointByClient = function (clientX, clientY) {
        var canvas = this.graph.get('canvas');
        var pixelRatio = canvas.get('pixelRatio');
        var canvasPoint = canvas.getPointByClient(clientX, clientY);
        return this.getPointByCanvas(canvasPoint.x / pixelRatio, canvasPoint.y / pixelRatio);
    };
    /**
     * 将视口坐标转成页面坐标
     * @param x 视口 x 坐标
     * @param y 视口 y 坐标
     */
    ViewController.prototype.getClientByPoint = function (x, y) {
        var canvas = this.graph.get('canvas');
        var canvasPoint = this.getCanvasByPoint(x, y);
        var pixelRatio = canvas.get('pixelRatio');
        var point = canvas.getClientByPoint(canvasPoint.x * pixelRatio, canvasPoint.y * pixelRatio);
        // return { x: point.clientX, y: point.clientY };
        return { x: point.x, y: point.y };
    };
    /**
     * 将视口坐标转成 Canvas 坐标
     * @param x 视口 x 坐标
     * @param y 视口 y 坐标
     */
    ViewController.prototype.getCanvasByPoint = function (x, y) {
        var viewportMatrix = this.graph.get('group').getMatrix();
        return applyMatrix({ x: x, y: y }, viewportMatrix);
    };
    /**
     * 将元素移动到画布中心
     * @param item Item 实例或 id
     */
    ViewController.prototype.focus = function (item) {
        if (isString(item)) {
            item = this.graph.findById(item);
        }
        if (item) {
            var group = item.get('group');
            var matrix = group.getMatrix();
            // 用实际位置而不是model中的x,y,防止由于拖拽等的交互导致model的x,y并不是当前的x,y
            this.focusPoint({
                x: matrix[6],
                y: matrix[7]
            });
        }
    };
    /**
     * 改变 canvas 画布的宽度和高度
     * @param width canvas 宽度
     * @param height canvas 高度
     */
    ViewController.prototype.changeSize = function (width, height) {
        if (!isNumber(width) || !isNumber(height)) {
            throw Error('invalid canvas width & height, pleace make sure width & height type is number');
        }
        var graph = this.graph;
        graph.set({ width: width, height: height });
        var canvas = graph.get('canvas');
        canvas.changeSize(width, height);
    };
    ViewController.prototype.destroy = function () {
        this.graph = null;
        this.destroyed = false;
    };
    return ViewController;
}());
export default ViewController;
//# sourceMappingURL=view.js.map