import { getElementNthDegreeIDs, getNodeNthDegreeIDs } from '@/src/utils/relation';
import { Graph } from '../../../src';

describe('relation', () => {
  const graph = new Graph({
    data: {
      nodes: [
        { id: '1', style: { parentId: 'combo1' } },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
      ],
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
  it('getElementNthDegreeIDs', () => {
    expect(getElementNthDegreeIDs(graph, 'node', '1', 0)).toEqual(['1']);
    expect(getElementNthDegreeIDs(graph, 'node', '1', 1)).toEqual(['1', '1-2', '1-3', '2', '3']);
    expect(getElementNthDegreeIDs(graph, 'edge', '1-2', 0)).toEqual(['1-2']);
    expect(getElementNthDegreeIDs(graph, 'edge', '1-2', 1)).toEqual(['1', '2', '1-2']);
    expect(getElementNthDegreeIDs(graph, 'edge', '1-2', 2)).toEqual(['1', '1-2', '1-3', '2', '3', '2-4', '4']);
    expect(getElementNthDegreeIDs(graph, 'combo', 'combo1', 1)).toEqual(['combo1', 'combo1-6', '6']);
  });

  it('getNodeNthDegreeIDs', () => {
    expect(getNodeNthDegreeIDs(graph, '1', 0)).toEqual(['1']);
    expect(getNodeNthDegreeIDs(graph, '1', 1)).toEqual(['1', '1-2', '1-3', '2', '3']);
    expect(getNodeNthDegreeIDs(graph, '1', 2)).toEqual(['1', '1-2', '1-3', '2', '2-4', '3', '3-5', '4', '5']);
  });
});
