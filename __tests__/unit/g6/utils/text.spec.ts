import { getWordWrapWidthWithBase } from '@g6/utils/text';

describe('text', () => {
  it('getWordWrapWidthWithBase', () => {
    expect(getWordWrapWidthWithBase(10, 100)).toBe(100);
    expect(getWordWrapWidthWithBase(10, '100%')).toBe(10);
    expect(getWordWrapWidthWithBase(10, '100!')).toBe(20);
  });
});
