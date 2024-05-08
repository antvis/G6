import { Path } from '@antv/g';
import type { IPointerEvent, Points } from '../types';
import { pointsToPath } from '../utils/path';
import type { BrushSelectOptions } from './brush-select';
import { BrushSelect, getCursorPoint } from './brush-select';

export interface LassoSelectOptions extends BrushSelectOptions {}

export class LassoSelect extends BrushSelect {
  private points?: Points;
  private pathShape?: Path;

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

  protected onPointerMove(event: IPointerEvent) {
    if (!this.points) return;
    const { immediately, mode } = this.options;

    this.points.push(getCursorPoint(event));
    this.pathShape?.setAttribute('path', pointsToPath(this.points));

    if (immediately && mode === 'default' && this.points.length > 2) super.updateElementsStates(this.points);
  }

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
