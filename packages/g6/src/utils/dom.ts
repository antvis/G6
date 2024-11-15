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
export function sizeOf(container: HTMLElement | null): [number, number] {
  if (!container) return [0, 0];

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
