import {
  add,
  angle,
  cross,
  distance,
  divide,
  dot,
  exactEquals,
  manhattanDistance,
  mod,
  multiply,
  normalize,
  perpendicular,
  rad,
  scale,
  subtract,
  toVector2,
  toVector3,
} from '@/src/utils/vector';

describe('Vector Functions', () => {
  it('add', () => {
    expect(add([0, 1], [2, 3])).toEqual([2, 4]);
    expect(add([0, 1, 3], [2, 3, 4])).toEqual([2, 4, 7]);
  });

  it('subtract', () => {
    expect(subtract([0, 1], [2, 3])).toEqual([-2, -2]);
    expect(subtract([0, 1, 3], [2, 3, 4])).toEqual([-2, -2, -1]);
  });

  it('multiply', () => {
    expect(multiply([0, 1], [2, 3])).toEqual([0, 3]);
    expect(multiply([0, 1, 3], [2, 3, 4])).toEqual([0, 3, 12]);
    expect(multiply([0, 1], 2)).toEqual([0, 2]);
    expect(multiply([0, 1, 3], 2)).toEqual([0, 2, 6]);
  });

  it('divide', () => {
    expect(divide([0, 1], [2, 3])).toEqual([0, 1 / 3]);
    expect(divide([0, 1, 3], [2, 3, 4])).toEqual([0, 1 / 3, 3 / 4]);
    expect(divide([0, 1], 2)).toEqual([0, 0.5]);
    expect(divide([0, 1, 3], 2)).toEqual([0, 0.5, 1.5]);
  });

  it('dot', () => {
    expect(dot([0, 1], [2, 3])).toEqual(3);
    expect(dot([0, 1, 3], [2, 3, 4])).toEqual(15);
  });

  it('cross', () => {
    expect(cross([0, 1], [-1, 0])).toEqual([0, -0, 1]);
    expect(cross([0, 1], [2, 3])).toEqual([0, 0, -2]);
    expect(cross([0, 1, 3], [2, 3, 4])).toEqual([-5, 6, -2]);
  });

  it('scale', () => {
    expect(scale([0, 1], 2)).toEqual([0, 2]);
    expect(scale([0, 1, 3], 2)).toEqual([0, 2, 6]);
  });

  it('distance', () => {
    expect(distance([0, 0], [3, 4])).toEqual(5);
    expect(distance([0, 0, 0], [3, 4, 0])).toEqual(5);
  });

  it('manhattanDistance', () => {
    expect(manhattanDistance([0, 0], [3, 4])).toEqual(7);
    expect(manhattanDistance([0, 0, 0], [3, 4, 0])).toEqual(7);
  });

  it('normalize', () => {
    expect(normalize([3, 4])).toEqual([0.6, 0.8]);
    expect(normalize([3, 4, 0])).toEqual([0.6, 0.8, 0]);
  });

  it('angle', () => {
    expect(angle([1, 0], [0, 1])).toEqual(Math.PI / 2);
    expect(angle([1, 0], [-1, 0], true)).toEqual(Math.PI);
    expect(angle([1, 0], [0, -1], true)).toEqual((Math.PI * 3) / 2);
  });

  it('exactEquals', () => {
    expect(exactEquals([1, 2], [1, 2])).toEqual(true);
    expect(exactEquals([1, 2], [1, 3])).toEqual(false);
    expect(exactEquals([1, 2, 3], [1, 2, 3])).toEqual(true);
    expect(exactEquals([1, 2, 3], [1, 2, 4])).toEqual(false);
  });

  it('perpendicular', () => {
    expect(perpendicular([1, 1])).toEqual([-1, 1]);
    expect(perpendicular([1, 1], false)).toEqual([1, -1]);
  });

  it('mode', () => {
    expect(mod([1, 2], 2)).toEqual([1, 0]);
    expect(mod([1, 2, 3], 2)).toEqual([1, 0, 1]);
  });

  it('toVector2', () => {
    expect(toVector2([1, 2, 3])).toEqual([1, 2]);
    expect(toVector2([1, 2])).toEqual([1, 2]);
  });

  it('toVector3', () => {
    expect(toVector3([1, 2, 3])).toEqual([1, 2, 3]);
    expect(toVector3([1, 2])).toEqual([1, 2, 0]);
  });

  it('rad', () => {
    expect(rad([1, 0])).toEqual(0);
    expect(rad([0, 1])).toEqual(Math.PI / 2);
  });
});
