import G6, { Algorithm } from '../../../src';
import { GraphData } from '../../../src/types';
const { labelPropagation } = Algorithm;

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data1: GraphData = {
  nodes: [
    {
      id: 'A',
    },
    {
      id: 'B',
    },
    {
      id: 'C',
    },
    {
      id: 'D',
    },
    {
      id: 'E',
    },
    {
      id: 'F',
    },
    {
      id: 'G',
    },
    {
      id: 'H',
    },
    {
      id: 'I',
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B',
    },
    {
      source: 'A',
      target: 'G',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'C',
      target: 'G',
    },
    {
      source: 'A',
      target: 'D',
    },
    {
      source: 'A',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'F',
      target: 'D',
    },
    {
      source: 'H',
      target: 'I',
    },
    {
      source: 'A',
      target: 'I',
    },
  ],
};

let colorMap = {
  g2: '#BDD2FD',
  g19: '#BDEFDB',
  g36: '#F6C3B7',
  g46: '#FFD8B8',
  g48: '#D3C6EA',
  g53: '#CCC',
  g57: '#a00',
  g67: '#0a0',
  g75: '#00a',
  g76: '#000',
};

const colorArray = [
  'rgb(91, 143, 249)',
  'rgb(90, 216, 166)',
  'rgb(93, 112, 146)',
  'rgb(246, 189, 22)',
  'rgb(232, 104, 74)',
  'rgb(109, 200, 236)',
  'rgb(146, 112, 202)',
  'rgb(255, 157, 77)',
  'rgb(38, 154, 153)',
  'rgb(227, 137, 163)',
];

describe('label propagation', () => {
  it('simple label propagation', () => {
    const data: GraphData = {
      nodes: [
        { id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' },
        { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }, { id: '9' },
        { id: '10' }, { id: '11' }, { id: '12' }, { id: '13' }, { id: '14' },
      ],
      edges: [
        { source: '0', target: '1' }, { source: '0', target: '2' }, { source: '0', target: '3' }, { source: '0', target: '4' },
        { source: '1', target: '2' }, { source: '1', target: '3' }, { source: '1', target: '4' },
        { source: '2', target: '3' }, { source: '2', target: '4' },
        { source: '3', target: '4' },
        { source: '0', target: '0' },
        { source: '0', target: '0' },
        { source: '0', target: '0' },

        { source: '5', target: '6', weight: 5 }, { source: '5', target: '7' }, { source: '5', target: '8' }, { source: '5', target: '9' },
        { source: '6', target: '7' }, { source: '6', target: '8' }, { source: '6', target: '9' },
        { source: '7', target: '8' }, { source: '7', target: '9' },
        { source: '8', target: '9' },

        { source: '10', target: '11' }, { source: '10', target: '12' }, { source: '10', target: '13' }, { source: '10', target: '14' },
        { source: '11', target: '12' }, { source: '11', target: '13' }, { source: '11', target: '14' },
        { source: '12', target: '13' }, { source: '12', target: '14' },
        { source: '13', target: '14', weight: 5 },

        { source: '0', target: '5' },
        { source: '5', target: '10' },
        { source: '10', target: '0' },
        { source: '10', target: '0' },
      ]
    }
    const clusteredData = labelPropagation(data, false, 'weight');
    console.log(clusteredData);
    expect(clusteredData.clusters.length).toBe(3);
    expect(clusteredData.clusterEdges.length).toBe(6);
    expect(clusteredData.clusterEdges[0].count).toBe(13);
    expect(clusteredData.clusterEdges[1].count).toBe(10);
    expect(clusteredData.clusterEdges[1].weight).toBe(14);

    // to show the graph
    const clusterMap = {};
    data.nodes.forEach(node => {
      clusterMap[node.clusterId as string] = Object.keys(clusterMap).length - 1;
    });

    data.nodes.forEach(node => {
      node.label = `${node.id}`;
      node.style = {
        fill: colorArray[clusterMap[node.clusterId as string] % colorArray.length]
      }
    })

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node', 'drag-canvas']
      },
      layout: {
        type: 'force'
      }
    });

    graph.data(data);
    graph.render();
    graph.destroy();
  });
  it('label propagation with large graph', () => { // https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json
    fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json')
      .then((res) => res.json())
      .then((data) => { // 1589 nodes, 2747 edges
        const t0 = performance.now();
        const clusteredData = labelPropagation(data, false, 'weight');
        const t1 = performance.now();
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

        // 9037.91999999521 ms

        expect(clusteredData.clusters.length).toBe(472);
        expect(clusteredData.clusterEdges.length).toBe(444);

        const clusterMap = {};
        data.nodes.forEach(node => {
          clusterMap[node.clusterId] = Object.keys(clusterMap).length - 1;
        });

        data.nodes.forEach(node => {
          node.label = `${node.clusterId}`;
          node.style = {
            fill: colorArray[clusterMap[node.clusterId] % colorArray.length]
          }
        })

        const graph = new G6.Graph({
          container: 'container',
          width: 1500,
          height: 1500,
          modes: {
            default: ['drag-node', 'drag-canvas']
          },
          defaultNode: {
            labelCfg: {
              position: 'right'
            }
          }
        });

        graph.data(data);
        graph.render();
        graph.destroy();
      });
  });
});
