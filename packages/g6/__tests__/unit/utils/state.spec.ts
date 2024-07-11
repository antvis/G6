import { statesOf } from '@/src/utils/state';

describe('state', () => {
  it('statesOf', () => {
    expect(
      statesOf({
        id: 'node-1',
      }),
    ).toEqual([]);

    expect(
      statesOf({
        id: 'node-1',
        states: ['selected'],
      }),
    ).toEqual(['selected']);
  });
});
