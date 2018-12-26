const expect = require('chai').expect;
const Behavior = require('../../../src/behavior');

describe('behavior', () => {
  it('register single behavior', () => {
    expect(Behavior.registerBehavior).not.to.be.undefined;
    Behavior.registerBehavior('aa', { bb: 0 });
    expect(Behavior.getBehavior('aa')).not.to.be.undefined;
    expect(Behavior.hasBehavior('aa')).to.be.true;
  });
  it('register several behaviors', () => {
    Behavior.registerBehavior('aa', {});
    Behavior.registerBehavior('bb', {});
    expect(Behavior.hasBehavior('aa')).to.be.true;
    expect(Behavior.hasBehavior('bb')).to.be.true;
  });
  it('overlap behavior', () => {
    Behavior.registerBehavior('aa', { a: 1 });
    Behavior.registerBehavior('aa', { a: 2 });
    expect(Behavior.hasBehavior('aa')).to.be.true;
    expect(Behavior.getBehavior('aa').a).to.equal(2);
  });
});
