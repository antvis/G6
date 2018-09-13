/**
 * @fileOverview graph util
 * @author huangtonger@aliyun.com
 */

const BaseUtil = require('./base');
const DomUtil = require('./dom');
const GraphicUtil = require('./graphic');
const G = require('@antv/g/lib');

module.exports = {
  /**
   * determine whether a node
   * @param  {object}  item item
   * @return {boolean} bool
   */
  isNode(item) {
    return item && BaseUtil.isObject(item) && item.type === 'node';
  },
  /**
   * determine whether a edge
   * @param  {object}  item item
   * @return {boolean} bool
   */
  isEdge(item) {
    return item && BaseUtil.isObject(item) && item.type === 'edge';
  },
  /**
   * determine whether a group
   * @param  {object}  item item
   * @return {boolean} bool
   */
  isGroup(item) {
    return item && BaseUtil.isObject(item) && item.type === 'group';
  },
  /**
   * graph to Canvas
   * @param  {object}  options item
   * @return {domobject} canvas
   */
  graph2Canvas(options) {
    options = BaseUtil.mix({
      graph: null,
      width: null,
      height: null,
      canvas: null,
      beforeTransform() {},
      afterTransform() {}
    }, options);
    let { graph,
      width,
      height,
      canvas,
      beforeTransform,
      afterTransform } = options;
    const graphCanvas = graph.getCanvas();
    const graphBBox = graph.getBBox();
    const padding = graph.getFitViewPadding();
    const children = graphCanvas.get('children');
    const matrixCache = BaseUtil.cloneDeep(graph.getMatrix());
    if (!canvas) {
      const containerDOM = DomUtil.createDOM('<canvas></canvas>');
      canvas = new G.Canvas({
        containerDOM,
        width,
        height
      });
    }
    const matrix = GraphicUtil.getAutoZoomMatrix({
      minX: 0,
      minY: 0,
      maxX: width,
      maxY: height
    }, graphBBox, padding);
    beforeTransform(matrix, matrixCache);
    graph.setMatrix(matrix);
    canvas.set('children', children);
    canvas.matrix = matrix;
    // canvas.draw();
    canvas._cfg.painter.beforeDraw();
    canvas._cfg.painter._drawGroup(canvas);
    graph.setMatrix(matrixCache);
    afterTransform(matrix, matrixCache);
    return canvas.get('el');
  }
};
