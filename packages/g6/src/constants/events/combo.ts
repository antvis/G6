/**
 * <zh/> 组合事件
 *
 * <en/> Combo event
 */
export enum ComboEvent {
  /**
   * <zh/> 点击时触发
   *
   * <en/> Triggered when click
   */
  CLICK = 'combo:click',
  /**
   * <zh/> 双击时触发
   *
   * <en/> Triggered when double click
   */
  DBLCLICK = 'combo:dblclick',
  /**
   * <zh/> 指针移入时触发
   *
   * <en/> Triggered when the pointer enters
   */
  POINTER_OVER = 'combo:pointerover',
  /**
   * <zh/> 指针移出时触发
   *
   * <en/> Triggered when the pointer leaves
   */
  POINTER_LEAVE = 'combo:pointerleave',
  /**
   * <zh/> 指针移入时或移入子元素时触发（不会冒泡）
   *
   * <en/> Triggered when the pointer enters or enters a child element (does not bubble)
   */
  POINTER_ENTER = 'combo:pointerenter',
  /**
   * <zh/> 指针移动时触发
   *
   * <en/> Triggered when the pointer moves
   */
  POINTER_MOVE = 'combo:pointermove',
  /**
   * <zh/> 指针移出时触发
   *
   * <en/> Triggered when the pointer leaves
   */
  POINTER_OUT = 'combo:pointerout',
  /**
   * <zh/> 指针按下时触发
   *
   * <en/> Triggered when the pointer is pressed
   */
  POINTER_DOWN = 'combo:pointerdown',
  /**
   * <zh/> 指针抬起时触发
   *
   * <en/> Triggered when the pointer is lifted
   */
  POINTER_UP = 'combo:pointerup',
  /**
   * <zh/> 打开上下文菜单时触发
   *
   * <en/> Triggered when the context menu is opened
   */
  CONTEXT_MENU = 'combo:contextmenu',
  /**
   * <zh/> 开始拖拽时触发
   *
   * <en/> Triggered when dragging starts
   */
  DRAG_START = 'combo:dragstart',
  /**
   * <zh/> 拖拽过程中触发
   *
   * <en/> Triggered when dragging
   */
  DRAG = 'combo:drag',
  /**
   * <zh/> 拖拽结束时触发
   *
   * <en/> Triggered when dragging ends
   */
  DRAG_END = 'combo:dragend',
  /**
   * <zh/> 拖拽进入时触发
   *
   * <en/> Triggered when dragging enters
   */
  DRAG_ENTER = 'combo:dragenter',
  /**
   * <zh/> 拖拽经过时触发
   *
   * <en/> Triggered when dragging passes
   */
  DRAG_OVER = 'combo:dragover',
  /**
   * <zh/> 拖拽离开时触发
   *
   * <en/> Triggered when dragging leaves
   */
  DRAG_LEAVE = 'combo:dragleave',
  /**
   * <zh/> 拖拽放下时触发
   *
   * <en/> Triggered when dragging is dropped
   */
  DROP = 'combo:drop',
}
