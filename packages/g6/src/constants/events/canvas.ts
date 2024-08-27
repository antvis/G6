/**
 * <zh/> 画布事件
 *
 * <en/> Canvas event
 */
export enum CanvasEvent {
  /**
   * <zh/> 点击时触发
   *
   * <en/> Triggered when click
   */
  CLICK = 'canvas:click',
  /**
   * <zh/> 双击时触发
   *
   * <en/> Triggered when double click
   */
  DBLCLICK = 'canvas:dblclick',
  /**
   * <zh/> 指针移入时触发
   *
   * <en/> Triggered when the pointer enters
   */
  POINTER_OVER = 'canvas:pointerover',
  /**
   * <zh/> 指针移出时触发
   *
   * <en/> Triggered when the pointer leaves
   */
  POINTER_LEAVE = 'canvas:pointerleave',
  /**
   * <zh/> 指针移入时或移入子元素时触发（不会冒泡）
   *
   * <en/> Triggered when the pointer enters or enters a child element (does not bubble)
   */
  POINTER_ENTER = 'canvas:pointerenter',
  /**
   * <zh/> 指针移动时触发
   *
   * <en/> Triggered when the pointer moves
   */
  POINTER_MOVE = 'canvas:pointermove',
  /**
   * <zh/> 指针移出时触发
   *
   * <en/> Triggered when the pointer leaves
   */
  POINTER_OUT = 'canvas:pointerout',
  /**
   * <zh/> 指针按下时触发
   *
   * <en/> Triggered when the pointer is pressed
   */
  POINTER_DOWN = 'canvas:pointerdown',
  /**
   * <zh/> 指针抬起时触发
   *
   * <en/> Triggered when the pointer is lifted
   */
  POINTER_UP = 'canvas:pointerup',
  /**
   * <zh/> 打开上下文菜单时触发
   *
   * <en/> Triggered when the context menu is opened
   */
  CONTEXT_MENU = 'canvas:contextmenu',
  /**
   * <zh/> 开始拖拽时触发
   *
   * <en/> Triggered when dragging starts
   */
  DRAG_START = 'canvas:dragstart',
  /**
   * <zh/> 拖拽过程中触发
   *
   * <en/> Triggered when dragging
   */
  DRAG = 'canvas:drag',
  /**
   * <zh/> 拖拽结束时触发
   *
   * <en/> Triggered when dragging ends
   */
  DRAG_END = 'canvas:dragend',
  /**
   * <zh/> 拖拽进入时触发
   *
   * <en/> Triggered when dragging enters
   */
  DRAG_ENTER = 'canvas:dragenter',
  /**
   * <zh/> 拖拽经过时触发
   *
   * <en/> Triggered when dragging passes
   */
  DRAG_OVER = 'canvas:dragover',
  /**
   * <zh/> 拖拽离开时触发
   *
   * <en/> Triggered when dragging leaves
   */
  DRAG_LEAVE = 'canvas:dragleave',
  /**
   * <zh/> 拖拽放下时触发
   *
   * <en/> Triggered when dragging is dropped
   */
  DROP = 'canvas:drop',
  /**
   * <zh/> 滚动时触发
   *
   * <en/> Triggered when scrolling
   */
  WHEEL = 'canvas:wheel',
}
