const expect = require('chai').expect;
const Base = require('../../src/base');

describe('base test', () => {
  const base = new Base();
  it('new base', () => {
    const baseInst = new Base({ test: 'aaaa' });
    expect(baseInst).not.to.be.undefined;
    expect(baseInst.model).not.to.be.undefined;
    expect(baseInst.model.test).to.equal('aaaa');
    expect(baseInst.get('test')).to.equal('aaaa');
  });
  it('base getter & setter', ()=> {
    base.set('a', 'a');
    expect(base.get('a')).to.equal('a');
  });
  it('base events', () => {
    let triggered = false;
    base.on('event', () => { triggered = true; });
    base.emit('event');
    expect(triggered).to.be.true;

    triggered = false;
    base.removeEvent('event');
    base.emit('event');
    expect(triggered).to.be.false;
  });
});
