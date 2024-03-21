import type { RuntimeContext } from '../runtime/types';
import { createPluginContainer } from '../utils/dom';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

export type ContextMenuOptions = BasePluginOptions & {
  /**
   * <zh/> 给菜单的 DOM 追加的 classname，便于自定义样式。默认是包含 `g6-contextmenu`。
   * <en/> The classname appended to the menu DOM for custom styles. The default is `g6-contextmenu`.
   */
  className?: string;
  /**
   * <zh/> 如何触发右键菜单，可以是 'click' 或者 'contextmenu'，默认是 'contextmenu'。
   * <en/> How to trigger the context menu, default is 'contextmenu'.
   */
  trigger?: 'click' | 'contextmenu';
  /**
   * <zh/> 菜单显式 X 方向的偏移量，默认是 4。
   * <en/> The offset X direction of the menu, default is 4.
   */
  offsetX?: number;
  /**
   * <zh/> 菜单显式 Y 方向的偏移量，默认是 4。
   * <en/> The offset Y direction of the menu, default is 4.
   */
  offsetY?: number;
  /**
   * <zh/> 当菜单被点击后，出发的回调方法。
   * <en/> The callback method triggered when the menu is clicked.
   */
  onClick?: (target: HTMLElement, item: any) => void;
  /**
   * <zh/> 返回菜单的内容，支持 `Promise` 类型的返回值。
   * <en/> Return the content of menu, support the `Promise` type return value.
   */
  getContent?: () => HTMLElement | string | Promise<HTMLElement | string>;
  /**
   * <zh/> Loading 时候的菜单内容，用于 getContent 返回 Promise 的时候。
   * <en/> The menu content when loading is used when getContent returns a Promise.
   */
  loadingContent: HTMLElement | string;
  /**
   * <zh/> 插件是否可用，通过参数来判断是否支持右键菜单，默认全部可用。
   * <en/> Whether the plugin is available, determine whether the right-click menu is supported through parameters, The default is all available.
   */
  enable?: (itemType: 'node' | 'edge' | 'combo', evt: any) => boolean;
};

/**
 * <zh/> 支持处理事件，并显示右键菜单，在菜单点击之后，可以触发相应的事件。
 * <en/> Support processing events and displaying right-click menus.
 *       After clicking the menu, you can trigger the corresponding event.
 */
export class ContextMenu extends BasePlugin<ContextMenuOptions> {
  static defaultOptions: Partial<ContextMenuOptions> = {
    trigger: 'contextmenu',
    offsetX: 4,
    offsetY: 4,
    loadingContent: '<div class="g6-contextmenu-loading">Loading...</div>',
    enable: () => true,
  };

  private $element: HTMLElement = createPluginContainer('contextmenu');

  constructor(context: RuntimeContext, options: ContextMenuOptions) {
    super(context, Object.assign({}, ContextMenu.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    $container!.appendChild(this.$element);

    this.update(options);
  }

  public async update(options: Partial<ContextMenuOptions>) {
    super.update(options);
  }

  public destroy(): void {
    super.destroy();
    this.$element.remove();
  }
}
