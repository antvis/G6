import type { RuntimeContext } from '../runtime/types';
import type { IElementEvent } from '../types/event';
import type { Item } from '../utils/contextmenu';
import { CONTEXTMENU_CSS, getContentFromItems } from '../utils/contextmenu';
import { createPluginContainer, insertDOM } from '../utils/dom';
import type { BasePluginOptions } from './base-plugin';
import { BasePlugin } from './base-plugin';

/**
 * <zh/> 右键菜单插件的配置项。
 * <en/> The configuration item of the right-click menu plugin.
 */
export interface ContextmenuOptions extends BasePluginOptions {
  /**
   * <zh/> 给菜单的 DOM 追加的 classname，便于自定义样式。默认是包含 `g6-contextmenu`。
   *
   * <en/> The classname appended to the menu DOM for custom styles. The default is `g6-contextmenu`.
   * @defaultValue 'g6-contextmenu'
   */
  className?: string;
  /**
   * <zh/> 如何触发右键菜单，可以是 'click' 或者 'contextmenu'
   * - click : 点击触发
   * - contextmenu : 右键触发
   *
   * <en/> How to trigger the context menu
   * - click : Click trigger
   * - contextmenu : Right-click trigger
   * @defaultValue 'contextmenu'
   */
  trigger?: 'click' | 'contextmenu';
  /**
   * <zh/> 菜单显式 X、Y 方向的偏移量
   *
   * <en/> The offset X, y direction of the menu
   * @defaultValue [4, 4]
   */
  offset?: [number, number];
  /**
   * <zh/> 当菜单被点击后，触发的回调方法。
   *
   * <en/> The callback method triggered when the menu is clicked.
   */
  onClick?: (v: string, target: HTMLElement) => void;
  /**
   * <zh/> 返回菜单的项目列表，支持 Promise` 类型的返回值。是 `getContent` 的快捷配置。
   *
   * <en/> Return the list of menu items, support the `Promise` type return value. It is a shortcut configuration of `getContent`.
   */
  getItems?: (event: IElementEvent) => Item[] | Promise<Item[]>;
  /**
   * <zh/> 返回菜单的内容，支持 `Promise` 类型的返回值，也可以使用 `getItems` 来快捷配置。
   *
   * <en/> Return the content of menu, support the `Promise` type return value, you can also use `getItems` for shortcut configuration.
   */
  getContent?: (event: IElementEvent) => HTMLElement | string | Promise<HTMLElement | string>;
  /**
   * <zh/> Loading 时候的菜单内容，用于 getContent 返回 Promise 的时候。
   *
   * <en/> The menu content when loading is used when getContent returns a Promise.
   */
  loadingContent: HTMLElement | string;
  /**
   * <zh/> 插件是否可用，通过参数来判断是否支持右键菜单，默认全部可用。
   *
   * <en/> Whether the plugin is available, determine whether the right-click menu is supported through parameters, The default is all available.
   * @defaultValue true
   */
  enable?: boolean | ((event: IElementEvent) => boolean);
}

/**
 * <zh/> 支持处理事件，并显示右键菜单，在菜单点击之后，可以触发相应的事件。
 *
 * <en/> Support processing events and displaying right-click menus. After clicking the menu, you can trigger the corresponding event.
 */
export class Contextmenu extends BasePlugin<ContextmenuOptions> {
  static defaultOptions: Partial<ContextmenuOptions> = {
    trigger: 'contextmenu',
    offset: [4, 4],
    loadingContent: '<div class="g6-contextmenu-loading">Loading...</div>',
    getContent: () => 'It is a empty context menu.',
    enable: () => true,
  };

  private $element: HTMLElement = createPluginContainer('contextmenu', false);

  constructor(context: RuntimeContext, options: ContextmenuOptions) {
    super(context, Object.assign({}, Contextmenu.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    $container!.appendChild(this.$element);

    // 设置样式
    insertDOM('g6-contextmenu-css', 'style', {}, CONTEXTMENU_CSS, document.head);

    this.update(options);
  }

  /**
   * <zh/> 根据传入的元素，显示右键菜单。
   *
   * <en/> Display the right-click menu based on the incoming element.
   * @param event - 事件
   */
  public async showContextmenu(event: IElementEvent) {
    const { enable, offset } = this.options;

    if ((typeof enable === 'function' && !enable(event)) || !enable) {
      this.hideContextmenu();
      return;
    }

    const content = await this.getDOMContent(event);

    if (content instanceof HTMLElement) {
      this.$element.appendChild(content);
    } else {
      this.$element.innerHTML = content;
    }

    // NOTICE: 为什么事件中的 client 是相对浏览器，而不是画布容器？
    const clientRect = this.context.graph.getCanvas().getContainer()!.getBoundingClientRect();

    this.$element.style.left = `${event.client.x - clientRect.left + offset[0]}px`;
    this.$element.style.top = `${event.client.y - clientRect.top + offset[1]}px`;
    this.$element.style.display = 'block';
  }

  /**
   * <zh/> 隐藏右键菜单。
   *
   * <en/> Hide the right-click menu.
   */
  public hideContextmenu() {
    this.$element.style.display = 'none';
  }

  /**
   * <zh/> 更新右键菜单的配置项。
   *
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
   *
   * <en/> Destroy the right-click menu.
   */
  public destroy(): void {
    this.unbindEvents();
    super.destroy();
    this.$element.remove();
  }

  private async getDOMContent(event: IElementEvent) {
    const { getContent, getItems } = this.options;

    if (getItems) {
      return getContentFromItems(await getItems(event));
    }
    return await getContent(event);
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

  private onTriggerEvent = (event: IElementEvent) => {
    // `contextmenu` 事件默认会触发浏览器的右键菜单，需要阻止默认事件
    // `click` 事件不需要阻止默认事件
    event.preventDefault?.();
    this.showContextmenu(event);
  };

  private onMenuItemClick = (event: MouseEvent) => {
    const { onClick } = this.options;
    if (event.target instanceof HTMLElement) {
      if (event.target.className.includes('g6-contextmenu-li')) {
        const v = event.target.getAttribute('value') as string;
        onClick && onClick(v, event.target);

        this.hideContextmenu();
      }

      // 点击其他地方，隐藏菜单
      if (!this.context.graph.getCanvas().getContainer()!.contains(event.target)) {
        this.hideContextmenu();
      }
    }
  };
}
