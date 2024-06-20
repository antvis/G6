import { layoutCompactBoxBasic } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('render deleted data', () => {
  it('bug', async () => {
    const graph = await createDemoGraph(layoutCompactBoxBasic);

    const render = jest.fn(async () => {
      graph.removeNodeData(['Classification']);
      await graph.render();
    });

    expect(render).not.toThrow();
  });
});
