import type { DisplayObjectConfig } from '@antv/g';
import type { ProceduralGeometry as GGeometry, PlaneGeometryProps } from '@antv/g-plugin-3d';
import { CullMode, PlaneGeometry } from '@antv/g-plugin-3d';
import { deepMix } from '@antv/util';
import type { BaseNode3DStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

export type PlaneStyleProps = BaseNode3DStyleProps & PlaneGeometryProps;

export class Plane extends BaseNode3D<PlaneStyleProps> {
  static defaultStyleProps: Partial<PlaneStyleProps> = {
    materialCullMode: CullMode.NONE,
  };

  constructor(options: DisplayObjectConfig<PlaneStyleProps>) {
    super(deepMix({}, { style: Plane.defaultStyleProps }, options));
  }

  protected getGeometry(attributes: Required<PlaneStyleProps>): GGeometry<any> | undefined {
    const size = this.getSize();
    const { width = size[0], depth = size[1], widthSegments, depthSegments } = attributes;
    return new PlaneGeometry(this.device, { width, depth, widthSegments, depthSegments });
  }
}
