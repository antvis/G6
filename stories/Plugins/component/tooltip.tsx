import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
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

const Tooltip = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const tooltip = new G6.Tooltip({
        offsetX: 0,
        offsetY: 100, // the height of the top div
        shouldBegin: d => {
          if (d.target.get('name') === 'text-shape') return true;
          return false;
        }
      });
      graph = new Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        plugins: [tooltip],
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          size: 50
        }
      });
      graph.data(data);
      graph.render();
      let width = 500,
        height = 500;
      graph.on('canvas:click', (evt) => {
        width += 100;
        height += 50;
        graph.changeSize(width, height);
      });
      graph.on('node:click', (e) => {
        graph.removeItem(e.item);
      });
      graph.on('edge:click', (e) => {
        graph.removeItem(e.item);
      });
    }
  });
  return (
    <div>
      <div style={{ backgroundColor: '#000', width: '100px', height: '100px' }}></div>
      <div style={{ left: '100px' }} ref={container}></div>
    </div>
  );
};

export default Tooltip;
