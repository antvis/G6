import type { DisplayObjectConfig, Group } from '@antv/g';
import type { BaseNodeProps } from '../../types';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type SphereStyleProps = BaseNodeStyleProps<BaseNodeProps>;
type ParsedSphereStyleProps = Required<SphereStyleProps>;
type SphereOptions = DisplayObjectConfig<SphereStyleProps>;

/**
 * Draw Sphere with g-webgl. Sphere can only be used in g-webgl renderer. See https://g.antv.antgroup.com/api/3d/geometry.
 *
 * Sphere should be in a extra package, such as @antv/g6-extendsions.
 */
export class Sphere extends BaseNode<BaseNodeProps, any> {
  static defaultStyleProps: Partial<SphereStyleProps> = {};

  constructor(options: SphereOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedSphereStyleProps, container: Group) {
    throw new Error('Method not implemented.');
  }
}
