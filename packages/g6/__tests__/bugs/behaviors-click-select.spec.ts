import { behaviorClickSelect } from '@/__tests__/demos';
import { CommonEvent, NodeEvent } from '@/src';
import { createDemoGraph } from '@@/utils';

describe('behavior click-select', () => {
  it('multiple select with degree 1', async () => {
    const graph = await createDemoGraph(behaviorClickSelect, { animation: false });
    graph.updateBehavior({ key: 'click-select', degree: 1, multiple: true });

    graph.emit(NodeEvent.CLICK, { target: { id: '29' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: '6' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'multiple-shift-degree-1');
  });
});
