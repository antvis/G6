import type { DisplayObject, DisplayObjectConfig, PathStyleProps } from '@antv/g';
import { Group, Path } from '@antv/g';
import { deepMix } from '@antv/util';
import { getPlugin } from '../../../registry';
import type { BaseShapeStyleProps } from '../base-shape';
import { BaseShape } from '../base-shape';
import { triangle } from './symbol';

export type ArrowStyleProps = {
  type?: string;
  custom?: DisplayObject;
  width?: number;
  height?: number;
} & BaseShapeStyleProps &
  PathStyleProps;

type ParsedArrowStyleProps = Required<ArrowStyleProps>;

export type ArrowOptions = DisplayObjectConfig<ArrowStyleProps>;

export class Arrow extends BaseShape<ArrowStyleProps> {
  static defaultStyleProps: Partial<ArrowStyleProps> = {
    type: 'triangle',
    width: 10,
    height: 10,
    stroke: '#1890FF',
    fill: '#1890FF',
    lineWidth: 1,
  };

  constructor(options: ArrowOptions) {
    super(deepMix({}, { style: Arrow.defaultStyleProps }, options));
  }

  private getArrowType(attributes: ParsedArrowStyleProps) {
    return attributes.type || 'triangle';
  }

  public render(attributes = this.attributes as ParsedArrowStyleProps, container: Group = this): void {
    const arrowType = this.getArrowType(attributes);

    if (arrowType === 'custom' && attributes.custom) {
      container.appendChild(attributes.custom);
      return;
    }

    this.upsert('arrow', Path, this.getArrowStyle(attributes), container);
  }

  protected getArrowStyle(attributes: ParsedArrowStyleProps): false | PathStyleProps {
    if (!attributes) return false;
    const { width, height, fill, ...rest } = attributes;
    const arrowType = this.getArrowType(attributes);
    const arrowFn = getPlugin('arrow', arrowType) ?? triangle;
    return Object.assign(
      {},
      {
        path: arrowFn(width, height),
        fill: arrowType === 'simple' ? '' : fill,
        anchor: '0.5 0.5',
        transformOrigin: 'center',
      },
      rest,
    ) as PathStyleProps;
  }
}
