import type { History } from '@/src';
import { ComboEvent, Graph, NodeEvent } from '@/src';
import { pluginHistory } from '@@/demos';
import { createDemoGraph } from '@@/utils';

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
    graph.setElementZIndex('node-1', 101);
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'setElementZIndex-redo');
    history.undo();
  });

  it('create-edge', async () => {
    graph.setBehaviors((prev) => [
      ...prev,
      { type: 'create-edge', trigger: 'click', style: { stroke: 'red', lineWidth: 2 } },
    ]);
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(ComboEvent.CLICK, { target: { id: 'combo-2' }, targetType: 'combo' });
    await expect(graph).toMatchSnapshot(__filename, 'create-edge');
    history.undo();
    await expect(graph).toMatchSnapshot(__filename, 'create-edge-undo');
    history.redo();
    await expect(graph).toMatchSnapshot(__filename, 'create-edge-redo');
    history.undo();
  });

  it('beforeAddCommand', async () => {
    const undoStackLen = history.undoStack.length;

    graph.updatePlugin({ key: 'history', beforeAddCommand: () => false });
    graph.setElementVisibility('node-1', 'hidden');
    await graph.draw();
    expect(history.undoStack.length).toEqual(undoStackLen);

    graph.updatePlugin({ key: 'history', beforeAddCommand: () => true });
    graph.setElementVisibility('node-1', 'visible');
    await graph.draw();
    expect(history.undoStack.length).toEqual(undoStackLen + 1);
  });

  it('canUndo/canRedo/clear', async () => {
    expect(history.canUndo()).toBeTruthy();
    expect(history.canRedo()).toBeTruthy();
    history.clear();
    expect(history.undoStack.length).toEqual(0);
    expect(history.canUndo()).toBeFalsy();
    expect(history.canRedo()).toBeFalsy();
  });
});
