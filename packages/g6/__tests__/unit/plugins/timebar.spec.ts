import type { Timebar } from '@/src';
import { pluginTimebar } from '@@/demos';
import { createDemoGraph, sleep } from '@@/utils';

describe('plugin timebar', () => {
  it('time type, modify', async () => {
    const graph = await createDemoGraph(pluginTimebar);

    await expect(graph).toMatchSnapshot(__filename);
    const timebar = graph.getPluginInstance<Timebar>('timebar');

    timebar.play();
    await sleep(1000);
    await expect(graph).toMatchSnapshot(__filename, 'play-1-time-modify');

    await sleep(1000);
    await expect(graph).toMatchSnapshot(__filename, 'play-2-time-modify');

    timebar.pause();

    timebar.backward();
    await expect(graph).toMatchSnapshot(__filename, 'backward-1-time-modify');

    timebar.forward();
    await expect(graph).toMatchSnapshot(__filename, 'forward-1-time-modify');

    timebar.forward();
    await expect(graph).toMatchSnapshot(__filename, 'forward-2-time-modify');

    timebar.reset();
    await expect(graph).toMatchSnapshot(__filename, 'reset-modify');

    graph.destroy();
  });

  it('time type, visibility', async () => {
    const graph = await createDemoGraph(pluginTimebar);
    const timebar = graph.getPluginInstance<Timebar>('timebar');

    timebar.update({
      mode: 'visibility',
    });

    timebar.forward();
    await expect(graph).toMatchSnapshot(__filename, 'forward-1-time-visibility');

    timebar.forward();
    timebar.forward();
    timebar.backward();
    await expect(graph).toMatchSnapshot(__filename, 'backward-1-time-visibility');

    timebar.reset();
    await expect(graph).toMatchSnapshot(__filename, 'reset-visibility');

    graph.destroy();
  });

  it('chart type', async () => {
    // In current, cannot capture the timebar snapshot
  });

  it('event callback', async () => {
    const onChange = jest.fn();
    const onRest = jest.fn();
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const onBackward = jest.fn();
    const onForward = jest.fn();

    const graph = await createDemoGraph(pluginTimebar);
    const timebar = graph.getPluginInstance<Timebar>('timebar');

    timebar.update({
      onChange,
      onRest,
      onPlay,
      onPause,
      onBackward,
      onForward,
    });

    // api calls do not trigger event callbacks
    // timebar.play();
    // expect(onPlay).toHaveBeenCalledTimes(1);
    // timebar.pause();
    // expect(onPause).toHaveBeenCalledTimes(1);
    // timebar.forward();
    // expect(onForward).toHaveBeenCalledTimes(1);
    // timebar.backward();
    // expect(onBackward).toHaveBeenCalledTimes(1);
  });
});
