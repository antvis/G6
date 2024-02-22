export const enum AnimationType {
  DRAW = 'draw',
  // LAYOUT = 'layout', // 布局没有统一的动画对象，因此不抛出动画事件 | There is no unified animation object for layout, so no animation event is thrown
  ELEMENT_VISIBILITY_CHANGE = 'elementvisibilitychange',
  ELEMENT_STATE_CHANGE = 'elementstatechange',
  ELEMENT_TRANSLATE = 'elementtranslate',
}
