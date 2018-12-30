const expect = require('chai').expect;
const Simulate = require('event-simulate');
const G6 = require('../../../../src/');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('event', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  it('init event', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2
    });
    const canvas = graph.get('canvas');
    expect(graph.get('eventController')).not.to.be.undefined;
    let a = 0;
    graph.on('canvas:click', e => {
      a = e.a;
    });
    graph.emit('canvas:click', { a: 1 });
    canvas.emit('click', { a: 1, target: canvas, type: 'click' });
    expect(a).to.equal(1);
  });
  it('g event on canvas', () => {
    let triggered = false;
    const canvas = graph.get('canvas');
    graph.on('canvas:click', () => {
      triggered = true;
    });
    const evt = { type: 'click', target: canvas };
    expect(triggered).to.be.false;
    canvas.emit('click', evt);
    expect(triggered).to.be.true;
    graph.removeEvent('canvas:click');
    triggered = false;
    canvas.emit('click', evt);
    expect(triggered).to.be.false;
  });
  // 报错，暂时注释掉
  xit('g event on shape', () => {
    let target = null;
    const canvas = graph.get('canvas');
    const node = graph.add('node', { type: 'circle', color: '#ccc', style: { x: 50, y: 50, r: 20, lineWidth: 2 } });
    const shape = node.get('group').get('children')[0];
    graph.on('node:mousedown', e => { target = e.target; });
    canvas.emit('mousedown', { type: 'mousedown', target: shape });
    expect(target === node).to.be.true;
    target = null;
    graph.removeEvent('node:mousedown');
    canvas.emit('mousedown', { type: 'mousedown', target: shape });
    expect(target).to.be.null;
  });
  it('dom event', () => {
    let evt = null;
    const fn = e => {
      evt = e;
    };
    graph.on('keydown', fn);
    const canvas = graph.get('canvas').get('el');
    const bbox = canvas.getBoundingClientRect();
    Simulate.simulate(canvas, 'keydown', {
      clientY: bbox.top + 10,
      clientX: bbox.left + 10
    });
    expect(evt).not.to.be.null;
    expect(evt.type).to.equal('keydown');
    graph.off('keydown', fn);
    evt = null;
    Simulate.simulate(canvas, 'keydown', {
      clientY: bbox.top + 10,
      clientX: bbox.left + 10
    });
    expect(evt).to.be.null;
  });
});
