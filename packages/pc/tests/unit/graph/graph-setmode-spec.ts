import { Graph } from '../../../src';

const div = document.createElement('div');
div.id = 'hull-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
      group: 1,
    },
    {
      id: '2',
      label: '公司2',
      group: 1,
    },
    {
      id: '3',
      label: '公司3',
      group: 1,
    },
    {
      id: '4',
      label: '公司4',
      group: 1,
    },
    {
      id: '5',
      label: '公司5',
      group: 2,
    },
    {
      id: '6',
      label: '公司6',
      group: 2,
    },
    {
      id: '7',
      label: '公司7',
      group: 2,
    },
    {
      id: '8',
      label: '公司8',
      group: 2,
    },
    {
      id: '9',
      label: '公司9',
      group: 2,
    },
  ],
  edges: [
    {
      source: '1',
      target: '1',
      type: 'loop',
    },
    {
      source: '2',
      target: '2',
      type: 'loop',
    },
    {
      source: '1',
      target: '2',
      data: {
        type: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '3',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '2',
      target: '5',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '5',
      target: '6',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '3',
      target: '4',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '4',
      target: '7',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '8',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '9',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

describe('graph setmode and clean the delegates', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: [{
        type: 'drag-node',
        enableDelegate: true
      },
      'zoom-canvas',
      {
        type: 'brush-select',
        trigger: 'drag'
      }],
      custom: ['drag-canvas']
    },
  });

  graph.data(data);
  graph.render();

  it('executing a behavior and set mode', () => {
    const node = graph.getNodes()[0];
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 220, y: 220, item: node });
    graph.setMode('custom');
    const brushRect = graph.get('canvas').find(e => e.get('name') === 'brush-shape')
    expect(!brushRect || brushRect.destroyed).toBe(true);

    graph.setMode('default');
    graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
    graph.emit('dragstart', { canvasX: 20, canvasY: 20 });
    graph.emit('drag', { canvasX: 120, canvasY: 120 });
    graph.setMode('custom');
    const dragDelegate = graph.get('group').find(e => e.get('name') === 'rect-delegate-shape')
    expect(!dragDelegate || dragDelegate.destroyed).toBe(true);
  });
});
