import breadthFirstSearch from '../../../src/algorithm/bfs'
import G6 from '../../../src';

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
  ]
}

describe('breadthFirstSearch', () => {
  it('should perform BFS operation on graph', () => {
    const enterVertexCallback = jest.fn();
    const leaveVertexCallback = jest.fn();

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // layout
    })

    graph.data(data)
    graph.render()

    // Traverse graphs without callbacks first.
    breadthFirstSearch(graph, 'A');

    // Traverse graph with enterVertex and leaveVertex callbacks.
    breadthFirstSearch(graph, 'A', {
      enter: enterVertexCallback,
      leave: leaveVertexCallback,
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(7);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(7);

    const vertexA = graph.findById('A')
    const vertexB = graph.findById('B')
    const vertexC = graph.findById('C')
    const vertexD = graph.findById('D')
    const vertexE = graph.findById('E')
    const vertexF = graph.findById('F')
    const vertexG = graph.findById('G')

    const enterVertexParamsMap = [
      { currentVertex: vertexA, previousVertex: null },
      { currentVertex: vertexB, previousVertex: vertexA },
      { currentVertex: vertexD, previousVertex: vertexB },
      { currentVertex: vertexE, previousVertex: vertexD },
      { currentVertex: vertexC, previousVertex: vertexE },
      { currentVertex: vertexF, previousVertex: vertexC },
      { currentVertex: vertexG, previousVertex: vertexF },
    ];

    for (let callIndex = 0; callIndex < 6; callIndex += 1) {
      const params = enterVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterVertexParamsMap[callIndex].currentVertex.get('id'));
      expect(params.previous && params.previous.get('id')).toEqual(
        enterVertexParamsMap[callIndex].previousVertex && enterVertexParamsMap[callIndex].previousVertex.get('id'));
    }

    const leaveVertexParamsMap = [
      { currentVertex: vertexA, previousVertex: null },
      { currentVertex: vertexB, previousVertex: vertexA },
      { currentVertex: vertexD, previousVertex: vertexB },
      { currentVertex: vertexE, previousVertex: vertexD },
      { currentVertex: vertexC, previousVertex: vertexE },
      { currentVertex: vertexF, previousVertex: vertexC },
      { currentVertex: vertexG, previousVertex: vertexF },
    ];

    for (let callIndex = 0; callIndex < 6; callIndex += 1) {
      const params = leaveVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveVertexParamsMap[callIndex].currentVertex.get('id'));
      expect(params.previous && params.previous.get('id')).toEqual(
        leaveVertexParamsMap[callIndex].previousVertex && leaveVertexParamsMap[callIndex].previousVertex.get('id'));
    }

    graph.destroy()
  });

  it('should allow to create custom vertex visiting logic', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // layout
    })

    graph.data(data)
    graph.render()

    const enterVertexCallback = jest.fn();
    const leaveVertexCallback = jest.fn();
    
    // Traverse graph with enterVertex and leaveVertex callbacks.
    breadthFirstSearch(graph, 'A', {
      enter: enterVertexCallback,
      leave: leaveVertexCallback,
      allowTraversal: ({ current, next }) => {
        return !(current.get('id') === 'A' && next.get('id') === 'B');
      },
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(5);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(5);

    const enterVertexParamsMap = [
      { currentVertex: 'A', previousVertex: null },
      { currentVertex: 'D', previousVertex: 'A' },
      { currentVertex: 'E', previousVertex: 'D' },
      { currentVertex: 'F', previousVertex: 'E' },
      { currentVertex: 'D', previousVertex: 'F' }
    ];

    for (let callIndex = 0; callIndex < 5; callIndex += 1) {
      const params = enterVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterVertexParamsMap[callIndex].currentVertex);
      expect(params.previous && params.previous.get('id')).toEqual(enterVertexParamsMap[callIndex].previousVertex);
    }

    const leaveVertexParamsMap = [
      { currentVertex: 'A', previousVertex: null },
      { currentVertex: 'D', previousVertex: 'A' },
      { currentVertex: 'E', previousVertex: 'D' },
      { currentVertex: 'F', previousVertex: 'E' },
      { currentVertex: 'D', previousVertex: 'F' },
    ];

    for (let callIndex = 0; callIndex < 5; callIndex += 1) {
      const params = leaveVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveVertexParamsMap[callIndex].currentVertex);
      expect(params.previous && params.previous.get('id')).toEqual(leaveVertexParamsMap[callIndex].previousVertex);
    }
  });
});
