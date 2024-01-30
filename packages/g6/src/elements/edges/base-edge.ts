import type { DisplayObjectConfig, LineStyleProps, PathStyleProps, PolylineStyleProps } from '@antv/g';
import { DisplayObject, Group, Path } from '@antv/g';
import { Point, deepMix } from '@antv/util';
import { getPlugin } from '../../registry';
import type { PrefixObject } from '../../types';
import { EdgeKey, EdgeLabelStyleProps } from '../../types/edge';
import { getLabelPositionStyle } from '../../utils/edge';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import { Label, triangle } from '../shapes';
import type { BaseShapeStyleProps } from '../shapes/base-shape';
import { BaseShape } from '../shapes/base-shape';
import type { LabelStyleProps } from '../shapes/label';

type EdgeKeyStyleProps = LineStyleProps | PathStyleProps | PolylineStyleProps;

type ArrowStyleProps = {
  type?: string;
  ctor?: { new (...args: any[]): DisplayObject };
  width?: number;
  height?: number;
} & PathStyleProps;

export type BaseEdgeStyleProps = BaseShapeStyleProps &
  EdgeKeyStyleProps & {
    sourcePoint: Point;
    targetPoint: Point;
    halo?: boolean;
    label?: boolean;
    icon?: boolean;
    startArrow?: boolean;
    endArrow?: boolean;
    startArrowOffset?: number;
    endArrowOffset?: number;
  } & PrefixObject<EdgeKeyStyleProps, 'halo'> &
  PrefixObject<EdgeLabelStyleProps, 'label'> &
  PrefixObject<any, 'icon'> &
  PrefixObject<ArrowStyleProps, 'startArrow'> &
  PrefixObject<ArrowStyleProps, 'endArrow'>;

type ParsedBaseEdgeStyleProps = Required<BaseEdgeStyleProps>;

export type BaseEdgeOptions = DisplayObjectConfig<ParsedBaseEdgeStyleProps>;

export abstract class BaseEdge<T extends BaseEdgeStyleProps> extends BaseShape<T> {
  static defaultStyleProps: Partial<BaseEdgeStyleProps> = {
    label: true,
    labelPosition: 'center',
    labelOffsetY: -6,
    labelAutoRotate: true,
    labelIsBillboard: true,
    halo: false,
    haloLineDash: 0,
    startArrow: false,
    endArrow: false,
  };

  private key!: EdgeKey;

  constructor(options: BaseEdgeOptions) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  public render(attributes: Required<T>, container: Group): void {
    // 1. key shape
    const key = this.drawKey(attributes, container);
    if (!key) return;

    this.key = key;

    // 2. arrows
    this.drawArrow(attributes, true);
    this.drawArrow(attributes, false);

    // 3. halo
    this.upsert('halo', this.key.constructor as typeof DisplayObject, this.getHaloStyle(attributes), container);

    // 4. icon
    this.upsert('icon', Label, this.getIconStyle(attributes), container);

    // 5. label
    this.upsert('label', Label, this.getLabelStyle(attributes), this.key);
  }

  public abstract drawKey(attributes: Required<T>, container: Group): EdgeKey | undefined;

  protected getKeyStyle(attributes: Required<T>): EdgeKeyStyleProps {
    return omitStyleProps(this.getGraphicStyle(attributes), ['halo', 'icon', 'label', 'startArrow', 'endArrow']);
  }

  protected getHaloStyle(attributes: Required<T>): false | EdgeKeyStyleProps {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<LineStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getIconStyle(attributes: Required<T>): false | any {
    if (attributes.icon === false) return false;

    return subStyleProps<any>(this.getGraphicStyle(attributes), 'icon');
  }

  protected getLabelStyle(attributes: Required<T>): false | LabelStyleProps {
    if (attributes.label === false) return false;

    const labelStyle = subStyleProps<EdgeLabelStyleProps>(this.getGraphicStyle(attributes), 'label');
    const { position, offsetX, offsetY, autoRotate, ...restStyle } = labelStyle;
    const labelPositionStyle = getLabelPositionStyle(
      this.shapeMap.key as EdgeKey,
      position,
      autoRotate,
      offsetX,
      offsetY,
    );

    return { ...labelPositionStyle, ...restStyle } as LabelStyleProps;
  }

  protected drawArrow(attributes: Required<T>, isStart: boolean) {
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const arrowPresence = attributes[arrowType];

    if (arrowPresence) {
      const { ctor = Path } = subStyleProps<ArrowStyleProps>(this.getGraphicStyle(attributes), arrowType);
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      this.key.style[isStart ? 'markerStart' : 'markerEnd'] = new ctor({ style: arrowStyle });
      this.key.style[isStart ? 'markerStartOffset' : 'markerEndOffset'] = isStart
        ? attributes.startArrowOffset
        : attributes.endArrowOffset;
    } else {
      this.key.style[isStart ? 'markerStart' : 'markerEnd'] = undefined;
    }
  }

  private getArrowStyle(attributes: Required<T>, isStart: boolean) {
    const { stroke, ...keyStyle } = this.getKeyStyle(attributes);
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const {
      width = 10,
      height = 10,
      type = 'triangle',
      ctor = Path,
      ...arrowStyle
    } = subStyleProps<ArrowStyleProps>(this.getGraphicStyle(attributes), arrowType);

    let path;
    if (ctor === Path) {
      const arrowFn = getPlugin('arrow', type) || triangle;
      path = arrowFn(width, height);
    }

    return {
      ...keyStyle,
      lineDash: 0,
      ...(path && { path, fill: type === 'simple' ? '' : stroke }),
      anchor: '0.5 0.5',
      transformOrigin: 'center',
      width,
      height,
      ...arrowStyle,
    };
  }

  connectedCallback() {}
}
