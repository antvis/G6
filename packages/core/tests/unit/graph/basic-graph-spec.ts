import '../../../src/behavior';
import Graph from '../implement-graph';

describe('graph', () => {
  it.only('basic graph', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const graph = new Graph({
      // autoPaint: false,
      container: div,
      width: 500,
      height: 500,
    });
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 50,
          label: 'node1',
        },
        {
          id: 'node2',
          x: 200,
          y: 150,
          label: 'node2',
        },
        {
          id: 'node3',
          x: 100,
          y: 150,
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
    };
    graph.data(data);
    graph.render();
  });
  it('self loop', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const graph = new Graph({
      autoPaint: false,
      container: div,
      width: 500,
      height: 500,
    });
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 50,
          label: 'node1',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node1',
          type: 'loop',
        },
      ],
    };
    graph.data(data);
    graph.render();
  });
});
