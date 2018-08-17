const Shape = require('../../../src/shape/');
const expect = require('chai').expect;

describe('shape test', () => {
  it('register shape manager', () => {
    Shape.registerShapeManager('shape');
    expect(Shape.registerShape).not.eql(undefined);
  });
  it('register shape', () => {
    Shape.registerShape('a', {});
    Shape.registerShape('b', {}, 'a');
    Shape.registerShape('c', {}, [ 'a', 'b' ]);
  });
});
