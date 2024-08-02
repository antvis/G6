import { createGraph } from '@@/utils';

describe('element remove combo', () => {
  it('remove combo', async () => {
    const graph = createGraph({
      animation: true,
      data: {
        nodes: [
          { id: 'node-1', data: {}, combo: 'combo-1' },
          { id: 'node-2', data: {}, combo: 'combo-1' },
          { id: 'node-3', data: {}, combo: 'combo-1' },
        ],
        combos: [
          { id: 'combo-1', data: {}, combo: 'combo-2' },
          { id: 'combo-2', data: {}, style: {} },
        ],
      },
      layout: {
        type: 'force',
      },
    });

    await graph.draw();

    graph.removeComboData(['combo-1']);

    const draw = jest.fn(async () => {
      await graph.draw();
    });

    expect(draw).not.toThrow();
  });
});
