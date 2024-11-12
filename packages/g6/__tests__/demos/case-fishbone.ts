import type { TextStyleProps } from '@antv/g';
import { Text } from '@antv/g';
import {
  BaseTransform,
  BaseTransformOptions,
  CategoricalPalette,
  DrawData,
  ExtensionCategory,
  Graph,
  register,
  RuntimeContext,
  treeToGraphData,
} from '@antv/g6';

const data = {
  id: '克服拖延',
  children: [
    { id: '完美主义情结', children: [{ id: '正确评估事情难度' }, { id: '先完成，再完善' }, { id: 'Just do it' }] },
    {
      id: '提高专注度',
      children: [{ id: '番茄工作法' }, { id: '限时、限量，一次只做一件事' }, { id: '提高抗干扰能力，减少打断' }],
    },
    {
      id: '设定清晰的任务管理流程',
      children: [
        { id: '设立完成事项的优先级' },
        { id: '拆解具体可执行的目标' },
        { id: '收集-整理-排序-执行反馈-总结' },
      ],
    },
    {
      id: '建立积极反馈',
      children: [{ id: '做喜欢的事情' }, { id: '精神激励' }, { id: '物质激励' }],
    },
    {
      id: '放松、享受',
      children: [{ id: '注重过程而非结果' }, { id: '靠需求驱动而非焦虑' }, { id: '接受、理解' }],
    },
  ],
};

interface AssignColorByBranchOptions extends BaseTransformOptions {
  colors?: CategoricalPalette;
}

export const caseFishbone: TestCase = async (context) => {
  let textShape: Text | null;
  const measureText = (style: TextStyleProps) => {
    if (!textShape) textShape = new Text({ style });
    textShape.attr(style);
    return textShape.getBBox().width;
  };

  class AssignColorByBranch extends BaseTransform {
    static defaultOptions: Partial<AssignColorByBranchOptions> = {
      colors: [
        '#1783FF',
        '#F08F56',
        '#D580FF',
        '#00C9C9',
        '#7863FF',
        '#DB9D0D',
        '#60C42D',
        '#FF80CA',
        '#2491B3',
        '#17C76F',
      ],
    };

    constructor(context: RuntimeContext, options: AssignColorByBranchOptions) {
      super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
    }

    beforeDraw(input: DrawData): DrawData {
      const nodes = this.context.model.getNodeData();

      if (nodes.length === 0) return input;

      let colorIndex = 0;
      const dfs = (nodeId: string, color?: string) => {
        const node = nodes.find((datum) => datum.id == nodeId);
        if (!node) return;

        node.style ||= {};
        node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
        node.children?.forEach((childId) => dfs(childId, node.style?.color as string));
      };

      nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

      return input;
    }
  }

  class ArrangeEdgeZIndex extends BaseTransform {
    public beforeDraw(input: DrawData): DrawData {
      const { model } = this.context;
      const { nodes, edges } = model.getData();

      const oneLevelNodes = nodes.filter((node) => node.depth === 1);
      const oneLevelNodeIds = oneLevelNodes.map((node) => node.id);

      edges.forEach((edge) => {
        if (oneLevelNodeIds.includes(edge.target)) {
          edge.style ||= {};
          edge.style.zIndex = oneLevelNodes.length - oneLevelNodes.findIndex((node) => node.id === edge.target);
        }
      });

      return input;
    }
  }

  register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);
  register(ExtensionCategory.TRANSFORM, 'arrange-edge-z-index', ArrangeEdgeZIndex);

  const getNodeSize = (id: string, depth: number) => {
    const FONT_FAMILY = 'system-ui, sans-serif';
    return depth === 0
      ? [measureText({ text: id, fontSize: 24, fontWeight: 'bold', fontFamily: FONT_FAMILY }) + 80, 58]
      : depth === 1
        ? [measureText({ text: id, fontSize: 18, fontFamily: FONT_FAMILY }) + 50, 42]
        : [0, 30];
  };

  const graph = new Graph({
    ...context,
    autoFit: 'view',
    padding: 10,
    data: treeToGraphData(data),
    node: {
      type: 'rect',
      style: (d) => {
        const style = {
          radius: 8,
          size: getNodeSize(d.id, d.depth!),
          labelText: d.id,
          labelPlacement: 'right',
        };

        if (d.depth === 0) {
          Object.assign(style, {
            fill: '#EFF0F0',
            labelFill: '#262626',
            labelFontWeight: 'bold',
            labelFontSize: 24,
            labelOffsetY: 8,
            labelPlacement: 'center',
          });
        } else if (d.depth === 1) {
          Object.assign(style, {
            labelFontSize: 18,
            labelFill: '#fff',
            labelFillOpacity: 0.9,
            labelOffsetY: 3,
            labelPlacement: 'center',
            fill: d.style?.color,
          });
        } else {
          Object.assign(style, {
            fill: 'transparent',
            labelFontSize: 16,
            labeFill: '#262626',
          });
        }
        return style;
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
        stroke: function (data) {
          return (this.getNodeData(data.target).style!.color as string) || '#99ADD1';
        },
      },
    },
    layout: {
      type: 'fishbone',
      direction: 'LR',
      hGap: 40,
      vGap: 60,
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
    transforms: ['assign-color-by-branch', 'arrange-edge-z-index'],
    animation: false,
  });

  await graph.render();

  return graph;
};
