import type { Graph } from '@/src';
import { ComboEvent, NodeEvent } from '@/src';
import { behaviorFocusElement } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior focus element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorFocusElement, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('focus node', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-1');

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-2' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-2');

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-3' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-3');

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-4' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-4');
  });

  it('focus combo', async () => {
    graph.emit(ComboEvent.CLICK, { target: { id: 'combo-1' }, targetType: 'combo' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-combo');
  });
});
