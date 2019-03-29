const Base = require('../base');
const createDOM = require('@antv/util/lib/dom/create-dom');
const modifyCSS = require('@antv/util/lib/dom/modify-css');
const max = Math.max;
const min = Math.min;
const PADDING = 20;
const GRID = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)';

class Grid extends Base {
  init() {
    const graph = this.get('graph');
    const minZoom = graph.get('minZoom');
    const graphContainer = graph.get('container');
    const canvas = graph.get('canvas').get('el');
    const width = graph.get('width');
    const height = graph.get('height');
    const container = createDOM('<div style="position: absolute; left:0;top:0;right:0;bottom:0;overflow: hidden;z-index: -1;"></div>');
    const gridContainer = createDOM('<div class="g6-grid" style="position:absolute;transform-origin: 0% 0% 0px; background-image: ' + GRID + '"></div>');
    container.appendChild(gridContainer);
    modifyCSS(gridContainer, {
      width: width / minZoom + 'px',
      height: height / minZoom + 'px',
      left: -width / minZoom / 2 + 'px',
      top: -height / minZoom / 2 + 'px'
    });
    graphContainer.insertBefore(container, canvas);
    this.set('container', container);
    this.set('gridContainer', gridContainer);
  }
  getEvents() {
    return { viewportchange: 'updateGrid' };
  }
  updateGrid(e) {
    const graph = this.get('graph');
    const gridContainer = this.get('gridContainer');
    const matrix = e.matrix;
    const transform = 'matrix(' + matrix[0] + ',' + matrix[1] + ',' + matrix[3] + ',' + matrix[4] + ',' + matrix[6] + ',' + matrix[7] + ')';
    const bbox = graph.get('group').getBBox();
    modifyCSS(gridContainer, {
      transform,
      left: (min(bbox.minX, 0) - PADDING) * max(matrix[0], 1) + 'px',
      top: (min(bbox.minY, 0) - PADDING) * max(matrix[4], 1) + 'px'
    });
  }
  getContainer() {
    return this.get('container');
  }
  destroy() {
    const graphContainer = this.get('graph').get('container');
    graphContainer.removeChild(this.get('container'));
  }
}

module.exports = Grid;
