import { extractWithPrefix } from '../../../src/utils/object';

describe('object', () => {
  it('extractWithPrefix', () => {
    expect(extractWithPrefix({ ab: 1, ac: 2, bc: 3 }, 'a')).toEqual({ b: 1, c: 2 });
    expect(extractWithPrefix({ ab: 1, ac: 2, bc: 3 }, 'b')).toEqual({ c: 3 });
  });
});
