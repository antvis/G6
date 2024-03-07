import { CommonEvent, type Graph } from '@/src';
import { behaviorDragNode } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('behavior drag node', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorDragNode, { animation: false });
  });

  it('default status', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' } });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__after-drag');
  });

  it('hide edges', async () => {
    graph.setBehaviors([{ type: 'drag-node', hideEdges: 'both' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' } });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__hideEdges-both');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.setBehaviors([{ type: 'drag-node', hideEdges: 'in' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' } });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 20 });
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__hideEdges-in');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.setBehaviors([{ type: 'drag-node', hideEdges: 'out' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' } });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 20 });
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__hideEdges-out');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
  });

  it('shadow', async () => {
    graph.setBehaviors([{ type: 'drag-node', shadow: true, shadowStroke: 'red', shadowStrokeOpacity: 1 }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' } });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__shadow');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__shadow-after-drag');
  });
});
