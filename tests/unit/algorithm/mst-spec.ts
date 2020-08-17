import G6, { Algorithm } from '../../../src';
const { minimumSpanningTree } = Algorithm;

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
      weight: 1,
    },
    {
      source: 'B',
      target: 'C',
      weight: 1,
    },
    {
      source: 'A',
      target: 'C',
      weight: 2,
    },
    {
      source: 'D',
      target: 'A',
      weight: 3,
    },
    {
      source: 'D',
      target: 'E',
      weight: 4,
    },
    {
      source: 'E',
      target: 'F',
      weight: 2,
    },
    {
      source: 'F',
      target: 'D',
      weight: 3,
    },
  ],
};
data.nodes.forEach((node) => (node['label'] = node.id));
data.edges.forEach((edge) => (edge['label'] = edge.weight));
describe('minimumSpanningTree', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 500,
    layout: {
      type: 'force',
    },
    modes: {
      default: ['drag-node'],
    },
    defaultNode: {
      labelCfg: {
        style: {
          fontSize: 12,
        },
      },
    },
    defaultEdge: {
      style: {
        endArrow: true,
      },
      labelCfg: {
        style: {
          fontSize: 12,
        },
      },
    },
    edgeStateStyles: {
      mst: {
        stroke: 'red',
      },
    },
  });

  graph.data(data);
  graph.render();

  it('test kruskal algorithm', () => {
    let result = minimumSpanningTree(graph, 'weight');
    let totalWeight = 0;
    for (let edge of result) {
      graph.setItemState(edge, 'mst', true);
      totalWeight += edge.getModel()['weight'];
    }
    expect(totalWeight).toEqual(10);
  });

  it('test prim algorithm', () => {
    let result = minimumSpanningTree(graph, 'weight', 'prim');
    let totalWeight = 0;
    for (let edge of result) {
      graph.setItemState(edge, 'mst', true);
      totalWeight += edge.getModel()['weight'];
    }
    expect(totalWeight).toEqual(10);
  });
});
