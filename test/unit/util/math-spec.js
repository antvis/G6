
const expect = require('chai').expect;
const Util = require('../../../src/util/');
describe('math util test', () => {
  it('getIntersectPointCircle', () => {
    expect(Util.getIntersectPointCircle(10, 10, 11, 11, 3)).equal(null);
  });
});
