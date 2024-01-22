import { parseAutoFit } from '../../../src/utils/auto-fit';

describe('auto-fit', () => {
  it('parseAutoFit', () => {
    expect(parseAutoFit(undefined)).toBe(undefined);
    expect(parseAutoFit('view')).toEqual({ type: 'view' });
    expect(parseAutoFit({ type: 'center' })).toEqual({ type: 'center' });
  });
});
