import G6, { Algorithm } from '../../../src';
const { floydWarshall } = Algorithm;

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

describe('Shortest Path Matrix on graph', () => {
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

  it('get graph shortest path matrix', () => {
    const matrix = graph.getShortestPathMatrix();
    console.log(matrix);
    expect(Object.keys(matrix).length).toBe(8);
    const node0 = matrix[0];
    expect(node0.length).toBe(8);
    expect(node0[0]).toBe(0);
    expect(node0[1]).toBe(1);
    expect(node0[2]).toBe(2);
    expect(node0[3]).toBe(1);
    expect(node0[4]).toBe(1);
    expect(node0[5]).toBe(2);
    expect(node0[6]).toBe(3);
    expect(node0[7]).toBe(Infinity);
    expect(matrix[1][7]).toBe(Infinity);
    expect(matrix[2][7]).toBe(Infinity);
    expect(matrix[3][7]).toBe(Infinity);
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
    const cachedMatrix = graph.getShortestPathMatrix();
    expect(Object.keys(cachedMatrix).length).toBe(8);
    const cachedNode0 = cachedMatrix[0];
    expect(cachedNode0.length).toBe(8);
    expect(cachedNode0[0]).toBe(0);
    expect(cachedNode0[1]).toBe(1);
    expect(cachedNode0[2]).toBe(2);
    expect(cachedNode0[3]).toBe(1);
    expect(cachedNode0[4]).toBe(1);
    expect(cachedNode0[5]).toBe(2);
    expect(cachedNode0[6]).toBe(3);
    expect(cachedNode0[7]).toBe(Infinity);
    expect(cachedMatrix[1][7]).toBe(Infinity);
    expect(cachedMatrix[2][7]).toBe(Infinity);
    expect(cachedMatrix[3][7]).toBe(Infinity);

    // do not use the cache
    const matrix = graph.getShortestPathMatrix(false);
    expect(Object.keys(matrix).length).toBe(9);
    console.log(matrix);
    const node0 = matrix[0];
    expect(node0.length).toBe(9);
    expect(node0[0]).toBe(0);
    expect(node0[1]).toBe(1);
    expect(node0[2]).toBe(1);
    expect(node0[3]).toBe(1);
    expect(node0[4]).toBe(1);
    expect(node0[5]).toBe(2);
    expect(node0[6]).toBe(2);
    expect(node0[7]).toBe(Infinity);
    expect(node0[8]).toBe(1);
  });

  it('directed', () => {
    // do not use the cache and directed
    const matrix = graph.getShortestPathMatrix(false, true);
    expect(Object.keys(matrix).length).toBe(9);
    console.log(matrix);
    const node0 = matrix[0];
    expect(node0.length).toBe(9);
    expect(node0[0]).toBe(0);
    expect(node0[1]).toBe(1);
    expect(node0[2]).toBe(2);
    expect(node0[3]).toBe(1);
    expect(node0[4]).toBe(1);
    expect(node0[5]).toBe(2);
    expect(node0[6]).toBe(3);
    expect(node0[7]).toBe(Infinity);
    expect(node0[8]).toBe(Infinity);
    const node8 = matrix[8];
    expect(node8.length).toBe(9);
    expect(node8[0]).toBe(1);
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

  it('get graph shortestpath matrix', () => {
    const matrix = floydWarshall(graph);
    expect(Object.keys(matrix).length).toBe(8);
    const node0 = matrix[0];
    expect(node0.length).toBe(8);
    expect(node0[0]).toBe(0);
    expect(node0[1]).toBe(1);
    expect(node0[2]).toBe(2);
    expect(node0[3]).toBe(1);
    expect(node0[4]).toBe(1);
    expect(node0[5]).toBe(2);
    expect(node0[6]).toBe(3);
    expect(node0[7]).toBe(Infinity);
    expect(matrix[1][7]).toBe(Infinity);
    expect(matrix[2][7]).toBe(Infinity);
    expect(matrix[3][7]).toBe(Infinity);
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

    const matrix = floydWarshall(graph);
    expect(Object.keys(matrix).length).toBe(9);
    console.log(matrix);
    const node0 = matrix[0];
    expect(node0.length).toBe(9);
    expect(node0[0]).toBe(0);
    expect(node0[1]).toBe(1);
    expect(node0[2]).toBe(1);
    expect(node0[3]).toBe(1);
    expect(node0[4]).toBe(1);
    expect(node0[5]).toBe(2);
    expect(node0[6]).toBe(2);
    expect(node0[7]).toBe(Infinity);
    expect(node0[8]).toBe(1);
  });

  it('directed', () => {
    // directed
    const matrix = floydWarshall(graph, true);
    expect(Object.keys(matrix).length).toBe(9);
    const node0 = matrix[0];
    expect(node0.length).toBe(9);
    expect(node0[0]).toBe(0);
    expect(node0[1]).toBe(1);
    expect(node0[2]).toBe(2);
    expect(node0[3]).toBe(1);
    expect(node0[4]).toBe(1);
    expect(node0[5]).toBe(2);
    expect(node0[6]).toBe(3);
    expect(node0[7]).toBe(Infinity);
    expect(node0[8]).toBe(Infinity);
    const node8 = matrix[8];
    expect(node8.length).toBe(9);
    expect(node8[0]).toBe(1);
    graph.destroy();
  });
});
