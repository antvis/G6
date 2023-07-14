import { LodStrategy, LodStrategyObj } from '../types/item';

/**
 * Format lodStrategy to the pattern that ratio 1 (primary level) at level 0, and higher the ratio, higher the level.
 * @param lodStrategy
 * @returns
 */
export const formatLodStrategy = (lodStrategy: LodStrategy): LodStrategyObj => {
  const { levels, animateCfg } = lodStrategy || {};
  if (!levels) return undefined;
  const primaryLevel = levels.find((level) => level.primary);
  const primaryIndex = levels.indexOf(primaryLevel);
  const formattedLevels = {};
  levels.forEach((level, i) => {
    formattedLevels[i - primaryIndex] = level.zoomRange;
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
    const zoomRange = levels[idx];
    if (zoom >= zoomRange[0] && zoom < zoomRange[1]) level = Number(idx);
  });
  return level;
};
