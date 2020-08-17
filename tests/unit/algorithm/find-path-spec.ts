import G6, { Algorithm } from '../../../src';
const { findAllPath, findShortestPath } = Algorithm;

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'A',
      label: 'A',
    },
    {
      id: 'B',
      label: 'B',
    },
    {
      id: 'C',
      label: 'C',
    },
    {
      id: 'D',
      label: 'D',
    },
    {
      id: 'E',
      label: 'E',
    },
    {
      id: 'F',
      label: 'F',
    },
    {
      id: 'G',
      label: 'G',
    },
    {
      id: 'H',
      label: 'H',
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
    {
      source: 'D',
      target: 'E',
    },
  ],
};

describe('Shortest Path from source to target on graph', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 500,
    defaultEdge: {
      style: {
        endArrow: true,
      },
    },
    modes: {
      default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
    },
  });
  graph.data(data);
  graph.render();

  it('find the shortest path', () => {
    const { length, path } = findShortestPath(graph, 'A', 'C');
    expect(length).toBe(2);
    expect(path).toStrictEqual(['A', 'B', 'C']);
  });

  it('find all paths', () => {
    const allPaths = findAllPath(graph, 'A', 'E');
    expect(allPaths.length).toBe(3);
    expect(allPaths[0]).toStrictEqual(['A', 'D', 'F', 'E']);
    expect(allPaths[1]).toStrictEqual(['A', 'D', 'E']);
    expect(allPaths[2]).toStrictEqual(['A', 'E']);
  });

  it('find all paths in directed graph', () => {
    const allPaths = findAllPath(graph, 'A', 'E', true);
    expect(allPaths.length).toStrictEqual(2);
    expect(allPaths[0]).toStrictEqual(['A', 'D', 'E']);
    expect(allPaths[1]).toStrictEqual(['A', 'E']);
  });
});
