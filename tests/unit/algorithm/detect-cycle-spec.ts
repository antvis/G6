import G6, { Algorithm } from '../../../src';
const { detectDirectedCycle } = Algorithm

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
  ]
}
describe('detectDirectedCycle', () => {
  it('should detect directed cycle', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // layout
    })

    graph.data(data)
    graph.render()

    let result = detectDirectedCycle(graph)
    debugger
    expect(result).toBeNull();

    data.edges.push(
      {
        source: 'F',
        target: 'D'
      }
    )

    graph.changeData(data)
    // 返回格式：
    // { currentNodeId: prevNode }
    result = detectDirectedCycle(graph)

    const nodeF = graph.findById('F')
    const nodeD = graph.findById('D')
    const nodeE = graph.findById('E')
    expect(result).toEqual({
      D: nodeF,
      F: nodeE,
      E: nodeD,
    });
  });
});
