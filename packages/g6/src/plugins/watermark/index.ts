import type { RuntimeContext } from '../../runtime/types';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { createPluginContainer } from '../utils/dom';
import { getImageWatermark, getTextWatermark } from './util';

/**
 * <zh/> 水印配置项
 *
 * <en/> Watermark options
 */
export interface WatermarkOptions extends BasePluginOptions {
  /**
   * <zh/> 水印的宽度（单个）
   *
   * <en/> The width of watermark(single)
   * @defaultValue 200
   */
  width?: number;
  /**
   * <zh/> 水印的高度（单个）
   *
   * <en/> The height of watermark(single)
   * @defaultValue 100
   */
  height?: number;
  /**
   * <zh/> 水印的透明度
   *
   * <en/> The opacity of watermark
   * @defaultValue 0.2
   */
  opacity?: number;
  /**
   * <zh/> 水印的旋转角度
   *
   * <en/> The rotate angle of watermark
   * @defaultValue Math.PI / 12
   */
  rotate?: number;
  /**
   * <zh/> 图片地址，如果有值，则使用，否则使用文本
   *
   * <en/> The image url, if it has a value, it will be used, otherwise it will use the text
   */
  imageURL?: string;
  /**
   * <zh/> 水印文本
   *
   * <en/> The text of watermark
   */
  text?: string;
  /**
   * <zh/> 文本水印的文字颜色
   *
   * <en/> The color of text watermark
   * @defaultValue '#000'
   */
  textFill?: string;
  /**
   * <zh/> 文本水印的文本大小
   *
   * <en/> The font size of text watermark
   * @defaultValue 16
   */
  textFontSize?: number;
  /**
   * <zh/> 文本水印的文本字体
   *
   * <en/> The font of text watermark
   */
  textFontFamily?: string;
  /**
   * <zh/> 文本水印的文本字体粗细
   *
   * <en/> The font weight of text watermark
   */
  textFontWeight?: string;
  /**
   * <zh/> 文本水印的文本字体变体
   *
   * <en/> The font variant of text watermark
   */
  textFontVariant?: string;
  /**
   * <zh/> 文本水印的文本对齐方式
   *
   * <en/> The text align of text watermark
   * @defaultValue 'center'
   */
  textAlign?: 'center' | 'end' | 'left' | 'right' | 'start';
  /**
   * <zh/> 文本水印的文本对齐基线
   *
   * <en/> The text baseline of text watermark
   * @defaultValue 'middle'
   */
  textBaseline?: 'alphabetic' | 'bottom' | 'hanging' | 'ideographic' | 'middle' | 'top';
  /**
   * <zh/> 水印的背景定位行为
   *
   * <en/> The background attachment of watermark
   */
  backgroundAttachment?: string;
  /**
   * <zh/> 水印的背景混合
   *
   * <en/> The background blend of watermark
   */
  backgroundBlendMode?: string;
  /**
   * <zh/> 水印的背景裁剪
   *
   * <en/> The background clip of watermark
   */
  backgroundClip?: string;
  /**
   * <zh/> 水印的背景颜色
   *
   * <en/> The background color of watermark
   */
  backgroundColor?: string;
  /**
   * <zh/> 水印的背景图片
   *
   * <en/> The background image of watermark
   */
  backgroundImage?: string;
  /**
   * <zh/> 水印的背景原点
   *
   * <en/> The background origin of watermark
   */
  backgroundOrigin?: string;
  /**
   * <zh/> 水印的背景位置
   *
   * <en/> The background position of watermark
   */
  backgroundPosition?: string;
  /**
   * <zh/> 水印的背景位置-x
   *
   * <en/> The background position-x of watermark
   */
  backgroundPositionX?: string;
  /**
   * <zh/> 水印的背景位置-y
   *
   * <en/> The background position-y of watermark
   */
  backgroundPositionY?: string;
  /**
   * <zh/> 水印的背景重复
   *
   * <en/> The background repeat of watermark
   * @defaultValue 'repeat'
   */
  backgroundRepeat?: string;
  /**
   * <zh/> 水印的背景大小
   *
   * <en/> The background size of watermark
   */
  backgroundSize?: string;
}

/**
 * <zh/> 水印
 *
 * <en/> Watermark
 * @remarks
 * <zh/> 支持使用文本和图片作为水印，实现原理是在 Graph 容器的 div 上加上 `background-image` 属性，然后就可以通过 css 来控制水印的位置和样式。对于文本，会使用隐藏 canvas 转成图片的方式来实现
 *
 * <en/> Support using text and image as watermark, the principle is to add the `background-image` property to the div of the Graph container, and then you can control the position and style of the watermark through css. For text, it will be converted to an image using a hidden canvas
 */
export class Watermark extends BasePlugin<WatermarkOptions> {
  static defaultOptions: Partial<WatermarkOptions> = {
    width: 200,
    height: 100,
    opacity: 0.2,
    rotate: Math.PI / 12,
    text: '',
    textFill: '#000',
    textFontSize: 16,
    textAlign: 'center',
    textBaseline: 'middle',
    backgroundRepeat: 'repeat',
  };

  private $element: HTMLElement = createPluginContainer('watermark');

  constructor(context: RuntimeContext, options: WatermarkOptions) {
    super(context, Object.assign({}, Watermark.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    $container!.appendChild(this.$element);

    this.update(options);
  }

  /**
   * <zh/> 更新水印配置
   *
   * <en/> Update the watermark configuration
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public async update(options: Partial<WatermarkOptions>) {
    super.update(options);

    const { width, height, text, imageURL, ...rest } = this.options;

    // Set the background style.
    Object.keys(rest).forEach((key) => {
      if (key.startsWith('background')) {
        // @ts-expect-error ignore
        this.$element.style[key] = options[key];
      }
    });

    // Set the background image
    const base64 = imageURL
      ? await getImageWatermark(width, height, imageURL, rest)
      : await getTextWatermark(width, height, text, rest);
    this.$element.style.backgroundImage = `url(${base64})`;
  }

  /**
   * <zh/> 销毁水印
   *
   * <en/> Destroy the watermark
   * @internal
   */
  public destroy(): void {
    super.destroy();
    // Remove the background dom.
    this.$element.remove();
  }
}
