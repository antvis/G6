import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps, Group } from '@antv/g';
import { Rect as GRect } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

/**
 * <zh/> 矩形节点样式配置项
 *
 * <en/> Rect node style props
 */
export interface RectStyleProps extends BaseNodeStyleProps {}
type ParsedRectStyleProps = Required<RectStyleProps>;

/**
 * <zh/> 矩形节点
 *
 * <en/> Rect node
 */
export class Rect extends BaseNode<RectStyleProps> {
  static defaultStyleProps: Partial<RectStyleProps> = {
    size: [48, 24],
    anchor: [0.5, 0.5],
  };

  constructor(options: DisplayObjectConfig<RectStyleProps>) {
    super(deepMix({}, { style: Rect.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedRectStyleProps): GRectStyleProps {
    const [width, height] = this.getSize(attributes);
    return {
      ...super.getKeyStyle(attributes),
      width,
      height,
    };
  }

  protected getIconStyle(attributes: ParsedRectStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const { width, height } = this.getKeyStyle(attributes);

    return style
      ? ({
          width: (width as number) * ICON_SIZE_RATIO,
          height: (height as number) * ICON_SIZE_RATIO,
          ...style,
        } as IconStyleProps)
      : false;
  }

  protected drawKeyShape(attributes: ParsedRectStyleProps, container: Group): GRect | undefined {
    return this.upsert('key', GRect, this.getKeyStyle(attributes), container);
  }
}
