import { GraphEvent } from '@/src';
import { layoutPipelineMdsForce } from '@@/demos';
import { createDemoGraph, createGraph } from '@@/utils';

describe('pipeline', () => {
  it('event', async () => {
    const graph = createGraph({
      data: {
        nodes: new Array(10).fill(null).map((_, i) => ({ id: `${i}` })),
      },
      layout: [
        {
          type: 'force',
        },
        {
          type: 'd3-force',
        },
        {
          type: 'grid',
        },
      ],
    });

    const before = jest.fn();
    const after = jest.fn();

    graph.on(GraphEvent.BEFORE_STAGE_LAYOUT, (e) => {
      before(e);
    });

    graph.on(GraphEvent.AFTER_STAGE_LAYOUT, (e) => {
      after(e);
    });

    await graph.render();

    expect(before).toHaveBeenCalledTimes(3);
    expect(after).toHaveBeenCalledTimes(3);

    expect(before.mock.calls[0][0].data.options.type).toBe('force');
    expect(before.mock.calls[1][0].data.options.type).toBe('d3-force');
    expect(before.mock.calls[2][0].data.options.type).toBe('grid');

    expect(after.mock.calls[0][0].data.options.type).toBe('force');
    expect(after.mock.calls[1][0].data.options.type).toBe('d3-force');
    expect(after.mock.calls[2][0].data.options.type).toBe('grid');
  });

  it('layout-pipeline-mds-force', async () => {
    const graph = await createDemoGraph(layoutPipelineMdsForce);
    await expect(graph).toMatchSnapshot(__filename, 'layout-pipeline-mds-force');
    graph.destroy();
  });
});
