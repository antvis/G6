import { layoutAntVDagreFlow, layoutAntVDagreFlowCombo, layoutDagre } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('antv dagre flow', () => {
  it('flow', async () => {
    const graph = await createDemoGraph(layoutAntVDagreFlow);
    await expect(graph).toMatchSnapshot(__filename, 'antv-flow');
    graph.destroy();
  });

  it('antv dagre flow combo', async () => {
    const graph = await createDemoGraph(layoutAntVDagreFlowCombo);
    await expect(graph).toMatchSnapshot(__filename, 'antv-flow-combo');
    graph.destroy();
  });

  it('dagre.js', async () => {
    const graph = await createDemoGraph(layoutDagre);
    await expect(graph).toMatchSnapshot(__filename, 'dagre');
    graph.destroy();
  });
});
