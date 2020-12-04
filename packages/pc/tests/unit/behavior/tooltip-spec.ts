import '../../../src/behavior';
import '../../../src/shape';
import Graph from '../../../src/graph/graph';

describe('tooltip', () => {
  const div = document.createElement('div');
  div.id = 'tooltip-spec';
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: { default: ['drag-node'] },
  });
  it('basic tooltip', () => {
    graph.addBehaviors(
      {
        type: 'tooltip',
      },
      'default',
    );
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
      label: 'text',
    });
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip).not.toBe(null);
    const style = tooltip.style;
    expect(style.position).toEqual('absolute');
    // expect(style.left).toEqual('56px');
    // expect(style.top).toEqual('4px');
    expect(style.visibility).toEqual('visible');
    expect(tooltip.innerHTML).toEqual('text');
    graph.emit('node:mousemove', { clientX: 54, clientY: 54, item: node });
    // expect(style.left).toEqual('58px');
    // expect(style.top).toEqual('6px');
    div.removeChild(tooltip);
    graph.removeBehaviors('tooltip', 'default');
  });
  it('four places tooltip', () => {
    graph.addBehaviors('tooltip', 'default');
    const lt = graph.addItem('node', {
      id: 'lt',
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
      label: 'text',
    });
    const rb = graph.addItem('node', {
      id: 'rb',
      color: '#666',
      x: 400,
      y: 400,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
      label: 'text',
    });
    const rt = graph.addItem('node', {
      id: 'rt',
      color: '#666',
      x: 400,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
      label: 'text',
    });
    const lb = graph.addItem('node', {
      id: 'lb',
      color: '#666',
      x: 50,
      y: 400,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
      label: 'text',
    });
    graph.paint();
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52, item: lt });
    const tooltip = div.childNodes[1] as HTMLElement;
    tooltip.style.width = '30px';
    tooltip.style.height = '22px';
    const style = tooltip.style;
    expect(tooltip).not.toBe(null);
    // expect(style.left).toEqual('56px');
    // expect(style.top).toEqual('4px');
    graph.emit('node:mouseenter', { clientX: 402, clientY: 52, item: rt });
    // expect(style.left).toEqual('364px');
    // expect(style.top).toEqual('4px');
    graph.emit('node:mouseenter', { clientX: 402, clientY: 402, item: rb });
    // expect(style.left).toEqual('364px');
    // expect(style.top).toEqual('320px');
    graph.emit('node:mouseenter', { clientX: 52, clientY: 402, item: lb });
    // expect(style.left).toEqual('56px');
    // expect(style.top).toEqual('320px');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('custom text', () => {
    const node = graph.findById('lb');
    graph.addBehaviors(
      [
        {
          type: 'tooltip',
          formatText(model, e) {
            expect(model.id).toEqual('lb');
            expect(e.item).toEqual(node);
            return 'custom label';
          },
        },
      ],
      'default',
    );
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip.innerText).toEqual('custom label');
    graph.emit('node:mouseleave', { clientX: 52, clientY: 52, item: node });
    expect(tooltip.style.visibility).toEqual('hidden');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('prevent update', () => {
    expect(div.childNodes[1]).toEqual(undefined);
    const node = graph.findById('lb');
    graph.addBehaviors(
      [
        {
          type: 'tooltip',
          shouldUpdate: (e) => {
            expect(e).not.toBe(undefined);
            return false;
          },
        },
      ],
      'default',
    );
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52, item: node });
    graph.emit('node:mousemove', { clientX: 55, clientY: 55, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip.style.visibility).toEqual('hidden');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('prevent begin', () => {
    const node = graph.findById('lb');
    graph.addBehaviors(
      [
        {
          type: 'tooltip',
          shouldBegin: (e) => {
            expect(e).not.toBe(undefined);
            return false;
          },
        },
      ],
      'default',
    );
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip.style.visibility).toEqual('hidden');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('prevent end', () => {
    const node = graph.findById('lb');
    graph.addBehaviors(
      [
        {
          type: 'tooltip',
          shouldEnd: (e) => {
            expect(e).not.toBe(undefined);
            return false;
          },
        },
      ],
      'default',
    );
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52, item: node });
    graph.emit('node:mousemove', { clientX: 55, clientY: 55, item: node });
    graph.emit('node:mouseleave', { clientX: 60, clientY: 60, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip.style.visibility).toEqual('visible');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('without current target', () => {
    graph.addBehaviors(['tooltip'], 'default');
    graph.emit('node:mouseenter', { clientX: 52, clientY: 52 }); // without target and item
    graph.emit('node:mousemove', { clientX: 55, clientY: 55 }); // without target and item
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip).toEqual(undefined);
    graph.removeBehaviors('tooltip', 'default');
    graph.destroy();
  });
});

describe('edge-tooltip', () => {
  const div = document.createElement('div');
  div.id = 'edge-tooltip-spec';
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: { default: ['drag-node'] },
  });
  const data = {
    nodes: [
      {
        id: 'node0',
        x: 50,
        y: 50,
      },
      {
        id: 'node1',
        x: 200,
        y: 50,
      },
    ],
    edges: [
      {
        source: 'node0',
        target: 'node1',
        label: 'edge label',
      },
    ],
  };
  graph.data(data);
  graph.render();
  it('edge tooltip', () => {
    graph.addBehaviors(
      [
        {
          type: 'edge-tooltip',
        },
      ],
      'default',
    );
    const edge = graph.getEdges()[0];
    graph.emit('edge:mouseenter', { clientX: 52, clientY: 52, item: edge });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip.innerText).toEqual('source: node0 target: node1');
    graph.emit('edge:mouseleave', { clientX: 52, clientY: 52, item: edge });
    expect(tooltip.style.visibility).toEqual('hidden');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
    graph.destroy();
  });
});
