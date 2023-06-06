
const expect = require('chai').expect;
const Util = require('../../../src/util/');
describe('graphic util test', () => {
  it('getNineBoxPosition', () => {
    expect(Util.getNineBoxPosition('', { x: 0, y: 0, width: 11, height: 11 }, 100, 100, [ 10, 101, 10, 10 ])).to.deep.equal({ y: 10, x: 10 });
  });
});
