import { layoutDagreFlow, layoutDagreFlowCombo } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('dagre flow', () => {
  it('flow', async () => {
    const graph = await createDemoGraph(layoutDagreFlow);
    await expect(graph).toMatchSnapshot(__filename, 'flow');
    graph.destroy();
  });

  it('flow combo', async () => {
    const graph = await createDemoGraph(layoutDagreFlowCombo);
    await expect(graph).toMatchSnapshot(__filename, 'flow-combo');
    graph.destroy();
  });
});
