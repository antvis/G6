/**
 * Create DOM from a html string.
 * @param str
 * @returns
 */
export function createDOM(str: string): HTMLElement {
  const containerDOM = document.createElement('div');
  containerDOM.innerHTML = str;

  let dom = containerDOM.childNodes[0] as HTMLElement;
  if (dom && containerDOM.contains(dom)) {
    dom = containerDOM.removeChild(dom);
  }
  return dom;
}

/**
 * Modify the CSS of a DOM.
 * @param dom
 * @param css
 * @returns
 */
export function modifyCSS(dom: HTMLElement, css: { [key: string]: any }): HTMLElement {
  if (!dom) return;

  Object.keys(css).forEach((key) => {
    dom.style[key] = css[key];
  });
  return dom;
}
