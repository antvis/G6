import type { Group } from '@antv/g';
import { Line } from '@antv/g';
import type { BaseEdgeStyleProps } from '@antv/g6';
import { BaseEdge } from '@antv/g6';

/**
 * <zh/> 3D 直线样式
 *
 * <en/> 3D Line Style Props
 */
export interface Line3DStyleProps extends BaseEdgeStyleProps {}

/**
 * <zh/> 直线
 *
 * <en/> Line Edge
 */
export class Line3D extends BaseEdge {
  protected getKeyPath(): any {
    return [];
  }

  protected getKeyStyle(attributes: Required<Line3DStyleProps>): any {
    const { sourceNode, targetNode } = this;
    const [x1, y1, z1] = sourceNode.getPosition();
    const [x2, y2, z2] = targetNode.getPosition();

    // omit path
    const { d, ...style } = super.getKeyStyle(attributes);
    return { x1, y1, z1, x2, y2, z2, ...style };
  }

  protected drawKeyShape(attributes = this.parsedAttributes, container: Group = this): any {
    return this.upsert('key', Line, this.getKeyStyle(attributes), container);
  }
}
