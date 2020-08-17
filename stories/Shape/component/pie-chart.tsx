import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import Chart from '@antv/chart-node-g6';

G6.registerNode(
  'node-with-pie',
  {
    draw(cfg, group) {
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 100,
          fill: cfg.style.fill,
          stroke: cfg.style.stroke,
        },
      });

      const view = new Chart({
        group,
        region: {
          start: {
            x: -0.22,
            y: -0.2,
          },
          end: {
            x: 0.25,
            y: 0.2,
          },
        },
      });

      view.data(cfg.trendData as any);

      (view as any)
        .interval()
        .position('year*population')
        .label('year', {
          offset: -15,
        })
        .color('year')
        .style({
          lineWidth: 1,
          stroke: '#95de64',
          fontSize: 8,
        });

      view.axis(false);

      view.legend(false);

      // 极坐标下的柱状图
      view.coordinate('polar');

      view.render();

      keyShape.set('intervalView', view);

      return keyShape;
    },
    update(cfg, item) {
      const keyShape = item.getKeyShape();
      const view = keyShape.get('intervalView');
      view.changeData(cfg.trendData);
    },
  },
  'single-node',
);

let graph: IGraph = null;

const PieChart = () => {
  const container = React.useRef();
  const trendData1 = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 38 },
    { year: '2003', population: 33.7 },
    { year: '2004', population: 30.7 },
    { year: '2005', population: 25.8 },
    { year: '2006', population: 31.7 },
    { year: '2007', population: 33 },
    { year: '2008', population: 46 },
    { year: '2009', population: 38.3 },
    { year: '2010', population: 28 },
    { year: '2011', population: 42.5 },
    { year: '2012', population: 30.3 },
  ];

  const trendData2 = [
    { year: '2001', population: 11.8 },
    { year: '2002', population: 28 },
    { year: '2003', population: 43.7 },
    { year: '2004', population: 50.7 },
    { year: '2005', population: 15.8 },
    { year: '2006', population: 21.7 },
    { year: '2007', population: 13 },
    { year: '2008', population: 26 },
    { year: '2009', population: 18.3 },
    { year: '2010', population: 58 },
    { year: '2011', population: 62.5 },
    { year: '2012', population: 10.3 },
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
          default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
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
          type: 'node-with-pie',
          style: {
            fill: '#fff',
            stroke: '#69c0ff',
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

export default PieChart;
