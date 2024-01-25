import type { DisplayObjectConfig, IAnimation, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { deepMix } from '@antv/util';
import type { PositionPoint } from '../../../types/position';
import { createAnimationsProxy } from '../../../utils/animate';
import type { BaseElementStyleProps } from '../base';
import { BaseElement } from '../base';

interface SimpleEdgeStyleProps extends BaseElementStyleProps {
  source: ID;
  target: ID;
  sourcePoint: PositionPoint;
  targetPoint: PositionPoint;

  // 如果是曲线，可能基类需要额外指定控制点或者控制点的计算方式
  // 控制点
  // controlPoints: PositionPoint[];
  // 控制点计算方式
  // 曲线偏移量
  // curveOffset: number;
  // 曲线控制点百分比
  // curvePosition: number;
}

type SimpleEdgeOptions = DisplayObjectConfig<SimpleEdgeStyleProps>;

export class SimpleEdge extends BaseElement<SimpleEdgeStyleProps> {
  static defaultStyleProps: Partial<SimpleEdgeStyleProps> = {
    lineWidth: 1,
  };

  constructor(options: SimpleEdgeOptions) {
    super(deepMix({}, { style: SimpleEdge.defaultStyleProps }, options));
  }

  protected getPathStyle(attributes: SimpleEdgeStyleProps): PathStyleProps {
    const {
      keyShapeColor,
      sourcePoint: [x1, y1, z1] = this.attributes.sourcePoint || [0, 0, 0],
      targetPoint: [x2, y2, z2] = this.attributes.targetPoint || [0, 0, 0],
      ...restStyle
    } = this.getStyle(attributes);

    const pathStyle: PathStyleProps = {
      d: [
        ['M', x1, y1],
        ['L', x2, y2],
      ],
      ...restStyle,
    };

    if (keyShapeColor) {
      pathStyle.stroke = keyShapeColor;
    }

    return pathStyle;
  }

  render(attributes: SimpleEdgeStyleProps) {
    this.upsert('keyShape', Path, this.getPathStyle(attributes), this);
  }

  animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation {
    const keyShapeKeyframes = keyframes.map((keyframe) =>
      this.getPathStyle(keyframe as unknown as SimpleEdgeStyleProps),
    ) as unknown as Keyframe[];

    const keyShapeAnimationResult = this.shapeMap['keyShape'].animate(keyShapeKeyframes, options);
    return createAnimationsProxy(super.animate(keyframes, options), [keyShapeAnimationResult]);
  }
}
