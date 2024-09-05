import type { DisplayObjectConfig } from '@antv/g';
import type { ProceduralGeometry as GGeometry, SphereGeometryProps } from '@antv/g-plugin-3d';
import { SphereGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

/**
 * <zh/> 球体节点样式
 *
 * <en/> Sphere Node Style Props
 */
export type SphereStyleProps = BaseNode3DStyleProps & SphereGeometryProps;

/**
 * <zh/> 球体节点
 *
 * <en/> Sphere Node
 */
export class Sphere extends BaseNode3D<SphereStyleProps> {
  static defaultStyleProps: Partial<SphereStyleProps> = {
    // radius
    size: 24,
    latitudeBands: 16,
    longitudeBands: 16,
  };

  constructor(options: DisplayObjectConfig<SphereStyleProps>) {
    super(deepMix({}, { style: Sphere.defaultStyleProps }, options));
  }

  protected getGeometry(attributes: Required<SphereStyleProps>): GGeometry<any> {
    const size = this.getSize();
    const { radius = size[0] / 2, latitudeBands, longitudeBands } = attributes;
    return createGeometry('sphere', this.device, SphereGeometry, { radius, latitudeBands, longitudeBands });
  }
}
