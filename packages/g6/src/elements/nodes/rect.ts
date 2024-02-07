import type { DisplayObjectConfig } from '@antv/g';
import type { Point } from '../../types';
import { getRectPoints } from '../../utils/element';
import type { PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

type RectKeyStyleProps = {};
export type RectStyleProps = PolygonStyleProps<RectKeyStyleProps>;
type ParsedRectStyleProps = Required<RectStyleProps>;
type RectOptions = DisplayObjectConfig<RectStyleProps>;

export class Rect extends Polygon<RectKeyStyleProps> {
  constructor(options: RectOptions) {
    super(options);
  }

  protected getPoints(attributes: ParsedRectStyleProps): Point[] {
    return getRectPoints(attributes.width, attributes.height);
  }
}
