import EventEmitter from '@antv/event-emitter';
import { GraphEvent } from '../../constants';
import { HistoryEvent } from '../../constants/events/history';
import type { RuntimeContext } from '../../runtime/types';
import { DataChange, Loosen } from '../../types';
import type { Command } from '../../types/history';
import type { GraphLifeCycleEvent } from '../../utils/event';
import { idsOf } from '../../utils/id';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { parseCommand } from './util';

/**
 * <zh/> 历史记录配置项
 *
 * <en/> History options
 */
export interface HistoryOptions extends BasePluginOptions {
  /**
   * <zh/>  最多记录该数据长度的历史记录
   *
   * <en/> The maximum number of history records
   * @defaultValue 0(不做限制)
   */
  stackSize?: number;
  /**
   * <zh/> 当一个命令被添加到 Undo/Redo 队列前被调用，如果该方法返回 false，那么这个命令将不会被添加到队列中。revert 为 true 时表示撤销操作，为 false 时表示重做操作
   *
   * <en/> Called before a command is added to the Undo/Redo queue. If this method returns false, the command will not be added to the queue. revert is true for undo operations and false for redo operations
   */
  beforeAddCommand?: (cmd: Command, revert: boolean) => boolean | void;
  /**
   * <zh/> 当一个命令被添加到 Undo/Redo 队列后被调用。revert 为 true 时表示撤销操作，为 false 时表示重做操作
   *
   * <en/> Called after a command is added to the Undo/Redo queue. revert is true for undo operations and false for redo operations
   */
  afterAddCommand?: (cmd: Command, revert: boolean) => void;
  /**
   * <zh/> 执行命令时的回调函数
   *
   * <en/> Callback function when executing a command
   */
  executeCommand?: (cmd: Command) => void;
}

/**
 * <zh/> 历史记录
 *
 * <en/> History
 * @remarks
 * <zh/> 历史记录用于记录图的数据变化，支持撤销和重做等操作。
 *
 * <en/> History is used to record data changes in the graph and supports operations such as undo and redo.
 */
export class History extends BasePlugin<HistoryOptions> {
  static defaultOptions: Partial<HistoryOptions> = {
    stackSize: 0,
  };
  private emitter: EventEmitter;
  private batchChanges: DataChange[][] | null = null;
  private batchAnimation = false;
  public undoStack: Command[] = [];
  public redoStack: Command[] = [];
  private freezed = false;

  constructor(context: RuntimeContext, options: HistoryOptions) {
    super(context, Object.assign({}, History.defaultOptions, options));

    this.emitter = new EventEmitter();

    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_DRAW, this.addCommand);
    graph.on(GraphEvent.BATCH_START, this.initBatchCommand);
    graph.on(GraphEvent.BATCH_END, this.addCommand);
  }

  /**
   * <zh/> 是否可以执行撤销操作
   *
   * <en/> Whether undo can be done
   * @returns <zh/> 是否可以执行撤销操作 | <en/> Whether undo can be done
   */
  public canUndo() {
    return this.undoStack.length > 0;
  }

  /**
   * <zh/> 是否可以执行重做操作
   *
   * <en/> Whether redo can be done
   * @returns <zh/> 是否可以执行重做操作 | <en/> Whether redo can be done
   */
  public canRedo() {
    return this.redoStack.length > 0;
  }

  /**
   * <zh/> 执行撤销
   *
   * <en/> Execute undo
   * @returns <zh/> 返回当前实例 | <en/> Return the current instance
   */
  public undo() {
    const cmd = this.undoStack.pop();
    if (cmd) {
      this.executeCommand(cmd);

      const before = this.options.beforeAddCommand?.(cmd, false);
      if (before === false) return;

      this.redoStack.push(cmd);
      this.options.afterAddCommand?.(cmd, false);
      this.notify(HistoryEvent.UNDO, cmd);
    }
    return this;
  }

  /**
   * <zh/> 执行重做
   *
   * <en/> Execute redo
   * @returns <zh/> 返回当前实例 | <en/> Return the current instance
   */
  public redo() {
    const cmd = this.redoStack.pop();
    if (cmd) {
      this.executeCommand(cmd, false);
      this.undoStackPush(cmd);
      this.notify(HistoryEvent.REDO, cmd);
    }
    return this;
  }

  /**
   * <zh/> 执行撤销且不计入历史记录
   *
   * <en/> Execute undo and do not record in history
   * @returns <zh/> 返回当前实例 | <en/> Return the current instance
   */
  public undoAndCancel() {
    const cmd = this.undoStack.pop();
    if (cmd) {
      this.executeCommand(cmd, false);
      this.redoStack = [];
      this.notify(HistoryEvent.CANCEL, cmd);
    }
    return this;
  }

  private executeCommand = (cmd: Command, revert = true) => {
    this.freezed = true;

    this.options.executeCommand?.(cmd);

    const values = revert ? cmd.original : cmd.current;
    this.context.graph.addData(values.add);
    this.context.graph.updateData(values.update);
    this.context.graph.removeData(idsOf(values.remove, false));
    this.context.element?.draw({ silence: true, animation: cmd.animation });

    this.freezed = false;
  };

  private addCommand = (event: GraphLifeCycleEvent) => {
    if (this.freezed) return;

    if (event.type === GraphEvent.AFTER_DRAW) {
      const { dataChanges = [], animation = true } = (event as GraphLifeCycleEvent).data;

      if (this.context.batch?.isBatching) {
        if (!this.batchChanges) return;
        this.batchChanges.push(dataChanges);
        this.batchAnimation &&= animation;
        return;
      }
      this.batchChanges = [dataChanges];
      this.batchAnimation = animation;
    }

    this.undoStackPush(parseCommand(this.batchChanges!.flat(), this.batchAnimation, this.context));
    this.notify(HistoryEvent.ADD, this.undoStack[this.undoStack.length - 1]);
  };

  private initBatchCommand = (event: GraphLifeCycleEvent) => {
    const { initiate } = event.data;
    this.batchAnimation = false;
    if (initiate) {
      this.batchChanges = [];
    } else {
      const cmd = this.undoStack.pop();
      if (!cmd) this.batchChanges = null;
    }
  };

  private undoStackPush(cmd: Command): void {
    const { stackSize } = this.options;

    if (stackSize !== 0 && this.undoStack.length >= stackSize) {
      this.undoStack.shift();
    }

    const before = this.options.beforeAddCommand?.(cmd, true);
    if (before === false) return;

    this.undoStack.push(cmd);
    this.options.afterAddCommand?.(cmd, true);
  }

  /**
   * <zh/> 清空历史记录
   *
   * <en/> Clear history
   */
  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.batchChanges = null;
    this.batchAnimation = false;
    this.notify(HistoryEvent.CLEAR, null);
  }

  private notify(event: Loosen<HistoryEvent>, cmd: Command | null) {
    this.emitter.emit(event, { cmd });
    this.emitter.emit(HistoryEvent.CHANGE, { cmd });
  }

  /**
   * <zh/> 监听历史记录事件
   *
   * <en/> Listen to history events
   * @param event  - <zh/> 事件名称 | <en/> Event name
   * @param handler - <zh/> 事件处理函数 | <en/> Event handler
   */
  public on(event: Loosen<HistoryEvent>, handler: (e: { cmd?: Command | null }) => void): void {
    this.emitter.on(event, handler);
  }

  /**
   * <zh/> 销毁
   *
   * <en/> Destroy
   * @internal
   */
  public destroy(): void {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_DRAW, this.addCommand);
    graph.off(GraphEvent.BATCH_START, this.initBatchCommand);
    graph.off(GraphEvent.BATCH_END, this.addCommand);

    this.emitter.off();

    super.destroy();
    this.undoStack = [];
    this.redoStack = [];
  }
}
