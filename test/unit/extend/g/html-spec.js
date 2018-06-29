const expect = require('chai').expect;
const HtmlShape = require('../../../../src/extend/g/html');
const Util = require('../../../../src/util/');
const G = require('@antv/g');

// const Util = G6.Util;
// const HtmlShape = G6.Graph.HtmlShape;
// const Canvas = G6.Canvas;
const width = 500;
const height = 200;
const dom = document.createElement('div');
document.body.appendChild(dom);
const canvas = new G.canvas.Canvas({
  containerDOM: dom,
  width,
  height,
  pixelRatio: 1
});
const htmlElementContaniner = dom.appendChild(Util.createDOM('<div class="graph-container-html-Elements"></div>'));
htmlElementContaniner.style.width = width + 'px';
htmlElementContaniner.style.height = height + 'px';
htmlElementContaniner.style.position = 'absolute';
htmlElementContaniner.style.top = 0;
htmlElementContaniner.style.left = 0;
htmlElementContaniner.style['z-index'] = -1;
canvas.set('htmlElementContaniner', htmlElementContaniner);
describe('gExtend htmlShape test', function() {
  const html = canvas.addShape('html', {
    attrs: {
      x: 20,
      y: 100,
      width: 50,
      height: 50,
      html: '<div id="ji">记</div>'
    }
  });
  it('hit', function() {
    expect(html.isHit(60, 140)).equal(true);
    expect(html.isHit(0, 0)).equal(false);
  });
  it('attr', function() {
    html.attr('x', 40);
    expect(html.attr('x')).equal(40);
    html.attr({
      html: '<div id="kk">kk</div>',
      border: '1px solid red'
    });
    const dom = html.getDOM();
    expect(dom.getAttribute('id')).equal('kk');
    expect(document.getElementById('ji')).equal(null);
    canvas.draw();
  });
  it('remove false', function() {
    html.remove(false);
    const dom = html.getDOM();
    expect(document.getElementById('kk')).equal(dom);
    expect(document.getElementById('kk').style.visibility).equal('hidden');
  });
  it('destroy', function() {
    html.destroy();
    expect(document.getElementById('kk')).equal(null);
  });
  it('set html str', function() {
    const html = canvas.addShape('html', {
      attrs: {
        x: 20,
        y: 100,
        width: 50,
        height: 50,
        html: '<div id="ji">记</div>'
      }
    });
    const dom = html.getDOM();
    canvas.draw();
    expect(dom.getAttribute('id')).equal('ji');
  });
  it('set dom object', function() {
    const html = canvas.addShape('html', {
      attrs: {
        x: 20,
        y: 100,
        width: 50,
        height: 50,
        html: Util.createDOM('<div id="ji">记</div>')
      }
    });
    const dom = html.getDOM();
    canvas.draw();
    expect(dom.getAttribute('id')).equal('ji');
  });
  it('destroy test canvas', () => {
    canvas.destroy();
  });
  // it('attr', function() {
  //   const html = canvas.addShape('html', {
  //     attrs: {
  //       x: 20,
  //       y: 100,
  //       width: 50,
  //       height: 50,
  //       html: '<div id="ji">记</div>',
  //     },
  //   });
  //   html.attr('x', 40);
  //   html.attr({
  //     border: '1px solid red',
  //   });
  //   canvas.draw();
  // });
});
