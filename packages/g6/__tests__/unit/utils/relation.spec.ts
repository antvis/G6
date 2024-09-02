import { Graph } from '@/src';
import { getElementNthDegreeIds, getNodeNthDegreeIds } from '@/src/utils/relation';

describe('relation', () => {
  let graph: Graph;

  beforeAll(() => {
    graph = new Graph({
      data: {
        nodes: [{ id: '1', combo: 'combo1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }],
        edges: [
          { source: '1', target: '2' },
          { source: '1', target: '3' },
          { source: '2', target: '4' },
          { source: '3', target: '5' },
          { source: '5', target: '6' },
          { source: 'combo1', target: '6' },
        ],
        combos: [{ id: 'combo1' }],
      },
    });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('getElementNthDegreeIds', () => {
    expect(getElementNthDegreeIds(graph, 'node', '1', 0)).toEqual(['1']);
    expect(getElementNthDegreeIds(graph, 'node', '1', 1)).toEqual(['1', '1-2', '1-3', '2', '3']);
    expect(getElementNthDegreeIds(graph, 'edge', '1-2', 0)).toEqual(['1-2']);
    expect(getElementNthDegreeIds(graph, 'edge', '1-2', 1)).toEqual(['1', '2', '1-2']);
    expect(getElementNthDegreeIds(graph, 'edge', '1-2', 2)).toEqual(['1', '1-2', '1-3', '2', '3', '2-4', '4']);
    expect(getElementNthDegreeIds(graph, 'combo', 'combo1', 1)).toEqual(['combo1', 'combo1-6', '6']);
    expect(getElementNthDegreeIds(graph, 'node', '1', 1, 'in')).toEqual(['1']);
    expect(getElementNthDegreeIds(graph, 'node', '1', 1, 'out')).toEqual(['1', '1-2', '1-3', '2', '3']);
  });

  it('getNodeNthDegreeIds', () => {
    expect(getNodeNthDegreeIds(graph, '1', 0)).toEqual(['1']);
    expect(getNodeNthDegreeIds(graph, '1', 1)).toEqual(['1', '1-2', '1-3', '2', '3']);
    expect(getNodeNthDegreeIds(graph, '1', 2)).toEqual(['1', '1-2', '1-3', '2', '2-4', '3', '3-5', '4', '5']);
    expect(getNodeNthDegreeIds(graph, '1', 1, 'in')).toEqual(['1']);
    expect(getNodeNthDegreeIds(graph, '1', 1, 'out')).toEqual(['1', '1-2', '1-3', '2', '3']);
  });
});
