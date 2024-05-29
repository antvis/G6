import { Graph, treeToGraphData } from '@antv/g6';

export const behaviorExpandCollapseNode: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    x: 200,
    y: 200,
    data: treeToGraphData({
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'D' }, { id: 'E' }] },
        { id: 'C', children: [{ id: 'F' }, { id: 'G' }], style: { collapsed: true } },
      ],
    }),
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'right',
        ports: [{ position: 'center' }],
      },
    },
    edge: {
      type: 'cubic-horizontal',
    },
    layout: {
      type: 'dendrogram',
      nodeSep: 30,
      rankSep: 100,
    },
    behaviors: [{ type: 'collapse-expand', trigger: 'click' }, 'drag-element'],
  });

  await graph.render();

  behaviorExpandCollapseNode.form = (panel) => {
    const config = {
      element: 'A',
      collapse: () => graph.collapseElement(config.element),
      expand: () => graph.expandElement(config.element),
    };

    return [
      panel.add(config, 'element', ['A', 'B', 'C', 'D', 'E', 'F', 'G']).name('Node'),
      panel.add(config, 'collapse').name('Collapse'),
      panel.add(config, 'expand').name('Expand'),
    ];
  };

  return graph;
};
