import type { Graph } from '@/src';
import { CommonEvent, NodeEvent } from '@/src';
import { bugDragRotatedCanvas } from '@@/demos';
import { createDemoGraph, dispatchCanvasEvent } from '@@/utils';

const fixed2 = (num: number): number => {
  return parseFloat(num.toFixed(2));
};

describe('behavior drag rotated canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(bugDragRotatedCanvas, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('drag 30 rotated canvas', async () => {
    await graph.rotateTo(30);
    const [x, y] = graph.getPosition();

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 10 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    expect(graph.getRotation()).toBe(30);
    expect(graph.getPosition()).toBeCloseTo([x + 3.66, y + 13.66]);
  });

  it('drag 90 rotated canvas', async () => {
    await graph.rotateTo(90);
    const [x, y] = graph.getPosition();

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 20 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    expect(graph.getRotation()).toBe(90);
    expect(graph.getPosition()).toBeCloseTo([x - 20, y + 10]);
  });

  it('drag 180 rotated canvas', async () => {
    await graph.rotateTo(180);
    const [x, y] = graph.getPosition();

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 20 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    expect(graph.getRotation()).toBe(180);
    expect(graph.getPosition()).toBeCloseTo([x - 10, y - 20]);
  });

  it('drag 270 rotated canvas', async () => {
    await graph.rotateTo(270);
    const [x, y] = graph.getPosition();

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 20 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    expect(graph.getRotation()).toBe(270);
    expect(graph.getPosition()).toBeCloseTo([x + 20, y - 10]);
  });

  it.each([
    { name: 'element', id: 'node1', targetType: 'node' },
    { name: 'combo', id: 'comboA', targetType: 'combo' },
  ])('drag $name when 30 rotated canvas', async ({ id, targetType }) => {
    await graph.rotateTo(30);

    const [x, y] = graph.getElementPosition(id);

    graph.emit(NodeEvent.DRAG_START, { target: { id: id }, targetType });
    graph.emit(NodeEvent.DRAG, { dx: 10, dy: 10 });
    graph.emit(NodeEvent.DRAG_END, { target: { id: id }, targetType });

    expect(graph.getRotation()).toBe(30);
    const [nextX, nextY] = graph.getElementPosition(id);
    expect(fixed2(nextX)).toBeCloseTo(fixed2(x + 3.66));
    expect(fixed2(nextY)).toBeCloseTo(fixed2(y + 13.66));
  });
});
