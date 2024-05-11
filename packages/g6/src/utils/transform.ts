/**
 * <zh/> 从 transform 字符串中移除 translate 部分
 *
 * <en/> remove the translate part from the transform string
 * @param transform - <zh/> transform 字符串 | <en/> transform string
 */
export function getTransformWithoutTranslate(transform: string) {
  return transform.replace(/translate(3d)?\([^)]*\)/g, '');
}
