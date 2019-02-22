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
    const size = cfgs.size;
    const graph = cfgs.graph;
    const pixelRatio = graph.get('pixelRatio') || graph.get('canvas').get('pixelRatio');
    const widthRatio = graph.get('width') / size[0] * pixelRatio;
    const heightRatio = graph.get('height') / size[1] * pixelRatio;
    const canvas = this._canvas;
    const containerDOM = canvas.get('containerDOM');
    const viewport = Util.createDom('<div class="' + cfgs.viewportClassName + '" style="position:absolute;left:0;top:0;box-sizing:border-box;border: 2px solid #1980ff"></div>');
    let x,
      y,
      dragging,
      left,
      top,
      width,
      height;
    containerDOM.addEventListener('mousedown', e => {
      if (e.target !== viewport) {
        return;
      }
      // 如果视口已经最大了，不需要拖拽
      const style = viewport.style;
      left = parseInt(style.left, 10);
      top = parseInt(style.top, 10);
      width = parseInt(style.width, 10);
      height = parseInt(style.height, 10);
      if (width >= size[0] || height >= size[1]) {
        return;
      }
      dragging = true;
      x = e.clientX;
      y = e.clientY;
    }, false);
    containerDOM.addEventListener('mousemove', e => {
      if (!dragging || (!e.clientX && !e.clientY)) {
        return;
      }
      let dx = x - e.clientX;
      let dy = y - e.clientY;
      // 若视口移动到最左边或最右边了
      if (left - dx < 0) {
        dx = left;
      } else if (left - dx + width > size[0]) {
        dx = left + width - size[0];
      }
      // 若视口移动到最上或最下边了
      if (top - dy < 0) {
        dy = top;
      } else if (top - dy + height > size[1]) {
        dy = top + height - size[1];
      }
      left -= dx;
      top -= dy;
      Util.modifyCSS(viewport, {
        left: left + 'px',
        top: top + 'px'
      });
      graph.translate(dx * widthRatio, dy * heightRatio);
      x = e.clientX;
      y = e.clientY;
    }, false);
    containerDOM.addEventListener('mouseleave', () => {
      dragging = false;
    }, false);
    containerDOM.addEventListener('mouseup', () => {
      dragging = false;
    }, false);
    this._viewport = viewport;
    containerDOM.appendChild(viewport);
  }
  updateCanvas() {
    const cfgs = this._cfgs;
    const size = cfgs.size;
    const graph = cfgs.graph;
    const canvas = this._canvas;
    if (cfgs.keyShapeOnly) {
      this.updateKeyShapes();
    } else {
      this.updateGraphShapes();
    }
    const bbox = canvas.getBBox();
    const width = max(bbox.width, graph.get('width'));
    const height = max(bbox.height, graph.get('height'));
    const pixelRatio = canvas.get('pixelRatio');
    this.updateViewport();
    canvas.resetMatrix();
    canvas.scale(size[0] / width * pixelRatio, size[1] / height * pixelRatio);
    canvas.draw();
  }
  updateKeyShapes() {
    const graph = this._cfgs.graph;
    const canvas = this._canvas;
    const group = canvas.get('children')[0] || canvas.addGroup();
    const nodes = graph.getNodes();
    const edges = graph.getEdges();

    canvas.get('children');
    Util.each(edges, edge => {
      group.add(edge.get('keyShape').clone());
    });
    Util.each(nodes, node => {
      group.add(node.get('keyShape').clone());
    });
  }
  updateGraphShapes() {
    const cfgs = this._cfgs;
    const graph = cfgs.graph;
    const canvas = this._canvas;
    const graphGroup = graph.get('group');
    const clonedGroup = graphGroup.clone();
    clonedGroup.resetMatrix();
    canvas.get('children')[0] = clonedGroup;
  }
  updateViewport() {
    const size = this._cfgs.size;
    const graph = this._cfgs.graph;
    const matrix = graph.get('group').getMatrix();
    const topLeft = graph.getPointByCanvas(0, 0);
    if (!this._viewport) {
      this.initViewport();
    }
    // viewport宽高,左上角点的计算
    const width = matrix[0] >= 1 ? size[0] / matrix[0] : size[0];
    const height = matrix[4] >= 1 ? size[1] / matrix[4] : size[1];
    const left = topLeft.x > 0 ? topLeft.x * size[0] / graph.get('width') : 0;
    const top = topLeft.y > 0 ? topLeft.y * size[1] / graph.get('height') : 0;
    Util.modifyCSS(this._viewport, {
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    });
  }
  getCanvas() {
    return this._canvas;
  }
  getViewport() {
    return this._viewport;
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
