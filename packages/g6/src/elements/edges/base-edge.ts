import type { BaseStyleProps, DisplayObjectConfig, LineStyleProps, PathStyleProps } from '@antv/g';
import { DisplayObject, Group, Path } from '@antv/g';
import { Point, deepMix, isFunction } from '@antv/util';
import type { PrefixObject } from '../../types';
import { EdgeKey, EdgeLabelStyleProps } from '../../types/edge';
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
  type?: SymbolName | SymbolFactor;
  ctor?: { new (...args: any[]): DisplayObject };
  width?: number;
  height?: number;
} & PathStyleProps;

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

export abstract class BaseEdge<KT extends object, KS extends DisplayObject> extends BaseShape<BaseEdgeStyleProps<KT>> {
  static defaultStyleProps: BaseEdgeStyleProps<Record<string, unknown>> = {
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

  constructor(options: BaseEdgeOptions<KT>) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: BaseEdgeStyleProps<KT>): KT {
    return omitStyleProps(this.getGraphicStyle(attributes), ['halo', 'label', 'startArrow', 'endArrow']);
  }

  protected getHaloStyle(attributes: BaseEdgeStyleProps<KT>): false | KT {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<LineStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getLabelStyle(attributes: BaseEdgeStyleProps<KT>): false | LabelStyleProps {
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

  protected drawArrow(attributes: BaseEdgeStyleProps<KT>, isStart: boolean) {
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const arrowPresence = attributes[arrowType];

    if (arrowPresence) {
      const { ctor = Path } = subStyleProps<EdgeArrowStyleProps>(this.getGraphicStyle(attributes), arrowType);
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = new ctor({ style: arrowStyle });
      this.shapeMap.key.style[isStart ? 'markerStartOffset' : 'markerEndOffset'] = isStart
        ? attributes.startArrowOffset
        : attributes.endArrowOffset;
    } else {
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = undefined;
    }
  }

  private getArrowStyle(attributes: BaseEdgeStyleProps<KT>, isStart: boolean) {
    const { stroke, ...keyStyle } = this.getKeyStyle(attributes) as BaseStyleProps;
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const {
      width = 10,
      height = 10,
      type = 'triangle',
      ctor = Path,
      ...arrowStyle
    } = subStyleProps<EdgeArrowStyleProps>(this.getGraphicStyle(attributes), arrowType);

    let path;
    if (ctor === Path) {
      const arrowFn = isFunction(type) ? type : Symbol[type] || Symbol.triangle;
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

  protected abstract drawKeyShape(attributes: BaseEdgeStyleProps<KT>, container: Group): KS | undefined;

  protected drawLabelShape(attributes: BaseEdgeStyleProps<KT> = this.attributes, container: Group) {
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }

  public render(attributes: BaseEdgeStyleProps<KT> = this.attributes, container: Group = this): void {
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
      this.drawLabelShape(this.attributes, this);
    };

    return result;
  }
}
