import { Path } from '@antv/g';
import { isBBoxIntersectPolygon } from '../utils/behaviors/lasso';
import { getAllElementState } from '../utils/behaviors/utils';
import { pointsToPath } from '../utils/path';
import { BrushSelect, DEFAULT_STYLE } from './brush-select';

import type { ID } from '@antv/graphlib';
import type { RuntimeContext } from '../runtime/types';
import type { IPointerEvent, Points, State } from '../types';
import type { BrushSelectOptions } from './brush-select';

const SHOW_PATH_ID = 'g6-lasso-select-path-id';

export type States = Record<ID, State | State[]>;

export type LassoSelectOptions = BrushSelectOptions;

export class LassoSelect extends BrushSelect<LassoSelectOptions> {
  static defaultOptions: Partial<LassoSelectOptions> = {
    ...BrushSelect.defaultOptions,
    style: DEFAULT_STYLE,
  };

  private points?: Points;
  private pathShape?: Path;

  public selectElementFn = isBBoxIntersectPolygon;

  constructor(context: RuntimeContext, options: LassoSelectOptions) {
    super(context, Object.assign({}, LassoSelect.defaultOptions, options));
    this.bindEvents();
  }

  public pointerDown = async (event: IPointerEvent) => {
    if (!this.validate(event) || !this.isKeydown() || this.points) return;
    const { style, trigger } = this.options;
    if (event.targetType !== 'canvas' && trigger === 'drag') return;

    const { canvas } = this.context;

    this.pathShape = new Path({
      id: SHOW_PATH_ID,
      style: {
        ...LassoSelect.defaultOptions.style,
        fill: style.color || DEFAULT_STYLE.color,
        ...style,
        pointerEvents: 'none',
      },
    });

    canvas.appendChild(this.pathShape);

    this.points = [[event.canvas.x, event.canvas.y]];
  };

  public pointerMove = async (event: IPointerEvent) => {
    if (!this.points) return;
    const { immediately, mode } = this.options;
    const { element } = this.context;

    this.points.push([event.canvas.x, event.canvas.y]);

    this.pathShape?.setAttribute('path', pointsToPath(this.points));

    if (immediately && mode === 'default') {
      this.lassoUpdateElementState();
    }
    await element?.draw({ animation: false, silence: true });
  };

  public pointerUp = async () => {
    if (!this.points) return;
    if (this.points.length < 2) {
      await this.clearLasso();
      return;
    }

    this.lassoUpdateElementState();

    await this.clearLasso();
  };

  public clearSelected = () => {
    if (this.points) return;

    const { graph } = this.context;
    const selects = getAllElementState(graph, () => []);

    graph.setElementState(selects, this.options.animation);
  };

  private lassoUpdateElementState = () => {
    if (!this.points || this.points?.length < 2) return;
    this.updateElementState(this.points);
  };

  private clearLasso = async () => {
    this.pathShape?.remove();
    this.pathShape = undefined;
    this.points = undefined;
  };
}
