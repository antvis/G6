import { FederatedMouseEvent } from '@antv/g';
import insertCss from 'insert-css';
import type { RuntimeContext } from '../runtime/types';
import { PluginEvent } from '../types/plugin';
import type { Item } from '../utils/contextmenu';
import { ContextmenuCSS, getContentFromItems } from '../utils/contextmenu';
import { createPluginContainer } from '../utils/dom';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

/**
 * <zh/> 右键菜单插件的配置项。
 * <en/> The configuration item of the right-click menu plugin.
 */
export type ContextmenuOptions = BasePluginOptions & {
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
  onClick?: (v: string, target: HTMLElement) => void;
  /**
   * <zh/> 返回菜单的项目列表，支持 `Promise` 类型的返回值。是 `getContextMeunElement` 的快捷配置。
   * <en/> Return the list of menu items, support the `Promise` type return value. It is a shortcut configuration of `getContextMeunElement`.
   */
  getContextmenuItems?: (event: PluginEvent<FederatedMouseEvent>) => Item[] | Promise<Item[]>;
  /**
   * <zh/> 返回菜单的内容，支持 `Promise` 类型的返回值，也可以使用 `getContextMeunItems` 来快捷配置。
   * <en/> Return the content of menu, support the `Promise` type return value, you can also use `getContextMeunItems` for shortcut configuration.
   */
  getContextmenuContent?: (
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
export class Contextmenu extends BasePlugin<ContextmenuOptions> {
  static defaultOptions: Partial<ContextmenuOptions> = {
    trigger: 'contextmenu',
    offset: [4, 4],
    loadingContent: '<div class="g6-contextmenu-loading">Loading...</div>',
    getContextMeunContent: () => 'It is a empty context menu.',
    enable: () => true,
  };

  private $element: HTMLElement = createPluginContainer('contextmenu', false);

  constructor(context: RuntimeContext, options: ContextmenuOptions) {
    super(context, Object.assign({}, Contextmenu.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    $container!.appendChild(this.$element);

    // 设置样式
    insertCss(ContextmenuCSS);

    this.update(options);
  }

  /**
   * <zh/> 根据传入的元素，显示右键菜单。
   * <en/> Display the right-click menu based on the incoming element.
   * @param e - 事件
   */
  public async showContextmenu(e: PluginEvent<FederatedMouseEvent>) {
    const { enable, offset } = this.options;

    if ((typeof enable === 'function' && !enable(e)) || !enable) {
      this.hideContextmenu();
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
  public hideContextmenu() {
    this.$element.style.display = 'none';
  }

  /**
   * <zh/> 更新右键菜单的配置项。
   * <en/> Update the configuration of the right-click menu.
   * @param options - 配置项
   */
  public update(options: Partial<ContextmenuOptions>) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  /**
   * <zh/> 销毁右键菜单。
   * <en/> Destroy the right-click menu.
   */
  public destroy(): void {
    this.unbindEvents();
    super.destroy();
    this.$element.remove();
  }

  private async getContent(e: PluginEvent<FederatedMouseEvent>) {
    const { getContextmenuContent, getContextmenuItems } = this.options;

    if (getContextmenuItems) {
      return getContentFromItems(await getContextmenuItems(e));
    }
    return await getContextmenuContent(e);
  }

  private bindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;

    graph.on(`canvas:${trigger}`, this.onTriggerEvent);
    graph.on(`node:${trigger}`, this.onTriggerEvent);
    graph.on(`edge:${trigger}`, this.onTriggerEvent);
    graph.on(`combo:${trigger}`, this.onTriggerEvent);

    document.addEventListener('click', this.onMenuItemClick);
  }

  private unbindEvents() {
    const { graph } = this.context;
    const { trigger } = this.options;

    graph.off(`canvas:${trigger}`, this.onTriggerEvent);
    graph.off(`node:${trigger}`, this.onTriggerEvent);
    graph.off(`edge:${trigger}`, this.onTriggerEvent);
    graph.off(`combo:${trigger}`, this.onTriggerEvent);

    document.removeEventListener('click', this.onMenuItemClick);
  }

  private onTriggerEvent = (e: PluginEvent<FederatedMouseEvent>) => {
    e.preventDefault?.();
    this.showContextmenu(e);
  };

  private onMenuItemClick = (e: MouseEvent) => {
    const { onClick } = this.options;
    if (e.target instanceof HTMLElement) {
      if (e.target.className.includes('g6-contextmenu-li')) {
        const v = e.target.getAttribute('value') as string;
        onClick && onClick(v, e.target);

        this.hideContextmenu();
      }

      // 点击其他地方，隐藏菜单
      if (!this.context.graph.getCanvas().getContainer()!.contains(e.target)) {
        this.hideContextmenu();
      }
    }
  };
}
