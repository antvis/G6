import { createGraph } from '@@/utils';

describe('bugs:continuous-invoke', () => {
  it('continuous invoke', () => {
    const graph = createGraph({});
    const fn = jest.fn(async () => {
      graph.destroy();
      await graph.render();
    });

    expect(fn).rejects.toThrow();
  });
});
