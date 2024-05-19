import { AABB } from '@antv/g';
import { clamp, isNumber, pick } from '@antv/util';
import { AnimationType, GraphEvent } from '../constants';
import type { FitViewOptions, ID, Point, TransformOptions, Vector2, ViewportAnimationEffectTiming } from '../types';
import { getAnimationOptions } from '../utils/animation';
import { getBBoxSize, getCombinedBBox } from '../utils/bbox';
import { AnimateEvent, ViewportEvent, emit } from '../utils/event';
import { parsePadding } from '../utils/padding';
import { add, divide, subtract } from '../utils/vector';
import type { RuntimeContext } from './types';

export class ViewportController {
  private context: RuntimeContext;

  private get padding() {
    return parsePadding(this.context.options.padding);
  }

  private get paddingOffset(): Point {
    const [top, right, bottom, left] = this.padding;
    const [offsetX, offsetY, offsetZ] = [(left - right) / 2, (top - bottom) / 2, 0];
    return [offsetX, offsetY, offsetZ];
  }

  constructor(context: RuntimeContext) {
    this.context = context;
    const [px, py] = this.paddingOffset;
    const { zoom, rotation, x = px, y = py } = context.options;
    this.transform({ mode: 'absolute', scale: zoom, translate: [x, y], rotate: rotation }, false);
  }

  private get camera() {
    return this.context.canvas.getCamera();
  }

  private landmarkCounter = 0;

  private createLandmark(options: Parameters<typeof this.camera.createLandmark>[1]) {
    return this.camera.createLandmark(`landmark-${this.landmarkCounter++}`, options);
  }

  private getAnimation(animation?: ViewportAnimationEffectTiming) {
    const finalAnimation = getAnimationOptions(this.context.options, animation);
    if (!finalAnimation) return false;
    return pick({ ...finalAnimation }, ['easing', 'duration']) as Exclude<ViewportAnimationEffectTiming, boolean>;
  }

  public getCanvasSize(): [number, number] {
    const { canvas } = this.context;
    const { width = 0, height = 0 } = canvas.getConfig();
    return [width, height];
  }

  /**
   * <zh/> 获取画布中心坐标
   *
   * <en/> Get the center coordinates of the canvas
   * @returns - <zh/> 画布中心坐标 | <en/> Center coordinates of the canvas
   * @remarks
   * <zh/> 基于画布的宽高计算中心坐标，不受视口变换影响
   *
   * <en/> Calculate the center coordinates based on the width and height of the canvas, not affected by the viewport transformation
   */
  public getCanvasCenter(): Point {
    const { canvas } = this.context;
    const { width = 0, height = 0 } = canvas.getConfig();
    return [width / 2, height / 2, 0];
  }

  /**
   * <zh/> 当前视口中心坐标
   *
   * <en/> Current viewport center coordinates
   * @returns - <zh/> 视口中心坐标 | <en/> Viewport center coordinates
   * @remarks
   * <zh/> 以画布原点为原点，受到视口变换影响
   *
   * <en/> With the origin of the canvas as the origin, affected by the viewport transformation
   */
  public getViewportCenter(): Point {
    // 理论上应该通过 camera.getFocalPoint() 获取
    // 但在 2D 场景下，通过 pan 操作时，focalPoint 不会变化
    const [x, y] = this.camera.getPosition();
    return [x, y, 0];
  }

  public getGraphCenter(): Point {
    return this.context.graph.getViewportByCanvas(this.getCanvasCenter());
  }

  public getZoom() {
    return this.camera.getZoom();
  }

  public getRotation() {
    return this.camera.getRoll();
  }

  private getTranslateArgs(options: TransformOptions) {
    const currentZoom = this.getZoom();
    const { camera } = this;
    const { mode, translate = [] } = options;
    const [x = 0, y = 0] = translate;
    const [cx = 0, cy = 0] = this.getCanvasCenter();
    const [px, py] = camera.getPosition();

    const delta = divide([-x, -y], currentZoom);

    const value = mode === 'relative' ? delta : add([cx - px, cy - py], delta);
    return value as [number, number];
  }

  private getAnimationTranslateArgs(options: TransformOptions) {
    const { camera } = this;
    const { mode, translate = [] } = options;
    const currentZoom = this.getZoom();

    const position = camera.getPosition();
    const focalPoint = camera.getFocalPoint();
    const canvasCenter = this.getCanvasCenter();

    const [x = 0, y = 0, z = 0] = translate;

    const delta = divide([-x, -y, -z], currentZoom);

    return mode === 'relative'
      ? {
          position: add(position, delta),
          focalPoint: add(focalPoint, delta),
        }
      : {
          position: add(canvasCenter, delta),
          focalPoint: add(focalPoint, delta),
        };
  }

  private getRotateArgs(options: TransformOptions) {
    const { mode, rotate = 0 } = options;
    return mode === 'relative' ? rotate : rotate - this.camera.getRoll();
  }

  private getAnimationRotateArgs(options: TransformOptions) {
    const { mode, rotate = 0 } = options;
    const roll = mode === 'relative' ? this.camera.getRoll() + rotate : rotate;
    return { roll };
  }

  private getZoomArgs(options: TransformOptions) {
    const { zoomRange } = this.context.options;
    const currentZoom = this.camera.getZoom();
    const { mode, scale = 1 } = options;
    return clamp(mode === 'relative' ? currentZoom * scale : scale, ...zoomRange!);
  }

  public async transform(options: TransformOptions, animation?: ViewportAnimationEffectTiming) {
    const { camera } = this;
    const { graph } = this.context;
    const { translate, rotate, scale, origin = this.getGraphCenter() } = options;
    this.cancelAnimation();

    emit(graph, new ViewportEvent(GraphEvent.BEFORE_TRANSFORM, options));
    const _animation = this.getAnimation(animation);

    if (_animation) {
      const landmarkOptions: Parameters<typeof this.camera.createLandmark>[1] = {};
      if (translate) Object.assign(landmarkOptions, this.getAnimationTranslateArgs(options));
      if (isNumber(rotate)) Object.assign(landmarkOptions, this.getAnimationRotateArgs(options));
      if (isNumber(scale)) Object.assign(landmarkOptions, { zoom: this.getZoomArgs(options) });

      emit(graph, new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.TRANSFORM, null, options));

      return new Promise<void>((resolve) => {
        this.camera.gotoLandmark(this.createLandmark(landmarkOptions), {
          ..._animation,
          onfinish: () => {
            emit(graph, new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.TRANSFORM, null, options));
            emit(graph, new ViewportEvent(GraphEvent.AFTER_TRANSFORM, options));
            resolve();
          },
        });
      });
    } else {
      if (translate) camera.pan(...this.getTranslateArgs(options));
      if (isNumber(rotate)) {
        const [x, y] = camera.getFocalPoint();
        if (origin) camera.pan(origin[0] - x, origin[1] - y);
        const value = this.getRotateArgs(options);
        camera.rotate(0, 0, value);
        if (origin) camera.pan(x - origin[0], y - origin[1]);
      }
      if (isNumber(scale)) {
        const targetZoom = this.getZoomArgs(options);
        camera.setZoomByViewportPoint(targetZoom, origin as Vector2);
      }

      emit(graph, new ViewportEvent(GraphEvent.AFTER_TRANSFORM, options));
    }
  }

  public async fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void> {
    const [top, right, bottom, left] = this.padding;
    const { when = 'always', direction = 'both' } = options || {};

    const [width, height] = this.context.canvas.getSize();
    const innerWidth = width - left - right;
    const innerHeight = height - top - bottom;

    const canvasBounds = this.context.canvas.getBounds();
    const bboxInViewPort = this.getBBoxInViewport(canvasBounds);
    const [contentWidth, contentHeight] = getBBoxSize(bboxInViewPort);

    const isOverflow =
      (direction === 'x' && contentWidth >= innerWidth) ||
      (direction === 'y' && contentHeight >= innerHeight) ||
      (direction === 'both' && contentWidth >= innerWidth && contentHeight >= innerHeight);

    if (when === 'overflow' && !isOverflow) return await this.fitCenter(animation);

    const scaleX = innerWidth / contentWidth;
    const scaleY = innerHeight / contentHeight;
    const scale = direction === 'x' ? scaleX : direction === 'y' ? scaleY : Math.min(scaleX, scaleY);

    const _animation = this.getAnimation(animation);
    await this.transform(
      {
        mode: 'relative',
        scale,
        translate: add(
          subtract(this.getCanvasCenter(), this.getBBoxInViewport(canvasBounds).center),
          // 启用动画时， zoom 和 translate 是同时进行的，因此需要除以缩放比例
          // When animation is enabled, zoom and translate are performed simultaneously, so they need to be divided by the scaling ratio
          _animation ? divide(this.paddingOffset, scale) : this.paddingOffset,
        ),
      },
      _animation,
    );
  }

  public async fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void> {
    const canvasBounds = this.context.canvas.getBounds();
    await this.focus(canvasBounds, animation);
  }

  public async focusElements(ids: ID[], animation?: ViewportAnimationEffectTiming): Promise<void> {
    const { element } = this.context;
    if (!element) return;
    const elementsBounds = getCombinedBBox(ids.map((id) => element.getElement(id)!.getRenderBounds()));
    await this.focus(elementsBounds, animation);
  }

  private async focus(bbox: AABB, animation?: ViewportAnimationEffectTiming) {
    const { center } = this.getBBoxInViewport(bbox);
    const canvasCenter = this.getCanvasCenter();
    const delta = subtract(canvasCenter, center);
    await this.transform({ mode: 'relative', translate: add(delta, this.paddingOffset) }, animation);
  }

  /**
   * <zh/> 获取画布元素在视口中的包围盒
   *
   * <en/> Get the bounding box of the canvas element in the viewport
   * @param bbox - <zh/> 画布元素包围盒 | <en/> Canvas element bounding box
   * @returns - <zh/> 视口中的包围盒 | <en/> Bounding box in the viewport
   */
  public getBBoxInViewport(bbox: AABB) {
    const { min, max } = bbox;
    const { graph } = this.context;
    const [x1, y1] = graph.getViewportByCanvas(min);
    const [x2, y2] = graph.getViewportByCanvas(max);

    const bboxInViewport = new AABB();
    bboxInViewport.setMinMax([x1, y1, 0], [x2, y2, 0]);
    return bboxInViewport;
  }

  public cancelAnimation() {
    // @ts-expect-error landmarks is private
    if (this.camera.landmarks?.length) {
      this.camera.cancelLandmarkAnimation();
    }
  }
}
