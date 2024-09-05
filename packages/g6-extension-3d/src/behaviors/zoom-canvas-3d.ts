import type { IKeyboardEvent, IWheelEvent, ViewportAnimationEffectTiming, ZoomCanvasOptions } from '@antv/g6';
import { ZoomCanvas } from '@antv/g6';
import { clamp } from '@antv/util';

/**
 * <zh/> 缩放画布配置项
 *
 * <en/> Zoom Canvas Options
 */
export interface ZoomCanvas3DOptions extends ZoomCanvasOptions {}

/**
 * <zh/> 缩放画布
 *
 * <en/> Zoom Canvas
 */
export class ZoomCanvas3D extends ZoomCanvas {
  protected zoom = async (
    value: number,
    event: IWheelEvent | IKeyboardEvent,
    animation: ViewportAnimationEffectTiming | undefined,
  ) => {
    if (!this.validate(event)) return;
    const { graph } = this.context;

    const { sensitivity, onFinish } = this.options;
    const ratio = 1 + (clamp(value, -50, 50) * sensitivity) / 100;
    const zoom = graph.getZoom();

    this.context.canvas.getCamera().setZoom(zoom * ratio);

    onFinish?.();
  };
}
