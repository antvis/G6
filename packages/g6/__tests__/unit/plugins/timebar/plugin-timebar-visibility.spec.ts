import { pluginTimeBarVisibilityBuildIn } from '@/__tests__/demos';
import { createDemoGraph, sleep } from '@@/utils';

describe('plugin timebar visibility', () => {
  it('timebar', async () => {
    const graph = await createDemoGraph(pluginTimeBarVisibilityBuildIn);
    const container = graph.getCanvas().getContainer()!;

    expect(graph.getPlugins().length).toBe(1);
    expect(container.querySelectorAll('.g6-timebar').length).toBe(1);

    graph.emit('timebar:handle', { handle: 'play' });
    await sleep(2000);

    await expect(graph).toMatchSnapshot(__filename, 'timebar-time-play');

    graph.emit('timebar:handle', { handle: 'backward' });
    await sleep(1000);

    await expect(graph).toMatchSnapshot(__filename, 'timebar-time-backward');

    graph.emit('timebar:handle', { handle: 'pause' });
    await sleep(1000);

    await expect(graph).toMatchSnapshot(__filename, 'timebar-time-pause');

    graph.emit('timebar:handle', { handle: 'reset' });
    await expect(graph).toMatchSnapshot(__filename, 'timebar-time-reset');

    graph.updatePlugin({
      type: 'timebar',
      key: 'timebar',
      width: 550,
      height: 120,
      elementTypes: ['node', 'combo'],
      timebarType: 'chart',
    });

    graph.emit('timebar:handle', { handle: 'play' });
    await sleep(2000);

    await expect(graph).toMatchSnapshot(__filename, 'timebar-chart-play');

    graph.emit('timebar:handle', { handle: 'backward' });
    await sleep(1000);

    await expect(graph).toMatchSnapshot(__filename, 'timebar-chart-backward');

    graph.emit('timebar:handle', { handle: 'pause' });
    await sleep(1000);

    await expect(graph).toMatchSnapshot(__filename, 'timebar-chart-pause');

    graph.emit('timebar:handle', { handle: 'reset' });
    await expect(graph).toMatchSnapshot(__filename, 'timebar-chart-reset');

    graph.destroy();
  });
});
