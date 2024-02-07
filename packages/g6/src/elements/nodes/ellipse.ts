import type { DisplayObjectConfig, EllipseStyleProps as GEllipseStyleProps, Group } from '@antv/g';
import { Ellipse as GEllipse } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseNodeProps, Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type EllipseStyleProps = BaseNodeStyleProps<BaseNodeProps>;
type ParsedEllipseStyleProps = Required<EllipseStyleProps>;
type EllipseOptions = DisplayObjectConfig<EllipseStyleProps>;

export class Ellipse extends BaseNode<BaseNodeProps, GEllipse> {
  static defaultStyleProps: Partial<EllipseStyleProps> = {
    width: 80,
    height: 40,
  };

  constructor(options: EllipseOptions) {
    super(deepMix({}, { style: Ellipse.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedEllipseStyleProps, container: Group): GEllipse | undefined {
    return this.upsert('key', GEllipse, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedEllipseStyleProps): GEllipseStyleProps {
    const { x, y, z, width, height, ...keyStyle } = super.getKeyStyle(attributes) as unknown as ParsedEllipseStyleProps;
    return {
      ...keyStyle,
      cx: x,
      cy: y,
      cz: z,
      rx: width / 2,
      ry: height / 2,
    };
  }

  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.getKey().getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds);
  }
}
