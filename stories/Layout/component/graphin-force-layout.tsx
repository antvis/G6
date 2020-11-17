import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const GraphinForceLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'graphinForce',
        },
        defaultNode: {
          size: 15,
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
        },
        modes: {
          default: ['drag-canvas'],
        },
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
        .then((res) => res.json())
        .then((data) => {
          graph.data({
            nodes: data.nodes,
            edges: data.edges.map(function (edge, i) {
              edge.id = 'edge' + i;
              return Object.assign({}, edge);
            }),
          });

          graph.render();
        });
    }
  });
  return <div ref={container}></div>;
};

export default GraphinForceLayout;
