import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { CardinalPlacement, PrefixObject } from '../../types';
import { getPolygonTextStyleByPlacement } from '../../utils/polygon';
import { subStyleProps } from '../../utils/prefix';
import { getWordWrapWidthByBox } from '../../utils/text';
import type { LabelStyleProps } from '../shapes';
import { BaseShape } from './base-shape';
import { Label } from './label';

type AnnotatedPathLabelStyleProps = LabelStyleProps & {
  /**
   * <zh/> 标签位置，可选值为 'top'、'right'、'bottom'、'left'、'center'；默认为 'bottom'
   * <en/> Label position, optional values are 'top', 'right', 'bottom', 'left', 'center'; default is 'bottom'
   */
  placement?: CardinalPlacement | 'center';
  /**
   * <zh/> 标签是否贴合轮廓，默认为 true
   * <en/> Whether the label is close to the contour, default is true
   */
  closeToPath?: boolean;
  /**
   * <zh/> 标签是否跟随轮廓旋转，默认为 true，仅在 closeToPath 为 true 时生效
   * <en/> Whether the label rotates with the contour, default is true. Only effective when closeToPath is true
   */
  autoRotate?: boolean;
  /**
   * <zh/> x 轴偏移量
   * <en/> Label x-axis offset
   */
  offsetX?: number;
  /**
   * <zh/> y 轴偏移量
   * <en/> Label y-axis offset
   */
  offsetY?: number;
  /**
   * <zh/> 文本的最大宽度，超出会自动省略
   * <en/> The maximum width of the text, which will be automatically ellipsis if exceeded
   */
  maxWidth?: number;
};

export type AnnotatedPathStyleProps = PathStyleProps & {
  label?: boolean;
} & PrefixObject<AnnotatedPathLabelStyleProps, 'label'>;
type ParsedAnnotatedPathStyleProps = Required<AnnotatedPathStyleProps>;
type AnnotatedPathOptions = DisplayObjectConfig<AnnotatedPathStyleProps>;

export class AnnotatedPath extends BaseShape<AnnotatedPathStyleProps> {
  static defaultStyleProps: Partial<AnnotatedPathStyleProps> = {
    label: true,
    labelPlacement: 'bottom',
    labelCloseToPath: true,
    labelAutoRotate: true,
    labelOffsetX: 0,
    labelOffsetY: 0,
  };

  constructor(options: AnnotatedPathOptions) {
    super(deepMix({}, { style: AnnotatedPath.defaultStyleProps }, options));
  }

  protected getLabelStyle(attributes: ParsedAnnotatedPathStyleProps): LabelStyleProps | false {
    if (!attributes.label || !attributes.path || attributes.path.length === 0) return false;
    const { maxWidth, offsetX, offsetY, autoRotate, placement, closeToPath, ...labelStyle } = subStyleProps<
      Required<AnnotatedPathLabelStyleProps>
    >(this.getGraphicStyle(attributes), 'label');

    const key = this.shapeMap.key;
    const keyBounds = key?.getRenderBounds();

    return Object.assign(
      getPolygonTextStyleByPlacement(keyBounds, placement, offsetX, offsetY, closeToPath, attributes.path, autoRotate),
      { wordWrapWidth: getWordWrapWidthByBox(keyBounds, maxWidth) },
      labelStyle,
    );
  }

  protected getKeyStyle(attributes: ParsedAnnotatedPathStyleProps): PathStyleProps {
    return this.getGraphicStyle(attributes);
  }

  public render(attributes: ParsedAnnotatedPathStyleProps, container: Group): void {
    this.upsert('key', Path, this.getKeyStyle(attributes), container);
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }
}
