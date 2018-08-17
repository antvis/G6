const Base = require('../../../src/layouts/base');
const expect = require('chai').expect;

describe('layout base test', () => {
  const base = new Base();
  it('execute', () => {
    function fn() {
      base.execute();
    }
    expect(fn).to.Throw();
  });
});
