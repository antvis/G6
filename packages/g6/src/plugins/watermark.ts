import type { RuntimeContext } from '../runtime/types';
import { getImageWatermark, getTextWateramrk } from '../utils/watermark';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

export type WatermarkOptions = BasePluginOptions & {
  // 单独一个水印的大小，这个水印最终会用来填充整个大小，所以 repeat 后的间距大小，通过这个 width height 设置
  width?: number;
  height?: number;
  /** 透明度 */
  opacity?: number;
  /** 旋转角度 */
  rotate?: number;
  // 图片地址，如果有值，则使用，否则使用文本
  imageURL?: string;
  /** 水印文本 */
  text?: string;
  // 文本水印的文本样式
  textFill: string;
  textFontSize: number;
  textFontFamily: string;
  textFontWeight: string;
  textFontVariant: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  // 背景的 CSS 样式
  backgroundAttachment: string;
  backgroundBlendMode: string;
  backgroundClip: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundOrigin: string;
  backgroundPosition: string;
  backgroundPositionX: string;
  backgroundPositionY: string;
  backgroundRepeat: string;
  backgroundSize: string;
};

/**
 * <zh/> 支持使用文本和图片作为水印，实现原理是在 Graph 容器的 div 上加上 background-image 属性，然后就可以通过 css 来控制水印的位置和样式。对于文本，会使用隐藏 canvas 转成图片的方式来实现。
 * <en/> Support using text and images as watermarks. The principle is to add the background-image property to the div of the Graph container, and then you can control the position and style of the watermark through css. For text, it will be converted to an image using a hidden canvas.
 */
export class Watermark extends BasePlugin<WatermarkOptions> {
  static defaultOptions: Partial<WatermarkOptions> = {
    width: 200,
    height: 100,
    opacity: 0.2,
    rotate: Math.PI / 12,
    textFill: '#000',
    textFontSize: 16,
    textAlign: 'center',
    textBaseline: 'middle',
    backgroundRepeat: 'repeat',
  };

  constructor(context: RuntimeContext, options: WatermarkOptions) {
    super(context, Object.assign({}, Watermark.defaultOptions, options));

    this.update(options);
  }

  public async update(options: Partial<WatermarkOptions>) {
    super.update(options);

    const { graph } = this.context;
    const container = graph.getCanvas().getContainer()!;

    const { width, height, text, imageURL, ...rest } = this.options;

    // Set the background style.
    Object.keys(rest).forEach((key) => {
      if (key.startsWith('background')) {
        // @ts-expect-error ignore
        container.style[key] = options[key];
      }
    });

    // Set the background image.
    const base64 = imageURL
      ? await getImageWatermark(width, height, imageURL, rest)
      : await getTextWateramrk(width, height, text, rest);
    container.style.backgroundImage = `url(${base64})`;
  }

  public destroy(): void {
    super.destroy();

    const { graph } = this.context;
    const container = graph.getCanvas().getContainer()!;

    // Remove the background image.
    container.style.backgroundImage = '';
  }
}
