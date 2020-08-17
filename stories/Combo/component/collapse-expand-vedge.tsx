import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const colors = {
  a: '#BDD2FD',
  b: '#BDEFDB',
  c: '#C2C8D5',
  d: '#FBE5A2',
  e: '#F6C3B7',
  f: '#B6E3F5',
  g: '#D3C6EA',
  h: '#FFD8B8',
  i: '#AAD8D8',
  j: '#FFD6E7',
};

const testData: GraphData = {
  nodes: [
    // {
    //   id: '0',
    //   label: '0',
    //   comboId: 'a',
    //   x: 100,
    //   y: 100
    // },
    // {
    //   id: '1',
    //   label: '1',
    //   comboId: 'a',
    //   x: 150,
    //   y: 140
    // },
    {
      id: '2',
      label: '2',
      comboId: 'b',
      x: 300,
      y: 200,
    },
    {
      id: '3',
      label: '3',
      comboId: 'b',
      x: 370,
      y: 260,
    },
    {
      id: '4',
      label: '4',
      comboId: 'c',
      x: 360,
      y: 510,
    },
    {
      id: '5',
      label: '5',
      comboId: 'd',
      x: 120,
      y: 510,
    },
  ],
  edges: [
    // {
    //   source: 'a',
    //   target: 'b',
    //   size: 3,
    //   style: {
    //     stroke: 'red'
    //   }
    // },
    // {
    //   source: 'b',
    //   target: '1',
    //   size: 3,
    //   style: {
    //     stroke: 'blue'
    //   }
    // },
    // {
    //   source: '0',
    //   target: '1',
    // },
    // {
    //   source: '0',
    //   target: '2',
    // },
    // {
    //   source: '0',
    //   target: '3',
    // },
    // {
    //   source: '3',
    //   target: '5',
    // },
    // {
    //   source: '4',
    //   target: '1',
    // },
    // {
    //   source: '0',
    //   target: '5',
    // },
    {
      source: '5',
      target: '4',
    },
    {
      source: '3',
      target: '5',
    },
  ],
  combos: [
    //   {
    //   id: 'a',
    //   label: 'combo a'
    // },
    {
      id: 'b',
      label: 'combo b',
    },
    {
      id: 'c',
      label: 'combo c',
      parentId: 'b',
    },
    {
      id: 'd',
      label: 'combo d',
      // parentId: 'c'
    },
  ],
};

const CollapseExpandVEdge = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        fitView: true,
        modes: {
          default: ['drag-combo', 'drag-node', 'zoom-canvas', 'collapse-expand-combo'],
        },
        defaultEdge: {
          size: 1,
          color: '#666',
          style: {
            endArrow: true,
          },
        },
        defaultCombo: {
          type: 'circle',
          //padding: 1
        },
        groupByTypes: false,
        //animate: true
      });

      graph.node((node) => {
        const color = colors[node.comboId as string];
        return {
          size: 20,
          style: {
            lineWidth: 2,
            stroke: '#ccc',
            fill: color,
          },
        };
      });
      graph.combo((combo) => {
        const color = colors[combo.id as string];
        return {
          // size: 80,
          style: {
            lineWidth: 2,
            stroke: color,
            fillOpacity: 0.8,
          },
        };
      });

      graph.get('canvas').set('localRefresh', false);
      graph.data(testData); //testData_pos
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default CollapseExpandVEdge;
