import type { DisplayObject } from '@antv/g';

/**
 * <zh/> 获取图形的所有子元素
 *
 * <en/> Get all the child elements of the shape
 * @param shape - <zh/> 图形元素 | <en/> shape
 * @returns <zh/> 子元素数组 | <en/> child elements array
 */
export function getDescendantShapes<T extends DisplayObject>(shape: T) {
  const succeeds: DisplayObject[] = [];

  // 遍历所有子元素，并将子元素的子元素加入到数组中
  const traverse = (shape: DisplayObject) => {
    if (shape?.children.length) {
      (shape.children as DisplayObject[]).forEach((child) => {
        succeeds.push(child);
        traverse(child);
      });
    }
  };

  traverse(shape);

  return succeeds;
}

/**
 * <zh/> 获取图形的所有祖先元素
 *
 * <en/> Get all the ancestor elements of the shape
 * @param shape - <zh/> 图形元素 | <en/> shape
 * @returns <zh/> 祖先元素数组 | <en/> ancestor elements array
 */
export function getAncestorShapes<T extends DisplayObject>(shape: T) {
  const ancestors: DisplayObject[] = [];
  let currentNode = shape.parentNode as DisplayObject;
  while (currentNode) {
    ancestors.push(currentNode);
    currentNode = currentNode.parentNode as DisplayObject;
  }
  return ancestors;
}
