import { isNaN } from '../../util/base';
import { GraphData } from '../../types';
import { IAbstractGraph } from '../../interface/graph';

export default abstract class LayoutController {
  public graph: IAbstractGraph;

  public destroyed: boolean;

  protected layoutCfg;

  protected layoutType: string;

  protected layoutMethod;

  protected data;

  constructor(graph: IAbstractGraph) {
    this.graph = graph;
    this.layoutCfg = graph.get('layout') || {};
    this.layoutType = this.layoutCfg.type;
    this.initLayout();
  }

  // eslint-disable-next-line class-methods-use-this
  protected initLayout() {
    // no data before rendering
  }

  public getLayoutType(): string {
    return this.layoutCfg.type;
  }

  /**
   * @param {function} success callback
   * @return {boolean} 是否使用web worker布局
   */
  public abstract layout(success?: () => void): boolean;

  // 绘制
  public refreshLayout() {
    const { graph } = this;
    if (!graph) return;
    if (graph.get('animate')) {
      graph.positionsAnimate();
    } else {
      graph.refreshPositions();
    }
  }

  // 更新布局参数
  public abstract updateLayoutCfg(cfg);

  // 更换布局
  public changeLayout(layoutType: string) {
    const { graph, layoutMethod } = this;

    this.layoutType = layoutType;

    this.layoutCfg = graph.get('layout') || {};
    this.layoutCfg.type = layoutType;

    if (layoutMethod) {
      layoutMethod.destroy();
    }
    this.layout();
  }

  // 更换数据
  public changeData() {
    const { layoutMethod } = this;

    if (layoutMethod) {
      layoutMethod.destroy();
    }
    this.layout();
  }

  // 销毁布局，不能使用 this.destroy，因为 controller 还需要被使用，只是把布局算法销毁
  public destroyLayout() {
    const { layoutMethod, graph } = this;
    if (layoutMethod) {
      layoutMethod.destroy();
    }
    graph.set('layout', undefined);
    this.layoutCfg = undefined;
    this.layoutType = undefined;
    this.layoutMethod = undefined;
  }

  // 从 this.graph 获取数据
  public setDataFromGraph(): GraphData {
    const nodes = [];
    const edges = [];
    const combos = [];
    const nodeItems = this.graph.getNodes();
    const edgeItems = this.graph.getEdges();
    const comboItems = this.graph.getCombos();
    const nodeLength = nodeItems.length;
    for (let i = 0; i < nodeLength; i++) {
      const nodeItem = nodeItems[i];
      if (!nodeItem.isVisible()) continue;
      const model = nodeItem.getModel();
      nodes.push(model);
    }

    const edgeLength = edgeItems.length;
    for (let i = 0; i < edgeLength; i++) {
      const edgeItem = edgeItems[i];
      if (edgeItem.destroyed || !edgeItem.isVisible()) continue;
      const model = edgeItem.getModel();
      if (!model.isComboEdge) edges.push(model);
    }

    const comboLength = comboItems.length;
    for (let i = 0; i < comboLength; i++) {
      const comboItem = comboItems[i];
      if (comboItem.destroyed || !comboItem.isVisible()) continue;
      const model = comboItem.getModel();
      combos.push(model);
    }
    return { nodes, edges, combos } as GraphData;
  }

  // 重新布局
  public relayout(reloadData?: boolean) {
    const { graph, layoutMethod, layoutCfg } = this;

    if (reloadData) {
      this.data = this.setDataFromGraph();
      const { nodes } = this.data;
      if (!nodes) {
        return false;
      }
      this.initPositions(layoutCfg.center, nodes);
      layoutMethod.init(this.data);
    }

    if (this.layoutType === 'force') {
      layoutMethod.ticking = false;
      layoutMethod.forceSimulation.stop();
    }
    graph.emit('beforelayout');
    layoutMethod.execute(reloadData);
    if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
  }

  // 控制布局动画
  // eslint-disable-next-line class-methods-use-this
  public layoutAnimate() { }

  // 将当前节点的平均中心移动到原点
  public moveToZero() {
    const { graph } = this;

    const data = graph.get('data');
    const { nodes } = data;
    if (nodes[0].x === undefined || nodes[0].x === null || isNaN(nodes[0].x)) {
      return;
    }
    const meanCenter = [0, 0];
    const nodeLength = nodes.length;
    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
      meanCenter[0] += node.x;
      meanCenter[1] += node.y;
    }

    meanCenter[0] /= nodes.length;
    meanCenter[1] /= nodes.length;

    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
      node.x -= meanCenter[0];
      node.y -= meanCenter[1];
    }
  }

  // 初始化节点到 center 附近
  public initPositions(center, nodes): boolean {
    const { graph } = this;
    if (!nodes) {
      return false;
    }
    let allHavePos = true;
    const width = graph.get('width') * 0.85;
    const height = graph.get('height') * 0.85;
    const nodeNum = nodes.length;
    const horiNum = Math.ceil(Math.sqrt(nodeNum) * (width / height));
    const vertiNum = Math.ceil(nodeNum / horiNum);
    let horiGap = width / (horiNum - 1);
    let vertiGap = height / (vertiNum - 1);
    if (!isFinite(horiGap) || !horiGap) horiGap = 0;
    if (!isFinite(vertiGap) || !horiGap) vertiGap = 0;
    const beginX = center[0] - width / 2;
    const beginY = center[1] - height / 2;
    const nodeLength = nodes.length;
    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
      if (isNaN(node.x)) {
        allHavePos = false;
        node.x = (i % horiNum) * horiGap + beginX;
      }
      if (isNaN(node.y)) {
        allHavePos = false;
        node.y = Math.floor(i / horiNum) * vertiGap + beginY;
      }
    }
    return allHavePos;
  }

  public destroy() {
    const { layoutMethod } = this;

    this.graph = null;

    if (layoutMethod) {
      layoutMethod.destroy();
      layoutMethod.destroyed = true;
    }

    this.destroyed = true;
  }
}
