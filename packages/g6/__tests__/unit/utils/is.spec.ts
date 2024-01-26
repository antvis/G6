import { isEdgeData } from '../../../src/utils/is';

describe('is', () => {
  it('isEdgeData', () => {
    expect(isEdgeData({})).toBe(false);
    expect(isEdgeData({ source: 'node-1', target: 'edge-1' })).toBe(true);
  });
});
