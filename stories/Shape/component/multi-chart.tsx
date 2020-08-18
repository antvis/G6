import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import Chart from '@antv/chart-node-g6';

G6.registerNode(
  'node-with-multchart',
  {
    draw(cfg, group) {
      const canvas = group.get('canvas');
      const keyShape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 400,
          height: 200,
          fill: cfg.style.fill,
        },
      });

      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 400,
          height: 40,
          fill: '#69c0ff',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '浏览申请完成率',
          x: 10,
          y: 25,
          fontSize: 14,
          fill: '#fff',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '2020-06-07 ~ 2020-06-14 | 均值',
          x: 20,
          y: 70,
          fontSize: 13,
          fill: '#8c8c8c',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '8.8%',
          x: 20,
          y: 110,
          fontSize: 30,
          fill: '#000',
        },
      });

      const chart = new Chart({
        group,
        region: {
          start: {
            x: 0.01,
            y: 0.2,
          },
          end: {
            x: 0.8,
            y: 0.35,
          },
        },
      });

      chart.data(cfg.trendData as any);

      (chart as any).point().position('月份*月均降雨量').color('name');

      (chart as any).line().position('月份*月均降雨量').color('name').shape('dash');

      (chart as any)
        .interval()
        .position('月份*月均降雨量')
        .color('name')
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);
      chart.legend(false);

      chart.axis('月均降雨量', false);

      chart.render();

      return keyShape;
    },
    update: null,
  },
  'single-node',
);

let graph: IGraph = null;

const MultiChart = () => {
  const container = React.useRef();
  const trendData = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ];

  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
        trendData: trendData,
      },
    ],
  };
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'DL',
          nodesepFunc: () => 1,
          ranksepFunc: () => 1,
        },
        defaultNode: {
          // size: [30, 20],
          type: 'node-with-multchart',
          style: {
            fill: '#e6f7ff',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 4,0 L -4,-4 L -4,4 Z',
              d: 4,
            },
          },
        },
        nodeStateStyles: {
          hover: {
            stroke: 'red',
          },
        },
      });
    }

    graph.data(data);
    graph.render();
  });

  return <div ref={container}></div>;
};

export default MultiChart;
