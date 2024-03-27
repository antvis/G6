import type { Texture } from '@antv/g-device-api';
import type { Plugin } from '@antv/g-plugin-device-renderer';

const TEXTURE_CACHE = new Map<string | TexImageSource, Texture>();

/**
 * <zh/> 创建纹理，支持缓存
 *
 * <en/> Create texture, support cache
 * @param plugin - <zh/> 插件对象 <en/> plugin
 * @param src - <zh/> 纹理路径或者图片对象 <en/> texture path or image object
 * @returns <zh/> 纹理对象 <en/> texture object
 */
export function createTexture(plugin: Plugin, src?: string | TexImageSource): Texture | undefined {
  if (!src) return;

  if (TEXTURE_CACHE.has(src)) {
    return TEXTURE_CACHE.get(src);
  }
  const texture = plugin.loadTexture(src);
  TEXTURE_CACHE.set(src, texture);
  return texture;
}
