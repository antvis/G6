import { Graph } from '../../../../src';
import MoveAction from '../../../../src/interaction/action/move';
import { Context } from '@antv/interaction';
import {getTranslate} from '../../util/util';
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
  const move = new MoveAction(context);
  function getPoint(x, y) {
    const canvasPoint = graph.getCanvasByPoint(x, y);
    return {
      x,
      y,
      canvasX: canvasPoint.x,
      canvasY: canvasPoint.y
    };
  }

  it('no start move', () => {
    context.event = {};
    expect(() => {
      move.move();
    }).not.toThrowError();
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});
  });

  it('move start', () => {
    context.event = {
      canvasX: 100,
      canvasY: 100
    };

    move.start();
    // @ts-ignore
    expect(move.starting).toBe(true);
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});
  });

  it('move', () => {
    // 移动很小
    context.event = {
      canvasX: 101,
      canvasY: 101
    };
    move.move();
    // 不动
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});

    context.event = {
      canvasX: 110,
      canvasY: 110
    };
    move.move();
    expect(getTranslate(graph)).toEqual({x: 10, y: 10});
  });

  it('move again', () => {
    context.event = {
      ...getPoint(120, 120)
    };
    move.move();
    expect(getTranslate(graph)).toEqual({x: 30, y: 30});
  });

  it('move end', () => {
    move.end();
    context.event = {
      canvasX: 100,
      canvasY: 100
    };
    move.move();
    expect(getTranslate(graph)).toEqual({x: 30, y: 30});
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