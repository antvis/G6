import type {
  BaseStyleProps,
  DisplayObject,
  DisplayObjectConfig,
  Group,
  LineStyleProps,
  PathStyleProps,
} from '@antv/g';
import { Path } from '@antv/g';
import { deepMix, isFunction } from '@antv/util';
import type { Point, PrefixObject } from '../../types';
import type { EdgeKey, EdgeLabelStyleProps } from '../../types/edge';
import { getLabelPositionStyle } from '../../utils/edge';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import * as Symbol from '../../utils/symbol';
import { SymbolFactor } from '../../utils/symbol';
import type { LabelStyleProps } from '../shapes';
import { Label } from '../shapes';
import type { BaseShapeStyleProps } from '../shapes/base-shape';
import { BaseShape } from '../shapes/base-shape';

type SymbolName = 'triangle' | 'circle' | 'diamond' | 'vee' | 'rect' | 'triangleRect' | 'simple';

type EdgeArrowStyleProps = {
  ctor?: { new (...args: any[]): DisplayObject };
  type?: SymbolName | SymbolFactor;
  width?: number;
  height?: number;
} & PathStyleProps &
  Record<string, unknown>;

export type BaseEdgeStyleProps<KT extends object> = BaseShapeStyleProps &
  KT & {
    sourcePoint?: Point;
    targetPoint?: Point;
    label?: boolean;
    halo?: boolean;
    startArrow?: boolean;
    endArrow?: boolean;
    startArrowOffset?: number;
    endArrowOffset?: number;
  } & PrefixObject<EdgeLabelStyleProps, 'label'> &
  PrefixObject<KT, 'halo'> &
  PrefixObject<EdgeArrowStyleProps, 'startArrow'> &
  PrefixObject<EdgeArrowStyleProps, 'endArrow'>;

export type BaseEdgeOptions<KT extends object> = DisplayObjectConfig<BaseEdgeStyleProps<KT>>;

type ParsedBaseEdgeStyleProps<KT extends object> = Required<BaseEdgeStyleProps<KT>>;
export abstract class BaseEdge<KT extends object, KS extends DisplayObject> extends BaseShape<BaseEdgeStyleProps<KT>> {
  static defaultStyleProps: BaseEdgeStyleProps<Record<string, unknown>> = {
    label: true,
    labelPosition: 'center',
    labelOffsetX: 4,
    labelOffsetY: -6,
    labelIsBillboard: true,
    labelAutoRotate: true,
    halo: false,
    haloLineDash: 0,
    haloPointerEvents: 'none',
    haloZIndex: -1,
    haloDroppable: false,
    startArrow: false,
    startArrowCtor: Path,
    startArrowType: 'triangle',
    startArrowWidth: 10,
    startArrowHeight: 10,
    startArrowAnchor: '0.5 0.5',
    startArrowTransformOrigin: 'center',
    startArrowLineDash: 0,
    endArrow: false,
    endArrowCtor: Path,
    endArrowType: 'triangle',
    endArrowWidth: 10,
    endArrowHeight: 10,
    endArrowAnchor: '0.5 0.5',
    endArrowTransformOrigin: 'center',
    endArrowLineDash: 0,
  };

  constructor(options: BaseEdgeOptions<KT>) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseEdgeStyleProps<KT>): KT {
    return omitStyleProps(this.getGraphicStyle(attributes), ['halo', 'label', 'startArrow', 'endArrow']);
  }

  protected getHaloStyle(attributes: ParsedBaseEdgeStyleProps<KT>): false | KT {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<LineStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getLabelStyle(attributes: ParsedBaseEdgeStyleProps<KT>): false | LabelStyleProps {
    if (attributes.label === false) return false;

    const labelStyle = subStyleProps<Required<EdgeLabelStyleProps>>(this.getGraphicStyle(attributes), 'label');
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

  protected drawArrow(attributes: ParsedBaseEdgeStyleProps<KT>, isStart: boolean) {
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const arrowPresence = attributes[arrowType];

    if (arrowPresence) {
      const { ctor } = subStyleProps<Required<EdgeArrowStyleProps>>(this.getGraphicStyle(attributes), arrowType);
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = new ctor({ style: arrowStyle });
      this.shapeMap.key.style[isStart ? 'markerStartOffset' : 'markerEndOffset'] = isStart
        ? attributes.startArrowOffset
        : attributes.endArrowOffset;
    } else {
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = undefined;
    }
  }

  private getArrowStyle(attributes: ParsedBaseEdgeStyleProps<KT>, isStart: boolean) {
    const { stroke, ...keyStyle } = this.getKeyStyle(attributes) as BaseStyleProps;
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const { width, height, type, ctor, ...arrowStyle } = subStyleProps<Required<EdgeArrowStyleProps>>(
      this.getGraphicStyle(attributes),
      arrowType,
    );

    let path;
    if (ctor === Path) {
      const arrowFn = isFunction(type) ? type : Symbol[type] || Symbol.triangle;
      path = arrowFn(width, height);
    }

    return {
      ...keyStyle,
      ...(path && { path, fill: type === 'simple' ? '' : stroke }),
      width,
      height,
      ...arrowStyle,
    };
  }

  protected drawLabelShape(attributes: ParsedBaseEdgeStyleProps<KT>, container: Group) {
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }

  protected abstract drawKeyShape(attributes: ParsedBaseEdgeStyleProps<KT>, container: Group): KS | undefined;

  public render(attributes = this.parsedAttributes, container: Group = this): void {
    // 1. key shape
    const keyShape = this.drawKeyShape(attributes, container);
    if (!keyShape) return;

    // 2. arrows
    this.drawArrow(attributes, true);
    this.drawArrow(attributes, false);

    // 3. label
    this.drawLabelShape(attributes, container);

    // 4. halo
    this.upsert(
      'halo',
      this.shapeMap.key.constructor as new (...args: any[]) => KS,
      this.getHaloStyle(attributes),
      container,
    );
  }

  animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions) {
    const result = super.animate(keyframes, options);

    result.onframe = () => {
      this.drawLabelShape(this.parsedAttributes, this);
    };

    return result;
  }
}
