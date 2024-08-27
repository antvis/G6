import { pluginFisheye } from '@@/demos';
import { CommonEvent, Graph } from '@antv/g6';
import { createDemoGraph, dispatchCanvasEvent } from '../../utils';
import { emitWheelEvent } from '../../utils/dom';

describe('plugin-fisheye', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginFisheye, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('move lens by pointermove', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    dispatchCanvasEvent(graph, CommonEvent.POINTER_MOVE, { canvas: { x: 420, y: 150 } });

    await expect(graph).toMatchSnapshot(__filename, 'move-lens-pointermove');
  });

  it('move lens by drag', async () => {
    graph.updatePlugin({ key: 'fisheye', trigger: 'drag' });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 420, y: 150 } });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { canvas: { x: 420, y: 150 } });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { canvas: { x: 400, y: 180 } });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'move-lens-drag');
  });

  it('move lens by click', async () => {
    graph.updatePlugin({ key: 'fisheye', trigger: 'click' });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 180, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'move-lens-click-1');

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 200, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'move-lens-click-2');
  });

  it('scale lens R/D by wheel', async () => {
    graph.updatePlugin({ key: 'fisheye', scaleRBy: 'wheel', scaleDBy: 'unset' });

    const emitWheelUpEvent = (count: number) => {
      for (let i = 0; i < count; i++) {
        emitWheelEvent(graph, { deltaX: 1, deltaY: 2, clientX: 420, clientY: 150 });
      }
    };
    const emitWheelDownEvent = (count: number) => {
      for (let i = 0; i < count; i++) {
        emitWheelEvent(graph, { deltaX: -1, deltaY: -2, clientX: 420, clientY: 150 });
      }
    };

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 420, y: 150 } });

    emitWheelUpEvent(5);
    await expect(graph).toMatchSnapshot(__filename, 'scale-R-wheel-larger');
    emitWheelDownEvent(10);
    await expect(graph).toMatchSnapshot(__filename, 'scale-R-wheel-smaller');
    emitWheelUpEvent(5);

    graph.updatePlugin({ key: 'fisheye', scaleRBy: 'unset', scaleDBy: 'wheel' });

    emitWheelUpEvent(5);
    await expect(graph).toMatchSnapshot(__filename, 'scale-D-wheel-larger');
    emitWheelDownEvent(10);
    await expect(graph).toMatchSnapshot(__filename, 'scale-D-wheel-smaller');
    emitWheelUpEvent(5);
  });

  it('scale lens R/D by drag', async () => {
    graph.updatePlugin({ key: 'fisheye', scaleRBy: 'drag', scaleDBy: 'unset' });

    const emitPositionDragEvent = (count: number) => {
      dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { canvas: { x: 420, y: 150 } });
      for (let i = 0; i < count; i++) {
        dispatchCanvasEvent(graph, CommonEvent.DRAG, { dx: 1, dy: -2 });
      }
      dispatchCanvasEvent(graph, CommonEvent.DRAG_END);
    };

    const emitNegativeDragEvent = (count: number) => {
      dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { canvas: { x: 420, y: 150 } });
      for (let i = 0; i < count; i++) {
        dispatchCanvasEvent(graph, CommonEvent.DRAG, { dx: -1, dy: 2 });
      }
      dispatchCanvasEvent(graph, CommonEvent.DRAG_END);
    };

    emitPositionDragEvent(5);
    await expect(graph).toMatchSnapshot(__filename, 'scale-R-drag-larger');
    emitNegativeDragEvent(10);
    await expect(graph).toMatchSnapshot(__filename, 'scale-R-drag-smaller');
    emitPositionDragEvent(5);

    graph.updatePlugin({ key: 'fisheye', scaleRBy: 'unset', scaleDBy: 'drag' });

    emitPositionDragEvent(5);
    await expect(graph).toMatchSnapshot(__filename, 'scale-D-drag-larger');
    emitNegativeDragEvent(10);
    await expect(graph).toMatchSnapshot(__filename, 'scale-D-drag-smaller');
    emitPositionDragEvent(5);
  });

  it('show D percent', async () => {
    graph.updatePlugin({ key: 'fisheye', showDPercent: false });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 420, y: 150 } });
    await expect(graph).toMatchSnapshot(__filename, 'hide-D-percent');
  });

  it('lens style', async () => {
    graph.updatePlugin({
      key: 'fisheye',
      showDPercent: true,
      style: { fill: '#f00', lineDash: [5, 5], stroke: '#666' },
    });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 420, y: 150 } });
    await expect(graph).toMatchSnapshot(__filename, 'lens-style');
  });

  it('node style in lens', async () => {
    graph.updatePlugin({ key: 'fisheye', style: { lineDash: 0 }, nodeStyle: { halo: true } });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 420, y: 150 } });
    await expect(graph).toMatchSnapshot(__filename, 'node-style');
  });
});
