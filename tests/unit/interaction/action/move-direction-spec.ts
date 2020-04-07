import { Graph } from '../../../../src';
import MoveAction from '../../../../src/interaction/action/move-direction';
import { Context } from '@antv/interaction';
import { getTranslate } from '../../util/util';

describe('test move action', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
  });

  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
      },
      {
        id: 'node2',
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node1',
      },
      {
        id: 'edge3',
        source: 'node2',
        target: 'node2',
      },
    ],
  };

  graph.data(data);
  graph.render();
  const context = new Context();
  context.source = graph;
  context.event = {};
  const move = new MoveAction(context);
  // @ts-ignore
  const distance = move.moveDistance;
  it('up', () => {
    move.up();
    expect(getTranslate(graph)).toEqual({x: 0, y: -distance});
    move.up();
    expect(getTranslate(graph)).toEqual({x: 0, y: -distance * 2});
  });

  it('down', () => {
    move.down();
    expect(getTranslate(graph)).toEqual({x: 0, y: -distance});
    move.down();
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});
  });

  it('left', () => {
    move.left();
    expect(getTranslate(graph)).toEqual({x: -distance, y: 0});
    move.left();
    expect(getTranslate(graph)).toEqual({x: -distance * 2, y: 0});
  });

  it('right', () => {
    move.right();
    expect(getTranslate(graph)).toEqual({x: -distance, y: 0});
    move.right();
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});
  });

  it('reset', () => {
    move.reset();
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});
  });

  afterAll(() => {
    context.destroy();
    graph.destroy();
  });

});