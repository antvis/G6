import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      name: 'name1',
      type: 'test-rect',
      style: {
        fill: 'red',
      },
    },
    {
      id: '2',
      name: 'name2',
    },
    {
      id: '3',
      name: 'name3',
    },
    {
      id: '4',
      name: 'name4',
    },
    {
      id: '5',
      name: 'name5',
    },
    {
      id: '6',
      name: 'name6',
    },
    {
      id: '7',
      name: 'name7',
    },
    {
      id: '8',
      name: 'name8',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '6',
      target: '8',
    },
  ],
};

G6.registerNode(
  'test-rect',
  {
    options: {
      // linkPoints: {}
    },
    afterDraw(cfg, group) {
      console.log('draw done');
    },
  },
  'star',
);

const Polyline = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'UL',
          nodesep: 25,
          ranksep: 50,
          controlPoints: true,
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 20,
            endArrow: {
              path: G6.Arrow.triangle(15, 20, 10),
              d: 20,
              fill: '#A3B1BF',
            },
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
          loopCfg: {
            position: 'left',
            dist: 75,
            clockwise: true,
          },
        },
        edgeStateStyles: {
          hover: {
            stroke: '#1890ff',
            lineWidth: 2,
            endArrow: {
              path: G6.Arrow.triangle(45, 45, 10),
              d: 34,
              fill: 'red',
            },
          },
          selected: {
            stroke: 'green',
          },
        },
        modes: {
          default: ['drag-node'],
        },
      });
      graph.data(data);
      graph.render();

      graph.on('edge:mouseenter', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'selected', true);
        graph.setItemState(item, 'hover', true);
      });

      graph.on('edge:mouseleave', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'hover', false);
        graph.setItemState(item, 'selected', false);
      });
    }
  });

  return <div ref={container}></div>;
};

export default Polyline;
