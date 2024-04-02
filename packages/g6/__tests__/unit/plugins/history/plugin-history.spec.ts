import type { IGraphWithHistory } from '@/src/plugins/history/api';
import { pluginHistory } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('history plugin', () => {
  let graph: IGraphWithHistory;

  beforeAll(async () => {
    graph = (await createDemoGraph(pluginHistory, { animation: false })) as IGraphWithHistory;
  });

  afterAll(() => {
    graph.destroy();
  });

  it('addData', async () => {
    graph.addData({
      nodes: [{ id: 'node-5', style: { x: 200, y: 100, color: 'pink' } }],
      edges: [{ source: 'node-1', target: 'node-5', style: { color: 'brown' } }],
    });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'addData');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'addData-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'addData-redo');
    graph.undo();
  });

  it('updateData', async () => {
    graph.updateData({
      nodes: [{ id: 'node-1', style: { x: 150, y: 100, color: 'red' } }],
      edges: [{ id: 'edge-1', style: { color: 'green' } }],
    });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'updateData');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'updateData-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'updateData-redo');
    graph.undo();
  });

  it('removeData', async () => {
    graph.removeData({
      nodes: ['node-1'],
      edges: ['edge-1'],
    });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'deleteData');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'deleteData-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'deleteData-redo');
    graph.undo();
  });

  it('collapse/expand', async () => {
    graph.collapse('combo-2');
    await expect(graph).toMatchSnapshot(__filename, 'collapse');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'collapse-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'collapse-redo');
    graph.undo();

    graph.expand('combo-1');
    await expect(graph).toMatchSnapshot(__filename, 'expand');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'expand-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'expand-redo');
    graph.undo();
  });

  it('setElementState', async () => {
    graph.setElementState('node-1', 'selected', true);
    await expect(graph).toMatchSnapshot(__filename, 'setElementsState');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementsState-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementsState-redo');
    graph.undo();
  });

  it('setElementVisibility', async () => {
    graph.setElementVisibility('node-1', 'hidden');
    await expect(graph).toMatchSnapshot(__filename, 'hideElement');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'hideElement-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'hideElement-redo');
    graph.undo();
  });

  it('setElementZIndex', async () => {
    graph.setElementZIndex('combo-2', 100);
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex');
    graph.undo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex-undo');
    graph.redo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex-redo');
    graph.undo();
  });
});
