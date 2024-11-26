import type { BaseStyleProps, DisplayObject } from '@antv/g';

/**
 * <zh/> 设置图形实例的可见性
 *
 * <en/> Set the visibility of the shape instance
 * @param shape - <zh/> 图形实例 | <en/> shape instance
 * @param value - <zh/> 可见性 | <en/> visibility
 * @param filter - <zh/> 筛选出需要设置可见性的图形 | <en/> Filter out the shapes that need to set visibility
 * @remarks
 * <zh/> 在设置 enableCSSParsing 为 false 的情况下，复合图形无法继承父属性，因此需要对所有子图形应用相同的可见性
 *
 * <en/> After setting enableCSSParsing to false, the compound shape cannot inherit the parent attribute, so the same visibility needs to be applied to all child shapes
 */
export function setVisibility(
  shape: DisplayObject,
  value: BaseStyleProps['visibility'],
  filter?: (shape: DisplayObject) => boolean,
) {
  const callback = (node: DisplayObject) => {
    if (filter && !filter(node)) return;
    node.style.visibility = value;
  };

  shape.forEach((node) => {
    callback(node as DisplayObject);
  });
}
