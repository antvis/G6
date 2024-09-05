import { CameraType } from '@antv/g';
import type { BaseBehaviorOptions, IDragEvent, RuntimeContext, ShortcutKey } from '@antv/g6';
import { BaseBehavior, GraphEvent, Shortcut } from '@antv/g6';

/**
 * <zh/> 观察 3D 画布交互配置项
 *
 * <en/> Observe 3D canvas options
 */
export interface ObserveCanvas3DOptions extends BaseBehaviorOptions {
  enable?: boolean;
  /**
   * <zh/> 相机模式
   * - `orbiting` 固定视点(`focalPoint`)，改变相机位置。不能跨越南北极
   * - `exploring` 固定视点(`focalPoint`)，改变相机位置。可以跨越南北极
   * - `tracking` 第一人称模式，固定相机位置，改变视点(`focalPoint`)位置
   *
   * <en/> Camera mode
   * - `orbiting` Fixed viewpoint(`focalPoint`), change camera position. Cannot cross the north and south poles
   * - `exploring` Fixed viewpoint(`focalPoint`), change camera position. Can cross the north and south poles
   * - `tracking` First-person mode, fixed camera position, change viewpoint(`focalPoint`) position
   */
  mode?: 'orbiting' | 'exploring' | 'tracking';
  /**
   * <zh/> 按下该快捷键配合指针观察场景
   *
   * <en/> Press this shortcut key to observe the scene with the pointer
   */
  trigger?: ShortcutKey;
  /**
   * <zh/> 灵敏度
   *
   * <en/> Sensitivity
   */
  sensitivity?: number;
}

/**
 * <zh/> 3D 场景控制器，提供缩放、平移、旋转等能力
 *
 * <en/> 3D scene controller, providing zoom, pan, rotate and other capabilities
 */
export class ObserveCanvas3D extends BaseBehavior<ObserveCanvas3DOptions> {
  static defaultOptions: Partial<ObserveCanvas3DOptions> = {
    enable: true,
    mode: 'orbiting',
    trigger: [],
  };

  private shortcut: Shortcut;

  private get camera() {
    return this.context.canvas.getCamera();
  }

  constructor(context: RuntimeContext, options: ObserveCanvas3DOptions) {
    super(context, { ...ObserveCanvas3D.defaultOptions, ...options });
    this.shortcut = new Shortcut(context.graph);
    this.bindEvents();
  }

  public update(options: Partial<ObserveCanvas3DOptions>): void {
    super.update(options);
    this.setCameraType();
  }

  private setCameraType = () => {
    const { mode } = this.options;
    const CameraModeMap = {
      orbiting: CameraType.ORBITING,
      exploring: CameraType.EXPLORING,
      tracking: CameraType.TRACKING,
    };
    this.camera.setType(CameraModeMap[mode]);
  };

  // tracking 模式下需要减速，否则容易出现抖动
  // Deceleration is required in tracking mode, otherwise jitter is easy to occur
  private getRatio() {
    const { sensitivity, mode } = this.options;
    if (sensitivity) return sensitivity / 10;
    if (mode === 'tracking') return 0.1;
    return 1;
  }

  private onDrag = (event: IDragEvent) => {
    if (!this.options.enable) return;
    const { x, y } = event.movement;
    const ratio = this.getRatio();
    this.camera.rotate(x * ratio, -y * ratio, 0);
  };

  private bindEvents() {
    const { graph } = this.context;
    graph.once(GraphEvent.BEFORE_DRAW, this.setCameraType);
    this.shortcut.unbindAll();
    this.shortcut.bind([...this.options.trigger, 'drag'], this.onDrag);
  }

  public destroy() {
    this.shortcut.destroy();
    super.destroy();
  }
}
