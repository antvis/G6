import type { DragCanvasOptions, Vector2, ViewportAnimationEffectTiming } from '@antv/g6';
import { DragCanvas } from '@antv/g6';

/**
 * <zh/> 拖拽 3D 画布交互
 *
 * <en/> Drag 3D canvas behavior
 */
export interface DragCanvas3DOptions extends DragCanvasOptions {}

/**
 * <zh/> 平移画布
 *
 * <en/> Pan canvas
 */
export class DragCanvas3D extends DragCanvas {
  protected async translate(offset: Vector2, animation?: ViewportAnimationEffectTiming | undefined) {
    this.context.canvas.getCamera().pan(-offset[0], -offset[1]);
  }
}
