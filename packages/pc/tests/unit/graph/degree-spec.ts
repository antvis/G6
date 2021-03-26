import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200, label: '1' },
    { id: 'node2', x: 350, y: 250, label: '2' },
    { id: 'node3', x: 100, y: 200, label: '3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
  ],
};

describe('get newly added node degree', () => {
  it('add node', () => {

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500
    });
    graph.read(data);
    
    expect(graph.getNodeDegree('node1')).toBe(2);

    graph.addItem('node', {
      id: 'node4',
      x: 10,
      y: 10,
      label: '4'
    })

    expect(graph.getNodeDegree('node4')).toBe(0);


    graph.addItem('edge', {
      source: 'node1',
      target: 'node4'
    })

    expect(graph.getNodeDegree('node1', 'total', true)).toBe(3);
    expect(graph.getNodeDegree('node4')).toBe(1);

    graph.destroy()

  });
});