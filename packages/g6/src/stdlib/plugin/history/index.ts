import { deepMix, each, isEmpty, upperFirst } from '@antv/util';
import type { IGraph } from 'types';
import { STACK_TYPE, StackCfg, StackType } from '../../../types/history';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import CommandFactory, { Command } from './command';

/**
 * The `HistoryConfig` interface contains the following properties:
 *
 * - `enableStack`: An optional boolean value that indicates whether to enable the stack.
 * - `stackCfg`: A required object of type `StackCfg` representing the stack configuration.
 *
 * The `StackCfg` type is defined as an object with the following properties:
 *
 * - `stackSize`: An optional number representing the size of the stack.
 * - `stackActive`: An optional boolean value indicating whether the stack is active. If active, operations can be pushed onto the stack; otherwise, they cannot.
 * - `excludes`: An optional array of strings representing APIs that should be excluded from being put on the stack, even if their operation type is not ignored.
 * - `includes`: An optional array of strings representing APIs that should be included in being put on the stack.
 * - `ignoreAdd`: An optional boolean value indicating whether to ignore add operations.
 * - `ignoreRemove`: An optional boolean value indicating whether to ignore remove operations.
 * - `ignoreUpdate`: An optional boolean value indicating whether to ignore update operations.
 * - `ignoreStateChange`: An optional boolean value indicating whether to ignore state change operations.
 * - `ignoreLayerChange`: An optional boolean value indicating whether to ignore layer change operations.
 * - `ignoreDisplayChange`: An optional boolean value indicating whether to ignore display change operations.
 *
 */
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

export class History extends Base {
  public readonly cfg: StackCfg;
  public readonly enableStack: boolean;
  protected undoStack: HistoryStack<Command[]>;
  protected redoStack: HistoryStack<Command[]>;
  protected stackSize = 0;
  protected stackActive = true;
  protected withoutStackingCounter = 0;
  protected isBatching: boolean;
  protected batchCommands: Command[];

  constructor(options?: HistoryConfig) {
    super();
    const { enableStack, stackCfg } = deepMix(this.getDefaultCfgs(), options);
    this.enableStack = enableStack;
    this.cfg = stackCfg;
    this.isBatching = false;
    this.undoStack = new HistoryStack(this.cfg.stackSize);
    this.redoStack = new HistoryStack(this.cfg.stackSize);
    this.initBatchCommands();
  }

  public getDefaultCfgs(): HistoryConfig {
    return {
      enableStack: true,
      stackCfg: {
        stackSize: 0,
        stackActive: true,
        includes: [],
        excludes: [],
        ignoreAdd: false,
        ignoreRemove: false,
        ignoreUpdate: false,
        ignoreStateChange: false,
        ignoreLayerChange: false,
        ignoreDisplayChange: false,
      },
    };
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

  public push(cmd: Command[], stackType: StackType = STACK_TYPE.undo, isNew = true) {
    if (this.stackActive) {
      if (stackType === STACK_TYPE.undo) {
        if (isNew) {
          // Clear the redo stack when a new action is performed to maintain state consistency
          this.clearRedoStack();
        }
        if (isEmpty(cmd)) return;
        this.undoStack.push(cmd);
        this.initBatchCommands();
      } else {
        this.redoStack.push(cmd);
      }
      this.graph.emit('history:change', cmd, stackType, isNew);
    } else {
      console.error('Stacking operations are currently paused. Unable to push to the stack.');
    }
  }

  /**
   * Pause stacking operations.
   */
  pauseStack(): void {
    this.withoutStackingCounter++;

    if (this.withoutStackingCounter === 1) {
      // Only disable on the first call
      this.stackActive = false;
    }
  }

  /**
   * Resume stacking operations.
   */
  resumeStack(): void {
    if (this.withoutStackingCounter > 0) {
      this.withoutStackingCounter--;
    }

    if (this.withoutStackingCounter === 0) {
      // Only enable when all pause requests are cleared
      this.stackActive = true;
    }
  }

  public undo() {
    if (this.isEnable()) {
      const cmds = this.undoStack.pop();
      if (cmds) {
        this.push(cmds, STACK_TYPE.redo, false);
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
        this.push(cmds, STACK_TYPE.undo, false);
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
   * Begin a historyBatch operation.
   * Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
   * treated as a single operation when undoing or redoing.
   */
  public startHistoryBatch() {
    if (this.isBatching) {
      throw new Error('Ensure that historyBatch processing is stopped before starting.');
    }
    this.initBatchCommands();
    this.isBatching = true;
  }

  /**
   * End a historyBatch operation.
   * Any operations performed between `startHistoryBatch` and `stopHistoryBatch` are grouped together.
   * treated as a single operation when undoing or redoing.
   */
  public stopHistoryBatch() {
    if (!this.isBatching) {
      throw new Error('Ensure that historyBatch processing is started before stopping.');
    }
    this.push(this.batchCommands);
    this.isBatching = false;
  }

  /**
   * Execute the provided function in a historyBatch mode
   * @param callback
   */
  public historyBatch(callback) {
    this.startHistoryBatch();
    callback();
    this.stopHistoryBatch();
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
    const { apiName, changes } = props;
    if (changes && changes.length === 0) return;
    if (this.shouldPushToStack(apiName)) {
      this.batchCommands = [...this.batchCommands, ...CommandFactory.create(props)];
      if (this.isBatching) {
        return;
      }
      this.push(this.batchCommands);
    }
  }

  /**
   * Determine if a given operation should be pushed onto the history stack based on various configurations.
   * @param apiName name of the API operation.
   */
  private shouldPushToStack(apiName: string): boolean {
    const { includes = [], excludes = [] } = this.cfg;
    if (!this.enableStack || !this.stackActive) return false;
    if (includes.includes(apiName)) return true;
    if (excludes.includes(apiName)) return false;
    let categoryKey: any = getCategoryByApiName(apiName);
    if (!categoryKey) return true;
    categoryKey = 'ignore' + upperFirst(categoryKey);
    return !this.cfg[categoryKey];
  }

  public notify(graph, eventName, ...data) {
    graph.emit(eventName, data);
  }
}
