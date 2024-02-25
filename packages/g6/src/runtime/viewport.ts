import { sleep } from '@@/utils';
import { clamp } from '@antv/util';
import { GraphEvent } from '../constants';
import type {
  Point,
  RotateOptions,
  TranslateOptions,
  Vector2,
  ViewportAnimationEffectTiming,
  ZoomOptions,
} from '../types';
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
    const {
      mode,
      value: [x = 0, y = 0, z = 0],
      origin: [ox = 0, oy = 0] = this.getCanvasCenter(),
    } = options;

    const [px, py, pz] = camera.getPosition();
    const [fx, fy, fz] = camera.getFocalPoint();

    if (animation) {
      this.context.graph.emit(GraphEvent.BEFORE_VIEWPORT_ANIMATE, options);

      return new Promise<void>((resolve) => {
        /**
         * todo: gotoLandmark 存在问题，有一定概率导致不会触发 onfinish，因此需要设置一个超时时间
         */
        const onfinish = () => {
          this.context.graph.emit(GraphEvent.AFTER_VIEWPORT_ANIMATE, options);
          resolve();
        };
        sleep(animation.duration || 0).then(onfinish);

        this.camera.gotoLandmark(
          this.createLandmark(
            mode === 'relative'
              ? {
                  position: [px - x, py - y, pz - z],
                  focalPoint: [fx - x, fy - y, fz - z],
                }
              : {
                  position: [ox - x, oy - y, z ?? pz - z],
                  focalPoint: [ox - x, oy - y, z ?? fz - z],
                },
          ),
          { ...animation, onfinish },
        );
      });
    } else {
      const point: Vector2 = mode === 'relative' ? [-x / currentZoom, -y / currentZoom] : [-px + ox - x, -py + oy - y];
      camera.pan(...point);
    }
  }

  public rotate(options: RotateOptions, animation?: ViewportAnimationEffectTiming) {
    this.cancelAnimation();
    const { camera } = this;
    const { mode, value: angle, origin } = options;

    if (animation) {
      this.context.graph.emit(GraphEvent.BEFORE_VIEWPORT_ANIMATE, options);

      return new Promise<void>((resolve) => {
        const onfinish = () => {
          this.context.graph.emit(GraphEvent.AFTER_VIEWPORT_ANIMATE, options);
          resolve();
        };
        sleep(animation.duration || 0).then(onfinish);

        this.camera.gotoLandmark(
          this.createLandmark({ roll: mode === 'relative' ? camera.getRoll() + angle : angle }),
          { ...animation, onfinish },
        );
      });
    } else {
      const [x, y] = camera.getFocalPoint();

      if (origin) camera.pan(origin[0] - x, origin[1] - y);

      camera.rotate(0, 0, mode === 'relative' ? angle : angle - camera.getRoll());

      if (origin) camera.pan(x - origin[0], y - origin[1]);
    }
  }

  public zoom(options: ZoomOptions, animation?: ViewportAnimationEffectTiming) {
    const { zoomRange = [-Infinity, Infinity] } = this.context.options;

    this.cancelAnimation();
    const { camera } = this;
    const currentZoom = camera.getZoom();
    const { mode, value: zoom, origin = this.getCanvasCenter() } = options;

    const targetRatio = clamp(mode === 'relative' ? currentZoom * zoom : zoom, ...zoomRange);

    if (animation) {
      this.context.graph.emit(GraphEvent.BEFORE_VIEWPORT_ANIMATE, options);

      return new Promise<void>((resolve) => {
        const onfinish = () => {
          this.context.graph.emit(GraphEvent.AFTER_VIEWPORT_ANIMATE, options);
          resolve();
        };
        sleep(animation.duration || 0).then(onfinish);

        this.camera.gotoLandmark(this.createLandmark({ zoom: targetRatio }), { ...animation, onfinish });
      });
    } else {
      camera.setZoomByViewportPoint(targetRatio, [origin[0], origin[1]]);
    }
  }

  public cancelAnimation() {
    const { graph } = this.context;
    // @ts-expect-error landmarks is private
    if (this.camera.landmarks?.length) {
      this.camera.cancelLandmarkAnimation();
      graph.emit(GraphEvent.CANCEL_VIEWPORT_ANIMATE);
    }
  }
}
