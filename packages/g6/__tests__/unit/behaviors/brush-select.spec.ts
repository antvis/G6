import type { Graph } from '@/src';
import { CanvasEvent, CommonEvent } from '@/src';
import { behaviorBrushSelect } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior brush select', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorBrushSelect, { animation: false });
  });

  it('brush select', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 100, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-select-clear');

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-1');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-1');

    graph.emit(CanvasEvent.CLICK);

    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-1');

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 300, y: 300 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-2');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 300, y: 300 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-2');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-2');

    graph.setBehaviors([
      { type: 'brush-select', trigger: 'drag', style: { fill: 'green', lineWidth: 2, stroke: 'blue' } },
    ]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-3');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-3');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-3');

    graph.setBehaviors([{ type: 'brush-select', trigger: 'shift' }]);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-4');

    graph.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-4');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-4');

    graph.setBehaviors([{ type: 'brush-select', state: 'active', trigger: 'shift', immediately: true }]);
    graph.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-5');

    graph.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-5');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-5');

    graph.setBehaviors([{ type: 'brush-select', mode: 'union', trigger: 'drag' }]);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-mode-union');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-mode-union');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-mode-union');

    graph.setBehaviors([{ type: 'brush-select', mode: 'diff' }]);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-mode-diff');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-mode-diff');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-mode-diff');

    graph.setBehaviors([{ type: 'brush-select', mode: 'intersect' }]);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-mode-intersect');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-mode-intersect');

    graph.emit(CanvasEvent.CLICK);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-mode-intersect');

    // zoom to test line width
    graph.zoomTo(5);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 250, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-zoom');
    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 250, y: 400 } });
  });

  afterAll(() => {
    graph.destroy();
  });
});
