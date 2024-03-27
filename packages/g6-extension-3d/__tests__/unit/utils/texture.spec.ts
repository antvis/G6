import { createTexture } from '../../../src/utils/texture';

describe('texture', () => {
  it('createTexture', () => {
    const img1 = 'texture1';
    const img2 = 'texture2';

    const plugin: any = {
      loadTexture: () => new Object(),
    };

    const texture1 = createTexture(plugin, img1);
    const texture2 = createTexture(plugin, img2);

    expect(texture1).toBe(createTexture(plugin, img1));
    expect(texture2).not.toBe(texture1);
  });
});
