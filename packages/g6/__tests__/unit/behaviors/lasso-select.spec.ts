import type { Graph } from '@/src';
import { CommonEvent } from '@/src';
import { behaviorLassoSelect } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior lasso select', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorLassoSelect, { animation: false });
  });

  it('lasso select', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-select-clear');

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 400 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-1');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-1');

    graph.emit(`canvas:${CommonEvent.CLICK}`);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-1');

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 400 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-2');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-2');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-2');

    graph.setBehaviors([{ type: 'lasso-select', style: { color: 'green', lineWidth: 2, stroke: 'blue' } }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 300 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 300, y: 300 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 300, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-3');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-3');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-3');

    graph.setBehaviors([{ type: 'lasso-select', trigger: 'shift' }]);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 200 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 200, y: 200 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 200, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-4');

    graph.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-4');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-4');

    graph.setBehaviors([{ type: 'lasso-select', state: 'active', trigger: 'shift', immediately: true }]);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-5');

    graph.emit(CommonEvent.KEY_UP, { key: 'Shift' });
    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-5');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-5');

    graph.setBehaviors([{ type: 'lasso-select', trigger: 'drag', mode: 'diff' }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-diff');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-diff');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-diff');

    graph.setBehaviors([{ type: 'lasso-select', mode: 'union' }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-union');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-union');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-union');

    graph.setBehaviors([{ type: 'lasso-select', mode: 'intersect' }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 500 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 500, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-intersect');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-intersect');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-intersect');
  });

  afterAll(() => {
    graph.destroy();
  });
});
