import { BaseStyleProps } from '@antv/g';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import { Point } from '../types';
import { createPluginContainer } from '../utils/dom';
import { ViewportEvent } from '../utils/event';
import { add, mod } from '../utils/vector';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

export interface GridLineOptions extends BasePluginOptions, Pick<BaseStyleProps, 'stroke' | 'lineWidth'> {
  /** <zh/> 单个网格的大小 | <en/> The size of a single grid */
  size?: number;
  /** <zh/> 是否显示边框 | <en/> Whether to show the border */
  border?: boolean;
  /** <zh/> 边框线宽 | <en/> Border line width */
  borderLineWidth?: number;
  /** <zh/> 边框颜色 | <en/> Border color */
  borderStroke?: string;
  /** <zh/> 边框样式 | <en/> Border style */
  borderStyle?: string;
  /** <zh/> 是否跟随图移动 | <en/> Whether to follow with the graph */
  follow?: boolean;
}

export class GridLine extends BasePlugin<GridLineOptions> {
  static defaultOptions: Partial<GridLineOptions> = {
    lineWidth: 1,
    border: true,
    borderLineWidth: 1,
    borderStroke: '#0001',
    borderStyle: 'solid',
    stroke: '#0001',
    size: 20,
    tickCount: 4,
    tickStrokeOpacity: 0.5,
  };

  private $element: HTMLElement = createPluginContainer('grid-line');

  private offset: Point = [0, 0];

  constructor(context: RuntimeContext, options: GridLineOptions) {
    super(context, Object.assign({}, GridLine.defaultOptions, options));

    const $container = this.context.canvas.getContainer()!;
    $container.appendChild(this.$element);

    this.updateStyle();
    this.bindEvents();
  }

  public update(options: Partial<GridLineOptions>) {
    super.update(options);
    this.updateStyle();
  }

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_TRANSFORM, this.onTransform);
  }

  private updateStyle() {
    const { size, stroke, lineWidth, border, borderLineWidth, borderStroke, borderStyle } = this.options;

    Object.assign(this.$element.style, {
      border: border ? `${borderLineWidth}px ${borderStyle} ${borderStroke}` : 'none',
      backgroundImage: `linear-gradient(${stroke} ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(90deg, ${stroke} ${lineWidth}px, transparent ${lineWidth}px)`,
      backgroundSize: `${size}px ${size}px`,
    });
  }

  private updateOffset(delta: Point) {
    this.offset = mod(add(this.offset, delta), this.options.size);
    this.$element.style.backgroundPosition = `${this.offset[0]}px ${this.offset[1]}px`;
  }

  private onTransform = (event: ViewportEvent) => {
    if (!this.options.follow) return;
    const {
      data: { translate },
    } = event;
    if (translate) this.updateOffset(translate);
  };

  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_TRANSFORM, this.onTransform);
    this.$element.remove();
    super.destroy();
  }
}
