import { Graph } from '@antv/g6';

export const elementChangeType: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', type: 'rect', style: { x: 100, y: 100, fill: 'transparent', stroke: '#1783ff' } },
        { id: 'node-2', style: { x: 200, y: 100 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
  });

  await graph.render();

  elementChangeType.form = (panel) => {
    const config = {
      node1: 'rect',
      node2: 'circle',
    };
    const options = { Circle: 'circle', Rect: 'rect', Diamond: 'diamond', Star: 'star' };

    const changeType = (id: string, type: string) => {
      graph.updateNodeData([{ id, type }]);
      graph.draw();
    };

    return [
      panel
        .add(config, 'node1', options)
        .name('node-1 type')
        .onChange((value: string) => changeType('node-1', value)),
      panel
        .add(config, 'node2', options)
        .name('node-2 type')
        .onChange((value: string) => changeType('node-2', value)),
    ];
  };

  return graph;
};
