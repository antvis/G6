import React, { useEffect } from 'react';
import { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 10,
      y: 20,
    },
    {
      id: 'node2',
      label: 'node2',
      x: 10,
      y: 30,
    },
    {
      id: 'node3',
      label: 'node3',
      x: 20,
      y: 20,
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
          default: ['drag-canvas', 'zoom-canvas'],
        },
        layout: {
          type: 'dagre',
        },
        animate: true,
        fitView: true,
      });
      graph.data(data);
      graph.render();

      graph.on('canvas:click', () => {
        graph.updateLayout({
          type: 'fruchterman',
        });
      });
    }
  });
  return <div ref={container}></div>;
};

export default AnimateFitView;
