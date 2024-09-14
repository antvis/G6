import { Graph as Graphlib } from '@antv/graphlib';
import { deepMix, isNumber } from '@antv/util';
import { COMBO_KEY } from '../constants';
import { BaseLayout } from '../layouts/base-layout';
import { idOf } from './id';
import { parsePoint } from './point';

import type { LayoutMapping, Graph as LayoutModel, Node as LayoutNodeData } from '@antv/layout';
import type { AntVLayout } from '../layouts/types';
import type { RuntimeContext } from '../runtime/types';
import type { GraphData } from '../spec/data';
import type { STDLayoutOptions } from '../spec/layout';
import type { AdaptiveLayout, ID } from '../types';

/**
 * <zh/> 判断是否是 combo 布局
 *
 * <en/> Determine if it is a combo layout
 * @param options - <zh/> 布局配置项 | <en/> Layout options
 * @returns <zh/> 是否是 combo 布局 | <en/> Whether it is a combo layout
 */
export function isComboLayout(options: STDLayoutOptions) {
  const { type } = options;
  if (['comboCombined', 'comboForce'].includes(type)) return true;
  if (type === 'antv-dagre' && options.sortByCombo) return true;
  return false;
}

/**
 * <zh/> 判断是否是树图布局
 *
 * <en/> Determine if it is a tree layout
 * @param options - <zh/> 布局配置项 | <en/> Layout options
 * @returns <zh/> 是否是树图布局 | <en/> Whether it is a tree layout
 */
export function isTreeLayout(options: STDLayoutOptions) {
  const { type } = options;
  return ['compact-box', 'mindmap', 'dendrogram', 'indented'].includes(type);
}

/**
 * <zh/> 数据中是否指定了位置
 *
 * <en/> Is the position specified in the data
 * @param data - <zh/> 数据 | <en/> Data
 * @returns <zh/> 是否指定了位置 | <en/> Is the position specified
 */
export function isPositionSpecified(data: Record<string, unknown>) {
  return isNumber(data.x) && isNumber(data.y);
}

/**
 * <zh/> 将图布局结果转换为 G6 数据
 *
 * <en/> Convert the layout result to G6 data
 * @param layoutMapping - <zh/> 布局映射 | <en/> Layout mapping
 * @returns <zh/> G6 数据 | <en/> G6 data
 */
export function layoutMapping2GraphData(layoutMapping: LayoutMapping): GraphData {
  const { nodes, edges } = layoutMapping;
  const data: GraphData = { nodes: [], edges: [], combos: [] };

  nodes.forEach((nodeLike) => {
    const target = nodeLike.data._isCombo ? data.combos : data.nodes;
    const { x, y, z = 0 } = nodeLike.data;
    target?.push({
      id: nodeLike.id as ID,
      style: { x, y, z },
    });
  });

  edges.forEach((edge) => {
    const {
      id,
      source,
      target,
      data: { points = [], controlPoints = points.slice(1, points.length - 1) },
    } = edge;

    data.edges!.push({
      id: id as ID,
      source: source as ID,
      target: target as ID,
      style: {
        /**
         * antv-dagre 返回 controlPoints，dagre 返回 points
         * antv-dagre returns controlPoints, dagre returns points
         */
        ...(controlPoints?.length ? { controlPoints: controlPoints.map(parsePoint) } : {}),
      },
    });
  });

  return data;
}

/**
 * <zh/> 将 @antv/layout 布局适配为 G6 布局
 *
 * <en/> Adapt @antv/layout layout to G6 layout
 * @param Ctor - <zh/> 布局类 | <en/> Layout class
 * @param context - <zh/> 运行时上下文 | <en/> Runtime context
 * @returns <zh/> G6 布局类 | <en/> G6 layout class
 */
export function layoutAdapter(
  Ctor: new (options: Record<string, unknown>) => AntVLayout,
  context: RuntimeContext,
): new (context: RuntimeContext, options?: Record<string, unknown>) => BaseLayout {
  class AdaptLayout extends BaseLayout implements AdaptiveLayout {
    public instance: AntVLayout;

    public id: string;

    constructor(context: RuntimeContext, options?: Record<string, unknown>) {
      super(context, options);
      this.instance = new Ctor({});
      this.id = this.instance.id;

      if ('stop' in this.instance && 'tick' in this.instance) {
        const instance = this.instance;
        this.stop = instance.stop.bind(instance);
        this.tick = (iterations?: number) => {
          const tickResult = instance.tick(iterations);
          return layoutMapping2GraphData(tickResult);
        };
      }
    }

    public async execute(model: GraphData, options?: STDLayoutOptions): Promise<GraphData> {
      return layoutMapping2GraphData(
        await this.instance.execute(
          this.graphData2LayoutModel(model),
          this.transformOptions(deepMix({}, this.options, options)),
        ),
      );
    }

    private transformOptions(options: STDLayoutOptions) {
      const { onTick } = options;

      if (!onTick) return options;
      options.onTick = (data: LayoutMapping) => onTick(layoutMapping2GraphData(data));
      return options;
    }

    public graphData2LayoutModel(data: GraphData): LayoutModel {
      const { nodes = [], edges = [], combos = [] } = data;
      const nodesToLayout: LayoutNodeData[] = nodes.map((datum) => {
        const id = idOf(datum);
        const { data, style, combo, ...rest } = datum;

        const result = {
          id,
          data: {
            // grid 布局会直接读取 data[sortBy]，兼容处理，需要避免用户 data 下使用 data, style 等字段
            // The grid layout will directly read data[sortBy], compatible processing, need to avoid users using data, style and other fields under data
            ...data,
            data,
            // antv-dagre 会读取 data.parentId
            // antv-dagre will read data.parentId
            ...(combo ? { parentId: combo } : {}),
            style,
            ...rest,
          },
        };
        // 一些布局会从 data 中读取位置信息
        if (style?.x) Object.assign(result.data, { x: style.x });
        if (style?.y) Object.assign(result.data, { y: style.y });
        if (style?.z) Object.assign(result.data, { z: style.z });

        return result;
      });
      const nodesIdMap = new Map(nodesToLayout.map((node) => [node.id, node]));

      const edgesToLayout = edges
        .filter((edge) => {
          const { source, target } = edge;
          return nodesIdMap.has(source) && nodesIdMap.has(target);
        })
        .map((edge) => {
          const { source, target, data, style } = edge;
          return { id: idOf(edge), source, target, data: { ...data }, style: { ...style } };
        });

      const combosToLayout: LayoutNodeData[] = combos.map((combo) => {
        return { id: idOf(combo), data: { _isCombo: true, ...combo.data }, style: { ...combo.style } };
      });

      const layoutModel = new Graphlib({
        nodes: [...nodesToLayout, ...combosToLayout],
        edges: edgesToLayout,
      });

      if (context.model.model.hasTreeStructure(COMBO_KEY)) {
        layoutModel.attachTreeStructure(COMBO_KEY);
        // 同步层级关系 / Synchronize hierarchical relationships
        nodesToLayout.forEach((node) => {
          const parent = context.model.model.getParent(node.id, COMBO_KEY);
          if (parent && layoutModel.hasNode(parent.id)) {
            layoutModel.setParent(node.id, parent.id, COMBO_KEY);
          }
        });
      }

      return layoutModel;
    }
  }

  return AdaptLayout;
}

/**
 * <zh/> 调用布局成员方法
 *
 * <en/> Call layout member methods
 * @remarks
 * <zh/> 提供一种通用的调用方式来调用 G6 布局和 \@antv/layout 布局上的方法
 *
 * <en/> Provide a common way to call methods on G6 layout and \@antv/layout layout
 * @param layout - <zh/> 布局实例 | <en/> Layout instance
 * @param method - <zh/> 方法名 | <en/> Method name
 * @param args - <zh/> 参数 | <en/> Arguments
 * @returns <zh/> 返回值 | <en/> Return value
 */
export function invokeLayoutMethod(layout: BaseLayout, method: string, ...args: unknown[]) {
  if (method in layout) {
    return (layout as any)[method](...args);
  }
  // invoke AdaptLayout method
  if ('instance' in layout) {
    const instance = (layout as any).instance;
    if (method in instance) return instance[method](...args);
  }
  return null;
}

/**
 * <zh/> 获取布局成员属性
 *
 * <en/> Get layout member properties
 * @param layout - <zh/> 布局实例 | <en/> Layout instance
 * @param name - <zh/> 属性名 | <en/> Property name
 * @returns <zh/> 返回值 | <en/> Return value
 */
export function getLayoutProperty(layout: BaseLayout, name: string) {
  if (name in layout) return (layout as any)[name];
  if ('instance' in layout) {
    const instance = (layout as any).instance;
    if (name in instance) return instance[name];
  }
  return null;
}
