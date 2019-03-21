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
      container: 'graph-spec',
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
  it('g event on canvas', done => {
    let triggered = false;
    const canvas = graph.get('canvas');
    graph.on('canvas:click', () => {
      triggered = true;
    });
    const evt = { type: 'click', target: canvas };
    expect(triggered).to.be.false;
    canvas.emit('click', evt);
    setTimeout(() => {
      expect(triggered).to.be.true;
      graph.removeEvent('canvas:click');
      triggered = false;
      canvas.emit('click', evt);
      expect(triggered).to.be.false;
      done();
    }, 500);
  });

  it('g event on shape', () => {
    let target = null;
    const canvas = graph.get('canvas');
    const node = graph.addItem('node', { type: 'circle', color: '#ccc', style: { x: 50, y: 50, r: 20, lineWidth: 2 } });
    const shape = node.get('group').get('children')[0];
    graph.on('node:mousedown', e => { target = e.item; });
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
  it('mouseenter & mouseleave', () => {
    graph.clear();
    const node = graph.addItem('node', { x: 100, y: 100, size: 50, label: 'test' });
    let enter = 0;
    let leave = 0;
    graph.on('node:mouseenter', e => {
      enter++;
      expect(e.item === node);
    });
    graph.on('node:mouseleave', e => {
      leave++;
      expect(e.item === node);
    });
    const canvas = graph.get('canvas');
    const label = node.get('group').get('children')[0];
    const shape = node.get('keyShape');
    label.emit('mouseenter', { type: 'mouseenter', target: label });
    label.emit('mouseenter', { type: 'mouseenter', target: label });
    expect(enter).to.equal(0);
    shape.emit('mouseenter', { type: 'mouseenter', target: shape });
    expect(enter).to.equal(0);
    canvas.emit('mousemove', { type: 'mousemove', target: canvas });
    shape.emit('mousemove', { type: 'mousemove', target: shape });
    expect(enter).to.equal(1);
    shape.emit('mousemove', { type: 'mousemove', target: label });
    expect(enter).to.equal(1);
    shape.emit('mouseleave', { type: 'mouseleave', target: shape });
    expect(leave).to.equal(0);
    canvas.emit('mousemove', { type: 'mousemove', target: canvas });
    expect(leave).to.equal(1);
    canvas.emit('mousemove', { type: 'mousemove', taregt: canvas });
    expect(leave).to.equal(1);
  });
  it('modified viewport', () => {
    let triggered = false;
    graph.removeEvent();
    graph.on('mousedown', e => {
      if (triggered) {
        expect(e.canvasX).to.equal(10);
        expect(e.canvasY).to.equal(10);
        expect(e.x).to.equal(-90);
        expect(e.y).to.equal(-90);
      } else {
        expect(e.canvasX).to.equal(10);
        expect(e.canvasY).to.equal(10);
        expect(e.x).to.equal(10);
        expect(e.y).to.equal(10);
        triggered = true;
      }
    });
    graph.on('mouseup', e => {
      expect(e.canvasX).to.equal(10);
      expect(e.canvasY).to.equal(10);
      expect(e.x).to.equal(-80);
      expect(e.y).to.equal(-80);
    });
    const canvas = graph.get('canvas').get('el');
    const bbox = canvas.getBoundingClientRect();
    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.top + 10,
      clientX: bbox.left + 10
    });
    graph.translate(100, 100);
    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.top + 10,
      clientX: bbox.left + 10
    });
    graph.zoom(0.5);
    Simulate.simulate(canvas, 'mouseup', {
      clientY: bbox.top + 10,
      clientX: bbox.left + 10
    });
  });
  it('item capture', () => {
    graph.removeEvent();
    const node = graph.addItem('node', { x: 100, y: 100, id: 'node' });
    const canvas = graph.get('canvas').get('el');
    const bbox = canvas.getBoundingClientRect();
    let targetItem;
    graph.on('node:click', e => {
      targetItem = e.item;
    });
    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100
    });
    expect(targetItem === node);
    targetItem = null;
    node.enableCapture(false);
    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100
    });
    expect(targetItem === node).to.be.false;
  });
  it('event object overlap', () => {
    let count = 0;
    let triggered = false;
    graph.removeEvent();
    graph.clear();
    const canvas = graph.get('canvas');
    const node = graph.addItem('node', { x: 100, y: 100, size: 50, label: 'test' });
    graph.on('node:mouseleave', e => {
      triggered = true;
      expect(e.type).to.equal('mouseleave');
    });
    graph.on('mousemove', e => {
      count += 1;
      expect(e.type).to.equal('mousemove');
    });
    canvas.emit('mousemove', { type: 'mousemove', target: node.get('keyShape') });
    expect(count).to.equal(1);
    expect(triggered).to.be.false;
    canvas.emit('mousemove', { type: 'mousemove', target: canvas });
    expect(count).to.equal(2);
    expect(triggered).to.be.true;
  });
});
