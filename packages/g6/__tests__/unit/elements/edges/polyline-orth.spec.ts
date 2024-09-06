import { elementEdgePolylineOrth } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge polyline orth', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgePolylineOrth);
    await expect(graph).toMatchSnapshot(__filename);

    graph.setNode({
      type: 'rect',
      style: {
        size: [60, 30],
        radius: 8,
        ports: [{ placement: 'left' }, { placement: 'right' }],
      },
    });
    graph.setLayout((prev) => ({ ...prev, rankdir: 'RL' }));
    graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'dagre-RL');

    graph.destroy();
  });
});
