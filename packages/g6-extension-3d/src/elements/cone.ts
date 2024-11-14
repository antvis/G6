import type { DisplayObjectConfig } from '@antv/g';
import type { ConeGeometryProps, ProceduralGeometry as GGeometry } from '@antv/g-plugin-3d';
import { ConeGeometry } from '@antv/g-plugin-3d';
import type { Vector3 } from '@antv/g6';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

/**
 * <zh/> 圆锥节点样式
 *
 * <en/> Cone Node Style Props
 */
export type ConeStyleProps = BaseNode3DStyleProps & ConeGeometryProps;

/**
 * <zh/> 圆锥节点
 *
 * <en/> Cone Node
 */
export class Cone extends BaseNode3D<ConeStyleProps> {
  static defaultStyleProps: Partial<ConeStyleProps> = {
    // baseRadius, peakRadius, height
    size: [24, 0, 48],
    heightSegments: 5,
    capSegments: 20,
  };

  constructor(options: DisplayObjectConfig<ConeStyleProps>) {
    super(deepMix({}, { style: Cone.defaultStyleProps }, options));
  }

  protected getSize(attributes: ConeStyleProps = this.attributes): Vector3 {
    const { size } = attributes;
    if (typeof size === 'number') return [size / 2, 0, size];
    return super.getSize();
  }

  protected getGeometry(attributes: Required<ConeStyleProps>): GGeometry<any> {
    const size = this.getSize();
    const { baseRadius = size[0], peakRadius = size[1], height = size[2], heightSegments, capSegments } = attributes;
    return createGeometry('cone', this.device, ConeGeometry, {
      baseRadius,
      peakRadius,
      height,
      heightSegments,
      capSegments,
    });
  }
}
