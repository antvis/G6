import { CommonEvent, type Graph } from '@/src';
import { edgePolyline } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('edge polyline', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(edgePolyline, { animation: false });
  });

  it('orthogonal routing', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-2' } });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 75 });
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__drag_1');

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-2' } });

    graph.emit(`node:${CommonEvent.DRAG}`, { dx: -150, dy: 0 });
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__drag_2');
  });
});
