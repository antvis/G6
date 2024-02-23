import type { DisplayObjectConfig, Group } from '@antv/g';
import type { IMeshBasicMaterial, SphereGeometryProps } from '@antv/g-plugin-3d';
import { Mesh as GMesh, MeshBasicMaterial, SphereGeometry } from '@antv/g-plugin-3d';
import { Renderer as GWebGLRenderer } from '@antv/g-webgl';
import { RuntimeContext } from '../../runtime/types';
import type { BaseNodeProps } from '../../types';
import { omitStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

const GEOMETRY_SIZE = 10;

type SphereKeyStyleProps = BaseNodeProps & {
  /**
   * geometry options of the sphere.
   */
  geometry: SphereGeometryProps;
  /**
   * meterial options of the sphere.
   */
  material: IMeshBasicMaterial;
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
export type SphereStyleProps = BaseNodeStyleProps<SphereKeyStyleProps> & {
  // Pass the renderer to the Sphere from runtime.
  context: RuntimeContext;
};
type ParsedSphereStyleProps = Required<SphereStyleProps>;
type SphereOptions = DisplayObjectConfig<SphereStyleProps>;

/**
 * Draw Sphere with g-webgl. Sphere can only be used in g-webgl renderer. See https://g.antv.antgroup.com/api/3d/geometry.
 *
 * Sphere should be in a extra package, such as @antv/g6-extendsions.
 */
export class Sphere extends BaseNode<BaseNodeProps, any> {
  static defaultStyleProps: Partial<SphereStyleProps> = {};

  /**
   * Cache the geometry.
   */
  private static geometry: SphereGeometry;
  /**
   * Cache the material.
   */
  private static material: MeshBasicMaterial<any>;

  constructor(options: SphereOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedSphereStyleProps): SphereKeyStyleProps {
    const { geometry, material, texture, color, ...style } = omitStyleProps(attributes, [
      'label',
      'halo',
      'icon',
      'badge',
      'port',
    ]) as SphereKeyStyleProps;

    // Get renderer, plugin and device from context.
    const { canvas } = attributes.context;
    const renderer = canvas.renderers.main;
    if (!(renderer instanceof GWebGLRenderer)) throw new Error('Sphere can only be used in g-webgl renderer.');
    // @ts-expect-error ignore
    const plugin = renderer.getPlugin('device-renderer');
    const device = plugin.getDevice();
    const map = texture ? plugin.loadTexture(texture) : undefined;

    if (!Sphere.geometry) {
      Sphere.geometry = new SphereGeometry(device, {
        ...geometry,
        radius: 200,
        latitudeBands: 32,
        longitudeBands: 32,
      });
    }

    if (!Sphere.material) {
      Sphere.material = new MeshBasicMaterial(device, {
        map,
        ...material,
      });
    }

    return {
      fill: color,
      ...style,
      geometry: Sphere.geometry,
      material: Sphere.material,
      texture,
    };
  }

  protected drawKeyShape(attributes: ParsedSphereStyleProps, container: Group) {
    const style = this.getKeyStyle(attributes);
    // @ts-expect-error ignore
    const shape = this.upsert('key', GMesh, this.getKeyStyle(attributes), container) as any;
    if (shape) {
      shape.setOrigin(0, 0, 0);
      const scaling = Number(style.size) / GEOMETRY_SIZE;
      shape.scale(scaling);
    }
    return shape;
  }
}
