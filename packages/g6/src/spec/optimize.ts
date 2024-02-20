export type OptimizeOptions = {
  /**
   * <zh/> 是否开启首次渲染时的分片渲染，若为 number，则表示开启分片渲染的元素数量上限
   *
   * <en/> Whether enable tile rendering for first time. If it is a number, it means the maximum number of elements for tile rendering.
   */
  tileFirstRender?: boolean | number;
  /**
   * <zh/> 首次渲染时的分片渲染的元素数量上限
   *
   * <en/> Tile size for first rendering.
   */
  tileFirstRenderSize?: number;
  /**
   * <zh/> 是否在 drag-canvas, zoom-canvas 显示/隐藏图形过程中，启用分片渲染。若指定 number，则表示开启分片渲染的元素数量上限。
   *
   * <en/> Whether enable tile hiding / showing for behaviors, e.g. hiding shapes while drag-canvas, zoom-canvas.
   */
  tileBehavior?: boolean | number;
  /**
   * <zh/> 交互的分片渲染单片/一帧渲染的元素数量
   *
   * <en/> Tile size for shape optimizing by behaviors, e.g. hiding shapes while drag-canvas, zoom-canvas.  The enableOptimize in behavior configuration has higher priority.
   */
  tileBehaviorSize?: number;
  /**
   * <zh/> 层级渲染的分片渲染单片/一帧渲染的元素数量
   *
   * <en/> Tile size for level of detail changing.
   */
  tileLodSize?: number;
};
