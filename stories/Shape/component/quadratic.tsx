import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      name: 'name1',
      x: 100,
      y: 110,
    },
    {
      id: '2',
      name: 'name2',
      x: 400,
      y: 110,
    },
    {
      id: '3',
      name: 'name3',
      x: 210,
      y: 400,
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      type: 'polyline',
      curveOffset: -150,
      curvePosition: 0.5,
    },
    {
      source: '1',
      target: '3',
    },
  ],
};
const Quadratic = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        // layout: {
        //   type: "dagre",
        //   rankdir: "TB",
        //   align: "UL",
        //   nodesep: 25,
        //   ranksep: 50,
        //   controlPoints: true
        // },
        defaultEdge: {
          type: 'cubic-horizontal',
          // curveOffset: [-50, 50],
          // curvePosition: [9 / 10, 1 / 10]
          // curveOffset: 100,
          curvePosition: 0.9,
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

export default Quadratic;
