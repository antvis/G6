const Layout = require('../../layout');
const Util = require('../../util');
const layoutConst = require('../../layout/worker/layoutConst');
const LayoutWorker = require('../../layout/worker/layout.worker');

const { LAYOUT_MESSAGE } = layoutConst;

const helper = {
  // pollyfill
  requestAnimationFrame(callback) {
    const fn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
      return setTimeout(callback, 16);
    };
    return fn(callback);
  },
  cancelAnimationFrame(requestId) {
    const fn = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function(requestId) {
      return clearTimeout(requestId);
    };
    return fn(requestId);
  }
};

class LayoutController {
  constructor(graph) {
    this.graph = graph;
    const layoutCfg = this.layoutCfg = graph.get('layout') || {};
    this.layoutType = layoutCfg.type;
    this.worker = null;
    this.workerData = {};
    this._initLayout();
  }

  _initLayout() {
    // no data before rendering
  }

  // get layout worker and create one if not exists
  _getWorker() {
    if (this.worker) {
      return this.worker;
    }

    if (typeof Worker === 'undefined') {
      // 如果当前浏览器不支持web worker，则不使用web worker
      console.warn('Web worker is not supported in current browser.');
      this.worker = null;
    } else {
      this.worker = new LayoutWorker();
    }
    return this.worker;
  }

  // stop layout worker
  _stopWorker() {
    const { workerData } = this;

    if (!this.worker) {
      return;
    }

    this.worker.terminate();
    this.worker = null;
    // 重新开始新的布局之前，先取消之前布局的requestAnimationFrame。
    if (workerData.requestId) {
      helper.cancelAnimationFrame(workerData.requestId);
      workerData.requestId = null;
    }
    if (workerData.requestId2) {
      helper.cancelAnimationFrame(workerData.requestId2);
      workerData.requestId2 = null;
    }
  }

  /**
   * @param {function} success callback
   * @return {boolean} 是否使用web worker布局
   */
  layout(success) {
    const self = this;
    let layoutType = self.layoutType;
    const graph = self.graph;
    // const data = graph.get('data');

    self.data = self.setDataFromGraph();
    const nodes = self.data.nodes;

    if (!nodes) {
      return false;
    }
    const width = graph.get('width');
    const height = graph.get('height');
    const layoutCfg = {};
    Util.mix(layoutCfg, {
      width,
      height,
      center: [ width / 2, height / 2 ]
    }, self.layoutCfg);
    self.layoutCfg = layoutCfg;

    if (layoutType === undefined) {
      if (nodes[0] && nodes[0].x === undefined) {
        // 创建随机布局
        layoutType = layoutCfg.type = 'random';
      } else { // 若未指定布局且数据中有位置信息，则不进行布局，直接按照原数据坐标绘制。
        return false;
      }
    } else {
      if (nodes[0] && nodes[0].x === undefined) {
        // 初始化位置
        self.initPositions(layoutCfg.center, nodes);
      }
    }

    let layoutMethod = self.layoutMethod;
    if (layoutMethod) {
      layoutMethod.destroy();
    }

    this._stopWorker();
    if (layoutCfg.workerEnabled && this._layoutWithWorker(self.data, success)) {
      // 如果启用布局web worker并且浏览器支持web worker，用web worker布局。否则回退到不用web worker布局。
      return true;
    }

    if (layoutType === 'force') {
      const onTick = layoutCfg.onTick;
      const tick = () => {
        onTick && onTick();
        graph.refreshPositions();
      };
      layoutCfg.tick = tick;
      const onLayoutEnd = layoutCfg.onLayoutEnd;
      layoutCfg.onLayoutEnd = () => {
        onLayoutEnd && onLayoutEnd();
        graph.emit('afterlayout');
      };
    }

    try {
      layoutMethod = new Layout[layoutType](layoutCfg);
    } catch (e) {
      console.warn('The layout method: ' + layoutCfg + ' does not exist! Please specify it first.');
      return false;
    }
    layoutMethod.init(self.data);
    graph.emit('beforelayout');
    layoutMethod.execute();
    self.layoutMethod = layoutMethod;
    if (layoutType !== 'force') {
      graph.emit('afterlayout');
      self.refreshLayout();
    }
    return false;
  }

  /**
   * layout with web worker
   * @param {object} data graph data
   * @param {function} success callback function
   * @return {boolean} 是否支持web worker
   */
  _layoutWithWorker(data, success) {
    const { nodes, edges } = data;
    const { layoutCfg, graph } = this;
    const worker = this._getWorker();
    // 每次worker message event handler调用之间的共享数据，会被修改。
    const { workerData } = this;

    if (!worker) {
      return false;
    }

    workerData.requestId = null;
    workerData.requestId2 = null;
    workerData.currentTick = null;
    workerData.currentTickData = null;

    graph.emit('beforelayout');
    // NOTE: postMessage的message参数里面不能包含函数，否则postMessage会报错，
    // 例如：'function could not be cloned'。
    // 详情参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
    // 所以这里需要把过滤layoutCfg里的函数字段过滤掉。
    const filteredLayoutCfg = filterObject(layoutCfg, value => typeof value !== 'function');
    worker.postMessage({ type: LAYOUT_MESSAGE.RUN, nodes, edges, layoutCfg: filteredLayoutCfg });
    worker.onmessage = event => {
      this._handleWorkerMessage(event, data, success);
    };
    return true;
  }

  // success callback will be called when updating graph positions for the first time.
  _handleWorkerMessage(event, data, success) {
    const { graph, workerData, layoutCfg } = this;
    const eventData = event.data;
    const { type } = eventData;
    const onTick = () => {
      if (layoutCfg.onTick) {
        layoutCfg.onTick();
      }
    };
    const onLayoutEnd = () => {
      if (layoutCfg.onLayoutEnd) {
        layoutCfg.onLayoutEnd();
      }
      graph.emit('afterlayout');
    };

    switch (type) {
      case LAYOUT_MESSAGE.TICK:
        workerData.currentTick = eventData.currentTick;
        workerData.currentTickData = eventData;
        if (!workerData.requestId) {
          workerData.requestId = helper.requestAnimationFrame(function() {
            updateLayoutPosition(data, eventData);
            graph.refreshPositions();
            onTick();
            if (eventData.currentTick === 1 && success) {
              success();
            }

            if (eventData.currentTick === eventData.totalTicks) {
              // 如果是最后一次tick
              onLayoutEnd();
            } else if (workerData.currentTick === eventData.totalTicks) {
              // 注意这里workerData.currentTick可能已经不再是前面赋值时候的值了，
              // 因为在requestAnimationFrame等待时间里，可能产生新的tick。
              // 如果当前tick不是最后一次tick，并且所有的tick消息都已发出来了，那么需要用最后一次tick的数据再刷新一次。
              workerData.requestId2 = helper.requestAnimationFrame(function() {
                updateLayoutPosition(data, workerData.currentTickData);
                graph.refreshPositions();
                workerData.requestId2 = null;
                onTick();
                onLayoutEnd();
              });
            }
            workerData.requestId = null;
          });
        }
        break;
      case LAYOUT_MESSAGE.END:
        // 如果没有tick消息（非力导布局）
        if (workerData.currentTick == null) {
          updateLayoutPosition(data, eventData);
          this.refreshLayout();
          // 非力导布局，没有tick消息，只有end消息，所以需要执行一次回调。
          if (success) {
            success();
          }
          graph.emit('afterlayout');
        }
        break;
      case LAYOUT_MESSAGE.ERROR:
        break;
      default:
        break;
    }
  }

// 绘制
  refreshLayout() {
    const self = this;
    const graph = self.graph;
    if (graph.get('animate')) {
      graph.positionsAnimate();
    } else {
      graph.refreshPositions();
    }
  }

// 更新布局参数
  updateLayoutCfg(cfg) {
    const self = this;
    const graph = self.graph;
    self.layoutType = cfg.type;
    const layoutMethod = self.layoutMethod;
    self.data = self.setDataFromGraph();

    this._stopWorker();
    if (cfg.workerEnabled && this._layoutWithWorker(self.data, null)) {
      // 如果启用布局web worker并且浏览器支持web worker，用web worker布局。否则回退到不用web worker布局。
      return;
    }

    layoutMethod.init(self.data);
    layoutMethod.updateCfg(cfg);
    graph.emit('beforelayout');
    layoutMethod.execute();
    if (self.layoutType !== 'force') {
      graph.emit('afterlayout');
    }
    self.refreshLayout();
  }

// 更换布局
  changeLayout(layoutType) {
    const self = this;
    self.layoutType = layoutType;
    self.layoutCfg = self.graph.get('layout') || {};
    self.layoutCfg.type = layoutType;
    const layoutMethod = self.layoutMethod;
    layoutMethod && layoutMethod.destroy();
    self.layout();
  }

  // 更换数据
  changeData() {
    const self = this;
    const layoutMethod = self.layoutMethod;
    layoutMethod && layoutMethod.destroy();
    self.layout();
  }

  // 从 this.graph 获取数据
  setDataFromGraph() {
    const self = this;
    const nodes = [];
    const edges = [];
    const nodeItems = self.graph.getNodes();
    const edgeItems = self.graph.getEdges();
    nodeItems.forEach(nodeItem => {
      const model = nodeItem.getModel();
      nodes.push(model);
    });
    edgeItems.forEach(edgeItem => {
      const model = edgeItem.getModel();
      edges.push(model);
    });
    const data = { nodes, edges };
    if (self.layoutType === 'fruchtermanGroup') {
      // const groupsData = self.graph.get('groups');
      // const customGroup = self.graph.get('customGroup');
      // const groupController = self.graph.get('customGroupControll');
      // data.groupsData = groupsData;
      // data.customGroup = customGroup;
      // data.groupController = groupController;
      data.graph = self.graph;
    }
    return data;
  }

  // 重新布局
  relayout() {
    const self = this;
    const graph = self.graph;
    const layoutMethod = self.layoutMethod;
    if (self.layoutType === 'force') {
      layoutMethod.ticking = false;
      layoutMethod.forceSimulation.stop();
    }
    graph.emit('beforelayout');
    layoutMethod.execute();
    if (self.layoutType !== 'force') {
      graph.emit('afterlayout');
    }
    self.refreshLayout();
  }

// 控制布局动画
  layoutAnimate() {
  }

// 根据 type 创建 Layout 实例
  _getLayout() {
  }

  // 将当前节点的平均中心移动到原点
  moveToZero() {
    const self = this;
    const graph = self.graph;
    const data = graph.get('data');
    const nodes = data.nodes;
    if (nodes[0].x === undefined || nodes[0].x === null || isNaN(nodes[0].x)) {
      return;
    }
    const meanCenter = [ 0, 0 ];
    nodes.forEach(node => {
      meanCenter[0] += node.x;
      meanCenter[1] += node.y;
    });
    meanCenter[0] /= nodes.length;
    meanCenter[1] /= nodes.length;
    nodes.forEach(node => {
      node.x -= meanCenter[0];
      node.y -= meanCenter[1];
    });
  }

  // 初始化节点到 center
  initPositions(center, nodes) {
    if (!nodes) {
      return;
    }
    nodes.forEach(node => {
      node.x = center[0] + Math.random();
      node.y = center[1] + Math.random();
    });
  }

  destroy() {
    const self = this;
    self.graph = null;
    const layoutMethod = self.layoutMethod;
    layoutMethod && layoutMethod.destroy();
    const { worker } = this;
    if (worker) {
      worker.terminate();
      this.worker = null;
    }
    self.destroyed = true;
  }
}

function updateLayoutPosition(data, layoutData) {
  const { nodes } = data;
  const { nodes: layoutNodes } = layoutData;
  nodes.forEach((node, i) => {
    node.x = layoutNodes[i].x;
    node.y = layoutNodes[i].y;
  });
}

function filterObject(collection, callback) {
  const result = {};
  if (collection && typeof collection === 'object') {
    for (const key in collection) {
      if (collection.hasOwnProperty(key) && callback(collection[key])) {
        result[key] = collection[key];
      }
    }
    return result;
  }
  return collection;
}

module.exports = LayoutController;
