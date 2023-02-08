import G6, { GraphData } from '../../src/index'
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const data: GraphData = {
  nodes: [
    { id: 'node1', data: { x: 100, y: 200, keyShape: { fill: "#0f0" } } },
    { id: 'node2', data: { x: 200, y: 250, keyShape: { fill: "#f00" } } }
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2', data: { keyShape: { stroke: '#00f', lineWidth: 5 } } }
  ]
}

describe('behavior', () => {
  it('behavior in spec, add / remove / update a behavior in defualt mode', () => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data, // with data, graph will be rendered in constructor
    });
    graph.updateData('node', {
      id: 'node1',
      data: {
        x: 300,
        y: 450
      }
    });
    graph.addData('node', {
      id: 'node3',
      data: {
        x: 300,
        y: 100,
        keyShape: { lineWidth: 2 }
      }
    });
    graph.addData('node', {
      id: 'node4',
      data: {
        x: 300,
        y: 200,
        keyShape: { lineWidth: 2 }
      }
    });
    graph.removeData('node', ['node3'])
  });
});
