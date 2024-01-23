import { idOf } from '../../../src/utils/id';

describe('id', () => {
  it('idOf', () => {
    expect(idOf({ id: '1' })).toBe('1');
    expect(idOf({ id: 1 })).toBe(1);
  });
});
