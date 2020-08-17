import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 250,
      y: 150,
      comboId: 'combo',
    },
    {
      id: 'node2',
      label: 'node2',
      x: 350,
      y: 150,
      comboId: 'combo',
    },
  ],
  combos: [
    {
      id: 'combo',
      label: 'Combo ',
    },
    {
      id: 'combo1',
      label: 'Combo',
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'combo',
      target: 'combo1',
    },
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
