import { FederatedMouseEvent } from '@antv/g';
import insertCss from 'insert-css';
import type { RuntimeContext } from '../runtime/types';
import { PluginEvent } from '../types/plugin';
import type { Item } from '../utils/context-menu';
import { ContextMenuCSS, getContentFromItems } from '../utils/context-menu';
import { createPluginContainer } from '../utils/dom';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

/**
 * <zh/> 右键菜单插件的配置项。
 * <en/> The configuration item of the right-click menu plugin.
 */
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
   * <zh/> 菜单显式 X、Y 方向的偏移量，默认是 [4, 4]。
   * <en/> The offset X, y direction of the menu, default is [4, 4].
   */
  offset?: [number, number];
  /**
   * <zh/> 当菜单被点击后，出发的回调方法。
   * <en/> The callback method triggered when the menu is clicked.
   */
  onClick?: (item: Item, target: HTMLElement) => void;
  /**
   * <zh/> 返回菜单的项目列表，支持 `Promise` 类型的返回值。是 `getContextMeunElement` 的快捷配置。
   * <en/> Return the list of menu items, support the `Promise` type return value. It is a shortcut configuration of `getContextMeunElement`.
   */
  getContextMenuItems?: (event: PluginEvent<FederatedMouseEvent>) => Item[] | Promise<Item[]>;
  /**
   * <zh/> 返回菜单的内容，支持 `Promise` 类型的返回值，也可以使用 `getContextMeunItems` 来快捷配置。
   * <en/> Return the content of menu, support the `Promise` type return value, you can also use `getContextMeunItems` for shortcut configuration.
   */
  getContextMenuContent?: (
    event: PluginEvent<FederatedMouseEvent>,
  ) => HTMLElement | string | Promise<HTMLElement | string>;
  /**
   * <zh/> Loading 时候的菜单内容，用于 getContent 返回 Promise 的时候。
   * <en/> The menu content when loading is used when getContent returns a Promise.
   */
  loadingContent: HTMLElement | string;
  /**
   * <zh/> 插件是否可用，通过参数来判断是否支持右键菜单，默认全部可用。
   * <en/> Whether the plugin is available, determine whether the right-click menu is supported through parameters, The default is all available.
   */
  enable?: boolean | ((event: PluginEvent<FederatedMouseEvent>) => boolean);
};

/**
 * <zh/> 支持处理事件，并显示右键菜单，在菜单点击之后，可以触发相应的事件。
 * <en/> Support processing events and displaying right-click menus.
 *       After clicking the menu, you can trigger the corresponding event.
 */
export class ContextMenu extends BasePlugin<ContextMenuOptions> {
  static defaultOptions: Partial<ContextMenuOptions> = {
    trigger: 'contextmenu',
    offset: [4, 4],
    loadingContent: '<div class="g6-contextmenu-loading">Loading...</div>',
    getContextMeunContent: () => 'This is a context menu.',
    enable: () => true,
  };

  private $element: HTMLElement = createPluginContainer('contextmenu', false);

  constructor(context: RuntimeContext, options: ContextMenuOptions) {
    super(context, Object.assign({}, ContextMenu.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    $container!.appendChild(this.$element);
    // 设置样式
    insertCss(ContextMenuCSS);

    const { trigger } = this.options;

    this.context.graph.on(trigger, this.onTriggerEvent);

    this.update(options);
  }

  /**
   * <zh/> 根据传入的元素，显示右键菜单。
   * <en/> Display the right-click menu based on the incoming element.
   * @param e - 事件
   */
  public async showContextMenu(e: PluginEvent<FederatedMouseEvent>) {
    const { enable, offset } = this.options;

    if ((typeof enable === 'function' && !enable(e)) || !enable) {
      return;
    }

    const content = await this.getContent(e);

    if (content instanceof HTMLElement) {
      this.$element.appendChild(content);
    } else {
      this.$element.innerHTML = content;
    }

    this.$element.style.left = `${e.client.x + offset[0]}px`;
    this.$element.style.top = `${e.client.y + offset[1]}px`;
    this.$element.style.display = 'block';
  }

  /**
   * <zh/> 隐藏右键菜单。
   * <en/> Hide the right-click menu.
   */
  public hideContextMenu() {
    this.$element.style.display = 'none';
  }

  /**
   * <zh/> 更新右键菜单的配置项。
   * <en/> Update the configuration of the right-click menu.
   * @param options - 配置项
   */
  public update(options: Partial<ContextMenuOptions>) {
    super.update(options);
  }

  /**
   * <zh/> 销毁右键菜单。
   * <en/> Destroy the right-click menu.
   */
  public destroy(): void {
    super.destroy();
    this.$element.remove();
  }

  private async getContent(e: PluginEvent<FederatedMouseEvent>) {
    const { getContextMenuContent, getContextMenuItems } = this.options;

    if (getContextMenuItems) {
      return getContentFromItems(await getContextMenuItems(e));
    }
    return await getContextMenuContent(e);
  }

  private onTriggerEvent = (e: any) => {
    // todo
    console.log(e);
    this.showContextMenu(e);
  };
}
