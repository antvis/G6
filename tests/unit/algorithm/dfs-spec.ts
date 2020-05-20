
import G6, { Algorithm } from '../../../src';
const { depthFirstSearch } = Algorithm

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
      source: 'C',
      target: 'G'
    },
    {
      source: 'A',
      target: 'D'
    },
    {
      source: 'A',
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
      source: 'D',
      target: 'G'
    },
  ]
}

describe('depthFirstSearch', () => {
  it.only('should perform DFS operation on graph', () => {
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

    // Traverse graphs without callbacks first to check default ones.
    depthFirstSearch(graph, 'A');

    // Traverse graph with enterVertex and leaveVertex callbacks.
    depthFirstSearch(graph, 'A', {
      enter: enterVertexCallback,
      leave: leaveVertexCallback,
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(graph.getNodes().length);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(graph.getNodes().length);

    const enterVertexParamsMap = [
      { currentVertex: 'A', previousVertex: null },
      { currentVertex: 'B', previousVertex: 'A' },
      { currentVertex: 'C', previousVertex: 'B' },
      { currentVertex: 'G', previousVertex: 'C' },
      { currentVertex: 'D', previousVertex: 'A' },
      { currentVertex: 'E', previousVertex: 'A' },
      { currentVertex: 'F', previousVertex: 'E' },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = enterVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterVertexParamsMap[callIndex].currentVertex);
      expect(params.previous && params.previous.get('id')).toEqual(enterVertexParamsMap[callIndex].previousVertex);
    }

    const leaveVertexParamsMap = [
      { currentVertex: 'G', previousVertex: 'C' },
      { currentVertex: 'C', previousVertex: 'B' },
      { currentVertex: 'B', previousVertex: 'A' },
      { currentVertex: 'D', previousVertex: 'A' },
      { currentVertex: 'F', previousVertex: 'E' },
      { currentVertex: 'E', previousVertex: 'A' },
      { currentVertex: 'A', previousVertex: null },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = leaveVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveVertexParamsMap[callIndex].currentVertex);
      expect(params.previous && params.previous.get('id')).toEqual(leaveVertexParamsMap[callIndex].previousVertex);
    }

    graph.destroy()
  });

  it('allow users to redefine vertex visiting logic', () => {
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

    depthFirstSearch(graph, 'A', {
      enter: enterVertexCallback,
      leave: leaveVertexCallback,
      allowTraversal: ({ 
        current: currentVertex, 
        next: nextVertex }) => {
        return !(currentVertex.get('id') === 'A' && nextVertex.get('id') === 'B');
      },
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(7);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(7);

    const enterVertexParamsMap = [
      { currentVertex: 'A', previousVertex: null },
      { currentVertex: 'D', previousVertex: 'A' },
      { currentVertex: 'G', previousVertex: 'D' },
      { currentVertex: 'E', previousVertex: 'A' },
      { currentVertex: 'F', previousVertex: 'E' },
      { currentVertex: 'D', previousVertex: 'F' },
      { currentVertex: 'G', previousVertex: 'D' },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = enterVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterVertexParamsMap[callIndex].currentVertex);
      expect(params.previous && params.previous.get('id')).toEqual(enterVertexParamsMap[callIndex].previousVertex);
    }

    const leaveVertexParamsMap = [
      { currentVertex: 'G', previousVertex: 'D' },
      { currentVertex: 'D', previousVertex: 'A' },
      { currentVertex: 'G', previousVertex: 'D' },
      { currentVertex: 'D', previousVertex: 'F' },
      { currentVertex: 'F', previousVertex: 'E' },
      { currentVertex: 'E', previousVertex: 'A' },
      { currentVertex: 'A', previousVertex: null },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = leaveVertexCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveVertexParamsMap[callIndex].currentVertex);
      expect(params.previous && params.previous.get('id')).toEqual(leaveVertexParamsMap[callIndex].previousVertex);
    }

    graph.destroy()
  });
});