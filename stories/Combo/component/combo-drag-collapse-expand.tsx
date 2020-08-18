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
    {
      id: '0',
      label: '0',
      comboId: 'a',
    },
    {
      id: '1',
      label: '1',
      comboId: 'a',
    },
    {
      id: '2',
      label: '2',
      comboId: 'a',
    },
    {
      id: '3',
      label: '3',
      comboId: 'a',
    },
    {
      id: '4',
      label: '4',
      comboId: 'a',
    },
    {
      id: '5',
      label: '5',
      comboId: 'a',
    },
    {
      id: '6',
      label: '6',
      comboId: 'a',
    },
    {
      id: '7',
      label: '7',
      comboId: 'a',
    },
    {
      id: '8',
      label: '8',
      comboId: 'a',
    },
    {
      id: '9',
      label: '9',
      comboId: 'a',
    },
    {
      id: '10',
      label: '10',
      comboId: 'a',
    },
    {
      id: '11',
      label: '11',
      comboId: 'a',
    },
    {
      id: '12',
      label: '12',
      comboId: 'a',
    },
    {
      id: '13',
      label: '13',
      comboId: 'b',
    },
    {
      id: '14',
      label: '14',
      comboId: 'b',
    },
    {
      id: '15',
      label: '15',
      comboId: 'b',
    },
    {
      id: '16',
      label: '16',
      comboId: 'b',
    },
    {
      id: '17',
      label: '17',
      comboId: 'b',
    },
    {
      id: '18',
      label: '18',
      comboId: 'c',
    },
    {
      id: '19',
      label: '19',
      comboId: 'c',
    },
    {
      id: '20',
      label: '20',
      comboId: 'c',
    },
    {
      id: '21',
      label: '21',
      comboId: 'c',
    },
    {
      id: '22',
      label: '22',
      comboId: 'c',
    },
    {
      id: '23',
      label: '23',
      comboId: 'c',
    },
    {
      id: '24',
      label: '24',
      comboId: 'c',
    },
    {
      id: '25',
      label: '25',
      comboId: 'c',
    },
    {
      id: '26',
      label: '26',
      comboId: 'c',
    },
    {
      id: '27',
      label: '27',
      comboId: 'c',
    },
    {
      id: '28',
      label: '28',
      comboId: 'c',
    },
    {
      id: '29',
      label: '29',
      comboId: 'c',
    },
    {
      id: '30',
      label: '30',
      comboId: 'c',
    },
    {
      id: '31',
      label: '31',
      comboId: 'd',
    },
    {
      id: '32',
      label: '32',
      comboId: 'd',
    },
    {
      id: '33',
      label: '33',
      comboId: 'd',
    },
  ],
  edges: [
    {
      source: 'a',
      target: 'b',
      size: 3,
      style: {
        stroke: 'red',
      },
    },
    {
      source: 'a',
      target: '33',
      size: 3,
      style: {
        stroke: 'blue',
      },
    },
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
  combos: [
    {
      id: 'a',
      label: 'combo a',
    },
    {
      id: 'b',
      label: 'combo b',
    },
    {
      id: 'c',
      label: 'combo c',
    },
    {
      id: 'd',
      label: 'combo d',
      parentId: 'b',
    },
    {
      id: 'e',
      label: 'combo e',
    },
  ],
};

const ComboDragCollapseExpand = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 500,
        // fitView: true,
        modes: {
          default: ['drag-combo', 'drag-node', 'zoom-canvas', 'drag-combo'], // , 'collapse-expand-combo'
        },
        layout: {
          type: 'comboForce',
        },
        defaultEdge: {
          size: 1,
          color: '#666',
        },
        defaultCombo: {
          type: 'circle',
          padding: 10,
        },
        comboStateStyles: {
          active: {
            stroke: '#ccc',
          },
        },
        groupByTypes: false,
        animate: true,
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

      graph.data(testData); //testData_pos
      graph.render();
      // const outputData = {
      //   nodes: [],
      //   combos: []
      // };
      // graph.getNodes().forEach((n: any) => {
      //   const node = n.getModel();
      //   console.log(node.x, node.y)
      //   outputData.nodes.push({
      //     id: node.id,
      //     x: node.x,
      //     y: node.y,
      //     comboId: node.comboId,
      //     label: node.label
      //   });
      // })
      // testData.combos.forEach((combo: any) => {
      //   outputData.combos.push({
      //     id: combo.id,
      //     parentId: combo.parentId,
      //     label: combo.label
      //   });
      // });
      // console.log(JSON.stringify(outputData));

      // graph.on('combo:click', e => {
      // graph.uncombo(e.item);
      // graph.removeItem(e.item);
      // });
      graph.on('canvas:click', (e) => {
        //   graph.getCombos().forEach(combo => {
        //     if (!combo.isVisible()) graph.showItem(combo);
        //   });
        graph.addItem('combo', {
          id: 'new combo',
        });
      });
    }
  });
  return <div ref={container}></div>;
};

export default ComboDragCollapseExpand;
