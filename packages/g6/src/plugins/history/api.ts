import type { History } from '.';
import { Graph } from '../../../src';
import type { Command } from './utils';

export interface IGraphWithHistory extends Graph {
  undo: () => Graph;
  undoAndCancel: () => Graph;
  redo: () => Graph;
  getUndoStack: () => Command[];
  getRedoStack: () => Command[];
  cleanHistory: () => Graph;
}

const HISTORY_KEY = 'plugin-history-0';

const getHistoryPlugin = (graph: Graph) => {
  // @ts-ignore
  return graph.context.plugin?.extensionMap[HISTORY_KEY] as History;
};

const GraphWithHistory = Graph.prototype as IGraphWithHistory;

GraphWithHistory.undo = function () {
  const history = getHistoryPlugin(this);
  history?.undo();
  return this;
};

GraphWithHistory.undoAndCancel = function () {
  const history = getHistoryPlugin(this);
  history?.cancel();
  return this;
};

GraphWithHistory.redo = function () {
  const history = getHistoryPlugin(this);
  history?.redo();
  return this;
};

GraphWithHistory.getUndoStack = function () {
  const history = getHistoryPlugin(this);
  return history?.undoStack || [];
};

GraphWithHistory.getRedoStack = function () {
  const history = getHistoryPlugin(this);
  return history?.redoStack || [];
};

GraphWithHistory.cleanHistory = function () {
  const history = getHistoryPlugin(this);
  history?.clean();
  return this;
};
