import { mock } from '@/src/utils/mock';

describe('mock', () => {
  it('should return an array of nodes with the specified count', () => {
    expect(mock(5).circle().nodes.length).toBe(5);
    expect(mock(10).random().nodes.length).toBe(10);
  });

  it('should return an array of nodes with default properties', () => {
    const nodeCount = 3;
    const result = mock(nodeCount).circle();
    result.nodes.forEach((node) => {
      expect(node).toHaveProperty('id');
      expect(node).toHaveProperty('data');
    });

    result.edges.forEach((edge) => {
      expect(edge).toHaveProperty('id');
      expect(edge).toHaveProperty('source');
      expect(edge).toHaveProperty('target');
      expect(edge).toHaveProperty('data');
    });
  });
});
