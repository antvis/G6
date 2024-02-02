import { Path as GPath, type DisplayObjectConfig, type PathStyleProps as GPathStyleProps, type Group } from '@antv/g';
import { getStarAnchorByPosition, getStarAnchors, getStarPath } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps, NodeAnchorStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = GPathStyleProps & {
  /**
   * 外半径
   */
  outerR: number;
  /**
   * 内半径
   */
  innerR: number;
};

export type StarStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;
type ParsedStarStyleProps = Required<StarStyleProps>;
type StarOptions = DisplayObjectConfig<StarStyleProps>;

/**
 * Draw star based on BaseNode, override drawKeyShape.
 */
export class Star extends BaseNode<KeyShapeStyleProps, GPath> {
  constructor(options: StarOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedStarStyleProps): KeyShapeStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const { outerR, innerR } = keyStyle;
    const d = getStarPath(outerR, innerR);
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
    const { outerR, innerR } = attributes;
    const anchors = getStarAnchors(outerR, innerR);

    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];

    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getStarAnchorByPosition(position as any, anchors);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  protected drawKeyShape(attributes: ParsedStarStyleProps, container: Group): GPath {
    return this.upsert('key', GPath, this.getKeyStyle(attributes), container) as GPath;
  }

  connectedCallback() {}
}
