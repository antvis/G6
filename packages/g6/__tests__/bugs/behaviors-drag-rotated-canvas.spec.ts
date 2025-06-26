import type { Graph } from '@/src';
import { CommonEvent } from '@/src';
import { bugDragRotatedCanvas } from '@@/demos';
import { createDemoGraph, dispatchCanvasEvent } from '@@/utils';

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
});
