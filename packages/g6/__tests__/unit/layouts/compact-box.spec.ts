import { layoutCompactBoxBasic, layoutCompactBoxLeftAlign, layoutCompactBoxTopToBottom } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('compact box', () => {
  it('basic', async () => {
    const graph = await createDemoGraph(layoutCompactBoxBasic);
    await expect(graph).toMatchSnapshot(__filename, 'basic');
    graph.destroy();
  });

  it('left align', async () => {
    const graph = await createDemoGraph(layoutCompactBoxLeftAlign);
    await expect(graph).toMatchSnapshot(__filename, 'left-align');
    graph.destroy();
  });

  it('top to bottom', async () => {
    const graph = await createDemoGraph(layoutCompactBoxTopToBottom);
    await expect(graph).toMatchSnapshot(__filename, 'top-to-bottom');
    graph.destroy();
  });
});
