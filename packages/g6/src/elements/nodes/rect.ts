import { Path as GPath } from '@antv/g';
import { getRectPath } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { BaseNode } from './base-node';

import type { DisplayObjectConfig, PathStyleProps as GPathStyleProps, Group } from '@antv/g';
import type { BaseNodeStyleProps } from './base-node';

type KeyShapeStyleProps = GPathStyleProps & {
  size: number[] | number;
};

export type RectStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;

type ParsedRectStyleProps = Required<RectStyleProps>;

type RectOptions = DisplayObjectConfig<RectStyleProps>;

/**
 * Draw Rect based on BaseNode, override drawKeyShape.
 */
export class Rect extends BaseNode<KeyShapeStyleProps, GPath> {
  constructor(options: RectOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedRectStyleProps): KeyShapeStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const { size } = keyStyle;
    const d = getRectPath(size);
    return { ...keyStyle, d };
  }

  protected getHaloStyle(attributes: ParsedRectStyleProps): KeyShapeStyleProps {
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<KeyShapeStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);

    return {
      ...keyStyle,
      ...haloStyle,
    } as KeyShapeStyleProps;
  }

  protected drawKeyShape(attributes: ParsedRectStyleProps, container: Group): GPath {
    return this.upsert('key', GPath, this.getKeyStyle(attributes), container) as GPath;
  }

  connectedCallback() {}
}
