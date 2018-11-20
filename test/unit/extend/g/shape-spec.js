const expect = require('chai').expect;
const G = require('@antv/g');
const div = document.createElement('div');
require('../../../../src/extend/g/shape');
div.id = 'extend-shape-spec';
div.setAttribute('data-test-spec', 'extend/g/shape-spec.js');
document.body.appendChild(div);
describe('extend shape test', () => {
  const canvas = new G.Canvas({
    containerDOM: div
  });
  const rectAttrs = {
    x: 0,
    y: 0,
    width: 100,
    heigth: 100,
    fill: 'red'
  };
  const rect = canvas.addShape('rect', {
    attrs: rectAttrs,
    zIndex: 0,
    class: 'aaa'
  });
  it('hasClass', () => {
    expect(rect.hasClass('aaa')).eql(true);
  });
  it('destroy test canvas', () => {
    canvas.destroy();
  });
});
