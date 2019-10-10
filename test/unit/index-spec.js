const expect = require('chai').expect;
const pkg = require('../../package');
const { Global } = require('../../src/index');

describe('global', () => {
  it('version sync', () => {
    expect(Global.version).to.equal(pkg.version);
  });
});
