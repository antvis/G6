import { Graph } from '@antv/g6';

export const bugTooltipResize: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
      ],
    },
    layout: {
      type: 'grid',
    },
    plugins: [
      {
        type: 'tooltip',
        style: {
          ['.tooltip']: {
            transition: 'none',
          },
        },
      },
    ],
  });

  await graph.render();

  bugTooltipResize.form = (panel) => {
    let width = 500;
    return [
      panel.add(
        {
          resize: () => {
            const newWidth = width === 500 ? 300 : 500;
            width = newWidth;
            document.querySelector<HTMLDivElement>('#container')!.style.width = `${newWidth}px`;
            graph.resize();
            graph.fitView();
          },
        },
        'resize',
      ),
    ];
  };

  return graph;
};
