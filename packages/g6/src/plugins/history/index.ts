import type { BasePluginOptions } from '..';
import { BasePlugin } from '..';
import { GraphEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import { DataChange } from '../../types';
import type { BatchEvent, GraphLifeCycleEvent } from '../../utils/event';
import { idsOf } from '../../utils/id';
import './api';
import type { Command } from './utils';
import { parseCommand } from './utils';

export interface HistoryOptions extends BasePluginOptions {
  /**
   * <zh/> 插件是否可用。默认为 `true`
   */
  enable?: boolean;
  /**
   * <zh/>  最多记录该数据长度的历史记录，默认为 0 表示不做限制
   */
  stackSize?: number;
  /**
   * <zh/> 当一个命令被添加到 Undo/Redo 队列前被调用，如果该方法返回 false，那么这个命令将不会被添加到队列中。revert 为 true 时表示撤销操作，为 false 时表示重做操作
   *
   * <en/> Called before a command is added to the Undo/Redo queue. If this method returns false, the command will not be added to the queue. revert is true for undo operations and false for redo operations
   */
  beforeAddCommand?: (cmd: Command, revert?: boolean) => boolean | void;
  /**
   * <zh/> 当一个命令被添加到 Undo/Redo 队列后被调用。revert 为 true 时表示撤销操作，为 false 时表示重做操作
   *
   * <en/> Called after a command is added to the Undo/Redo queue. revert is true for undo operations and false for redo operations
   */
  afterAddCommand?: (cmd: Command, revert?: boolean) => void;
  /**
   * <zh/> 执行命令时的回调函数
   *
   * <en/> Callback function when executing a command
   */
  executeCommand?: (cmd: Command) => void;
}

export class History extends BasePlugin<HistoryOptions> {
  static singleton = true;

  static defaultOptions: Partial<HistoryOptions> = {
    enable: true,
    stackSize: 0,
  };

  private batchChanges: DataChange[][] | null = null;
  private batchAnimation = false;
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private isFirstDraw = true;
  private freezed = false;

  constructor(context: RuntimeContext, options: HistoryOptions) {
    super(context, Object.assign({}, History.defaultOptions, options));

    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_DRAW, this.addCommand);
    graph.on(GraphEvent.BATCH_START, this.initBatchCommand);
    graph.on(GraphEvent.BATCH_END, this.addCommand);
  }

  public canUndo = () => this.undoStack.length > 0;

  public canRedo = () => this.redoStack.length > 0;

  public undo = () => {
    const cmd = this.undoStack.pop();
    if (cmd) {
      this.executeCommand(cmd);
      this.options.beforeAddCommand?.(cmd, false);
      this.redoStack.push(cmd);
      this.options.afterAddCommand?.(cmd, false);
    }
    return this;
  };

  public redo = () => {
    const cmd = this.redoStack.pop();
    if (cmd) {
      this.executeCommand(cmd, false);
      this.undoStackPush(cmd);
    }
    return this;
  };

  protected executeCommand = (cmd: Command, revert = true) => {
    this.freezed = true;

    this.options.executeCommand?.(cmd);

    const values = revert ? cmd.original : cmd.current;
    this.context.graph.addData(values.add);
    this.context.graph.updateData(values.update);
    this.context.graph.removeData(idsOf(values.remove, false));
    this.context.element?.draw({ silence: true, animation: cmd.animation });

    this.freezed = false;
  };

  private addCommand = (event: GraphLifeCycleEvent | BatchEvent) => {
    if (this.isFirstDraw) {
      this.isFirstDraw = false;
      return;
    }

    if (this.freezed) return;

    if (event.type === GraphEvent.AFTER_DRAW) {
      const { data = [], animation = true } = event as GraphLifeCycleEvent;

      if (this.context.batch?.isBatching) {
        if (!this.batchChanges) return;
        this.batchChanges.push(data);
        this.batchAnimation &&= animation;
        return;
      }
      this.batchChanges = [data];
      this.batchAnimation = animation;
    }

    this.undoStackPush(parseCommand(this.batchChanges!.flat(), this.batchAnimation));
  };

  private initBatchCommand = (event: BatchEvent) => {
    const { initiate } = event;
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

    this.options.beforeAddCommand?.(cmd, true);
    this.undoStack.push(cmd);
    this.options.afterAddCommand?.(cmd, true);
  }

  public clean(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.batchChanges = null;
    this.batchAnimation = false;
  }

  public destroy(): void {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_DRAW, this.addCommand);
    graph.off(GraphEvent.BATCH_START, this.initBatchCommand);
    graph.off(GraphEvent.BATCH_END, this.addCommand);

    super.destroy();

    // @ts-expect-error force delete
    delete this.undoStack;
    // @ts-expect-error force delete
    delete this.redoStack;
  }
}
