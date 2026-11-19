import { computeNodeEigenvectorCentrality } from '@/src/utils/centrality';

const toArray = (result: Map<string | number, number>, ids: string[]) => ids.map((id) => result.get(id)!);

describe('centrality', () => {
  it('eigenvector centrality converges to the principal eigenvector', () => {
    // path 1 - 2 - 3 - 4, principal eigenvector is proportional to [1, phi, phi, 1]
    const ids = ['1', '2', '3', '4'];
    const result = computeNodeEigenvectorCentrality({
      nodes: ids.map((id) => ({ id })),
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '3', target: '4' },
      ],
    });

    const phi = (1 + Math.sqrt(5)) / 2;
    const norm = Math.sqrt(2 + 2 * phi * phi);
    const expected = [1 / norm, phi / norm, phi / norm, 1 / norm];
    toArray(result, ids).forEach((value, index) => {
      expect(value).toBeCloseTo(expected[index], 4);
    });
  });

  it('eigenvector centrality of a star differs from degree centrality', () => {
    const ids = ['center', 'a', 'b', 'c', 'd'];
    const result = computeNodeEigenvectorCentrality({
      nodes: ids.map((id) => ({ id })),
      edges: ['a', 'b', 'c', 'd'].map((id) => ({ source: 'center', target: id })),
    });

    // star with 4 leaves: center = 1 / sqrt(2), leaves = 1 / (2 * sqrt(2))
    const [center, ...leaves] = toArray(result, ids);
    expect(center).toBeCloseTo(1 / Math.sqrt(2), 4);
    leaves.forEach((value) => expect(value).toBeCloseTo(1 / (2 * Math.sqrt(2)), 4));
  });

  it('eigenvector centrality is not NaN for a graph without edges', () => {
    const ids = ['1', '2', '3'];
    const result = computeNodeEigenvectorCentrality({ nodes: ids.map((id) => ({ id })), edges: [] });

    toArray(result, ids).forEach((value) => expect(Number.isNaN(value)).toBe(false));
  });
});
