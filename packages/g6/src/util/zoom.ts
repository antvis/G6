import { LodLevel, LodLevelRanges } from '../types/item';

/**
 * Format lodLevels to the pattern that ratio 1 (primary level) at level 0, and higher the ratio, higher the level.
 * @param lodLevels
 * @returns
 */
export const formatLodLevels = (
  lodLevels?: LodLevel[],
): LodLevelRanges | undefined => {
  if (!lodLevels?.length) return;
  const primaryLevel = lodLevels.find((level) => level.primary);
  if (!primaryLevel) return;
  const primaryIndex = lodLevels.indexOf(primaryLevel);
  const formattedLevels = {};
  lodLevels.forEach((level, i) => {
    formattedLevels[i - primaryIndex] = level.zoomRange;
  });
  return formattedLevels;
};

/**
 * Get zoom level idx in levels array.
 * @param levels
 * @param zoom
 * @returns
 */
export const getZoomLevel = (levels: LodLevelRanges, zoom: number) => {
  for (const idx in levels) {
    const zoomRange = levels[idx];
    if (zoom >= zoomRange[0] && zoom < zoomRange[1]) {
      return Number(idx);
    }
  }
};
