export const enum GraphEvent {
  /** <zh/> 开始视口动画 | <en/> Start the viewport animation */
  BEFORE_VIEWPORT_ANIMATION = 'beforeviewportanimation',
  /** <zh/> 结束视口动画 | <en/> End the viewport animation */
  AFTER_VIEWPORT_ANIMATION = 'afterviewportanimation',
  /** <zh/> 停止视口动画 | <en/> Stop the viewport animation */
  CANCEL_VIEWPORT_ANIMATION = 'cancelviewportanimation',
  /** <zh/> 开始渲染 | <en/> Start rendering */
  BEFORE_RENDER = 'beforerender',
  /** <zh/> 结束渲染 | <en/> End rendering */
  AFTER_RENDER = 'afterrender',
}
