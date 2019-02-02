/**
 * @fileOverview graph fit canvas
 * @author huangtonger@aliyun.com
 */


const Util = require('../../util');

class View {
  constructor(graph) {
    this.graph = graph;
  }
  getFormatPadding() {
    return Util.formatPadding(this.graph.get('fitViewPadding'));
  }
  _fitView() {
    const padding = this.getFormatPadding();
    const graph = this.graph;
    const group = graph.get('group');
    const width = graph.get('width');
    const height = graph.get('height');
    group.resetMatrix();
    const bbox = group.getBBox();
    const viewCenter = this._getViewCenter();
    const groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    const w = (width - padding[1] - padding[3]) / bbox.width;
    const h = (height - padding[0] - padding[2]) / bbox.height;
    let ratio = w;
    if (w > h) {
      ratio = h;
    }
    graph.zoom(ratio, viewCenter);
  }
  focusPoint(point) {
    const viewCenter = this._getViewCenter();
    this.graph.translate(viewCenter.x - point.x, viewCenter.y - point.y);
  }
  getPointByClient(clientX, clientY) {
    const canvas = this.graph.get('canvas');
    const pixelRatio = canvas.get('pixelRatio');
    const canvasPoint = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x / pixelRatio, canvasPoint.y / pixelRatio);
  }
  getClientByPoint(x, y) {
    const canvas = this.graph.get('canvas');
    const canvasPoint = this.getCanvasByPoint(x, y);
    const pixelRatio = canvas.get('pixelRatio');
    const point = canvas.getClientByPoint(canvasPoint.x * pixelRatio, canvasPoint.y * pixelRatio);
    return { x: point.clientX, y: point.clientY };
  }
  getPointByCanvas(canvasX, canvasY) {
    const viewportMatrix = this.graph.get('group').getMatrix();
    const point = Util.invertMatrix({ x: canvasX, y: canvasY }, viewportMatrix);
    return point;
  }
  getCanvasByPoint(x, y) {
    const viewportMatrix = this.graph.get('group').getMatrix();
    return Util.applyMatrix({ x, y }, viewportMatrix);
  }
  focus(item) {
    if (Util.isString(item)) {
      item = this.graph.findById[item];
    }
    if (item) {
      const model = item.get('model');
      const matrix = item.get('group').getMatrix();
      const x = model.x * matrix[0] + matrix[6];
      const y = model.y * matrix[4] + matrix[7];
      this.focusPoint({ x, y });
    }
  }
  changeSize(width, height) {
    if (!Util.isNumber(width) || !Util.isNumber(height)) {
      throw Error('invalid canvas width & height');
    }
    const graph = this.graph;
    graph.set({ width, height });
    const canvas = this.graph.get('canvas');
    canvas.changeSize(width, height);
  }
  _getViewCenter() {
    const padding = this.getFormatPadding();
    const graph = this.graph;
    const width = this.graph.get('width');
    const height = graph.get('height');
    return {
      x: (width - padding[2] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0]
    };
  }
}

module.exports = View;
