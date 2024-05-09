export enum HistoryEvent {
  /**
   * <zh/> 当命令被撤销时
   *
   * <en/> When the command is undone
   */
  UNDO = 'undo',
  /**
   * <zh/> 当命令被重做时
   *
   * <en/> When the command is redone
   */
  REDO = 'redo',
  /**
   * <zh/> 当命令被取消时
   *
   * <en/> When the command is canceled
   */
  CANCEL = 'cancel',
  /**
   *  <zh/> 当命令被添加到队列时
   *
   *  <en/> When the command is added
   */
  ADD = 'add',
  /**
   * <zh/> 当历史队列被清空时
   *
   *  <en/> When the command queue is cleared
   */
  CLEAR = 'clear',
  /**
   * <zh/> 当历史队列发生变化时
   *
   * <en/> When the command queue changes
   */
  CHANGE = 'change',
}
