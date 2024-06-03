import type { DisplayObjectConfig } from '@antv/g';
import type { ConeGeometryProps, ProceduralGeometry as GGeometry } from '@antv/g-plugin-3d';
import { ConeGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import { createGeometry } from '../utils/geometry';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

export type ConeStyleProps = BaseNode3DStyleProps & ConeGeometryProps;

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

  protected getGeometry(attributes: Required<ConeStyleProps>): GGeometry<any> | undefined {
    const size = this.getSize();
    const {
      baseRadius = size[0] / 2,
      peakRadius = size[1] / 2,
      height = size[2],
      heightSegments,
      capSegments,
    } = attributes;
    return createGeometry('cone', this.device, ConeGeometry, {
      baseRadius,
      peakRadius,
      height,
      heightSegments,
      capSegments,
    });
  }
}
