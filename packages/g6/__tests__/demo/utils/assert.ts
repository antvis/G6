import { isEqual } from '@antv/util';

export function assert(value: unknown) {
  return {
    toBe: (expected: unknown) => {
      if (value !== expected) {
        throw new Error(`Expected ${expected} to be ${value}`);
      }
    },
    toEqual: (expected: unknown) => {
      if (!isEqual(value, expected)) {
        throw new Error(`Expected ${expected} to equal ${value}`);
      }
    },
    toCloseTo: (expected: number | number[], delta: number = 0.01) => {
      if (typeof expected === 'number') {
        if (Math.abs(expected - (value as number)) > delta) {
          throw new Error(`Expected ${expected} to be close to ${value}`);
        }
      } else {
        if (expected.length !== (value as number[]).length) {
          throw new Error(`Expected ${expected} to be close to ${value}`);
        }
        for (let i = 0; i < expected.length; i++) {
          if (Math.abs(expected[i] - (value as number[])[i]) > delta) {
            throw new Error(`Expected ${expected} to be close to ${value}`);
          }
        }
      }
    },
  };
}
