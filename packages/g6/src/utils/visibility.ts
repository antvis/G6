import type { BaseStyleProps, DisplayObject } from '@antv/g';
import { cacheStyle, getCachedStyle, hasCachedStyle } from './cache';
import { getDescendantShapes } from './shape';

const PropertyKey = 'visibility';

/**
 * <zh/> 设置图形实例的可见性
 *
 * <en/> Set the visibility of the shape instance
 * @param shape - <zh/> 图形实例 | <en/> shape instance
 * @param visibility - <zh/> 可见性 | <en/> visibility
 * @remarks
 * <zh/> 在设置 enableCSSParsing 为 false 的情况下，复合图形无法继承父属性，因此需要对所有子图形应用相同的可见性
 *
 * <en/> After setting enableCSSParsing to false, the compound shape cannot inherit the parent attribute, so the same visibility needs to be applied to all child shapes
 */
export function setVisibility(shape: DisplayObject, visibility: BaseStyleProps['visibility']) {
  const shapes = [shape, ...getDescendantShapes(shape)];

  shapes.forEach((sp) => {
    if (!hasCachedStyle(sp, PropertyKey)) cacheStyle(sp, PropertyKey);
    const cachedVisibility = getCachedStyle(sp, PropertyKey);

    // 如果子图形为隐藏状态，始终保持隐藏状态
    // If the child shape is hidden, keep it hidden
    if (shape !== sp && cachedVisibility === 'hidden') return;

    sp.style.visibility = visibility;
  });
}
