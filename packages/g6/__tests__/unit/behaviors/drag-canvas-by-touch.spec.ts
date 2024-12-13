import { CommonEvent, Graph } from '@/src';
import { CanvasEvent } from '@/src/constants';
import { PointObject } from '@/src/types';
import { behaviorDragCanvasByTouch } from '@@/demos';
import { createDemoGraph, createGraph, dispatchCanvasEvent } from '@@/utils';

describe('behavior drag canvas by touch', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorDragCanvasByTouch);
  });

  afterAll(() => {
    graph.destroy();
  });
  const mockDragByTouch = (movement: PointObject, innerGraph = graph) => {
    const [x, y] = innerGraph.getPosition();
    const targetPosition = { x: x + movement.x, y: y + movement.y };
    innerGraph.emit(CanvasEvent.POINTER_DOWN, { client: { x, y }, pointerType: 'touch' });
    innerGraph.emit(CanvasEvent.POINTER_MOVE, { client: targetPosition, pointerType: 'touch' });
    innerGraph.emit(CanvasEvent.POINTER_UP, { pointerType: 'touch' });
    return targetPosition;
  };
  it('default status', () => {
    expect(graph.getBehaviors()).toEqual([{ key: 'drag-canvas-by-touch', type: 'drag-canvas-by-touch' }]);
  });

  it('drag', () => {
    const targetPosition = mockDragByTouch({ x: 10, y: 10 });
    expect(graph.getPosition()).toBeCloseTo([targetPosition.x, targetPosition.y]);
  });

  it('onFinish with drag', async () => {
    const onFinish = jest.fn();
    graph.updateBehavior({ key: 'drag-canvas-by-touch', onFinish });
    mockDragByTouch({ x: 10, y: 10 });
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('drag in the x-axis direction', () => {
    graph.updateBehavior({ type: 'drag-canvas-by-touch', key: 'drag-canvas-by-touch', direction: 'x' });
    const targetPosition = mockDragByTouch({ x: 10, y: 10 });
    expect(graph.getPosition()).toBeCloseTo([targetPosition.x, targetPosition.y - 10]);
  });

  it('drag in the y-axis direction', () => {
    graph.updateBehavior({ key: 'drag-canvas-by-touch', type: 'drag-canvas-by-touch', direction: 'y' });
    const targetPosition = mockDragByTouch({ x: 10, y: 10 });
    expect(graph.getPosition()).toBeCloseTo([targetPosition.x - 10, targetPosition.y]);
  });

  it('trigger on element', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
      },
      node: {
        style: {
          size: 20,
        },
      },
      behaviors: [{ type: 'drag-canvas-by-touch', enable: true }],
    });

    await graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'drag-on-element-default');
    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'node' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: -50, y: -50 }, targetType: 'node' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);
    await expect(graph).toMatchSnapshot(__filename, 'drag-on-element');
  });

  it('range', () => {
    graph.updateBehavior({ key: 'drag-canvas-by-touch', direction: 'both', range: 0.5 });

    const emitDragEvent = (dx: number, dy: number, count: number) => {
      for (let i = 0; i < count; i++) {
        mockDragByTouch({ x: dx, y: dy });
      }
    };

    const [canvasWidth, canvasHeight] = graph.getCanvas().getSize();
    emitDragEvent(10, 0, 60);
    expect(graph.getPosition()[0]).toBeCloseTo(canvasWidth / 2);
    emitDragEvent(-10, 0, 60);
    expect(graph.getPosition()[0]).toBeCloseTo(-canvasWidth / 2);
    emitDragEvent(0, -10, 60);
    expect(graph.getPosition()[0]).toBeCloseTo(-canvasHeight / 2);
  });
});
