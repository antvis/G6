import { Point } from '../../../src/types';
import { createVector, normalizeVector, perpendicularVector } from '../../../src/utils/vector';

describe('Vector Functions', () => {
  describe('createVector', () => {
    it('should correctly create a vector from two points', () => {
      const from: Point = [0, 0];
      const to: Point = [10, 10];
      const vector = createVector(from, to);
      expect(vector).toEqual([10, 10]);
    });
  });

  describe('normalizeVector', () => {
    it('should normalize a non-zero vector', () => {
      const vector: Point = [3, 4];
      const normalized = normalizeVector(vector);
      expect(normalized[0]).toBeCloseTo(3 / 5);
      expect(normalized[1]).toBeCloseTo(4 / 5);
    });

    it('should handle a zero vector without throwing', () => {
      const vector: Point = [0, 0];
      const normalized = normalizeVector(vector);
      expect(normalized).toEqual([0, 0]);
    });
  });

  describe('perpendicularVector', () => {
    it('should calculate the perpendicular vector correctly', () => {
      const vector: Point = [1, 0];
      const perpendicular = perpendicularVector(vector);
      expect(perpendicular).toEqual([-0, 1]);
    });

    it('should work for vectors in all quadrants', () => {
      const vector: Point = [0, -1];
      const perpendicular = perpendicularVector(vector);
      expect(perpendicular).toEqual([1, 0]);
    });
  });
});
