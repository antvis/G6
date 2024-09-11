import type { BaseStyleProps, DisplayObject } from '@antv/g';

const ORIGINAL_MAP = new WeakMap<DisplayObject, BaseStyleProps['visibility']>();

/**
 * <zh/> 设置图形实例的可见性
 *
 * <en/> Set the visibility of the shape instance
 * @param shape - <zh/> 图形实例 | <en/> shape instance
 * @param value - <zh/> 可见性 | <en/> visibility
 * @param inherited - <zh/> 是否是来自继承样式 | <en/> Whether it is from inherited styles
 * @param filter - <zh/> 筛选出需要设置可见性的图形 | <en/> Filter out the shapes that need to set visibility
 * @remarks
 * <zh/> 在设置 enableCSSParsing 为 false 的情况下，复合图形无法继承父属性，因此需要对所有子图形应用相同的可见性
 *
 * <en/> After setting enableCSSParsing to false, the compound shape cannot inherit the parent attribute, so the same visibility needs to be applied to all child shapes
 */
export function setVisibility(
  shape: DisplayObject,
  value: BaseStyleProps['visibility'],
  inherited = false,
  filter?: (shape: DisplayObject) => boolean,
) {
  if (value === undefined) return;

  const traverse = (current: DisplayObject, scope = value): void => {
    const walk = (val = scope): void => (current.childNodes as DisplayObject[]).forEach((node) => traverse(node, val));

    if (filter && !filter(current)) return walk();

    if (!inherited && current === shape) {
      shape.style.visibility = value;
      ORIGINAL_MAP.delete(shape);
      walk(value);
    } else {
      if (!ORIGINAL_MAP.has(current)) ORIGINAL_MAP.set(current, current.style.visibility);

      const computedValue = scope === 'hidden' || getOriginalValue(current) === 'hidden' ? 'hidden' : 'visible';
      current.style.visibility = computedValue;
      walk(computedValue);
    }
  };

  traverse(shape);
}

/**
 * <zh/> 获取图形原本的可见性
 *
 * <en/> Get the original visibility of the shape
 * @param shape - <zh/> 图形实例 | <en/> shape instance
 * @returns <zh/> 可见性 | <en/> visibility
 */
function getOriginalValue(shape: DisplayObject) {
  if (ORIGINAL_MAP.has(shape)) return ORIGINAL_MAP.get(shape);
  return shape.style.visibility;
}
