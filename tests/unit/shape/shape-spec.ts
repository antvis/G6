/**
 * @fileOverview Shape 工厂方法的测试
 * @author dxq613@gmai.com
 */

import '../../../src/shape'
import Shape from '../../../src/shape/shape'

describe('shape test', () => {
  it('register factory', () => {
    Shape.registerFactory('test', {
      defaultShapeType: 't1'
    });

    expect(Shape['Test']).not.toBe(undefined);
  });

  it('get factory', () => {
    const factory = Shape.getFactory('test');
    expect(factory).not.toBe(undefined);
  });

  it('clear', () => {
    delete Shape['Test'];
    expect(Shape.getFactory('test')).toBe(undefined);
  });
});
