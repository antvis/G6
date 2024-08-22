import { pluginEdgeFilterLens } from '@@/demos';
import type { Canvas } from '@antv/g';
import { CommonEvent, Graph } from '@antv/g6';
import { createDemoGraph, dispatchCanvasEvent } from '../../utils';

describe('edge-filter-lens', () => {
  let graph: Graph;
  let canvas: Canvas;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginEdgeFilterLens, { animation: false });
    canvas = graph.getCanvas().getLayer();
  });

  afterAll(() => {
    graph.destroy();
  });

  it('move lens by pointermove', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    dispatchCanvasEvent(graph, CommonEvent.POINTER_MOVE, { canvas: { x: 200, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'move-lens-pointermove');
  });

  it('move lens by click', async () => {
    graph.updatePlugin({ key: 'edge-filter-lens', trigger: 'click' });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 180, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'move-lens-click-1');

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 200, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'move-lens-click-2');
  });

  it('move lens by drag', async () => {
    graph.updatePlugin({ key: 'edge-filter-lens', trigger: 'drag' });

    dispatchCanvasEvent(graph, CommonEvent.CLICK, { canvas: { x: 180, y: 100 } });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { canvas: { x: 200, y: 100 } });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { canvas: { x: 220, y: 100 } });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'move-lens-drag');
  });

  it('scale lens by wheel', async () => {
    function emitWheelEvent(options?: { deltaX: number; deltaY: number; clientX: number; clientY: number }) {
      const dom = graph.getCanvas().getContextService().getDomElement();
      dom?.dispatchEvent(new WheelEvent(CommonEvent.WHEEL, options));
    }

    emitWheelEvent({ deltaX: 1, deltaY: 2, clientX: 200, clientY: 100 });
    emitWheelEvent({ deltaX: 1, deltaY: 2, clientX: 200, clientY: 100 });

    await expect(graph).toMatchSnapshot(__filename, 'scale-larger');

    emitWheelEvent({ deltaX: -1, deltaY: -2, clientX: 200, clientY: 100 });
    emitWheelEvent({ deltaX: -1, deltaY: -2, clientX: 200, clientY: 100 });
    emitWheelEvent({ deltaX: -1, deltaY: -2, clientX: 200, clientY: 100 });
    emitWheelEvent({ deltaX: -1, deltaY: -2, clientX: 200, clientY: 100 });

    await expect(graph).toMatchSnapshot(__filename, 'scale-smaller');
  });
});
