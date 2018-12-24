const expect = require('chai').expect;
const G6 = require('../../../src');
const Item = require('../../../src/item/item');

const div = document.createElement('div');
div.id = 'item-spec';
document.body.appendChild(div);

describe('item', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  it('new item & destroy', () => {
    const item = new Item({ a: 1, b: 2, graph });
    const group = item.get('group');
    expect(item).not.to.be.undefined;
    expect(group).not.to.be.undefined;
    expect(item.getType()).to.equal('item');
    const model = item.get('model');
    expect(model.a).to.equal(1);
    expect(model.b).to.equal(2);
    item.destroy();
    expect(item.destroyed).to.be.true;
    expect(group.get('destroyed')).to.be.true;
  });
  it('set & get state', () => {
    const item = new Item({ graph });
    const states = item.getStates();
    expect(states.length).to.equal(0);
    item.setState('active', true);
    expect(states.length).to.equal(1);
    expect(states[0]).to.equal('active');
    item.setState('selected', true);
    expect(states.length).to.equal(2);
    expect(states[0]).to.equal('active');
    expect(states[1]).to.equal('selected');
    item.setState('active', false);
    expect(states.length).to.equal(1);
    expect(states[0]).to.equal('selected');
  });
  it('show & hide', () => {
    const item = new Item({ graph });
    expect(item.isVisible()).to.be.true;
    item.hide();
    expect(item.isVisible()).to.be.false;
    expect(item.get('group').get('visible')).to.be.false;
    item.show();
    expect(item.isVisible()).to.be.true;
    expect(item.get('group').get('visible')).to.be.true;
  });
});
