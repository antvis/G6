import { CommonEvent, NodeEvent } from '@/src';
import { createGraph } from '@@/utils';

describe('behavior drag-node with click select', () => {
  const createDemoGraph = async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 100, y: 100 } },
          { id: 'node-2', combo: 'combo-1', style: { x: 200, y: 100 } },
          { id: 'node-3', style: { x: 100, y: 200 } },
          { id: 'node-4', combo: 'combo-1', style: { x: 200, y: 200 } },
        ],
        edges: [
          { source: 'node-1', target: 'node-2' },
          { source: 'node-2', target: 'node-4' },
          { source: 'node-1', target: 'node-3' },
          { source: 'node-3', target: 'node-4' },
        ],
        combos: [{ id: 'combo-1' }],
      },
      node: { style: { size: 20 } },
      edge: {
        style: { endArrow: true },
      },
      behaviors: [{ type: 'drag-element' }, { type: 'click-select', multiple: true }],
    });
    await graph.render();
    return graph;
  };

  it('drag unselected node', async () => {
    const graph = await createDemoGraph();

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'click-node-1');

    // drag node-2
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 20, dy: 20 });
    graph.emit(NodeEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'drag-node-2');
  });

  it('drag selected node', async () => {
    const graph = await createDemoGraph();

    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'click-node-1-node-2');

    // drag node-2
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 20, dy: 20 });
    graph.emit(NodeEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-node-2');
  });
});
