import type { IGraph } from 'types';
import { each, isEmpty } from '@antv/util';
import { StackCfg } from '../../../types/history';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import CommandFactory, { Command } from './command';

export interface HistoryConfig extends IPluginBaseConfig {
  /** Default to true */
  enableStack?: boolean;
  // /** Default to 0 stands no limit */
  stackCfg: StackCfg;
}

const categories = {
  add: ['addData', 'addCombo'],
  remove: ['removeData'],
  update: [
    'updateData',
    'updateNodePosition',
    'updateComboPosition',
    'updatePosition',
    'moveCombo',
    'collapseCombo',
    'expandCombo',
  ],
  stateChange: ['setItemStates', 'setItemState', 'clearItemState'],
  layerChange: ['frontItem', 'backItem'],
  displayChange: ['showItem', 'hideItem'],
};

/**
 * Retrieve the category of a given API based on its name.
 * @param apiName name of API
 */
export const getCategoryByApiName = (apiName): keyof typeof categories => {
  for (const [categoryKey, apiList] of Object.entries(categories)) {
    if (apiList.includes(apiName)) {
      return categoryKey as keyof typeof categories;
    }
  }
  throw new Error(`Unknown apiName: ${apiName}. Unable to determine category.`);
};

export default class History extends Base {
  public readonly cfg: Partial<HistoryConfig>;
  protected undoStack: Command[][] = [];
  protected redoStack: Command[][] = [];
  protected stackSize = 0;
  protected isBatching: boolean;
  protected batchCommands: Command[];

  constructor(options?: HistoryConfig) {
    super();
    const { enableStack, stackCfg } = options;
    this.cfg = { enableStack, ...stackCfg };
    this.isBatching = false;
    this.initBatchCommands();
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
    if (isEmpty(cmd)) return;
    this.undoStack.push(cmd);
    this.initBatchCommands();
  }

  public undo(steps = 1) {
    if (this.isEnable()) {
      const cmds = this.undoStack.pop();

      if (cmds) {
        this.redoStack.push(cmds);
        for (let i = cmds.length - 1; i >= 0; i--) {
          cmds[i].undo(this.graph);
        }
      }
    }
    return this;
  }

  public redo(steps = 1) {
    if (this.isEnable()) {
      const cmds = this.redoStack.pop();

      if (cmds) {
        this.undoStack.push(cmds);
        each(cmds, (cmd) => cmd.redo(this.graph));
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

  private initBatchCommands() {
    this.batchCommands = [];
  }

  public startBatch() {
    if (this.isBatching) {
      throw new Error(
        'Ensure that batch processing is stopped before starting.',
      );
    }
    this.initBatchCommands();
    this.isBatching = true;
  }

  public stopBatch() {
    if (!this.isBatching) {
      throw new Error(
        'Ensure that batch processing is started before stopping.',
      );
    }
    this.push(this.batchCommands);
    this.isBatching = false;
  }

  public getEvents() {
    return {
      afteritemchange: this.handleUpdateHistory,
      afteritemzindexchange: this.handleUpdateHistory,
      afteritemstatechange: this.handleUpdateHistory,
      afteritemvisibilitychange: this.handleUpdateHistory,
      aftercollapsecombo: this.handleUpdateHistory,
      afterexpandcombo: this.handleUpdateHistory,
    };
  }

  private handleUpdateHistory(props) {
    const { enableStack, changes } = props;
    if (changes && changes.length === 0) return;
    if (enableStack) {
      this.batchCommands = [
        ...this.batchCommands,
        ...CommandFactory.create(props),
      ];
      if (this.isBatching) {
        return;
      }
      this.push(this.batchCommands);
    }
  }
}
