import '../../../src/behavior';
import Graph from '../../../src/graph/graph';

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
        default: ['click-select'],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.addItem('node', {
      color: '#666',
      x: 80,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#aaa' },
    });

    graph.once('nodeselectchange', (e) => {
      expect(e.selectedItems.nodes.length).toEqual(1);
    });

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
        default: ['click-select'],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node1 = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    const node2 = graph.addItem('node', {
      color: '#666',
      x: 150,
      y: 150,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
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
        default: [
          {
            type: 'click-select',
            shouldUpdate: () => {
              return false;
            },
          },
        ],
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
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
        default: [
          {
            type: 'click-select',
          },
        ],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.emit('node:click', { item: node });
    expect(node.hasState('selected')).toBe(true);
    graph.emit('canvas:click');
    expect(node.hasState('selected')).toBe(false);
    graph.destroy();
  });
  it('invalid trigger, multiple is false', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'click-select',
            trigger: 'abc',
            multiple: false,
          },
        ],
      },
    });
    graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    expect(graph.get('modeController').currentBehaves[0].trigger).toEqual('shift');
    graph.destroy();
  });
  it('invalid key', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'click-select',
          },
        ],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node1 = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    const node2 = graph.addItem('node', {
      color: '#666',
      x: 150,
      y: 150,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(1);
    expect(node1.getStates()[0]).toEqual('selected');
    // key undefined
    graph.emit('keydown', { key: undefined });
    graph.emit('node:click', { item: node2 });
    expect(node1.hasState('selected')).toBe(false);
    expect(node2.hasState('selected')).toBe(true);

    // different from trigger
    graph.emit('keydown', { key: 'alt' });
    graph.emit('node:click', { item: node1 });
    graph.emit('node:click', { item: node2 });
    expect(node1.hasState('selected')).toBe(false);
    expect(node2.hasState('selected')).toBe(true);
    graph.destroy();
  });
});
