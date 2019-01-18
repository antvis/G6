const expect = require('chai').expect;
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'tooltip-spec';
document.body.appendChild(div);

describe('tooltip', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: { default: [] }
  });
  it('basic tooltip', () => {
    graph.addBehaviors('tooltip', 'default');
    graph.setMode('default');
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    graph.emit('node:mouseenter', { x: 52, y: 52, item: node });
    const tooltip = div.childNodes[1];
    expect(tooltip).not.to.be.null;
    const bbox = tooltip.getBoundingClientRect();
    expect(bbox.width).to.equal(35.875);
    expect(bbox.height).to.equal(37);
    const style = tooltip.style;
    expect(style.position).to.equal('absolute');
    expect(style.left).to.equal('64px');
    expect(style.top).to.equal('64px');
    expect(style.color).to.equal('rgb(87, 87, 87)');
    expect(style.fontSize).to.equal('12px');
    expect(style.border).to.equal('1px solid rgb(226, 226, 226)');
    expect(style.borderRadius).to.equal('4px');
    expect(style.visibility).to.equal('visible');
    expect(tooltip.innerHTML).to.equal('text');
    div.removeChild(tooltip);
    graph.emit('node:mousemove', { x: 54, y: 54, item: node });
    expect(style.left).to.equal('66px');
    expect(style.top).to.equal('66px');
    graph.removeBehaviors('tooltip', 'default');
  });
  it('four places tooltip', () => {
    graph.addBehaviors('tooltip', 'default');
    graph.setMode('default');
    const lt = graph.addItem('node', { id: 'lt', color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    const rb = graph.addItem('node', { id: 'rb', color: '#666', x: 400, y: 400, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    const rt = graph.addItem('node', { id: 'rt', color: '#666', x: 400, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    const lb = graph.addItem('node', { id: 'lb', color: '#666', x: 50, y: 400, r: 20, style: { lineWidth: 2, fill: '#666' }, label: 'text' });
    graph.paint();
    graph.emit('node:mouseenter', { x: 52, y: 52, item: lt });
    const tooltip = div.childNodes[1];
    const style = tooltip.style;
    expect(tooltip).not.to.be.null;
    expect(style.left).to.equal('64px');
    expect(style.top).to.equal('64px');
    graph.emit('node:mouseenter', { x: 410, y: 52, item: rt });
    expect(style.left).to.equal('362.125px');
    expect(style.top).to.equal('64px');
    graph.emit('node:mouseenter', { x: 410, y: 410, item: rb });
    expect(style.left).to.equal('362.125px');
    expect(style.top).to.equal('361px');
    graph.emit('node:mouseenter', { x: 52, y: 410, item: lb });
    expect(style.left).to.equal('64px');
    expect(style.top).to.equal('361px');
    graph.removeBehaviors('tooltip', 'default');
    div.removeChild(tooltip);
  });
  it('custom styles', () => {
    graph.addBehaviors([{
      type: 'tooltip',
      backgroundStyle: {
        stroke: '#1890ff',
        radius: 8
      },
      padding: 18
    }], 'default');
    graph.emit('node:mouseenter', { x: 52, y: 52, item: graph.findById('lt') });
    const tooltip = div.childNodes[1];
    const style = tooltip.style;
    const bbox = tooltip.getBoundingClientRect();
    expect(tooltip).not.to.be.null;
    expect(bbox.width).to.equal(59.875);
    expect(bbox.height).to.equal(53);
    expect(style.borderRadius).to.equal('8px');
    expect(style.border).to.equal('1px solid rgb(24, 144, 255)');
    graph.emit('node:mouseleave', { x: 52, y: 52, item: graph.findById('lt') });
    expect(style.visibility).to.equal('hidden');
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
    graph.emit('node:mouseenter', { x: 52, y: 52, item: node });
    const tooltip = div.childNodes[1];
    expect(tooltip.innerHTML).to.equal('custom label');
  });
  it('prevent default');
});
