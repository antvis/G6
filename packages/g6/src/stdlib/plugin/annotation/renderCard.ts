import { isNumber, modifyCSS } from '@antv/util';

export function renderCard(cfg) {
  const {
    collapsed,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    width,
    height,
    title = '',
    content = '',
    borderRadius: r = 5,
  } = cfg;

  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'g6-annotation-wrapper');
  wrapper.setAttribute(
    'style',
    `border-radius: ${r}px; max-width: ${maxWidth}px`,
  );

  const headerWrapper = document.createElement('div');
  const borderRadius = collapsed ? `${r}px` : `${r}px ${r}px 0 0`;
  headerWrapper.setAttribute('class', 'g6-annotation-header-wapper');
  headerWrapper.setAttribute('style', `border-radius: ${borderRadius};`);

  const titleEl = document.createElement('h4');
  titleEl.setAttribute('class', 'g6-annotation-title');
  titleEl.setAttribute('tabindex', '0');
  titleEl.append(title);

  const headerBtns = document.createElement('div');
  headerBtns.setAttribute('class', 'g6-annotation-header-btns');
  headerBtns.innerHTML = `${
    collapsed
      ? `<p class='g6-annotation-expand'>+</p>`
      : `<p class='g6-annotation-collapse'>-</p>`
  }<p class='g6-annotation-close'>x</p>`;
  headerWrapper.append(titleEl, headerBtns);

  const contentWrapper = collapsed ? null : document.createElement('div');
  if (contentWrapper) {
    contentWrapper.setAttribute('class', 'g6-annotation-content');
    contentWrapper.setAttribute('tabindex', '0');
    contentWrapper.append(content);
  }

  wrapper.append(headerWrapper);
  contentWrapper && wrapper.append(contentWrapper);

  const minHeightPx = isNumber(minHeight) ? `${minHeight}px` : minHeight;
  const maxHeightPx = isNumber(maxHeight) ? `${maxHeight}px` : maxHeight;
  modifyCSS(wrapper, {
    minWidth: isNumber(minWidth) ? `${minWidth}px` : minWidth,
    minHeight: collapsed ? 'unset' : minHeightPx,
    maxWidth: isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
    maxHeight: collapsed ? 'unset' : maxHeightPx,
    height,
    width,
  });

  return wrapper;
}
