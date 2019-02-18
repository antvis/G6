const Util = require('../util');
const G = require('@antv/g/lib');

const max = Math.max;

class Minimap {
  constructor(cfgs) {
    if (!cfgs.graph) {
      console.warn('please specify G6 graph instance!');
      return;
    }
    this._cfgs = Util.deepMix(this.getDefaultCfg(), cfgs);
    this.initContainer();
  }
  getDefaultCfg() {
    return {
      container: null,
      className: 'g6-minimap',
      onChange: null,
      keyShapeOnly: false,
      viewportStyle: {
        stroke: '#1890ff',
        lineWidth: 2,
        x: 0,
        y: 0,
        width: 200,
        height: 120
      },
      size: [ 200, 120 ]
    };
  }
  initContainer() {
    const self = this;
    const graph = self._cfgs.graph;
    const cfgs = self._cfgs;
    const size = cfgs.size;
    let container = cfgs.container;
    if (container && Util.isString(container)) {
      container = document.getElementById(container);
    }
    if (!container) {
      container = Util.createDom('<div class="g6-minimap-container"></div>');
      graph.get('container').appendChild(container);
    }
    cfgs.container = container;
    const containerDOM = Util.createDom('<div class="'
      + cfgs.className
      + '"></div>');
    container.appendChild(containerDOM);
    const canvas = new G.Canvas({
      containerDOM,
      width: size[0],
      height: size[1],
      pixelRatio: graph.get('pixelRatio')
    });
    self._canvas = canvas;
    self.updateCanvas();
    self._event = Util.wrapBehavior(self, 'updateCanvas');
    graph.on('beforepaint', self._event);
  }
  initViewport() {
    const viewportStyle = this._cfgs.viewportStyle;
    const canvas = this._canvas;
    // 添加蒙层
    const mask = canvas.get('children')[0].addShape('rect', {
      attrs: {
        x: -Infinity,
        y: -Infinity,
        width: Infinity,
        height: Infinity,
        fill: 'rgba(255, 255, 255, 0.2)'
      }
    });
    this._mask = mask;
    // 添加视窗
    mask.attr('clip', new G.Rect({
      attrs: viewportStyle
    }));
    this.updateViewport();
  }
  updateCanvas() {
    const cfgs = this._cfgs;
    const size = cfgs.size;
    const graph = cfgs.graph;
    const canvas = this._canvas;
    const graphCanvas = graph.get('canvas');
    const clonedGroup = graphCanvas.clone();
    const bbox = graphCanvas.getBBox();
    const width = max(bbox.width, graph.get('width'));
    const height = max(bbox.height, graph.get('height'));
    const pixelRatio = canvas.get('pixelRatio');
    // this.updateViewport();
    canvas.resetMatrix();
    canvas.scale(size[0] / width * pixelRatio, size[1] / height * pixelRatio);
    canvas.set('children', clonedGroup.get('children'));
    canvas.draw();
  }
  updateViewport() {
    const size = this._cfgs.size;
    const graph = this._cfgs.graph;
    const topLeft = graph.getPointByClient(0, 0);
    const bottomRight = graph.getPointByClient(size[0], size[1]);
    if (!this._mask) {
      this.initViewport();
    }
    const viewport = this._mask.attr('clip');
    viewport.attr({
      x: topLeft.x,
      y: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    });
  }
  destroy() {
    const cfgs = this._cfgs;
    const container = cfgs.container;
    const graph = cfgs.graph;
    graph.off('beforepaint', this._event);
    this._canvas.destroy();
    container.innerHTML = '';
  }
}

module.exports = Minimap;
