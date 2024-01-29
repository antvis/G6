import type { DisplayObjectConfig, LineStyleProps, PathStyleProps, PolylineStyleProps } from '@antv/g';
import { DisplayObject, Group, Line, Path, Polyline } from '@antv/g';
import { deepMix, pick } from '@antv/util';
import type { PrefixObject } from '../../types';
import { subStyleProps } from '../../utils/prefix';
import { Arrow, Label } from '../shapes';
import { ArrowStyleProps } from '../shapes/arrow';
import type { BaseShapeStyleProps } from '../shapes/base-shape';
import { BaseShape } from '../shapes/base-shape';
import type { LabelStyleProps } from '../shapes/label';

type EdgeKeyShape = Line | Path | Polyline;
type EdgeBodyStyleProps = LineStyleProps | PathStyleProps | PolylineStyleProps;
type EdgeArrow = boolean | string | object | DisplayObject;

type EdgeLabelStyleProps = {
  /**
   * <zh/> 标签相对于边的位置。可以是 'start'、'center'、'end' 或特定比率（数字）
   * <en/> The position of the label relative to the edge. Can be 'start', 'center', 'end', or a specific ratio (number)
   */
  position?: 'start' | 'center' | 'end' | number;
  /**
   * <zh/> 标签平行于边的水平偏移量
   * <en/> The horizontal offset of the label parallel to the edge
   */
  offsetX?: number;
  /**
   * <zh/> 标签垂直于边的垂直偏移量
   * <en/> The vertical offset of the label perpendicular to the edge
   */
  offsetY?: number;
  /**
   * <zh/> 是否自动旋转以与边的方向对齐
   * <en/> Indicates whether the label should automatically rotate to align with the edge's direction
   */
  autoRotate?: boolean;
} & LabelStyleProps;

export type BaseEdgeStyleProps = BaseShapeStyleProps & {
  /**
   * <zh/> 边的主体部分
   * <en/> keyShape of edge
   */
  keyShape?: EdgeKeyShape;
  /**
   * <zh/> 起点箭头
   * <en/> arrow at the start of the edge
   */
  startArrow?: EdgeArrow;
  /**
   * <zh/> 终点箭头
   * <en/> arrow at the end of the edge
   */
  endArrow?: EdgeArrow;
  /**
   * <zh/> 是否显示光晕
   * <en/> whether to show halo
   */
  showHalo?: boolean;
  /**
   * <zh/> 是否显示文本标签
   * <en/> whether to show label
   */
  showLabel?: boolean;
} & PrefixObject<EdgeLabelStyleProps, 'label'> &
  PrefixObject<EdgeBodyStyleProps, 'halo'>;

type ParsedBaseEdgeStyleProps = Required<BaseEdgeStyleProps>;

export type BaseEdgeOptions = DisplayObjectConfig<ParsedBaseEdgeStyleProps>;

export class BaseEdge<T extends BaseEdgeStyleProps> extends BaseShape<T> {
  static defaultStyleProps: Partial<BaseEdgeStyleProps> = {
    showLabel: true,
    labelPosition: 'center',
    labelOffsetY: -6,
    labelAutoRotate: true,
    labelIsBillboard: true,
    showHalo: false,
    haloLineDash: 0,
    startArrow: false,
    endArrow: false,
  };

  private keyShape!: EdgeKeyShape;

  constructor(options: BaseEdgeOptions) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  public render(attributes: Required<T>, container: Group): void {
    this.appendKeyShape(attributes, container);

    this.appendArrow(attributes);
    this.appendArrow(attributes, false);

    this.upsert(
      'halo',
      this.getKeyShape().constructor as typeof DisplayObject,
      this.getHaloStyle(attributes),
      container,
    );

    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }

  protected appendKeyShape(attributes: Required<T>, container: Group): void {
    const { keyShape } = attributes;

    if (!keyShape) return;

    this.keyShape = keyShape;
    container.appendChild(this.keyShape);
  }

  protected getKeyShape() {
    return this.keyShape;
  }

  protected getKeyShapeStyle() {
    return this.keyShape.attributes;
  }

  protected getHaloStyle(attributes: BaseEdgeStyleProps): false | EdgeBodyStyleProps {
    if (attributes.showHalo === false) return false;

    const keyStyle = this.getKeyShapeStyle();

    const haloStyle = subStyleProps<LineStyleProps>(attributes, 'halo');

    return Object.assign({}, keyStyle, haloStyle);
  }

  protected getLabelStyle(attributes: BaseEdgeStyleProps): false | LabelStyleProps {
    if (attributes.showLabel === false) return false;

    const labelStyle = subStyleProps<EdgeLabelStyleProps>(attributes, 'label');

    const { position, offsetX, offsetY, autoRotate, ...restStyle } = labelStyle;

    const labelPositionStyle = this.calculateLabelPositionStyle(labelStyle);

    return Object.assign({}, labelPositionStyle, restStyle) as LabelStyleProps;
  }

  private calculateLabelPositionStyle({ position, offsetX, offsetY, autoRotate }: EdgeLabelStyleProps) {
    const DEFAULT_OFFSET = 4;
    const START_RATIO = 0;
    const MIDDLE_RATIO = 0.5;
    const END_RATIO = 0.99;

    let ratio = typeof position === 'number' ? position : MIDDLE_RATIO;

    const positionStyle: Partial<EdgeLabelStyleProps> = {
      textAlign: 'center',
      offsetX,
      offsetY,
    };

    if (position === 'start') {
      positionStyle.textAlign = 'left';
      positionStyle.offsetX ??= DEFAULT_OFFSET;
      ratio = START_RATIO;
    } else if (position === 'end') {
      positionStyle.textAlign = 'right';
      positionStyle.offsetX ??= -DEFAULT_OFFSET;
      ratio = END_RATIO;
    } else {
      positionStyle.offsetX ??= 0;
      positionStyle.offsetY ??= 0;
    }

    this.calculateLabelPosition(positionStyle, ratio);

    if (autoRotate) {
      this.applyAutoRotation(positionStyle, ratio);
    }

    return pick(positionStyle, ['x', 'y', 'textAlign', 'transform']);
  }

  private applyAutoRotation(positionStyle: Partial<EdgeLabelStyleProps>, ratio: number) {
    const { textAlign } = positionStyle;
    const point = this.getKeyShape().getPoint(ratio);
    const pointOffset = this.getKeyShape().getPoint(ratio + 0.01);
    let angle = Math.atan2(pointOffset.y - point.y, pointOffset.x - point.x);

    if (isNaN(angle)) angle = 0;

    const isRevert = pointOffset.x < point.x;
    if (isRevert) {
      positionStyle.textAlign = textAlign === 'center' ? textAlign : textAlign === 'left' ? 'right' : 'left';
      positionStyle.offsetX! *= -1;
      angle += Math.PI;
    }

    if (angle % Math.PI === 0) return;

    this.calculateLabelPosition(positionStyle, ratio, angle);
    positionStyle.transform = `rotate(${(angle / Math.PI) * 180}deg)`;
  }

  private calculateLabelPosition(positionStyle: Partial<EdgeLabelStyleProps>, ratio: number, angle?: number) {
    const { x: pointX, y: pointY } = this.getKeyShape().getPoint(ratio);
    const { offsetX = 0, offsetY = 0 } = positionStyle;

    if (angle) {
      positionStyle.x = pointX + offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
      positionStyle.y = pointY + offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
    } else {
      positionStyle.x = pointX + offsetX;
      positionStyle.y = pointY + offsetY;
    }
  }

  protected appendArrow(attributes: Partial<BaseEdgeStyleProps>, isStart = true): void {
    const targetAttr = isStart ? 'markerStart' : 'markerEnd';
    // @ts-ignore
    this.getKeyShape().style[targetAttr] = new Arrow({ style: this.getArrowStyle(attributes, isStart) });
  }

  private getArrowStyle(attributes: Partial<BaseEdgeStyleProps>, isStart = true): false | ArrowStyleProps {
    const { markerEnd, markerStart, ...keyShape } = this.getKeyShapeStyle();
    const arrowCfg = isStart ? attributes.startArrow : attributes.endArrow;
    if (!arrowCfg) return false;
    let arrowStyle;
    if (typeof arrowCfg === 'string') {
      arrowStyle = { type: arrowCfg };
    } else if (typeof arrowCfg === 'boolean') {
      arrowStyle = { type: 'triangle' };
    } else if (arrowCfg instanceof DisplayObject) {
      arrowStyle = { type: 'custom', custom: arrowCfg };
    } else {
      arrowStyle = { ...arrowCfg };
    }
    return { ...keyShape, lineDash: 0, fill: keyShape.stroke, ...arrowStyle };
  }
}
