import { layoutMindmapH, layoutMindmapHCustomSide, layoutMindmapHLeft, layoutMindmapHRight } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('mindmap', () => {
  it('h custom side', async () => {
    const graph = await createDemoGraph(layoutMindmapHCustomSide);
    await expect(graph).toMatchSnapshot(__filename, 'h-custom-side');
    graph.destroy();
  });

  it('h left', async () => {
    const graph = await createDemoGraph(layoutMindmapHLeft);
    await expect(graph).toMatchSnapshot(__filename, 'h-left');
    graph.destroy();
  });

  it('h', async () => {
    const graph = await createDemoGraph(layoutMindmapH);
    await expect(graph).toMatchSnapshot(__filename, 'h');
    graph.destroy();
  });

  it('h right', async () => {
    const graph = await createDemoGraph(layoutMindmapHRight);
    await expect(graph).toMatchSnapshot(__filename, 'h-right');
    graph.destroy();
  });
});
