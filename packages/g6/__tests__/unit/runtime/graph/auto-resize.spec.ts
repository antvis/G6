import { Graph } from '@/src';
import { createGraphCanvas, sleep } from '@@/utils';

describe('Graph autoResize', () => {
  it('autoResize trigger by window.resize', async () => {
    const $container = document.createElement('div');
    document.body.appendChild($container);
    const canvas = createGraphCanvas($container, 500, 500);

    const graph = new Graph({
      container: canvas,
      width: 500,
      height: 500,
      autoResize: true,
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      },
      theme: 'light',
      node: {},
      layout: {
        type: 'grid',
      },
    });

    await graph.render();

    expect(graph.getSize()).toEqual([500, 500]);

    $container.style.display = 'block';
    $container.style.width = '400px';
    $container.style.height = '400px';
    window.dispatchEvent(new Event('resize'));

    // auto resize debounce is 300ms.
    await sleep(500);

    expect(graph.getSize()).toEqual([400, 400]);
  });
});
