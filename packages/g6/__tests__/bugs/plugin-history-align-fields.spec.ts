import { createGraph } from '@@/utils';

describe('bug: plugin-history-align-fields', () => {
  it('fix alignFields util', async () => {
    const graph = createGraph({
      plugins: [{ type: 'history', key: 'history' }],
      data: {
        nodes: [
          {
            id: 'node-1',
            type: 'rect',
            style: { x: 50, y: 100 },
            data: {
              aaa: {
                bbb: false,
                ccc: true,
                ddd: '1234',
              },
            },
          },
        ],
      },
    });

    await graph.render();

    expect(graph.getNodeData('node-1').style).toEqual({ x: 50, y: 100, zIndex: 0 });
    expect(graph.getNodeData('node-1').data!.aaa).toEqual({
      bbb: false,
      ccc: true,
      ddd: '1234',
    });

    await graph.translateElementBy('node-1', [100, 100]);
    expect(graph.getNodeData('node-1').style).toEqual({ x: 150, y: 200, z: 0, zIndex: 0 });
    expect(graph.getNodeData('node-1').data!.aaa).toEqual({
      bbb: false,
      ccc: true,
      ddd: '1234',
    });
  });
});
