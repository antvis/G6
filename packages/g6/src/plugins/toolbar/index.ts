import { insertCss } from 'insert-css';
import type { RuntimeContext } from '../../runtime/types';
import { createPluginContainer } from '../../utils/dom';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import type { Position, ToolbarItem } from './util';
import { BUILDIN_SVG_ICON, TOOLBAR_CSS, parsePositionToStyle } from './util';

/**
 * <zh/> Toolbar 工具栏的配置项。
 * <en/> The configuration item of the Toolbar toolbar.
 */
export type ToolbarOptions = BasePluginOptions & {
  /**
   * <zh/> 给工具栏的 DOM 追加的 classname，便于自定义样式。默认是包含 `g6-toolbar`。
   * <en/> The classname appended to the menu DOM for custom styles. The default is `g6-toolbar`.
   */
  className?: string;
  /**
   * <zh/> Toolbar 的位置，相对于画布，默认为 `top-left`，最终会影响 DOM 的 style 样式。
   * <en/> The position of the Toolbar relative to the canvas, default is `top-left`, which will ultimately affect the style of the DOM.
   */
  position: Position;
  /**
   * <zh/> 工具栏显式的 style 样式，可以用来设置它相对于画布的位置、背景容器样式等。
   * <en/> The style style of the Toolbar, which can be used to set its position relative to the canvas.
   */
  style?: Partial<CSSStyleDeclaration>;
  /**
   * <zh/> 当工具栏被点击后，触发的回调方法。
   * <en/> The callback method triggered when the toolbar item is clicked.
   */
  onClick?: (v: string, target: Element) => void;
  /**
   * <zh/> 返回工具栏的项目列表，支持 `Promise` 类型的返回值。
   * <en/> Return the list of toolbar items, support return a `Promise` as items.
   */
  getItems?: () => ToolbarItem[] | Promise<ToolbarItem[]>;
  /**
   * <zh/> 插件是否可用，通过参数来判断是否支持右键菜单，默认全部可用。
   * <en/> Whether the plugin is available, determine whether the right-click menu is supported through parameters, The default is all available.
   */
  enable?: boolean;
};

/**
 * <zh/> 支持处理事件，并显示右键菜单，在菜单点击之后，可以触发相应的事件。
 * <en/> Support processing events and displaying right-click menus.
 *       After clicking the menu, you can trigger the corresponding event.
 */
export class Toolbar extends BasePlugin<ToolbarOptions> {
  static defaultOptions: Partial<ToolbarOptions> = {
    position: 'top-left',
    onClick: () => {},
    getItems: () => [
      { id: 'zoom-in', value: 'zoom-in' },
      { id: 'zoom-out', value: 'zoom-out' },
    ],
    enable: true,
  };

  private $element: HTMLElement = createPluginContainer('toolbar', false);

  constructor(context: RuntimeContext, options: ToolbarOptions) {
    super(context, Object.assign({}, Toolbar.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    this.$element.style.display = 'flex';
    $container!.appendChild(this.$element);

    // 设置样式
    insertCss(TOOLBAR_CSS);
    const div = document.createElement('div');
    div.innerHTML = BUILDIN_SVG_ICON;
    document.head.appendChild(div);

    this.$element.addEventListener('click', this.onToolbarItemClick);

    this.update(options);
  }

  /**
   * <zh/> 更新右键菜单的配置项。
   * <en/> Update the configuration of the right-click menu.
   * @param options - 配置项
   */
  public async update(options: Partial<ToolbarOptions>) {
    super.update(options);

    const { className, position, style } = this.options;

    this.$element.className = `g6-toolbar ${className || ''}`;

    // 设置容器的样式，主要是位置，背景之类的
    Object.assign(this.$element.style, style, parsePositionToStyle(position));

    this.$element.innerHTML = await this.getDOMContent();
  }

  /**
   * <zh/> 销毁右键菜单。
   * <en/> Destroy the right-click menu.
   */
  public destroy(): void {
    this.$element.removeEventListener('click', this.onToolbarItemClick);
    this.$element.remove();

    super.destroy();
  }

  private async getDOMContent() {
    const items = await this.options.getItems();
    return items
      .map(
        (item) => `
          <div class="g6-toolbar-item" value="${item.value}">
            <svg aria-hidden="true" focusable="false">
              <use xlink:href="#${item.id}"></use>
            </svg>
          </div>`,
      )
      .join('');
  }

  private onToolbarItemClick = (e: MouseEvent) => {
    const { onClick } = this.options;
    if (e.target instanceof Element) {
      if (e.target.className.includes('g6-toolbar-item')) {
        const v = e.target.getAttribute('value') as string;
        onClick(v, e.target);
      }
    }
  };
}
