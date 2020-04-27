import React, { useEffect } from 'react';
import { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

const AnimateFitView = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        },
        animate: true,
        fitView: true
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default AnimateFitView;
