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

    graph.setBehaviors([{ type: 'brush-select', brushStyle: { color: 'green', lineWidth: 2, stroke: 'blue' } }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-3');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-3');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-3');

    graph.setBehaviors([{ type: 'brush-select', selectedState: 'active', trigger: 'shift' }]);

    graph.emit(CommonEvent.POINTER_DOWN, { canvas: { x: 100, y: 100 }, shiftKey: true, targetType: 'canvas' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selecting-4');

    graph.emit(CommonEvent.POINTER_UP, { canvas: { x: 400, y: 400 } });

    await expect(graph).toMatchSnapshot(__filename, 'brush-selected-4');

    graph.emit(`canvas:${CommonEvent.CLICK}`);
    await expect(graph).toMatchSnapshot(__filename, 'brush-clear-4');
  });

  afterAll(() => {
    graph.destroy();
  });
});
