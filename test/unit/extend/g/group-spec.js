const expect = require('chai').expect;
const G = require('@antv/g');
const div = document.createElement('div');
require('../../../../src/extend/g/group');
div.id = 'extend-group-spec';
div.setAttribute('data-test-spec', 'extend/g/group-spec.js');
document.body.appendChild(div);
describe('extend group test', () => {
  const canvas = new G.Canvas({
    containerDOM: div
  });
  const group = canvas.addGroup({
    class: 'gg'
  });
  const rectAttrs = {
    x: 0,
    y: 0,
    width: 100,
    heigth: 100,
    fill: 'red'
  };
  const shape1 = group.addShape('rect', {
    attrs: rectAttrs,
    zIndex: 0
  });
  const shape2 = group.addShape('rect', {
    attrs: rectAttrs,
    zIndex: 2,
    class: 'aa'
  });
  const shape3 = group.addShape('rect', {
    attrs: rectAttrs,
    zIndex: 1
  });

  it('deepEach', () => {
    const children = group.get('children');
    group.deepEach(child => {
      child.set('visited', true);
    });
    children.forEach(child => {
      expect(child.get('visited')).equal(true);
    });
  });
  it('sort => radixSort', () => {
    const children = group.get('children');
    group.sort();
    children.forEach((child, index) => {
      expect(child.get('zIndex')).equal(index);
    });
  });
  it('hasClass', () => {
    expect(shape2.hasClass('aa')).eql(true);
    expect(shape1.hasClass('aa')).eql(false);
    expect(group.hasClass('gg')).eql(true);
    expect(canvas.hasClass('gg')).eql(false);
  });
  it('clear', () => {
    group.clear(false);
    const children = group.get('children');
    expect(children.length).equal(0);
    expect(shape1.get('destroyed')).equal(false);
    expect(shape2.get('destroyed')).equal(false);
    expect(shape3.get('destroyed')).equal(false);
  });
  it('destroy test canvas', () => {
    canvas.destroy();
  });
});
