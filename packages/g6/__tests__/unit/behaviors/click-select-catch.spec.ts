import type { Graph } from '@/src';
import { CanvasEvent, NodeEvent } from '@/src';
import { behaviorClickSelect } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior click-select element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorClickSelect, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('delete selected element', async () => {
    graph.setBehaviors([
      { type: 'click-select', state: 'active', unselectedState: 'inactive', multiple: true, trigger: [] },
    ]);

    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: '1' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'selected');

    graph.removeNodeData(['1']);
    graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'deleted');

    graph.emit(CanvasEvent.CLICK, { target: {} });

    await expect(graph).toMatchSnapshot(__filename, 'clear');
  });
});
