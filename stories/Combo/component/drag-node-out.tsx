import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    { id: 'node1', x: 350, y: 200, comboId: 'combo1', label: 'node1' },
    { id: 'node2', x: 350, y: 250, comboId: 'combo1', label: 'node2' },
    { id: 'node3', x: 100, y: 200, comboId: 'combo3', label: 'node3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'combo1', target: 'node3' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};

const DragNodeOut = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 600,
        fitCenter: true,
        groupByTypes: false,
        defaultCombo: {
          type: 'circle',
          animate: false,
          style: {
            lineWidth: 1,
          },
          labelCfg: {
            refY: 10,
            position: 'top',
            style: {
              fontSize: 18,
            },
          },
        },
        modes: {
          default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
        },
        comboStateStyles: {
          // the style configurations for the hover state on the combo
          hover: {
            lineWidth: 3,
          },
        },
        nodeStateStyles: {
          // the hover configurations for the hover state on the node
          hover: {
            lineWidth: 3,
          },
        },
      });
      graph.data(data);
      graph.render();

      graph.on('combo:click', (e) => {
        console.log('clicking combo');
      });
      graph.on('node:click', (e) => {
        console.log('clicking node!!!');
      });
      graph.on('text-shape:click', (e) => {
        console.log('clicking text-shape-----');
      });
    }
  });
  return <div ref={container}></div>;
};

export default DragNodeOut;
