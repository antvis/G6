import type { DisplayObjectConfig, EllipseStyleProps, Group } from '@antv/g';
import { Ellipse as GEllipse } from '@antv/g';
import type { Point } from '../../types';
import type { EllipseAnchorPosition } from '../../types/node';
import { getEllipseAnchorByPosition, getEllipseAnchors } from '../../utils/element';
import { getEllipseIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps, NodeAnchorStyleProps } from './base-node';
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

  protected getKeyStyle(attributes: ParsedEllipseStyleProps): EllipseStyleProps {
    return super.getKeyStyle(attributes) as Required<KeyShapeStyleProps>;
  }

  protected getHaloStyle(attributes: ParsedEllipseStyleProps): EllipseStyleProps | false {
    if (attributes.halo === false) return false;
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo');
    const keyStyle = this.getKeyStyle(attributes);
    return {
      ...keyStyle,
      ...haloStyle,
    };
  }

  protected getAnchorsStyle(attributes: ParsedEllipseStyleProps): NodeAnchorStyleProps[] {
    if (attributes.anchor === false) return [];
    const { rx, ry } = attributes;
    const anchors = getEllipseAnchors(Number(rx), Number(ry));
    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];
    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getEllipseAnchorByPosition(position as EllipseAnchorPosition, anchors);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.shapeMap.key.getLocalBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds);
  }
  protected drawKeyShape(attributes: ParsedEllipseStyleProps, container: Group): GEllipse {
    return this.upsert('key', GEllipse, this.getKeyStyle(attributes), container) as GEllipse;
  }

  connectedCallback() {}
}
