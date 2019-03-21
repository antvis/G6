const expect = require('chai').expect;
const G6 = require('../../../src');

describe('tooltip', () => {
  const div = document.createElement('div');
  div.id = 'tooltip-spec';
  document.body.appendChild(div);
  const graph = new G6.Graph({
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
    const tooltip = div.childNodes[1];
    expect(tooltip).not.to.be.null;
    const bbox = tooltip.getBoundingClientRect();
    expect(bbox.width).to.equal(25.796875);
    expect(bbox.height).to.equal(18);
    const style = tooltip.style;
    expect(style.position).to.equal('absolute');
    expect(style.left).to.equal('64px');
    expect(style.top).to.equal('64px');
    expect(style.visibility).to.equal('visible');
    expect(tooltip.innerHTML).to.equal('text');
    graph.emit('node:mousemove', { canvasX: 54, canvasY: 54, item: node });
    expect(style.left).to.equal('66px');
    expect(style.top).to.equal('66px');
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
    const tooltip = div.childNodes[1];
    const style = tooltip.style;
    expect(tooltip).not.to.be.null;
    expect(style.left).to.equal('64px');
    expect(style.top).to.equal('64px');
    graph.emit('node:mouseenter', { canvasX: 410, canvasY: 52, item: rt });
    expect(style.left).to.equal('384.203px');
    expect(style.top).to.equal('64px');
    graph.emit('node:mouseenter', { canvasX: 410, canvasY: 410, item: rb });
    expect(style.left).to.equal('384.203px');
    expect(style.top).to.equal('392px');
    graph.emit('node:mouseenter', { canvasX: 52, canvasY: 410, item: lb });
    expect(style.left).to.equal('64px');
    expect(style.top).to.equal('392px');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('custom text', () => {
    const node = graph.findById('lb');
    graph.addBehaviors([{
      type: 'tooltip',
      formatText(model, e) {
        expect(model.id).to.equal('lb');
        expect(e.item).to.equal(node);
        return 'custom label';
      }
    }], 'default');
    graph.emit('node:mouseenter', { canvasX: 52, canvasY: 52, item: node });
    const tooltip = div.childNodes[1];
    expect(tooltip.innerHTML).to.equal('custom label');
  });
});
