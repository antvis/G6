const expect = require('chai').expect;
const G = require('@antv/g');
const Item = require('../../../src/item/item');

const div = document.createElement('div');
div.id = 'item-spec';
document.body.appendChild(div);

describe('item', () => {
  it('new item & destroy', () => {
    const group = new G.Group({});
    const item = new Item({ a: 1, b: 2 }, group);
    const root = item.get('group');
    expect(item).not.to.be.undefined;
    expect(root).not.to.be.undefined;
    expect(item.getType()).to.equal('item');
    const model = item.get('model');
    expect(model.a).to.equal(1);
    expect(model.b).to.equal(2);
    item.destroy();
    expect(item.destroyed).to.be.true;
    expect(root.get('destroyed')).to.be.true;
  });
  it('set & get state', () => {
    const group = new G.Group({});
    const item = new Item({}, group);
    const states = item.getStates();
    expect(states.length).to.equal(0);
    item._setState('active', true);
    expect(states.length).to.equal(1);
    expect(states[0]).to.equal('active');
    item._setState('selected', true);
    expect(states.length).to.equal(2);
    expect(states[0]).to.equal('active');
    expect(states[1]).to.equal('selected');
    item._setState('active', false);
    expect(states.length).to.equal(1);
    expect(states[0]).to.equal('selected');
    item._setState('selected', true);
    expect(states.length).to.equal(1);
    expect(states[0]).to.equal('selected');
  });
  it('show & hide', () => {
    const group = new G.Group({});
    const item = new Item({}, group);
    expect(item.isVisible()).to.be.true;
    item._setState('visible', false);
    expect(item.isVisible()).to.be.false;
    expect(item.get('group').get('visible')).to.be.false;
    item._setState('visible', true);
    expect(item.isVisible()).to.be.true;
    expect(item.get('group').get('visible')).to.be.true;
  });
});
