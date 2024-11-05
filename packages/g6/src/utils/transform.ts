import type { TransformArray } from '@antv/g';

/**
 * <zh/> 从 transform 字符串中替换 translate 部分
 *
 * <en/> replace the translate part from the transform string
 * @param x - <zh/> x | <en/> x
 * @param y - <zh/> y | <en/> y
 * @param z - <zh/> z | <en/> z
 * @param transform - <zh/> transform 字符串 | <en/> transform string
 * @returns <zh/> 替换后的 transform 字符串 | <en/> replaced transform string
 */
export function replaceTranslateInTransform(
  x: number,
  y: number,
  z: number,
  transform: string | TransformArray,
): string | TransformArray | null {
  if (Array.isArray(transform)) {
    let hasTranslate = false;
    const newTransform: TransformArray = [];

    for (let i = 0; i < transform.length; i++) {
      const t = transform[i];
      if (t[0] === 'translate') {
        if (t[1] === x && t[2] === y) return null;
        hasTranslate = true;
        newTransform.push(['translate', x, y]);
      } else if (t[0] === 'translate3d') {
        if (t[1] === x && t[2] === y && t[3] === z) return null;
        hasTranslate = true;
        newTransform.push(['translate3d', x, y, z]);
      } else {
        newTransform.push(t);
      }
    }

    if (!hasTranslate) {
      newTransform.splice(0, 0, z === 0 ? ['translate', x, y] : ['translate3d', x, y, z]);
    }
    return newTransform;
  }

  const removedTranslate = transform ? transform.replace(/translate(3d)?\([^)]*\)/g, '') : '';
  if (z === 0) {
    return `translate(${x}, ${y})${removedTranslate}`;
  } else {
    return `translate3d(${x}, ${y}, ${z})${removedTranslate}`;
  }
}
