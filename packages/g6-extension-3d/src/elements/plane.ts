import type { DisplayObjectConfig } from '@antv/g';
import type { ProceduralGeometry as GGeometry, PlaneGeometryProps } from '@antv/g-plugin-3d';
import { CullMode, PlaneGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

/**
 * <zh/> 平面节点样式
 *
 * <en/> Plane Node Style Props
 */
export type PlaneStyleProps = BaseNode3DStyleProps & PlaneGeometryProps;

/**
 * <zh/> 平面节点
 *
 * <en/> Plane Node
 */
export class Plane extends BaseNode3D<PlaneStyleProps> {
  static defaultStyleProps: Partial<PlaneStyleProps> = {
    materialCullMode: CullMode.NONE,
  };

  constructor(options: DisplayObjectConfig<PlaneStyleProps>) {
    super(deepMix({}, { style: Plane.defaultStyleProps }, options));
  }

  protected getGeometry(attributes: Required<PlaneStyleProps>): GGeometry<any> {
    const size = this.getSize();
    const { width = size[0], depth = size[1], widthSegments, depthSegments } = attributes;
    return createGeometry('plane', this.device, PlaneGeometry, { width, depth, widthSegments, depthSegments });
  }
}
