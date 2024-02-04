import type { DisplayObjectConfig, PathStyleProps as GPathStyleProps, Group } from '@antv/g';
import { Path as GPath } from '@antv/g';
import { getTriangleAnchorByPosition, getTriangleAnchors, getTrianglePath } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps, NodeAnchorStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = GPathStyleProps & {
  /**
   * 外接圆半径
   */
  r: number;
  /**
   * 三角形朝向
   */
  direction: 'up' | 'left' | 'right' | 'down';
};

export type TriangleStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;
type ParsedStarStyleProps = Required<TriangleStyleProps>;
type TriangleOptions = DisplayObjectConfig<TriangleStyleProps>;

export class Triangle extends BaseNode<KeyShapeStyleProps, GPath> {
  constructor(options: TriangleOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedStarStyleProps): KeyShapeStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const { r, direction } = keyStyle;
    const d = getTrianglePath(r, direction);
    return { ...keyStyle, d };
  }

  protected getHaloStyle(attributes: ParsedStarStyleProps): KeyShapeStyleProps {
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<KeyShapeStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);

    return {
      ...keyStyle,
      ...haloStyle,
    } as KeyShapeStyleProps;
  }

  protected getAnchorsStyle(attributes: ParsedStarStyleProps): NodeAnchorStyleProps[] {
    const { r, direction } = attributes;
    const anchors = getTriangleAnchors(r, direction);

    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];

    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getTriangleAnchorByPosition(position as any, anchors);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  protected drawKeyShape(attributes: ParsedStarStyleProps, container: Group): GPath {
    return this.upsert('key', GPath, this.getKeyStyle(attributes), container) as GPath;
  }
}
