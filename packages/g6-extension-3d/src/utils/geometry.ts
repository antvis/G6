import type { Device } from '@antv/g-device-api';
import type { ProceduralGeometry } from '@antv/g-plugin-3d';

let DEVICE: Device;

const GEOMETRY_CACHE = new Map<string, unknown>();

/**
 * <zh/> 创建几何体
 *
 * <en/> Create geometry
 * @param type - <zh/> 几何体类型 <en/> geometry type
 * @param device - <zh/> 设备对象 <en/> device object
 * @param Ctor - <zh/> 几何体构造函数 <en/> geometry constructor
 * @param style - <zh/> 几何体样式 <en/> geometry style
 * @returns <zh/> 几何体对象 <en/> geometry object
 */
export function createGeometry<T extends ProceduralGeometry<any>>(
  type: string,
  device: Device,
  Ctor: new (...args: any[]) => T,
  style: Record<string, unknown>,
) {
  if (!DEVICE) DEVICE = device;
  else if (DEVICE !== device) {
    DEVICE = device;
    GEOMETRY_CACHE.clear();
  }

  const cacheKey =
    type +
    '|' +
    Object.entries(style)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join(',');

  if (GEOMETRY_CACHE.has(cacheKey)) {
    return GEOMETRY_CACHE.get(cacheKey) as T;
  }

  const geometry = new Ctor(device, style);

  GEOMETRY_CACHE.set(cacheKey, geometry);

  return geometry;
}
