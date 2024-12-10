import type { TransformArray } from '@antv/g';
import { isNumber } from '@antv/util';

/**
 * <zh/> 从 transform 字符串中替换 translate 部分
 *
 * <en/> replace the translate part from the transform string
 * @param x - <zh/> x | <en/> x
 * @param y - <zh/> y | <en/> y
 * @param z - <zh/> z | <en/> z
 * @param transform - <zh/> transform 字符串 | <en/> transform string
 * @returns <zh/> 替换后的 transform 字符串，返回 null 表示无需替换 | <en/> the replaced transform string, return null means no need to replace
 */
export function replaceTranslateInTransform(
  x: number,
  y: number,
  z?: number,
  transform: string | TransformArray = [],
): string | TransformArray | null {
  if (!transform && x === 0 && y === 0 && z === 0) return null;

  if (Array.isArray(transform)) {
    let translateIndex = -1;
    const newTransform: TransformArray = [];

    for (let i = 0; i < transform.length; i++) {
      const t = transform[i];
      if (t[0] === 'translate') {
        if (t[1] === x && t[2] === y) return null;
        translateIndex = i;
        newTransform.push(['translate', x, y]);
      } else if (t[0] === 'translate3d') {
        if (t[1] === x && t[2] === y && t[3] === z) return null;
        translateIndex = i;
        newTransform.push(['translate3d', x, y, z ?? 0]);
      } else {
        newTransform.push(t);
      }
    }

    if (translateIndex === -1) {
      newTransform.splice(0, 0, isNumber(z) ? ['translate3d', x, y, z ?? 0] : ['translate', x, y]);
    }
    if (newTransform.length === 0) return null;
    return newTransform;
  }

  const removedTranslate = transform ? transform.replace(/translate(3d)?\([^)]*\)/g, '') : '';
  if (z === 0) {
    return `translate(${x}, ${y})${removedTranslate}`;
  } else {
    return `translate3d(${x}, ${y}, ${z})${removedTranslate}`;
  }
}
