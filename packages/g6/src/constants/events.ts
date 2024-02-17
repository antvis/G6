export const enum GraphEvent {
  /** <zh/> 开始视口动画 | <en/> Start the viewport animation */
  BEFORE_VIEWPORT_ANIMATION = 'beforeviewportanimation',
  /** <zh/> 结束视口动画 | <en/> End the viewport animation */
  AFTER_VIEWPORT_ANIMATION = 'afterviewportanimation',
  /** <zh/> 停止视口动画 | <en/> Stop the viewport animation */
  CANCEL_VIEWPORT_ANIMATION = 'cancelviewportanimation',
  /** <zh/> 开始创建元素 | <en/> Start creating element */
  BEFORE_CREATE_ELEMENT = 'beforecreateelement',
  /** <zh/> 结束创建元素 | <en/> End creating element */
  AFTER_CREATE_ELEMENT = 'aftercreateelement',
  /** <zh/> 开始更新元素 | <en/> Start updating element */
  BEFORE_UPDATE_ELEMENT = 'beforeupdateelement',
  /** <zh/> 结束更新元素 | <en/> End updating element */
  AFTER_UPDATE_ELEMENT = 'afterupdateelement',
  /** <zh/> 开始销毁元素 | <en/> Start destroy element */
  BEFORE_DESTROY_ELEMENT = 'beforedestroyelement',
  /** <zh/> 结束销毁元素 | <en/> End destroy element */
  AFTER_DESTROY_ELEMENT = 'afterdestroyelement',
  /** <zh/> 开始移动元素 | <en/> Start moving element */
  BEFORE_MOVE_ELEMENT = 'beforemoveelement',
  /** <zh/> 结束移动元素 | <en/> End moving element */
  AFTER_MOVE_ELEMENT = 'aftermoveelement',
  /** <zh/> 开始渲染 | <en/> Start rendering */
  BEFORE_RENDER = 'beforerender',
  /** <zh/> 结束渲染 | <en/> End rendering */
  AFTER_RENDER = 'afterrender',
  /** <zh/> 开始布局 | <en/> Start layout */
  BEFORE_LAYOUT = 'beforelayout',
  /** <zh/> 结束布局 | <en/> End layout */
  AFTER_LAYOUT = 'afterlayout',
  /** <zh/> 元素可见性变化之前 | <en/> Before the visibility of the element changes */
  BEFORE_ELEMENT_VISIBILITY_CHANGE = 'beforeelementvisibilitychange',
  /** <zh/> 元素可见性变化之后 | <en/> After the visibility of the element changes */
  AFTER_ELEMENT_VISIBILITY_CHANGE = 'afterelementvisibilitychange',
  /** <zh/> 元素层级变化之前 | <en/> Before the layer of the element changes */
  BEFORE_ELEMENT_Z_INDEX_CHANGE = 'beforeelementzindexchange',
  /** <zh/> 元素层级变化之后 | <en/> After the layer of the element changes */
  AFTER_ELEMENT_Z_INDEX_CHANGE = 'afterelementzindexchange',
}
