import { AbstractLayout, GraphData } from '@antv/g6-core';
import { Layout } from '../../layout';
import { mix, clone } from '@antv/util';

import { IGraph } from '../../interface/graph';

const LayoutPipesAdjustNames = ['force', 'grid', 'circular'];
export default class LayoutController extends AbstractLayout {
  public graph: IGraph;

  public destroyed: boolean;

  constructor(graph: IGraph) {
    super(graph);
    this.graph = graph;
    this.layoutCfg = graph.get('layout') || {};
    this.layoutType = this.getLayoutType();
  }

  // 更新布局参数
  public updateLayoutCfg(cfg) {
    const { graph, layoutMethods } = this;
    const layoutCfg = mix({}, this.layoutCfg, cfg);
    this.layoutCfg = layoutCfg;

    if (!layoutMethods?.length) {
      this.layout();
      return;
    }
    this.data = this.setDataFromGraph();

    graph.emit('beforelayout');

    let start = Promise.resolve();
    if (layoutMethods.length === 1) {
      start = start.then(() => this.updateLayoutMethod(layoutMethods[0], layoutCfg));
    } else {
      layoutMethods?.forEach((layoutMethod, index) => {
        const currentCfg = layoutCfg.pipes[index];
        start = start.then(() => this.updateLayoutMethod(layoutMethod, currentCfg));
      });
    }

    start
      .then(() => {
        if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
      })
      .catch((error) => {
        console.warn('layout failed', error);
      });
  }

  /**
   * @param {function} success callback
   * @return {boolean} 是否使用web worker布局
   */
  public layout(success?: () => void): boolean {
    const { graph } = this;

    this.data = this.setDataFromGraph();
    const { nodes, hiddenNodes } = this.data;

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

    this.destoryLayoutMethods();

    graph.emit('beforelayout');
    this.initPositions(layoutCfg.center, nodes);
    // init hidden ndoes
    this.initPositions(layoutCfg.center, hiddenNodes);

    // 在 onAllLayoutEnd 中执行用户自定义 onLayoutEnd，触发 afterlayout、更新节点位置、fitView/fitCenter、触发 afterrender
    const { onLayoutEnd, layoutEndFormatted, adjust } = layoutCfg;

    if (!layoutEndFormatted) {
      layoutCfg.layoutEndFormatted = true;

      layoutCfg.onAllLayoutEnd = async () => {
        // 执行用户自定义 onLayoutEnd
        if (onLayoutEnd) {
          onLayoutEnd();
        }

        // 更新节点位置
        this.refreshLayout();

        // 最后再次调整
        if (adjust && layoutCfg.pipes) {
          await this.adjustPipesBox(this.data, adjust);
          this.refreshLayout();
        }

        // 触发 afterlayout
        graph.emit('afterlayout');
      };
    }

    let start = Promise.resolve();
    if (layoutCfg.type) {
      start = start.then(() => this.execLayoutMethod(layoutCfg, 0));
    } else if (layoutCfg.pipes) {
      layoutCfg.pipes.forEach((cfg, index) => {
        start = start.then(() => this.execLayoutMethod(cfg, index));
      });
    }

    // 最后统一在外部调用onAllLayoutEnd
    start
      .then(() => {
        if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
        // 在执行 execute 后立即执行 success，且在 timeBar 中有 throttle，可以防止 timeBar 监听 afterrender 进行 changeData 后 layout，从而死循环
        // 对于 force 一类布局完成后的 fitView 需要用户自己在 onLayoutEnd 中配置
        if (success) success();
      })
      .catch((error) => {
        console.warn('graph layout failed,', error);
      });

    return false;
  }

  private execLayoutMethod(layoutCfg, order): Promise<void> {
    return new Promise((reslove, reject) => {
      const { graph } = this;
      let layoutType = layoutCfg.type;

      // 每个布局方法都需要注册
      layoutCfg.onLayoutEnd = () => {
        graph.emit('aftersublayout', { type: layoutType });
        reslove();
      };

      const isForce = layoutType === 'force' || layoutType === 'g6force' || layoutType === 'gForce';
      if (isForce) {
        const { onTick } = layoutCfg;
        const tick = () => {
          if (onTick) {
            onTick();
          }
          graph.refreshPositions();
        };
        layoutCfg.tick = tick;
      } else if (layoutCfg.type === 'comboForce') {
        layoutCfg.comboTrees = graph.get('comboTrees');
      }

      let enableTick = false;
      let layoutMethod;

      try {
        layoutMethod = new Layout(layoutCfg);
      } catch (e) {
        console.warn(`The layout method: '${layoutType}' does not exist! Please specify it first.`);
        reject();
      }

      // 是否需要迭代的方式完成布局。这里是来自布局对象的实例属性，是由布局的定义者在布局类定义的。
      enableTick = layoutMethod.enableTick;
      if (enableTick) {
        const { onTick } = layoutCfg;
        const tick = () => {
          if (onTick) {
            onTick();
          }
          graph.refreshPositions();
        };
        layoutMethod.tick = tick;
      }
      const layoutData = this.filterLayoutData(this.data, layoutCfg);
      addLayoutOrder(layoutData, order);
      layoutMethod.init(layoutData);
      // 若存在节点没有位置信息，且没有设置 layout，在 initPositions 中 random 给出了所有节点的位置，不需要再次执行 random 布局
      // 所有节点都有位置信息，且指定了 layout，则执行布局（代表不是第一次进行布局）
      graph.emit('beforesublayout', { type: layoutType });
      layoutMethod.execute();
      if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
      this.layoutMethods.push(layoutMethod);
    });
  }

  private updateLayoutMethod(layoutMethod, layoutCfg): Promise<void> {
    return new Promise((reslove, reject) => {
      const { graph } = this;
      const layoutType = layoutCfg?.type;

      // 每个布局方法都需要注册
      layoutCfg.onLayoutEnd = () => {
        graph.emit('aftersublayout', { type: layoutType });
        reslove();
      };

      const layoutData = this.filterLayoutData(this.data, layoutCfg);
      layoutMethod.init(layoutData);
      layoutMethod.updateCfg(layoutCfg);
      graph.emit('beforesublayout', { type: layoutType });
      layoutMethod.execute();
      if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
    });
  }

  protected adjustPipesBox(data, adjust: string): Promise<void> {
    return new Promise((resolve) => {
      const { nodes } = data;
      if (!nodes?.length) {
        resolve();
      }

      if (!LayoutPipesAdjustNames.includes(adjust)) {
        console.warn(
          `The adjust type ${adjust} is not supported yet, please assign it with 'force', 'grid', or 'circular'.`,
        );
        resolve();
      }

      const layoutCfg = {
        center: this.layoutCfg.center,
        nodeSize: (d) => Math.max(d.height, d.width),
        preventOverlap: true,
        onLayoutEnd: () => {},
      };

      // 计算出大单元
      const { groupNodes, layoutNodes } = this.getLayoutBBox(nodes);
      const preNodes = clone(layoutNodes);

      // 根据大单元坐标的变化，调整这里面每个小单元nodes
      layoutCfg.onLayoutEnd = () => {
        layoutNodes?.forEach((ele, index) => {
          const dx = ele.x - preNodes[index]?.x;
          const dy = ele.y - preNodes[index]?.y;
          groupNodes[index]?.forEach((n: any) => {
            n.x += dx;
            n.y += dy;
          });
        });
        resolve();
      };
      const layoutMethod = new Layout(layoutCfg);
      layoutMethod.layout({ nodes: layoutNodes });
    });
  }

  public destroy() {
    this.destoryLayoutMethods();
    this.destroyed = true;

    this.graph.set('layout', undefined);
    this.layoutCfg = undefined;
    this.layoutType = undefined;
    this.layoutMethods = undefined;
    this.graph = null;
  }
}

function addLayoutOrder(data, order) {
  if (!data?.nodes?.length) {
    return;
  }
  const { nodes } = data;
  nodes.forEach((node) => {
    node.layoutOrder = order;
  });
}
