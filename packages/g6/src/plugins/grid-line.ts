import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { Point } from '../types';
import { ViewportEvent } from '../utils/event';
import { add, mod } from '../utils/vector';
import { BasePlugin, BasePluginOptions } from './base-plugin';
import { createPluginContainer } from './utils/dom';

/**
 * <zh/> 网格线配置项
 *
 * <en/> Grid line options
 */
export interface GridLineOptions extends BasePluginOptions {
  /**
   * <zh/> 网格线颜色
   *
   * <en/> Grid line color
   * @defaultValue '#0001'
   */
  stroke?: string;
  /**
   * <zh/> 网格线宽
   *
   * <en/> Grid line width
   * @defaultValue 1
   */
  lineWidth?: number | string;
  /**
   * <zh/> 单个网格的大小
   *
   * <en/> The size of a single grid
   * @defaultValue 20
   */
  size?: number;
  /**
   * <zh/> 是否显示边框
   *
   * <en/> Whether to show the border
   * @defaultValue true
   */
  border?: boolean;
  /**
   * <zh/> 边框线宽
   *
   * <en/> Border line width
   * @defaultValue 1
   */
  borderLineWidth?: number;
  /**
   * <zh/> 边框颜色
   *
   * <en/> Border color
   * @defaultValue '#0001'
   * @remarks
   * <zh/> 完整属性定义参考 [CSS border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)
   *
   * <en/> Refer to [CSS border-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) for the complete property definition
   */
  borderStroke?: string;
  /**
   * <zh/> 边框样式
   *
   * <en/> Border style
   * @defaultValue 'solid'
   * @remarks
   * <zh/> 完整属性定义参考 [CSS border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)
   *
   * <en/> Refer to [CSS border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style) for the complete property definition
   */
  borderStyle?: string;
  /**
   * <zh/> 是否跟随图移动
   *
   * <en/> Whether to follow with the graph
   * @defaultValue false
   */
  follow?: boolean;
}

/**
 * <zh/> 网格线
 *
 * <en/> Grid line
 * @remarks
 * <zh/> 网格线插件，多用于辅助绘图
 *
 * <en/> Grid line plugin, often used to auxiliary drawing
 */
export class GridLine extends BasePlugin<GridLineOptions> {
  static defaultOptions: Partial<GridLineOptions> = {
    border: true,
    borderLineWidth: 1,
    borderStroke: '#eee',
    borderStyle: 'solid',
    lineWidth: 1,
    size: 20,
    stroke: '#eee',
  };

  private $element: HTMLElement = createPluginContainer('grid-line', true);

  private offset: Point = [0, 0];

  constructor(context: RuntimeContext, options: GridLineOptions) {
    super(context, Object.assign({}, GridLine.defaultOptions, options));

    const $container = this.context.canvas.getContainer()!;
    $container.prepend(this.$element);

    this.updateStyle();
    this.bindEvents();
  }

  /**
   * <zh/> 更新网格线配置
   *
   * <en/> Update the configuration of the grid line
   * @param options - <zh/> 配置项 | <en/> options
   * @internal
   */
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

  /**
   * <zh/> 销毁网格线
   *
   * <en/> Destroy the grid line
   * @internal
   */
  public destroy(): void {
    this.context.graph.off(GraphEvent.AFTER_TRANSFORM, this.onTransform);
    this.$element.remove();
    super.destroy();
  }
}
