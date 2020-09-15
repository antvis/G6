import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import Chart from '@antv/chart-node-g6';

G6.registerNode(
  'node-with-line',
  {
    draw(cfg, group) {
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

      const view = new Chart({
        group,
        padding: 5,
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

      view.data(cfg.trendData as any);

      (view as any).point().position('genre*sold').color('#4FAAEB');

      (view as any).line().position('genre*sold').color('#9AD681').shape('dash');

      view.legend('genre', false);

      view.axis('sold', false);

      view.render();

      return keyShape;
    },
    update: null,
  },
  'single-node',
);

let graph: IGraph = null;

const LineChart = () => {
  const container = React.useRef();
  const trendData1 = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  const trendData2 = [
    { genre: 'Sports', sold: 75 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 320 },
    { genre: 'Shooter', sold: 150 },
    { genre: 'Other', sold: 250 },
  ];

  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
        trendData: trendData1,
      },
      {
        id: '5',
        label: '5',
        trendData: trendData2,
      },
    ],
    edges: [
      {
        source: '0',
        target: '5',
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
          type: 'node-with-line',
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

    graph.on('node:click', (evt) => {
      graph.setItemState(evt.item, 'hover', true);
    });
  });

  const handleUpdateData = () => {
    const data = {
      nodes: [
        {
          id: '0',
          label: '0',
          trendData: trendData2,
        },
      ],
    };

    graph.changeData(data);
  };

  return (
    <div ref={container}>
      <button onClick={handleUpdateData}>更新数据源</button>
    </div>
  );
};

export default LineChart;
