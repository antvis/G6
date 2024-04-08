import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { LabelStyleProps } from '../../elements/shapes';
import { BaseShape, Label } from '../../elements/shapes';
import type { CardinalPlacement, PrefixObject } from '../../types';
import { subStyleProps } from '../../utils/prefix';
import { getWordWrapWidthByBox } from '../../utils/text';
import { getHullTextStyleByPlacement } from './util';

type HullLabelStyleProps = LabelStyleProps & {
  /**
   * <zh/> 标签位置，可选值为 'top'、'right'、'bottom'、'left'、'center'；默认为 'bottom'
   * <en/> Label position, optional values are 'top', 'right', 'bottom', 'left', 'center'; default is 'bottom'
   */
  placement?: CardinalPlacement | 'center';
  /**
   * <zh/> 标签是否贴合轮廓，默认为 true
   * <en/> Whether the label is close to the contour, default is true
   */
  closeToContour?: boolean;
  /**
   * <zh/> 标签是否跟随轮廓旋转，默认为 true，仅在 closeToContour 为 true 时生效
   * <en/> Whether the label rotates with the contour, default is true. Only effective when closeToContour is true
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

export type HullStyleProps = PathStyleProps & {
  label?: boolean;
} & PrefixObject<HullLabelStyleProps, 'label'>;
type ParsedHullStyleProps = Required<HullStyleProps>;
type HullOptions = DisplayObjectConfig<HullStyleProps>;

export class Hull extends BaseShape<HullStyleProps> {
  static defaultStyleProps: Partial<HullStyleProps> = {
    label: true,
    labelPlacement: 'bottom',
    labelCloseToContour: true,
    labelAutoRotate: true,
    labelOffsetX: 0,
    labelOffsetY: 0,
  };

  constructor(options: HullOptions) {
    super(deepMix({}, { style: Hull.defaultStyleProps }, options));
  }

  protected getLabelStyle(attributes: ParsedHullStyleProps): LabelStyleProps {
    const { maxWidth, offsetX, offsetY, autoRotate, placement, closeToContour, ...labelStyle } = subStyleProps<
      Required<HullLabelStyleProps>
    >(this.getGraphicStyle(attributes), 'label');

    const contour = this.shapeMap.contour;
    const contourBounds = contour?.getRenderBounds();

    return Object.assign(
      getHullTextStyleByPlacement(
        contourBounds,
        placement,
        offsetX,
        offsetY,
        closeToContour,
        this.parsedAttributes.path,
        autoRotate,
      ),
      { wordWrapWidth: getWordWrapWidthByBox(contourBounds, maxWidth) },
      labelStyle,
    );
  }

  protected getContourStyle(attributes: ParsedHullStyleProps) {
    return this.getGraphicStyle(attributes);
  }

  public render(attributes: ParsedHullStyleProps, container: Group): void {
    this.upsert('contour', Path, this.getContourStyle(attributes), container);
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }
}
