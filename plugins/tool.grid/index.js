/**
 * @fileOverview grid
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, {
      /**
       * grid cell
       * @type {number}
       */
      cell: 16,

      /**
       * grid line style
       * @type {object}
       */
      line: {
        stroke: '#A3B1BF',
        lineWidth: 0.5
      },

      /**
       * grid line style
       * @type {string}
       */
      type: 'dot',

      /**
       * visible
       * @type {boolean}
       */
      visible: true
    }, options);
  }
  /**
   * init plugin
   */
  init() {
    const graph = this.graph;
    graph.on('afterinit', () => {
      this._draw();
    });
    graph.on('afterviewportchange', () => {
      this.update();
    });
    graph.on('beforechangesize', () => {
      this.update();
    });
    !this.visible && this.hide();
  }
  // draw grid
  _draw() {
    const graph = this.graph;
    const path = this._getPath();
    const group = graph.getRootGroup();
    const attrs = Util.mix({}, this.line);
    const matrix = graph.getMatrix();
    const type = this.type;
    const lineWidth = type === 'line' ? 1 / matrix[0] : 2 / matrix[0];
    if (type === 'dot') {
      attrs.lineDash = null;
    }
    attrs.lineWidth = lineWidth;
    attrs.path = path;
    const gridEl = group.addShape('path', {
      attrs,
      capture: false,
      zIndex: 0
    });
    gridEl.toBack();
    this.gridEl = gridEl;
  }
  // get line style grid path
  _getLinePath() {
    const graph = this.graph;
    const width = graph.getWidth();
    const height = graph.getHeight();
    const tl = graph.getPoint({
      x: 0,
      y: 0
    });
    const br = graph.getPoint({
      x: width,
      y: height
    });
    const cell = this.cell;
    const flooX = Math.ceil(tl.x / cell) * cell;
    const flooY = Math.ceil(tl.y / cell) * cell;
    const path = [];
    for (let i = 0; i <= br.x - tl.x; i += cell) {
      const x = flooX + i;
      path.push([ 'M', x, tl.y ]);
      path.push([ 'L', x, br.y ]);
    }
    for (let j = 0; j <= br.y - tl.y; j += cell) {
      const y = flooY + j;
      path.push([ 'M', tl.x, y ]);
      path.push([ 'L', br.x, y ]);
    }
    return path;
  }
  // get grid path
  _getPath() {
    const type = this.type;
    return this['_get' + Util.upperFirst(type) + 'Path']();
  }
  // get dot style grid path
  _getDotPath() {
    const graph = this.graph;
    const width = graph.getWidth();
    const height = graph.getHeight();
    const tl = graph.getPoint({
      x: 0,
      y: 0
    });
    const br = graph.getPoint({
      x: width,
      y: height
    });
    const cell = this.cell;
    const flooX = Math.ceil(tl.x / cell) * cell;
    const flooY = Math.ceil(tl.y / cell) * cell;
    const matrix = graph.getMatrix();
    const detalx = 2 / matrix[0];
    const path = [];
    for (let i = 0; i <= br.x - tl.x; i += cell) {
      const x = flooX + i;
      for (let j = 0; j <= br.y - tl.y; j += cell) {
        const y = flooY + j;
        path.push([ 'M', x, y ]);
        path.push([ 'L', x + detalx, y ]);
      }
    }
    return path;
  }
  show() {
    this.gridEl.show();
    this.visible = true;
  }
  hide() {
    this.gridEl.hide();
    this.visible = false;
  }
  getCell() {
    const cell = this.cell;
    const graph = this.graph;
    const matrix = graph.getMatrix();
    const scale = matrix[0];
    if (cell * scale < 9.6) {
      return 9.6 / scale;
    }
    return cell;
  }
  update(cfg) {
    const gridEl = this.gridEl;
    if (!gridEl) {
      return;
    }
    cfg && Util.mix(this, cfg);
    const path = this._getPath();
    const graph = this.graph;
    const zoom = graph.getZoom();
    const type = this.type;
    const lineWidth = type === 'line' ? 1 / zoom : 2 / zoom;
    if (this.cell * zoom < 8 || this.cell * zoom > 32) {
      this.cell = 16 / zoom;
    }
    gridEl.attr('lineWidth', lineWidth);
    gridEl.attr('path', path);
  }
  destroy() {
    const gridEl = this.gridEl;
    gridEl && gridEl.remove();
  }
}

G6.Plugins['tool.grid'] = Plugin;

module.exports = Plugin;
