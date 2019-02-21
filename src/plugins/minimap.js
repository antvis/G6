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
      viewportClassName: 'g6-minimap-viewport',
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
      container = Util.createDom('<div class="' + cfgs.className + '" style="width:' + size[0] + 'px; height:' + size[1] + 'px"></div>');
      graph.get('container').appendChild(container);
    }
    cfgs.container = container;
    const containerDOM = Util.createDom('<div class="g6-minimap-container"></div>');
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
    const cfgs = this._cfgs;
    const graph = cfgs.graph;
    const viewportStyle = this._cfgs.viewportStyle;
    const canvas = this._canvas;
    // const size = cfgs.size;
    // 添加蒙层
    const mask = canvas.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: canvas.get('width'),
        height: canvas.get('height'),
        fill: 'rgba(255, 255, 255, 0.5)'
      }
    });
    this._mask = mask;
    // 添加视窗
    mask.attr('clip', new G.Rect({
      attrs: viewportStyle
    }));
    const containerDOM = canvas.get('containerDOM');
    const window = Util.createDom('<div draggable="true" class="' + cfgs.viewportClassName + '" style="position:absolute;left:0;top:0;right:0;bottom:0;border: 2px solid #1980ff"></div>');
    let x,
      y;
    window.addEventListener('dragstart', e => {
      x = e.clientX;
      y = e.clientY;
    });
    window.addEventListener('drag', e => {
      window.modifyCSS({ visibility: 'hidden' });
      const dx = x - e.clientX;
      const dy = y - e.clientY;
      graph.translate(dx, dy);
      x = e.clientX;
      y = e.clientY;
    });
    /* window.addEventListener('dragend', e => {
      const x1 = window.style.left;
      const y1 = window.style.top;
      const x2 = size[0] - window.style.right;
      const y2 = size[1] - window.style.bottom;
      window.modifyCSS({
        visibility: 'visible'
      });
    });*/
    this._window = window;
    containerDOM.appendChild(window);
  }
  updateCanvas() {
    const cfgs = this._cfgs;
    const size = cfgs.size;
    const graph = cfgs.graph;
    const canvas = this._canvas;
    const graphCanvas = graph.get('canvas');
    const clonedGroup = graphCanvas.clone();
    canvas.get('children')[0] = clonedGroup.get('children')[0];
    const bbox = graphCanvas.getBBox();
    const width = max(bbox.width, graph.get('width'));
    const height = max(bbox.height, graph.get('height'));
    const pixelRatio = canvas.get('pixelRatio');
    this.updateViewport();
    canvas.resetMatrix();
    canvas.scale(size[0] / width * pixelRatio, size[1] / height * pixelRatio);
    canvas.draw();
  }
  updateViewport() {
    const size = this._cfgs.size;
    const graph = this._cfgs.graph;
    const topLeft = graph.getPointByCanvas(0, 0);
    const bottomRight = graph.getPointByCanvas(size[0], size[1]);
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
    Util.modifyCSS(this._window, {
      right: topLeft.x < 0 ? 0 : topLeft.x + 'px',
      bottom: topLeft.y < 0 ? 0 : topLeft.y + 'px',
      left: size[0] > bottomRight.x ? size[0] - bottomRight.x : 0 + 'px',
      top: size[1] > bottomRight.y ? size[1] - bottomRight.y : 0 + 'px'
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
