import type { DisplayObjectConfig, PathStyleProps as GPathStyleProps, Group } from '@antv/g';
import { Path as GPath } from '@antv/g';
import { getRectPath } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = GPathStyleProps & {
  width: number;
  height: number;
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
    const { width, height } = keyStyle;
    const d = getRectPath(width, height);
    return { ...keyStyle, d };
  }

  protected getHaloStyle(attributes: ParsedRectStyleProps): KeyShapeStyleProps {
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<KeyShapeStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);
    const lineWidth = Number(haloStyle.lineWidth);
    const d = getRectPath(Number(keyStyle.width) + lineWidth, Number(keyStyle.height) + lineWidth);

    return {
      ...keyStyle,
      d,
      ...haloStyle,
    } as KeyShapeStyleProps;
  }

  protected drawKeyShape(attributes: ParsedRectStyleProps, container: Group): GPath {
    return this.upsert('key', GPath, this.getKeyStyle(attributes), container) as GPath;
  }
}
