import type { DisplayObjectConfig } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import { getRectPoints } from '../../utils/element';
import type { PolygonKeyStyleProps, PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

type RectKeyStyleProps = PolygonKeyStyleProps;
export type RectStyleProps = PolygonStyleProps<RectKeyStyleProps>;
type ParsedRectStyleProps = Required<RectStyleProps>;
type RectOptions = DisplayObjectConfig<RectStyleProps>;

export class Rect extends Polygon<RectKeyStyleProps> {
  static defaultStyleProps: Partial<RectStyleProps> = {
    width: 100,
    height: 30,
  };

  constructor(options: RectOptions) {
    super(deepMix({}, { style: Rect.defaultStyleProps }, options));
  }

  protected getPoints(attributes: ParsedRectStyleProps): Point[] {
    return getRectPoints(Number(attributes.width), Number(attributes.height));
  }
}
