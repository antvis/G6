import type { Graph } from '@/src';
import { layoutSnake } from '@@/demos/layout-snake';
import { createDemoGraph } from '@@/utils';

describe('snake', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutSnake);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'default');
  });

  it('padding', async () => {
    graph.setLayout((prev) => ({ ...prev, padding: 20 })), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'padding-20');
  });

  it('set cols as 1', async () => {
    graph.setLayout((prev) => ({ ...prev, padding: 0, cols: 1 })), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'cols-1');
  });

  it('set cols as 20', async () => {
    graph.setLayout((prev) => ({ ...prev, padding: 0, cols: 20 })), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'cols-20');
  });

  it('colSep and rowSep', async () => {
    graph.setLayout((prev) => ({ ...prev, cols: 6, colGap: 50, rowGap: 50 })), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'gap-50');
  });

  it('anti-clockwise', async () => {
    graph.setLayout((prev) => ({ ...prev, clockwise: false })), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'anti-clockwise');
  });
});
