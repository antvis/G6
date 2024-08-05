import { createGraph, dispatchCanvasEvent } from '@@/utils';
import { CommonEvent, NodeEvent } from '@antv/g6';

describe('bugs:multiple-conflict', () => {
  it('drag element, drag canvas', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1', style: { x: 50, y: 50, size: 20 } }],
      },
      behaviors: ['drag-element', 'drag-canvas'],
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    // drag canvas
    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 10 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);
    await expect(graph).toMatchSnapshot(__filename, 'drag-canvas');

    // drag element
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 10, dy: 10 });
    graph.emit(NodeEvent.DRAG_END);
    await expect(graph).toMatchSnapshot(__filename, 'drag-element');
  });
});
