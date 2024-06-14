import { Path } from '@antv/g';
import type { IPointerEvent, Point } from '../types';
import { pointsToPath } from '../utils/path';
import type { BrushSelectOptions } from './brush-select';
import { BrushSelect, getCursorPoint } from './brush-select';

/**
 * <zh/> 套索选择交互配置项
 *
 * <en/> Lasso select behavior options
 */
export interface LassoSelectOptions extends BrushSelectOptions {}

/**
 * <zh/> 套索选择交互
 *
 * <en/> Lasso select behavior
 * @remarks
 * <zh/> 用不规则多边形框选一组元素。
 *
 * <en/> Select a group of elements with an irregular polygon.
 */
export class LassoSelect extends BrushSelect {
  private points?: Point[];
  private pathShape?: Path;

  /**
   * Triggered when the mouse is pressed
   * @param event - mouse event
   * @internal
   */
  protected onPointerDown(event: IPointerEvent) {
    if (!super.validate(event) || !super.isKeydown() || this.points) return;
    const { canvas } = this.context;

    this.pathShape = new Path({
      id: 'g6-lasso-select',
      style: this.options.style,
    });

    canvas.appendChild(this.pathShape);

    this.points = [getCursorPoint(event)];
  }

  /**
   * Triggered when the mouse is moved
   * @param event - mouse event
   * @internal
   */
  protected onPointerMove(event: IPointerEvent) {
    if (!this.points) return;
    const { immediately, mode } = this.options;

    this.points.push(getCursorPoint(event));

    this.pathShape?.setAttribute('d', pointsToPath(this.points));

    if (immediately && mode === 'default' && this.points.length > 2) super.updateElementsStates(this.points);
  }

  /**
   * Triggered when the mouse is released
   * @internal
   */
  protected onPointerUp() {
    if (!this.points) return;
    if (this.points.length < 2) {
      this.clearLasso();
      return;
    }
    super.updateElementsStates(this.points);

    this.clearLasso();
  }

  private clearLasso() {
    this.pathShape?.remove();
    this.pathShape = undefined;
    this.points = undefined;
  }
}
