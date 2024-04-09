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

    graph.setBehaviors([{ type: 'lasso-select', selectedState: 'active', trigger: 'shift' }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, shiftKey: true, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 200 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 200, y: 200 } });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 200, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selecting-4');

    graph.emit(CommonEvent.POINTER_UP);

    await expect(graph).toMatchSnapshot(__filename, 'lasso-selected-4');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'lasso-clear-4');
  });

  afterAll(() => {
    graph.destroy();
  });
});
