import { isComboLayout, isPositionSpecified, isTreeLayout } from '@/src/utils/layout';

describe('layout', () => {
  it('isComboLayout', () => {
    expect(isComboLayout({ type: 'force' })).toBe(false);
    expect(isComboLayout({ type: 'comboCombined' })).toBe(true);
    expect(isComboLayout({ type: 'antv-dagre', sortByCombo: true })).toBe(true);
    expect(isComboLayout({ type: 'antv-dagre' })).toBe(false);
  });

  it('isTreeLayout', () => {
    expect(isTreeLayout({ type: 'force' })).toBe(false);
    expect(isTreeLayout({ type: 'compact-box' })).toBe(true);
    expect(isTreeLayout({ type: 'mindmap' })).toBe(true);
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
