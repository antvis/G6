import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
const colorMap = {
  A: '#72CC4A',
  B: '#1A91FF',
  C: '#FFAA15',
};
const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
    },
    {
      id: '2',
      label: '公司2',
    },
    {
      id: '3',
      label: '公司3',
    },
    {
      id: '4',
      label: '公司4',
    },
    {
      id: '5',
      label: '公司5',
    },
    {
      id: '6',
      label: '公司6',
    },
    {
      id: '7',
      label: '公司7',
    },
    {
      id: '8',
      label: '公司8',
    },
    {
      id: '9',
      label: '公司9',
    },
  ],
  edges: [
    {
      source: '1',
      target: '1',
      type: 'loop',
    },
    {
      source: '2',
      target: '2',
      type: 'loop',
    },
    {
      source: '1',
      target: '2',
      data: {
        type: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '3',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '2',
      target: '5',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '5',
      target: '6',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '3',
      target: '4',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '4',
      target: '7',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '8',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '9',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

let graph: IGraph = null;

const ForceLoop = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'force',
        },
        defaultEdge: {
          type: 'quadratic',
        },
      });
      data.nodes.forEach((node: any) => {
        node.x = 0;
        node.y = 0;
      });

      graph.data(data);
      graph.render();
      graph.on('afterlayout', () => {
        graph.fitView();
      });
    }
  });

  return <div ref={container}></div>;
};

export default ForceLoop;
