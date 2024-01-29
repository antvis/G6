import type { ID } from '@antv/graphlib';
import { groupBy, isFunction, isNumber, isString } from '@antv/util';
import { getPlugin } from '../registry';
import type { PaletteOptions, STDPaletteOptions } from '../spec/element/palette';
import type { ElementData, ElementDatum } from '../types/data';
import { idOf } from './id';

/**
 * <zh/> 解析色板配置
 *
 * <en/> Parse palette options
 * @param palette - <zh/> 色板配置 | <en/> PaletteOptions options
 * @returns <zh/> 标准色板配置 | <en/> Standard palette options
 */
export function parsePalette(palette?: PaletteOptions): STDPaletteOptions | undefined {
  if (!palette) return undefined;

  if (
    // 色板名 palette name
    typeof palette === 'string' ||
    // 插值函数 interpolate function
    typeof palette === 'function' ||
    // 颜色数组 color array
    Array.isArray(palette)
  ) {
    // 默认为离散色板，默认分组字段为 id
    // Default to discrete palette, default group field is id
    return {
      type: 'group',
      color: palette,
      field: 'id',
    };
  }
  return palette;
}

/**
 * <zh/> 根据色板分配颜色
 *
 * <en/> Assign colors according to the palette
 * @param data - <zh/> 元素数据 | <en/> Element data
 * @param palette - <zh/> 色板配置 | <en/> PaletteOptions options
 * @returns <zh/> 元素颜色 | <en/> Element color
 * @description
 * <zh/> 返回值结果是一个以元素 id 为 key，颜色值为 value 的对象
 *
 * <en/> The return value is an object with element id as key and color value as value
 */
export function assignColorByPalette(data: ElementData, palette?: STDPaletteOptions) {
  if (!palette) return {};

  const { type, color: colorPalette, field, invert } = palette;

  const assignColor = (args: [ID, number][]): Record<ID, string> => {
    const palette = isString(colorPalette) ? getPlugin('palette', colorPalette) : colorPalette;

    if (isFunction(palette)) {
      // assign by continuous
      return Object.fromEntries(args.map(([groupKey, value]) => [groupKey, palette(invert ? 1 - value : value)]));
    } else if (Array.isArray(palette)) {
      // assign by discrete
      const colors = invert ? [...palette].reverse() : palette;
      return Object.fromEntries(args.map(([id, index]) => [id, colors[index % palette.length]]));
    }
    return {};
  };

  if (type === 'group') {
    // @ts-expect-error @antv/util groupBy condition 参数应当支持返回 string 或者 number / groupBy condition parameter should support return string or number
    const groupData = groupBy<ElementDatum>(data, (datum) => {
      if (!datum.data || !field) {
        return idOf(datum);
      }
      return String(datum.data[field]);
    });

    const groupKeys = Object.keys(groupData);
    const assignResult = assignColor(groupKeys.map((key, index) => [key, index]));

    const result: Record<ID, string> = {};
    Object.entries(groupData).forEach(([groupKey, groupData]) => {
      groupData.forEach((datum) => {
        result[idOf(datum)] = assignResult[groupKey];
      });
    });
    return result;
  } else {
    const [min, max] = data.reduce(
      ([min, max], datum) => {
        const value = datum?.data?.[field];
        if (!isNumber(value)) throw new Error(`Palette field ${field} is not a number`);
        return [Math.min(min, value), Math.max(max, value)];
      },
      [Infinity, -Infinity],
    );
    const range = max - min;

    return assignColor(
      data.map((datum) => [datum.id, ((datum?.data?.[field] as number) - min) / range]) as [ID, number][],
    );
  }
}
