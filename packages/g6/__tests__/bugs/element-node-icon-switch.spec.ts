import { createGraph } from '@@/utils';

describe('bug: element-node-icon-switch', () => {
  it('change node icon', async () => {
    const graph = createGraph({
      animation: false,
      data: {
        nodes: [{ id: 'node-1', style: { x: 50, y: 50, iconText: 'Text' } }],
      },
      node: {
        style: {},
      },
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'text-icon');

    graph.updateNodeData([
      {
        id: 'node-1',
        style: {
          iconText: '',
          iconSrc: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AzSISZeq81IAAAAAAAAAAAAADmJ7AQ/original',
        },
      },
    ]);

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'image-icon');
  });
});
