import '../../../src/behavior';
import '../../../src/shape';

import Graph from '../../../src/graph/graph';
import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'drag-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '0',
      x: 50,
      y: 50,
    },
    {
      id: '1',
      x: 150,
      y: 150,
    },
  ],
};

describe('create-edge', () => {
  it('create edge default config', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['create-edge'],
      },
      defaultEdge: {
        style: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(1);
    const edge = graph.getEdges()[0];

    // cancel
    graph.emit('edge:click', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(0);

    // create
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 120, y: 120, item: node1 });
    expect(graph.getEdges().length).toEqual(1);

    // loop
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    expect(graph.getEdges().length).toEqual(2);
    const loop = graph.getEdges()[1];
    expect(loop.getModel().source).toEqual(loop.getModel().target);
    graph.destroy();
  });
  it('create edge width polyline edge', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['create-edge'],
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(1);
    const edge = graph.getEdges()[0];

    // cancel
    graph.emit('edge:click', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(0);

    // create
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 120, y: 120, item: node1 });
    expect(graph.getEdges().length).toEqual(1);

    // loop
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    expect(graph.getEdges().length).toEqual(2);
    const loop = graph.getEdges()[1];
    expect(loop.getModel().source).toEqual(loop.getModel().target);
    graph.destroy();
  });
  it('create edge with drag trigger', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'create-edge',
            trigger: 'drag',
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];
    graph.emit('node:dragstart', { x: 100, y: 100, item: node0 });
    graph.emit('drag', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(1);
    const edge = graph.getEdges()[0];

    // cancel
    graph.emit('dragend', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(0);

    // create
    graph.emit('node:dragstart', { x: 100, y: 100, item: node0 });
    graph.emit('node:drop', { x: 120, y: 120, item: node1 });
    expect(graph.getEdges().length).toEqual(1);

    graph.destroy();
  });
  it('create edge with click and shift key', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'create-edge',
            key: 'shift',
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];

    // without keydown
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(0);

    // keydown with wrong key
    graph.emit('keydown', { key: 'a' });
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(0);

    // keydown with correct key
    graph.emit('keydown', { key: 'shift' });
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(1);

    // cancel with keyup
    graph.emit('keyup', {});
    expect(graph.getEdges().length).toEqual(0);

    // create
    graph.emit('keydown', { key: 'shift' });
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 100, y: 100, item: node1 });
    expect(graph.getEdges().length).toEqual(1);

    graph.destroy();
  });
  it('shouldBegin, shouldEnd', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'create-edge',
            shouldBegin: (e) => {
              if (e.target && e.target.get('name') === 'text-shape') {
                return false;
              }
              return true;
            },
            shouldEnd: (e) => {
              if (e.target && e.target.get('name') === 'text-shape') {
                return false;
              }
              return true;
            },
          },
        ],
      },
      defaultEdge: {
        style: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
    });
    graph.node((node) => {
      return {
        label: node.id,
        labelCfg: {
          position: 'bottom',
        },
      };
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node0text = node0.getContainer().find((e) => e.get('name') === 'text-shape');
    const node1 = graph.getNodes()[1];
    const node1text = node0.getContainer().find((e) => e.get('name') === 'text-shape');

    // shouldBegin returns true
    graph.emit('node:click', { x: 100, y: 100, item: node0, target: node0.getKeyShape() });
    expect(graph.getEdges().length).toEqual(1);
    // cancel
    let edge = graph.getEdges()[0];
    graph.emit('edge:click', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(0);

    // shouldBegin returns false
    graph.emit('node:click', { x: 100, y: 100, item: node0, target: node0text });
    expect(graph.getEdges().length).toEqual(0);
    // cancel
    edge = graph.getEdges()[0];
    graph.emit('edge:click', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(0);

    // shouldEnd returns false
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 100, y: 100, item: node1, target: node1text });
    expect(graph.getEdges().length).toEqual(1);
    edge = graph.getEdges()[0];
    expect(edge.getModel().target).not.toBe(node1.getID());

    graph.destroy();
  });
  xit('create edge width stack', () => {
    const toolbar = new G6.ToolBar();
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      enabledStack: true,
      plugins: [toolbar],
      modes: {
        default: ['create-edge'],
      },
      defaultEdge: {
        style: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(1);
    const edge = graph.getEdges()[0];

    let stackData = graph.getStackData();
    const { undoStack, redoStack } = stackData;
    expect(undoStack.length).toBe(1);
    expect(redoStack.length).toBe(0);

    // cancel
    graph.emit('edge:click', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(0);

    // create
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 120, y: 120, item: node1 });
    expect(graph.getEdges().length).toEqual(1);
    stackData = graph.getStackData();
    expect(stackData.undoStack.length).toBe(2);
    expect(stackData.redoStack.length).toBe(0);

    // loop
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    stackData = graph.getStackData();
    expect(stackData.undoStack.length).toBe(3);
    expect(stackData.redoStack.length).toBe(0);
    expect(graph.getEdges().length).toEqual(2);
    const loop = graph.getEdges()[1];
    expect(loop.getModel().source).toEqual(loop.getModel().target);
    graph.destroy();
  });
  it('create edge width edge configures', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      enabledStack: true,
      modes: {
        default: [
          {
            type: 'create-edge',
            edgeConfig: {
              type: 'cubic',
              style: {
                stroke: '#f00',
              },
            },
          },
        ],
      },
      defaultEdge: {
        style: {
          stroke: '#0f0',
          lineWidth: 5,
        },
      },
    });
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];

    graph.addItem('edge', {
      source: '0',
      target: '1',
    });

    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(2);
    let edge = graph.getEdges()[1];
    expect(edge.getModel().type).toEqual('cubic');
    let keyShape = edge.getKeyShape();
    expect(keyShape.attr('stroke')).toEqual('#f00');
    expect(keyShape.attr('lineWidth')).toEqual(1);

    // cancel
    graph.emit('edge:click', { x: 100, y: 100, item: edge });
    expect(graph.getEdges().length).toEqual(1);

    // create
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 120, y: 120, item: node1 });
    expect(graph.getEdges().length).toEqual(2);
    edge = graph.getEdges()[1];
    keyShape = edge.getKeyShape();
    expect(keyShape.attr('stroke')).toEqual('#f00');
    expect(keyShape.attr('lineWidth')).toEqual(1);

    graph.destroy();
  });

  it('click first node and remove the source node', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['create-edge'],
      },
    });
    graph.data(data);
    graph.render();
    graph.on('node:click', (e) => {
      graph.removeItem('0');
    });
    expect(graph.getEdges().length).toEqual(0);
    graph.destroy();
  });

  it('create edge for combos ', () => {
    const dataWithCombos = {
      nodes: [
        {
          id: '0',
          x: 50,
          y: 50,
          comboId: 'combo0',
        },
        {
          id: '1',
          x: 150,
          y: 150,
          comboId: 'combo1',
        },
      ],
      combos: [
        {
          id: 'combo0',
        },
        {
          id: 'combo1',
        },
      ],
    };
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          'drag-node',
          'drag-combo',
          {
            type: 'create-edge',
            trigger: 'click',
          },
        ],
      },
      groupByTypes: false,
    });
    graph.data(dataWithCombos);
    graph.render();

    const node0 = graph.getNodes()[0];
    const node1 = graph.getNodes()[1];
    const combo0 = graph.getCombos()[0];
    const combo1 = graph.getCombos()[1];

    // start from a combo, end on a node
    graph.emit('node:click', { x: 100, y: 100, item: combo0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(1);
    // cancel
    graph.emit('canvas:click', { x: 100, y: 100, target: graph.get('canvas') });
    expect(graph.getEdges().length).toEqual(0);
    // create
    graph.emit('node:click', { x: 100, y: 100, item: combo0 });
    graph.emit('node:click', { x: 120, y: 120, item: node1 });
    expect(graph.getEdges().length).toEqual(1);

    // start from a node, end on a combo
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(2);
    // cancel
    graph.emit('canvas:click', { x: 100, y: 100, target: graph.get('canvas') });
    expect(graph.getEdges().length).toEqual(1);
    // create
    graph.emit('node:click', { x: 100, y: 100, item: node0 });
    graph.emit('node:click', { x: 120, y: 120, item: combo0 });
    expect(graph.getEdges().length).toEqual(2);

    // start from a combo, end on a combo
    graph.emit('node:click', { x: 100, y: 100, item: combo0 });
    graph.emit('mousemove', { x: 110, y: 110 });
    expect(graph.getEdges().length).toEqual(3);
    // cancel
    graph.emit('canvas:click', { x: 100, y: 100, target: graph.get('canvas') });
    expect(graph.getEdges().length).toEqual(2);
    // create
    graph.emit('node:click', { x: 100, y: 100, item: combo0 });
    graph.emit('node:click', { x: 120, y: 120, item: combo1 });
    expect(graph.getEdges().length).toEqual(3);

    graph.destroy();
  });
});
