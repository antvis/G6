import type { IGraph } from 'types';
import { each, isEmpty } from '@antv/util';
import { STACK_TYPE, StackCfg, StackType } from '../../../types/history';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import CommandFactory, { Command } from './command';

export interface HistoryConfig extends IPluginBaseConfig {
  enableStack?: boolean;
  stackCfg: StackCfg;
}

const apiMap = {
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
  stateChange: ['setItemState', 'clearItemState'],
  layerChange: ['frontItem', 'backItem'],
  displayChange: ['showItem', 'hideItem'],
};

/**
 * Retrieve the category of a given API based on its name.
 * @param apiName name of API
 */
export const getCategoryByApiName = (apiName): keyof typeof apiName => {
  for (const [categoryKey, apiList] of Object.entries(apiMap)) {
    if (apiList.includes(apiName)) {
      return categoryKey as keyof typeof apiName;
    }
  }
  throw new Error(`Unknown apiName: ${apiName}. Unable to determine category.`);
};

class HistoryStack<T> {
  private items: T[];
  private maxStep: number;

  constructor(maxStep = 0) {
    this.items = [];
    this.maxStep = maxStep;
  }

  public push(item: T): void {
    if (this.maxStep !== 0 && this.items.length === this.maxStep) {
      this.items.shift();
    }
    this.items.push(item);
  }

  public pop(): T {
    if (this.items.length !== 0) {
      return this.items.pop();
    }
    throw new Error('Stack is empty');
  }

  public size(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }

  public toArray(): T[] {
    return this.items;
  }
}

export default class History extends Base {
  public readonly cfg: StackCfg;
  public readonly enableStack: boolean;
  protected undoStack: HistoryStack<Command[]>;
  protected redoStack: HistoryStack<Command[]>;
  protected stackSize = 0;
  protected isBatching: boolean;
  protected batchCommands: Command[];

  constructor(options?: HistoryConfig) {
    super();
    const { enableStack, stackCfg } = options;
    this.enableStack = enableStack;
    this.cfg = stackCfg;
    this.isBatching = false;
    this.undoStack = new HistoryStack(this.cfg.stackSize);
    this.redoStack = new HistoryStack(this.cfg.stackSize);
    this.initBatchCommands();
  }

  public init(graph: IGraph) {
    super.init(graph);
    this.clear();
  }

  public getUndoStack(): Command[][] {
    return this.undoStack.toArray();
  }

  public getRedoStack(): Command[][] {
    return this.redoStack.toArray();
  }

  public getStack(): Record<string, Command[][]> {
    return {
      redoStack: this.getRedoStack(),
      undoStack: this.getUndoStack(),
    };
  }

  public clear() {
    this.clearUndoStack();
    this.clearRedoStack();
  }

  public clearUndoStack() {
    this.undoStack.clear();
  }

  public clearRedoStack() {
    this.redoStack.clear();
  }

  public isEnable() {
    return this.enableStack;
  }

  public push(cmd: Command[], stackType: StackType = STACK_TYPE.undo) {
    if (stackType === STACK_TYPE.undo) {
      // Clear the redo stack when a new action is performed to maintain state consistency
      this.clearRedoStack();
      if (isEmpty(cmd)) return;
      this.undoStack.push(cmd);
      this.initBatchCommands();
    } else {
      this.redoStack.push(cmd);
    }
  }

  public undo() {
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

  public redo() {
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
    return this.isEnable() && this.undoStack.size() > 0;
  }

  public canRedo() {
    return this.isEnable() && this.redoStack.size() > 0;
  }

  private initBatchCommands() {
    this.batchCommands = [];
  }

  /**
   * Begin a batch operation.
   * Any operations performed between `startBatch` and `stopBatch` are grouped together.
   * treated as a single operation when undoing or redoing.
   */
  public startBatch() {
    if (this.isBatching) {
      throw new Error(
        'Ensure that batch processing is stopped before starting.',
      );
    }
    this.initBatchCommands();
    this.isBatching = true;
  }

  /**
   * End a batch operation.
   * Any operations performed between `startBatch` and `stopBatch` are grouped together.
   * treated as a single operation when undoing or redoing.
   */
  public stopBatch() {
    if (!this.isBatching) {
      throw new Error(
        'Ensure that batch processing is started before stopping.',
      );
    }
    this.push(this.batchCommands);
    this.isBatching = false;
  }

  /**
   * Execute the provided function in a batch mode
   * @param callback
   */
  public batch(callback) {
    this.startBatch();
    // try {
    callback();
    // } finally {
    this.stopBatch();
    // }
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

  public notify(graph, eventName, ...data) {
    graph.emit(eventName, data);
  }
}
