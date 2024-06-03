import { CubeGeometry } from '@antv/g-plugin-3d';
import { createGeometry } from '../../../src/utils/geometry';

describe('geometry', () => {
  it('createGeometry', () => {
    const device: any = {};
    const geometry1 = createGeometry('cube', device, CubeGeometry, { width: 1, height: 1, depth: 1 });
    const geometry2 = createGeometry('cube', device, CubeGeometry, { depth: 1, height: 1, width: 1 });
    const geometry3 = createGeometry('cube', device, CubeGeometry, { width: 2, height: 2, depth: 2 });

    expect(geometry1).toBe(geometry2);
    expect(geometry1).not.toBe(geometry3);
  });
});
