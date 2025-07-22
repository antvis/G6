import { Canvas } from '@antv/g';
import { GraphEvent } from '../../constants';
import type { LabelStyleProps } from '../../elements/shapes/label';
import { Label } from '../../elements/shapes/label';
import type { RuntimeContext } from '../../runtime/types';
import type { Prefix } from '../../types';
import { parsePadding } from '../../utils/padding';
import { subObject } from '../../utils/prefix';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { createPluginCanvas } from '../utils/canvas';

const titleKey = 'title';
const subtitleKey = 'subtitle';

export type TitleStyle = Prefix<typeof titleKey, Omit<LabelStyleProps, 'x' | 'y' | 'text'>>;
export type SubTitleStyle = Prefix<typeof subtitleKey, Omit<LabelStyleProps, 'x' | 'y' | 'text'>>;

/**
 * <zh/> 标题插件配置项
 *
 * <en/> Title plugin options
 */
export interface TitleOptions extends BasePluginOptions, TitleStyle, SubTitleStyle {
  /**
   * <zh/> 整个标题的高度
   *
   * <en/> whole title height
   * @defaultValue 44
   */
  size?: number;
  /**
   * <zh/> 整个标题位于图的位置
   *
   * <en/> The entire title is located at the position of the graph
   * @defaultValue 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * <zh/> 主标题、副标题之间的上下间距
   *
   * <en/> The y spacing between the title and subtitle
   * @defaultValue 8
   */
  spacing?: number;
  /**
   * <zh/> 标题内边距
   *
   * <en/> whole title padding
   * @defaultValue []
   */
  padding?: number | number[];
  /**
   * <zh/> 标题内容，或标题配置项
   *
   * <en/> title text or title config
   */
  [titleKey]: string;
  /**
   * <zh/> 副标题内容，或副标题配置项
   *
   * <en/> subtitle text or subtitle config
   */
  [subtitleKey]?: string | null;
  /**
   * <zh/> 标题画布类名，传入外置容器时不生效
   *
   * <en/> The class name of the title canvas, which does not take effect when an external container is passed in
   */
  className?: string;
}

export class Title extends BasePlugin<TitleOptions> {
  private static commonStyle: Partial<LabelStyleProps> = {
    fill: '#1D2129',
    wordWrap: true, // 自动换行
    maxLines: 1, // 最大行数
    textOverflow: 'ellipsis', // 溢出隐藏省略号
    textBaseline: 'top',

    /**
     * textAlign 需要和 x 结合使用
     * 举例: 前提条件: 画布 width = 600
     * - textAlign: 'start' | 'left
     *    需要设 x = 0
     * - textAlign: 'end' | 'right'
     *    需要设 x = 600 (即画布的宽度)
     * - textAlign: 'center'
     *    需要设 x = 300 (即画布的宽度 / 2)
     */
    textAlign: 'start',
    x: 0,
  };
  private static defaultTitleStyle: Partial<LabelStyleProps> = {
    ...this.commonStyle,
    fillOpacity: 0.9,
    fontSize: 16,
    fontWeight: 'bold',
  };
  private static defaultSubTitleStyle: Partial<LabelStyleProps> = {
    ...this.commonStyle,
    fillOpacity: 0.65,
    fontSize: 12,
    fontWeight: 'normal',
  };
  private static defaultOptions: Partial<TitleOptions> = {
    align: 'left',
    spacing: 8,
    size: 44,
    padding: [16, 24, 0, 24],
  };

  private canvas!: Canvas;
  private container!: HTMLElement;

  private get padding() {
    return parsePadding(this.options.padding);
  }

  public get height() {
    const [pt, , pb] = this.padding;
    return this.options.size + pt + pb;
  }

  constructor(context: RuntimeContext, options: TitleOptions) {
    const combineOption = Object.assign({}, Title.defaultOptions, options);
    super(context, combineOption);

    this.bindEvents();
  }

  private onRender = () => {
    const canvas = this.updateCanvas();
    this.getTitle(canvas);
  };

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_RENDER, this.onRender);
    graph.on(GraphEvent.AFTER_ANIMATE, this.onRender);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_RENDER, this.onRender);
    graph.off(GraphEvent.AFTER_ANIMATE, this.onRender);
  }

  public destroy(): void {
    this.unbindEvents();
    this.canvas?.destroy();
    this.container?.remove();
    super.destroy();
  }

  private updateCanvas() {
    const { size, className, align } = this.options;
    const [width] = this.context.canvas.getSize();
    const [pt = 0, , pb = 0] = this.padding;
    const height = size + pt + pb;

    if (this.canvas) {
      const { width: w, height: h } = this.canvas.getConfig();
      if (width !== w || height !== h) this.canvas.resize(width, height);
    } else {
      const positions = {
        left: 'left-top',
        center: 'center',
        right: 'right-top',
      } as const;

      const [$container, canvas] = createPluginCanvas({
        width,
        height,
        placement: positions[align] || positions.left,
        className: 'title-canvas',
        graphCanvas: this.context.canvas,
      });

      if (className) $container.classList.add(className);

      this.container = $container;
      this.canvas = canvas;
    }

    return this.canvas;
  }

  private getTitle(canvas: Canvas) {
    const { [titleKey]: propsTitle, [subtitleKey]: propsSubtitle, spacing, padding, ...style } = this.options;

    const titleText = propsTitle;
    const subTitleText = propsSubtitle;

    const titleStyle = subObject(style, titleKey) as LabelStyleProps;
    const subtitleStyle = subObject(style, subtitleKey) as LabelStyleProps;

    const [topGraphWidth] = this.context.graph.getSize();
    const [pt = 0, pr = 0, , pl = 0] = this.padding;
    const canvasWidth = topGraphWidth;
    const textWidth = canvasWidth - pl - pr;

    let subTitle: Label | null = null;

    const title = new Label({
      className: titleKey,
      style: {
        ...Title.defaultTitleStyle,
        wordWrapWidth: textWidth - 5,
        ...titleStyle,
        text: titleText,
        x: pl,
        y: pt,
      },
    });

    const titleBBox = title.getBBox();

    if (subTitleText) {
      subTitle = new Label({
        className: 'subTitle',
        style: {
          ...Title.defaultSubTitleStyle,
          wordWrapWidth: textWidth - 5,
          ...subtitleStyle,
          text: subTitleText,
          x: pl,
          y: titleBBox.height + spacing + pt,
        },
      });
    }

    // 居中
    if (title.attributes.textAlign === 'center') title.setAttribute('x', canvasWidth / 2);
    if (subTitle && subTitle.attributes.textAlign === 'center') subTitle.setAttribute('x', canvasWidth / 2);
    // 居左
    if (['start', 'left'].includes(title.attributes.textAlign!)) title.setAttribute('x', pl);
    if (subTitle && ['start', 'left'].includes(subTitle.attributes.textAlign!)) subTitle.setAttribute('x', pl);
    // 居右
    if (['end', 'right'].includes(title.attributes.textAlign!)) title.setAttribute('x', canvasWidth - pr);
    if (subTitle && ['end', 'right'].includes(subTitle.attributes.textAlign!))
      subTitle.setAttribute('x', canvasWidth - pr);

    // 更改了label属性需要重新渲染一下
    title.render();
    subTitle && subTitle.render();

    canvas.removeChildren();
    canvas.appendChild(title);
    if (subTitle) canvas.appendChild(subTitle);
  }
}
