import { createMaterial } from '../../../src/utils/material';

describe('material', () => {
  it('createMaterial', () => {
    const plugin: any = {
      loadTexture: () => new Object(),
      getDevice: () => ({}),
    };

    const materialWithoutTexture = createMaterial(plugin, { type: 'basic' });
    const materialWithTexture = createMaterial(plugin, { type: 'basic' }, 'texture');

    const image: any = new Object();
    const materialWithImage = createMaterial(plugin, { type: 'basic' }, image);

    expect(materialWithoutTexture).toBe(createMaterial(plugin, { type: 'basic' }));
    expect(materialWithTexture).not.toBe(materialWithoutTexture);
    expect(materialWithImage).not.toBe(materialWithTexture);

    expect(materialWithTexture).toBe(createMaterial(plugin, { type: 'basic' }, 'texture'));
    expect(materialWithImage).toBe(createMaterial(plugin, { type: 'basic' }, image));
  });
});
