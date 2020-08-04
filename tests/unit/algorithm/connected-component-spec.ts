import G6, { Algorithm } from '../../../src';
const { getConnectedComponents } = Algorithm

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'A'
    },
    {
      id: 'B'
    },
    {
      id: 'C'
    },
    {
      id: 'D'
    },
    {
      id: 'E'
    },
    {
      id: 'F'
    },
    {
      id: 'G'
    },
    {
      id: 'H'
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B'
    },
    {
      source: 'B',
      target: 'C'
    },
    {
      source: 'A',
      target: 'C'
    },
    {
      source: 'D',
      target: 'A'
    },
    {
      source: 'D',
      target: 'E'
    },
    {
      source: 'E',
      target: 'F'
    },
    {
      source: 'F',
      target: 'D'
    },
    {
      source: 'G',
      target: 'H'
    },
    {
      source: 'H',
      target: 'G'
    }
  ]
}
data.nodes.forEach(d => {
  d['label'] = d.id
})
describe('find connected components', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 400,
    layout: {
      type: 'force'
    },
    modes: {
      default: ['zoom-canvas', 'drag-canvas', 'drag-node']
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
      }
    }
  })

  graph.data(data)
  graph.render()

  it('detect strongly connected components in directed graph', () => {
    let result = getConnectedComponents(graph, true)
    console.log(result)

    // const nodeF = graph.findById('F')
    // const nodeD = graph.findById('D')
    // const nodeE = graph.findById('E')
    // expect(result).toEqual();
  });
});
