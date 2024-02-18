import { isComboLayout, isPositionSpecified, isTreeLayout, pickLayoutResult } from '../../../src/utils/layout';

describe('layout', () => {
  it('isComboLayout', () => {
    expect(isComboLayout({ type: 'force' })).toBe(false);
    expect(isComboLayout({ type: 'comboCombined' })).toBe(true);
    expect(isComboLayout({ type: 'dagre', sortByCombo: true })).toBe(true);
    expect(isComboLayout({ type: 'dagre' })).toBe(false);
  });

  it('isTreeLayout', () => {
    expect(isTreeLayout({ type: 'force' })).toBe(false);
    expect(isTreeLayout({ type: 'compact-box' })).toBe(true);
    expect(isTreeLayout({ type: 'mindmap' })).toBe(true);
  });

  it('pickLayoutResult', () => {
    expect(pickLayoutResult({ nodes: [], edges: [] })).toEqual({ nodes: {}, edges: {} });
    expect(
      pickLayoutResult({
        nodes: [{ id: 'node-1', data: { x: 100, y: 100 } }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } }],
      }),
    ).toEqual({
      nodes: {
        'node-1': [100, 100],
      },
      edges: {
        'edge-1': {},
      },
    });
    expect(
      pickLayoutResult({
        nodes: [{ id: 'node-1', data: { x: 100, y: 100, z: 100 } }],
        edges: [],
      }),
    ).toEqual({
      nodes: {
        'node-1': [100, 100, 100],
      },
      edges: {},
    });
    expect(
      pickLayoutResult({
        nodes: [
          { id: 'node-1', data: { x: 100, y: 100 } },
          { id: 'node-2', data: { x: 150, y: 100 } },
          { id: 'node-3', data: { x: 100, y: 150 } },
        ],
        edges: [],
      }),
    ).toEqual({
      nodes: {
        'node-1': [100, 100],
        'node-2': [150, 100],
        'node-3': [100, 150],
      },
      edges: {},
    });
  });

  it('isPositionSpecified', () => {
    expect(isPositionSpecified({})).toBe(false);
    expect(isPositionSpecified({ x: 100 })).toBe(false);
    expect(isPositionSpecified({ y: 100 })).toBe(false);
    expect(isPositionSpecified({ x: 100, y: 100 })).toBe(true);
    expect(isPositionSpecified({ x: 100, y: 100, z: 100 })).toBe(true);
    expect(isPositionSpecified({ x: 0, y: 0, z: 0 })).toBe(true);
  });
});
