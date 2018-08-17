const Base = require('../../src/base');
const expect = require('chai').expect;

describe('base test', () => {
  const base = new Base();
  it('getDefaultCfg', () => {
    expect(base.getDefaultCfg()).not.eql(undefined);
  });
});
