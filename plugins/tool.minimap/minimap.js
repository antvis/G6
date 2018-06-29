/**
 * @fileOverview minimap
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const { Util, G } = G6;
const Canvas = G.canvas.Canvas;

class Minimap {
  constructor(options) {
    Util.mix(this, {
      /**
       * 类型
       * @type {string}
       */
      type: 'minimap',

      /**
       * dom 容器
       * @type {dom}
       */
      container: null,

      /**
       * 是否是缩略图
       * @type {boolean}
       */
      isMinimap: true,

      /**
       * 背景样式
       * @type {CSS}
       */
      backgroundCSS: {
        height: '100%',
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        'z-index': 0
      },

      /**
       * 容器样式
       * @type {CSS}
       */
      minimapContainerCSS: {
        background: '#fff',
        position: 'relative',
        overflow: 'hidden'
      },

      /**
       * 缩略图视口框
       * @type {CSS}
       */
      viewportCSS: {
        height: '100%',
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        'z-index': 1
      },

      /**
       * 控制图层
       * @type {CSS}
       */
      controlLayerCSS: {
        width: '100%',
        height: '100%',
        cursor: 'move',
        position: 'absolute',
        'z-index': 2
      },

      /**
       * 缩略图可视区域视窗样式
       * @type {G.Rect.ATTRS}
       */
      viewportWindowStyle: {
        stroke: '#91D5FF'
      },

      /**
       * 缩略图背景样式
       * @type {G.Rect.ATTRS}
       */
      viewportBackStyle: {
        fill: '#EBEEF2',
        fillOpacity: 0.65
      },

      /**
       * 获取 G6 图
       * @type {funtion}
       */
      getGraph() {

      },
      ...options
    });
    this._initContainer();
    this._initMiniMap();
    this._bindEvent();
  }
  _bindEvent() {
    const controlLayer = this.controlLayer;
    let miniMapViewPortActived = false;
    let startMatrix;
    let miniMapScale;
    let graphScale;
    let startPoint;
    let graph;
    controlLayer.on('mousedown', ev => {
      if (!this.miniMapMatrix) {
        return;
      }
      graph = this.getGraph();
      miniMapViewPortActived = true;
      startMatrix = Util.cloneDeep(graph.getMatrix());
      miniMapScale = this.miniMapMatrix[0];
      graphScale = startMatrix[0];
      startPoint = {
        clientX: ev.clientX,
        clientY: ev.clientY
      };
    });
    controlLayer.on('mouseup', () => {
      resetStatus();
    });
    controlLayer.on('mouseleave', () => {
      resetStatus();
    });
    controlLayer.on('mousemove', ev => {
      if (miniMapViewPortActived && graph) {
        const dx = startPoint.clientX - ev.clientX;
        const dy = startPoint.clientY - ev.clientY;
        const matrix = Util.cloneDeep(startMatrix);
        Util.mat3.translate(matrix, matrix, [ graphScale * dx / miniMapScale, graphScale * dy / miniMapScale ]);
        graph.updateMatrix(matrix);
      }
    });
    function resetStatus() {
      miniMapViewPortActived = false;
      miniMapScale = undefined;
      startPoint = undefined;
      startMatrix = undefined;
      graphScale = undefined;
      graph = undefined;
    }
  }
  _initMiniMap() {
    const background = this.background;
    const viewport = this.viewPort;
    const width = this.width;
    const height = this.height;
    const viewportWindowStyle = this.viewportWindowStyle;
    const viewportBackStyle = this.viewportBackStyle;
    const miniMapCanvas = new Canvas({
      containerDOM: background,
      width,
      height
    });
    const viewportCanvas = new Canvas({
      containerDOM: viewport,
      width,
      height
    });
    const viewportWindow = viewportCanvas.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        ...viewportWindowStyle
      }
    });
    const viewportBack = viewportCanvas.addShape('path', {
      attrs: {
        path: 'M0,0 L1,1',
        ...viewportBackStyle
      }
    });

    background.css({
      width: width + 'px',
      height: height + 'px'
    });
    viewport.css({
      position: 'absolute'
    });
    this.miniMapCanvas = miniMapCanvas;
    this.viewportCanvas = viewportCanvas;
    this.viewportWindow = viewportWindow;
    this.viewportBack = viewportBack;
  }
  _initContainer() {
    let container = this.container;
    let width = this.width;
    let height = this.height;
    if (container) {
      if (Util.isString(container)) {
        container = document.getElementById(container);
      }
    } else {
      throw new Error('please set the container for the minimap !');
    }
    if (!width) {
      width = Util.getWidth(container);
    }
    if (!height) {
      height = Util.getHeight(container);
    }
    const minimapContainerCSS = this.minimapContainerCSS;
    minimapContainerCSS.width = width + 'px';
    minimapContainerCSS.height = height + 'px';
    const backgroundCSS = this.backgroundCSS;
    const viewportCSS = this.viewportCSS;
    const controlLayerCSS = this.controlLayerCSS;
    const minimapContainer = Util.createDOM('<div class="g6-editor-minimap-container"></div>', minimapContainerCSS);
    const background = Util.createDOM('<div class="g6-editor-minimap-background"></div>', backgroundCSS);
    const viewPort = Util.createDOM('<div class="g6-editor-minimap-viewport">', viewportCSS);
    const controlLayer = Util.createDOM('<div class="g6-editor-minimap-control-layer">', controlLayerCSS);
    container.appendChild(minimapContainer);
    minimapContainer.appendChild(controlLayer);
    minimapContainer.appendChild(viewPort);
    minimapContainer.appendChild(background);
    this.minimapContainer = minimapContainer;
    this.background = background;
    this.viewPort = viewPort;
    this.controlLayer = controlLayer;
  }
  // 1. 为了防止画面闪烁 2. 为了缩略图中元素最小尺寸可控；所以这里采取了一种比较 hack 的方式绘制缩略图
  // 大体思路是将 graph canvas 的 context 篡改为 minimap canvas 的 context，然后用 graph 的 canvas 去画
  renderBackground(graph) {
    if (!graph) {
      graph = this.getGraph();
    }
    const miniMapCanvas = this.miniMapCanvas;
    const width = this.width;
    const height = this.height;
    Util.graph2Canvas({
      graph,
      width,
      height,
      canvas: miniMapCanvas
    });
    this.miniMapMatrix = miniMapCanvas.matrix;
  }
  renderViewPort(graph) {
    if (!graph) {
      graph = this.getGraph();
    }
    if (graph.getItems().length === 0) {
      return;
    }
    const viewportWindow = this.viewportWindow;
    const viewportCanvas = this.viewportCanvas;
    const viewportBack = this.viewportBack;
    const miniMapMatrix = this.miniMapMatrix;
    const graphWidth = graph.getWidth();
    const graphHeight = graph.getHeight();
    const width = this.width;
    const height = this.height;
    const graphMatrix = graph.getMatrix();
    if (!miniMapMatrix) {
      return;
    }
    const graphTL = Util.invertMatrix({
      x: 0,
      y: 0
    }, graphMatrix);
    const graphBR = Util.invertMatrix({
      x: graphWidth,
      y: graphHeight
    }, graphMatrix);
    const viewPortTL = Util.applyMatrix(graphTL, miniMapMatrix);
    const viewPortBR = Util.applyMatrix(graphBR, miniMapMatrix);
    const windowWidth = viewPortBR.x - viewPortTL.x;
    const windowHeight = viewPortBR.y - viewPortTL.y;
    viewportBack.attr({
      path: [
        [ 'M', 0, 0 ],
        [ 'L', width, 0 ],
        [ 'L', width, height ],
        [ 'L', 0, height ],
        [ 'L', 0, 0 ],
        [ 'M', viewPortTL.x, viewPortTL.y ],
        [ 'L', viewPortTL.x, viewPortBR.y ],
        [ 'L', viewPortBR.x, viewPortBR.y ],
        [ 'L', viewPortBR.x, viewPortTL.y ],
        [ 'L', viewPortTL.x, viewPortTL.y ]
      ]
    });
    viewportWindow.attr({
      x: viewPortTL.x,
      y: viewPortTL.y,
      width: windowWidth,
      height: windowHeight
    });
    viewportCanvas.draw();
  }
  destroy() {
    this.minimapContainer.destroy();
  }
}

module.exports = Minimap;
