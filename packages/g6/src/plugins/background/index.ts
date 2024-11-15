import { omit } from '@antv/util';
import type { RuntimeContext } from '../../runtime/types';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { createPluginContainer } from '../utils/dom';

/**
 * <zh/> 背景配置项
 *
 * <en/> Background options
 */
export interface BackgroundOptions extends BasePluginOptions, CSSStyleDeclaration {}

/**
 * <zh/> 背景图
 *
 * <en/> Background image
 * @remarks
 * <zh/> 支持为图画布设置一个背景图片，让画布更有层次感、叙事性。
 *
 * <en/> Support setting a background image for the canvas to make the canvas more hierarchical and narrative.
 */
export class Background extends BasePlugin<BackgroundOptions> {
  static defaultOptions: Partial<BackgroundOptions> = {
    transition: 'background 0.5s',
    backgroundSize: 'cover',
  };

  private $element: HTMLElement = createPluginContainer('background');

  constructor(context: RuntimeContext, options: BackgroundOptions) {
    super(context, Object.assign({}, Background.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    $container!.prepend(this.$element);

    this.update(options);
  }

  /**
   * <zh/> 更新背景图配置
   *
   * <en/> Update the background image configuration
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public async update(options: Partial<BackgroundOptions>) {
    super.update(options);

    // Set the background style.
    Object.assign(this.$element.style, omit(this.options, ['key', 'type']));
  }

  /**
   * <zh/> 销毁背景图
   *
   * <en/> Destroy the background image
   * @internal
   */
  public destroy(): void {
    super.destroy();
    // Remove the background dom.
    this.$element.remove();
  }
}
