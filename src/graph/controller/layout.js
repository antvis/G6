const Layout = require('../../layout');
const Util = require('../../util');

class LayoutController {
  constructor(graph) {
    this.graph = graph;
    this.layoutType = graph.get('layout');
    // if (layout === undefined) {
    //   console.log(graph);
    //   if (graph.getNodes()[0].x === undefined) {
    //     // 创建随机布局
    //     const randomLayout = new Layout.Random();
    //     this.set('layout', randomLayout);
    //   } else { // 若未指定布局且数据中有位置信息，则不进行布局，直接按照原数据坐标绘制。
    //     return;
    //   }
    // }
    // layout = this._getLayout();
    this._initLayout();
  }

  _initLayout() {
    // const layout = this.layout;
    // const graph = this.graph;
    // const nodes = graph.getNodes();
    // const edges = graph.getEdges();
    // layout.init(nodes, edges);
  }

  layout() {
    const self = this;
    let layoutType = self.layoutType;
    const graph = self.graph;
    const data = self.data || graph.get('data');
    const nodes = data.nodes || [];
    const edges = data.edges || [];
    const width = graph.get('width');
    const height = graph.get('height');
    const layoutCfg = [];
    Util.mix(layoutCfg, {
      width,
      height,
      center: [ width / 2, height / 2 ]
    }, graph.get('layoutCfg'));

    if (layoutType === undefined) {
      if (nodes[0] && nodes[0].x === undefined) {
        // 创建随机布局
        layoutType = 'random';
      } else { // 若未指定布局且数据中有位置信息，则不进行布局，直接按照原数据坐标绘制。
        return;
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
    }
    layoutMethod = new Layout[layoutType](nodes, edges, layoutCfg);
    layoutMethod.init();
    layoutMethod.excute();
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
    const layoutMethod = self.layoutMethod;
    layoutMethod.updateCfg(cfg);
    if (self.layoutType !== 'force') {
      self.moveToZero();
    }
    layoutMethod.excute();
    self.refreshLayout();
  }

// 更换布局
  changeLayout(layoutType) { // , layoutCfg = null
    const self = this;
    self.layoutType = layoutType;
    const layoutMethod = self.layoutMethod;
    layoutMethod.destroy();
    self.moveToZero();
    self.layout();
    self.refreshLayout();
  }

  // 更换数据
  changeData(data) {
    const self = this;
    // const graph = self.graph;
    self.data = data;
    self.layout();
    // graph.refreshPositions();
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

  destroy() {
    this.graph = null;
    const layoutMethod = this.layoutMethod;
    layoutMethod.destroy();
    this.destroyed = true;
  }
}

module.exports = LayoutController;
