import { CommonEvent, type Graph } from '@/src';
import { elementZIndex } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('element zIndex', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementZIndex, { animation: false });
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('drag overlap', async () => {
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 140, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-node-1');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: -65, dy: 100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-node-2');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 75, dy: -100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-node-3');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
  });

  it('combo overlap', async () => {
    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-2' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-2');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-3' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-3');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-3' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-3');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-4' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: -20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-4(1)');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-4' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: -40, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-4(2)');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-4' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: -40, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-4(3)');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);
  });
});
