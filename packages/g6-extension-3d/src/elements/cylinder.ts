import type { DisplayObjectConfig } from '@antv/g';
import type { CylinderGeometryProps, ProceduralGeometry as GGeometry } from '@antv/g-plugin-3d';
import { CylinderGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

export type CylinderStyleProps = BaseNode3DStyleProps & CylinderGeometryProps;

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

  protected getGeometry(attributes: Required<CylinderStyleProps>): GGeometry<any> | undefined {
    const size = this.getSize();
    const { radius = size[0] / 2, height = size[1], heightSegments, capSegments } = attributes;
    return createGeometry('cylinder', this.device, CylinderGeometry, { radius, height, heightSegments, capSegments });
  }
}
