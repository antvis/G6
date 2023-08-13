import G6 from '../../../../src/index';
import { container, height, width } from '../../../datasets/const';

export default () => {
  const data = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'rect-node',
        },
      },
      {
        id: 2,
        data: {
          x: 600,
          y: 200,
          type: 'rect-node',
        },
      },
      {
        id: 3,
        data: {
          x: 700,
          y: 300,
          type: 'rect-node',
        },
      },
      {
        id: 4,
        data: {
          x: 900,
          y: 400,
          type: 'rect-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'polyline-edge',
        },
      },
      {
        id: 'edge2',
        source: 3,
        target: 4,
        data: {
          type: 'polyline-edge',
        },
      },
    ],
  };

  const edge: (data: any) => any = (edgeInnerModel: any) => {
    const { id, data } = edgeInnerModel;
    return {
      id,
      data: {
        ...data,
        keyShape: {
          radius: 10,
          offset: 20,
          // controlPoints: [
          //   { x: 600, y: 100 },
          //   { x: 200, y: 600 },
          //   { x: 800, y: 100 },
          // ],
          routeCfg: {
            gridSize: 10,
            maxAllowedDirectionChange: Math.PI / 2,
            obstacleAvoidance: true,
          },
        },
        labelShape: {
          text: 'edge-label',
        },
      },
    };
  };
  const graph = new G6.Graph({
    container,
    width,
    height,
    data,
    type: 'graph',
    modes: {
      default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      // 返回值类型见下方 DisplayNodeModel 类型
      return {
        id,
        data: {
          ...data,
          keyShape: {
            r: 15,
          },
        },
      };
    },
    edge,
  });

  graph.addData('node', [
    {
      id: 'obstacle1',
      data: {
        x: 400,
        y: 100,
        type: 'circle-node',
        preventEdgeOverlap: true,
        labelShape: {
          text: 'obstacle1',
        },
      },
    },
    {
      id: 'obstacle2',
      data: {
        x: 200,
        y: 300,
        type: 'circle-node',
        // preventEdgeOverlap: true,
        labelShape: {
          text: 'obstacle2',
        },
      },
    },
    {
      id: 'obstacle3',
      data: {
        x: 300,
        y: 150,
        type: 'circle-node',
        labelShape: {
          text: 'obstacle3',
        },
      },
    },
  ]);

  return graph;
};
