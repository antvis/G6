import G6, { Algorithm } from '../../../src';
const { getPageRank } = Algorithm;

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
    {
      id: 'I',
      label: 'I',
    },
    {
      id: 'J',
      label: 'J',
    },
    {
      id: 'K',
      label: 'K',
    }
  ],
  edges: [
    {
      source: 'D',
      target: 'A',
    },
    {
      source: 'D',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'C',
      target: 'B',
    },
    {
      source: 'F',
      target: 'B',
    },
    {
      source: 'F',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'E',
      target: 'D',
    },
    {
      source: 'E',
      target: 'B',
    },
    {
      source: 'K',
      target: 'E',
    },
    {
      source: 'J',
      target: 'E',
    },
    {
      source: 'I',
      target: 'E',
    },
    {
      source: 'H',
      target: 'E',
    },
    {
      source: 'G',
      target: 'E',
    },
    {
      source: 'G',
      target: 'B',
    },
    {
      source: 'H',
      target: 'B',
    },
    {
      source: 'I',
      target: 'B',
    },
  ],
};

describe('Calculate pagerank of graph nodes', () => {
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

  it('calculate pagerank', () => {
    const result = getPageRank(graph);
    let maxNodeId;
    let maxVal = 0;
    for (let nodeId in result) {
      const val = result[nodeId];
      if (val >= maxVal) {
        maxNodeId = nodeId;
        maxVal = val
      }
    }
    expect(maxNodeId).toBe('B')
  });
});
