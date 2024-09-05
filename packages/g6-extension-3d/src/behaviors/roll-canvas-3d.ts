import type { BaseBehaviorOptions, IWheelEvent, RuntimeContext, ShortcutKey } from '@antv/g6';
import { BasePlugin, Shortcut } from '@antv/g6';

/**
 * <zh/> 滚动画布配置项
 *
 * <en/> Roll Canvas Options
 */
export interface RollCanvas3DOptions extends BaseBehaviorOptions {
  enable?: boolean;
  /**
   * <zh/> 按下该快捷键配合滚轮操作进行旋转
   *
   * <en/> Press this shortcut key to rotate with the mouse wheel
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
 * <zh/> 滚动画布
 *
 * <en/> Roll Canvas
 */
export class RollCanvas3D extends BasePlugin<RollCanvas3DOptions> {
  static defaultOptions: Partial<RollCanvas3DOptions> = {
    enable: true,
    trigger: ['wheel'],
    sensitivity: 1,
  };

  private shortcut: Shortcut;

  private get camera() {
    return this.context.canvas.getCamera();
  }

  constructor(context: RuntimeContext, options: RollCanvas3DOptions) {
    super(context, { ...RollCanvas3D.defaultOptions, ...options });
    this.shortcut = new Shortcut(context.graph);
    this.bindEvents();
  }

  private getAngle(delta: number): number {
    const { sensitivity } = this.options;
    return -(delta * sensitivity) / 10;
  }

  private onRoll = (event: IWheelEvent) => {
    const roll = this.camera.getRoll();
    const delta = event.deltaY;
    this.camera.setRoll(roll + this.getAngle(delta));
  };

  private bindEvents() {
    const { trigger } = this.options;
    this.shortcut.unbindAll();
    this.shortcut.bind([...trigger, 'wheel'], this.onRoll);
  }
}
