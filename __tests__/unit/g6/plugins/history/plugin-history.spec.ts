import { pluginHistory } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';
import type { History } from '@antv/g6';
import { Graph } from '@antv/g6';

describe('history plugin', () => {
  let graph: Graph;
  let history: History;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginHistory, { animation: false });
    history = graph.getPluginInstance<History>('history');
  });

  afterAll(() => {
    graph.destroy();
  });

  it('addData', async () => {
    graph.addData({
      nodes: [{ id: 'node-5', style: { x: 200, y: 100, fill: 'pink' } }],
      edges: [{ source: 'node-1', target: 'node-5', style: { stroke: 'brown' } }],
    });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'addData');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'addData-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'addData-redo');
    history.undo();
  });

  it('updateData', async () => {
    graph.updateData({
      nodes: [{ id: 'node-1', style: { x: 150, y: 100, fill: 'red' } }],
      edges: [{ id: 'edge-1', style: { stroke: 'green' } }],
    });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'updateData');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'updateData-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'updateData-redo');
    history.undo();
  });

  it('removeData', async () => {
    graph.removeData({
      nodes: ['node-1'],
      edges: ['edge-1'],
    });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'deleteData');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'deleteData-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'deleteData-redo');
    history.undo();
  });

  it('collapse/expand', async () => {
    graph.collapseElement('combo-2');
    await expect(graph).toMatchSnapshot(__filename, 'collapse');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'collapse-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'collapse-redo');
    history.undo();

    graph.expandElement('combo-1');
    await expect(graph).toMatchSnapshot(__filename, 'expand');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'expand-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'expand-redo');
    history.undo();
  });

  it('setElementState', async () => {
    graph.setElementState('node-1', 'selected', true);
    await expect(graph).toMatchSnapshot(__filename, 'setElementsState');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementsState-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementsState-redo');
    history.undo();
  });

  it('setElementVisibility', async () => {
    graph.setElementVisibility('node-1', 'hidden');
    await expect(graph).toMatchSnapshot(__filename, 'hideElement');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'hideElement-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'hideElement-redo');
    history.undo();
  });

  it('setElementZIndex', async () => {
    graph.setElementZIndex('combo-2', 100);
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex-redo');
    history.undo();
  });
});
