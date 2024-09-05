import type { BaseStyleProps, DisplayObjectConfig, Group } from '@antv/g';
import type { ProceduralGeometry as GGeometry, Material as GMaterial } from '@antv/g-plugin-3d';
import { Mesh } from '@antv/g-plugin-3d';
import type { IMaterial, Plugin } from '@antv/g-plugin-device-renderer';
import type { BaseNodeStyleProps, Prefix } from '@antv/g6';
import { BaseNode, omitStyleProps, subStyleProps } from '@antv/g6';
import { deepMix } from '@antv/util';
import { Material } from '../types';
import { createMaterial } from '../utils/material';

/**
 * <zh/> 3D 节点样式
 *
 * <en/> 3D node style props
 */
export interface BaseNode3DStyleProps extends BaseNodeStyleProps, Prefix<'material', IMaterial> {
  geometry?: GGeometry<any>;
  material?: GMaterial<any>;
  texture?: string | TexImageSource;
  materialType?: Material['type'];
}

/**
 * <zh/> 3D 节点基类
 *
 * <en/> 3D node base class
 */
export abstract class BaseNode3D<S extends BaseNode3DStyleProps> extends BaseNode<S> {
  static defaultStyleProps: Partial<BaseNode3DStyleProps> = {
    materialType: 'basic',
  };

  public type = 'node-3d';

  protected get plugin() {
    const renderer = this.context.canvas.getRenderer('main');
    const plugin = renderer.getPlugin('device-renderer');
    return plugin as unknown as Plugin;
  }

  protected get device() {
    return this.plugin.getDevice();
  }

  constructor(options: DisplayObjectConfig<S>) {
    super(deepMix({}, { style: BaseNode3D.defaultStyleProps }, options));
  }

  public render(attributes: Required<S>, container: Group) {
    super.render(attributes, container);
  }

  protected getKeyStyle(attributes: Required<S>): MeshStyleProps {
    const style = omitStyleProps(super.getKeyStyle(attributes), 'material');
    const geometry = this.getGeometry(attributes);
    const material = this.getMaterial(attributes);
    return { x: 0, y: 0, z: 0, ...style, geometry, material };
  }

  protected drawKeyShape(attributes: Required<S>, container: Group = this) {
    return this.upsert('key', Mesh, this.getKeyStyle(attributes), container);
  }

  protected abstract getGeometry(attributes: Required<S>): GGeometry<any>;

  protected getMaterial(attributes: Required<S>): GMaterial<any> {
    const { texture } = attributes;
    const materialStyle = subStyleProps<Material>(attributes, 'material');
    return createMaterial(this.plugin, materialStyle, texture);
  }
}
export interface MeshStyleProps extends BaseStyleProps {
  x?: number | string;
  y?: number | string;
  z?: number | string;
  geometry: GGeometry<any>;
  material: GMaterial<any>;
}
