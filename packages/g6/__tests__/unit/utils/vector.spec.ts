import { add, distance, divide, multiply, normalize, perpendicular, subtract } from '../../../src/utils/vector';

describe('Vector Functions', () => {
  it('add', () => {
    expect(add([0, 1], [2, 3])).toEqual([2, 4]);
  });

  it('subtract', () => {
    expect(subtract([0, 1], [2, 3])).toEqual([-2, -2]);
  });

  it('multiply', () => {
    expect(multiply([0, 1], [2, 3])).toEqual([0, 3]);
  });

  it('divide', () => {
    expect(divide([0, 1], [2, 3])).toEqual([0, 1 / 3]);
  });

  it('distance', () => {
    expect(distance([0, 0], [3, 4])).toEqual(5);
  });

  it('normalize', () => {
    expect(normalize([3, 4])).toEqual([0.6, 0.8]);
  });

  it('perpendicular', () => {
    expect(perpendicular([1, 0])).toEqual([-0, -1]);
  });
});
