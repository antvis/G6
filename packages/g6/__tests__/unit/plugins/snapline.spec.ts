import type { Graph, Node } from '@/src';
import { NodeEvent } from '@/src';
import { pluginSnapline } from '@@/demos';
import { createDemoGraph } from '../../utils';

describe('plugin snapline', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginSnapline);
  });

  it('snapline', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    // @ts-expect-error access private property
    const node = graph.context.element?.getElement('node3');

    let i = 0;

    const moveNodeAndCreateSnapshot = async (x: number, y: number, prefix: string, reset = false) => {
      graph.updateNodeData([{ id: 'node3', style: { x, y } }]);
      graph.render();
      graph.emit(NodeEvent.DRAG_START, { target: node, targetType: 'node' });
      graph.emit(NodeEvent.DRAG, { target: node, dx: 0, dy: 0 });
      if (reset) i = 0;
      await expect(graph).toMatchSnapshot(__filename, `drag-node3-${prefix}-${i}`);
      graph.emit(NodeEvent.DRAG_END, { target: node });
      i++;
    };

    await moveNodeAndCreateSnapshot(50, 300, 'vertical');
    await moveNodeAndCreateSnapshot(90, 300, 'vertical');
    await moveNodeAndCreateSnapshot(100, 300, 'vertical');
    await moveNodeAndCreateSnapshot(110, 300, 'vertical');
    await moveNodeAndCreateSnapshot(150, 300, 'vertical');
    await moveNodeAndCreateSnapshot(200, 300, 'vertical');
    await moveNodeAndCreateSnapshot(250, 300, 'vertical');
    await moveNodeAndCreateSnapshot(290, 300, 'vertical');
    await moveNodeAndCreateSnapshot(300, 300, 'vertical');
    await moveNodeAndCreateSnapshot(310, 300, 'vertical');
    await moveNodeAndCreateSnapshot(350, 300, 'vertical');
    await moveNodeAndCreateSnapshot(400, 300, 'vertical');

    await moveNodeAndCreateSnapshot(200, 65, 'horizontal', true);
    await moveNodeAndCreateSnapshot(200, 95, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 100, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 105, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 135, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 150, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 265, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 295, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 300, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 305, 'horizontal');
    await moveNodeAndCreateSnapshot(200, 335, 'horizontal');

    graph.updatePlugin({ key: 'snapline', offset: Infinity });
    graph.updateNodeData([{ id: 'node3', style: { x: 100, y: 300 } }]);
    graph.render();
    graph.emit(NodeEvent.DRAG_START, { target: node, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { target: node, dx: 0, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, `offset-infinity`);
    graph.emit(NodeEvent.DRAG_END, { target: node });

    graph.updatePlugin({ key: 'snapline', filter: (node: Node) => node.id !== 'node2' });
    graph.render();
    graph.emit(NodeEvent.DRAG_START, { target: node, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { target: node, dx: 0, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, `filter-node2`);
    graph.emit(NodeEvent.DRAG_END, { target: node });

    graph.updatePlugin({ key: 'snapline', filter: () => true, autoSnap: true });
    graph.updateNodeData([{ id: 'node3', style: { x: 96, y: 304 } }]);
    graph.render();
    graph.emit(NodeEvent.DRAG_START, { target: node, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { target: node, dx: 0, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, `auto-snap`);
    graph.emit(NodeEvent.DRAG_END, { target: node });

    // zoom to test lineWidth
    graph.zoomTo(5, false, [300, 300]);
    graph.updatePlugin({ key: 'snapline', autoSnap: false });
    graph.updateNodeData([{ id: 'node3', style: { x: 260, y: 300 } }]);
    graph.render();
    graph.emit(NodeEvent.DRAG_START, { target: node, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { target: node, dx: 0, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'zoom-5');
    graph.emit(NodeEvent.DRAG_END, { target: node });
  });

  afterAll(() => {
    graph.destroy();
  });
});
