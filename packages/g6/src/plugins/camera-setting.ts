import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

export interface CameraSettingOptions extends BasePluginOptions {
  /**
   * <zh/> 投影模式，透视投影仅在 3D 场景下有效
   * - `'perspective'` : 透视投影
   * - `'orthographic'` : 正交投影
   *
   * <en/> Projection mode, perspective projection is only valid in 3D scenes
   * - `'perspective'` : perspective projection
   * - `'orthographic'` : Orthogonal projection
   */
  projectionMode?: 'perspective' | 'orthographic';
  /**
   * <zh/> 相机类型
   * - `'orbiting'`: 固定视点，改变相机位置
   * - `'exploring'`: 类似 orbiting，但允许相机在北极和南极之间旋转
   * - `'tracking'`: 固定相机位置，改变视点
   *
   * <en/> Camera type
   * - `'orbiting'`: Fixed viewpoint, change camera position
   * - `'exploring'`: Similar to orbiting, but allows the camera to rotate between the North Pole and the South Pole
   * - `'tracking'`: Fixed camera position, change viewpoint
   */
  cameraType?: 'orbiting' | 'exploring' | 'tracking';
  /**
   * <zh/> 近平面位置
   *
   * <en/> The position of the near plane
   */
  near?: number;
  /**
   * <zh/> 远平面位置
   *
   * <en/> The position of the far plane
   */
  far?: number;
  /**
   * <zh/> 相机视角，仅在透视相机下有效
   *
   * <en/> Camera field of view, only valid in perspective camera
   */
  fov?: number;
  /**
   * <zh/> 相机视口宽高比，仅在透视相机下有效
   * - number : 具体的宽高比
   * - `'auto'` : 自动设置为画布的宽高比
   *
   * <en/> Camera viewport aspect ratio, only valid in perspective camera.
   * - number : Specific aspect ratio
   * - `'auto'` : Automatically set to the aspect ratio of the canvas
   */
  aspect?: number | 'auto';
  /**
   * <zh/> 相机距离目标的距离
   *
   * <en/> The distance from the camera to the target
   * @defaultValue 500
   */
  distance?: number;
  /**
   * <zh/> 最小视距
   *
   * <en/> Minimum distance
   */
  minDistance?: number;
  /**
   * <zh/> 最大视距
   *
   * <en/> Maximum distance
   */
  maxDistance?: number;
  /**
   * <zh/> 滚转角
   *
   * <en/> Roll
   */
  roll?: number;
  /**
   * <zh/> 仰角
   *
   * <en/> Elevation
   */
  elevation?: number;
  /**
   * <zh/> 方位角
   *
   * <en/> Azimuth
   */
  azimuth?: number;
}

/**
 * <zh/> 配置相机参数
 *
 * <en/> Configure camera parameters
 */
export class CameraSetting extends BasePlugin<CameraSettingOptions> {
  constructor(context: RuntimeContext, options: CameraSettingOptions) {
    super(context, options);
    this.bindEvents();
  }
  /**
   * <zh/> 更新相机参数
   *
   * <en/> Update camera parameters
   * @param options - <zh/> 相机配置项 | <en/> Camera configuration options
   * @internal
   */
  public update(options: Partial<CameraSettingOptions>): void {
    this.setOptions(options);
    super.update(options);
  }

  private bindEvents() {
    this.context.graph.once(GraphEvent.BEFORE_DRAW, () => this.setOptions(this.options));
  }

  private setOptions = (options: Partial<CameraSettingOptions>) => {
    const caller = {
      cameraType: 'setType',
      near: 'setNear',
      far: 'setFar',
      fov: 'setFov',
      aspect: 'setAspect',
      // 确保 projectionMode 在 near/far/fov/aspect 之后设置
      // Ensure that projectionMode is set after near/far/fov/aspect
      projectionMode: 'setProjectionMode',
      distance: 'setDistance',
      minDistance: 'setMinDistance',
      maxDistance: 'setMaxDistance',
      roll: 'setRoll',
      elevation: 'setElevation',
      azimuth: 'setAzimuth',
    } as const;

    const valueMapper = (key: string, value: string) => {
      switch (key) {
        case 'projectionMode':
          return value === 'perspective' ? 1 : 0;
        case 'cameraType':
          return { orbiting: 0, exploring: 1, tracking: 2 }[value]!;
        case 'aspect':
          if (typeof value === 'number') return value;
          return this.getCanvasAspect();
        default:
          return value;
      }
    };

    Object.entries(caller).forEach(([key, method]) => {
      const value = options[key];
      if (value !== undefined) {
        const actualValue = valueMapper(key, value);
        // @ts-expect-error incorrect ts type check
        this.context.canvas.getCamera()[method](actualValue);
      }
    });
  };

  private getCanvasAspect() {
    const [width, height] = this.context.viewport!.getCanvasSize();
    return width / height;
  }
}
