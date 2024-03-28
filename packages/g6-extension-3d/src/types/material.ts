import type { IPointMaterial } from '@antv/g-plugin-3d';
import { IMeshBasicMaterial, IMeshLambertMaterial, IMeshPhongMaterial } from '@antv/g-plugin-3d';

export type Material = PointMaterial | BasicMaterial | LambertMaterial | PhongMaterial;

export interface PointMaterial extends Partial<Omit<IPointMaterial, 'map'>> {
  type: 'point';
  map?: string | TexImageSource;
}

interface BasicMaterial extends Partial<Omit<IMeshBasicMaterial, 'map' | 'aoMap'>> {
  type: 'basic';
  map?: string | TexImageSource;
}

interface LambertMaterial extends Partial<Omit<IMeshLambertMaterial, 'map' | 'aoMap'>> {
  type: 'lambert';
  map?: string | TexImageSource;
  // aoMap?: string | Texture;
}

interface PhongMaterial extends Partial<Omit<IMeshPhongMaterial, 'map' | 'aoMap'>> {
  type: 'phong';
  map?: string | TexImageSource;
  // aoMap?: string | Texture;
}
