import { getLinesIntersection, isLinesParallel } from '@/src/utils/line';

describe('line', () => {
  it('isLinesParallel', () => {
    expect(
      isLinesParallel(
        [
          [100, 100],
          [100, 50],
        ],
        [
          [100, 150],
          [100, 200],
        ],
      ),
    ).toEqual(true);
    expect(
      isLinesParallel(
        [
          [100, 100],
          [100, 50],
        ],
        [
          [100, 150],
          [150, 200],
        ],
      ),
    ).toEqual(false);
  });

  it('getLinesIntersection', () => {
    expect(
      getLinesIntersection(
        [
          [100, 0],
          [100, 200],
        ],
        [
          [0, 100],
          [200, 100],
        ],
      ),
    ).toEqual([100, 100]);
    expect(
      getLinesIntersection(
        [
          [100, 0],
          [100, 200],
        ],
        [
          [0, 100],
          [50, 300],
        ],
      ),
    ).toEqual(undefined);
  });
});
