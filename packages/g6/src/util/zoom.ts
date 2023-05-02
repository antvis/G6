import { ZoomStrategy, ZoomStrategyObj } from 'types/item';

/**
 * Format zoomStrategy to the pattern that ratio 1 (primary level) at level 0, and higher the ratio, higher the level.
 * @param zoomStrategy
 * @returns
 */
export const formatZoomStrategy = (
  zoomStrategy: ZoomStrategy,
): ZoomStrategyObj => {
  const { levels, animateCfg } = zoomStrategy || {};
  if (!levels) return undefined;
  const primaryLevel = levels.find((level) => level.primary);
  const primaryIndex = levels.indexOf(primaryLevel);
  const formattedLevels = {};
  levels.forEach((level, i) => {
    formattedLevels[i - primaryIndex] = level.range;
  });
  return {
    animateCfg,
    levels: formattedLevels,
  };
};

/**
 * Get zoom level idx in levels array.
 * @param levels
 * @param zoom
 * @returns
 */
export const getZoomLevel = (
  levels: { [idx: number | string]: [number, number] },
  zoom: number,
) => {
  let level = 0;
  Object.keys(levels).forEach((idx) => {
    const range = levels[idx];
    if (zoom >= range[0] && zoom < range[1]) level = Number(idx);
  });
  return level;
};
