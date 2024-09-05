import type { DisplayObjectConfig } from '@antv/g';
import type { ProceduralGeometry as GGeometry, TorusGeometryProps } from '@antv/g-plugin-3d';
import { TorusGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

/**
 * <zh/> 圆环节点样式配置项
 *
 * <en/> Torus Node Style Props
 */
export type TorusStyleProps = BaseNode3DStyleProps & TorusGeometryProps;

/**
 * <zh/> 圆环节点
 *
 * <en/> Torus Node
 */
export class Torus extends BaseNode3D<TorusStyleProps> {
  static defaultStyleProps: Partial<TorusStyleProps> = {
    // tubeRadius, ringRadius
    size: [8, 48],
    segments: 30,
    sides: 20,
  };

  constructor(options: DisplayObjectConfig<TorusStyleProps>) {
    super(deepMix({}, { style: Torus.defaultStyleProps }, options));
  }

  protected getGeometry(attributes: Required<TorusStyleProps>): GGeometry<any> {
    const size = this.getSize();
    const { tubeRadius = size[0] / 2, ringRadius = size[1] / 2, segments, sides } = attributes;
    return createGeometry('torus', this.device, TorusGeometry, { tubeRadius, ringRadius, segments, sides });
  }
}
