import { groupBy } from '@antv/util';
import type { CategoricalPalette } from '../palettes/types';
import { getExtension } from '../registry/get';
import type { PaletteOptions, STDPaletteOptions } from '../spec/element/palette';
import type { ID } from '../types';
import type { ElementData, ElementDatum } from '../types/data';
import { idOf } from './id';
import { format } from './print';

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
    // 默认为离散色板
    // Default to discrete palette, default group field is id
    return {
      type: 'group',
      field: (d: any) => d.id,
      color: palette,
      invert: false,
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
 * @remarks
 * <zh/> 返回值结果是一个以元素 id 为 key，颜色值为 value 的对象
 *
 * <en/> The return value is an object with element id as key and color value as value
 */
export function assignColorByPalette(data: ElementData, palette?: STDPaletteOptions) {
  if (!palette) return {};

  const { type, color: colorPalette, field, invert } = palette;

  const assignColor = (args: [ID, number][]): Record<ID, string> => {
    const palette = typeof colorPalette === 'string' ? getExtension('palette', colorPalette) : colorPalette;

    if (typeof palette === 'function') {
      // assign by continuous
      const result: Record<ID, string> = {};
      args.forEach(([id, value]) => {
        result[id] = palette(invert ? 1 - value : value);
      });
      return result;
    } else if (Array.isArray(palette)) {
      // assign by discrete
      const colors = invert ? [...palette].reverse() : palette;
      const result: Record<ID, string> = {};
      args.forEach(([id, index]) => {
        result[id] = colors[index % palette.length];
      });
      return result;
    }
    return {};
  };

  const parseField = (field: STDPaletteOptions['field'], datum: ElementDatum) =>
    typeof field === 'string' ? datum.data?.[field] : field?.(datum);

  if (type === 'group') {
    const groupData = groupBy<ElementDatum>(data, (datum) => {
      if (!field) return 'default';
      const key = parseField(field, datum);
      return key ? String(key) : 'default';
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
  } else if (type === 'value') {
    const [min, max] = data.reduce(
      ([min, max], datum) => {
        const value = parseField(field, datum);
        if (typeof value !== 'number') throw new Error(format(`Palette field ${field} is not a number`));
        return [Math.min(min, value), Math.max(max, value)];
      },
      [Infinity, -Infinity],
    );
    const range = max - min;

    return assignColor(
      data.map((datum) => [datum.id, ((parseField(field, datum) as number) - min) / range]) as [ID, number][],
    );
  }
}

/**
 * <zh/> 获取离散色板配色
 *
 * <en/> Get discrete palette colors
 * @param colorPalette - <zh/> 色板名或着颜色数组 | <en/> Palette name or color array
 * @returns <zh/> 色板上具体颜色 | <en/> Specific color on the palette
 */
export function getPaletteColors(colorPalette?: string | CategoricalPalette): CategoricalPalette | undefined {
  const palette = typeof colorPalette === 'string' ? getExtension('palette', colorPalette) : colorPalette;
  if (typeof palette === 'function') return undefined;
  return palette;
}
