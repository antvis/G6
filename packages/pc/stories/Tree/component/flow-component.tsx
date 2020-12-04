import React, { useEffect } from 'react';
import G6 from '../../../src';
import { traverseTree } from '../../../src/util/graphic';
import { IGraph, ITreeGraph } from '../../../src/interface/graph';
import { EdgeConfig, TreeGraphData, StateStyles, ShapeStyle } from '../../../src/types';
import { INode, IEdge } from '../../../src/interface/item';

interface IFlowCharts {
  data?: TreeGraphData;
  width?: number;
  height?: number;
  nodeType?: string;
  edgeType?: string;
  nodeStyle?: ShapeStyle;
  edgeStyle?: ShapeStyle;
  nodeStateStyles?: StateStyles;
  edgeStateStyles?: StateStyles;
  nodeSize?: number | number[];
  labelCfg?: {
    style: {
      stroke?: string;
      fontSize?: number;
    };
  };
  layout?: any;
  enableEdit?: boolean;
  handleNodeClick?: (item: INode, graph: IGraph) => void;
  handleEdgeClick?: (item: IEdge, graph: IGraph) => void;
  handleNodeHover?: (item: INode, graph: IGraph) => void;
  handleNodeUnHover?: (item: INode, graph: IGraph) => void;
  handleEdgeHover?: (item: IEdge, graph: IGraph) => void;
  handleEdgeUnHover?: (item: IEdge, graph: IGraph) => void;
  collapseExpand?: boolean;
}

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ['M', x - r, y - r],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y - r],
    ['L', x + r - 2, y - r],
    ['M', x, y - 2 * r + 2],
    ['L', x, y - 2],
  ];
};

const data1 = {
  id: 'root',
  label: 'root',
  children: [
    {
      id: 'c1',
      label: 'c1',
      children: [
        {
          id: 'c1-1',
          label: 'c1-1',
        },
        {
          id: 'c1-2',
          label: 'c1-2',
          children: [
            {
              id: 'c1-2-1',
              label: 'c1-2-1',
            },
            {
              id: 'c1-2-2',
              label: 'c1-2-2',
            },
          ],
        },
      ],
    },
    {
      id: 'c2',
      label: 'c2',
    },
    {
      id: 'c3',
      label: 'c3',
      children: [
        {
          id: 'c3-1',
          label: 'c3-1',
        },
        {
          id: 'c3-2',
          label: 'c3-2',
          children: [
            {
              id: 'c3-2-1',
              label: 'c3-2-1',
            },
            {
              id: 'c3-2-2',
              label: 'c3-2-2',
            },
            {
              id: 'c3-2-3',
              label: 'c3-2-3',
            },
          ],
        },
        {
          id: 'c3-3',
          label: 'c3-3',
        },
      ],
    },
  ],
};

traverseTree(data1 as any, (d) => {
  d.leftIcon = {
    style: {
      fill: '#e6fffb',
      stroke: '#e6fffb',
    },
    img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
  };
  return true;
});

G6.registerEdge('flow-line', {
  draw(cfg: EdgeConfig, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const { style } = cfg;
    const shape = group.addShape('path', {
      attrs: {
        stroke: style.stroke,
        endArrow: style.endArrow,
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, endPoint.y],
        ],
      },
    });

    return shape;
  },
});

let graph: ITreeGraph = null;

const defaultStateStyles = {
  hover: {
    stroke: '#1890ff',
    lineWidth: 2,
  },
};

const defaultNodeStyle = {
  fill: '#91d5ff',
  stroke: '#40a9ff',
  radius: 5,
};

const defaultEdgeStyle = {
  stroke: '#91d5ff',
  endArrow: {
    path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
    fill: '#91d5ff',
    d: -20,
  },
};

const defaultLayout = {
  type: 'compactBox',
  direction: 'TB',
  getId: function getId(d) {
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    return 40;
  },
  getHGap: function getHGap() {
    return 70;
  },
};

const defaultLabelCfg = {
  style: {
    fill: '#000',
    fontSize: 12,
  },
};

const FlowComponent: React.SFC<IFlowCharts> = ({
  data = data1,
  width = 500,
  height = 500,
  nodeType = 'icon-node',
  edgeType = 'flow-line',
  collapseExpand = false,
  nodeSize = [120, 40],
  labelCfg = defaultLabelCfg,
  layout = defaultLayout,
  enableEdit = true,
  nodeStyle = defaultNodeStyle,
  edgeStyle = defaultEdgeStyle,
  nodeStateStyles = defaultStateStyles,
  edgeStateStyles = defaultStateStyles,
  handleNodeClick,
  handleEdgeClick,
  handleNodeHover,
  handleNodeUnHover,
  handleEdgeHover,
  handleEdgeUnHover,
}) => {
  const container = React.useRef();

  useEffect(() => {
    G6.registerNode(
      'icon-node',
      {
        options: {
          size: [60, 20],
          stroke: '#91d5ff',
          fill: '#91d5ff',
        },
        draw(cfg, group) {
          const styles = this.getShapeStyle(cfg);
          const { labelCfg = {} } = cfg;

          const keyShape = group.addShape('rect', {
            attrs: {
              ...styles,
              x: 0,
              y: 0,
            },
          });

          /**
           * leftIcon 格式如下：
           *  {
           *    style: ShapeStyle;
           *    img: ''
           *  }
           */
          if (cfg.leftIcon) {
            const { style, img } = cfg.leftIcon as any;
            group.addShape('rect', {
              attrs: {
                x: 1,
                y: 1,
                width: 38,
                height: styles.height - 2,
                fill: '#8c8c8c',
                ...style,
              },
            });

            group.addShape('image', {
              attrs: {
                x: 8,
                y: 8,
                width: 24,
                height: 24,
                img:
                  img ||
                  'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
              },
              name: 'image-shape',
            });
          }

          if (enableEdit) {
            group.addShape('marker', {
              attrs: {
                x: 40,
                y: 52,
                r: 6,
                stroke: '#73d13d',
                cursor: 'pointer',
                symbol: EXPAND_ICON,
              },
              name: 'add-item',
            });

            group.addShape('marker', {
              attrs: {
                x: 80,
                y: 52,
                r: 6,
                stroke: '#ff4d4f',
                cursor: 'pointer',
                symbol: COLLAPSE_ICON,
              },
              name: 'remove-item',
            });
          }

          if (cfg.label) {
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: cfg.label,
                x: 50,
                y: 25,
              },
            });
          }

          return keyShape;
        },
      },
      'rect',
    );

    if (!graph) {
      const minimap = new G6.Minimap({
        size: [150, 100],
      });
      graph = new G6.TreeGraph({
        container: container.current,
        width,
        height,
        linkCenter: true,
        plugins: [minimap],
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          type: nodeType,
          size: nodeSize,
          style: nodeStyle,
          labelCfg,
        },
        defaultEdge: {
          type: edgeType,
          style: edgeStyle,
        },
        nodeStateStyles,
        edgeStateStyles,
        layout,
      });

      graph.data(data);
      graph.render();
      graph.fitView();

      if (collapseExpand) {
        graph.addBehaviors(
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            },
          },
          'default',
        );
      }

      graph.on('node:mouseenter', (evt) => {
        const item: INode = evt.item as INode;
        graph.setItemState(item, 'hover', true);
        if (handleNodeHover) {
          handleNodeHover(item, graph);
        }
      });

      graph.on('node:mouseleave', (evt) => {
        const item: INode = evt.item as INode;
        graph.setItemState(item, 'hover', false);
        if (handleNodeUnHover) {
          handleNodeUnHover(item, graph);
        }
      });

      graph.on('node:click', (evt) => {
        const item: INode = evt.item as INode;
        const { target } = evt;
        const targetType = target.get('type');
        const name = target.get('name');

        // 增加元素
        if (targetType === 'marker') {
          const model: TreeGraphData = item.getModel() as TreeGraphData;
          if (name === 'add-item') {
            if (!model.children) {
              model.children = [];
            }
            model.children.push({
              id: `${Math.random()}`,
              label: `${Math.random()}`
            });
            graph.updateChild(model, model.id);
          } else if (name === 'remove-item') {
            graph.removeChild(model.id);
          }
        } else {
          if (handleNodeClick) {
            handleNodeClick(item, graph);
          }
        }
      });

      graph.on('edge:mouseenter', (evt) => {
        const item: IEdge = evt.item as IEdge;
        graph.setItemState(item, 'hover', true);
        if (handleEdgeHover) {
          handleEdgeHover(item, graph);
        }
      });

      graph.on('edge:mouseleave', (evt) => {
        const item: IEdge = evt.item as IEdge;
        graph.setItemState(item, 'hover', false);
        if (handleEdgeUnHover) {
          handleEdgeUnHover(item, graph);
        }
      });

      graph.on('edge:click', (evt) => {
        const item: IEdge = evt.item as IEdge;
        if (handleEdgeClick) {
          handleEdgeClick(item, graph);
        }
      });
    }
  }, []);
  return <div ref={container}></div>;
};

export default FlowComponent;
