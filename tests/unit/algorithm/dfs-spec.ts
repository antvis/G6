import G6, { Algorithm } from '../../../src';
const { depthFirstSearch } = Algorithm;

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
      target: 'G',
    },
  ],
};

describe('depthFirstSearch', () => {
  it('should perform DFS operation on graph', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // layout
    });

    graph.data(data);
    graph.render();

    const enterNodeCallback = jest.fn();
    const leaveNodeCallback = jest.fn();

    // Traverse graphs without callbacks first to check default ones.
    depthFirstSearch(graph, 'A');

    // Traverse graph with enterNode and leaveNode callbacks.
    depthFirstSearch(graph, 'A', {
      enter: enterNodeCallback,
      leave: leaveNodeCallback,
    });

    expect(enterNodeCallback).toHaveBeenCalledTimes(graph.getNodes().length);
    expect(leaveNodeCallback).toHaveBeenCalledTimes(graph.getNodes().length);

    const enterNodeParamsMap = [
      { currentNode: 'A', previousNode: null },
      { currentNode: 'B', previousNode: 'A' },
      { currentNode: 'C', previousNode: 'B' },
      { currentNode: 'G', previousNode: 'C' },
      { currentNode: 'D', previousNode: 'A' },
      { currentNode: 'E', previousNode: 'A' },
      { currentNode: 'F', previousNode: 'E' },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = enterNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterNodeParamsMap[callIndex].currentNode);
      expect(params.previous && params.previous.get('id')).toEqual(
        enterNodeParamsMap[callIndex].previousNode,
      );
    }

    const leaveNodeParamsMap = [
      { currentNode: 'G', previousNode: 'C' },
      { currentNode: 'C', previousNode: 'B' },
      { currentNode: 'B', previousNode: 'A' },
      { currentNode: 'D', previousNode: 'A' },
      { currentNode: 'F', previousNode: 'E' },
      { currentNode: 'E', previousNode: 'A' },
      { currentNode: 'A', previousNode: null },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = leaveNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveNodeParamsMap[callIndex].currentNode);
      expect(params.previous && params.previous.get('id')).toEqual(
        leaveNodeParamsMap[callIndex].previousNode,
      );
    }

    graph.destroy();
  });

  it('allow users to redefine node visiting logic', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // layout
    });

    graph.data(data);
    graph.render();

    const enterNodeCallback = jest.fn();
    const leaveNodeCallback = jest.fn();

    depthFirstSearch(graph, 'A', {
      enter: enterNodeCallback,
      leave: leaveNodeCallback,
      allowTraversal: ({ current: currentNode, next: nextNode }) => {
        return !(currentNode.get('id') === 'A' && nextNode.get('id') === 'B');
      },
    });

    expect(enterNodeCallback).toHaveBeenCalledTimes(7);
    expect(leaveNodeCallback).toHaveBeenCalledTimes(7);

    const enterNodeParamsMap = [
      { currentNode: 'A', previousNode: null },
      { currentNode: 'D', previousNode: 'A' },
      { currentNode: 'G', previousNode: 'D' },
      { currentNode: 'E', previousNode: 'A' },
      { currentNode: 'F', previousNode: 'E' },
      { currentNode: 'D', previousNode: 'F' },
      { currentNode: 'G', previousNode: 'D' },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = enterNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterNodeParamsMap[callIndex].currentNode);
      expect(params.previous && params.previous.get('id')).toEqual(
        enterNodeParamsMap[callIndex].previousNode,
      );
    }

    const leaveNodeParamsMap = [
      { currentNode: 'G', previousNode: 'D' },
      { currentNode: 'D', previousNode: 'A' },
      { currentNode: 'G', previousNode: 'D' },
      { currentNode: 'D', previousNode: 'F' },
      { currentNode: 'F', previousNode: 'E' },
      { currentNode: 'E', previousNode: 'A' },
      { currentNode: 'A', previousNode: null },
    ];

    for (let callIndex = 0; callIndex < graph.getNodes().length; callIndex += 1) {
      const params = leaveNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveNodeParamsMap[callIndex].currentNode);
      expect(params.previous && params.previous.get('id')).toEqual(
        leaveNodeParamsMap[callIndex].previousNode,
      );
    }

    graph.destroy();
  });
});
