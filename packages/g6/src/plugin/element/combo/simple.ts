import type { DisplayObject, DisplayObjectConfig } from '@antv/g';
import { Rect } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Padding } from '../../../types/common';
import { parsePadding } from '../../../utils/padding';
import type { BaseElementStyleProps } from '../base';
import { BaseElement } from '../base';

export interface SimpleComboStyleProps extends BaseElementStyleProps {
  children: DisplayObject[];
  padding?: Padding;
}

type SimpleComboOptions = DisplayObjectConfig<SimpleComboStyleProps>;

export class SimpleCombo extends BaseElement<SimpleComboStyleProps> {
  static defaultStyleProps: Partial<SimpleComboStyleProps> = {};

  constructor(options: SimpleComboOptions) {
    super(deepMix({}, { style: SimpleCombo.defaultStyleProps }, options));
  }

  protected getCombinedBoundingClientRect(children: DisplayObject[]) {
    const bbox = children.reduce(
      (acc, child) => {
        const {
          min: [minX, minY, minZ],
          max: [maxX, maxY, maxZ],
        } = child.getRenderBounds();

        return {
          min: [Math.min(acc.min[0], minX), Math.min(acc.min[1], minY), Math.min(acc.min[2], minZ)],
          max: [Math.max(acc.max[0], maxX), Math.max(acc.max[1], maxY), Math.max(acc.max[2], maxZ)],
        };
      },
      { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] },
    );
    return bbox;
  }

  render(attributes: SimpleComboStyleProps) {
    const { children, padding, ...restStyle } = this.getStyle(attributes);
    const [top, right, bottom, left] = parsePadding(padding);
    const {
      min: [minX, minY, minZ],
      max: [maxX, maxY, maxZ],
    } = this.getCombinedBoundingClientRect(children);

    this.upsert(
      'keyShape',
      Rect,
      {
        ...restStyle,
        x: minX - left,
        y: minY - top,
        width: maxX - minX + left + right,
        height: maxY - minY + top + bottom,
      },
      this,
    );
  }
}
