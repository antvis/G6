import type { DisplayObjectConfig } from '@antv/g';
import type { CubeGeometryProps, ProceduralGeometry as GGeometry } from '@antv/g-plugin-3d';
import { CubeGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

/**
 * <zh/> 立方体节点样式
 *
 * <en/> Cube Node Style Props
 */
export type CubeStyleProps = BaseNode3DStyleProps & CubeGeometryProps;

/**
 * <zh/> 立方体节点
 *
 * <en/> Cube Node
 */
export class Cube extends BaseNode3D<CubeStyleProps> {
  static defaultStyleProps: Partial<CubeStyleProps> = {
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  };

  constructor(options: DisplayObjectConfig<CubeStyleProps>) {
    super(deepMix({}, { style: Cube.defaultStyleProps }, options));
  }

  protected getGeometry(attributes: Required<CubeStyleProps>): GGeometry<any> {
    const size = this.getSize();
    const {
      width = size[0],
      height = size[1],
      depth = size[2],
      widthSegments,
      heightSegments,
      depthSegments,
    } = attributes;
    return createGeometry('cube', this.device, CubeGeometry, {
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
    });
  }
}
