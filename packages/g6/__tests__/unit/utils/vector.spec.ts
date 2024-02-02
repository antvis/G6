import {
  add,
  crossVec2,
  crossVec3,
  distance,
  divide,
  manhattanDistance,
  multiply,
  normalize,
  perpendicular,
  subtract,
  toVector2,
  toVector3,
} from '../../../src/utils/vector';

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

  it('crossVec2', () => {
    expect(crossVec2([0, 1], [2, 3])).toEqual(-2);
  });

  it('crossVec3', () => {
    expect(crossVec3([0, 1, 2], [3, 4, 5])).toEqual([-3, 6, -3]);
  });

  it('divide', () => {
    expect(divide([0, 1], [2, 3])).toEqual([0, 1 / 3]);
  });

  it('distance', () => {
    expect(distance([0, 0], [3, 4])).toEqual(5);
  });

  it('manhattanDistance', () => {
    expect(manhattanDistance([0, 0], [3, 4])).toEqual(7);
  });

  it('normalize', () => {
    expect(normalize([3, 4])).toEqual([0.6, 0.8]);
  });

  it('perpendicular', () => {
    expect(perpendicular([1, 0])).toEqual([-0, -1]);
  });

  it('toVector2', () => {
    expect(toVector2([1, 2, 3])).toEqual([1, 2]);
    expect(toVector2([1, 2])).toEqual([1, 2]);
  });

  it('toVector3', () => {
    expect(toVector3([1, 2, 3])).toEqual([1, 2, 3]);
    expect(toVector3([1, 2])).toEqual([1, 2, 0]);
  });
});
