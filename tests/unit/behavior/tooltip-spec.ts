import '../../../src/behavior'
import '../../../src/shape'
import Graph from '../../../src/graph/graph'

describe('tooltip', () => {
  const div = document.createElement('div');
  div.id = 'tooltip-spec';
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: { default: [] }
  });
  it('basic tooltip', () => {
    graph.addBehaviors({
      type: 'tooltip'
    }, 'default');
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    graph.emit('node:mouseenter', { canvasX: 52, canvasY: 52, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip).not.toBe(null);
    const bbox = tooltip.getBoundingClientRect();
    expect(bbox.width).toEqual(28.390625);
    expect(bbox.height).toEqual(22);
    const style = tooltip.style;
    expect(style.position).toEqual('absolute');
    expect(style.left).toEqual('64px');
    expect(style.top).toEqual('64px');
    expect(style.visibility).toEqual('visible');
    expect(tooltip.innerHTML).toEqual('text');
    graph.emit('node:mousemove', { canvasX: 54, canvasY: 54, item: node });
    expect(style.left).toEqual('66px');
    expect(style.top).toEqual('66px');
    div.removeChild(tooltip);
    graph.removeBehaviors('tooltip', 'default');
  });
  it('four places tooltip', () => {
    graph.addBehaviors('tooltip', 'default');
    const lt = graph.addItem('node', { id: 'lt', color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    const rb = graph.addItem('node', { id: 'rb', color: '#666', x: 400, y: 400, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    const rt = graph.addItem('node', { id: 'rt', color: '#666', x: 400, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    const lb = graph.addItem('node', { id: 'lb', color: '#666', x: 50, y: 400, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    graph.paint();
    graph.emit('node:mouseenter', { canvasX: 52, canvasY: 52, item: lt });
    const tooltip = div.childNodes[1] as HTMLElement;
    const style = tooltip.style;
    expect(tooltip).not.toBe(null);
    expect(style.left).toEqual('64px');
    expect(style.top).toEqual('64px');
    graph.emit('node:mouseenter', { canvasX: 410, canvasY: 52, item: rt });
    expect(style.left).toEqual('381.609px');
    expect(style.top).toEqual('64px');
    graph.emit('node:mouseenter', { canvasX: 410, canvasY: 410, item: rb });
    expect(style.left).toEqual('381.609px');
    expect(style.top).toEqual('388px');
    graph.emit('node:mouseenter', { canvasX: 52, canvasY: 410, item: lb });
    expect(style.left).toEqual('64px');
    expect(style.top).toEqual('388px');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('custom text', () => {
    const node = graph.findById('lb');
    graph.addBehaviors([{
      type: 'tooltip',
      formatText(model, e) {
        expect(model.id).toEqual('lb');
        expect(e.item).toEqual(node);
        return 'custom label';
      }
    }], 'default');
    graph.emit('node:mouseenter', { canvasX: 52, canvasY: 52, item: node });
    const tooltip = div.childNodes[1] as HTMLElement;
    expect(tooltip.innerHTML).toEqual('custom label');
  });
});
