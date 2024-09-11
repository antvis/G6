import { CommonEvent, NodeEvent } from '@/src';
import { createGraph, dispatchCanvasEvent } from '@@/utils';

describe('focus element', () => {
  it('focus after drag', async () => {
    // https://github.com/antvis/G6/issues/5955
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 250, y: 150 } },
          { id: 'node-2', style: { x: 350, y: 150 } },
          { id: 'node-3', style: { x: 250, y: 300 } },
        ],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    await graph.draw();

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 100, y: 100 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'focus-before-drag');

    await graph.focusElement('node-1');

    await expect(graph).toMatchSnapshot(__filename, 'focus-after-drag');
  });

  it('hover after focus', async () => {
    // https://github.com/antvis/G6/issues/5925
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 250, y: 150 } },
          { id: 'node-2', style: { x: 350, y: 150 } },
          { id: 'node-3', style: { x: 250, y: 300 } },
        ],
      },
      behaviors: ['zoom-canvas', 'hover-activate'],
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'hover-before-focus');

    await graph.focusElement('node-1');

    graph.emit(NodeEvent.POINTER_ENTER, {
      target: { id: 'node-2' },
      targetType: 'node',
      type: CommonEvent.POINTER_ENTER,
    });

    await expect(graph).toMatchSnapshot(__filename, 'hover-after-focus');
  });
});
