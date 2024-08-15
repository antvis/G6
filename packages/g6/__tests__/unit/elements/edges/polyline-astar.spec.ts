import { elementEdgePolylineAstar } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge polyline astar', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgePolylineAstar);

    graph.updateEdgeData([
      {
        id: 'edge-1',
        style: {
          router: {
            type: 'shortest-path',
            enableObstacleAvoidance: false,
            startDirections: ['top', 'right', 'bottom', 'left'],
            endDirections: ['top', 'right', 'bottom', 'left'],
          },
        },
      },
    ]);
    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    graph.updateEdgeData([
      {
        id: 'edge-1',
        style: {
          router: {
            type: 'shortest-path',
            enableObstacleAvoidance: false,
            startDirections: ['left'],
            endDirections: ['left'],
          },
        },
      },
    ]);
    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'left-left');

    graph.updateEdgeData([
      {
        id: 'edge-1',
        style: {
          router: {
            type: 'shortest-path',
            offset: 0,
            gridSize: 5,
            enableObstacleAvoidance: true,
            startDirections: ['top', 'right', 'bottom', 'left'],
            endDirections: ['top', 'right', 'bottom', 'left'],
          },
        },
      },
    ]);
    await graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'obstacle-move-node-1');

    graph.updateNodeData([
      {
        id: 'node-2',
        style: { x: 120, y: 200 },
      },
    ]);
    await graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'obstacle-move-node-2');

    graph.updateNodeData([
      {
        id: 'node-2',
        style: { x: 150, y: 200 },
      },
    ]);
    await graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'obstacle-move-node-3');

    graph.updateNodeData([
      {
        id: 'node-2',
        style: { x: 2000, y: 200 },
      },
    ]);
    await graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'obstacle-move-node-4');

    graph.destroy();
  });
});
