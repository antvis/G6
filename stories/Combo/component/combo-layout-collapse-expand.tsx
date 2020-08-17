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

const testData_noCombo: GraphData = {
  nodes: [
    {
      id: '0',
      label: '0',
      // comboId: 'a',
    },
    {
      id: '1',
      label: '1',
      // comboId: 'a',
    },
    {
      id: '2',
      label: '2',
      // comboId: 'a',
    },
    {
      id: '3',
      label: '3',
      // comboId: 'a',
    },
    {
      id: '4',
      label: '4',
      // comboId: 'a',
    },
    {
      id: '5',
      label: '5',
      // comboId: 'a',
    },
    {
      id: '6',
      label: '6',
      // comboId: 'a',
    },
    {
      id: '7',
      label: '7',
      // comboId: 'a',
    },
    {
      id: '8',
      label: '8',
      // comboId: 'a',
    },
    {
      id: '9',
      label: '9',
      // comboId: 'a',
    },
    {
      id: '10',
      label: '10',
      // comboId: 'a',
    },
    {
      id: '11',
      label: '11',
      // comboId: 'a',
    },
    {
      id: '12',
      label: '12',
      // comboId: 'a',
    },
    {
      id: '13',
      label: '13',
      // comboId: 'b',
    },
    {
      id: '14',
      label: '14',
      // comboId: 'b',
    },
    {
      id: '15',
      label: '15',
      // comboId: 'b',
    },
    {
      id: '16',
      label: '16',
      // comboId: 'b',
    },
    {
      id: '17',
      label: '17',
      // comboId: 'b',
    },
    {
      id: '18',
      label: '18',
      // comboId: 'c',
    },
    {
      id: '19',
      label: '19',
      // comboId: 'c',
    },
    {
      id: '20',
      label: '20',
      // comboId: 'c',
    },
    {
      id: '21',
      label: '21',
      // comboId: 'c',
    },
    {
      id: '22',
      label: '22',
      // comboId: 'c',
    },
    {
      id: '23',
      label: '23',
      // comboId: 'c',
    },
    {
      id: '24',
      label: '24',
      // comboId: 'c',
    },
    {
      id: '25',
      label: '25',
      // comboId: 'c',
    },
    {
      id: '26',
      label: '26',
      // comboId: 'c',
    },
    {
      id: '27',
      label: '27',
      // comboId: 'c',
    },
    {
      id: '28',
      label: '28',
      // comboId: 'c',
    },
    {
      id: '29',
      label: '29',
      // comboId: 'c',
    },
    {
      id: '30',
      label: '30',
      // comboId: 'c',
    },
    {
      id: '31',
      label: '31',
      // comboId: 'd',
    },
    {
      id: '32',
      label: '32',
      // comboId: 'd',
    },
    {
      id: '33',
      label: '33',
      // comboId: 'd',
    },
  ],
  edges: [
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
  // combos: [{
  //   id: 'a',
  //   label: 'combo a'
  // },
  // {
  //   id: 'b',
  //   label: 'combo b'
  // }, {
  //   id: 'c',
  //   label: 'combo c'
  // }, {
  //   id: 'd',
  //   label: 'combo d',
  //   parentId: 'b'
  // },
  // // {
  // //   id: 'e',
  // //   label: 'combo e'
  // // }
  // ]
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
    // {
    //   source: 'a',
    //   target: 'b',
    //   size: 3,
    //   style: {
    //     stroke: 'red'
    //   }
    // },
    // {
    //   source: 'a',
    //   target: '33',
    //   size: 3,
    //   style: {
    //     stroke: 'blue'
    //   }
    // },
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

const testData2: GraphData = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
    },
    {
      id: 'node1',
      x: 101,
      y: 102,
    },
    {
      id: 'node2',
      x: 103,
      y: 101,
    },
    {
      id: 'node3',
      x: 103,
      y: 104,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
    },
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
      target: 'node0',
    },
  ],
};

const testData_pos: GraphData = {
  nodes: [
    { id: '0', x: 519.9756011152062, y: 312.3748588848735, comboId: 'a', label: '0' },
    { id: '1', x: 516.9130868036522, y: 300.01298088318964, comboId: 'a', label: '1' },
    { id: '2', x: 532.135761126721, y: 292.4828444555691, comboId: 'a', label: '2' },
    { id: '3', x: 503.08139107396323, y: 274.4859385079485, comboId: 'a', label: '3' },
    { id: '4', x: 515.7858143951453, y: 288.9459640448524, comboId: 'a', label: '4' },
    { id: '5', x: 523.1699237148887, y: 271.80995614771984, comboId: 'a', label: '5' },
    { id: '6', x: 542.5161585695183, y: 269.44295161957444, comboId: 'a', label: '6' },
    { id: '7', x: 540.3068131495662, y: 312.3305908975899, comboId: 'a', label: '7' },
    { id: '8', x: 540.1624078071186, y: 332.7802388427267, comboId: 'a', label: '8' },
    { id: '9', x: 497.2349390488828, y: 294.6747309770873, comboId: 'a', label: '9' },
    { id: '10', x: 477.27853085824415, y: 310.52154966368073, comboId: 'a', label: '10' },
    { id: '11', x: 498.2935956770408, y: 315.7336916123234, comboId: 'a', label: '11' },
    { id: '12', x: 511.8111914629553, y: 331.4660202536512, comboId: 'a', label: '12' },
    { id: '13', x: 719.9144466443125, y: 657.5827638668379, comboId: 'b', label: '13' },
    { id: '14', x: 705.1704215932026, y: 623.1349052942683, comboId: 'b', label: '14' },
    { id: '15', x: 748.888997314242, y: 693.5395656445546, comboId: 'b', label: '15' },
    { id: '16', x: 691.790150377325, y: 647.2895235684261, comboId: 'b', label: '16' },
    { id: '17', x: 700.453909738154, y: 666.3168884837505, comboId: 'b', label: '17' },
    { id: '18', x: 377.3258580235555, y: 373.66554381437624, comboId: 'c', label: '18' },
    { id: '19', x: 361.8579868952546, y: 350.20312804345934, comboId: 'c', label: '19' },
    { id: '20', x: 380.71103876474103, y: 332.78105195763504, comboId: 'c', label: '20' },
    { id: '21', x: 369.1201243167846, y: 332.02692181101764, comboId: 'c', label: '21' },
    { id: '22', x: 377.8110758618865, y: 350.0158128077823, comboId: 'c', label: '22' },
    { id: '23', x: 359.4471586647803, y: 335.9621566320535, comboId: 'c', label: '23' },
    { id: '24', x: 372.74841352346505, y: 314.6483478876071, comboId: 'c', label: '24' },
    { id: '25', x: 352.7557971300988, y: 331.4794537088405, comboId: 'c', label: '25' },
    { id: '26', x: 344.9855032420906, y: 350.16490710174355, comboId: 'c', label: '26' },
    { id: '27', x: 347.46959717648184, y: 313.6154232044856, comboId: 'c', label: '27' },
    { id: '28', x: 361.4870734755764, y: 322.1957223205074, comboId: 'c', label: '28' },
    { id: '29', x: 329.63246460052113, y: 320.22474499903063, comboId: 'c', label: '29' },
    { id: '30', x: 339.92007768802193, y: 335.1429986552043, comboId: 'c', label: '30' },
    { id: '31', x: 680.1030572348665, y: 679.0745385883383, comboId: 'd', label: '31' },
    { id: '32', x: 701.6575625058663, y: 703.0463672244064, comboId: 'd', label: '32' },
    { id: '33', x: 658.0840704258677, y: 660.8269175948863, comboId: 'd', label: '33' },
  ],
  combos: [
    { id: 'a', label: 'combo a' },
    { id: 'b', label: 'combo b' },
    { id: 'c', label: 'combo c' },
    { id: 'd', parentId: 'b', label: 'combo d' },
  ],
};
const ComboLayoutCollapseExpand = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        // fitView: true,
        modes: {
          default: [
            'drag-canvas',
            'drag-node',
            'zoom-canvas',
            'collapse-expand-combo',
            'drag-combo',
          ], // , 'collapse-expand-combo'
        },
        layout: {
          type: 'comboForce',
        },
        defaultEdge: {
          size: 1,
          color: '#666',
          style: {
            opacity: 0.2,
          },
        },
        defaultCombo: {
          type: 'circle',
          padding: 10,
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

export default ComboLayoutCollapseExpand;
