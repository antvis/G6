import { CommonEvent, type Graph } from '@/src';
import { behaviorDragNode } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('behavior drag node', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorDragNode, { animation: false });
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    await expect(graph).toMatchSnapshot(__filename, 'after-drag');
  });

  it('hide edges', async () => {
    graph.setBehaviors([{ type: 'drag-node', hideEdges: 'both' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdges-both');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.setBehaviors([{ type: 'drag-node', hideEdges: 'in' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdges-in');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.setBehaviors([{ type: 'drag-node', hideEdges: 'out' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdges-out');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
  });

  it('shadow', async () => {
    graph.setBehaviors([{ type: 'drag-node', shadow: true, shadowStroke: 'red', shadowStrokeOpacity: 1 }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'shadow');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
    await expect(graph).toMatchSnapshot(__filename, 'shadow-after-drag');
  });
});
