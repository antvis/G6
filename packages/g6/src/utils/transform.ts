import { deepMix } from '@antv/util';
import type { DrawData, ProcedureData } from '../transforms/types';
import type { ElementDatum, ElementType } from '../types';
import { idOf } from './id';

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

/**
 * <zh/> 重新分配绘制任务
 *
 * <en/> Reassign drawing tasks
 * @param input - <zh>绘制数据 | <en>DrawData
 * @param type - <zh>类型 | <en>type
 * @param elementType - <zh>元素类型 | <en>element type
 * @param datum - <zh>数据 | <en>data
 * @param merge - <zh>是否合并 | <en>whether to merge
 */
export const reassignTo = (
  input: DrawData,
  type: 'add' | 'update' | 'remove',
  elementType: ElementType,
  datum: ElementDatum,
  merge = false,
) => {
  const id = idOf(datum);
  const typeName = `${elementType}s` as keyof ProcedureData;
  const exitsDatum: any =
    input.add[typeName].get(id) || input.update[typeName].get(id) || input.remove[typeName].get(id) || datum;
  Object.entries(input).forEach(([_type, value]) => {
    if (type === _type) value[typeName].set(id, merge ? deepMix(exitsDatum, datum) : exitsDatum);
    else value[typeName].delete(id);
  });
};
