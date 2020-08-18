import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const FruchtermanWorkerLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 1000,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        layout: {
          type: 'fruchterman',
          maxIteration: 8000,
          gravity: 1,
          workerEnabled: true,
        },
        animate: true,
        defaultNode: {
          size: 10,
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#666',
          style: {
            opacity: 0.1,
          },
        },
      });

      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json',
      )
        .then((res) => res.json())
        .then((data) => {
          graph.data(data);
          graph.render();
        });
    }
  });
  return <div ref={container}></div>;
};

export default FruchtermanWorkerLayout;
