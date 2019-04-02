const expect = require('chai').expect;
const G6 = require('../../../src');

describe('brush-select', () => {
  const div = document.createElement('div');
  div.id = 'activate-relations-spec';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: { default: [ 'zoom-canvas' ] }
  });
  const node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
  const node2 = graph.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
  graph.addItem('node', { id: 'node3', x: 80, y: 150, label: 'node3' });
  graph.addItem('edge', { source: 'node1', target: 'node2' });
  graph.addItem('edge', { source: 'node1', target: 'node3' });
  it('default configs', () => {
    graph.addBehaviors([ 'brush-select' ], 'default');
    graph.emit('mousedown', { canvasX: 20, canvasY: 20 });
    graph.emit('mousemove', { canvasX: 120, canvasY: 120 });
    graph.emit('mouseup', { canvasX: 120, canvasY: 120, x: 120, y: 120 });
    let selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).to.equal(1);
    expect(selectedNodes[0] === node1).to.be.true;
    graph.emit('canvas:click');
    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).to.equal(0);
    graph.translate(200, 200);
    graph.emit('mousedown', { canvasX: 20, canvasY: 20 });
    graph.emit('mousemove', { canvasX: 120, canvasY: 120 });
    graph.emit('mouseup', { canvasX: 120, canvasY: 120, x: -80, y: -80 });
    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).to.equal(0);
    graph.removeBehaviors([ 'brush-select' ], 'default');
  });
  it('modify cfgs', () => {
    let triggered = false;
    graph.translate(-200, -200);
    graph.addBehaviors([{
      type: 'brush-select',
      selectedState: 'customState',
      onSelect(nodes) {
        expect(nodes.length).to.equal(2);
        triggered = true;
      }
    }], 'default');
    graph.emit('mousedown', { canvasX: 60, canvasY: 120 });
    graph.emit('mousemove', { canvasX: 300, canvasY: 300 });
    graph.emit('mouseup', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
    let selectedNodes = graph.findAllByState('node', 'customState');
    expect(selectedNodes.length).to.equal(2);
    expect(selectedNodes[0] === node2).to.be.true;
    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).to.equal(0);
    graph.emit('canvas:click');
    selectedNodes = graph.findAllByState('node', 'customState');
    expect(selectedNodes.length).to.equal(0);
    expect(triggered).to.be.true;
  });
});
