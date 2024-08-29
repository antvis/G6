import { isNumber } from '@antv/util';

const parseInt10 = (d: string) => (d ? parseInt(d) : 0);

/**
 * Get the container's bounding size.
 * @param container dom element.
 * @returns the container width and height
 */
function getContainerSize(container: HTMLElement): [number, number] {
  const style = getComputedStyle(container);

  const wrapperWidth = container.clientWidth || parseInt10(style.width);
  const wrapperHeight = container.clientHeight || parseInt10(style.height);

  const widthPadding = parseInt10(style.paddingLeft) + parseInt10(style.paddingRight);
  const heightPadding = parseInt10(style.paddingTop) + parseInt10(style.paddingBottom);

  return [wrapperWidth - widthPadding, wrapperHeight - heightPadding];
}

/**
 * Get the size of Graph.
 * @param container container of Graph
 * @returns Size of Graph
 */
export function sizeOf(container: HTMLElement): [number, number] {
  let effectiveWidth = 640;
  let effectiveHeight = 480;

  const [containerWidth, containerHeight] = getContainerSize(container);
  effectiveWidth = containerWidth || effectiveWidth;
  effectiveHeight = containerHeight || effectiveHeight;

  /** Minimum width */
  const MIN_CHART_WIDTH = 1;
  /** Minimum height */
  const MIN_CHART_HEIGHT = 1;

  return [
    Math.max(isNumber(effectiveWidth) ? effectiveWidth : MIN_CHART_WIDTH, MIN_CHART_WIDTH),
    Math.max(isNumber(effectiveHeight) ? effectiveHeight : MIN_CHART_HEIGHT, MIN_CHART_HEIGHT),
  ];
}

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
 * Create a DOM element, if exists, remove it and create a new one.
 * @param id - id
 * @param tag - tag
 * @param style - style
 * @param innerHTML - innerHTML
 * @param container - container
 * @returns new DOM element
 */
export function insertDOM(
  id: string,
  tag = 'div',
  style: Partial<CSSStyleDeclaration> = {},
  innerHTML = '',
  container: HTMLElement = document.body,
) {
  // 如果存在则删除
  const dom = document.getElementById(id);
  if (dom) dom.remove();

  // 重新创建
  const div = document.createElement(tag);
  div.innerHTML = innerHTML;
  div.id = id;

  Object.assign(div.style, style);

  container.appendChild(div);

  return div;
}

/**
 * Insert a DOM element before the first child of the container.
 * @param container - container
 * @param element - element
 */
export function insertBefore(container: HTMLElement, element: HTMLElement) {
  const firstChild = container.firstChild;
  if (firstChild) {
    container.insertBefore(element, firstChild);
  } else {
    container.appendChild(element);
  }
}
