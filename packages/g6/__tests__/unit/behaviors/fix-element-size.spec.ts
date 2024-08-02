import { CanvasEvent, CommonEvent, EdgeEvent, NodeEvent, type Graph } from '@/src';
import { behaviorFixElementSize } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import type { DisplayObject } from '@antv/g';

describe('behavior fix element size', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorFixElementSize, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('fix entire element size', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    await expect(graph).toMatchSnapshot(__filename, 'entire-size-1');
    graph.zoomTo(0.6);
    await expect(graph).toMatchSnapshot(__filename, 'entire-size-0.6');
    graph.zoomTo(1);

    graph.emit(CanvasEvent.CLICK, { target: {} });
  });

  it('fix lineWidth of key', async () => {
    graph.updateBehavior({
      key: 'fix-element-size',
      node: [
        {
          shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key')!,
          fields: ['lineWidth'],
        },
      ],
      edge: [
        {
          shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key')!,
          fields: ['lineWidth'],
        },
      ],
    });

    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node0' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(EdgeEvent.CLICK, { target: { id: 'node0-node1' }, targetType: 'edge' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'lineWidth-1');
    await graph.zoomTo(0.6);
    await expect(graph).toMatchSnapshot(__filename, 'lineWidth-0.6');
    await graph.zoomTo(1);

    graph.emit(CanvasEvent.CLICK, { target: {} });
  });

  it('fix fontSize of label', async () => {
    graph.updateBehavior({
      key: 'fix-element-size',
      node: [
        {
          shape: (shapes: DisplayObject[]) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
          fields: ['fontSize'],
        },
      ],
      edge: [
        {
          shape: (shapes: DisplayObject[]) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
          fields: ['fontSize'],
        },
      ],
    });

    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node0' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(EdgeEvent.CLICK, { target: { id: 'node0-node1' }, targetType: 'edge' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'fontSize-1');
    await graph.zoomTo(0.6);
    await expect(graph).toMatchSnapshot(__filename, 'fontSize-0.6');
    await graph.zoomTo(1);

    graph.emit(CanvasEvent.CLICK, { target: {} });
  });

  it('fix both lineWidth and fontSize', async () => {
    graph.updateBehavior({
      key: 'fix-element-size',
      node: [
        {
          shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key')!,
          fields: ['lineWidth'],
        },
        {
          shape: (shapes: DisplayObject[]) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
          fields: ['fontSize'],
        },
      ],
      edge: [
        {
          shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key')!,
          fields: ['lineWidth'],
        },
        {
          shape: (shapes: DisplayObject[]) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
          fields: ['fontSize'],
        },
      ],
    });

    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node0' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(EdgeEvent.CLICK, { target: { id: 'node0-node1' }, targetType: 'edge' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'lineWidth-fontSize-1');
    await graph.zoomTo(0.6);
    await expect(graph).toMatchSnapshot(__filename, 'lineWidth-fontSize-0.6');
    await graph.zoomTo(1);

    graph.emit(CanvasEvent.CLICK, { target: {} });
  });
});
