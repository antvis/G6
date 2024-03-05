import type { Group } from '@antv/g';
import { Mesh } from '@antv/g-plugin-3d';
import type { BaseNode3DStyleProps, MeshStyleProps } from './base-node-3d';
import { BaseNode3D } from './base-node-3d';

export interface SphereStyleProps extends BaseNode3DStyleProps {}

type ParsedSphereStyleProps = Required<SphereStyleProps>;

export class Sphere extends BaseNode3D {
  protected drawKeyShape(attributes = this.parsedAttributes, container: Group = this) {
    return this.upsert('key', Mesh, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedSphereStyleProps): MeshStyleProps {
    return {
      ...super.getKeyStyle(attributes),
      z: attributes.z || 0,
    };
  }
}
