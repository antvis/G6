import { Graph } from '@antv/g6';

export const elementEdgeRemoveSafe: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    animation: false,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 150, y: 150 } },
        { id: 'node-2', style: { x: 350, y: 150 } },
        { id: 'node-3', style: { x: 250, y: 300 } },
        { id: 'node-4', style: { x: 450, y: 300 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3' },
        { id: 'edge-3', source: 'node-3', target: 'node-4' },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id!,
        labelPlacement: 'bottom',
      },
    },
    edge: {
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
  });

  await graph.render();

  elementEdgeRemoveSafe.form = (panel) => {
    const actions = {
      removeExistingEdge: () => {
        console.log('删除前边数量:', graph.getEdgeData().length);
        graph.removeEdgeData(['edge-1']);
        graph.draw();
        console.log('删除 edge-1 后边数量:', graph.getEdgeData().length);
      },
      removeNonExistentEdge: () => {
        console.log('删除前边数量:', graph.getEdgeData().length);
        graph.removeEdgeData(['non-existent-edge']);
        graph.draw();
        console.log('尝试删除不存在边后边数量:', graph.getEdgeData().length);
      },
      removeSameEdgeTwice: () => {
        console.log('删除前边数量:', graph.getEdgeData().length);
        graph.removeEdgeData(['edge-1']);
        graph.draw();
        console.log('第一次删除 edge-1 后边数量:', graph.getEdgeData().length);
        // 再次删除同一条边
        graph.removeEdgeData(['edge-1']);
        graph.draw();
        console.log('重复删除 edge-1 后边数量:', graph.getEdgeData().length);
      },
      removeMixedEdges: () => {
        console.log('删除前边数量:', graph.getEdgeData().length);
        graph.removeEdgeData(['edge-2', 'fake-edge', 'edge-3', 'another-fake']);
        graph.draw();
        console.log('混合删除后边数量:', graph.getEdgeData().length);
      },
      addTempEdges: () => {
        console.log('操作前边数量:', graph.getEdgeData().length);

        // 检查是否已存在临时边
        const existingEdges = graph.getEdgeData();
        const tempEdgeIds = existingEdges
          .filter((edge: any) => edge.id.startsWith('temp-'))
          .map((edge: any) => edge.id);

        if (tempEdgeIds.length > 0) {
          // 如果有临时边，删除它们（切换到无临时边状态）
          console.log('删除已存在的临时边:', tempEdgeIds);
          graph.removeEdgeData(tempEdgeIds);
          graph.draw();
          console.log('删除临时边后边数量:', graph.getEdgeData().length);
        } else {
          // 如果没有临时边，添加它们（切换到有临时边状态）
          console.log('添加临时边');
          graph.addEdgeData([
            { id: 'temp-1', source: 'node-1', target: 'node-3', style: { stroke: 'orange' } },
            { id: 'temp-2', source: 'node-2', target: 'node-4', style: { stroke: 'purple' } },
          ]);
          graph.draw();
          console.log('添加临时边后边数量:', graph.getEdgeData().length);
        }
      },
      removeNodeAndRelatedEdges: () => {
        console.log('删除节点前边数量:', graph.getEdgeData().length);
        graph.removeNodeData(['node-4']);
        graph.draw();
        console.log('删除 node-4 后边数量:', graph.getEdgeData().length);
        console.log(
          '剩余边ID:',
          graph.getEdgeData().map((e: any) => e.id),
        );
      },
      resetGraph: () => {
        graph.setData({
          nodes: [
            { id: 'node-1', style: { x: 150, y: 150 } },
            { id: 'node-2', style: { x: 350, y: 150 } },
            { id: 'node-3', style: { x: 250, y: 300 } },
            { id: 'node-4', style: { x: 450, y: 300 } },
          ],
          edges: [
            { id: 'edge-1', source: 'node-1', target: 'node-2' },
            { id: 'edge-2', source: 'node-2', target: 'node-3' },
            { id: 'edge-3', source: 'node-3', target: 'node-4' },
          ],
        });
        graph.draw();
        console.log('重置后边数量:', graph.getEdgeData().length);
      },
    };

    return [
      panel.add(actions, 'removeExistingEdge').name('删除存在的边'),
      panel.add(actions, 'removeNonExistentEdge').name('删除不存在的边'),
      panel.add(actions, 'removeSameEdgeTwice').name('重复删除同一条边'),
      panel.add(actions, 'removeMixedEdges').name('混合删除边'),
      panel.add(actions, 'addTempEdges').name('切换临时边'),
      panel.add(actions, 'removeNodeAndRelatedEdges').name('删除节点及相关边'),
      panel.add(actions, 'resetGraph').name('重置图形'),
    ];
  };

  return graph;
};
