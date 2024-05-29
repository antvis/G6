import { behaviorFocusElement } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';
import { CommonEvent, type Graph } from '@antv/g6';

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

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node-1' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-1');

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node-2' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-2');

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node-3' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-3');

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node-4' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-node-4');
  });

  it('focus combo', async () => {
    graph.emit(`combo:${CommonEvent.CLICK}`, { target: { id: 'combo-1' }, targetType: 'combo' });

    await expect(graph).toMatchSnapshot(__filename, 'focus-combo');
  });
});
