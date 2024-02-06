import type { DisplayObjectConfig, EllipseStyleProps, Group } from '@antv/g';
import { Ellipse as GEllipse } from '@antv/g';
import type { Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = Partial<EllipseStyleProps>;
export type EllipseNodeStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;

type ParsedEllipseStyleProps = Required<EllipseNodeStyleProps>;

type EllipseOptions = DisplayObjectConfig<EllipseNodeStyleProps>;

/**
 * Draw ellipse based on BaseNode, override drawKeyShape.
 */
export class Ellipse extends BaseNode<KeyShapeStyleProps, GEllipse> {
  constructor(options: EllipseOptions) {
    super(options);
  }

  protected getHaloStyle(attributes: ParsedEllipseStyleProps): EllipseStyleProps | false {
    if (attributes.halo === false) return false;
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo');
    const keyStyle = this.getKeyStyle(attributes) as Required<KeyShapeStyleProps>;
    return {
      ...keyStyle,
      ...haloStyle,
      rx: Number(keyStyle.rx) + Number(keyStyle.lineWidth || 0) / 2,
      ry: Number(keyStyle.ry) + Number(keyStyle.lineWidth || 0) / 2,
    };
  }

  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.shapeMap.key.getLocalBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds);
  }
  protected drawKeyShape(attributes: ParsedEllipseStyleProps, container: Group): GEllipse {
    return this.upsert(
      'key',
      GEllipse,
      this.getKeyStyle(attributes) as Required<KeyShapeStyleProps>,
      container,
    ) as GEllipse;
  }

  connectedCallback() {}
}
