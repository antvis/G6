import type { Material as GMaterial } from '@antv/g-plugin-3d';
import { MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, PointMaterial } from '@antv/g-plugin-3d';
import type { Plugin } from '@antv/g-plugin-device-renderer';
import { get, set } from '@antv/util';
import type { Material } from '../types';
import { getCacheKey } from './cache';
import { TupleMap } from './map';
import { createTexture } from './texture';

type MaterialCache = TupleMap<symbol, string | TexImageSource | undefined, GMaterial>;

const MATERIAL_CACHE_KEY = '__MATERIAL_CACHE__';

const MATERIAL_MAP = {
  basic: MeshBasicMaterial,
  point: PointMaterial,
  lambert: MeshLambertMaterial,
  phong: MeshPhongMaterial,
};

/**
 * <zh/> 基于配置创建材质，支持缓存
 *
 * <en/> Create material based on configuration, support cache
 * @param plugin - <zh/> 插件对象 <en/> plugin
 * @param options - <zh/> 材质配置 <en/> material configuration
 * @param texture - <zh/> 纹理 <en/> texture
 * @returns <zh/> 材质对象 <en/> material object
 */
export function createMaterial(plugin: Plugin, options: Material, texture?: string | TexImageSource): GMaterial {
  let cache: MaterialCache = get(plugin, MATERIAL_CACHE_KEY);
  if (!cache) {
    cache = new TupleMap();
    set(plugin, MATERIAL_CACHE_KEY, cache);
  }

  const key = getCacheKey(options);

  if (cache.has(key, texture)) {
    return cache.get(key, texture)!;
  }

  const device = plugin.getDevice();
  const { type, map = texture, ...opts } = options;
  const Ctor = MATERIAL_MAP[type];

  // @ts-expect-error ignore
  const material = new Ctor(device, { map: createTexture(plugin, map), ...opts });
  cache.set(key, texture, material);
  return material;
}
