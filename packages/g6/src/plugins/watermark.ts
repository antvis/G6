import type { RuntimeContext } from '../runtime/types';
import { PrefixObject } from '../types';
import { TextStyle, getTextWateramrk } from '../utils/canvas';
import { subStyleProps } from '../utils/prefix';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

type CSSBackground = {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-attachment) */
  backgroundAttachment: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-blend-mode) */
  backgroundBlendMode: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-clip) */
  backgroundClip: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-color) */
  backgroundColor: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-image) */
  backgroundImage: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-origin) */
  backgroundOrigin: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-position) */
  backgroundPosition: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-position-x) */
  backgroundPositionX: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-position-y) */
  backgroundPositionY: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-repeat) */
  backgroundRepeat: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-size) */
  backgroundSize: string;
};

export type WatermarkOptions = BasePluginOptions & {
  // 单独一个水印的大小，这个水印最终会用来填充整个大小，所以 repeat 后的间距大小，通过这个 width height 设置
  width?: number;
  height?: number;
  // 图片地址，如果有值，则使用，否则使用文本
  imageURL?: string;
  /** 水印文本 */
  text?: string;
  // 文本水印的文本样式
} & PrefixObject<Partial<TextStyle>, 'text'> &
  // 水印作为 CSS background 的配置
  CSSBackground;

/**
 * <zh/> 支持使用文本和图片作为水印，实现原理是在 Graph 容器的 div 上加上 background-image 属性，然后就可以通过 css 来控制水印的位置和样式。对于文本，会使用隐藏 canvas 转成图片的方式来实现。
 * <en/> Support using text and images as watermarks. The principle is to add the background-image property to the div of the Graph container, and then you can control the position and style of the watermark through css. For text, it will be converted to an image using a hidden canvas.
 */
export class Watermark extends BasePlugin<WatermarkOptions> {
  static defaultOptions: Partial<WatermarkOptions> = {
    width: 200,
    height: 100,
    textRotate: -Math.PI / 12,
    textFontSize: 16,
    textFill: '#000',
    textOpacity: 0.2,
    textAlign: 'center',
    textBaseline: 'middle',
  };

  constructor(context: RuntimeContext, options: WatermarkOptions) {
    super(context, Object.assign({}, Watermark.defaultOptions, options));

    this.update(options);
  }

  public update(options: Partial<WatermarkOptions>) {
    super.update(options);
    const { graph } = this.context;
    const container = graph.getCanvas().getContainer()!;

    const { width, height, imageURL, ...rest } = options;

    // Set the background style.
    Object.keys(rest).forEach((key) => {
      if (key.startsWith('background')) {
        container.style[key as keyof CSSBackground] = options[key];
      }
    });

    // Set the background image.
    container.style.backgroundImage = `url(${this.getImageURL()})`;
  }

  private getImageURL() {
    const { width, height, imageURL, text, ...rest } = this.options;

    console.log({ ...subStyleProps(rest, 'text'), text });

    return imageURL ? imageURL : getTextWateramrk(width, height, { ...subStyleProps(rest, 'text'), text });
  }

  public destroy(): void {
    super.destroy();

    const { graph } = this.context;
    const container = graph.getCanvas().getContainer()!;

    // Remove the background image.
    container.style.backgroundImage = '';
  }
}
