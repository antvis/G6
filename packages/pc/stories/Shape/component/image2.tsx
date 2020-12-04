import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const Image2 = () => {
  const container = React.useRef();
  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
        type: 'image',
        size: [100, 100],
        clipCfg: {
          show: true,
          type: 'path',
        },
      },
      {
        id: '5',
        label: '5',
        type: 'image',
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
          type: 'rect',
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF',
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
      });
    }

    graph.data(data);
    graph.render();
  });

  return <div ref={container}></div>;
};

export default Image2;
