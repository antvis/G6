import '../../../src/behavior';
import '../../../src/shape';

import Simulate from 'event-simulate';
import Graph from '../../../src/graph/graph';
import { INode } from '../../../src/interface/item';

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
          lineWidth: 2
        }
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
        default: [{
          type: 'create-edge',
          trigger: 'drag'
        }],
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
        default: [{
          type: 'create-edge',
          key: 'shift'
        }],
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
        default: [{
          type: 'create-edge',
          shouldBegin: e => {
            if (e.target && e.target.get('name') === 'text-shape') {
              return false;
            }
            return true;
          },
          shouldEnd: e => {
            if (e.target && e.target.get('name') === 'text-shape') {
              return false;
            }
            return true;
          }
        }],
      },
      defaultEdge: {
        style: {
          stroke: '#f00',
          lineWidth: 2
        }
      },
    });
    graph.node(node => {
      return {
        label: node.id,
        labelCfg: {
          position: 'bottom'
        }
      }
    })
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    const node0text = node0.getContainer().find(e => e.get('name') === 'text-shape')
    const node1 = graph.getNodes()[1];
    const node1text = node0.getContainer().find(e => e.get('name') === 'text-shape')

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
});
