import type { History } from '.';
import { Graph } from '../../../src';
import type { Command } from './utils';

export interface IGraphWithHistory extends Graph {
  /**
   * <zh/> 撤销上一步操作
   *
   * <en/> Undo
   */
  undo: () => Graph;
  /**
   * <zh/> 同 `undo()`，但不会将撤销的命令存储到 `redoStack` 中。因此取消的命令无法被重做。
   *
   * <en/> Same as `undo()` but does not store the undo-ed command to the
   * `redoStack`. Canceled command therefore cannot be redo-ed.
   */
  undoAndCancel: () => Graph;
  /**
   * <zh/> 重做上一步操作
   *
   * <en/> Redo
   */
  redo: () => Graph;
  /**
   * <zh/> 获取撤销栈
   *
   * <en/> Get undo stack
   */
  getUndoStack: () => Command[];
  /**
   * <zh/> 获取重做栈
   *
   * <en/> Get redo stack
   */
  getRedoStack: () => Command[];
  /**
   * <zh/> 清空历史记录
   *
   * <en/> Clean history
   */
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
