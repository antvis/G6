export enum EdgeEvent {
  /**
   * <zh/> 点击时触发
   *
   * <en/> Triggered when click
   */
  CLICK = 'click',
  /**
   * <zh/> 双击时触发
   *
   * <en/> Triggered when double click
   */
  DBLCLICK = 'dblclick',
  /**
   * <zh/> 指针移入时触发
   *
   * <en/> Triggered when the pointer enters
   */
  POINTER_OVER = 'pointerover',
  /**
   * <zh/> 指针移出时触发
   *
   * <en/> Triggered when the pointer leaves
   */
  POINTER_LEAVE = 'pointerleave',
  /**
   * <zh/> 指针移入时或移入子元素时触发（不会冒泡）
   *
   * <en/> Triggered when the pointer enters or enters a child element (does not bubble)
   */
  POINTER_ENTER = 'pointerenter',
  /**
   * <zh/> 指针移动时触发
   *
   * <en/> Triggered when the pointer moves
   */
  POINTER_MOVE = 'pointermove',
  /**
   * <zh/> 指针移出时触发
   *
   * <en/> Triggered when the pointer leaves
   */
  POINTER_OUT = 'pointerout',
  /**
   * <zh/> 指针按下时触发
   *
   * <en/> Triggered when the pointer is pressed
   */
  POINTER_DOWN = 'pointerdown',
  /**
   * <zh/> 指针抬起时触发
   *
   * <en/> Triggered when the pointer is lifted
   */
  POINTER_UP = 'pointerup',
  /**
   * <zh/> 打开上下文菜单时触发
   *
   * <en/> Triggered when the context menu is opened
   */
  CONTEXT_MENU = 'contextmenu',
  /**
   * <zh/> 拖拽进入时触发
   *
   * <en/> Triggered when dragging enters
   */
  DRAG_ENTER = 'dragenter',
  /**
   * <zh/> 拖拽经过时触发
   *
   * <en/> Triggered when dragging passes
   */
  DRAG_OVER = 'dragover',
  /**
   * <zh/> 拖拽离开时触发
   *
   * <en/> Triggered when dragging leaves
   */
  DRAG_LEAVE = 'dragleave',
  /**
   * <zh/> 拖拽放下时触发
   *
   * <en/> Triggered when dragging is dropped
   */
  DROP = 'drop',
}
