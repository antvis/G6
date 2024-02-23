import { clamp } from '@antv/util';
import { AnimationType, GraphEvent } from '../constants';
import type {
  Point,
  RotateOptions,
  TranslateOptions,
  Vector2,
  Vector3,
  ViewportAnimationEffectTiming,
  ZoomOptions,
} from '../types';
import { AnimateEvent, ViewportEvent, emit } from '../utils/event';
import type { RuntimeContext } from './types';

export class ViewportController {
  private context: RuntimeContext;

  constructor(context: RuntimeContext) {
    this.context = context;
    const { zoom = 1 } = context.options;
    this.zoom({ mode: 'absolute', value: zoom });
  }

  private get camera() {
    return this.context.canvas.getCamera();
  }

  private landmarkCounter = 0;

  private createLandmark(options: Parameters<typeof this.camera.createLandmark>[1]) {
    return this.camera.createLandmark(`landmark-${this.landmarkCounter++}`, options);
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
   * @description
   * <zh/> 基于画布的宽高计算中心坐标，不受视口变换影响
   *
   * <en/> Calculate the center coordinates based on the width and height of the canvas, not affected by the viewport transformation
   */
  public getCanvasCenter(): Point {
    const { canvas } = this.context;
    const { width = 0, height = 0 } = canvas.getConfig();
    return [width / 2, height / 2];
  }

  /**
   * <zh/> 当前视口中心坐标
   *
   * <en/> Current viewport center coordinates
   * @returns - <zh/> 视口中心坐标 | <en/> Viewport center coordinates
   * @description
   * <zh/> 以画布原点为原点，受到视口变换影响
   *
   * <en/> With the origin of the canvas as the origin, affected by the viewport transformation
   */
  public getViewportCenter(): Point {
    const [x, y] = this.getCanvasCenter();
    const point = this.context.canvas.canvas2Viewport({ x, y });
    return [point.x, point.y];
  }

  public getZoom() {
    return this.camera.getZoom();
  }

  public getRotation() {
    return this.camera.getRoll();
  }

  public translate(options: TranslateOptions, animation?: ViewportAnimationEffectTiming) {
    const currentZoom = this.getZoom();
    this.cancelAnimation();
    const { camera } = this;
    const { graph } = this.context;
    const {
      mode,
      value: [x = 0, y = 0, z = 0],
      origin: [ox = 0, oy = 0] = this.getCanvasCenter(),
    } = options;

    const [px, py, pz] = camera.getPosition();
    const [fx, fy, fz] = camera.getFocalPoint();

    if (animation) {
      const value =
        mode === 'relative'
          ? {
              position: [px - x, py - y, pz - z] as Vector3,
              focalPoint: [fx - x, fy - y, fz - z] as Vector3,
            }
          : {
              position: [ox - x, oy - y, z ?? pz - z] as Vector3,
              focalPoint: [ox - x, oy - y, z ?? fz - z] as Vector3,
            };

      emit(graph, new ViewportEvent(GraphEvent.BEFORE_TRANSLATE, value));
      emit(graph, new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.TRANSLATE, null, value));

      return new Promise<void>((resolve) => {
        const onfinish = () => {
          emit(graph, new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.TRANSLATE, null, value));
          emit(graph, new ViewportEvent(GraphEvent.AFTER_TRANSLATE, value));
          resolve();
        };

        this.camera.gotoLandmark(this.createLandmark(value), { ...animation, onfinish });
      });
    } else {
      const value: Vector2 = mode === 'relative' ? [-x / currentZoom, -y / currentZoom] : [-px + ox - x, -py + oy - y];
      emit(graph, new ViewportEvent(GraphEvent.BEFORE_TRANSLATE, value));
      camera.pan(...value);
      emit(graph, new ViewportEvent(GraphEvent.BEFORE_TRANSLATE, value));
    }
  }

  public rotate(options: RotateOptions, animation?: ViewportAnimationEffectTiming) {
    this.cancelAnimation();
    const { camera } = this;
    const { graph } = this.context;
    const { mode, value: angle, origin } = options;

    if (animation) {
      const roll = mode === 'relative' ? camera.getRoll() + angle : angle;
      const value = { roll };
      emit(graph, new ViewportEvent(GraphEvent.BEFORE_ROTATE, value));
      emit(graph, new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.ROTATE, null, value));

      return new Promise<void>((resolve) => {
        const onfinish = () => {
          emit(graph, new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.ROTATE, null, value));
          emit(graph, new ViewportEvent(GraphEvent.BEFORE_ROTATE, value));
          resolve();
        };

        this.camera.gotoLandmark(this.createLandmark(value), { ...animation, onfinish });
      });
    } else {
      const [x, y] = camera.getFocalPoint();
      if (origin) camera.pan(origin[0] - x, origin[1] - y);
      const value = mode === 'relative' ? angle : angle - camera.getRoll();
      emit(graph, new ViewportEvent(GraphEvent.BEFORE_ROTATE, value));

      camera.rotate(0, 0, mode === 'relative' ? angle : angle - camera.getRoll());
      if (origin) camera.pan(x - origin[0], y - origin[1]);
      emit(graph, new ViewportEvent(GraphEvent.AFTER_ROTATE, value));
    }
  }

  public zoom(options: ZoomOptions, animation?: ViewportAnimationEffectTiming) {
    const { zoomRange = [-Infinity, Infinity] } = this.context.options;

    this.cancelAnimation();
    const { camera } = this;
    const { graph } = this.context;
    const currentZoom = camera.getZoom();
    const { mode, value: zoom, origin = this.getCanvasCenter() } = options;
    const targetRatio = clamp(mode === 'relative' ? currentZoom * zoom : zoom, ...zoomRange);

    const value = { zoom: targetRatio };
    emit(graph, new ViewportEvent(GraphEvent.BEFORE_ZOOM, value));

    if (animation) {
      emit(graph, new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.ZOOM, null, value));

      return new Promise<void>((resolve) => {
        const onfinish = () => {
          emit(graph, new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.ZOOM, null, value));
          emit(graph, new ViewportEvent(GraphEvent.AFTER_ZOOM, value));
          resolve();
        };

        this.camera.gotoLandmark(this.createLandmark(value), { ...animation, onfinish });
      });
    } else {
      camera.setZoomByViewportPoint(targetRatio, [origin[0], origin[1]]);
      emit(graph, new ViewportEvent(GraphEvent.AFTER_ZOOM, value));
    }
  }

  public cancelAnimation() {
    // @ts-expect-error landmarks is private
    if (this.camera.landmarks?.length) {
      this.camera.cancelLandmarkAnimation();
    }
  }
}
