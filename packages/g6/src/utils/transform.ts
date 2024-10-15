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
export function replaceTranslateInTransform(x: number, y: number, z: number, transform?: string) {
  const removedTranslate = transform ? transform.replace(/translate(3d)?\([^)]*\)/g, '') : '';
  if (z === 0) {
    return `translate(${x}, ${y})${removedTranslate}`;
  } else {
    return `translate3d(${x}, ${y}, ${z})${removedTranslate}`;
  }
}
