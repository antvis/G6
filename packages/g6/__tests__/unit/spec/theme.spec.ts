import type { Graph, ThemeOptions } from '@/src';
import { theme } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('spec theme', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(theme, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('theme', async () => {
    const theme: ThemeOptions = 'light';

    expect(theme).toBeTruthy();
  });

  it('palette', async () => {
    graph.setOptions({
      node: {
        palette: {
          type: 'group',
          field: 'cluster',
          color: 'spectral',
        },
      },
    });
    graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'theme_node_palette_spectral');
  });
});
