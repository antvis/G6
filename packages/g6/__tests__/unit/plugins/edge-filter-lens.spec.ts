import { pluginEdgeFilterLens } from '@@/demos';
import { CanvasEvent, CommonEvent, Graph } from '@antv/g6';
import { createDemoGraph } from '../../utils';

describe('edge-filter-lens', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginEdgeFilterLens, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('move lens by pointermove', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(CanvasEvent.POINTER_MOVE, { canvas: { x: 200, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'move-lens-pointermove');
  });

  it('move lens by click', async () => {
    graph.updatePlugin({ key: 'edge-filter-lens', trigger: 'click' });

    graph.emit(CanvasEvent.CLICK, { canvas: { x: 180, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'move-lens-click-1');

    graph.emit(CanvasEvent.CLICK, { canvas: { x: 200, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'move-lens-click-2');
  });

  it('move lens by drag', async () => {
    graph.updatePlugin({ key: 'edge-filter-lens', trigger: 'drag' });

    graph.emit(CanvasEvent.CLICK, { canvas: { x: 180, y: 100 } });
    graph.emit(CanvasEvent.DRAG_START, { canvas: { x: 200, y: 100 } });
    graph.emit(CanvasEvent.DRAG, { canvas: { x: 220, y: 100 } });
    graph.emit(CanvasEvent.DRAG_END);

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
