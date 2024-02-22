export const enum GraphEvent {
  /** <zh/> 视口动画开始之前 | <en/> Before the viewport animation starts */
  BEFORE_VIEWPORT_ANIMATE = 'beforeviewportanimate',
  /** <zh/> 视口动画结束之后 | <en/> After the viewport animation ends */
  AFTER_VIEWPORT_ANIMATE = 'afterviewportanimate',
  /** <zh/> 视口动画停止之前 | <en/> Before the viewport animation stops */
  CANCEL_VIEWPORT_ANIMATE = 'cancelviewportanimate',
  /** <zh/> 元素创建之前 | <en/> Before creating element */
  BEFORE_ELEMENT_CREATE = 'beforeelementcreate',
  /** <zh/> 元素创建之后 | <en/> After creating element */
  AFTER_ELEMENT_CREATE = 'afterelementcreate',
  /** <zh/> 元素更新之前 | <en/> Before updating element */
  BEFORE_ELEMENT_UPDATE = 'beforeelementupdate',
  /** <zh/> 元素更新之后 | <en/> After updating element */
  AFTER_ELEMENT_UPDATE = 'afterelementupdate',
  /** <zh/> 元素销毁之前 | <en/> Before destroying element */
  BEFORE_ELEMENT_DESTROY = 'beforeelementdestroy',
  /** <zh/> 元素销毁之后 | <en/> After destroying element */
  AFTER_ELEMENT_DESTROY = 'afterelementdestroy',
  /** <zh/> 元素平移之前 | <en/> Before element translation */
  BEFORE_ELEMENT_TRANSLATE = 'beforeelementtranslate',
  /** <zh/> 元素平移之后 | <en/> After element translation */
  AFTER_ELEMENT_TRANSLATE = 'afterelementtranslate',
  /** <zh/> 绘制开始之前 | <en/> Before drawing */
  BEFORE_DRAW = 'beforedraw',
  /** <zh/> 绘制结束之后 | <en/> After drawing */
  AFTER_DRAW = 'afterdraw',
  /** <zh/> 渲染开始之前 | <en/> Before rendering */
  BEFORE_RENDER = 'beforerender',
  /** <zh/> 渲染完成之后 | <en/> After rendering */
  AFTER_RENDER = 'afterrender',
  /** <zh/> 动画开始之前 | <en/> Before animation */
  BEFORE_ANIMATE = 'beforeanimate',
  /** <zh/> 动画结束之后 | <en/> After animation */
  AFTER_ANIMATE = 'afteranimate',
  /** <zh/> 布局开始之前 | <en/> Before layout */
  BEFORE_LAYOUT = 'beforelayout',
  /** <zh/> 布局结束之后 | <en/> After layout */
  AFTER_LAYOUT = 'afterlayout',
  /** <zh/> 元素可见性变化之前 | <en/> Before the visibility of the element changes */
  BEFORE_ELEMENT_VISIBILITY_CHANGE = 'beforeelementvisibilitychange',
  /** <zh/> 元素可见性变化之后 | <en/> After the visibility of the element changes */
  AFTER_ELEMENT_VISIBILITY_CHANGE = 'afterelementvisibilitychange',
  /** <zh/> 元素层级变化之前 | <en/> Before the layer of the element changes */
  BEFORE_ELEMENT_Z_INDEX_CHANGE = 'beforeelementzindexchange',
  /** <zh/> 元素层级变化之后 | <en/> After the layer of the element changes */
  AFTER_ELEMENT_Z_INDEX_CHANGE = 'afterelementzindexchange',
  /** <zh/> 状态变化之前 | <en/> Before the state changes */
  BEFORE_ELEMENT_STATE_CHANGE = 'beforeelementstatechange',
  /** <zh/> 状态变化之后 | <en/> After the state changes */
  AFTER_ELEMENT_STATE_CHANGE = 'afterelementstatechange',
}

export const enum AnimationTypeEnum {
  DRAW = 'draw',
  // LAYOUT = 'layout', // 布局没有统一的动画对象，因此不抛出动画事件 | There is no unified animation object for layout, so no animation event is thrown
  ELEMENT_VISIBILITY_CHANGE = 'elementvisibilitychange',
  ELEMENT_STATE_CHANGE = 'elementstatechange',
  ELEMENT_TRANSLATE = 'elementtranslate',
}
