import type { DisplayObjectConfig, Group } from '@antv/g';
import type { IMeshBasicMaterial, SphereGeometryProps } from '@antv/g-plugin-3d';
import { Mesh as GMesh } from '@antv/g-plugin-3d';
import type { BaseNodeProps } from '../../types';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type SphereKeyStyleProps = BaseNodeProps &
  SphereGeometryProps &
  IMeshBasicMaterial & {
    /**
     * The texture of the sphere. Will load by plugin.
     *
     * ```ts
     * const map = plugin.loadTexture(
     *  'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ',
     * );
     * ```
     */
    texture?: string;
  };
export type SphereStyleProps = BaseNodeStyleProps<SphereKeyStyleProps>;
type ParsedSphereStyleProps = Required<SphereStyleProps>;
type SphereOptions = DisplayObjectConfig<SphereStyleProps>;

/**
  const plugin = renderer.getPlugin('device-renderer');
  const device = plugin.getDevice();
 
  // 1. load texture with URL
  const map = plugin.loadTexture(
    'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*_aqoS73Se3sAAAAAAAAAAAAAARQnAQ',
  );
 
  const geometry = new SphereGeometry(device, {
    width: 200,
    height: 200,
    depth: 200,
  });
  const material = new MeshBasicMaterial(device, {
    map,
  });
 
  const cube = new Mesh({
    style: {
      fill: '#1890FF',
      opacity: 1,
      geometry: cubeGeometry,
      material: basicMaterial,
    },
  });
 
  cube.setPosition(300, 250, 0);
 
  canvas.appendChild(cube);
 
 */

/**
 * Draw Sphere with g-webgl. Sphere can only be used in g-webgl renderer. See https://g.antv.antgroup.com/api/3d/geometry.
 *
 * Sphere should be in a extra package, such as @antv/g6-extendsions.
 */
// @ts-expect-error The return type of this method is not compatible with the return type of its overridden method.
export class Sphere extends BaseNode<BaseNodeProps, GMesh> {
  static defaultStyleProps: Partial<SphereStyleProps> = {};

  constructor(options: SphereOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedSphereStyleProps, container: Group) {
    return undefined;
  }
}
