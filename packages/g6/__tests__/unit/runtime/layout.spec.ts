import { layoutCircularBasic } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('layout options', () => {
  it('layoutEmptyOptions', async () => {
    const graph = await createDemoGraph(layoutCircularBasic);
    await expect(graph).toMatchSnapshot(__filename, 'empty');
    graph.destroy();
  });

  it('layoutExtraOptions', async () => {
    const graph = await createDemoGraph(layoutCircularBasic);
    await graph.layout({
      type: 'circular',
      radius: 1000,
    });
    await expect(graph).toMatchSnapshot(__filename, 'extra');
    graph.destroy();
  });

  it('layoutOtherTypeOptionsAndRecover', async () => {
    const graph = await createDemoGraph(layoutCircularBasic);
    await graph.layout({
      type: 'concentric',
    });
    await expect(graph).toMatchSnapshot(__filename, 'other-type');
    await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'recover');
    graph.destroy();
  });

  it('layoutArrayOptions', async () => {
    const graph = await createDemoGraph(layoutCircularBasic);
    await graph.layout(
      Array.from({ length: 4 }, () => ({
        type: 'circular',
      })),
    );
    await expect(graph).toMatchSnapshot(__filename, 'layout-array');
    graph.destroy();
  });
});
