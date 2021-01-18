import { AbstractLayout, GraphData } from '@antv/g6-core';
import { Layout } from '../../layout';
import { mix } from '@antv/util';

import { IGraph } from '../../interface/graph';

export default class LayoutController extends AbstractLayout {
  public graph: IGraph;

  public destroyed: boolean;

  constructor(graph: IGraph) {
    super(graph);
    this.graph = graph;
    this.layoutCfg = graph.get('layout') || {};
    this.layoutType = this.layoutCfg.type;
  }

  // 更新布局参数
  public updateLayoutCfg(cfg) {
    const { graph, layoutMethod, layoutType, layoutCfg } = this;

    this.layoutType = cfg.type;
    if (!layoutMethod || layoutMethod.destroyed) {
      this.layoutCfg = mix({}, layoutCfg, cfg);
      this.layout();
      return;
    }
    this.data = this.setDataFromGraph();

    layoutMethod.init(this.data);
    layoutMethod.updateCfg(cfg);
    graph.emit('beforelayout');
    layoutMethod.execute();
    if (this.layoutType !== 'force' && !layoutMethod.enableTick) {
      graph.emit('afterlayout');
    }
    this.refreshLayout();
  }

  /**
   * @param {function} success callback
   * @return {boolean} 是否使用web worker布局
   */
  public layout(success?: () => void): boolean {
    const { graph } = this;

    this.data = this.setDataFromGraph();
    const { nodes } = this.data;

    if (!nodes) {
      return false;
    }
    const width = graph.get('width');
    const height = graph.get('height');
    const layoutCfg: any = {};
    Object.assign(
      layoutCfg,
      {
        width,
        height,
        center: [width / 2, height / 2],
      },
      this.layoutCfg,
    );
    this.layoutCfg = layoutCfg;

    const hasLayoutType = !!this.layoutType;

    let { layoutMethod } = this;
    if (layoutMethod) {
      layoutMethod.destroy();
    }

    graph.emit('beforelayout');
    const allHavePos = this.initPositions(layoutCfg.center, nodes);

    let layoutType = this.layoutType;

    if (layoutType === 'force' || layoutType === 'g6force' || layoutType === 'gForce') {
      const { onTick } = layoutCfg;
      const tick = () => {
        if (onTick) {
          onTick();
        }
        graph.refreshPositions();
      };
      layoutCfg.tick = tick;
      const { onLayoutEnd } = layoutCfg;
      layoutCfg.onLayoutEnd = () => {
        if (onLayoutEnd) {
          onLayoutEnd();
        }
        graph.emit('afterlayout');
      };
    } else if (this.layoutType === 'comboForce') {
      layoutCfg.comboTrees = graph.get('comboTrees');
    }

    let enableTick = false;
    if (layoutType !== undefined) {
      try {
        layoutMethod = new Layout[layoutType](layoutCfg);
      } catch (e) {
        console.warn(`The layout method: '${layoutType}' does not exist! Please specify it first.`);
        return false;
      }

      // 是否需要迭代的方式完成布局。这里是来自布局对象的实例属性，是由布局的定义者在布局类定义的。
      enableTick = layoutMethod.enableTick;
      if (enableTick) {
        const { onTick, onLayoutEnd } = layoutCfg;
        const tick = () => {
          if (onTick) {
            onTick();
          }
          graph.refreshPositions();
        };
        layoutMethod.tick = tick;
        const onLayoutEndNew = () => {
          if (onLayoutEnd) {
            onLayoutEnd();
          }
          graph.emit('afterlayout');
        };
        layoutMethod.onLayoutEnd = onLayoutEndNew;
      }
      layoutMethod.init(this.data);
      // 若存在节点没有位置信息，且没有设置 layout，在 initPositions 中 random 给出了所有节点的位置，不需要再次执行 random 布局
      // 所有节点都有位置信息，且指定了 layout，则执行布局（代表不是第一次进行布局）
      if (hasLayoutType) {
        graph.emit('beginlayout');
        layoutMethod.execute();
      }
      this.layoutMethod = layoutMethod;
    }
    if (
      (hasLayoutType || !allHavePos) &&
      this.layoutType !== 'force' &&
      this.layoutType !== 'gForce' &&
      !enableTick
    ) {
      graph.emit('afterlayout');
      this.refreshLayout();
    }
    return false;
  }

  public destroy() {
    const { layoutMethod } = this;
    if (layoutMethod) {
      layoutMethod.destroy();
      layoutMethod.destroyed = true;
    }
    this.destroyed = true;

    this.graph.set('layout', undefined);
    this.layoutCfg = undefined;
    this.layoutType = undefined;
    this.layoutMethod = undefined;
    this.graph = null;
  }
}
