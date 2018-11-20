const G = require('@antv/g');
const div = document.createElement('div');
require('../../../../src/extend/g/dom');
div.id = 'extend-dom-spec';
div.setAttribute('data-test-spec', 'extend/g/dom-spec.js');
document.body.appendChild(div);
describe('extend dom test', () => {
  it('g dom test', () => {
    const canvas = new G.Canvas({
      containerDOM: div,
      width: 500,
      height: 500
    });
    canvas.addShape('dom', {
      attrs: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        html: '<div>3333</div>'
      },
      zIndex: 0,
      class: 'aaa'
    });
    canvas.draw();
    canvas.destroy();
  });
});
