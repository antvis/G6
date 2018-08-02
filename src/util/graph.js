/**
 * @fileOverview graph util
 * @author huangtonger@aliyun.com
 */

const BaseUtil = require('./base');
const DomUtil = require('./dom');
const GraphicUtil = require('./graphic');
const G = require('@antv/g');

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
    const graphBBox = graph.getCanvas().getBBox();
    const padding = graph.getFitViewPadding();
    const renderer = graph.get('renderer');
    const children = graphCanvas.get('children');
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
    beforeTransform(graph);
    canvas.set('renderer', renderer);
    canvas.set('children', children);
    canvas.setMatrix(matrix);
    canvas.draw();
    afterTransform(graph);
    return canvas.get('el');
  }
};
