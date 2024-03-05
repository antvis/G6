import type { BaseStyleProps } from '@antv/g';
import { Device } from '@antv/g-device-api';
import type { BufferGeometry, Material } from '@antv/g-plugin-3d';
import type { BaseNodeStyleProps } from '@antv/g6';
import { BaseNode } from '@antv/g6';

export interface BaseNode3DStyleProps extends BaseNodeStyleProps<MeshStyleProps> {
  z?: number;
  device: Device;
  material: Material;
}

export abstract class BaseNode3D extends BaseNode<BaseNode3DStyleProps> {}

export interface MeshStyleProps extends BaseStyleProps {
  x?: number | string;
  y?: number | string;
  z?: number | string;
  geometry: BufferGeometry;
  material: Material;
}
