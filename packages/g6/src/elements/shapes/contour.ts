import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import type { CardinalPlacement, Prefix } from '../../types';
import { getPolygonTextStyleByPlacement } from '../../utils/polygon';
import { subStyleProps } from '../../utils/prefix';
import { mergeOptions } from '../../utils/style';
import { getWordWrapWidthByBox } from '../../utils/text';
import type { LabelStyleProps } from '../shapes';
import { BaseShape } from './base-shape';
import { Label } from './label';

export interface ContourLabelStyleProps extends LabelStyleProps {
  /**
   * <zh/> 标签位置
   *
   * <en/> Label position
   * @defaultValue 'bottom'
   */
  placement?: CardinalPlacement | 'center';
  /**
   * <zh/> 标签是否贴合轮廓
   *
   * <en/> Whether the label is close to the contour
   * @defaultValue true
   */
  closeToPath?: boolean;
  /**
   * <zh/> 标签是否跟随轮廓旋转，仅在 closeToPath 为 true 时生效
   *
   * <en/> Whether the label rotates with the contour. Only effective when closeToPath is true
   * @defaultValue true
   */
  autoRotate?: boolean;
  /**
   * <zh/> x 轴偏移量
   *
   * <en/> Label x-axis offset
   * @defaultValue 0
   */
  offsetX?: number;
  /**
   * <zh/> y 轴偏移量
   *
   * <en/> Label y-axis offset
   * @defaultValue 0
   */
  offsetY?: number;
  /**
   * <zh/> 文本的最大宽度，超出会自动省略
   *
   * <en/> The maximum width of the text, which will be automatically ellipsis if exceeded
   */
  maxWidth?: number;
}

export interface ContourStyleProps extends PathStyleProps, Prefix<'label', ContourLabelStyleProps> {
  /**
   * <zh/> 是否显示标签
   *
   * <en/> Whether to display the label
   * @defaultValue true
   */
  label?: boolean;
}
type ParsedContourStyleProps = Required<ContourStyleProps>;
type ContourOptions = DisplayObjectConfig<ContourStyleProps>;

export class Contour extends BaseShape<ContourStyleProps> {
  static defaultStyleProps: Partial<ContourStyleProps> = {
    label: true,
    labelPlacement: 'bottom',
    labelCloseToPath: true,
    labelAutoRotate: true,
    labelOffsetX: 0,
    labelOffsetY: 0,
  };

  constructor(options: ContourOptions) {
    super(mergeOptions({ style: Contour.defaultStyleProps }, options));
  }

  protected getLabelStyle(attributes: ParsedContourStyleProps): LabelStyleProps | false {
    if (!attributes.label || !attributes.d || attributes.d.length === 0) return false;
    const { maxWidth, offsetX, offsetY, autoRotate, placement, closeToPath, ...labelStyle } = subStyleProps<
      Required<ContourLabelStyleProps>
    >(this.getGraphicStyle(attributes), 'label');

    const key = this.shapeMap.key;
    const keyBounds = key?.getRenderBounds();

    return Object.assign(
      getPolygonTextStyleByPlacement(keyBounds, placement, offsetX, offsetY, closeToPath, attributes.d, autoRotate),
      { wordWrapWidth: getWordWrapWidthByBox(keyBounds, maxWidth) },
      labelStyle,
    );
  }

  protected getKeyStyle(attributes: ParsedContourStyleProps): PathStyleProps {
    return this.getGraphicStyle(attributes);
  }

  public render(attributes: ParsedContourStyleProps, container: Group): void {
    this.upsert('key', Path, this.getKeyStyle(attributes), container);
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }
}
