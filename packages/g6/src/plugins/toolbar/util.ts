/**
 * <zh/> 工具栏显示项目。
 * <en/> The item of the toolbar.
 */
export type ToolbarItem = {
  /**
   * <zh/> 可以使用 id 来配置内置的工具栏项，可以是 'zoom-in'、'zoom-out'、'auto-fit'、'reset' 等值。和 `marker` 配置二选一。
   * <en/> You can use id to configure the built-in toolbar items, which can be values such as 'zoom-in', 'zoom-out', 'auto-fit', 'reset', etc. One of the two configurations with `marker`.
   */
  readonly id?: 'zoom-in' | 'zoom-out' | 'auto-fit' | 'reset';
  /**
   * <zh/> 工具栏项显示的内容，可以是一个 svg，也可以是一个符号文本。
   * <en/> The content displayed by the toolbar item can be an svg or a symbol text.
   */
  readonly marker?: string;
  /**
   * <zh/> 工具栏项对应的值，在 onClick 中作为回调参数。
   * <en/> The value corresponding to the toolbar item, used as a callback parameter in `onClick`.
   */
  readonly value: string;
};

/**
 * <zh/> Toolbar 的位置，相对于画布，默认为 `top-left`，最终会影响 DOM 的 style 样式。
 * <en/> The position of the Toolbar relative to the canvas, default is `top-left`, which will ultimately affect the style of the DOM.
 */
export type Position = 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * <zh/> 解析 toolbar 的 position 为位置样式。
 * <en/> Parse the position of the toolbar into position style.
 * @param position - position
 * @returns style
 */
export function parsePositionToStyle(position: Position) {
  const style: Partial<CSSStyleDeclaration> = {};

  const directions = position.split('-') as ('top' | 'right' | 'bottom' | 'left')[];
  directions.forEach((d) => {
    style[d] = '8px';
  });

  return style;
}

/**
 * 工具栏内置的 marker 图标 svg。
 */
export const TOOLBAR_BUILDIN_MARKER = {
  'zoom-in': '',
  'zoom-out': '',
  reset: '',
  'auto-fit': '',
};

/**
 * 内置默认的 toolbar 的 CSS 样式。
 */
export const TOOLBAR_CSS = '';
