import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import type { LoopEdgePosition } from '../../types/edge';
import { adjustLoopEndpointsIfNeed, getCubicPath, getLoopControlPoints, getLoopEndpoints } from '../../utils/edge';
import { omitStyleProps } from '../../utils/prefix';
import type { BaseEdgeKeyStyleProps, BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type LoopKeyStyleProps = BaseEdgeKeyStyleProps<PathStyleProps> & {
  /**
   * <zh/> 边的位置
   * <en/> The position of the edge
   */
  position?: LoopEdgePosition;
  /**
   * <zh/> 指定是否顺时针绘制环
   * <en/> Specify whether to draw the loop clockwise
   */
  clockwise?: boolean;
  /**
   * <zh/> 从节点 keyShape 边缘到自环顶部的距离，用于指定自环的曲率，默认为宽度或高度的最大值
   * <en/> Determine the position from the edge of the node keyShape to the top of the self-loop, used to specify the curvature of the self-loop, the default value is the maximum of the width or height
   */
  dist?: number;
};

export type LoopStyleProps = BaseEdgeStyleProps<LoopKeyStyleProps>;

type ParsedLoopStyleProps = Required<LoopStyleProps>;

type LoopOptions = DisplayObjectConfig<LoopStyleProps>;

export class Loop extends BaseEdge<PathStyleProps, Path> {
  static defaultStyleProps: Partial<LoopStyleProps> = {
    position: 'top',
    clockwise: true,
  };

  constructor(options: LoopOptions) {
    super(deepMix({}, { style: Loop.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedLoopStyleProps, container: Group): Path | undefined {
    const { sourceNode, targetNode } = attributes;
    const keyStyle = sourceNode.id == targetNode.id && this.getKeyStyle(attributes);
    return this.upsert('key', Path, keyStyle, container);
  }

  protected getKeyStyle(attributes: ParsedLoopStyleProps): PathStyleProps {
    const keyStyle = omitStyleProps(this.getGraphicStyle(attributes), ['halo', 'label', 'startArrow', 'endArrow']);
    const { sourcePoint, targetPoint, controlPoints } = this.getLoopPoints(attributes);

    return {
      ...keyStyle,
      path: getCubicPath(sourcePoint, targetPoint, controlPoints),
    };
  }

  private getLoopPoints(attributes: ParsedLoopStyleProps): {
    sourcePoint: Point;
    targetPoint: Point;
    controlPoints: [Point, Point];
  } {
    const {
      sourceNode: node,
      sourceAnchor: sourceAnchorKey,
      targetAnchor: targetAnchorKey,
      sourcePoint: rawSourcePoint,
      targetPoint: rawTargetPoint,
      position,
      clockwise,
      dist,
    } = attributes;

    const sourceAnchor = node.getAnchors()[sourceAnchorKey || targetAnchorKey];
    const targetAnchor = node.getAnchors()[targetAnchorKey || sourceAnchorKey];

    let [sourcePoint, targetPoint] = getLoopEndpoints(
      node,
      position,
      clockwise,
      sourceAnchor,
      targetAnchor,
      rawSourcePoint,
      rawTargetPoint,
    );

    const controlPoints = getLoopControlPoints(node, sourcePoint, targetPoint, dist);

    [sourcePoint, targetPoint] = adjustLoopEndpointsIfNeed(
      sourcePoint,
      targetPoint,
      controlPoints,
      sourceAnchor,
      targetAnchor,
    );

    return { sourcePoint, targetPoint, controlPoints };
  }
}
