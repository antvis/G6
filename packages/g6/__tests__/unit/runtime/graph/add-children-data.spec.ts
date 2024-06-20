import { layoutCompactBoxBasic } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('add children data', () => {
  it('default', async () => {
    const graph = await createDemoGraph(layoutCompactBoxBasic, { animation: false });
    await expect(graph).toMatchSnapshot(__filename);

    graph.addChildrenData('Rules', [{ id: 'node-1' }, { id: 'node-2' }]);
    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'add-children-data');
  });
});
