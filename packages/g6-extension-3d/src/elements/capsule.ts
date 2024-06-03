import type { DisplayObjectConfig } from '@antv/g';
import type { CapsuleGeometryProps, ProceduralGeometry as GGeometry } from '@antv/g-plugin-3d';
import { CapsuleGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

export type CapsuleStyleProps = BaseNode3DStyleProps & CapsuleGeometryProps;

export class Capsule extends BaseNode3D<CapsuleStyleProps> {
  static defaultStyleProps: Partial<CapsuleStyleProps> = {
    // radius, height
    size: [24, 48],
    heightSegments: 1,
    sides: 20,
  };

  constructor(options: DisplayObjectConfig<CapsuleStyleProps>) {
    super(deepMix({}, { style: Capsule.defaultStyleProps }, options));
  }

  protected getGeometry(attributes: Required<CapsuleStyleProps>): GGeometry<any> | undefined {
    const size = this.getSize();
    const { radius = size[0] / 2, height = size[1], heightSegments, sides } = attributes;
    return createGeometry('capsule', this.device, CapsuleGeometry, { radius, height, heightSegments, sides });
  }
}
