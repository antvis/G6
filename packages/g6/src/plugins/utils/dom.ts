/**
 * <zh/> 创建插件容器
 *
 * <en/> Create a plugin container
 * @param type - <zh/> 插件类型 | <en/> plugin type
 * @param cover - <zh/> 容器是否覆盖整个画布 | <en/> Whether the container covers the entire canvas
 * @param style - <zh/> 额外样式 | <en/> Additional style
 * @returns <zh/> 插件容器 | <en/> plugin container
 */
export function createPluginContainer(type: string, cover = true, style?: Partial<CSSStyleDeclaration>): HTMLElement {
  const container = document.createElement('div');

  container.setAttribute('class', `g6-${type}`);

  Object.assign(container.style, {
    position: 'absolute',
    display: 'block',
  });

  if (cover) {
    Object.assign(container.style, {
      position: 'unset',
      gridArea: '1 / 1 / 2 / 2',
      inset: '0px',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
    });
  }

  if (style) Object.assign(container.style, style);

  return container;
}

/**
 * <zh/> 创建 DOM 元素，如果存在则删除，再创建一个新的
 *
 * <en/> Create a DOM element, if exists, remove it and create a new one.
 * @param id - <zh/> id | <en/> id
 * @param tag - <zh/> 标签 | <en/> tag
 * @param style - <zh/> 样式 | <en/> style
 * @param innerHTML - <zh/> 内容 | <en/> innerHTML
 * @param container - <zh/> 容器 | <en/> container
 * @returns <zh/> 创建的 DOM 元素 | <en/> created DOM element
 */
export function insertDOM(
  id: string,
  tag = 'div',
  style: Partial<CSSStyleDeclaration> = {},
  innerHTML = '',
  container: HTMLElement = document.body,
) {
  const dom = document.getElementById(id);
  if (dom) dom.remove();

  const div = document.createElement(tag);
  div.innerHTML = innerHTML;
  div.id = id;

  Object.assign(div.style, style);

  container.appendChild(div);

  return div;
}
