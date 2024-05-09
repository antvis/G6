import type { ComboData } from '../spec';
import type { ID } from '../types';
import { idOf } from '../utils/id';
import { BaseTransform } from './base-transform';
import type { DrawData } from './types';

/**
 * <zh/> 调整元素绘制顺序
 *
 * <en/> Adjust the drawing order of elements
 */
export class ArrangeDrawOrder extends BaseTransform {
  public beforeDraw(input: DrawData): DrawData {
    const { model } = this.context;

    const combosToAdd = input.add.combos;

    const arrangeCombo = (combos: Map<string, ComboData>): Map<string, ComboData> => {
      // id, data, zIndex
      const order: [ID, ComboData, number][] = [];
      combos.forEach((combo, id) => {
        const ancestors = model.getAncestorsData(id, 'combo');
        const path = ancestors.map((ancestor) => idOf(ancestor)).reverse();
        // combo 的 zIndex 为距离根 combo 的深度
        // The zIndex of the combo is the depth from the root combo
        order.push([id, combo, path.length]);
      });

      return new Map(
        order
          // 基于 zIndex 降序排序，优先绘制子 combo / Sort based on zIndex in descending order, draw child combo first
          .sort(([, , zIndex1], [, , zIndex2]) => zIndex2 - zIndex1)
          .map(([id, datum]) => [id, datum]),
      );
    };

    input.add.combos = arrangeCombo(combosToAdd);
    input.update.combos = arrangeCombo(input.update.combos);

    return input;
  }
}
