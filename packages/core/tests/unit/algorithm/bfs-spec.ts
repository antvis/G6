import G6, { Algorithm } from '../../../src';
const { breadthFirstSearch } = Algorithm;

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

describe('breadthFirstSearch', () => {
  it('should perform BFS operation on graph', () => {
    const enterNodeCallback = jest.fn();
    const leaveNodeCallback = jest.fn();

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // layout
    });

    graph.data(data);
    graph.render();

    // Traverse graphs without callbacks first.
    breadthFirstSearch(graph, 'A');

    // Traverse graph with enterNode and leaveNode callbacks.
    breadthFirstSearch(graph, 'A', {
      enter: enterNodeCallback,
      leave: leaveNodeCallback,
    });

    expect(enterNodeCallback).toHaveBeenCalledTimes(7);
    expect(leaveNodeCallback).toHaveBeenCalledTimes(7);

    const nodeA = graph.findById('A');
    const nodeB = graph.findById('B');
    const nodeC = graph.findById('C');
    const nodeD = graph.findById('D');
    const nodeE = graph.findById('E');
    const nodeF = graph.findById('F');
    const nodeG = graph.findById('G');

    const enterNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeB, previousNode: nodeA },
      { currentNode: nodeD, previousNode: nodeB },
      { currentNode: nodeE, previousNode: nodeD },
      { currentNode: nodeC, previousNode: nodeE },
      { currentNode: nodeF, previousNode: nodeC },
      { currentNode: nodeG, previousNode: nodeF },
    ];

    for (let callIndex = 0; callIndex < 6; callIndex += 1) {
      const params = enterNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterNodeParamsMap[callIndex].currentNode.get('id'));
      expect(params.previous && params.previous.get('id')).toEqual(
        enterNodeParamsMap[callIndex].previousNode &&
          enterNodeParamsMap[callIndex].previousNode.get('id'),
      );
    }

    const leaveNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeB, previousNode: nodeA },
      { currentNode: nodeD, previousNode: nodeB },
      { currentNode: nodeE, previousNode: nodeD },
      { currentNode: nodeC, previousNode: nodeE },
      { currentNode: nodeF, previousNode: nodeC },
      { currentNode: nodeG, previousNode: nodeF },
    ];

    for (let callIndex = 0; callIndex < 6; callIndex += 1) {
      const params = leaveNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveNodeParamsMap[callIndex].currentNode.get('id'));
      expect(params.previous && params.previous.get('id')).toEqual(
        leaveNodeParamsMap[callIndex].previousNode &&
          leaveNodeParamsMap[callIndex].previousNode.get('id'),
      );
    }

    graph.destroy();
  });

  it('should allow to create custom node visiting logic', () => {
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

    // Traverse graph with enterNode and leaveNode callbacks.
    breadthFirstSearch(graph, 'A', {
      enter: enterNodeCallback,
      leave: leaveNodeCallback,
      allowTraversal: ({ current, next }) => {
        return !(current.get('id') === 'A' && next.get('id') === 'B');
      },
    });

    expect(enterNodeCallback).toHaveBeenCalledTimes(5);
    expect(leaveNodeCallback).toHaveBeenCalledTimes(5);

    const enterNodeParamsMap = [
      { currentNode: 'A', previousNode: null },
      { currentNode: 'D', previousNode: 'A' },
      { currentNode: 'E', previousNode: 'D' },
      { currentNode: 'F', previousNode: 'E' },
      { currentNode: 'D', previousNode: 'F' },
    ];

    for (let callIndex = 0; callIndex < 5; callIndex += 1) {
      const params = enterNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(enterNodeParamsMap[callIndex].currentNode);
      expect(params.previous && params.previous.get('id')).toEqual(
        enterNodeParamsMap[callIndex].previousNode,
      );
    }

    const leaveNodeParamsMap = [
      { currentNode: 'A', previousNode: null },
      { currentNode: 'D', previousNode: 'A' },
      { currentNode: 'E', previousNode: 'D' },
      { currentNode: 'F', previousNode: 'E' },
      { currentNode: 'D', previousNode: 'F' },
    ];

    for (let callIndex = 0; callIndex < 5; callIndex += 1) {
      const params = leaveNodeCallback.mock.calls[callIndex][0];
      expect(params.current.get('id')).toEqual(leaveNodeParamsMap[callIndex].currentNode);
      expect(params.previous && params.previous.get('id')).toEqual(
        leaveNodeParamsMap[callIndex].previousNode,
      );
    }
  });
});
