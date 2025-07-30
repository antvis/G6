import { Canvas } from '@antv/g';
import { GraphEvent } from '../../constants';
import type { LabelStyleProps } from '../../elements/shapes/label';
import { Label } from '../../elements/shapes/label';
import type { RuntimeContext } from '../../runtime/types';
import type { Prefix } from '../../types';
import { parsePadding } from '../../utils/padding';
import { subStyleProps } from '../../utils/prefix';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { createPluginCanvas } from '../utils/canvas';

const commonStyle: Partial<LabelStyleProps> = {
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
const defaultTitleStyle: Partial<LabelStyleProps> = {
  ...commonStyle,
  fillOpacity: 0.9,
  fontSize: 16,
  fontWeight: 'bold',
};
const defaultSubTitleStyle: Partial<LabelStyleProps> = {
  ...commonStyle,
  fillOpacity: 0.65,
  fontSize: 12,
  fontWeight: 'normal',
};
const defaultOptions: Partial<TitleOptions> = {
  align: 'left',
  spacing: 8,
  size: 44,
  padding: [16, 24, 0, 24],
};

const titleKey = 'title';
const subtitleKey = 'subtitle';

/**
 * <zh/> 标题的样式
 *
 * <en/> Title styles
 */
export type TitleStyle = Prefix<typeof titleKey, Omit<LabelStyleProps, 'x' | 'y' | 'text'>>;
/**
 * <zh/> 副标题的样式
 *
 * <en/> Subtitle styles
 */
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
   * @defaultValue [16, 24, 0, 24]
   */
  padding?: number | number[];
  /**
   * <zh/> 标题内容
   *
   * <en/> title text
   */
  [titleKey]: string;
  /**
   * <zh/> 副标题内容
   *
   * <en/> subtitle text
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
  private canvas!: Canvas;
  private container!: HTMLElement;

  private get padding() {
    return parsePadding(this.options.padding);
  }

  constructor(context: RuntimeContext, options: TitleOptions) {
    const combineOption = Object.assign({}, defaultOptions, options);
    super(context, combineOption);

    this.bindEvents();
  }

  private onRender = () => {
    const canvas = this.updateCanvas();
    this.renderTitle(canvas);
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
        center: 'top',
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

  private renderTitle(canvas: Canvas) {
    const titles = new TitleComponent({
      options: this.options,
      ctx: this.context,
    });

    canvas.removeChildren();
    titles.getTitle().forEach((label) => {
      if (label) canvas.appendChild(label);
    });
  }
}

class TitleComponent {
  private options: TitleOptions;

  private context: RuntimeContext;
  private get padding() {
    return parsePadding(this.options.padding);
  }

  constructor(props: { ctx: RuntimeContext; options: TitleOptions }) {
    const { options, ctx } = props;

    this.options = options;

    this.context = ctx;
  }

  public getTitle() {
    const {
      [titleKey]: propsTitle,
      [subtitleKey]: propsSubtitle,
      spacing = 44,
      padding,
      align,
      ...style
    } = this.options;

    const titleText = propsTitle;
    const subTitleText = propsSubtitle;

    const titleStyle = subStyleProps(style, titleKey) as LabelStyleProps;
    const subtitleStyle = subStyleProps(style, subtitleKey) as LabelStyleProps;

    const [topGraphWidth] = this.context.graph.getSize();
    const [pt = 0, pr = 0, , pl = 0] = this.padding;
    const canvasWidth = topGraphWidth;
    const textWidth = canvasWidth - pl - pr;

    let subTitle: Label | null = null;

    let alignX = pl;
    let textAlign = 'left' as 'left' | 'center' | 'right';

    switch (align) {
      case 'left':
        alignX = pl;
        textAlign = 'left';
        break;
      case 'center':
        alignX = canvasWidth / 2;
        textAlign = 'center';
        break;

      case 'right':
        alignX = canvasWidth - pr;
        textAlign = 'right';
        break;
      default:
        alignX = pl;
        textAlign = 'left';
    }

    const title = new Label({
      className: titleKey,
      style: {
        ...defaultTitleStyle,
        wordWrapWidth: textWidth - 5,
        x: alignX,
        y: pt,
        textAlign,
        ...titleStyle,
        text: titleText,
      },
    });

    const titleBBox = title.getBBox();

    if (subTitleText) {
      subTitle = new Label({
        className: 'subTitle',
        style: {
          ...defaultSubTitleStyle,
          wordWrapWidth: textWidth - 5,
          x: alignX,
          y: titleBBox.height + spacing + pt,
          textAlign,
          ...subtitleStyle,
          text: subTitleText,
        },
      });
    }

    return [title, subTitle];
  }
}
