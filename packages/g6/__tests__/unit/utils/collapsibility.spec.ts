import { isCollapsed } from '@/src/utils/collapsibility';

describe('collapsibility', () => {
  it('isCollapsed', () => {
    expect(isCollapsed({ id: 'xxx' })).toBe(false);
    expect(isCollapsed({ id: 'xxx', style: { collapsed: true } })).toBe(true);
    expect(isCollapsed({ id: 'xxx', style: { collapsed: false } })).toBe(false);
  });
});
