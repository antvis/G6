import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      label: 'node1',
    },
    {
      id: '2',
      label: 'node2',
    },
    {
      id: '3',
      label: 'node3',
    },
    {
      id: '4',
      label: 'node4',
    },
    {
      id: '5',
      label: 'node5',
    },
    {
      id: '6',
      label: 'node6',
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
      target: '3',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '1',
      target: '5',
    },
  ],
};

const DragCanvas = () => {
  const container = React.useRef();
  const grid = new G6.Grid();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 500,
        minZoom: 0.001,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        plugins: [grid],
      });
      graph.data(data);
      graph.render();
    }
  });
  return (
    <div>
      {/* <input value='123123123' /> */}
      <div ref={container}></div>
    </div>
  );
};

export default DragCanvas;
