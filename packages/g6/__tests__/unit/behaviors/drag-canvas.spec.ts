import { behaviorDragCanvas } from '@/__tests__/demos';
import type { Graph } from '@/src';
import { CommonEvent } from '@/src';
import { createDemoGraph, createGraph, dispatchCanvasEvent, sleep } from '@@/utils';

describe('behavior drag canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorDragCanvas, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', () => {
    expect(graph.getBehaviors()).toEqual([
      'drag-canvas',
      {
        type: 'drag-canvas',
        key: 'drag-canvas',
        trigger: {
          up: ['ArrowUp'],
          down: ['ArrowDown'],
          right: ['ArrowRight'],
          left: ['ArrowLeft'],
        },
      },
    ]);
  });

  it('arrow up', () => {
    const [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowUp' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowUp' });

    expect(graph.getPosition()).toBeCloseTo([x, y - 10]);
  });

  it('arrow down', () => {
    const [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowDown' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowDown' });
    expect(graph.getPosition()).toBeCloseTo([x, y + 10]);
  });

  it('arrow left', () => {
    const [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowLeft' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowLeft' });
    expect(graph.getPosition()).toBeCloseTo([x - 10, y]);
  });

  it('arrow right', () => {
    const [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });
    expect(graph.getPosition()).toBeCloseTo([x + 10, y]);
  });

  it('drag', () => {
    const [x, y] = graph.getPosition();

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 10 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    expect(graph.getPosition()).toBeCloseTo([x + 10, y + 10]);
  });

  it('sensitivity', async () => {
    graph.updateBehavior({ key: 'drag-canvas', sensitivity: 20 });

    const [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });
    expect(graph.getPosition()).toBeCloseTo([x + 20, y]);

    await expect(graph).toMatchSnapshot(__filename);
  });

  it('onFinish with key', async () => {
    const onFinish = jest.fn();
    graph.updateBehavior({ key: 'drag-canvas', onFinish });

    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });

    await sleep(500);
    expect(onFinish).toHaveBeenCalledTimes(1);

    onFinish.mockReset();

    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });

    await sleep(500);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('onFinish with drag', async () => {
    const onFinish = jest.fn();
    graph.updateBehavior({ key: 'drag-canvas', trigger: 'drag', onFinish });

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: 10, y: 10 }, targetType: 'canvas' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    expect(onFinish).toHaveBeenCalledTimes(1);
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
      behaviors: [{ type: 'drag-canvas', enable: true }],
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'drag-on-element-default');

    dispatchCanvasEvent(graph, CommonEvent.DRAG_START, { targetType: 'node' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG, { movement: { x: -50, y: -50 }, targetType: 'node' });
    dispatchCanvasEvent(graph, CommonEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'drag-on-element');
  });
});
