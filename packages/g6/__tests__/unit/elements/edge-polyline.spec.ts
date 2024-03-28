import { type Graph } from '@/src';
import { edgePolyline } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

const updateEdgeStyle = (graph: Graph, id: string, attr: string, value: any) => {
  graph.updateEdgeData((prev) => {
    const edgeData = prev.find((edge: any) => edge.id === id)!;
    return [
      ...prev.filter((edge: any) => edge.id !== id),
      {
        ...edgeData,
        style: {
          ...edgeData?.style,
          [attr]: value,
        },
      },
    ];
  });
  graph.render();
};

describe('edge polyline', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(edgePolyline, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('Control Points', async () => {
    updateEdgeStyle(graph, 'edge-1', 'controlPoints', [[300, 190]]);

    await expect(graph).toMatchSnapshot(__filename, 'edge-polyline-controlPoints');
  });

  it('Radius', async () => {
    updateEdgeStyle(graph, 'edge-1', 'radius', 20);

    await expect(graph).toMatchSnapshot(__filename, 'edge-polyline-radius');

    updateEdgeStyle(graph, 'edge-1', 'radius', 0);
  });

  it('Router', async () => {
    updateEdgeStyle(graph, 'edge-1', 'router', true);

    await expect(graph).toMatchSnapshot(__filename, 'edge-polyline-router-has-controlPoints');

    updateEdgeStyle(graph, 'edge-1', 'controlPoints', []);

    await expect(graph).toMatchSnapshot(__filename, 'edge-polyline-router-no-controlPoints');
  });
});
