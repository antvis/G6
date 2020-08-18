import G6, { Algorithm } from '../../../src';
const { adjMatrix } = Algorithm;

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'A',
      label: '0',
    },
    {
      id: 'B',
      label: '1',
    },
    {
      id: 'C',
      label: '2',
    },
    {
      id: 'D',
      label: '3',
    },
    {
      id: 'E',
      label: '4',
    },
    {
      id: 'F',
      label: '5',
    },
    {
      id: 'G',
      label: '6',
    },
    {
      id: 'H',
      label: '7',
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
  ],
};

describe('Adjacency Matrix on graph', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 500,
    defaultEdge: {
      style: {
        endArrow: true,
      },
    },
  });

  graph.data(data);
  graph.render();

  it('get graph adjacency matrix', () => {
    const matrix = graph.getAdjMatrix();
    expect(Object.keys(matrix).length).toBe(8);
    const node0Adj = matrix[0];
    expect(node0Adj.length).toBe(5);
    expect(node0Adj[0]).toBe(undefined);
    expect(node0Adj[1]).toBe(1);
    expect(node0Adj[2]).toBe(undefined);
    expect(node0Adj[3]).toBe(1);
    expect(node0Adj[4]).toBe(1);
  });

  it('add items and cache', () => {
    graph.addItem('node', {
      id: 'I',
      label: '8',
    });
    graph.addItem('edge', {
      source: 'I',
      target: 'A',
    });
    graph.addItem('edge', {
      source: 'C',
      target: 'A',
    });
    // use the cache
    const cachedMatrix = graph.getAdjMatrix();
    expect(Object.keys(cachedMatrix).length).toBe(8);
    const cachedNode0Adj = cachedMatrix[0];
    expect(cachedNode0Adj.length).toBe(5);
    expect(cachedNode0Adj[0]).toBe(undefined);
    expect(cachedNode0Adj[1]).toBe(1);
    expect(cachedNode0Adj[2]).toBe(undefined);
    expect(cachedNode0Adj[3]).toBe(1);
    expect(cachedNode0Adj[4]).toBe(1);

    // do not use the cache
    const matrix = graph.getAdjMatrix(false);
    expect(Object.keys(matrix).length).toBe(9);
    const node0Adj = matrix[0];
    expect(node0Adj.length).toBe(9);
    expect(node0Adj[0]).toBe(undefined);
    expect(node0Adj[1]).toBe(1);
    expect(node0Adj[2]).toBe(1);
    expect(node0Adj[3]).toBe(1);
    expect(node0Adj[4]).toBe(1);
    expect(node0Adj[5]).toBe(undefined);
    expect(node0Adj[6]).toBe(undefined);
    expect(node0Adj[7]).toBe(undefined);
    expect(node0Adj[8]).toBe(1);
  });

  it('directed', () => {
    // do not use the cache and directed
    const matrix = graph.getAdjMatrix(false, true);
    expect(Object.keys(matrix).length).toBe(9);
    const node0Adj = matrix[0];
    expect(node0Adj.length).toBe(5);
    expect(node0Adj[0]).toBe(undefined);
    expect(node0Adj[1]).toBe(1);
    expect(node0Adj[2]).toBe(undefined);
    expect(node0Adj[3]).toBe(1);
    expect(node0Adj[4]).toBe(1);
    const node8Adj = matrix[8];
    expect(node8Adj.length).toBe(1);
    expect(node8Adj[0]).toBe(1);
    graph.destroy();
  });
});

describe('Adjacency Matrix by Algorithm', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 500,
    defaultEdge: {
      style: {
        endArrow: true,
      },
    },
  });

  graph.data(data);
  graph.render();

  it('get graph adjacency matrix', () => {
    const matrix = adjMatrix(graph);
    expect(Object.keys(matrix).length).toBe(8);
    const node0Adj = matrix[0];
    expect(node0Adj.length).toBe(5);
    expect(node0Adj[0]).toBe(undefined);
    expect(node0Adj[1]).toBe(1);
    expect(node0Adj[2]).toBe(undefined);
    expect(node0Adj[3]).toBe(1);
    expect(node0Adj[4]).toBe(1);
  });

  it('add items and cache', () => {
    graph.addItem('node', {
      id: 'I',
      label: '8',
    });
    graph.addItem('edge', {
      source: 'I',
      target: 'A',
    });
    graph.addItem('edge', {
      source: 'C',
      target: 'A',
    });

    const matrix = adjMatrix(graph);
    expect(Object.keys(matrix).length).toBe(9);
    const node0Adj = matrix[0];
    expect(node0Adj.length).toBe(9);
    expect(node0Adj[0]).toBe(undefined);
    expect(node0Adj[1]).toBe(1);
    expect(node0Adj[2]).toBe(1);
    expect(node0Adj[3]).toBe(1);
    expect(node0Adj[4]).toBe(1);
    expect(node0Adj[5]).toBe(undefined);
    expect(node0Adj[6]).toBe(undefined);
    expect(node0Adj[7]).toBe(undefined);
    expect(node0Adj[8]).toBe(1);
  });

  it('directed', () => {
    // directed
    const matrix = adjMatrix(graph, true);
    expect(Object.keys(matrix).length).toBe(9);
    const node0Adj = matrix[0];
    expect(node0Adj.length).toBe(5);
    expect(node0Adj[0]).toBe(undefined);
    expect(node0Adj[1]).toBe(1);
    expect(node0Adj[2]).toBe(undefined);
    expect(node0Adj[3]).toBe(1);
    expect(node0Adj[4]).toBe(1);
    const node8Adj = matrix[8];
    expect(node8Adj.length).toBe(1);
    expect(node8Adj[0]).toBe(1);
    graph.destroy();
  });
});
