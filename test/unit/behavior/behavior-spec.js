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
    expect(typeof Behavior.getBehavior('aa') === 'function').to.be.true;
    expect(typeof Behavior.getBehavior('aa').set).not.to.be.undefined;
  });
  it('custom behavior', () => {
    let flag = false;
    Behavior.registerBehavior('test', {
      bind() {
        flag = this.get('flag');
        expect(this.get('aaa')).to.equal(111);
        expect(this.get('bbb')).to.equal(222);
      },
      unbind() {
        flag = false;
        expect(this.get('aaa')).to.equal(111);
        expect(this.get('bbb')).to.equal(222);
      }
    });
    let behave = Behavior.getBehavior('test');
    behave = new behave({ flag: true, aaa: 111, bbb: 222 });
    behave.bind();
    expect(flag).to.be.true;
    behave.unbind();
    expect(flag).to.be.false;
  });
});
