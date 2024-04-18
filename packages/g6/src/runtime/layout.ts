import type { IAnimation } from '@antv/g';
import type { Edge as GraphlibEdge, Node as GraphlibNode } from '@antv/graphlib';
import { Graph as Graphlib } from '@antv/graphlib';
import type { Layout, LayoutMapping } from '@antv/layout';
import { Supervisor, isLayoutWithIterations } from '@antv/layout';
import { deepMix } from '@antv/util';
import { COMBO_KEY, GraphEvent, TREE_KEY } from '../constants';
import { getExtension } from '../registry';
import type { EdgeData, NodeData } from '../spec';
import type { STDLayoutOptions } from '../spec/layout';
import type { Combo, ID, Node, PartialGraphData, TreeData } from '../types';
import { getAnimation } from '../utils/animation';
import { isVisible } from '../utils/element';
import { GraphLifeCycleEvent, emit } from '../utils/event';
import { createTreeStructure } from '../utils/graphlib';
import { isComboLayout, isTreeLayout } from '../utils/layout';
import { parsePoint } from '../utils/point';
import { parseSize } from '../utils/size';
import { dfs } from '../utils/traverse';
import type { RuntimeContext } from './types';

type LayoutGraphlibModel = Graphlib<Required<NodeData>['style'], Required<EdgeData>['style']>;

type LayoutGraphlibNode = GraphlibNode<Required<NodeData>['style']>;

type LayoutGraphlibEdge = GraphlibEdge<Required<EdgeData>['style']>;

export class LayoutController {
  private context: RuntimeContext;

  private supervisor?: Supervisor;

  private instance?: Layout<unknown>;

  private instances: Layout<unknown>[] = [];

  private animationResult?: IAnimation | null;

  private get presetOptions() {
    return {
      animation: !!getAnimation(this.context.options, true),
    };
  }

  private get options() {
    const { options } = this.context;
    return options.layout;
  }

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  public getLayoutInstance(): Layout<unknown>[];
  public getLayoutInstance(index: number): Layout<unknown>;
  public getLayoutInstance(index?: number) {
    if (index === undefined) return this.instances;
    return this.instance;
  }

  public async layout() {
    if (!this.options) return;
    const pipeline = Array.isArray(this.options) ? this.options : [this.options];
    const { graph } = this.context;
    emit(graph, new GraphLifeCycleEvent(GraphEvent.BEFORE_LAYOUT));
    for (const options of pipeline) {
      const index = pipeline.indexOf(options);
      const model = this.getLayoutDataModel(options);
      const result = await this.stepLayout(model, { ...this.presetOptions, ...options }, index);

      if (!options.animation) {
        this.updateElementPosition(result, false);
      }
    }
    emit(graph, new GraphLifeCycleEvent(GraphEvent.AFTER_LAYOUT));
  }

  public async stepLayout(
    model: LayoutGraphlibModel,
    options: STDLayoutOptions,
    index: number,
  ): Promise<LayoutMapping> {
    if (isTreeLayout(options)) return await this.treeLayout(model, options, index);
    return await this.graphLayout(model, options, index);
  }

  private async graphLayout(
    model: LayoutGraphlibModel,
    options: STDLayoutOptions,
    index: number,
  ): Promise<LayoutMapping> {
    const { animation, enableWorker, iterations = 300 } = options;

    const layout = this.initGraphLayout(model, options);
    this.instances[index] = layout;
    this.instance = layout;

    // 使用 web worker 执行布局 / Use web worker to execute layout
    if (enableWorker) {
      this.supervisor = new Supervisor(model, layout, { iterations });
      return await this.supervisor.execute();
    }

    if (isLayoutWithIterations(layout)) {
      // 有动画，基于布局迭代 tick 更新位置 / Update position based on layout iteration tick
      if (animation) {
        // @ts-expect-error size is incompatible, but it's okay
        return await layout.execute(model, {
          onTick: (tickData: LayoutMapping) => {
            this.updateElementPosition(tickData, false);
          },
        });
      }

      // 无动画，直接返回终态位置 / No animation, return final position directly
      // @ts-expect-error size is incompatible, but it's okay
      layout.execute(model);
      layout.stop();
      return layout.tick(iterations);
    }

    // 无迭代的布局，直接返回终态位置 / Layout without iteration, return final position directly
    // @ts-expect-error size is incompatible, but it's okay
    const layoutResult = await layout.execute(model);
    if (animation) {
      this.updateElementPosition(layoutResult, animation);
    }
    return layoutResult;
  }

  private async treeLayout(
    model: LayoutGraphlibModel,
    options: STDLayoutOptions,
    index: number,
  ): Promise<LayoutMapping> {
    const { type, animation } = options;
    // @ts-expect-error @antv/hierarchy 布局格式与 @antv/layout 不一致，其导出的是一个方法，而非 class
    // The layout format of @antv/hierarchy is inconsistent with @antv/layout, it exports a method instead of a class
    const layout = getExtension('layout', type) as (tree: TreeData, options: STDLayoutOptions) => TreeData;
    if (!layout) throw new Error(`The layout type ${type} is not found`);

    createTreeStructure(model);
    const layoutResult: LayoutMapping = { nodes: [], edges: [] };

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
      // 将布局结果转化为 LayoutMapping 格式 / Convert the layout result to LayoutMapping format
      dfs(
        result,
        (node) => {
          const { id, x, y } = node;
          layoutResult.nodes.push({ id, data: { x, y } });
        },
        (node) => node.children,
        'TB',
      );
    });

    if (animation) {
      this.updateElementPosition(layoutResult, animation);
    }

    return layoutResult;
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

  /**
   * <zh/> 获取参与布局的数据模型
   *
   * <en/> Get the data model involved in the layout
   * @param options - <zh/> 布局配置项 | <en/> Layout options
   * @returns <zh/> 布局数据 | <en/> Layout data
   */
  public getLayoutDataModel(options: STDLayoutOptions): LayoutGraphlibModel {
    const { model, element } = this.context;

    if (!element) return new Graphlib();

    const { nodesFilter = () => true } = options;
    const nodeElementMap = Object.fromEntries(element.getNodes().map((node) => [node.id, node]));
    const comboElementMap = Object.fromEntries(element.getCombos().map((combo) => [combo.id, combo]));
    const edgeElementMap = Object.fromEntries(element.getEdges().map((edge) => [edge.id, edge]));

    const nodes = model.model.getAllNodes().filter((node) => nodesFilter(node.data));
    const edges = model.model.getAllEdges();

    const nodesToLayout = (
      isComboLayout(options)
        ? nodes
        : nodes.filter((node) => {
            // 如果使用的不是 combo 布局，则只布局可见的节点
            // If not using combo layout, only visible nodes are laid out
            if (comboElementMap[node.id]) return false;
            return isVisible(nodeElementMap[node.id]);
          })
    ).map((datum) => {
      const { id } = datum;
      const isCombo = !!comboElementMap[id];
      const result = { id };

      if (isCombo) {
        Object.assign(result, {
          data: {
            ...getTransferableAttributes(comboElementMap[id].attributes),
            _isCombo: true,
          },
        });
      } else {
        Object.assign(result, { data: getTransferableAttributes(nodeElementMap[id]?.attributes || {}) });
      }

      return result as LayoutGraphlibNode;
    });

    const nodesIdMap = new Map(nodesToLayout.map((node) => [node.id, node]));

    const edgesToLayout = edges
      .filter((edge) => {
        const source = nodesIdMap.get(edge.source);
        const target = nodesIdMap.get(edge.target);
        return source && target;
      })
      .map((datum) => {
        const { id, source, target } = datum;
        return {
          id,
          source,
          target,
          data: getTransferableAttributes(edgeElementMap[id].attributes),
        } as LayoutGraphlibEdge;
      });

    const dataModel = new Graphlib({
      nodes: nodesToLayout,
      edges: edgesToLayout,
    });

    if (model.model.hasTreeStructure(COMBO_KEY)) {
      dataModel.attachTreeStructure(COMBO_KEY);
      // 同步层级关系 / Synchronize hierarchical relationships
      nodesToLayout.forEach((node) => {
        const parent = model.model.getParent(node.id, COMBO_KEY);
        if (parent && dataModel.hasNode(parent.id)) {
          dataModel.setParent(node.id, parent.id, COMBO_KEY);
        }
      });
    }
    return dataModel;
  }

  /**
   * <zh/> 创建布局实例
   *
   * <en/> Create layout instance
   * @param model - <zh/> 布局数据 | <en/> Layout data
   * @param options - <zh/> 布局配置项 | <en/> Layout options
   * @returns <zh/> 布局对象 | <en/> Layout object
   */
  private initGraphLayout(model: LayoutGraphlibModel, options: STDLayoutOptions) {
    const { element, viewport } = this.context;
    const { type, enableWorker, animation, iterations, ...restOptions } = options;

    const [width, height] = viewport!.getCanvasSize();
    const center = [width / 2, height / 2];

    const nodeSize: number | ((node: LayoutGraphlibNode) => number) =
      (options?.nodeSize as number) ??
      ((node) => {
        const nodeElement = element?.getElement<Node | Combo>(node.id as string);
        const { size } = nodeElement?.attributes || {};
        return Math.max(...parseSize(size));
      });

    const Ctor = getExtension('layout', type);

    if (!Ctor) throw new Error(`The layout type ${type} is not found`);

    const layout = new Ctor();

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
    return layout;
  }

  private updateElementPosition(layoutData: LayoutMapping, animation: boolean) {
    const { model, element } = this.context;
    if (!element) return null;

    const { nodes, edges } = layoutData;
    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    nodes.forEach(({ id, data: { x, y, z = 0 } }) => {
      dataToUpdate.nodes.push({ id: id as ID, style: { x, y, z } });
    });

    edges.forEach(({ id, data: { points = [], controlPoints = points.slice(1, points.length - 1) } }) => {
      /**
       * antv-dagre 返回 controlPoints，dagre 返回 points
       * antv-dagre returns controlPoints, dagre returns points
       */
      if (controlPoints?.length) {
        // points 的第一个点是起点，最后一个点是终点，中间的点是控制点
        // The first point of points is the starting point, and the last point is the end point, and the middle point is the control point
        dataToUpdate.edges.push({ id: id as ID, style: { controlPoints: controlPoints.map(parsePoint) } });
      }
    });

    model.updateData(dataToUpdate);
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

const getTransferableAttributes = (attributes: Record<string, any>) => {
  return Object.entries(attributes).reduce(
    (result, [key, value]) => {
      if (
        !['function', 'object'].includes(typeof value) &&
        // 布局数据中包含位置信息会导致布局异常 / Position information in layout data will cause layout abnormal
        !['x', 'y', 'z'].includes(key)
      ) {
        result[key] = value;
      }
      return result;
    },
    {} as Record<string, unknown>,
  );
};
