import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { NodeConfig, EdgeConfig } from '../../../src/types';

let graph: IGraph = null;

G6.registerNode(
  'file-node',
  {
    draw(cfg: NodeConfig, group) {
      const keyShape = group.addShape('rect', {
        attrs: {
          x: cfg.x - 4,
          y: cfg.y - 14,
          fill: '#fff',
          stroke: '#666',
        },
        className: 'node-rect',
      });

      if (cfg.children && cfg.children.length > 0) {
        group.addShape('marker', {
          attrs: {
            symbol: 'triangle-down',
            x: cfg.x + 4,
            y: cfg.y - 2,
            r: 4,
            fill: '#666',
          },
        });
      }

      const shape = group.addShape('text', {
        attrs: {
          x: cfg.x + 15,
          y: cfg.y + 4,
          text: cfg.label,
          fill: '#666',
          fontSize: 16,
          textAlign: 'left',
        },
      });

      const bbox = shape.getBBox();

      group.addShape('text', {
        attrs: {
          x: cfg.x + bbox.width + 20,
          y: cfg.y + 40,
          text: '详情',
          fill: '#651466',
          fontSize: 16,
          textAlign: 'right',
        },
        className: 'detail-text',
      });

      keyShape.attr({
        width: bbox.width + 40,
        height: bbox.height + 45,
      });

      return keyShape;
    },
  },
  'single-node',
);

G6.registerEdge(
  'step-line',
  {
    getControlPoints: function getControlPoints(cfg: EdgeConfig) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      return [
        {
          x: startPoint.x,
          y: endPoint.y,
        },
      ];
    },
  },
  'polyline',
);

const DefaultShape = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        linkCenter: true,
        modes: {
          default: ['collapse-expand', 'zoom-canvas', 'drag-canvas'],
        },
        defaultNode: {
          type: 'file-node',
        },
        defaultEdge: {
          type: 'step-line',
        },
        nodeStateStyles: {
          hover: {
            fill: '#83AFFD',
            stroke: '#5B8FF9',
          },
          select: {
            fill: '#4ab334',
            lineWidth: 2,
            stroke: '#5B8FF9',
          },
        },
        layout: {
          type: 'indented',
          isHorizontal: true,
          direction: 'LR',
          indent: 70,
          getHeight: function getHeight() {
            return 20;
          },

          getWidth: function getWidth() {
            return 20;
          },
        },
      });
    }

    const data = {
      id: '1',
      label: '域服务-创建计划',
      children: [
        {
          id: '1-3',
          label: '计划信息初始化',
          children: [],
        },
        {
          id: '1-2',
          label: '计划信息校验',
          children: [],
        },
        {
          id: '1-1',
          label: '计划信息保存',
          children: [
            {
              id: '1-1-1',
              label: '基本信息初始化',
            },
            {
              id: '1-1-2',
              label: '投放时间信息初始化',
            },
          ],
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.on('node:click', (ev) => {
      //const clickNodes = graph.findAllByState('node', 'click');

      //clickNodes.forEach(cn => {
      //graph.setItemState(cn, 'click', false);
      // });

      const nodeItem = ev.item;
      graph.setItemState(nodeItem, 'select', true);
    });

    graph.on('node:mouseenter', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    });
  });

  return <div ref={container}></div>;
};

export default DefaultShape;
