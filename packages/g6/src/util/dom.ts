/**
 * Create DOM from a html string.
 * @param str
 * @returns
 */
export function createDOM(str: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = str;

  const dom = container.childNodes[0];
  if (dom && container.contains(dom)) {
    container.removeChild(dom);
  }
  return dom as HTMLElement;
}

/**
 * Modify the CSS of a DOM.
 * @param dom
 * @param css
 * @returns
 */
export function modifyCSS(
  dom: HTMLElement,
  css: { [key: string]: any },
): HTMLElement {
  if (!dom) return;

  Object.keys(css).forEach((key) => {
    dom.style[key] = css[key];
  });
  return dom;
}
