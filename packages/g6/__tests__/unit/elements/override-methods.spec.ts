import { Circle, register } from '@/src';
import { createGraph } from '@@/utils';

describe('element override methods', () => {
  it('override onCreate, onUpdate, onDestroy', async () => {
    const create = jest.fn();
    const update = jest.fn();
    const destroy = jest.fn();

    register(
      'node',
      'custom-circle',
      class CustomCircle extends Circle {
        onCreate() {
          create();
        }
        onUpdate() {
          update();
        }
        onDestroy() {
          destroy();
        }
      },
    );

    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1', type: 'custom-circle' }],
      },
    });

    await graph.draw();

    expect(create).toHaveBeenCalledTimes(1);

    graph.translateElementBy('node-1', [10, 10]);
    expect(update).toHaveBeenCalledTimes(1);

    graph.removeNodeData(['node-1']);
    await graph.draw();
    expect(destroy).toHaveBeenCalledTimes(1);
  });
});
