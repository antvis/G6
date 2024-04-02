import { comboExpandCollapse } from '@/__tests__/demos';
import { CommonEvent, type Graph } from '@/src';
import { createDemoGraph } from '@@/utils';

describe('behavior drag combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(comboExpandCollapse, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    graph.setBehaviors([{ type: 'drag-element', dropEffect: 'link' }]);
    graph.expand('combo-1');
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('drag node out', async () => {
    // drag node-2 to combo-2
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 80, dy: 60 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-2-before-drop-out');
    graph.emit(`combo:${CommonEvent.DROP}`, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-2-after-drop-out');

    // drag node-1 to canvas
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: -70, dy: -70 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-before-drop-out');
    graph.emit(`canvas:${CommonEvent.DROP}`, { target: {} });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-after-drop-out');
  });

  it('drag node into', async () => {
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 250, dy: 250 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-before-drop-into');
    graph.emit(`combo:${CommonEvent.DROP}`, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-after-drop-into');
  });

  it('drag node move', async () => {
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 100, dy: 100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-before-drop-move');
    graph.emit(`combo:${CommonEvent.DROP}`, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-after-drop-move');
  });

  it('drag combo move', async () => {
    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 100, dy: 100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-before-drop-move');
    graph.emit(`combo:${CommonEvent.DROP}`, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-after-drop-move');
  });

  it('drag combo out', async () => {
    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: -250, dy: -250 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-before-drop-out');
    graph.emit(`canvas:${CommonEvent.DROP}`, { target: {} });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-after-drop-out');
  });

  it('drag combo into', async () => {
    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-2' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: -200, dy: -200 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-2-before-drop-into');
    graph.emit(`combo:${CommonEvent.DROP}`, { target: { id: 'combo-1' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-2-after-drop-into');
  });
});
