import type { DisplayObjectConfig } from '@antv/g';
import type { CylinderGeometryProps, ProceduralGeometry as GGeometry } from '@antv/g-plugin-3d';
import { CylinderGeometry } from '@antv/g-plugin-3d';
import type { Vector3 } from '@antv/g6';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

/**
 * <zh/> 圆柱节点样式
 *
 * <en/> Cylinder Node Style Props
 */
export type CylinderStyleProps = BaseNode3DStyleProps & CylinderGeometryProps;

/**
 * <zh/> 圆柱节点
 *
 * <en/> Cylinder Node
 */
export class Cylinder extends BaseNode3D<CylinderStyleProps> {
  static defaultStyleProps: Partial<CylinderStyleProps> = {
    // radius, height
    size: [24, 48],
    heightSegments: 5,
    capSegments: 20,
  };

  constructor(options: DisplayObjectConfig<CylinderStyleProps>) {
    super(deepMix({}, { style: Cylinder.defaultStyleProps }, options));
  }

  protected getSize(attributes: CylinderStyleProps = this.attributes): Vector3 {
    const { size } = attributes;
    if (typeof size === 'number') return [size / 2, size, 0];
    return super.getSize();
  }

  protected getGeometry(attributes: Required<CylinderStyleProps>): GGeometry<any> {
    const size = this.getSize();
    const { radius = size[0], height = size[1], heightSegments, capSegments } = attributes;
    return createGeometry('cylinder', this.device, CylinderGeometry, { radius, height, heightSegments, capSegments });
  }
}
