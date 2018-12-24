/**
 * @fileOverview dom to canvas
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const G = require('@antv/g/lib');
const domToImage = require('dom-to-image');

class Graph2Canvas {
  constructor(options) {
    this.options = {
      graph: null,
      width: null,
      height: null,
      canvas: null,
      beforeTransform() {},
      afterTransform() {},
      drawCount: 0,
      ...options
    };
  }
  getCanvas() {
    let { width, height, canvas } = this.options;
    if (!canvas) {
      const containerDOM = Util.createDOM('<canvas></canvas>');
      canvas = new G.Canvas({
        containerDOM,
        width,
        height
      });
    }
    if (!canvas.drawCount) {
      canvas.drawCount = 0;
    }
    return canvas;
  }
  /**
   * draw canvas
   * @param  {object}  canvas item
   * @param  {function}  callback item
   */
  drawInner(canvas, callback) {
    const { graph } = this.options;
    const graphCanvas = graph.getCanvas();
    const graphRenderer = graph.get('renderer');
    const drawCount = canvas.drawCount;

    if (graphRenderer === 'svg') {
      const domShapes = [];
      graphCanvas.deepEach(element => {
        const type = element.get('type');
        type === 'dom' && domShapes.push(element);
      });
      if (domShapes.length > 0) {
        domShapes.forEach(domShape => {
          const el = domShape.get('el');
          if (!el) {
            return;
          }
          domShape.domImageOnload = false;
          const width = domShape.attr('width');
          const height = domShape.attr('height');
          domToImage.toPng(el, {
            width,
            height
          })
          .then(dataUrl => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              if (drawCount === canvas.drawCount - 1) {
                domShape.domImage = img;
                domShape.domImageOnload = true;
                for (let i = 0; i < domShapes.length; i++) {
                  const subShape = domShapes[i];
                  if (!subShape.domImageOnload || subShape.get('destroyed')) {
                    break;
                  }
                  if (subShape.domImageOnload && i === domShapes.length - 1) {
                    callback();
                  }
                }
              }
            };
          });
        });
      } else {
        callback();
      }
    } else {
      callback();
    }
    canvas.drawCount += 1;
  }
  toCanvas() {
    const { graph,
      width,
      height,
      beforeTransform,
      limitRatio,
      afterTransform } = this.options;
    const canvas = this.getCanvas();
    const graphBBox = graph.getBBox();
    const matrixCache = Util.clone(graph.getMatrix());
    const padding = graph.getFitViewPadding();
    const graphCanvas = graph.getCanvas();
    const matrix = Util.getAutoZoomMatrix({
      minX: 0,
      minY: 0,
      maxX: width,
      maxY: height
    }, graphBBox, padding, limitRatio);
    this.drawInner(canvas, () => {
      const children = graphCanvas.get('children');
      canvas.set('children', children);
      beforeTransform(matrix, matrixCache);
      graph.setMatrix(matrix);
      canvas.draw();
      graph.setMatrix(matrixCache);
      afterTransform(matrix, matrixCache);
    });
    canvas.matrix = matrix;
    return canvas.get('el');
  }
}

module.exports = Graph2Canvas;
