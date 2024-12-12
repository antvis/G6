import { GraphEvent } from '@/src';
import { createGraph } from '@@/utils';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';

describe('event', () => {
  it('canvas ready', async () => {
    const graph = createGraph({
      container: document.createElement('div'),
    });

    const ready = jest.fn();
    graph.on(GraphEvent.BEFORE_CANVAS_INIT, ready);
    graph.on(GraphEvent.AFTER_CANVAS_INIT, ready);

    await graph.draw();

    expect(ready).toHaveBeenCalledTimes(2);

    graph.destroy();
  });

  it('graph lifecycle event', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
      layout: {
        type: 'grid',
      },
    });

    const sequence: string[] = [];

    const addSequence = (type: string) => () => {
      sequence.push(type);
    };

    const beforeDraw = jest.fn(addSequence('beforeDraw'));
    const afterDraw = jest.fn(addSequence('afterDraw'));
    const beforeRender = jest.fn(addSequence('beforeRender'));
    const afterRender = jest.fn(addSequence('afterRender'));
    const beforeLayout = jest.fn(addSequence('beforeLayout'));
    const afterLayout = jest.fn(addSequence('afterLayout'));

    graph.on(GraphEvent.BEFORE_DRAW, beforeDraw);
    graph.on(GraphEvent.AFTER_DRAW, afterDraw);
    graph.on(GraphEvent.BEFORE_RENDER, beforeRender);
    graph.on(GraphEvent.AFTER_RENDER, afterRender);
    graph.on(GraphEvent.BEFORE_LAYOUT, beforeLayout);
    graph.on(GraphEvent.AFTER_LAYOUT, afterLayout);

    await graph.render();

    expect(beforeDraw).toHaveBeenCalledTimes(1);
    expect(afterDraw).toHaveBeenCalledTimes(1);
    expect(beforeRender).toHaveBeenCalledTimes(1);
    expect(afterRender).toHaveBeenCalledTimes(1);
    expect(beforeLayout).toHaveBeenCalledTimes(1);
    expect(afterLayout).toHaveBeenCalledTimes(1);

    expect(sequence).toEqual(['beforeRender', 'beforeLayout', 'afterLayout', 'beforeDraw', 'afterDraw', 'afterRender']);

    graph.destroy();
  });

  it('element lifecycle event', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    const create = jest.fn();
    const update = jest.fn();
    const destroy = jest.fn();

    graph.on(GraphEvent.AFTER_ELEMENT_CREATE, create);
    graph.on(GraphEvent.AFTER_ELEMENT_UPDATE, update);
    graph.on(GraphEvent.AFTER_ELEMENT_DESTROY, destroy);

    await graph.draw();

    expect(create).toHaveBeenCalledTimes(3);
    expect(update).toHaveBeenCalledTimes(0);
    expect(destroy).toHaveBeenCalledTimes(0);

    expect(create.mock.calls[0][0].elementType).toEqual('node');
    expect(create.mock.calls[0][0].data.id).toEqual('node-1');
    expect(create.mock.calls[1][0].elementType).toEqual('node');
    expect(create.mock.calls[1][0].data.id).toEqual('node-2');
    expect(create.mock.calls[2][0].elementType).toEqual('edge');
    expect(create.mock.calls[2][0].data.id).toEqual('edge-1');

    create.mockClear();

    graph.addNodeData([{ id: 'node-3' }]);
    graph.updateData({
      nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-3' }],
    });
    graph.removeNodeData(['node-2']);

    await graph.draw();

    expect(create).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(2);
    expect(destroy).toHaveBeenCalledTimes(1);

    expect(create.mock.calls[0][0].data.id).toEqual('node-3');
    expect(update.mock.calls[0][0].data.id).toEqual('node-1');
    expect(update.mock.calls[1][0].data.id).toEqual('edge-1');
    expect(destroy.mock.calls[0][0].data.id).toEqual('node-2');

    graph.destroy();
  });

  it('element state', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    await graph.draw();

    const create = jest.fn();
    const update = jest.fn();
    const destroy = jest.fn();

    graph.on(GraphEvent.AFTER_ELEMENT_CREATE, create);
    graph.on(GraphEvent.AFTER_ELEMENT_UPDATE, update);
    graph.on(GraphEvent.AFTER_ELEMENT_DESTROY, destroy);

    // state change
    graph.updateNodeData([{ id: 'node-1', states: ['active'] }]);
    await graph.draw();

    expect(update).toHaveBeenCalledTimes(2);
    expect(update.mock.calls[0][0].data.id).toEqual('node-1');
    expect(update.mock.calls[0][0].data.states).toEqual(['active']);

    // 同时会更新相邻的边 / It will also update the adjacent edge
    expect(update.mock.calls[1][0].data.id).toEqual('edge-1');

    update.mockClear();
    graph.setElementState('node-1', []);
    expect(update).toHaveBeenCalledTimes(2);
    expect(update.mock.calls[0][0].data.id).toEqual('node-1');
    expect(update.mock.calls[0][0].data.states).toEqual([]);
    expect(update.mock.calls[1][0].data.id).toEqual('edge-1');

    graph.destroy();
  });

  it('renderer change event', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    const beforeRendererChange = jest.fn();
    const afterRendererChange = jest.fn();

    graph.on(GraphEvent.BEFORE_RENDERER_CHANGE, beforeRendererChange);
    graph.on(GraphEvent.AFTER_RENDERER_CHANGE, afterRendererChange);

    await graph.render();

    expect(beforeRendererChange).toHaveBeenCalledTimes(0);
    expect(afterRendererChange).toHaveBeenCalledTimes(0);

    const renderer = () => new CanvasRenderer();

    graph.setOptions({
      renderer,
    });

    expect(beforeRendererChange).toHaveBeenCalledTimes(1);
    expect(afterRendererChange).toHaveBeenCalledTimes(1);
  });

  it('draw event', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    const beforeDraw = jest.fn();
    const afterDraw = jest.fn();

    graph.on(GraphEvent.BEFORE_DRAW, (event: any) => {
      beforeDraw(event.data.render);
    });
    graph.on(GraphEvent.AFTER_DRAW, (event: any) => {
      afterDraw(event.data.render);
    });

    await graph.render();

    expect(beforeDraw).toHaveBeenCalledTimes(1);
    expect(beforeDraw.mock.calls[0][0]).toBe(true);
    expect(afterDraw).toHaveBeenCalledTimes(1);
    expect(afterDraw.mock.calls[0][0]).toBe(true);

    beforeDraw.mockClear();
    afterDraw.mockClear();

    graph.addNodeData([{ id: 'node-3' }]);

    await graph.draw();

    expect(beforeDraw).toHaveBeenCalledTimes(1);
    expect(beforeDraw.mock.calls[0][0]).toBe(false);
    expect(afterDraw).toHaveBeenCalledTimes(1);
    expect(afterDraw.mock.calls[0][0]).toBe(false);
  });
});
