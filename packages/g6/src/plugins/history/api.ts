import { Graph } from '@/src';

declare module '@/src' {
  interface Graph {
    canUndo(): boolean;
    canRedo(): boolean;
    undo(): void;
    undoAndCancel(): void;
    redo(): void;
    getUndoStack(): void;
    getRedoStack(): void;
  }
}

const HISTORY_KEY = 'plugin-history-0';

Graph.prototype.canUndo = function () {
  const history = this.context.plugin.extensionMap[HISTORY_KEY];
  if (history) {
    return history.canUndo();
  }
  return false;
};

Graph.prototype.canRedo = function () {
  const history = this.context.plugin.extensionMap[HISTORY_KEY];
  if (history) {
    return history.canRedo();
  }
  return false;
};

Graph.prototype.undo = function () {
  const history = this.context.plugin.extensionMap[HISTORY_KEY];
  if (history) {
    history.undo();
  }
};

Graph.prototype.undoAndCancel = function () {};

Graph.prototype.redo = function () {
  const history = this.context.plugin.extensionMap[HISTORY_KEY];
  if (history) {
    history.redo();
  }
};

Graph.prototype.getUndoStack = function () {};

Graph.prototype.getRedoStack = function () {};
