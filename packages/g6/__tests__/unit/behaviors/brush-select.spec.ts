import type { Graph } from '@/src';
import { CommonEvent } from '@/src';
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

    graph.emit(`canvas:${CommonEvent.CLICK}`);

    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-1');

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 300, y: 300 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-2');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 300, y: 300 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-2');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-2');

    graph.setBehaviors([{ type: 'brush-select', style: { color: 'green', lineWidth: 2, stroke: 'blue' } }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-3');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-3');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-3');

    graph.setBehaviors([{ type: 'brush-select', trigger: 'shift' }]);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-4');

    graph.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-4');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-4');

    graph.setBehaviors([{ type: 'brush-select', state: 'active', trigger: 'shift', immediately: true }]);
    graph.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-5');

    graph.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-5');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-5');

    graph.setBehaviors([{ type: 'brush-select', mode: 'diff', trigger: 'drag' }]);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-diff');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-diff');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-diff');

    graph.setBehaviors([{ type: 'brush-select', mode: 'union' }]);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-union');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-union');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-union');

    graph.setBehaviors([{ type: 'brush-select', mode: 'intersect' }]);
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-intersect');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-intersect');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-intersect');
  });

  afterAll(() => {
    graph.destroy();
  });
});
