import type { TextStyleProps } from '@antv/g';
import { Text } from '@antv/g';
import type { EdgeData, GraphData, NodeData } from '@antv/g6';
import { BaseLayout, ExtensionCategory, Graph, register, treeToGraphData } from '@antv/g6';

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

const palette = [
  '#1783FF',
  '#00C9C9',
  '#F08F56',
  '#D580FF',
  '#7863FF',
  '#DB9D0D',
  '#60C42D',
  '#FF80CA',
  '#2491B3',
  '#17C76F',
];

export const caseFishbone: TestCase = async (context) => {
  const assignElementStyle = (element: any, style: any) => {
    return { ...element, style: { ...(element.style || {}), ...style } };
  };

  class FishboneLayout extends BaseLayout {
    id = 'fishbone';

    async execute(data: GraphData, options: any): Promise<GraphData> {
      const { rankSep = 30, branchSep = 30, nodeSep = 48, size = 32 } = { ...this.options, ...options };

      const { model } = this.context;
      const root = model.getRootsData()[0];
      Object.assign(root.style || {}, { x: 0, y: 0 });
      const rootSize = typeof size === 'function' ? size(root) : size;

      const nodes: NodeData[] = [root];
      const edges: EdgeData[] = [];

      let branchStartX = rootSize[0] / 2 + branchSep;
      let leafNodeMaxX = branchStartX;

      const findEdgeByTarget = (target: string) => (data.edges || []).find((edge) => edge.target === target)!;

      (data.nodes || [])
        .filter((node: NodeData) => node.depth === 1)
        .forEach((node: NodeData, i: number) => {
          const nodeSize = typeof size === 'function' ? size(node) : size;

          const leafNodeIds = node.children || [];
          const isUpper = i % 2 === 0;
          const sign = isUpper ? 1 : -1;

          leafNodeIds.forEach((leafNodeId: string, j: number) => {
            const order = j + 1;
            const leafNode = model.getNodeLikeDatum(leafNodeId);
            const leafNodeSize = typeof size === 'function' ? size(leafNode) : size;

            const x = branchStartX + rankSep * (order + 1) + leafNodeSize[0] / 2;
            const y = sign * nodeSep * order;
            nodes.push(assignElementStyle(leafNode, { x, y }) as NodeData);

            leafNodeMaxX = Math.max(leafNodeMaxX, x + leafNodeSize[0] / 2);
            const edge = findEdgeByTarget(leafNodeId);
            edges.push(
              assignElementStyle(edge, {
                stroke: palette[i % palette.length],
                controlPoints: [[branchStartX + rankSep * order, y]],
                zIndex: -i,
              }) as EdgeData,
            );
          });
          nodes.push(
            assignElementStyle(node, {
              x: branchStartX + rankSep * (leafNodeIds.length + 1),
              y: sign * (nodeSep * (leafNodeIds.length + 1) + nodeSize[1] / 2),
              fill: palette[i % palette.length],
            }) as NodeData,
          );
          const edge = findEdgeByTarget(node.id);
          edges.push(
            assignElementStyle(edge, {
              stroke: palette[i % palette.length],
              controlPoints: [[branchStartX, 0]],
              zIndex: -i,
            }) as EdgeData,
          );
          branchStartX = (isUpper ? branchStartX : leafNodeMaxX) + branchSep;
        });

      return { nodes, edges };
    }
  }

  register(ExtensionCategory.LAYOUT, 'fishbone', FishboneLayout);

  let textShape: Text | null;
  const measureText = (style: TextStyleProps) => {
    if (!textShape) textShape = new Text({ style });
    textShape.attr(style);
    return textShape.getBBox().width;
  };

  const getNodeSize = (id: string, depth: number) => {
    return depth === 0
      ? [measureText({ text: id, fontSize: 18, fontWeight: 'bold', fontFamily: 'system-ui, sans-serif' }) + 60, 42]
      : depth === 1
        ? [measureText({ text: id, fontSize: 16, fontFamily: 'system-ui, sans-serif' }) + 50, 36]
        : [measureText({ text: id, fontSize: 12, fontFamily: 'system-ui, sans-serif' }) + 16, 30];
  };

  const graph = new Graph({
    ...context,
    autoFit: 'view',
    padding: 20,
    data: treeToGraphData(data),
    node: {
      type: 'rect',
      style: (d) => {
        const style = {
          radius: 8,
          size: getNodeSize(d.id, d.depth!),
          labelText: d.id,
          labelPlacement: 'center',
        };

        if (d.depth === 0) {
          Object.assign(style, {
            fill: '#EFF0F0',
            labelFill: '#262626',
            labelFontWeight: 'bold',
            labelFontSize: 18,
            labelOffsetY: 4,
            ports: [{ placement: 'right' }],
          });
        } else if (d.depth === 1) {
          Object.assign(style, {
            ports: [{ placement: 'bottom' }, { placement: 'top' }],
            labelFontSize: 14,
            labelFill: '#fff',
            labelOffsetY: 2,
          });
        } else {
          Object.assign(style, {
            fill: 'transparent',
            ports: [{ placement: 'left' }],
            labeFill: '#262626',
          });
        }
        return style;
      },
    },
    edge: {
      type: 'polyline',
      style: { lineWidth: 2 },
    },
    layout: {
      type: 'fishbone',
      size: (d: NodeData) => getNodeSize(d.id, d.depth!),
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
    animation: false,
  });

  await graph.render();

  return graph;
};
