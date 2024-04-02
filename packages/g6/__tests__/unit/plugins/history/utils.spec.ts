import { alignFields } from '@/src/plugins/history/utils';

describe('history utils', () => {
  it('alignFields', () => {
    expect(
      alignFields(
        {
          style: {},
        },
        { style: { visibility: 'hidden' } },
      ),
    ).toEqual({
      style: { visibility: 'visible' },
    });
  });

  // it('parseCommand', () => {
  //   expect(parseCommand());
  // });
});
