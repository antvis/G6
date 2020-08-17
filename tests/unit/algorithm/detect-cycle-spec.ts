import G6, { Algorithm } from '../../../src';
const { detectDirectedCycle, detectAllCycles } = Algorithm;

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
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
  ],
  edges: [
    {
      source: 'A',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'A',
      target: 'C',
    },
    {
      source: 'D',
      target: 'A',
    },
    {
      source: 'D',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
  ],
};
data.nodes.forEach((d) => {
  d['label'] = d.id;
});
describe('detectDirectedCycle', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 500,
    defaultNode: {
      type: 'node',
      labelCfg: {
        style: {
          fill: '#333',
          fontSize: 12,
        },
      },
    },
    defaultEdge: {
      style: {
        endArrow: true,
      },
    },
    modes: { default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'lasso-select'] },
  });

  graph.data(data);
  graph.render();

  it('should detect directed cycle', () => {
    let result = detectDirectedCycle(graph);
    // debugger
    expect(result).toBeNull();

    data.edges.push({
      source: 'F',
      target: 'D',
    });

    graph.changeData(data);
    // 返回格式：
    // { currentNodeId: prevNode }
    result = detectDirectedCycle(graph);

    const nodeF = graph.findById('F');
    const nodeD = graph.findById('D');
    const nodeE = graph.findById('E');
    expect(result).toEqual({
      D: nodeF,
      F: nodeE,
      E: nodeD,
    });
  });
  it('detect all cycles in directed graph', () => {
    data.edges.push({
      source: 'C',
      target: 'D',
    });
    graph.changeData(data);
    graph.render();
    const result = detectAllCycles(graph, true);
    // console.log('All cycles in the directed graph: ', result)
    expect(result.length).toEqual(3);

    const nodeA = graph.findById('A');
    const nodeB = graph.findById('B');
    const nodeC = graph.findById('C');
    const nodeD = graph.findById('D');

    const result2 = detectAllCycles(graph, true, ['B']);
    expect(result2.length).toEqual(1);
    expect(result2[0]).toEqual({
      A: nodeB,
      B: nodeC,
      C: nodeD,
      D: nodeA,
    });
    // console.log(`All cycles include 'B' in the directed graph: `, result2)
  });
  it('detect cycle in undirected graph', () => {
    const result = detectAllCycles(graph);
    expect(result.length).toEqual(3);
    // console.log(`All elemenetary cycles in the undirected graph: `, result)
    const nodeD = graph.findById('D');
    const nodeF = graph.findById('F');
    const nodeE = graph.findById('E');
    const result2 = detectAllCycles(graph, false, ['B'], false);
    expect(Object.keys(result2[0]).sort()).toEqual(['D', 'E', 'F']);
    // console.log(`All elemenetary cycles include ${graph.getNodes()[1].getID()} in the undirected graph: `, result2)
  });
  it('test another graph', () => {
    const data = {
      nodes: [
        {
          id: '0',
          label: '0',
        },
        {
          id: '1',
          label: '1',
        },
        {
          id: '2',
          label: '2',
        },
        {
          id: '3',
          label: '3',
        },
        {
          id: '4',
          label: '4',
        },
        {
          id: '5',
          label: '5',
        },
        {
          id: '6',
          label: '6',
        },
        {
          id: '7',
          label: '7',
        },
        {
          id: '8',
          label: '8',
        },
        {
          id: '9',
          label: '9',
        },
        {
          id: '10',
          label: '10',
        },
        {
          id: '11',
          label: '11',
        },
        {
          id: '12',
          label: '12',
        },
        {
          id: '13',
          label: '13',
        },
        {
          id: '14',
          label: '14',
        },
        {
          id: '15',
          label: '15',
        },
        {
          id: '16',
          label: '16',
        },
        {
          id: '17',
          label: '17',
        },
        {
          id: '18',
          label: '18',
        },
        {
          id: '19',
          label: '19',
        },
        {
          id: '20',
          label: '20',
        },
        {
          id: '21',
          label: '21',
        },
        {
          id: '22',
          label: '22',
        },
        {
          id: '23',
          label: '23',
        },
        {
          id: '24',
          label: '24',
        },
        {
          id: '25',
          label: '25',
        },
        {
          id: '26',
          label: '26',
        },
        {
          id: '27',
          label: '27',
        },
        {
          id: '28',
          label: '28',
        },
        {
          id: '29',
          label: '29',
        },
        {
          id: '30',
          label: '30',
        },
        {
          id: '31',
          label: '31',
        },
        {
          id: '32',
          label: '32',
        },
        {
          id: '33',
          label: '33',
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
          source: '3',
          target: '0',
        },
        {
          source: '0',
          target: '4',
        },
        {
          source: '5',
          target: '0',
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
          source: '14',
          target: '0',
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
    };
    graph.changeData(data);
    const result = detectAllCycles(graph, true, ['14']);
    const result2 = detectAllCycles(graph);
    expect(result.length).toEqual(4);
    expect(result2.length).toEqual(27);
  });
  it('test a large graph', () => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json')
      .then((res) => res.json())
      .then((data) => {
        data.nodes.forEach((node) => {
          node.label = node.olabel;
          node.degree = 0;
          data.edges.forEach((edge) => {
            if (edge.source === node.id || edge.target === node.id) {
              node.degree++;
            }
          });
        });
        graph.changeData(data);
        const directedCycles = detectAllCycles(graph, true);
        expect(directedCycles.length).toEqual(0);
        const undirectedCycles = detectAllCycles(graph, false, ['1084'], false);
        expect(undirectedCycles.length).toEqual(1548);
      });
  });
});
