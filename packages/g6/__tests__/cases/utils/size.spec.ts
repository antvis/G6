import { parseSize } from '@/src/utils/size';

describe('size', () => {
  it('parseSize', () => {
    expect(parseSize()).toEqual([0, 0, 0]);
    expect(parseSize(10)).toEqual([10, 10, 10]);
    expect(parseSize([10, 20])).toEqual([10, 20, 10]);
    expect(parseSize([10, 20, 30])).toEqual([10, 20, 30]);
  });
});
