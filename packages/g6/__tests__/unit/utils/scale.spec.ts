import { linear, log, pow, sqrt } from '@/src/utils/scale';

describe('scale', () => {
  it('linear', () => {
    expect(linear(0.2, [0, 1], [0, 0])).toEqual(0);
    expect(linear(0, [0, 1], [0, 100])).toEqual(0);
    expect(linear(0.5, [0, 1], [0, 100])).toEqual(50);
    expect(linear(1, [0, 1], [0, 100])).toEqual(100);
  });

  it('log', () => {
    expect(log(0, [0, 1], [0, 100])).toEqual(0);
    expect(log(0.5, [0, 1], [0, 100])).toEqual((Math.log(1.5) / Math.log(2)) * 100);
    expect(log(1, [0, 1], [0, 100])).toEqual(100);
  });

  it('pow', () => {
    expect(pow(0, [0, 1], [0, 100], 2)).toEqual(0);
    expect(pow(0.5, [0, 1], [0, 100])).toEqual(25);
    expect(pow(0.5, [0, 1], [0, 100], 2)).toEqual(25);
    expect(pow(1, [0, 1], [0, 100], 2)).toEqual(100);
  });

  it('sqrt', () => {
    expect(sqrt(0, [0, 1], [0, 100])).toEqual(0);
    expect(sqrt(0.25, [0, 1], [0, 100])).toEqual(50);
    expect(sqrt(1, [0, 1], [0, 100])).toEqual(100);
  });
});
