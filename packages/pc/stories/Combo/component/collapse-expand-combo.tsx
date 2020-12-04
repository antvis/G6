import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A',
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
      comboId: 'B',
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
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
  combos: [
    {
      id: 'A',
      parentId: 'B',
      label: 'gorup A',
      padding: [10, 10, 10, 10],
      // type: 'rect'
    },
    {
      id: 'B',
      // parentId: 'C',
      label: 'gorup B',
      // padding: [50, 10, 10, 50]
      // type: 'rect'
    },
    // {
    //   id: 'C',
    //   label: 'gorup C',
    //   // type: 'rect'
    // },
    {
      id: 'D',
      label: 'gorup D',
      // type: 'rect'
    },
    {
      id: 'E',
      // type: 'rect'
    },
  ],
};

const CollapseExpand = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        modes: {
          default: [
            'drag-canvas',
            'collapse-expand-combo',
            'drag-combo',
            {
              type: 'drag-node',
              onlyChangeComboSize: true,
            },
          ],
        },
        defaultCombo: {
          // size: [100, 100],
          style: {
            fill: '#ccc',
            stroke: '#000',
            opacity: 0.8,
          },
        },
        // defaultNode: {
        //   type: 'custom-node'
        // }
        //   comboStateStyles: {
        //     selected: {
        //       'text-shape': {
        //         fill: '#f00',
        //         fontSize: 20
        //       },
        //       fill: '#f00'
        //     },
        //     state2: {
        //       stroke: '#0f0'
        //     }
        //   }
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default CollapseExpand;
