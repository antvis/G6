import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { EdgeConfig } from '../../../src/types';

let graph: IGraph = null;
const data = {
  nodes: [
    {
      id: '0',
      label: '流程1',
      row: 1, // 第一层
      content: '22222222,222',
      x: 20,
      y: 50,
      anchorPoints: [[1, 0.5]],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1',
      label: '流程2',
      content: '11111111,111',
      row: 1,
      x: 170,
      y: 50,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1__',
      label: '80%',
      row: 1,
      x: 170,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '1_1',
      label: '分支1',
      row: 2, // 第二层
      x: 170,
      y: 100,
      anchorPoints: [[0, 0.5]],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1_1__',
      label: '70%',
      row: 2,
      x: 170,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '2',
      label: '流程3',
      row: 1,
      x: 320,
      y: 50,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: '2__',
      label: '60%',
      row: 1,
      x: 320,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '2_1',
      label: '分支2',
      row: 2,
      x: 320,
      y: 100,
      anchorPoints: [[0, 0.5]],
    },
    {
      id: '2_1__',
      label: '50%',
      row: 2,
      x: 320,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '3',
      label: '流程4',
      row: 1,
      x: 470,
      y: 50,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: '3__',
      label: '40%',
      row: 1,
      x: 470,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '3_1',
      label: '分支3',
      row: 2,
      x: 470,
      y: 100,
      anchorPoints: [[0, 0.5]],
    },
    {
      id: '3_1__',
      label: '30%',
      row: 2,
      x: 470,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
  ],
  edges: [
    {
      id: '0-1',
      source: '0',
      target: '1',
      sourceAnchor: 0, // 指定起始的连接点锚点
      targetAnchor: 0, // 指定终止的连接点锚点
    },
    {
      id: '0-1_1',
      source: '0',
      target: '1_1',
      shape: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '1-2',
      source: '1',
      target: '2',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '1-2_1',
      source: '1',
      target: '2_1',
      shape: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '2-3',
      source: '2',
      target: '3',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '2-3_1',
      source: '2',
      target: '3_1',
      shape: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
  ],
};

G6.registerNode(
  'operation',
  {
    drawShape: function (cfg, group) {
      var rect = group.addShape('rect', {
        attrs:
          cfg.row === 1
            ? {
                x: cfg.x,
                y: cfg.content ? cfg.y - 10 : cfg.y,
                width: 150,
                height: cfg.content ? 48 : 28,
                radius: cfg.content ? 4 : 12,
                stroke: '#1890FF',
                fill: '#E6F7FF',
                fillOpacity: 0.4,
                lineWidth: 2,
              }
            : {
                x: cfg.x,
                y: cfg.content ? cfg.y - 10 : cfg.y,
                width: 150,
                height: cfg.content ? 48 : 28,
                radius: cfg.content ? 24 : 12,
                stroke: '#13C2C2',
                fill: '#E6FFFB',
                fillOpacity: 0.4,
                lineWidth: 2,
              },
      });

      return rect;
    },
    drawLabel: function (cfg: any, group) {
      var label = group.addShape('text', {
        position: 'center',
        attrs: {
          x: cfg.x + 75,
          y: cfg.y + 14,
          position: 'center',
          text: cfg.content ? cfg.label + cfg.content : cfg.label,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#666',
          stroke: '#FFF',
          fontSize: 12,
        },
      });
      return label;
    },
  },
  'single-node',
);

G6.registerNode(
  'nodeLabel',
  {
    drawShape: function (cfg, group) {
      var rect = group.addShape('rect', {
        attrs:
          cfg.row === 1
            ? {
                x: cfg.x - 70,
                y: cfg.y + 4,
                width: 50,
                height: 20,
                radius: 4,
                stroke: '#1890FF',
                fill: '#1890FF',
                lineWidth: 2,
              }
            : {
                x: cfg.x - 70,
                y: cfg.y + 4,
                width: 50,
                height: 20,
                radius: 4,
                stroke: '#13C2C2',
                fill: '#13C2C2',
                lineWidth: 2,
              },
      });
      return rect;
    },
    drawLabel: function (cfg, group) {
      var label = group.addShape('text', {
        position: 'center',
        attrs: {
          x: cfg.x - 45,
          y: cfg.y + 14,
          position: 'center',
          text: cfg.label,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#fff',
          stroke: '#fff',
          fontSize: 12,
        },
      });
      return label;
    },
  },
  'single-node',
);

G6.registerEdge('hh', {
  draw(cfg, group) {
    return this.drawShape(cfg, group);
  },
  drawShape(cfg: EdgeConfig, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const shape = group.addShape('path', {
      attrs: {
        stroke: '#41A9FF',
        endArrow: {
          path: 'M 0 0 L 0, -5 L -10, 0, L 0, 5 Z',
          fill: '#41A9FF',
        },
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x - 10, endPoint.y],
        ],
      },
    });

    return shape;
  },
  drawLabel: function (cfg: EdgeConfig, group) {
    const endPoint = cfg.endPoint;
    var label = group.addShape('text', {
      position: 'right',
      attrs: {
        x: endPoint.x - 20,
        y: endPoint.y,
        position: 'right',
        textAlign: 'right',
        text: cfg.label,
        textBaseline: 'middle',
        fill: '#fff',
        stroke: '#fff',
        fontSize: 12,
      },
    });
    return label;
  },
});

G6.registerEdge('hvh', {
  draw(cfg, group) {
    return this.drawShape(cfg, group);
  },
  drawShape(cfg: EdgeConfig, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const shape = group.addShape('path', {
      attrs: {
        stroke: '#13C2C2',
        endArrow: {
          path: 'M 0 0 L 0, -5 L -10, 0, L 0, 5 Z',
          fill: '#13C2C2',
        },
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
          ['L', endPoint.x - 10, endPoint.y],
        ],
      },
    });

    return shape;
  },
  drawLabel: function (cfg: EdgeConfig, group) {
    const endPoint = cfg.endPoint;
    var label = group.addShape('text', {
      position: 'right',
      attrs: {
        x: endPoint.x - 20,
        y: endPoint.y,
        position: 'right',
        textAlign: 'right',
        text: cfg.label,
        textBaseline: 'middle',
        fill: '#fff',
        stroke: '#fff',
        fontSize: 12,
      },
    });
    return label;
  },
});

const SelfTress = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 500,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          shape: 'operation',
          labelCfg: {
            position: 'right',
            style: {
              fill: '#666',
              stroke: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
        },
        defaultEdge: {
          shape: 'hh',
          style: {
            stroke: '#41A9FF',
            lineWidth: 1,
          },
          labelCfg: {
            position: 'right',
            style: {
              position: 'right',
              textAligh: 'right',
              offset: -50,
              textBaseline: 'middle',
              fill: '#41A9FF',
              stroke: '#41A9FF',
              fontSize: 12,
            },
          },
        },
      });

      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default SelfTress;
