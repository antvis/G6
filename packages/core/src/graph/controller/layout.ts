import { isFunction, groupBy } from '@antv/util';
import { isNaN, calculationItemsBBox } from '../../util/base';
import { GraphData } from '../../types';
import { IAbstractGraph } from '../../interface/graph';

export default abstract class LayoutController {
  public graph: IAbstractGraph;

  public destroyed: boolean;

  protected layoutCfg;

  protected layoutType: string | string[];

  protected layoutMethods;

  protected data;

  constructor(graph: IAbstractGraph) {
    this.graph = graph;
    this.layoutCfg = graph.get('layout') || {};
    this.layoutType = this.getLayoutType();
    this.layoutMethods = [];
    this.initLayout();
  }

  // eslint-disable-next-line class-methods-use-this
  protected initLayout() {
    // no data before rendering
  }

  public getLayoutType(): string | string[] {
    return this.getLayoutCfgType(this.layoutCfg);
  }

  protected getLayoutCfgType(layoutCfg): string | string[] {
    const type = layoutCfg.type;
    // type should be top priority
    if (type) {
      return type;
    }

    const pipes = layoutCfg.pipes;
    if (Array.isArray(pipes)) {
      return pipes.map((pipe) => pipe?.type || '');
    }

    return null;
  }

  protected isLayoutTypeSame(cfg): boolean {
    const current = this.getLayoutCfgType(cfg);
    // already has pipes
    if (Array.isArray(this.layoutType)) {
      return this.layoutType.every((type, index) => type === current[index]);
    }

    return cfg?.type === this.layoutType;
  }

  /**
   * @param {function} success callback
   * @return {boolean} 是否使用web worker布局
   */
  public abstract layout(success?: () => void): boolean;

  // 绘制
  public refreshLayout() {
    const { graph, layoutType, data } = this;
    if (!graph) return;
    if (graph.get('animate')) {
      graph.positionsAnimate(layoutType === 'comboCombined');
    } else {
      graph.refreshPositions();
      // 如果是 comboCombined 布局，则使用返回的 combos 数据更新 combo item 位置
      if (layoutType === 'comboCombined') {
        const { combos } = data;
        combos.forEach(combo => {
          graph.updateItem(combo.id, {
            x: combo.x,
            y: combo.y
          })
        })
      }
    }
  }

  // 更新布局参数
  public abstract updateLayoutCfg(cfg);

  // 更换布局
  public changeLayout(cfg) {
    this.layoutCfg = cfg;

    this.destoryLayoutMethods();
    this.layout();
  }

  // 更换数据
  public changeData() {
    this.destoryLayoutMethods();
    this.layout();
  }

  public destoryLayoutMethods() {
    const { layoutMethods } = this;
    layoutMethods?.forEach((layoutMethod) => {
      layoutMethod.destroy();
    });
    this.layoutMethods = [];
  }

  // 销毁布局，不能使用 this.destroy，因为 controller 还需要被使用，只是把布局算法销毁
  public destroyLayout() {
    const { graph } = this;
    this.destoryLayoutMethods();

    graph.set('layout', undefined);
    this.layoutCfg = undefined;
    this.layoutType = undefined;
    this.layoutMethods = undefined;
  }

  // 从 this.graph 获取数据
  public setDataFromGraph(): GraphData {
    const nodes = [];
    const hiddenNodes = [];
    const edges = [];
    const hiddenEdges = [];
    const comboEdges = [];
    const combos = [];
    const hiddenCombos = [];
    const nodeItems = this.graph.getNodes();
    const edgeItems = this.graph.getEdges();
    const comboItems = this.graph.getCombos();
    const nodeLength = nodeItems.length;
    for (let i = 0; i < nodeLength; i++) {
      const nodeItem = nodeItems[i];
      if (!nodeItem || nodeItem.destroyed) continue;
      const model = nodeItem.getModel();
      if (!nodeItem.isVisible()) {
        hiddenNodes.push(model);
        continue;
      }
      nodes.push(model);
    }

    const edgeLength = edgeItems.length;
    for (let i = 0; i < edgeLength; i++) {
      const edgeItem = edgeItems[i];
      if (!edgeItem || edgeItem.destroyed) continue;
      const model = edgeItem.getModel();
      if (!edgeItem.isVisible()) {
        hiddenEdges.push(model);
        continue;
      }
      if (!model.isComboEdge) edges.push(model);
      else comboEdges.push(model);
    }

    const comboLength = comboItems.length;
    for (let i = 0; i < comboLength; i++) {
      const comboItem = comboItems[i];
      if (comboItem.destroyed) continue;
      const model = comboItem.getModel();
      if (!comboItem.isVisible()) {
        hiddenEdges.push(model);
        continue;
      }
      combos.push(model);
    }
    return {
      nodes,
      hiddenNodes,
      edges,
      hiddenEdges,
      combos,
      hiddenCombos,
      comboEdges,
    } as GraphData;
  }

  protected reLayoutMethod(layoutMethod, layoutCfg): Promise<void> {
    return new Promise((reslove, reject) => {
      const { graph } = this;
      const layoutType = layoutCfg?.type;

      // 每个布局方法都需要注册
      layoutCfg.onLayoutEnd = () => {
        graph.emit('aftersublayout', { type: layoutType });
        reslove();
      };

      layoutMethod.init(this.data);
      if (layoutType === 'force') {
        layoutMethod.ticking = false;
        layoutMethod.forceSimulation.stop();
      }

      graph.emit('beforesublayout', { type: layoutType });
      layoutMethod.execute();
      if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
    });
  }

  // 重新布局
  public relayout(reloadData?: boolean) {
    const { graph, layoutMethods, layoutCfg } = this;

    if (reloadData) {
      this.data = this.setDataFromGraph();
      const { nodes } = this.data;
      if (!nodes) {
        return false;
      }
      this.initPositions(layoutCfg.center, nodes);
    }

    graph.emit('beforelayout');

    let start = Promise.resolve();
    layoutMethods?.forEach((layoutMethod: any, index: number) => {
      const currentCfg = layoutCfg[index];
      start = start.then(() => this.reLayoutMethod(layoutMethod, currentCfg));
    });

    start
      .then(() => {
        if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
      })
      .catch((error) => {
        console.warn('relayout failed', error);
      });
  }

  // 筛选参与布局的nodes和edges
  protected filterLayoutData(data, cfg) {
    const { nodes, edges, ...rest } = data;
    if (!nodes) {
      return data;
    }

    let nodesFilter;
    let edegsFilter;
    if (isFunction(cfg?.nodesFilter)) {
      nodesFilter = cfg.nodesFilter;
    } else {
      nodesFilter = () => true;
    }

    const fNodes = nodes.filter(nodesFilter);

    if (isFunction(cfg?.edgesFilter)) {
      edegsFilter = cfg.edgesFilter;
    } else {
      const nodesMap = fNodes.reduce((acc, cur) => {
        acc[cur.id] = true;
        return acc;
      }, {});
      edegsFilter = (edge) => {
        return nodesMap[edge.source] && nodesMap[edge.target];
      };
    }

    return {
      nodes: fNodes,
      edges: edges.filter(edegsFilter),
      ...rest,
    };
  }

  protected getLayoutBBox(nodes) {
    const { graph } = this;
    const graphGroupNodes = groupBy(graph.getNodes(), (n: any) => {
      return n.getModel().layoutOrder;
    });
    const layoutNodes = Object.values(graphGroupNodes).map((value) => {
      const bbox: any = calculationItemsBBox(value as any);
      bbox.size = [bbox.width, bbox.height];
      return bbox;
    });

    const groupNodes = Object.values(groupBy(nodes, 'layoutOrder'));
    return {
      groupNodes,
      layoutNodes,
    };
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
    const nodeLength = nodes ? nodes.length : 0;
    if (!nodeLength) return;

    const width = graph.get('width') * 0.85;
    const height = graph.get('height') * 0.85;
    const horiNum = Math.ceil(Math.sqrt(nodeLength) * (width / height));
    const vertiNum = Math.ceil(nodeLength / horiNum);
    let horiGap = width / (horiNum - 1);
    let vertiGap = height / (vertiNum - 1);
    if (!isFinite(horiGap) || !horiGap) horiGap = 0;
    if (!isFinite(vertiGap) || !horiGap) vertiGap = 0;
    const beginX = center[0] - width / 2;
    const beginY = center[1] - height / 2;

    let allHavePos = true;
    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
      if (isNaN(+node.x)) {
        allHavePos = false;
        node.x = (i % horiNum) * horiGap + beginX;
      }
      if (isNaN(+node.y)) {
        allHavePos = false;
        node.y = Math.floor(i / horiNum) * vertiGap + beginY;
      }
    }

    return allHavePos;
  }

  public destroy() {
    this.graph = null;
    this.destoryLayoutMethods();

    this.destroyed = true;
  }
}
