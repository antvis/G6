import { behaviorClickElement } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';
import { CommonEvent, type Graph } from '@antv/g6';

describe('behavior click element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorClickElement, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'after-select');

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'after-deselect');
  });

  it('selectedState and unselectedState', async () => {
    graph.setBehaviors([{ type: 'click-element', selectedState: 'active', unselectedState: 'inactive' }]);

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'custom-state');
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
  });

  it('1 degree', async () => {
    graph.setBehaviors([{ type: 'click-element', degree: 1, selectedState: 'selected', unselectedState: undefined }]);

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'node-1-degree');
    graph.emit(`canvas:${CommonEvent.CLICK}`, { target: {}, targetType: 'canvas' });

    graph.emit(`edge:${CommonEvent.CLICK}`, { target: { id: '0-1' }, targetType: 'edge' });
    await expect(graph).toMatchSnapshot(__filename, 'edge-1-degree');
    graph.emit(`canvas:${CommonEvent.CLICK}`, { target: {}, targetType: 'canvas' });
  });

  it('multiple', async () => {
    graph.setBehaviors([{ type: 'click-element', multiple: true, degree: 0 }]);

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '1' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'multiple-shift');

    graph.setBehaviors([{ type: 'click-element', multiple: true, trigger: ['meta'] }]);

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '0' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'meta' });
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: '1' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'meta' });

    await expect(graph).toMatchSnapshot(__filename, 'multiple-meta');
  });
});
