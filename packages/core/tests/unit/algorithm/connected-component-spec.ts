import G6, { Algorithm } from '../../../src';
const { getConnectedComponents } = Algorithm;

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
    {
      id: 'H',
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
    {
      source: 'F',
      target: 'D',
    },
    {
      source: 'G',
      target: 'H',
    },
    {
      source: 'H',
      target: 'G',
    },
  ],
};
data.nodes.forEach((d) => {
  d['label'] = d.id;
});
describe('find connected components', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 400,
    layout: {
      type: 'force',
    },
    modes: {
      default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
    },
    defaultNode: {
      type: 'node',
      labelCfg: {
        style: {
          fill: '#fff',
          fontSize: 14,
        },
      },
    },
    defaultEdge: {
      style: {
        endArrow: true,
      },
    },
  });

  graph.data(data);
  graph.render();

  it('detect strongly connected components in undirected graph', () => {
    let result = getConnectedComponents(graph, false);
    expect(result.length).toEqual(2);
    expect(result[0].map((node) => node.get('id')).sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    expect(result[1].map((node) => node.get('id')).sort()).toEqual(['G', 'H']);
  });
  it('detect strongly connected components in directed graph', () => {
    let result = getConnectedComponents(graph, true);
    expect(result.length).toEqual(5);
    expect(result[3].map((node) => node.get('id')).sort()).toEqual(['D', 'E', 'F']);
    expect(result[4].map((node) => node.get('id')).sort()).toEqual(['G', 'H']);
  });
  it('test connected components detection performance using large graph', () => {
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
        let directedComps = getConnectedComponents(graph, true);
        let undirectedComps = getConnectedComponents(graph, false);
        expect(directedComps.length).toEqual(1589);
        expect(undirectedComps.length).toEqual(396);
        graph.destroy();
      });
  });
});
