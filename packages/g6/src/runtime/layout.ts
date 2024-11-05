import type { IAnimation } from '@antv/g';
import { Graph as Graphlib } from '@antv/graphlib';
import { Supervisor, isLayoutWithIterations } from '@antv/layout';
import { deepMix } from '@antv/util';
import { GraphEvent, TREE_KEY } from '../constants';
import { BaseLayout } from '../layouts';
import type { AntVLayout } from '../layouts/types';
import { getExtension } from '../registry/get';
import type { GraphData, NodeData } from '../spec';
import type { STDLayoutOptions } from '../spec/layout';
import type { AdaptiveLayout, Combo, ID, Node, TreeData } from '../types';
import { getAnimationOptions } from '../utils/animation';
import { isToBeDestroyed } from '../utils/element';
import { GraphLifeCycleEvent, emit } from '../utils/event';
import { createTreeStructure } from '../utils/graphlib';
import { idOf } from '../utils/id';
import { isTreeLayout, layoutAdapter, layoutMapping2GraphData } from '../utils/layout';
import { print } from '../utils/print';
import { dfs } from '../utils/traverse';
import type { RuntimeContext } from './types';

export class LayoutController {
  private context: RuntimeContext;

  private supervisor?: Supervisor;

  private instance?: BaseLayout;

  private instances: BaseLayout[] = [];

  private animationResult?: IAnimation | null;

  private get presetOptions() {
    return {
      animation: !!getAnimationOptions(this.context.options, true),
    };
  }

  private get options() {
    const { options } = this.context;
    return options.layout;
  }

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  public getLayoutInstance(): BaseLayout[] {
    return this.instances;
  }

  public async layout() {
    if (!this.options) return;
    const pipeline = Array.isArray(this.options) ? this.options : [this.options];
    const { graph } = this.context;
    emit(graph, new GraphLifeCycleEvent(GraphEvent.BEFORE_LAYOUT));
    for (const options of pipeline) {
      const index = pipeline.indexOf(options);
      const data = this.getLayoutData(options);
      const opts = { ...this.presetOptions, ...options };

      emit(graph, new GraphLifeCycleEvent(GraphEvent.BEFORE_STAGE_LAYOUT, { options: opts, index }));
      const result = await this.stepLayout(data, opts, index);
      emit(graph, new GraphLifeCycleEvent(GraphEvent.AFTER_STAGE_LAYOUT, { options: opts, index }));

      if (!options.animation) {
        this.updateElementPosition(result, false);
      }
    }
    emit(graph, new GraphLifeCycleEvent(GraphEvent.AFTER_LAYOUT));
    this.transformDataAfterLayout();
  }

  private transformDataAfterLayout() {
    const transforms = this.context.transform.getTransformInstance();

    Object.values(transforms).forEach((transform) => transform.afterLayout());
  }

  /**
   * <zh/> 模拟布局
   *
   * <en/> Simulate layout
   * @returns <zh/> 模拟布局结果 | <en/> Simulated layout result
   */
  public async simulate(): Promise<GraphData> {
    if (!this.options) return {};
    const pipeline = Array.isArray(this.options) ? this.options : [this.options];

    let simulation: GraphData = {};

    for (const options of pipeline) {
      const index = pipeline.indexOf(options);

      const data = this.getLayoutData(options);
      const result = await this.stepLayout(data, { ...this.presetOptions, ...options, animation: false }, index);

      simulation = result;
    }

    return simulation;
  }

  public async stepLayout(data: GraphData, options: STDLayoutOptions, index: number): Promise<GraphData> {
    if (isTreeLayout(options)) return await this.treeLayout(data, options, index);
    return await this.graphLayout(data, options, index);
  }

  private async graphLayout(data: GraphData, options: STDLayoutOptions, index: number): Promise<GraphData> {
    const { animation, enableWorker, iterations = 300 } = options;

    const layout = this.initGraphLayout(options);
    if (!layout) return {};

    this.instances[index] = layout;
    this.instance = layout;

    // 使用 web worker 执行布局 / Use web worker to execute layout
    if (enableWorker) {
      const rawLayout = layout as unknown as AdaptiveLayout;
      this.supervisor = new Supervisor(rawLayout.graphData2LayoutModel(data), rawLayout.instance, { iterations });
      return layoutMapping2GraphData(await this.supervisor.execute());
    }

    if (isLayoutWithIterations(layout)) {
      // 有动画，基于布局迭代 tick 更新位置 / Update position based on layout iteration tick
      if (animation) {
        return await layout.execute(data, {
          onTick: (tickData: GraphData) => {
            this.updateElementPosition(tickData, false);
          },
        });
      }

      // 无动画，直接返回终态位置 / No animation, return final position directly
      layout.execute(data);
      layout.stop();
      return layout.tick(iterations);
    }

    // 无迭代的布局，直接返回终态位置 / Layout without iteration, return final position directly
    const layoutResult = await layout.execute(data);
    if (animation) {
      const animationResult = this.updateElementPosition(layoutResult, animation);
      await animationResult?.finished;
    }
    return layoutResult;
  }

  private async treeLayout(data: GraphData, options: STDLayoutOptions, index: number): Promise<GraphData> {
    const { type, animation } = options;
    // @ts-expect-error @antv/hierarchy 布局格式与 @antv/layout 不一致，其导出的是一个方法，而非 class
    // The layout format of @antv/hierarchy is inconsistent with @antv/layout, it exports a method instead of a class
    const layout = getExtension('layout', type) as (tree: TreeData, options: STDLayoutOptions) => TreeData;
    if (!layout) return {};

    const { nodes = [], edges = [] } = data;

    const model = new Graphlib({
      nodes: nodes.map((node) => ({ id: idOf(node), data: node.data || {} })),
      edges: edges.map((edge) => ({ id: idOf(edge), source: edge.source, target: edge.target, data: edge.data || {} })),
    });

    createTreeStructure(model);

    const layoutPreset: GraphData = { nodes: [], edges: [] };
    const layoutResult: GraphData = { nodes: [], edges: [] };

    const roots = model.getRoots(TREE_KEY) as unknown as TreeData[];
    roots.forEach((root) => {
      dfs(
        root,
        (node) => {
          node.children = model.getSuccessors(node.id) as TreeData[];
        },
        (node) => model.getSuccessors(node.id) as TreeData[],
        'TB',
      );

      const result = layout(root, options);
      const { x: rx, y: ry, z: rz = 0 } = result;
      // 将布局结果转化为 LayoutMapping 格式 / Convert the layout result to LayoutMapping format
      dfs(
        result,
        (node) => {
          const { id, x, y, z = 0 } = node;
          layoutPreset.nodes!.push({ id, style: { x: rx, y: ry, z: rz } });
          layoutResult.nodes!.push({ id, style: { x, y, z } });
        },
        (node) => node.children,
        'TB',
      );
    });

    const offset = this.inferTreeLayoutOffset(layoutResult);
    applyTreeLayoutOffset(layoutResult, offset);

    if (animation) {
      // 先将所有节点移动到根节点位置 / Move all nodes to the root node position first
      applyTreeLayoutOffset(layoutPreset, offset);
      this.updateElementPosition(layoutPreset, false);

      const animationResult = this.updateElementPosition(layoutResult, animation);
      await animationResult?.finished;
    }

    return layoutResult;
  }

  private inferTreeLayoutOffset(data: GraphData) {
    let [minX, maxX] = [Infinity, -Infinity];
    let [minY, maxY] = [Infinity, -Infinity];

    data.nodes?.forEach((node) => {
      const { x = 0, y = 0 } = node.style || {};
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });

    const { canvas } = this.context;
    const canvasSize = canvas.getSize();
    const [x1, y1] = canvas.getCanvasByViewport([0, 0]);
    const [x2, y2] = canvas.getCanvasByViewport(canvasSize);

    if (minX >= x1 && maxX <= x2 && minY >= y1 && maxY <= y2) return [0, 0] as [number, number];

    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;

    return [cx - (minX + maxX) / 2, cy - (minY + maxY) / 2] as [number, number];
  }

  public stopLayout() {
    if (this.instance && isLayoutWithIterations(this.instance)) {
      this.instance.stop();
      this.instance = undefined;
    }

    if (this.supervisor) {
      this.supervisor.stop();
      this.supervisor = undefined;
    }

    if (this.animationResult) {
      this.animationResult.finish();
      this.animationResult = undefined;
    }
  }

  public getLayoutData(options: STDLayoutOptions): GraphData {
    const { nodeFilter = () => true } = options;
    const { nodes, edges, combos } = this.context.model.getData();

    const getElement = (id: ID) => this.context.element!.getElement(id);

    const nodesToLayout = nodes.filter((node) => {
      const id = idOf(node);
      const element = getElement(id);
      if (!element) return false;
      if (isToBeDestroyed(element)) return false;
      return nodeFilter(node);
    });

    const nodesIdMap = new Map<ID, NodeData>(nodesToLayout.map((node) => [idOf(node), node]));

    const edgesToLayout = edges.filter((edge) => {
      const { source, target } = edge;
      if (!nodesIdMap.has(source) || !nodesIdMap.has(target)) return false;
      return true;
    });

    return {
      nodes: nodesToLayout,
      edges: edgesToLayout,
      combos,
    };
  }

  /**
   * <zh/> 创建布局实例
   *
   * <en/> Create layout instance
   * @param options - <zh/> 布局配置项 | <en/> Layout options
   * @returns <zh/> 布局对象 | <en/> Layout object
   */
  private initGraphLayout(options: STDLayoutOptions) {
    const { element, viewport } = this.context;
    const { type, enableWorker, animation, iterations, ...restOptions } = options;

    const [width, height] = viewport!.getCanvasSize();
    const center = [width / 2, height / 2];

    const nodeSize: number | ((node: NodeData) => number) =
      (options?.nodeSize as number) ??
      ((node) => {
        const nodeElement = element?.getElement<Node | Combo>(node.id as string);
        const { size } = nodeElement?.attributes || {};

        return size;
      });

    const Ctor = getExtension('layout', type);
    if (!Ctor) return print.warn(`The layout of ${type} is not registered.`);

    const STDCtor =
      Object.getPrototypeOf(Ctor.prototype) === BaseLayout.prototype
        ? Ctor
        : layoutAdapter(Ctor as new (options?: Record<string, unknown>) => AntVLayout, this.context);

    const layout = new STDCtor(this.context);
    const config = { nodeSize, width, height, center };

    switch (layout.id) {
      case 'd3-force':
      case 'd3-force-3d':
        Object.assign(config, {
          center: { x: width / 2, y: height / 2, z: 0 },
        });
        break;
      default:
        break;
    }

    deepMix(layout.options, config, restOptions);
    return layout as unknown as BaseLayout;
  }

  private updateElementPosition(layoutResult: GraphData, animation: boolean) {
    const { model, element } = this.context;
    if (!element) return null;
    model.updateData(layoutResult);

    return element.draw({ animation, silence: true });
  }

  public destroy() {
    this.stopLayout();
    // @ts-expect-error force delete
    this.context = {};
    this.supervisor?.kill();
    this.supervisor = undefined;
    this.instance = undefined;
    this.instances = [];
    this.animationResult = undefined;
  }
}

/**
 * <zh/> 对树形布局结果应用偏移
 *
 * <en/> Apply offset to tree layout result
 * @param data - <zh/> 布局数据 | <en/> Layout data
 * @param offset - <zh/> 偏移量 | <en/> Offset
 */
const applyTreeLayoutOffset = (data: GraphData, offset: [number, number]) => {
  const [ox, oy] = offset;
  data.nodes?.forEach((node) => {
    if (node.style) {
      const { x = 0, y = 0 } = node.style;
      node.style.x = x + ox;
      node.style.y = y + oy;
    } else {
      node.style = { x: ox, y: oy };
    }
  });
};
