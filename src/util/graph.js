/**
 * @fileOverview graph util
 * @author huangtonger@aliyun.com
 */

const BaseUtil = require('./base');
const DomUtil = require('./dom');
const G = require('@antv/g');
const Canvas = G.canvas.Canvas;
const SVG = G.svg.Canvas;

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
      minMaxZoom: Infinity,
      minMinZoom: 0,
      pixelRatio: 2,
      beforeTransform() {},
      afterTransform() {}
    }, options);
    let { graph, width, height, canvas, minMaxZoom, minMinZoom, pixelRatio, beforeTransform, afterTransform } = options;
    const graphCanvas = graph.getCanvas();
    let tranScale;
    if (!canvas) {
      const containerDOM = DomUtil.createDOM('<canvas></canvas>');
      const graphPixelRatio = graphCanvas.get('pixelRatio');
      tranScale = pixelRatio / graphPixelRatio;
      graphCanvas.scale(tranScale, tranScale);
      const Constructor = graph.getConstructor(Canvas, SVG, graph.get('render'));
      canvas = new Constructor({
        containerDOM,
        width: width * tranScale,
        height: height * tranScale
      });
    }
    const miniMapCanvasContext = canvas.get('context');
    const graphCanvasContext = graphCanvas.get('context');
    const graphWidth = graph.get('width');
    const graphHeight = graph.get('height');
    const matrixCache = BaseUtil.cloneDeep(graph.getMatrix());
    const maxZoom = graph.get('maxZoom');
    const minZoom = graph.get('minZoom');
    const events = graph._events;

    graph.set('maxZoom', minMaxZoom);
    graph.set('minZoom', minMinZoom);
    graph.set('width', width);
    graph.set('height', height);
    graph._events = []; // tamper with the event
    if (graph.getItems().length > 0) {
      beforeTransform(graph);
      graphCanvas.set('context', miniMapCanvasContext);
      graph.autoZoom();
      canvas.matrix = BaseUtil.cloneDeep(graph.getMatrix());
    }
    graphCanvas.beforeDraw();
    graphCanvas.constructor.superclass.draw.call(graphCanvas, graphCanvasContext);

    graphCanvas.set('context', graphCanvasContext);
    graph.set('width', graphWidth);
    graph.set('height', graphHeight);
    graph.set('maxZoom', maxZoom);
    graph.set('minZoom', minZoom);
    graph.updateMatrix(matrixCache);
    if (tranScale) {
      afterTransform(graph);
      graphCanvas.scale(1 / tranScale, 1 / tranScale);
    }
    graph._events = events;
    graphCanvas.beforeDraw();
    graphCanvas.draw();
    return canvas.get('el');
  }
};
