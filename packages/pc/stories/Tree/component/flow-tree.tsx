import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { EdgeConfig } from '../../../src/types';

var data = {
  nodes: [
    {
      id: '0',
      label: '节点名称1',
      _row: 1, // 第一层
      _content: '22222222,222人',
      x: 20,
      y: 50,
      anchorPoints: [[1, 0.5]],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1',
      label: '节点名称1',
      _content: '11111111,111人',
      _row: 1,
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
      _row: 1,
      x: 170,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      type: 'nodeLabel',
    },
    {
      id: '1_1',
      label: '节点名称1',
      _row: 2, // 第二层
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
      _row: 2,
      x: 170,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      type: 'nodeLabel',
    },
    {
      id: '2',
      label: '节点名称1',
      _row: 1,
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
      _row: 1,
      x: 320,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      type: 'nodeLabel',
    },
    {
      id: '2_1',
      label: '节点名称1',
      _row: 2,
      x: 320,
      y: 100,
      anchorPoints: [[0, 0.5]],
    },
    {
      id: '2_1__',
      label: '50%',
      _row: 2,
      x: 320,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      type: 'nodeLabel',
    },
    {
      id: '3',
      label: '节点名称1',
      _row: 1,
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
      _row: 1,
      x: 470,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      type: 'nodeLabel',
    },
    {
      id: '3_1',
      label: '节点名称',
      _row: 2,
      x: 470,
      y: 100,
      anchorPoints: [[0, 0.5]],
    },
    {
      id: '3_1__',
      label: '30%',
      _row: 2,
      x: 470,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      type: 'nodeLabel',
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
      type: 'hvh',
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
      type: 'hvh',
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
      type: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
  ],
};

G6.registerNode(
  'operation',
  {
    drawShape: function (cfg, group) {
      var otherProps =
        cfg._row === 1
          ? { stroke: '#13C2C2', fill: '#E6FFFB' }
          : { stroke: '#1890FF', fill: '#E6F7FF' };

      var rect = group.addShape('rect', {
        attrs:
          cfg._row === 1
            ? {
                x: cfg.x,
                y: cfg._content ? cfg.y - 10 : cfg.y,
                width: 150,
                height: cfg._content ? 48 : 28,
                radius: cfg._content ? 4 : 12,
                stroke: '#1890FF',
                fill: '#E6F7FF',
                fillOpacity: 0.4,
                lineWidth: 2,
              }
            : {
                x: cfg.x,
                y: cfg._content ? cfg.y - 10 : cfg.y,
                width: 150,
                height: cfg._content ? 48 : 28,
                radius: cfg._content ? 24 : 12,
                stroke: '#13C2C2',
                fill: '#E6FFFB',
                fillOpacity: 0.4,
                lineWidth: 2,
              },
      });

      var bbbox = rect.getBBox();
      return rect;
    },
    drawLabel: function (cfg, group) {
      var label = group.addShape('text', {
        position: 'center',
        attrs: {
          x: cfg.x + 75,
          y: cfg.y + 14,
          position: 'center',
          text: cfg._content ? `${cfg.label}${cfg._content}` : cfg.label,
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
  'single-shape',
);

G6.registerNode(
  'nodeLabel',
  {
    drawShape: function (cfg, group) {
      var otherProps =
        cfg._row !== 2
          ? { stroke: '#1890FF', fill: '#E6F7FF' }
          : { stroke: '#13C2C2', fill: '#E6FFFB' };

      var rect = group.addShape('rect', {
        attrs:
          cfg._row === 1
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
  'single-shape',
);

G6.registerEdge('hh', {
  draw(cfg, group) {
    return this.drawShape(cfg, group);
    // if (cfg.label) {
    //   // this.drawLabel(cfg, group);
    // }
  },
  drawShape(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const shape = group.addShape('path', {
      attrs: {
        stroke: '#41A9FF',
        endArrow: {
          path: 'M 5,0 L -5,-5 L -5,5',
          d: 5,
        },
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ],
      },
    });

    return shape;
  },
  drawLabel: function (cfg, group) {
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
    // if (cfg.label) {
    //   // this.drawLabel(cfg, group);
    // }
  },
  drawShape(cfg: EdgeConfig, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const shape = group.addShape('path', {
      attrs: {
        stroke: '#13C2C2',
        endArrow: {
          path: 'M 5,0 L -5,-5 L -5,5',
          d: 5,
        },
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
          ['L', endPoint.x, endPoint.y],
        ],
      },
    });

    return shape;
  },
  drawLabel: function (cfg, group) {
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

let graph: IGraph = null;

const FlowTree = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current,
        width: window.innerWidth,
        height: window.innerHeight,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        defaultNode: {
          type: 'operation',
          labelCfg: {
            position: 'right',
            style: {
              fill: '#666',
              stroke: '#FFF',
              fontSize: 14,
              // fontWeight: 'bold'
            },
          },
        },
        defaultEdge: {
          type: 'hh',
          style: {
            lineWidth: 1,
            stroke: '#41A9FF',
            endArrow: {
              path: 'M 0,0 L 0,5 L 10,0 L 0 -5',
              // d: 5
            },
            position: 'right',
          },
          labelCfg: {
            position: 'right',
            style: {
              position: 'right',
              textAlign: 'right',
              offset: -50,
              textBaseline: 'middle',
              fill: '#41A9FF',
              stroke: '#41A9FF',
              fontSize: 12,
            },
          },
        },
      });
    }

    graph.data(data);
    graph.render();
  }, []);
  return <div ref={container}></div>;
};

export default FlowTree;
