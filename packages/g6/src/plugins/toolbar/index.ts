import type { RuntimeContext } from '../../runtime/types';
import type { CornerPlacement } from '../../types';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { createPluginContainer, insertDOM } from '../utils/dom';
import type { ToolbarItem } from './util';
import { BUILD_IN_SVG_ICON, TOOLBAR_CSS, parsePositionToStyle } from './util';

/**
 * <zh/> Toolbar 工具栏的配置项
 *
 * <en/> The options of the Toolbar toolbar
 */
export interface ToolbarOptions extends BasePluginOptions {
  /**
   * <zh/> 给工具栏的 DOM 追加的 classname，便于自定义样式。默认是包含 `g6-toolbar`
   *
   * <en/> The classname appended to the menu DOM for custom styles. The default is `g6-toolbar`
   */
  className?: string;
  /**
   * <zh/> Toolbar 的位置，相对于画布，会影响 DOM 的 style 样式
   *
   * <en/> The position of the Toolbar relative to the canvas, which will affect the style of the DOM
   * @defaultValue 'top-left'
   */
  position?: CornerPlacement;
  /**
   * <zh/> 工具栏显式的 style 样式，可以用来设置它相对于画布的位置、背景容器样式等
   *
   * <en/> The style style of the Toolbar, which can be used to set its position relative to the canvas
   */
  style?: Partial<CSSStyleDeclaration>;
  /**
   * <zh/> 当工具栏被点击后，触发的回调方法
   *
   * <en/> The callback method triggered when the toolbar item is clicked
   */
  onClick?: (value: string, target: Element) => void;
  /**
   * <zh/> 返回工具栏的项目列表，支持 `Promise` 类型的返回值
   *
   * <en/> Return the list of toolbar items, support return a `Promise` as items
   */
  getItems: () => ToolbarItem[] | Promise<ToolbarItem[]>;
}

/**
 * <zh/> 工具栏，支持配置工具栏项目，以及点击之后的回调方法
 *
 * <en/> Toolbar, support configuration of toolbar items, and callback methods after clicking
 */
export class Toolbar extends BasePlugin<ToolbarOptions> {
  static defaultOptions: Partial<ToolbarOptions> = {
    position: 'top-left',
  };

  private $element: HTMLElement = createPluginContainer('toolbar', false);

  constructor(context: RuntimeContext, options: ToolbarOptions) {
    super(context, Object.assign({}, Toolbar.defaultOptions, options));

    const $container = this.context.canvas.getContainer();
    this.$element.style.display = 'flex';
    $container!.appendChild(this.$element);

    // 设置样式
    insertDOM('g6-toolbar-css', 'style', {}, TOOLBAR_CSS, document.head);
    insertDOM('g6-toolbar-svgicon', 'div', { display: 'none' }, BUILD_IN_SVG_ICON);

    this.$element.addEventListener('click', this.onToolbarItemClick);

    this.update(options);
  }

  /**
   * <zh/> 更新工具栏的配置项
   *
   * <en/> Update the configuration of the toolbar
   * @param options - <zh/> 工具栏的配置项 | <en/> The options of the toolbar
   * @internal
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
   * <zh/> 销毁工具栏
   *
   * <en/> Destroy the toolbar
   * @internal
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
        onClick?.(v, e.target);
      }
    }
  };
}
