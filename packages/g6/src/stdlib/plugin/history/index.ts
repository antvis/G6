import type { IGraph } from 'types';
import { each, mix } from '@antv/util';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { Command } from './command';

export interface HistoryConfig extends IPluginBaseConfig {
  /** Default to true */
  enableStack?: boolean;
  /** Default to 0 stands no limit */
  stackSize?: number;
}

export default class History extends Base {
  public readonly cfg: Partial<HistoryConfig>;
  protected undoStack: Command[][] = []; // support batch
  protected redoStack: Command[][] = [];
  protected stackSize = 0;

  constructor(options?: HistoryConfig) {
    super();
    this.cfg = mix({}, this.getDefaultCfgs(), options.cfg);
  }

  public getDefaultCfgs(): HistoryConfig {
    return {
      enableStack: true,
      stackSize: 0, // 0: not limit
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
    this.clean();
  }

  public clean() {
    this.cleanUndoStack();
    this.cleanRedoStack();
    return this;
  }

  public cleanUndoStack() {
    this.undoStack = [];
  }

  public cleanRedoStack() {
    this.redoStack = [];
  }

  public isEnable() {
    return this.cfg.enableStack;
  }

  public push(cmd: Command[]) {
    // Clear the redo stack when a new action is performed to maintain state consistency
    this.cleanRedoStack();
    this.undoStack.push(cmd);
  }

  public undo(steps = 1) {
    if (this.isEnable()) {
      const cmds = this.undoStack.pop();
      if (cmds) {
        this.redoStack.push(cmds);
        each(cmds, (cmd) => cmd.undo(this.graph));
      }
    }
    return this;
  }

  public redo(steps = 1) {
    if (this.isEnable()) {
      const cmds = this.redoStack.pop();
      if (cmds) {
        this.undoStack.push(cmds);
        for (let i = cmds.length - 1; i >= 0; i--) {
          cmds[i].redo(this.graph);
        }
      }
    }
    return this;
  }

  public canUndo() {
    return this.isEnable() && this.undoStack.length > 0;
  }

  public canRedo() {
    return this.isEnable() && this.redoStack.length > 0;
  }
}
