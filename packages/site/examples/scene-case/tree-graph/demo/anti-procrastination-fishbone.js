import { Text } from '@antv/g';
import { BaseTransform, ExtensionCategory, Graph, register, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Overcome \n procrastination',
  children: [
    {
      id: 'Perfectionism',
      children: [
        { id: 'Correctly assess the difficulty of things' },
        { id: 'Complete first, then improve' },
        { id: 'Just do it' },
      ],
    },
    {
      id: 'Improve concentration',
      children: [
        { id: 'Pomodoro Technique' },
        { id: 'Limited time, limited quantity, only do one thing at a time' },
        { id: 'Improve anti-interference ability, reduce interruptions' },
      ],
    },
    {
      id: 'Set a clear task management process',
      children: [
        { id: 'Set priorities for completed tasks' },
        { id: 'Break down specific executable goals' },
        { id: 'Collect-sort-sort-execute feedback-summary' },
      ],
    },
    {
      id: 'Establish positive feedback',
      children: [{ id: 'Do what you like' }, { id: 'Spiritual motivation' }, { id: 'Material motivation' }],
    },
    {
      id: 'Relax and enjoy',
      children: [
        { id: 'Focus on process rather than results' },
        { id: 'Driven by needs rather than anxiety' },
        { id: 'Accept and understand' },
      ],
    },
  ],
};

let textShape;
const measureText = (style) => {
  if (!textShape) textShape = new Text({ style });
  textShape.attr(style);
  return textShape.getBBox().width;
};

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
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

  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input) {
    const nodes = this.context.model.getNodeData();

    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };

    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

    return input;
  }
}

class ArrangeEdgeZIndex extends BaseTransform {
  beforeDraw(input) {
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

const getNodeSize = (id, depth) => {
  const FONT_FAMILY = 'system-ui, sans-serif';
  return depth === 0
    ? [measureText({ text: id, fontSize: 24, fontWeight: 'bold', fontFamily: FONT_FAMILY }) + 80, 70]
    : depth === 1
      ? [measureText({ text: id, fontSize: 18, fontFamily: FONT_FAMILY }) + 50, 42]
      : [2, 30];
};

const graph = new Graph({
  autoFit: 'view',
  padding: 10,
  data: treeToGraphData(data),
  node: {
    type: 'rect',
    style: (d) => {
      const style = {
        radius: 8,
        size: getNodeSize(d.id, d.depth),
        labelText: d.id,
        labelPlacement: 'right',
        labelFontFamily: 'Gill Sans',
      };

      if (d.depth === 0) {
        Object.assign(style, {
          fill: '#EFF0F0',
          labelFill: '#262626',
          labelFontWeight: 'bold',
          labelFontSize: 24,
          labelOffsetY: 4,
          labelPlacement: 'center',
          labelLineHeight: 24,
        });
      } else if (d.depth === 1) {
        Object.assign(style, {
          labelFontSize: 18,
          labelFill: '#fff',
          labelFillOpacity: 0.9,
          labelOffsetY: 5,
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
        return this.getNodeData(data.target).style.color || '#99ADD1';
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
});

graph.render();
