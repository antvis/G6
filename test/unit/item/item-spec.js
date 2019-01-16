const expect = require('chai').expect;
const G = require('@antv/g/lib');
const Item = require('../../../src/item/item');
const div = document.createElement('div');
div.id = 'item-spec';
document.body.appendChild(div);

const canvas = new G.Canvas({
  containerId: 'item-spec',
  width: 500,
  height: 500
});

describe('item test', () => {
  it('new item & destroy', () => {
    const group = new G.Group({});
    const item = new Item({
      model: { a: 1, b: 2 },
      group
    });
    item.set({
      a: 11,
      b: 22
    });
    expect(item.get('a')).eql(11);
    expect(item.isItem()).eql(true);
    const root = item.get('group');
    expect(item).not.to.be.undefined;
    expect(root).not.to.be.undefined;
    expect(item.getContainer()).eql(group);
    expect(item.get('type')).to.equal('item');
    const model = item.get('model');
    expect(model).eql(item.getModel());
    expect(item.get('type')).eql(item.getType());
    expect(model.a).to.equal(1);
    expect(model.b).to.equal(2);
    item.hide();
    expect(item.get('visible')).eql(false);
    item.show();
    expect(item.get('visible')).eql(true);
    item.destroy();
    expect(item.destroyed).to.be.true;
    expect(root.get('destroyed')).to.be.true;
  });

  it('set & get state', () => {
    const group = new G.Group({});
    const item = new Item({
      group,
      model: { color: 'red', shape: 'rect' }
    });
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
    item.setState('selected', true);
    expect(states.length).to.equal(1);
    expect(states[0]).to.equal('selected');
    item.setState('selected', false);
    expect(states.length).to.equal(0);
  });

  it('to front', () => {
    const group = canvas.addGroup();
    const item = new Item({
      group,
      model: { id: 'a', color: 'red', shape: 'rect' }
    });
    expect(group.get('id')).eql('a');
    const group1 = canvas.addGroup();
    const item1 = new Item({
      group: group1,
      model: { id: 'b', color: 'red', shape: 'circle' }
    });
    expect(group1.get('item')).eql(item1);
    expect(canvas.get('children')[0]).eql(group);
    item.toFront();
    expect(canvas.get('children')[1]).eql(group);
    item.toBack();
    expect(canvas.get('children')[0]).eql(group);
  });

  it('show & hide', () => {
    const group = new G.Group({});
    const item = new Item({
      group
    });
    expect(item.get('visible')).to.be.true;
    item.changeVisibility(false);
    expect(item.get('visible')).to.be.false;
    expect(item.get('group').get('visible')).to.be.false;
    item.changeVisibility(true);
    expect(item.get('visible')).to.be.true;
    expect(item.get('group').get('visible')).to.be.true;
  });
  it('clear', () => {
    canvas.destroy();
  });
});
