import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      name: 'name1',
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
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
          loopCfg: {
            position: 'left',
            dist: 75,
            clockwise: true,
          },
        },
        modes: {
          default: ['drag-node'],
        },
      });
      graph.data(data);
      graph.render();
    }
  });

  return <div ref={container}></div>;
};

export default Polyline;
