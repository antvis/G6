import { AbstractLayout, Util } from '@antv/g6-core';
import { Layout } from '../../layout';
import { LayoutWorker } from '../../layout/worker/layout';
import { LAYOUT_MESSAGE } from '../../layout/worker/layoutConst';
import { gpuDetector } from '../../util/gpu';
import { mix, clone } from '@antv/util';

import { IGraph } from '../../interface/graph';

// eslint-disable-next-line @typescript-eslint/no-implied-eval
const mockRaf = (cb: TimerHandler) => setTimeout(cb, 16);
const mockCaf = (reqId: number) => clearTimeout(reqId);

const helper = {
  // pollyfill
  requestAnimationFrame(callback: FrameRequestCallback) {
    const fn =
      typeof window !== 'undefined'
        ? window.requestAnimationFrame || (window as any).webkitRequestAnimationFrame || mockRaf
        : mockRaf;
    return fn(callback);
  },
  cancelAnimationFrame(requestId: number) {
    const fn =
      typeof window !== 'undefined'
        ? window.cancelAnimationFrame || (window as any).webkitCancelAnimationFrame || mockCaf
        : mockCaf;
    return fn(requestId);
  },
};

const GPU_LAYOUT_NAMES = ['fruchterman', 'gForce'];
const LAYOUT_PIPES_ADJUST_NAMES = ['force', 'grid', 'circular'];
export default class LayoutController extends AbstractLayout {
  public graph: IGraph;

  public destroyed: boolean;

  private worker;

  private workerData;

  // private data;

  private isGPU: boolean;

  // the configurations of the layout
  // private layoutCfg: any; // LayoutOptions

  // the type name of the layout
  // private layoutType: string;

  // private data: GraphData;

  // private layoutMethods: typeof Layout;

  constructor(graph: IGraph) {
    super(graph);
    this.graph = graph;
    this.layoutCfg = graph.get('layout') || {};
    this.layoutType = this.getLayoutType();
    this.worker = null;
    this.workerData = {};
    this.initLayout();
  }

  // eslint-disable-next-line class-methods-use-this
  protected initLayout() {
    // no data before rendering
  }

  // get layout worker and create one if not exists
  private getWorker() {
    if (this.worker) {
      return this.worker;
    }

    if (typeof Worker === 'undefined') {
      // 如果当前浏览器不支持 web worker，则不使用 web worker
      console.warn('Web worker is not supported in current browser.');
      this.worker = null;
    } else {
      this.worker = LayoutWorker(this.layoutCfg.workerScriptURL);
    }
    return this.worker;
  }

  // stop layout worker
  private stopWorker() {
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

  protected execLayoutMethod(layoutCfg, order): Promise<void> {
    return new Promise(async (reslove, reject) => {
      const { graph } = this;
      if (!graph || graph.get('destroyed')) return;
      let layoutType = layoutCfg.type;

      // 每个布局方法都需要注册
      layoutCfg.onLayoutEnd = () => {
        graph.emit('aftersublayout', { type: layoutType });
        reslove();
      };

      // 若用户指定开启 gpu，且当前浏览器支持 webgl，且该算法存在 GPU 版本（目前仅支持 fruchterman 和 gForce），使用 gpu 版本的布局
      if (layoutType && this.isGPU) {
        if (!hasGPUVersion(layoutType)) {
          console.warn(
            `The '${layoutType}' layout does not support GPU calculation for now, it will run in CPU.`,
          );
        } else {
          layoutType = `${layoutType}-gpu`;
        }
      }

      if (Util.isForce(layoutType)) {
        const { onTick, animate } = layoutCfg;
        const isDefaultAnimateLayout = animate === undefined && (layoutType === 'force' || layoutType === 'force2');
        const tick = () => {
          if (onTick) {
            onTick();
          }
          if (animate || isDefaultAnimateLayout) graph.refreshPositions();
        };
        layoutCfg.tick = tick;
      } else if (layoutType === 'comboForce' || layoutType === 'comboCombined') {
        layoutCfg.comboTrees = graph.get('comboTrees');
      }

      let enableTick = false;
      let layoutMethod;

      try {
        layoutMethod = new Layout[layoutType](layoutCfg);
        if (this.layoutMethods[order]) {
          this.layoutMethods[order].destroy();
        }
        this.layoutMethods[order] = layoutMethod;
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
      await layoutMethod.execute();
      if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
    });
  }

  private updateLayoutMethod(layoutMethod, layoutCfg): Promise<void> {
    return new Promise(async (reslove, reject) => {
      const { graph } = this;
      const layoutType = layoutCfg?.type;

      // 每个布局方法都需要注册
      layoutCfg.onLayoutEnd = () => {
        graph.emit('aftersublayout', { type: layoutType });
        reslove();
      };

      if (Util.isForce(layoutType)) {
        const { onTick, animate } = layoutCfg;
        const isDefaultAnimateLayout = animate === undefined && (layoutType === 'force' || layoutType === 'force2');
        const tick = () => {
          onTick?.();
          if (animate || isDefaultAnimateLayout) graph.refreshPositions();
        };
        layoutCfg.tick = tick;
      }

      const layoutData = this.filterLayoutData(this.data, layoutCfg);
      layoutMethod.init(layoutData);
      layoutMethod.updateCfg(layoutCfg);
      graph.emit('beforesublayout', { type: layoutType });
      await layoutMethod.execute();
      if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
    });
  }
  /**
   * @param {function} success callback
   * @return {boolean} 是否使用web worker布局
   */
  public layout(success?: () => void): boolean {
    const { graph } = this;
    if (!graph || graph.get('destroyed')) return;

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
    let layoutType = layoutCfg.type;

    let prevHasNodes = false;
    this.layoutMethods?.forEach(method => prevHasNodes = !!method.nodes?.length || prevHasNodes);

    const preLayoutTypes = this.destoryLayoutMethods();

    graph.emit('beforelayout');
    let start = Promise.resolve();

    // 增量情况下（上一次的布局与当前布局一致），上一次有节点，使用 treakInit
    if (prevHasNodes && layoutType && preLayoutTypes?.length === 1 && preLayoutTypes[0] === layoutType) {
      this.tweakInit();
    } else {
      // 初始化位置，若配置了 preset，则使用 preset 的参数生成布局作为预布局，否则使用 grid
      start = this.initPositions(layoutCfg.center, nodes);
    }
    // init hidden nodes
    const initHiddenPromise = this.initPositions(layoutCfg.center, hiddenNodes);
    initHiddenPromise.then();

    // 若用户指定开启 gpu，且当前浏览器支持 webgl，且该算法存在 GPU 版本（目前仅支持 fruchterman 和 gForce），使用 gpu 版本的布局
    this.isGPU = getGPUEnabled(layoutCfg, layoutType);

    // 在 onAllLayoutEnd 中执行用户自定义 onLayoutEnd，触发 afterlayout、更新节点位置、fitView/fitCenter、触发 afterrender
    const { onLayoutEnd, layoutEndFormatted, adjust } = layoutCfg;

    if (!layoutEndFormatted) {
      layoutCfg.layoutEndFormatted = true;

      layoutCfg.onAllLayoutEnd = async () => {
        // 执行用户自定义 onLayoutEnd
        if (onLayoutEnd) {
          onLayoutEnd(nodes);
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

    this.stopWorker();
    if (layoutCfg.workerEnabled && this.layoutWithWorker(this.data, success)) {
      // 如果启用布局web worker并且浏览器支持web worker，用web worker布局。否则回退到不用web worker布局。
      return true;
    }

    let hasLayout = false;
    if (layoutCfg.type) {
      hasLayout = true;
      start = start.then(async () => await this.execLayoutMethod(layoutCfg, 0));
    } else if (layoutCfg.pipes) {
      hasLayout = true;
      layoutCfg.pipes.forEach((cfg, index) => {
        start = start.then(async () => await this.execLayoutMethod(cfg, index));
      });
    }

    if (hasLayout) {
      // 最后统一在外部调用onAllLayoutEnd
      start.then(() => {
        if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
        // 在执行 execute 后立即执行 success，且在 timeBar 中有 throttle，可以防止 timeBar 监听 afterrender 进行 changeData 后 layout，从而死循环
        // 对于 force 一类布局完成后的 fitView 需要用户自己在 onLayoutEnd 中配置
        if (success) success();
      }).catch((error) => {
        console.warn('graph layout failed,', error);
      });
    } else {
      // 无布局配置
      graph.refreshPositions();
      success?.();
    }

    return false;
  }

  /**
   * 增量数据初始化位置
   */
  public tweakInit() {
    const { data, graph } = this;
    const { nodes, edges } = data;
    if (!nodes?.length) return;
    const positionMap = {};
    nodes.forEach(node => {
      const { x, y } = node;
      if (!isNaN(x) && !isNaN(y)) {
        positionMap[node.id] = { x, y };
        // 有位置信息，则是原有节点，增加 mass
        node.mass = node.mass || 2;
      }
    });
    edges.forEach(edge => {
      const { source, target } = edge;
      const sourcePosition = positionMap[source];
      const targetPosition = positionMap[target];
      if (!sourcePosition && targetPosition) {
        positionMap[source] = {
          x: targetPosition.x + (Math.random() - 0.5) * 80,
          y: targetPosition.y + (Math.random() - 0.5) * 80
        };
      } else if (!targetPosition && sourcePosition) {
        positionMap[target] = {
          x: sourcePosition.x + (Math.random() - 0.5) * 80,
          y: sourcePosition.y + (Math.random() - 0.5) * 80
        };
      }
    });
    const width = graph.get('width');
    const height = graph.get('height');
    nodes.forEach(node => {
      const position = positionMap[node.id] || { x: width / 2 + (Math.random() - 0.5) * 20, y: height / 2 + (Math.random() - 0.5) * 20 };
      node.x = position.x;
      node.y = position.y;
    });
  }

  public initWithPreset(hasPresetCallback, noPresetCallback): Promise<void> {
    return new Promise(async (resolve, reject)  => {
      const { layoutCfg, data } = this;
      const { preset } = layoutCfg;
      if (!preset?.type || !Layout[preset?.type]) {
        noPresetCallback?.();
        resolve();
        return false;
      }
      const isGPU = getGPUEnabled(preset, preset.type);
      const layoutType = isGPU ? `${preset.type}-gpu` : preset.type;
      const presetLayout = new Layout[layoutType](preset);
      delete layoutCfg.preset;
      presetLayout.init(data);
      await presetLayout.execute();
      hasPresetCallback?.();
      resolve();
      return true;
    });
  }

  /**
   * layout with web worker
   * @param {object} data graph data
   * @return {boolean} 是否支持web worker
   */
  private layoutWithWorker(data, success): boolean {
    const { layoutCfg, graph } = this;
    const worker = this.getWorker();
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

    let start = Promise.resolve();
    let hasLayout = false;
    if (layoutCfg.type) {
      hasLayout = true;
      start = start.then(() => this.runWebworker(worker, data, layoutCfg));
    } else if (layoutCfg.pipes) {
      hasLayout = true;
      for (const cfg of layoutCfg.pipes) {
        start = start.then(() => this.runWebworker(worker, data, cfg));
      }
    }

    if (hasLayout) {
      // 最后统一在外部调用onAllLayoutEnd
      start.then(() => {
        if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
        success?.()
      }).catch((error) => {
        console.error('layout failed', error);
      });
    }

    return true;
  }

  private runWebworker(worker, allData, layoutCfg): Promise<void> {
    const { isGPU } = this;
    const data = this.filterLayoutData(allData, layoutCfg);
    const { nodes, edges } = data;

    const offScreenCanvas = document.createElement('canvas');
    const gpuWorkerAbility =
      isGPU &&
      typeof window !== 'undefined' &&
      // eslint-disable-next-line @typescript-eslint/dot-notation
      window.navigator &&
      !navigator[`gpu`] && // WebGPU 还不支持 OffscreenCanvas
      'OffscreenCanvas' in window &&
      'transferControlToOffscreen' in offScreenCanvas;

    // NOTE: postMessage的message参数里面不能包含函数，否则postMessage会报错，
    // 例如：'function could not be cloned'。
    // 详情参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
    // 所以这里需要把过滤layoutCfg里的函数字段过滤掉。
    const filteredLayoutCfg = filterObject(layoutCfg, value => typeof value !== 'function');
    if (!gpuWorkerAbility) {
      worker.postMessage({
        type: LAYOUT_MESSAGE.RUN,
        nodes,
        edges,
        layoutCfg: filteredLayoutCfg,
      });
    } else {
      const offscreen: any = (offScreenCanvas as any).transferControlToOffscreen();
      // filteredLayoutCfg.canvas = offscreen;
      filteredLayoutCfg.type = `${filteredLayoutCfg.type}-gpu`;
      worker.postMessage(
        {
          type: LAYOUT_MESSAGE.GPURUN,
          nodes,
          edges,
          layoutCfg: filteredLayoutCfg,
          canvas: offscreen,
        },
        [offscreen],
      );
    }

    return new Promise((reslove, reject) => {
      worker.onmessage = (event) => {
        this.handleWorkerMessage(reslove, reject, event, data, layoutCfg);
      };
    });
  }

  // success callback will be called when updating graph positions for the first time.
  private handleWorkerMessage(reslove, reject, event, data, layoutCfg) {
    const { graph, workerData } = this;
    const eventData = event.data;
    const { type } = eventData;
    const onTick = () => {
      if (layoutCfg.onTick) {
        layoutCfg.onTick();
      }
    };

    switch (type) {
      case LAYOUT_MESSAGE.TICK:
        workerData.currentTick = eventData.currentTick;
        workerData.currentTickData = eventData;
        if (!workerData.requestId) {
          workerData.requestId = helper.requestAnimationFrame(function requestId() {
            updateLayoutPosition(data, eventData);
            graph.refreshPositions();
            onTick();

            if (eventData.currentTick === eventData.totalTicks) {
              // 如果是最后一次tick
              reslove();
            } else if (workerData.currentTick === eventData.totalTicks) {
              // 注意这里workerData.currentTick可能已经不再是前面赋值时候的值了，
              // 因为在requestAnimationFrame等待时间里，可能产生新的tick。
              // 如果当前tick不是最后一次tick，并且所有的tick消息都已发出来了，那么需要用最后一次tick的数据再刷新一次。
              workerData.requestId2 = helper.requestAnimationFrame(function requestId2() {
                updateLayoutPosition(data, workerData.currentTickData);
                graph.refreshPositions();
                workerData.requestId2 = null;
                onTick();
                reslove();
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
          reslove();
        }
        break;
      case LAYOUT_MESSAGE.GPUEND:
        // 如果没有tick消息（非力导布局）
        if (workerData.currentTick == null) {
          updateGPUWorkerLayoutPosition(data, eventData);
          reslove();
        }
        break;
      case LAYOUT_MESSAGE.ERROR:
        console.warn('Web-Worker layout error!', eventData.message);
        reject();
        break;
      default:
        reject();
        break;
    }
  }

  // 更新布局参数
  public updateLayoutCfg(cfg) {
    const { graph, layoutMethods } = this;
    if (!graph || graph.get('destroyed')) return;
    // disableTriggerLayout 不触发重新布局，仅更新参数
    const { disableTriggerLayout, ...otherCfg } = cfg;
    const layoutCfg = mix({}, this.layoutCfg, otherCfg);
    this.layoutCfg = layoutCfg;

    // disableTriggerLayout 不触发重新布局，仅更新参数
    if (disableTriggerLayout) {
      return;
    }

    if (!layoutMethods?.length) {
      this.layout();
      return;
    }
    this.data = this.setDataFromGraph();

    this.stopWorker();
    if (otherCfg.workerEnabled && this.layoutWithWorker(this.data, null)) {
      // 如果启用布局web worker并且浏览器支持web worker，用web worker布局。否则回退到不用web worker布局。
      return;
    }

    graph.emit('beforelayout');

    let start = Promise.resolve();
    let hasLayout = false;
    if (layoutMethods?.length === 1) {
      hasLayout = true;
      start = start.then(async () => await this.updateLayoutMethod(layoutMethods[0], layoutCfg));
    } else if (layoutMethods?.length) {
      hasLayout = true;
      layoutMethods.forEach((layoutMethod, index) => {
        const currentCfg = layoutCfg.pipes[index];
        start = start.then(async () => await this.updateLayoutMethod(layoutMethod, currentCfg));
      });
    }

    if (hasLayout) {
      start.then(() => {
        if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
      }).catch((error) => {
        console.warn('layout failed', error);
      });
    }
  }

  protected adjustPipesBox(data, adjust: string): Promise<void> {
    return new Promise((resolve) => {
      const { nodes } = data;
      if (!nodes?.length) {
        resolve();
      }

      if (!LAYOUT_PIPES_ADJUST_NAMES.includes(adjust)) {
        console.warn(`The adjust type ${adjust} is not supported yet, please assign it with 'force', 'grid', or 'circular'.`);
        resolve();
      }

      const layoutCfg = {
        center: this.layoutCfg.center,
        nodeSize: (d) => Math.max(d.height, d.width),
        preventOverlap: true,
        onLayoutEnd: () => { },
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

      const layoutMethod = new Layout[adjust](layoutCfg);
      layoutMethod.layout({ nodes: layoutNodes });
    });
  }

  public destroy() {
    this.destoryLayoutMethods();
    const { worker } = this;
    if (worker) {
      worker.terminate();
      this.worker = null;
    }
    this.destroyed = true;

    this.graph.set('layout', undefined);
    this.layoutCfg = undefined;
    this.layoutType = undefined;
    this.layoutMethods = undefined;
    this.graph = null;
  }
}

function updateLayoutPosition(data, layoutData) {
  const { nodes } = data;
  const { nodes: layoutNodes } = layoutData;
  const nodeLength = nodes.length;
  for (let i = 0; i < nodeLength; i++) {
    const node = nodes[i];
    node.x = layoutNodes[i].x;
    node.y = layoutNodes[i].y;
  }
}

function filterObject(collection, callback) {
  const result = {};
  if (collection && typeof collection === 'object') {
    Object.keys(collection).forEach(key => {
      if (collection.hasOwnProperty(key) && callback(collection[key])) {
        result[key] = collection[key];
      }
    });

    return result;
  }
  return collection;
}

function updateGPUWorkerLayoutPosition(data, layoutData) {
  const { nodes } = data;
  const { vertexEdgeData } = layoutData;
  const nodeLength = nodes.length;
  for (let i = 0; i < nodeLength; i++) {
    const node = nodes[i];
    const x = vertexEdgeData[4 * i];
    const y = vertexEdgeData[4 * i + 1];
    node.x = x;
    node.y = y;
  }
}

function addLayoutOrder(data, order) {
  if (!data?.nodes?.length) {
    return;
  }
  const { nodes } = data;
  nodes.forEach(node => {
    node.layoutOrder = order;
  });
}

function hasGPUVersion(layoutName: string): boolean {
  return GPU_LAYOUT_NAMES.includes(layoutName);
}

function getGPUEnabled(layoutCfg, layoutType) {
  let type = layoutType;
  // 防止用户直接用 -gpu 结尾指定布局
  if (layoutType && layoutType.split('-')[1] === 'gpu') {
    type = layoutType.split('-')[0];
    layoutCfg.gpuEnabled = true;
  }
  let enableGPU = false;
  if (layoutCfg.gpuEnabled) {
    enableGPU = true;
    // 打开下面语句将会导致 webworker 报找不到 window
    if (!gpuDetector().webgl) {
      console.warn(`Your browser does not support webGL or GPGPU. The layout will run in CPU.`);
      enableGPU = false;
    }
  }
  // the layout does not support GPU, will run in CPU
  if (enableGPU && !hasGPUVersion(type)) {
    console.warn(
      `The '${type}' layout does not support GPU calculation for now, it will run in CPU.`,
    );
    enableGPU = false;
  }
  return enableGPU;
}