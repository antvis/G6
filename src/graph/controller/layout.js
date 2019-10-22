const Layout = require('../../layout');
const Util = require('../../util');

class LayoutController {
  constructor(graph) {
    this.graph = graph;
    this.layoutCfg = graph.get('layout');
    this.layoutType = this.layoutCfg ? this.layoutCfg.type : undefined;
    this._initLayout();
  }

  _initLayout() {
    // no data before rendering
  }

  layout() {
    const self = this;
    let layoutType = self.layoutType;
    const graph = self.graph;
    // const data = graph.get('data');

    self.data = self.setDataFromGraph();
    const nodes = self.data.nodes;

    if (!nodes) {
      return;
    }
    const width = graph.get('width');
    const height = graph.get('height');
    const layoutCfg = {};
    Util.mix(layoutCfg, {
      width,
      height,
      center: [ width / 2, height / 2 ]
    }, self.layoutCfg);

    if (layoutType === undefined) {
      if (nodes[0] && nodes[0].x === undefined) {
        // 创建随机布局
        layoutType = 'random';
      } else { // 若未指定布局且数据中有位置信息，则不进行布局，直接按照原数据坐标绘制。
        return;
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
    self.layoutCfg = layoutCfg;

    try {
      layoutMethod = new Layout[layoutType](layoutCfg);
    } catch (e) {
      console.warn('The layout method: ' + layoutCfg + ' does not exist! Please specify it first.');
      return;
    }
    layoutMethod.init(self.data);
    graph.emit('beforelayout');
    layoutMethod.execute();
    if (layoutType !== 'force') {
      graph.emit('afterlayout');
    }
    self.layoutMethod = layoutMethod;
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
    self.refreshLayout();
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
    self.destroyed = true;
  }
}

module.exports = LayoutController;
