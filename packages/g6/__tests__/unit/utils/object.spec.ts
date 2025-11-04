import { omitBy } from '@/src/utils/object';

describe('object utils', () => {
  describe('omitBy', () => {
    it('should omit properties based on predicate', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = omitBy(obj, (value) => value % 2 === 0);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should work with string values', () => {
      const obj = { a: 'hello', b: '', c: 'world', d: null };
      const result = omitBy(obj, (value) => !value);
      expect(result).toEqual({ a: 'hello', c: 'world' });
    });

    it('should pass both value and key to predicate', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omitBy(obj, (value, key) => key === 'b' || value === 3);
      expect(result).toEqual({ a: 1 });
    });

    it('should return empty object when all properties are omitted', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omitBy(obj, () => true);
      expect(result).toEqual({});
    });

    it('should return same object when no properties are omitted', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omitBy(obj, () => false);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should handle empty object', () => {
      const obj = {};
      const result = omitBy(obj, () => true);
      expect(result).toEqual({});
    });

    it('should work with undefined and null values', () => {
      const obj = { a: undefined, b: null, c: 0, d: false, e: '' };
      const result = omitBy(obj, (value) => value == null);
      expect(result).toEqual({ c: 0, d: false, e: '' });
    });

    it('should only check own properties', () => {
      const proto = { inherited: 'value' };
      const obj = Object.create(proto);
      obj.own = 'property';
      const result = omitBy(obj, () => false);
      expect(result).toEqual({ own: 'property' });
      expect(result.inherited).toBeUndefined();
    });
  });
});
