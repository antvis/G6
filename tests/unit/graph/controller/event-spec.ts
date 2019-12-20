import Simulate from 'event-simulate';
import G6 from '../../../../src'

const div = document.createElement('div');
div.id = 'event-spec';
document.body.appendChild(div);

describe('event', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  it('init event', () => {
    const canvas = graph.get('canvas');
    expect(graph.get('eventController')).not.toBe(undefined);
    
    let a = 0;
    graph.on('canvas:click', e => {
      a = e.a;
    });

    graph.emit('canvas:click', { a: 1 });
    canvas.emit('click', { a: 1, target: canvas, type: 'click' });
    expect(a).toBe(1);
  });
  it('g event on canvas', () => {
    let triggered = false;
    const canvas = graph.get('canvas');
    graph.on('canvas:click', () => {
      triggered = true;

      expect(triggered).toBe(true);
      graph.off('canvas:click');
    });

    const evt = { type: 'click', target: canvas };
    expect(triggered).toBe(false);

    canvas.emit('click', evt);
  });

  it('g event on shape', () => {
    let target = null;
    const canvas = graph.get('canvas');

    const node = graph.addItem('node', { type: 'circle', color: '#ccc', style: { x: 50, y: 50, r: 20, lineWidth: 2 } });

    const shape = node.get('group').get('children')[0];

    graph.on('node:mousedown', e => { 
      target = e.item; 
      expect(target === node).toBe(true);
    });

    canvas.emit('mousedown', { type: 'mousedown', target: shape });

    target = null;
    graph.off('node:mousedown');

    canvas.emit('mousedown', { type: 'mousedown', target: shape });

    expect(target).toBe(null);
  });
  it('dom event', () => {
    let evt = null;

    const fn = e => {
      evt = e;
      expect(evt).not.toBe(null);
      expect(evt.type).toEqual('keydown');
    };

    graph.on('keydown', fn);

    const canvas = graph.get('canvas').get('el');

    const bbox = canvas.getBoundingClientRect();

    Simulate.simulate(canvas, 'keydown', {
      clientY: bbox.right - 50,
      clientX: bbox.left + 10
    });

    graph.off('keydown', fn);

    evt = null;

    Simulate.simulate(canvas, 'keydown', {
      clientY: bbox.right - 50,
      clientX: bbox.left + 10
    });

    expect(evt).toBe(null);
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

    graph.on('mousemove', e => {
      enter++;
    })

    graph.on('node:mouseleave', e => {
      leave++;
      expect(e.item === node);
    });

    const canvas = graph.get('canvas');
    const label = node.get('group').get('children')[0];
    const shape = node.get('keyShape');

    graph.emit('node:mouseenter', { type: 'mouseenter', target: label });
    expect(enter).toBe(1);

    graph.emit('node:mouseenter', { type: 'mouseenter', target: shape });

    expect(enter).toBe(2);

    graph.emit('node:mouseenter', { type: 'mousemove', target: canvas });
    
    graph.emit('node:mouseenter', { type: 'mousemove', target: shape });
    expect(enter).toBe(4);
    
    graph.emit('mousemove', { type: 'mousemove', target: canvas });
    expect(enter).toBe(5);

    expect(leave).toBe(0);
    graph.emit('node:mouseleave', { type: 'mouseleave', target: shape });
    expect(leave).toBe(1);

    graph.emit('node:mouseleave', { type: 'mousemove', target: canvas });
    expect(leave).toBe(2);

    graph.emit('node:mouseleave', { type: 'mousemove', taregt: canvas });
    expect(leave).toBe(3);
  });
  it('modified viewport', () => {
    let triggered = false;
    graph.off();
    graph.on('mousedown', e => {
      console.log(e, triggered)
      if (triggered) {
        expect(e.canvasX).toBe(5);
        expect(e.canvasY).toBe(225);
        expect(e.x).toBe(-95);
        expect(e.y).toBe(125);
      } else {
        expect(e.canvasX).toBe(5);
        expect(e.canvasY).toBe(225);
        expect(e.x).toBe(5);
        expect(e.y).toBe(225);
      }
    });

    graph.on('mouseup', e => {
      expect(e.canvasX).toBe(5);
      expect(e.canvasY).toBe(5);
      expect(e.x).toBe(-90);
      expect(e.y).toBe(-90);
    });

    const canvas = graph.get('canvas').get('el');
    const bbox = canvas.getBoundingClientRect();

    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.right - 50,
      clientX: bbox.left + 10
    });

    graph.translate(100, 100);
    triggered = true;

    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.right - 50,
      clientX: bbox.left + 10
    });

    graph.zoom(0.5);

    Simulate.simulate(canvas, 'mouseup', {
      clientY: bbox.top + 10,
      clientX: bbox.left + 10
    });
  });
  it('item capture', () => {
    graph.off();
    const node = graph.addItem('node', { x: 100, y: 100, id: 'node' });

    const canvas = graph.get('canvas').get('el');
    const bbox = canvas.getBoundingClientRect();

    let targetItem;
    graph.on('mousedown', e => {
      targetItem = e.target;
      expect(targetItem === graph.get('canvas')).toBe(true);
    });

    Simulate.simulate(canvas, 'mousedown', {
      clientY: bbox.right - 100,
      clientX: bbox.left + 100
    });


    targetItem = null;
    node.enableCapture(false);

    Simulate.simulate(canvas, 'mouseup', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100
    });
    expect(targetItem === node).toBe(false);
  });
  it('event object overlap', () => {
    let count = 0;
    let triggered = false;
    graph.off();
    graph.clear();

    const canvas = graph.get('canvas');
    const node = graph.addItem('node', { x: 100, y: 100, size: 50, label: 'test' });

    graph.on('node:mouseleave', e => {
      triggered = true;
      expect(e.type).toEqual('mouseleave');
    });

    graph.on('mousemove', e => {
      count += 1;
      expect(e.type).toEqual('mousemove');
    });

    canvas.emit('mousemove', { type: 'mousemove', target: node.get('keyShape') });
    expect(count).toEqual(1);
    expect(triggered).toBe(false);

    canvas.emit('mousemove', { type: 'mousemove', target: canvas });
    expect(count).toEqual(2);
    expect(triggered).toBe(true);
  });

  it('destory', () => {
    expect(graph).not.toBe(undefined)
    expect(graph.destroyed).toBe(false)
    graph.destroy()
    expect(graph.destroyed).toBe(true)
  })
});
