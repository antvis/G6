import Stats from 'stats.js';
import { Extensions, Graph, extend } from '../../../src/index';

import { container, height, width } from '../../datasets/const';

export default () => {
  const data = {
    nodes: [],
    edges: [],
  };

  // 随机位置打散
  // for (let i = 1; i <= 100; i++) {
  //   const node = {
  //     id: i,
  //     data: {
  //       x: Math.floor(Math.random() * 800),
  //       y: Math.floor(Math.random() * 600),
  //       preventPolylineEdgeOverlap: i === 1,
  //     },
  //   };
  //   data.nodes.push(node);
  // }

  const count = 10;
  // 生成 10 * 10 网格的点
  for (let i = 1; i <= 100; i++) {
    const row = Math.floor((i - 1) / count) + 1;
    const col = ((i - 1) % count) + 1;
    const node = {
      id: i,
      data: {
        x: col * 180,
        y: row * 160,
        preventPolylineEdgeOverlap: i === 1,
      },
    };
    data.nodes.push(node);
  }

  for (let i = 1; i <= 99; i++) {
    const edge = {
      id: `edge${i}-${i + 1}`,
      source: i,
      target: i + 1,
      data: {
        type: 'polyline-edge',
      },
    };
    data.edges.push(edge);
  }

  const edge: (data: any) => any = (edgeInnerModel: any) => {
    const { id, data } = edgeInnerModel;
    return {
      id,
      data: {
        ...data,
        keyShape: {
          radius: 0,
          offset: 2,
          // controlPoints: [{ x: 600, y: 100 }],
          routeCfg: {
            gridSize: 10,
            maxAllowedDirectionChange: Math.PI / 2,
            enableObstacleAvoidance: true,
          },
        },
        // labelShape: {
        //   text: id,
        // },
      },
    };
  };

  const ExtGraph = extend(Graph, {
    edges: {
      'polyline-edge': Extensions.PolylineEdge,
    },
  });
  const graph = new ExtGraph({
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
          type: 'circle-node',
          keyShape: {
            r: 15,
          },
          labelShape: {
            text: id,
          },
        },
      };
    },
    edge,
  });

  const stats = new Stats();
  stats.showPanel(0);
  const $stats = stats.dom;
  $stats.style.position = 'absolute';
  $stats.style.left = '0px';
  $stats.style.top = '0px';
  document.body.appendChild($stats);
  const update = () => {
    if (stats) {
      stats.update();
    }
    requestAnimationFrame(update);
  };
  update();

  return graph;
};
