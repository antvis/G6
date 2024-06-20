import type { DisplayObjectConfig, Group } from '@antv/g';
import { mergeOptions } from '../../utils/style';
import { BaseShape } from './base-shape';
import type { LabelStyleProps } from './label';
import { Label } from './label';

/**
 * <zh/> 徽标样式
 *
 * <en/> Badge style
 */
export interface BadgeStyleProps extends LabelStyleProps {}

/**
 * <zh/> 徽标
 *
 * <en/> Badge
 * @remarks
 * <zh/> 徽标是一种特殊的标签，通常用于展示数量或状态信息。
 *
 * <en/> Badge is a special label, usually used to display quantity or status information.
 */
export class Badge extends BaseShape<BadgeStyleProps> {
  static defaultStyleProps: Partial<BadgeStyleProps> = {
    padding: [2, 4, 2, 4],
    fontSize: 10,
    wordWrap: false,
    backgroundRadius: '50%',
    backgroundOpacity: 1,
  };

  constructor(options: DisplayObjectConfig<BadgeStyleProps>) {
    super(mergeOptions({ style: Badge.defaultStyleProps }, options));
  }

  protected getBadgeStyle(attributes: Required<BadgeStyleProps>) {
    return this.getGraphicStyle(attributes);
  }

  public render(attributes: Required<BadgeStyleProps> = this.parsedAttributes, container: Group = this) {
    this.upsert('label', Label, this.getBadgeStyle(attributes), container);
  }

  public getGeometryBounds() {
    const labelShape = this.getShape<BaseShape<LabelStyleProps>>('label');
    const shape = labelShape.getShape('background') || labelShape.getShape('text');
    return shape.getGeometryBounds();
  }
}
