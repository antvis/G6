import { circle, diamond, rect, simple, triangle, triangleRect, vee } from '@/src/utils/symbol';

describe('Symbol Functions', () => {
  describe('circle', () => {
    it('should return the correct path for a circle', () => {
      const path = circle(10, 10);
      expect(path).toEqual([['M', -5, 0], ['A', 5, 5, 0, 1, 0, 5, 0], ['A', 5, 5, 0, 1, 0, -5, 0], ['Z']]);
    });
  });

  describe('triangle', () => {
    it('should return the correct path for a triangle', () => {
      const path = triangle(10, 10);
      expect(path).toEqual([['M', -5, 0], ['L', 5, -5], ['L', 5, 5], ['Z']]);
    });
  });

  describe('diamond', () => {
    it('should return the correct path for a diamond', () => {
      const path = diamond(10, 10);
      expect(path).toEqual([['M', -5, 0], ['L', 0, -5], ['L', 5, 0], ['L', 0, 5], ['Z']]);
    });
  });

  describe('vee', () => {
    it('should return the correct path for a vee', () => {
      const path = vee(10, 10);
      expect(path).toEqual([['M', -5, 0], ['L', 5, -5], ['L', 3, 0], ['L', 5, 5], ['Z']]);
    });
  });

  describe('rect', () => {
    it('should return the correct path for a rectangle', () => {
      const path = rect(10, 10);
      expect(path).toEqual([['M', -5, -5], ['L', 5, -5], ['L', 5, 5], ['L', -5, 5], ['Z']]);
    });
  });

  describe('triangleRect', () => {
    it('should return the correct path for a triangleRect', () => {
      const path = triangleRect(10, 10);
      expect(path).toEqual([
        ['M', -5, 0],
        ['L', 0, -5],
        ['L', 0, 5],
        ['Z'],
        ['M', 3.571428571428571, -5],
        ['L', 5, -5],
        ['L', 5, 5],
        ['L', 3.571428571428571, 5],
        ['Z'],
      ]);
    });
  });

  describe('simple', () => {
    it('should return the correct path for a simple shape', () => {
      const path = simple(10, 10);
      expect(path).toEqual([
        ['M', 5, -5],
        ['L', -5, 0],
        ['L', 5, 0],
        ['L', -5, 0],
        ['L', 5, 5],
      ]);
    });
  });
});
