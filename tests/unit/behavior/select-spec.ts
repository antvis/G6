import '../../../src/behavior'
import '../../../src/shape'
import Graph from '../../../src/graph/graph'

const div = document.createElement('div');
div.id = 'select-spec';
document.body.appendChild(div);

describe('select-node', () => {
  it('select & deselect single node', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'click-select' ]
      },
      pixelRatio: 2
    });
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, size: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:click', { item: node });
    expect(node.getStates().length).toEqual(1);
    expect(node.hasState('selected')).toBe(true);
    graph.emit('node:click', { item: node });
    expect(node.getStates().length).toEqual(0);
    graph.destroy();
  });
  it('select & deselect multiple node', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'click-select' ]
      },
      pixelRatio: 2
    });
    const node1 = graph.addItem('node', { color: '#666', x: 50, y: 50, size: 20, style: { lineWidth: 2, fill: '#666' } });
    const node2 = graph.addItem('node', { color: '#666', x: 150, y: 150, size: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(1);
    expect(node1.getStates()[0]).toEqual('selected');
    graph.emit('keydown', { key: 'shift' });
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(0);
    graph.emit('node:click', { item: node1 });
    expect(node1.hasState('selected')).toBe(true);
    graph.emit('node:click', { item: node2 });
    expect(node2.getStates().length).toEqual(1);
    expect(node2.getStates()[0]).toEqual('selected');
    expect(node1.hasState('selected')).toBe(true);
    graph.emit('keyup', { key: 'shift' });
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(0);
    expect(node2.getStates().length).toEqual(0);
    graph.destroy();
  });
  it('shouldUpdate', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'click-select',
          shouldUpdate: () => { return false; }
        }]
      },
      pixelRatio: 2
    });
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, size: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:click', { item: node });
    expect(node.hasState('selected')).toBe(false);
    graph.destroy();
  });
  it('click canvas to cancel', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'click-select'
        }]
      },
      pixelRatio: 2
    });
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, size: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:click', { item: node });
    expect(node.hasState('selected')).toBe(true);
    graph.emit('canvas:click');
    expect(node.hasState('selected')).toBe(false);
  });
});
