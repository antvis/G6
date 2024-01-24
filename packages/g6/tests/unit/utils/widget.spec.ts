import { parseWidget } from '../../../src/utils/widget';

describe('widget', () => {
  it('parseWidget', () => {
    expect(parseWidget('a')).toEqual({ type: 'a' });
    expect(parseWidget({ type: 'a' })).toEqual({ type: 'a' });
    expect(parseWidget({ type: 'a', config: 1 })).toEqual({ type: 'a', config: 1 });
  });
});
