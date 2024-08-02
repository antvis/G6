import { CommonEvent, NodeEvent } from '@/src';
import { behaviorClickSelect } from '@@/demos';
import { createDemoGraph, createGraph } from '@@/utils';

describe('behavior click-select', () => {
  it('multiple select with degree 1', async () => {
    const graph = await createDemoGraph(behaviorClickSelect, { animation: false });
    graph.updateBehavior({ key: 'click-select', degree: 1, multiple: true });

    graph.emit(NodeEvent.CLICK, { target: { id: '29' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: '6' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'multiple-shift-degree-1');

    graph.destroy();
  });

  it('update state by api', async () => {
    // 通过 api 更新状态导致 click-select 状态不同步
    // State updated by api causes click-select state to be out of sync

    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1', type: 'rect', style: { x: 50, y: 100 } }],
      },
      behaviors: [{ key: 'click-select', type: 'click-select' }],
    });

    await graph.draw();

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'state-selected');

    graph.setElementState({ 'node-1': [] });
    graph.addNodeData([{ id: 'node-2', type: 'rect', style: { x: 200, y: 200 }, states: ['selected'] }]);
    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'add-node-2');

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-2' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'click-node-2');
  });
});
